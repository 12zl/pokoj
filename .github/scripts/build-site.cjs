'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

function buildSite(root) {
  root = fs.realpathSync(root);
  const output = path.join(root, '_site');
  // Only replace our own generated directory, never follow a directory symlink.
  if (fs.existsSync(output) && fs.lstatSync(output).isSymbolicLink()) {
    throw new Error('The build directory must not be a symbolic link.');
  }
  if (path.dirname(output) !== root || path.basename(output) !== '_site') {
    throw new Error('Invalid build directory.');
  }
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(path.join(output, 'stickers'), { recursive: true });
  for (const file of ['index.html', 'style.css', 'app.js', 'extras.js', '.nojekyll']) {
    fs.copyFileSync(path.join(root, file), path.join(output, file));
  }
  fs.cpSync(path.join(root, 'vendor'), path.join(output, 'vendor'), { recursive: true });

  const directory = path.join(root, 'stickers');
  const files = fs.readdirSync(directory, { withFileTypes: true })
    .filter(entry => entry.isFile() && /\.(png|webp|gif|jpe?g)$/i.test(entry.name))
    .map(entry => entry.name)
    .sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
  if (files.length > 80) throw new Error('Maximum 80 custom stickers. Remove unused images from stickers/.');
  const manifest = files.map(filename => {
    // Stable IDs and URL-safe filenames, even for spaces, Polish letters or emoji.
    const id = 'custom_' + crypto.createHash('sha256').update(filename).digest('hex').slice(0, 24);
    const extension = path.extname(filename).toLowerCase();
    const file = id + extension;
    fs.copyFileSync(path.join(directory, filename), path.join(output, 'stickers', file));
    return {
      id,
      name: path.basename(filename, path.extname(filename)).replace(/[_-]+/g, ' ').slice(0, 60) || 'Naklejka',
      file
    };
  });
  fs.writeFileSync(path.join(output, 'stickers', 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Built site with ${manifest.length} custom stickers. GIF bytes are preserved.`);
  return manifest;
}

if (require.main === module) buildSite(path.resolve(__dirname, '../..'));
module.exports = { buildSite };
