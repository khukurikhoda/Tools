/**
 * Apply the approved product-page layout (products/5-inch-khukuri-1.html) to every
 * other product page, preserving each product's own data (title, price, SKU, category,
 * description, specifications, stock status, images) and the "Shree Krishna Traders" branding.
 *
 * Strategy: the approved page is the single structural template. Each remaining page only
 * supplies its own data, which is extracted and injected into the template. No HTML is
 * duplicated and no UI/colours/layout are changed.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PRODUCTS_DIR = path.join(ROOT, 'products');
const APPROVED = '5-inch-khukuri-1.html';
const TEMPLATE = 'product-template.html';
const BASE_URL = 'https://shreekrishnatraders.com.np';

const approvedPath = path.join(PRODUCTS_DIR, APPROVED);
const approvedSrc = fs.readFileSync(approvedPath, 'utf8');

function replaceAll(s, from, to) {
  return s.split(from).join(to);
}

// Locate the first opening tag that has a given class.
function locateOpening(html, className) {
  const re = /<([a-zA-Z0-9]+)([^>]*)class="([^"]*)"([^>]*)>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const classes = (m[3] || '').split(/\s+/).filter(Boolean);
    if (classes.includes(className)) {
      return { tag: m[1], index: m.index, end: m.index + m[0].length };
    }
  }
  return null;
}

// Return the inner HTML of the first element with the given class (balanced tag scan).
function getInnerHTML(html, className) {
  const open = locateOpening(html, className);
  if (!open) return null;
  const closeTag = `</${open.tag}>`;
  let depth = 1;
  let i = open.end;
  while (i < html.length) {
    if (html.startsWith(closeTag, i)) {
      if (depth === 1) return html.slice(open.end, i);
      depth--;
      i += closeTag.length;
    } else if (html.startsWith(`<${open.tag}`, i) && html[i + 1 + open.tag.length] !== '/') {
      depth++;
      i++;
    } else {
      i++;
    }
  }
  return null;
}

// Replace the inner HTML of the first element with the given class.
function setInnerHTML(html, className, newInner) {
  const open = locateOpening(html, className);
  if (!open) return html;
  const closeTag = `</${open.tag}>`;
  let depth = 1;
  let i = open.end;
  while (i < html.length) {
    if (html.startsWith(closeTag, i)) {
      if (depth === 1) {
        return html.slice(0, open.end) + newInner + html.slice(i);
      }
      depth--;
      i += closeTag.length;
    } else if (html.startsWith(`<${open.tag}`, i) && html[i + 1 + open.tag.length] !== '/') {
      depth++;
      i++;
    } else {
      i++;
    }
  }
  return html;
}

function stripTags(s) {
  return (s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function cleanForMeta(s) {
  const t = stripTags(s);
  return t.length > 160 ? t.slice(0, 157).trim() + '...' : t;
}

// Build the tokenised template from the approved page.
function buildTemplate(src) {
  let t = src;

  // A. Replace the JSON-LD block entirely (regenerated per product).
  t = t.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    '<script type="application/ld+json">\n{{JSON_LD}}\n    </script>');

  // B. Meta description.
  t = t.replace(/<meta name="description" content="[^"]*">/,
    '<meta name="description" content="{{META_DESCRIPTION}}">');

  // C. Canonical + og:url.
  t = t.replace(/<link rel="canonical" href="[^"]*">/,
    '<link rel="canonical" href="{{CANONICAL}}">');
  t = t.replace(/<meta property="og:url" content="[^"]*">/,
    '<meta property="og:url" content="{{CANONICAL}}">');

  // D. WhatsApp buy-now URL.
  t = t.replace(/href="https:\/\/wa\.me\/9779864563255\?text=[^"]*"/,
    'href="{{WHATSAPP_URL}}"');

  // E. Product name (all occurrences, e.g. title, h1, breadcrumb, alt, JSON-LD removed already).
  t = replaceAll(t, '5 inch Khukuri', '{{NAME}}');

  // F. Category: only the category *badge* is product-specific. The static "Product Details"
  // section (e.g. "Full-tang Khukuri") must stay identical to the approved sample, so we
  // tokenize just the product-category badge, not every occurrence of the word.
  t = setInnerHTML(t, 'product-category', '{{CATEGORY}}');

  // G. SKU.
  t = replaceAll(t, 'SKU-1', '{{SKU}}');

  // H. Absolute OG/Twitter image.
  t = replaceAll(t, 'https://shreekrishnatraders.com.np/images/55.webp', '{{OG_IMAGE}}');

  // I. Relative body image (main + thumbnail).
  t = replaceAll(t, '../images/55.webp', '{{REL_IMAGE}}');

  // J. Formatted price.
  t = replaceAll(t, '1,099', '{{PRICE_FMT}}');

  // K. Raw price.
  t = replaceAll(t, '1099', '{{PRICE_RAW}}');

  // L. Stock text.
  t = t.replace(/(<span class="dot"><\/span>\s*)In Stock/, '$1{{STOCK}}');

  // M/N. Description + specs inner (replaced wholesale with the product's own content).
  t = setInnerHTML(t, 'product-description', '{{DESCRIPTION_HTML}}');
  t = setInnerHTML(t, 'specs-list', '{{SPECS_HTML}}');

  return t;
}

const TEMPLATE_STR = buildTemplate(approvedSrc);

// ---- Extraction helpers (read from each existing page) ----
function extractName(html) {
  const inner = getInnerHTML(html, 'product-title');
  return inner ? stripTags(inner) : '';
}

function extractPriceRaw(html) {
  const m = html.match(/data-price="(\d+)"/);
  if (m) return parseInt(m[1], 10);
  const pm = html.match(/NPR\s*([\d,]+)/);
  if (pm) return parseInt(pm[1].replace(/,/g, ''), 10);
  return 0;
}

function extractCategory(html) {
  const inner = getInnerHTML(html, 'product-category');
  if (inner && stripTags(inner)) return stripTags(inner);
  const m = html.match(/<span class="spec-label">Category<\/span>\s*<span class="spec-value">([^<]*)<\/span>/);
  return m ? m[1].trim() : 'Other Products';
}

function extractSku(html, fileName) {
  const m = html.match(/<span class="spec-label">SKU<\/span>\s*<span class="spec-value">([^<]*)<\/span>/);
  if (m && m[1].trim()) return m[1].trim();
  const fm = fileName.match(/-(\d+)\.html$/);
  return fm ? `SKU-${fm[1]}` : 'SKU';
}

function extractImage(html) {
  const m = html.match(/id="mainProductImage"[^>]*src="([^"]+)"/);
  if (m) return m[1];
  const m2 = html.match(/<div class="product-main-image">\s*<img[^>]*src="([^"]+)"/);
  return m2 ? m2[1] : '../images/basket.webp';
}

function extractDescription(html) {
  const inner = getInnerHTML(html, 'product-description');
  if (inner && inner.trim()) {
    const t = inner.trim();
    return t.startsWith('<') ? t : `<p>${t}</p>`;
  }
  const m = html.match(/<meta name="description" content="([^"]*)"/);
  return m ? `<p>${m[1]}</p>` : '';
}

function extractSpecs(html) {
  const inner = getInnerHTML(html, 'specs-list');
  if (inner && inner.trim()) return inner.trim();
  return '';
}

function extractStock(html) {
  return /Out of Stock/i.test(html) ? 'Out of Stock' : 'In Stock';
}

function toAbsolute(relImage) {
  const clean = relImage.replace(/^\.\.\//, '').replace(/^\.\//, '');
  return `${BASE_URL}/${clean}`;
}

function imageExists(relImage) {
  const clean = relImage.replace(/^\.\.\//, '').replace(/^\.\//, '');
  return fs.existsSync(path.join(ROOT, clean));
}

function buildWhatsAppUrl(name, priceFmt) {
  const text = `Hi, I am interested in the ${name} (NPR ${priceFmt}). Is it available?`;
  return `https://wa.me/9779864563255?text=${encodeURIComponent(text)}`;
}

function buildJsonLd(name, description, absoluteImage, sku, category, priceRaw, pageUrl, inStock) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name,
        description: cleanForMeta(description) || name,
        image: absoluteImage,
        brand: { '@type': 'Brand', name: 'Shree Krishna Traders' },
        sku,
        category,
        offers: {
          '@type': 'Offer',
          url: pageUrl,
          priceCurrency: 'NPR',
          price: String(priceRaw),
          availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          seller: { '@type': 'Organization', name: 'Shree Krishna Traders' }
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${BASE_URL}/products.html` },
          { '@type': 'ListItem', position: 3, name, item: pageUrl }
        ]
      },
      {
        '@type': 'Organization',
        name: 'Shree Krishna Traders',
        url: BASE_URL,
        logo: `${BASE_URL}/images/logo.webp`,
        contactPoint: { '@type': 'ContactPoint', telephone: '+9779864563255', contactType: 'customer service' }
      }
    ]
  };
}

// ---- Process every product page ----
const files = fs.readdirSync(PRODUCTS_DIR)
  .filter((f) => f.endsWith('.html') && f !== APPROVED && f !== TEMPLATE)
  .sort();

const issues = [];
let processed = 0;

for (const file of files) {
  const full = path.join(PRODUCTS_DIR, file);
  const src = fs.readFileSync(full, 'utf8');
  const slug = file.replace(/\.html$/, '');
  const pageUrl = `${BASE_URL}/products/${file}`;

  const name = extractName(src);
  const priceRaw = extractPriceRaw(src);
  const priceFmt = (priceRaw || 0).toLocaleString('en-US');
  const category = extractCategory(src);
  const sku = extractSku(src, file);
  let relImage = extractImage(src);
  const descriptionHtml = extractDescription(src);
  const specsHtml = extractSpecs(src);
  const stock = extractStock(src);
  const inStock = stock !== 'Out of Stock';

  if (!name) {
    issues.push({ file, issue: 'Could not extract product name' });
    continue;
  }

  if (!imageExists(relImage)) {
    issues.push({ file, issue: `Image missing: ${relImage} (falling back to basket.webp)` });
    relImage = '../images/basket.webp';
  }

  const absoluteImage = toAbsolute(relImage);
  const whatsappUrl = buildWhatsAppUrl(name, priceFmt);
  const descText = cleanForMeta(descriptionHtml).replace(/[.\s]+$/, '');
  const metaDescription = `Buy the ${name} from Shree Krishna Traders. ${descText}. NPR ${priceFmt}. Fast delivery across Nepal.`;
  const jsonLdObj = buildJsonLd(name, descriptionHtml, absoluteImage, sku, category, priceRaw, pageUrl, inStock);
  const jsonLd = JSON.stringify(jsonLdObj, null, 2).split('\n').map((l) => '    ' + l).join('\n');

  // Use the product's own specs; fall back to SKU + Category if none were found.
  let specsToUse = specsHtml;
  if (!specsToUse) {
    specsToUse =
      `<div class="spec-item"><span class="spec-label">SKU</span><span class="spec-value">${sku}</span></div>` +
      `<div class="spec-item"><span class="spec-label">Category</span><span class="spec-value">${category}</span></div>`;
  }

  let out = TEMPLATE_STR;
  out = replaceAll(out, '{{NAME}}', name);
  out = replaceAll(out, '{{CATEGORY}}', category);
  out = replaceAll(out, '{{SKU}}', sku);
  out = replaceAll(out, '{{OG_IMAGE}}', absoluteImage);
  out = replaceAll(out, '{{REL_IMAGE}}', relImage);
  out = replaceAll(out, '{{PRICE_FMT}}', priceFmt);
  out = replaceAll(out, '{{PRICE_RAW}}', String(priceRaw));
  out = replaceAll(out, '{{STOCK}}', stock);
  out = replaceAll(out, '{{META_DESCRIPTION}}', metaDescription);
  out = replaceAll(out, '{{CANONICAL}}', pageUrl);
  out = replaceAll(out, '{{WHATSAPP_URL}}', whatsappUrl);
  out = replaceAll(out, '{{DESCRIPTION_HTML}}', descriptionHtml);
  out = replaceAll(out, '{{SPECS_HTML}}', specsToUse);
  out = replaceAll(out, '{{JSON_LD}}', jsonLd);

  // Validation: no leftover tokens, no old branding, approved branding present.
  const leftover = out.match(/{{[A-Z_]+}}/g);
  if (leftover) {
    issues.push({ file, issue: `Unfilled tokens: ${leftover.join(', ')}` });
  }
  if (/Tools Nepal/.test(out)) {
    issues.push({ file, issue: 'Still contains "Tools Nepal"' });
  }
  if (!/Shree Krishna Traders/.test(out)) {
    issues.push({ file, issue: 'Missing "Shree Krishna Traders" branding' });
  }
  if (!/id="relatedProductsGrid"/.test(out) || !/id="popularGrid"/.test(out) || !/id="categoryCards"/.test(out)) {
    issues.push({ file, issue: 'Missing engagement section IDs' });
  }

  fs.writeFileSync(full, out, 'utf8');
  processed++;
}

console.log(`Processed ${processed} product pages.`);
console.log(`Approved reference (${APPROVED}) left untouched.`);
if (issues.length) {
  console.log(`\nIssues (${issues.length}):`);
  for (const i of issues) console.log(`  - ${i.file}: ${i.issue}`);
} else {
  console.log('No issues detected.');
}
