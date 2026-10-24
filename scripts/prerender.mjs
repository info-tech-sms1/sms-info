import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const routeFiles = new Map([
  ['/', 'index.html'],
  ['/services/', 'services/index.html'],
  ['/evacuation-planning/', 'evacuation-planning/index.html'],
  ['/safety-equipment/', 'safety-equipment/index.html'],
  ['/awareness-events/', 'awareness-events/index.html'],
  ['/about/', 'about/index.html'],
  ['/contact/', 'contact/index.html'],
  ['/privacy/', 'privacy/index.html'],
  ['/terms/', 'terms/index.html'],
]);

const manifest = JSON.parse(
  await readFile(path.join(projectRoot, 'public/manus-routes.json'), 'utf8'),
);
const declaredRoutes = new Set(manifest.routes.map((route) => route.path));

if (declaredRoutes.size !== routeFiles.size) {
  throw new Error('The route manifest and prerender route list have different sizes.');
}
for (const route of routeFiles.keys()) {
  if (!declaredRoutes.has(route)) {
    throw new Error(`The prerender route ${route} is missing from public/manus-routes.json.`);
  }
}

const vite = await createServer({
  configFile: path.join(projectRoot, 'vite.config.ts'),
  root: projectRoot,
  appType: 'custom',
  server: {
    middlewareMode: true,
    hmr: false,
  },
});

try {
  const { renderRoute } = await vite.ssrLoadModule('/src/entry-server.tsx');
  const manifest = JSON.parse(
    await readFile(path.join(projectRoot, 'dist/.vite/manifest.json'), 'utf8'),
  );
  const assetUrls = new Map(
    Object.values(manifest)
      .filter((entry) => entry.src && entry.file)
      .map((entry) => [`/${entry.src}`, `/${entry.file}`]),
  );
  const rewriteAssetUrls = (html) => {
    let output = html;
    for (const [sourceUrl, builtUrl] of assetUrls) {
      output = output.replaceAll(sourceUrl, builtUrl);
    }
    return output;
  };
  const assetDirectory = path.join(projectRoot, 'dist', 'assets');
  const assetNames = await readdir(assetDirectory);
  const cssFiles = await Promise.all(
    assetNames
      .filter((name) => name.endsWith('.css'))
      .map((name) => readFile(path.join(assetDirectory, name), 'utf8')),
  );
  const fontUrl = cssFiles.join('\n').match(/url\((\/assets\/[^)]*\.woff2)\)/)?.[1];

  if (!fontUrl) {
    throw new Error('Could not find the hashed Plus Jakarta Sans font in the built CSS.');
  }
  const fontPreload = `<link rel="preload" href="${fontUrl}" as="font" type="font/woff2" crossorigin />`;

  for (const [route, outputPath] of routeFiles) {
    const htmlPath = path.join(projectRoot, 'dist', outputPath);
    const html = await readFile(htmlPath, 'utf8');
    const rootPattern = /<div\s+id="root"\s*>\s*<\/div>/i;

    if (!/<title>[^<]+<\/title>/i.test(html)
      || !/<meta\b[^>]*\bname="description"[^>]*\bcontent="[^"]+/i.test(html)
      || !/<link\b[^>]*\brel="canonical"[^>]*\bhref="[^"]+/i.test(html)) {
      throw new Error(`The HTML template for ${route} is missing its title, description, or canonical URL.`);
    }

    if (!rootPattern.test(html)) {
      throw new Error(`The built HTML for ${route} does not contain the expected empty root.`);
    }
    const sourceFontPreload = /<link rel="preload" href="\/fonts\/plus-jakarta-sans-latin\.woff2"[^>]*\/?\s*>/i;
    if (!sourceFontPreload.test(html)) {
      throw new Error(`The HTML template for ${route} is missing its font preload placeholder.`);
    }

    const markup = await renderRoute(route);
    if (!markup.trim() || !/<h1\b/i.test(markup) || !/\shref="\//i.test(markup)) {
      throw new Error(`The prerendered HTML for ${route} is missing meaningful headings or links.`);
    }
    if (/<script\b/i.test(markup)) {
      throw new Error(`The prerendered markup for ${route} contains an inline or embedded script.`);
    }

    const resourceHints = [...markup.matchAll(/<link rel="preload"[^>]*\/?\s*>/gi)]
      .map((match) => rewriteAssetUrls(match[0]));
    const pageMarkup = rewriteAssetUrls(markup.replace(/<link rel="preload"[^>]*\/?\s*>/gi, ''));
    if (/\/src\/assets\//i.test(pageMarkup)) {
      throw new Error(`The prerendered markup for ${route} contains an unresolved source asset path.`);
    }
    const withFontPreload = html.replace(sourceFontPreload, fontPreload);
    const headPreloads = resourceHints.join('\n    ');
    const withResourceHints = withFontPreload.replace('</head>', `${headPreloads}\n  </head>`);
    const prerendered = withResourceHints.replace(rootPattern, `<div id="root">${pageMarkup}</div>`);
    await writeFile(htmlPath, prerendered);
    console.log(`Prerendered ${route} -> dist/${outputPath}`);
  }
} finally {
  await vite.close();
}
