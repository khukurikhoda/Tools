const products = [
  { id: 1, name: "5 inch Khukuri", slug: "5-inch-khukuri-1", price: 1099, category: null, description: "", image: "images/55.webp" },
  { id: 3, name: "Hasiya", slug: "hasiya-3", price: 1500, category: null, description: "", image: "images/90.webp" },
  { id: 4, name: "chulesi", slug: "chulesi-4", price: 1700, category: null, description: "", image: "images/78.webp" },
  { id: 5, name: "5INCH WHITE BONE HANDLE KHUKURI", slug: "5inch-white-bone-handle-khukuri-5", price: 1799, category: null, description: "", image: "images/39.webp" },
  { id: 6, name: "DAU HIGH FINISHING", slug: "dau-high-finishing-6", price: 2199, category: null, description: "", image: "images/u.webp" },
  { id: 7, name: "10 inch khukuri", slug: "10-inch-khukuri-7", price: 1999, category: null, description: "", image: "images/62.webp" },
  { id: 8, name: "Khukuri 5 inch", slug: "khukuri-5-inch-8", price: 2000, category: null, description: "", image: "images/101.webp" },
  { id: 9, name: "Knife", slug: "knife-9", price: 2000, category: null, description: "", image: "images/130.webp" },
  { id: 10, name: "Bhojpuri khukuri 6 inch", slug: "bhojpuri-khukuri-6-inch-10", price: 2199, category: null, description: "", image: "images/71.webp" },
  { id: 10, name: "5 inch wood handal pana walla", slug: "5-inch-wood-handal-pana-walla-10", price: 2200, category: null, description: "", image: "images/91.webp" },
  { id: 12, name: "5 inch blade bone Handle", slug: "5-inch-blade-bone-handle-12", price: 2499, category: null, description: "", image: "images/95.webp" },
  { id: 13, name: "Bhojpuri khukuri 8 inch", slug: "bhojpuri-khukuri-8-inch-13", price: 2799, category: null, description: "", image: "images/66.webp" },
  { id: 14, name: "Bhojpuri khukuri 8 inch", slug: "bhojpuri-khukuri-8-inch-14", price: 2799, category: null, description: "", image: "images/63.webp" },
  { id: 15, name: "1.2KG DAU", slug: "12kg-dau-15", price: 2999, category: null, description: "", image: "images/42.webp" },
  { id: 17, name: "KHUKURI 7 INCH WITH STAND", slug: "khukuri-7-inch-with-stand-17", price: 2999, category: null, description: "", image: "images/7inc.webp" },
  { id: 17, name: "10 inch sirupate khukuri", slug: "10-inch-sirupate-khukuri-17", price: 2999, category: null, description: "", image: "images/117.webp" },
  { id: 17, name: "10 inch sirupate khukuri", slug: "10-inch-sirupate-khukuri-17-1", price: 2999, category: null, description: "", image: "images/118.webp" },
  { id: 18, name: "JAPANEESE DAU", slug: "japaneese-dau-18", price: 3000, category: null, description: "", image: "images/hdau.webp" },
  { id: 19, name: "9 inch pana", slug: "9-inch-pana-19", price: 3300, category: null, description: "", image: "images/98.webp" },
  { id: 20, name: "750GRAM DAU WITH COVER", slug: "750gram-dau-with-cover-20", price: 3499, category: null, description: "", image: "images/40.webp" },
  { id: 21, name: "900GRAM DAU WITH COVER", slug: "900gram-dau-with-cover-21", price: 3499, category: null, description: "", image: "images/41.webp" },
  { id: 22, name: "Curve Dau High Quality", slug: "curve-dau-high-quality-22", price: 3999, category: null, description: "", image: "images/59.webp" },
  { id: 23, name: "BLACK RAMBO TYPE DAU LEATHER COVER", slug: "black-rambo-type-dau-leather-cover-23", price: 3499, category: null, description: "", image: "images/32.webp" },
  { id: 24, name: "KHUKURI 10 inch WOOD HANDLE BLACK COVER", slug: "khukuri-10-inch-wood-handle-black-cover-24", price: 3500, category: null, description: "", image: "images/woodh.webp" },
  { id: 25, name: "RAMBO KNIFE BONE HANDLE", slug: "rambo-knife-bone-handle-25", price: 3999, category: null, description: "", image: "images/43.webp" },
  { id: 26, name: "RAMBO KNIFE 10 inch", slug: "rambo-knife-10-inch-26", price: 4999, category: null, description: "", image: "images/46.webp" },
  { id: 27, name: "KNIFE LEATHER COVER", slug: "knife-leather-cover-27", price: 4000, category: null, description: "", image: "images/wow.webp" },
  { id: 28, name: "RAINBOW KNIFE 8 INCH", slug: "rainbow-knife-8-inch-28", price: 4000, category: null, description: "", image: "images/38.webp" },
  { id: 30, name: "Khukuri 10 inch", slug: "khukuri-10-inch-30", price: 4000, category: null, description: "", image: "images/89.webp" },
  { id: 33, name: "khukuri 11with stand", slug: "khukuri-11with-stand-33", price: 4699, category: null, description: "", image: "images/93.webp" },
  { id: 34, name: "10 inch self defense knife", slug: "10-inch-self-defense-knife-34", price: 5499, category: null, description: "", image: "images/47.webp" },
  { id: 35, name: "9 inch thai khukuri", slug: "9-inch-thai-khukuri-35", price: 4999, category: null, description: "", image: "images/49.webp" },
  { id: 36, name: "Dau with Cover", slug: "khuraki-36", price: 4999, category: null, description: "", image: "images/60.webp" },
  { id: 38, name: "TIGER KNIFE", slug: "tiger-knife-38", price: 5499, category: null, description: "", image: "images/tigerknife.webp" },
  { id: 39, name: "KHUKURI BONE HANDLE PANA 10 INCH", slug: "khukuri-bone-handle-pana-10-inch-39", price: 5499, category: null, description: "", image: "images/paro.webp" },
  { id: 40, name: "10inch SAFTEY KNIFE LEATHER COLOUR", slug: "10inch-saftey-knife-leather-colour-40", price: 5499, category: null, description: "", image: "images/48.webp" },
  { id: 41, name: "5inch BLADE,BONE HANDLE AND HIDING KHUKURI", slug: "5inch-bladebone-handle-and-hiding-khukuri-41", price: 4999, category: null, description: "", image: "images/58.webp" },
  { id: 42, name: "11INCH KHUKURI TYPE KNIFE", slug: "11inch-khukuri-type-knife-42", price: 4999, category: null, description: "", image: "images/44.webp" },
  { id: 43, name: "THAILAND TYPE FISH CUTTING DAU 1.3KG", slug: "thailand-type-fish-cutting-dau-13kg-43", price: 4999, category: null, description: "", image: "images/37.webp" },
  { id: 44, name: "S KNIFE", slug: "s-knife-44", price: 4999, category: null, description: "", image: "images/33.webp" },
  { id: 45, name: "KHUKURI 11inch WOOD HANDLE", slug: "khukuri-11inch-wood-handle-45", price: 4999, category: null, description: "", image: "images/34.webp" },
  { id: 46, name: "KHUKURI 10 INCH MIX COLOUR WITH STAND", slug: "khukuri-10-inch-mix-colour-with-stand-46", price: 4999, category: null, description: "", image: "images/random.webp" },
  { id: 48, name: "RANBOW KNIFE bone handle", slug: "ranbow-knife-bone-handle-48", price: 4999, category: null, description: "", image: "images/57.webp" },
  { id: 49, name: "BONE HANDLE KHUKURI", slug: "bone-handle-khukuri-49", price: 4999, category: null, description: "", image: "images/AGAD5926.webp" },
  { id: 50, name: "Dragon Eagle 10 inch", slug: "dragon-eagle-10-inch-50", price: 4999, category: null, description: "", image: "images/64.webp" },
  { id: 51, name: "Kitchen Knife", slug: "kitchen-knife-51", price: 4999, category: null, description: "", image: "images/churi.webp" },
  { id: 52, name: "10 inch fish type knife khukuri", slug: "10-inch-fish-type-knife-khukuri-52", price: 4999, category: null, description: "", image: "images/92.webp" },
  { id: 52, name: "Horn Knife", slug: "horn-knife-52", price: 4999, category: null, description: "", image: "images/127.webp" },
  { id: 53, name: "8 inch Rambo knife orginal leather cover", slug: "8-inch-rambo-knife-orginal-leather-cover-53", price: 4999, category: null, description: "", image: "images/94.webp" },
  { id: 54, name: "Rambo Knife", slug: "rambo-knife-54", price: 5499, category: null, description: "", image: "images/100.webp" },
  { id: 55, name: "FISH KNIFE 1.3KG WITH COVER", slug: "fish-knife-13kg-with-cover-55", price: 5499, category: null, description: "", image: "images/50.webp" },
  { id: 56, name: "13 inch chitlang and sirupate khukuri", slug: "13-inch-chitlang-and-sirupate-khukuri-56", price: 5499, category: null, description: "", image: "images/51.webp" },
  { id: 58, name: "GREEN LEAFS KHUKURI 10inch", slug: "green-leafs-khukuri-10inch-58", price: 5999, category: null, description: "", image: "images/31.webp" },
  { id: 58, name: "GREEN LEAFS KHUKURI 10inch Black Cover", slug: "green-leafs-khukuri-10inch-black-cover-58", price: 5999, category: null, description: "", image: "images/129.webp" },
  { id: 59, name: "GreenLeaf 10 inch black cover", slug: "greenleaf-10-inch-black-cover-59", price: 5999, category: null, description: "", image: "images/70.webp" },
  { id: 60, name: "13 inch Blade 5 inch Handle Full Brash and Genuine Leather Cover", slug: "13-inch-blade-5-inch-handle-full-brash-ane-cover-geniune-leather-60", price: 6499, category: null, description: "", image: "images/72.webp" },
  { id: 61, name: "SIRUPATE KHUKURI ALUMINIUM HANDLE 13 INCH", slug: "sirupate-khukuri-aluminium-handle-13-inch-61", price: 6499, category: null, description: "", image: "images/silver.webp" },
  { id: 62, name: "GreenLeaf 12 inch", slug: "greenleaf-12-inch-62", price: 6499, category: null, description: "", image: "images/65.webp" },
  { id: 63, name: "DHAL FULL BRASS (1KG 12INCH)", slug: "dhal-full-brass-1kg-12inch-63", price: 6499, category: null, description: "", image: "images/30.webp" },
  { id: 64, name: "Khoda Type Dau", slug: "khoda-type-dau-64", price: 6499, category: null, description: "", image: "images/sdau.webp" },
  { id: 65, name: "Clean Dau Fish Cutting", slug: "clean-dau-fish-cutting-65", price: 6499, category: null, description: "", image: "images/56.webp" },
  { id: 66, name: "Dragon eagel10 inch ganga wall", slug: "dragon-eagel10-inch-ganga-wall-66", price: 6500, category: null, description: "", image: "images/68.webp" },
  { id: 67, name: "DHANKUTE KHUKURI WITH STAND", slug: "dhankute-khukuri-with-stand-67", price: 6999, category: null, description: "", image: "images/dhunkute.webp" },
  { id: 68, name: "KHUKURI HIGH QUALITY LEATHER", slug: "khukuri-high-quality-leather-68", price: 7999, category: null, description: "", image: "images/khuk.webp" },
  { id: 68, name: "Khukuri 12 inch", slug: "khukuri-12-inch-68", price: 7999, category: null, description: "", image: "images/117.webp" },
  { id: 68, name: "Khukuri 12 inch", slug: "khukuri-12-inch-68-1", price: 7999, category: null, description: "", image: "images/115.webp" },
  { id: 68, name: "Khukuri 12 inch", slug: "khukuri-12-inch-68-2", price: 7999, category: null, description: "", image: "images/116.webp" },
  { id: 69, name: "LEATHER BAG", slug: "leather-bag-69", price: 8999, category: null, description: "", image: "images/leather.webp" },
  { id: 70, name: "20 inch khukuri mar hanne", slug: "20-inch-khukuri-mar-hanne-70", price: 8999, category: null, description: "", image: "images/52.webp" },
  { id: 70, name: "Knife Whole Set", slug: "knife-whole-set-70", price: 8999, category: null, description: "", image: "images/126.webp" },
  { id: 70, name: "Hanging Knife Rool Bag Genuine Leather", slug: "hanging-knife-rool-bag-genuine-leather-70", price: 9499, category: null, description: "", image: "images/132.webp" },
  { id: 71, name: "21 inch pana Khukuri", slug: "21-inch-pana-khukuri-71", price: 9999, category: null, description: "", image: "images/53.webp" },
  { id: 72, name: "13 inch chitlang and sirupate khukuri", slug: "13-inch-chitlang-and-sirupate-khukuri-72", price: 10000, category: null, description: "", image: "images/51.webp" },
  { id: 73, name: "Samurai (Katana) 18 inch with Stand", slug: "samuraikatana-18-inch-73", price: 12000, category: null, description: "", image: "images/85.webp" },
  { id: 73, name: "18 inch Green Leafs Khukuri", slug: "samuraikatana-18-inch-73-1", price: 11000, category: null, description: "", image: "images/123.webp" },
  { id: 75, name: "DRAGON KHODA ONLY WOOD HANDLE", slug: "dragon-khoda-only-wood-handle-75", price: 12999, category: null, description: "", image: "images/open.webp" },
  { id: 76, name: "CUT DESIGN WOOD HANDLE KHODA", slug: "cut-design-wood-handle-khoda-76", price: 12999, category: null, description: "", image: "images/75.webp" },
  { id: 77, name: "KHODA", slug: "khoda-77", price: 12999, category: null, description: "", image: "images/61.webp" },
  { id: 78, name: "KHODA", slug: "khoda-78", price: 12999, category: null, description: "", image: "images/76.webp" },
  { id: 79, name: "Khoda with lether cover 22 inch", slug: "khoda-with-lether-cover-22-inch-79", price: 13000, category: null, description: "", image: "images/86.webp" },
  { id: 92, name: "Khoda 20 inch Leather Cover", slug: "khoda-20-inch-leather-cover", price: 12000, category: null, description: "", image: "images/133.webp" },
  { id: 81, name: "KHODA 22INCH BLADE 10 INCH HANDLE", slug: "khoda-22inch-blade-10-inch-handle-81", price: 13999, category: null, description: "", image: "images/khoda.webp" },
  { id: 82, name: "Trishul (trident)", slug: "trishul-trident-82", price: 14999, category: null, description: "", image: "images/96.webp" },
  { id: 83, name: "TIGER HANDLE TARBAL 31 inch", slug: "tiger-handle-tarbal-31-inch-83", price: 15499, category: null, description: "", image: "images/r.webp" },
  { id: 84, name: "TARBAL 31 inch", slug: "tarbal-31-inch-84", price: 15999, category: null, description: "", image: "images/t.webp" },
  { id: 85, name: "Khoda 24 inch blade 13 inch handle 2.8kg weight with cover", slug: "khoda-24-inch-blade-13-inch-handle-28kg-weight-with-cover-85", price: 16499, category: null, description: "", image: "images/74.webp" },
  { id: 86, name: "Talbar 31 inch", slug: "talbar-31-inch-86", price: 18000, category: null, description: "", image: "images/99.webp" },
  { id: 87, name: "Tarbal", slug: "tarbal-87", price: 19000, category: null, description: "", image: "images/84.webp" },
  { id: 88, name: "24 inch blade glas Handel", slug: "24-inch-blade-glas-handel-88", price: 23000, category: null, description: "", image: "images/81.webp" },
  { id: 89, name: "Khoda (penguin handle)", slug: "khoda-penguin-handle-89", price: 23000, category: null, description: "", image: "images/88.webp" },
  { id: 89, name: "Full Kitchen Set", slug: "khoda-penguin-handle-89-1", price: 31000, category: "Knife", type: "Set", description: "", image: "images/131.webp" },
  { id: 90, name: "Full Wall Set talbar", slug: "full-wall-set-talbar-90", price: 44500, category: null, description: "", image: "images/83.webp" },
  { id: 91, name: "Full Wall Set talbar 32 inch length", slug: "full-wall-set-talbar-32-inch-length-91", price: 46000, category: null, description: "", image: "images/82.webp" },
];
// Categories for filtering
const categories = [
  "All Products",
  "Khukuri",
  "Khoda",
  "Kitchen Knives",
  "Butcher Knives",
  "Stands",
  "Agricultural Tools",
  "Handicraft Tools",
  "Other Products"
];

