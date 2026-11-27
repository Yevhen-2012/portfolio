import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const sources = join(root, 'templates/cases');
const output = resolve(process.argv[2] ?? join(root, 'projects'));
const readHtml = async path => (await readFile(path, 'utf8')).replaceAll('\r\n', '\n');
const layout = (await readHtml(join(root, 'templates/project-case.html'))).trimEnd();

function splitOnce(text, marker, file) {
  const parts = text.split(marker);
  if (parts.length !== 2) throw new Error(`${file}: expected exactly one ${marker}`);
  return parts;
}

function insert(text, marker, content, file) {
  const [before, after] = splitOnce(text, marker, file);
  return before + content + after;
}

const pages = [];
for (const file of (await readdir(sources)).filter(name => name.endsWith('.html'))) {
  const source = await readHtml(join(sources, file));
  const [document, sections] = splitOnce(source, '\n<!-- projectContent -->\n', file);
  const [content, cards] = splitOnce(sections, '\n<!-- relatedCards -->\n', file);
  const withContent = insert(layout, '{{projectContent}}', content, file);
  const caseLayout = insert(withContent, '{{relatedCards}}', cards.trimEnd(), file);
  pages.push([file, insert(document, '{{caseLayout}}', caseLayout, file)]);
}
if (!pages.length) throw new Error('No project case sources found');
await mkdir(output, { recursive: true });
for (const [file, html] of pages) await writeFile(join(output, file), html);
console.log(`Generated ${pages.length} project pages`);
