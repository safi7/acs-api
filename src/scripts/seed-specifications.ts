import axios from 'axios';
import mainConfig from '../configs/main.config';

// Define product specifications fields
const specifications = [
  { name: 'Type', key: 'type', fieldType: 'text', sortOrder: 1 },
  { name: 'Key Words', key: 'key_words', fieldType: 'text', sortOrder: 2 },
  { name: 'Composition', key: 'composition', fieldType: 'textarea', sortOrder: 3 },
  { name: 'Coating', key: 'coating', fieldType: 'text', sortOrder: 4 },
  { name: 'Colour', key: 'colour', fieldType: 'text', sortOrder: 5 },
  { name: 'Tissue Reaction', key: 'tissue_reaction', fieldType: 'text', sortOrder: 6 },
  { name: 'Absorption', key: 'absorption', fieldType: 'textarea', sortOrder: 7 },
  { name: 'Presentation', key: 'presentation', fieldType: 'textarea', sortOrder: 8 },
  { name: 'Needle Type URL', key: 'needle_type_url', fieldType: 'text', sortOrder: 9 },
  { name: 'Complete Sheet', key: 'complete_sheet', fieldType: 'text', sortOrder: 10 },
  { name: 'Indications', key: 'indications', fieldType: 'textarea', sortOrder: 11 },
  { name: 'Benefits', key: 'benefits', fieldType: 'textarea', sortOrder: 12 },
  { name: 'Order Number', key: 'order_number', fieldType: 'textarea', sortOrder: 13 }
];

const categories = [
  {
    slug: 'medical-devices',
    title: 'Medical Devices',
    description: 'High-quality and advanced medical devices, covering all categories.',
    imageUrl: 'media/products/acs-product-medicals.webp'
  },
  {
    slug: 'raw-materials',
    title: 'Raw Materials',
    description: 'All types of raw materials including Glycerine, SLES, Silica Gel, and many others.',
    imageUrl: 'media/products/acs-product-raw-materials.webp'
  },
  {
    slug: 'heavy-machinery',
    title: 'Heavy Machinery',
    description: 'All types of heavy machinery including olive oil processing machines, cranes, dump trucks, and much more.',
    imageUrl: 'media/products/acs-product-heavy-machinery.webp'
  },
  {
    slug: 'electronics',
    title: 'Electronics',
    description: 'A wide range of electronics including mobile phone accessories, smartphones, laptops, tablets, and more.',
    imageUrl: 'media/products/acs-product-electronics.webp'
  },
  {
    slug: 'home-appliances',
    title: 'Home Appliances',
    description: 'Home appliances, décor, and related products for everyday living and home improvement.',
    imageUrl: 'media/products/acs-product-home-appliances.webp'
  },
  {
    slug: 'construction-materials',
    title: 'Construction Materials',
    description: 'A complete range of construction materials including steel, cement, wallpapers, and other essential supplies.',
    imageUrl: 'media/products/acs-product-construction-materials.webp'
  }
];

