const fs = require('fs');
const path = require('path');

const { products, categories, inferCategory } = require('./products-data.js');

const PRODUCTS_DIR = path.join(__dirname, 'products');
const APPROVED_PAGE = path.join(PRODUCTS_DIR, '5-inch-khukuri-1.html');
const SITEMAP_PATH = path.join(__dirname, 'sitemap.xml');
const BASE_URL = 'https://shreekrishnatraders.com.np';
const APPROVED_SLUG = '5-inch-khukuri-1';

function replaceAll(s, from, to) {
  return s.split(from).join(to);
}

function locateOpening(html, className) {
  const re = /<([a-zA-Z0-9]+)([^>]*)class="([^"]*)"([^>]*)>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    if ((m[3] || '').split(/\s+/).filter(Boolean).includes(className)) {
      return { tag: m[1], index: m.index, end: m.index + m[0].length };
    }
  }
  return null;
}

function setInnerHTML(html, className, newInner) {
  const open = locateOpening(html, className);
  if (!open) return html;
  const closeTag = `</${open.tag}>`;
  let depth = 1;
  let i = open.end;
  while (i < html.length) {
    if (html.startsWith(closeTag, i)) {
      if (depth === 1) return html.slice(0, open.end) + newInner + html.slice(i);
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
  const t = stripTags(s).replace(/[.\s]+$/, '');
  return t.length > 160 ? t.slice(0, 157).trim() + '...' : t;
}

// Build the tokenised template from the approved page (single source of truth).
function buildTemplate(src) {
  let t = src;
  t = t.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    '<script type="application/ld+json">\n{{JSON_LD}}\n    </script>');
  t = t.replace(/<meta name="description" content="[^"]*">/,
    '<meta name="description" content="{{META_DESCRIPTION}}">');
  t = t.replace(/<link rel="canonical" href="[^"]*">/,
    '<link rel="canonical" href="{{CANONICAL}}">');
  t = t.replace(/<meta property="og:url" content="[^"]*">/,
    '<meta property="og:url" content="{{CANONICAL}}">');
  t = t.replace(/href="https:\/\/wa\.me\/9779864563255\?text=[^"]*"/,
    'href="{{WHATSAPP_URL}}"');
  t = replaceAll(t, '5 inch Khukuri', '{{NAME}}');
  t = setInnerHTML(t, 'product-category', '{{CATEGORY}}');
  t = replaceAll(t, 'SKU-1', '{{SKU}}');
  t = replaceAll(t, 'https://shreekrishnatraders.com.np/images/55.webp', '{{OG_IMAGE}}');
  t = replaceAll(t, '../images/55.webp', '{{REL_IMAGE}}');
  t = replaceAll(t, '1,099', '{{PRICE_FMT}}');
  t = replaceAll(t, '1099', '{{PRICE_RAW}}');
  t = t.replace(/(<span class="dot"><\/span>\s*)In Stock/, '$1{{STOCK}}');
  t = setInnerHTML(t, 'product-description', '{{DESCRIPTION_HTML}}');
  t = setInnerHTML(t, 'specs-list', '{{SPECS_HTML}}');
  return t;
}

function extractSpecs(product) {
  const name = (product.name || '').toLowerCase();
  const specs = [];
  const inch = name.match(/(\d+)\s*inch/);
  if (inch) specs.push({ label: 'Blade Length', value: `${inch[1]} inch` });
  const kg = name.match(/(\d+(?:\.\d+)?)\s*kg/);
  if (kg) specs.push({ label: 'Weight', value: `${kg[1]} kg` });
  const gram = name.match(/(\d+)\s*gram/);
  if (gram) specs.push({ label: 'Weight', value: `${gram[1]} gram` });
  const materials = ['bone', 'wood', 'leather', 'aluminium', 'glass', 'pakistani', 'plastic'];
  for (const mat of materials) {
    if (name.includes(mat)) {
      specs.push({ label: 'Handle Material', value: mat.charAt(0).toUpperCase() + mat.slice(1) });
      break;
    }
  }
  if (specs.length === 0) specs.push({ label: 'Type', value: product.category || 'Handcrafted' });
  return specs;
}

function renderSpecsHtml(specs) {
  return specs.map(
    (s) => `
                        <div class="spec-item">
                            <span class="spec-label">${s.label}</span>
                            <span class="spec-value">${s.value}</span>
                        </div>`
  ).join('');
}

function buildWhatsAppUrl(name, priceFmt) {
  const text = `Hi, I am interested in the ${name} (NPR ${priceFmt}). Is it available?`;
  return `https://wa.me/9779864563255?text=${encodeURIComponent(text)}`;
}