function inferCategory(name) {
  const normalizedName = `${name || ''}`.toLowerCase();

  if (normalizedName.includes('khoda') || normalizedName.includes('khoda')) {
    return 'Khoda';
  }
  if (normalizedName.includes('khukuri') || normalizedName.includes('knife') || normalizedName.includes('dau') || normalizedName.includes('rambo') || normalizedName.includes('s knife') || normalizedName.includes('tiger') || normalizedName.includes('tarbal') || normalizedName.includes('talbar') || normalizedName.includes('trishul')) {
    return normalizedName.includes('knife') || normalizedName.includes('dau') || normalizedName.includes('rambo') || normalizedName.includes('s knife') || normalizedName.includes('tiger') || normalizedName.includes('tarbal') || normalizedName.includes('talbar') || normalizedName.includes('trishul')
      ? 'Other Products'
      : 'Khukuri';
  }
  if (normalizedName.includes('kitchen')) {
    return 'Kitchen Knives';
  }
  if (normalizedName.includes('butcher')) {
    return 'Butcher Knives';
  }
  if (normalizedName.includes('stand') || normalizedName.includes('cover')) {
    return 'Stands';
  }
  if (normalizedName.includes('bag') || normalizedName.includes('holder') || normalizedName.includes('wallet')) {
    return 'Handicraft Tools';
  }
  return 'Other Products';
}

function inferDescription(productName, price) {
  const name = `${productName || ''}`.toLowerCase();
  if (name.includes('khoda')) {
    return 'A striking traditional blade with bold presence and heritage craftsmanship.';
  }
  if (name.includes('khukuri') || name.includes('knife') || name.includes('dau')) {
    return 'Premium handcrafted quality designed for strength, balance, and daily use.';
  }
  if (price >= 15000) {
    return 'A statement piece made for collectors and serious traditional tool lovers.';
  }
  return 'A beautifully finished piece combining tradition, detail, and everyday utility.';
}

products.forEach((product) => {
  const inferredCategory = inferCategory(product.name);
  product.category = product.category || inferredCategory;
  product.description = product.description || inferDescription(product.name, product.price);
  product.image = product.image || 'images/basket.webp';
});

if (typeof window !== 'undefined') {
  window.products = products;
  window.categories = categories;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products, categories, inferCategory };
}