const products = [
  {
    name: 'Polypropylen',
    slug: 'Polypropylen',
    categorySlug: 'medical-devices',
    specifications: {
      needle_type_url: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
      complete_sheet: 'https://www.sutures.be/wp-content/uploads/Polypropylene.pdf',
      key_words: 'Wound Care',
      type: 'Monofilament',
      composition: 'Polypropylene, a polymer of propylene',
      coating: 'None',
      colour: 'Blue',
      tissue_reaction: 'Minimal',
      absorption: 'Non Absorbable',
      presentation: 'Box with 12 Sutures'
    }
  },
  {
    name: 'Silk',
    slug: 'Silk',
    categorySlug: 'medical-devices',
    specifications: {
      needle_type_url: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
      complete_sheet: 'https://www.sutures.be/wp-content/uploads/2018/10/SILK.pdf',
      key_words: 'Wound Care',
      type: 'Braided multifilament',
      composition: 'Braided fibres from the cocoon of the silkworm',
      coating: 'Silicone',
      colour: 'Black',
      tissue_reaction: 'Moderate',
      absorption: 'Silk suture elicits an initial inflammatory reaction in tissues, which is followed by gradual encapsulation of the suture by fibrous connective tissues.',
      presentation: 'Box with 12 Sutures'
    }
  },
  {
    name: 'Daclon Nylon',
    slug: 'Daclon Nylon',
    categorySlug: 'medical-devices',
    specifications: {
      needle_type_url: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
      complete_sheet: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
      key_words: 'Wound Care',
      type: 'Monofilament',
      composition: 'Extrusion of polyamide 6.0 or 6.6',
      coating: 'None',
      colour: 'Blue / Black',
      tissue_reaction: 'Minimal',
      absorption: 'Non absorbable, gradually encapsulated by connective tissue. The thread mass diminishes, approximately 10% a year by rupture of chemical links (hydrolytic action).',
      presentation: 'Box with 12 Sutures'
    }
  },
  {
    name: 'Skin Stapler & Remover',
    slug: 'Skin Stapler Remover',
    categorySlug: 'medical-devices',
    specifications: {
      complete_sheet: 'https://www.sutures.be/wp-content/uploads/SKIN-STAPLER-REMOVER.pdf',
      indications: 'SMI Skin Stapler can be used for a variety of skin closures',
      benefits: '<strong>ergonomic and user friendly design</strong> / clear view of operating site /easy to check remaining staples',
      order_number: 'ZS35W – Skin Stapler with 35 Wide Staples /1/ ZSR – Single use staple remover /2/ ZSR2 – Single use staple remover /3/'
    }
  },
  {
    name: 'Surgicryl® 910',
    slug: 'Surgicryl 910',
    categorySlug: 'medical-devices',
    specifications: {
      needle_type_url: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
      complete_sheet: 'https://www.sutures.be/wp-content/uploads/2018/10/Surgicryl_910.pdf',
      key_words: 'Wound Care',
      type: 'Braided and coated multifilament',
      composition: 'Polyglactine 910, a copolymer made of 90% glycolide and 10%L-lactide',
      coating: 'Poly-glycolide-co-L-lactide and calcium stearate (<1%)',
      colour: 'Violet',
      tissue_reaction: 'Minimal',
      absorption: 'The hydrolytic action by which the material is broken down results in total absorption between 56 and 70 days. Approximately 50% of tensile strength remains after 21 days.',
      presentation: 'Box with 12 Sutures'
    }
  }
];

async function createSpecifications() {
  console.log('Creating product specifications...');
  for (const spec of specifications) {
    try {
      await axios.post(`${mainConfig.api_url}/api/product/specifications/create`, spec);
      console.log(`✓ Created specification: ${spec.name}`);
    } catch (error) {
      console.error(`✗ Failed to create specification ${spec.name}:`, error.response?.data || error.message);
    }
  }
}

async function createCategories() {
  console.log('Creating categories...');
  for (const category of categories) {
    try {
      await axios.post(`${mainConfig.api_url}/api/product/category/create`, category);
      console.log(`✓ Created category: ${category.title}`);
    } catch (error) {
      console.error(`✗ Failed to create category ${category.title}:`, error.response?.data || error.message);
    }
  }
}

async function createProducts() {
  console.log('Creating products...');
  for (const product of products) {
    try {
      await axios.post(`${mainConfig.api_url}/api/product/create`, product);
      console.log(`✓ Created product: ${product.name}`);
    } catch (error) {
      console.error(`✗ Failed to create product ${product.name}:`, error.response?.data || error.message);
    }
  }
}

async function run() {
  try {
    await createSpecifications();
    await createCategories();
    await createProducts();
    console.log('✓ Seeding completed successfully!');
  } catch (error) {
    console.error('✗ Seeding failed:', error);
  }
}

run();