function buildJsonLd(name, description, absoluteImage, sku, category, priceRaw, pageUrl) {
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
          availability: 'https://schema.org/InStock',
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

function build() {
  if (!fs.existsSync(APPROVED_PAGE)) {
    console.error('Approved reference page not found:', APPROVED_PAGE);
    process.exit(1);
  }
  const template = buildTemplate(fs.readFileSync(APPROVED_PAGE, 'utf8'));

  if (!fs.existsSync(PRODUCTS_DIR)) fs.mkdirSync(PRODUCTS_DIR, { recursive: true });

  // Preserve the approved reference page and the build template; regenerate everything else.
  const existing = fs.readdirSync(PRODUCTS_DIR).filter(
    (f) => f.endsWith('.html') && f !== 'product-template.html' && f !== `${APPROVED_SLUG}.html`
  );
  for (const f of existing) fs.unlinkSync(path.join(PRODUCTS_DIR, f));

  const generated = [];
  for (const product of products) {
    const slug = product.slug || `${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`;
    if (slug === APPROVED_SLUG) continue; // keep the curated reference page untouched

    const fileName = `${slug}.html`;
    const pageUrl = `${BASE_URL}/products/${fileName}`;
    const name = product.name;
    const priceRaw = product.price || 0;
    const priceFmt = priceRaw.toLocaleString('en-US');
    const category = product.category || inferCategory(name) || 'Other Products';
    const sku = `SKU-${product.id != null ? product.id : ''}`;
    const relImage = `../${product.image || 'images/basket.webp'}`;
    const absoluteImage = `${BASE_URL}/${(product.image || 'images/basket.webp')}`;
    const descriptionHtml = `<p>${product.description || ''}</p>`;
    const specsHtml = renderSpecsHtml(extractSpecs({ name, category }));
    const metaDescription = `Buy the ${name} from Shree Krishna Traders. ${cleanForMeta(descriptionHtml)}. NPR ${priceFmt}. Fast delivery across Nepal.`;
    const whatsappUrl = buildWhatsAppUrl(name, priceFmt);
    const jsonLd = JSON.stringify(
      buildJsonLd(name, descriptionHtml, absoluteImage, sku, category, priceRaw, pageUrl),
      null,
      2
    ).split('\n').map((l) => '    ' + l).join('\n');

    let html = template;
    html = replaceAll(html, '{{NAME}}', name);
    html = replaceAll(html, '{{CATEGORY}}', category);
    html = replaceAll(html, '{{SKU}}', sku);
    html = replaceAll(html, '{{OG_IMAGE}}', absoluteImage);
    html = replaceAll(html, '{{REL_IMAGE}}', relImage);
    html = replaceAll(html, '{{PRICE_FMT}}', priceFmt);
    html = replaceAll(html, '{{PRICE_RAW}}', String(priceRaw));
    html = replaceAll(html, '{{STOCK}}', 'In Stock');
    html = replaceAll(html, '{{META_DESCRIPTION}}', metaDescription);
    html = replaceAll(html, '{{CANONICAL}}', pageUrl);
    html = replaceAll(html, '{{WHATSAPP_URL}}', whatsappUrl);
    html = replaceAll(html, '{{DESCRIPTION_HTML}}', descriptionHtml);
    html = replaceAll(html, '{{SPECS_HTML}}', specsHtml);
    html = replaceAll(html, '{{JSON_LD}}', jsonLd);

    fs.writeFileSync(path.join(PRODUCTS_DIR, fileName), html, 'utf8');
    generated.push({ id: product.id, name, file: fileName, url: pageUrl });
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
 <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
     <loc>${BASE_URL}/</loc>
     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
     <changefreq>weekly</changefreq>
     <priority>1.0</priority>
   </url>
   <url>
     <loc>${BASE_URL}/products.html</loc>
     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
     <changefreq>weekly</changefreq>
     <priority>0.9</priority>
   </url>
   <url>
     <loc>${BASE_URL}/checkout.html</loc>
     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
     <changefreq>weekly</changefreq>
     <priority>0.5</priority>
   </url>
   <url>
     <loc>${BASE_URL}/login.html</loc>
     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
     <changefreq>weekly</changefreq>
     <priority>0.5</priority>
   </url>
   <url>
     <loc>${BASE_URL}/track.html</loc>
     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
     <changefreq>weekly</changefreq>
     <priority>0.6</priority>
   </url>
   ${generated
     .map(
       (p) => `  <url>
     <loc>${p.url}</loc>
     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
     <changefreq>weekly</changefreq>
     <priority>0.8</priority>
   </url>`
     )
     .join('\n')}
 </urlset>
 `;

  fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf8');

  console.log(`Generated ${generated.length} product pages from the approved template.`);
  console.log(`Approved reference (${APPROVED_SLUG}.html) preserved.`);
  console.log(`Updated sitemap.xml with ${generated.length + 5} URLs.`);
}

build();
