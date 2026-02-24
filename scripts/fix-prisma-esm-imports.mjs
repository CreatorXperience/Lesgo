import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const root = 'dist/src/generated/prisma';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      if (entry.isFile() && extname(entry.name) === '.js') {
        return [fullPath];
      }
      return [];
    })
  );

  return files.flat();
}

function addJsExtension(specifier) {
  if (!specifier.startsWith('./') && !specifier.startsWith('../')) return specifier;
  if (/[?#]/.test(specifier)) return specifier;
  if (/\.(js|mjs|cjs|json|node|wasm)$/.test(specifier)) return specifier;
  if (specifier.endsWith('.ts')) return `${specifier.slice(0, -3)}.js`;
  if (specifier.endsWith('.tsx')) return `${specifier.slice(0, -4)}.js`;
  if (specifier.endsWith('.mts')) return `${specifier.slice(0, -4)}.mjs`;
  if (specifier.endsWith('.cts')) return `${specifier.slice(0, -4)}.cjs`;
  return `${specifier}.js`;
}

function patchImports(source) {
  const importExportRegex = /(from\s+['"])(\.[^'"]+)(['"])/g;
  const sideEffectImportRegex = /(import\s+['"])(\.[^'"]+)(['"])/g;

  return source
    .replace(importExportRegex, (_, prefix, specifier, suffix) => `${prefix}${addJsExtension(specifier)}${suffix}`)
    .replace(sideEffectImportRegex, (_, prefix, specifier, suffix) => `${prefix}${addJsExtension(specifier)}${suffix}`);
}

const exists = await stat(root).then(() => true).catch(() => false);
if (!exists) {
  process.exit(0);
}

const files = await walk(root);
for (const file of files) {
  const original = await readFile(file, 'utf8');
  const patched = patchImports(original);
  if (patched !== original) {
    await writeFile(file, patched, 'utf8');
  }
}
