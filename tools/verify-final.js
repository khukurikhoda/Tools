const fs = require('fs');
const path = require('path');
const pdir = 'products';
const ph = fs.readdirSync(pdir).filter((f) => f.endsWith('.html'));
let tn = ph.filter((f) => /Tools Nepal/.test(fs.readFileSync(path.join(pdir, f), 'utf8')));
console.log('Product pages still containing Tools Nepal:', tn.length ? tn : 'none');

const app = fs.readFileSync(path.join(pdir, '5-inch-khukuri-1.html'), 'utf8');
console.log('Approved page intact (curated desc + Full-tang Khukuri):',
  app.includes('Full-tang Khukuri') && app.includes('compact, full-tang blade hand-forged'));

let missingMain = [];
for (const f of ph) {
  if (f === 'product-template.html') continue;
  const s = fs.readFileSync(path.join(pdir, f), 'utf8');
  const m = s.match(/<img[^>]*src="([^"]+)"[^>]*id="mainProductImage"/);
  if (!m) { missingMain.push(f + ': no main img'); continue; }
  const rel = m[1].replace(/^\.\.\//, '');
  if (!fs.existsSync(path.join('.', rel))) missingMain.push(f + ': ' + m[1]);
}
console.log('Missing main images:', missingMain.length ? missingMain : 'none');

const { products } = require('../products-data.js');
let missingData = [];
for (const p of products) {
  if (!fs.existsSync(path.join('.', p.image || ''))) missingData.push(p.slug + ': ' + p.image);
}
console.log('Missing products-data images (related cards/cart):', missingData.length ? missingData : 'none');
