import axios from 'axios';
import mainConfig from '../configs/main.config';

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

// Product specifications field definitions
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

const products = [
  {
    name: 'Polypropylen',
    slug: 'Polypropylen',
    shortDescription: 'Non-absorbable monofilament suture made from polypropylene polymer',
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
    shortDescription: 'Braided multifilament suture made from natural silk fibers',
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
    shortDescription: 'Monofilament nylon suture with excellent tensile strength',
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
    shortDescription: 'Ergonomic skin stapler with remover for various skin closures',
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
    shortDescription: 'Absorbable braided suture made from polyglactine 910 copolymer',
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
  },
  {
    name: 'Catgut Plain',
    slug: 'Catgut Plain',
    shortDescription: 'Natural absorbable suture made from purified bovine collagen',
    categorySlug: 'medical-devices',
    specifications: {
      needle_type_url: 'https://www.sutures.be/wp-content/uploads/2018/10/Catgut_PLAIN.pdf',
      complete_sheet: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
      key_words: 'Wound Care',
      type: 'Twisted multifilament with a monofilament appearance',
      composition: 'Strands of purified collagen taken from the serosal layer of selected bovines. Origin from BSE-free classified countries.',
      coating: 'None',
      colour: 'Ivory',
      tissue_reaction: 'Moderate',
      absorption: 'By phagocytosis. Complete mass absorption in approximately 63 days. Approximately 50% of tensile strength remains after 7 days. When used in infected tissues or in tissues with increased levels of proteolytic enzymes (stomach, cervix, vagina) it is more quickly absorbed.',
      presentation: 'Box with 12 Sutures'
    }
  },
  {
    name: 'Catgut Chrome',
    slug: 'Catgut Chrome',
    shortDescription: 'Chrome-tanned catgut suture with extended absorption time',
    categorySlug: 'medical-devices',
    specifications: {
      needle_type_url: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
      complete_sheet: 'https://www.sutures.be/wp-content/uploads/2018/10/Catgut_CHROM.pdf',
      key_words: 'Wound Care',
      type: 'Twisted multifilament with a monofilament appearance',
      composition: 'Strands of purified collagen taken from the serosal layer of selected bovines, tanned with chrome salts. Origin from BSE-free classified countries.',
      coating: 'None',
      colour: 'Dark brown',
      tissue_reaction: 'Moderate',
      absorption: 'By phagocytosis. The rate of absorption is slowed down by chromizing. Complete mass absorption in approximately 90 days. Approximately 50% of tensile strength remains after 14 days. When used in infected tissues or in tissues with increased levels of proteolytic enzymes (stomach, cervix, vagina) it is more quickly absorbed.',
      presentation: 'Box with 12 Sutures'
    }
  },
  {
    name: 'Bone Wax',
    slug: 'Bone Wax',
    shortDescription: 'Sterile bone wax for controlling bleeding from bone surfaces',
    categorySlug: 'medical-devices',
    specifications: {
      complete_sheet: 'https://www.sutures.be/wp-content/uploads/MM-BW-1.0-EN-BONE-WAX.pdf',
      composition: 'refined white beeswax, paraffin and isopropyl palmitate',
      indications: 'used in the control of bleeding from bone surfaces by acting as a mechanical barrier',
      presentation: '2,5 g plates individually wrapped\n12 in one box, sterile',
      order_number: 'Z046'
    }
  },
  {
    name: 'Surgicryl® PGA',
    slug: 'Surgicryl PGA',
    shortDescription: 'Absorbable braided suture made from polyglycolic acid',
    categorySlug: 'medical-devices',
    specifications: {
      needle_type_url: 'https://www.sutures.be/wp-content/uploads/2018/10/Surgicryl_PGA.pdf',
      complete_sheet: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
      key_words: 'Wound Care',
      type: 'Braided and coated multifilament',
      composition: 'Polyglycolic acid',
      coating: 'Polycaprolactone and calcium stearate (1%)',
      colour: 'Violet / Beige – undyed',
      tissue_reaction: 'Minimal',
      absorption: 'The hydrolytic action by which the material is broken down results in total absorption in approximately 60 to 90 days. Approximately 50% of tensile strength remain after 21 days.',
      presentation: 'Box with 12 Sutures'
    }
  },
  {
    name: 'Surgical blades',
    slug: 'Surgical blades',
    shortDescription: 'High-quality carbon steel surgical blades for precision cutting',
    categorySlug: 'medical-devices',
    specifications: {
      complete_sheet: 'https://www.sutures.be/wp-content/uploads/MM-ZB-SURGICAL-BLADES-SCALPEL-HANDLES.pdf',
      composition: 'Carbon Steel',
      presentation: 'Individual sterile foil packs/\nBlades without handle: 100 / box\nBlades with plastic handle 10 / box',
      order_number: 'For more details, see the complete product sheet.'
    }
  },
  {
    name: 'SMI Spon',
    slug: 'SMI Spon',
    shortDescription: 'Absorbable gelatin sponge for hemostatic applications',
    categorySlug: 'medical-devices',
    specifications: {
      complete_sheet: 'https://www.sutures.be/wp-content/uploads/MM-ZHG-SMI-SPON.pdf',
      composition: 'Highly purified first grade gelatine material',
      indications: 'For use in various surgical procedures. Intended for haemostatic use by applying to a bleeding surface. Non pyrogenic and biocompatible.',
      order_number: 'ZHG805010 – STANDARD – 80 x 50 x 10 mm – /1/\nZHG705010 – REGULAR – 70 x 50 x 10 mm – /2/\nZHG805001 – SPECIAL – 80 x 50 x 1 mm – /3/\nZHG8030 – TAMPON – 80 x 30 mm DIA – /4/\nZHG101010 – DENTAL CUBE – 10 x 10 x 10 mm – /5/\nZHG20070005 – FILM – 200 x 70 x 0.5 mm'
    }
  },
  {
    name: 'Polypropylene mesh',
    slug: 'Polypropylene mesh',
    shortDescription: 'Elastic polypropylene mesh for abdominal wall reinforcement',
    categorySlug: 'medical-devices',
    specifications: {
      complete_sheet: 'https://www.sutures.be/wp-content/uploads/MM-ZM-V1.0-EN-MESH.pdf',
      indications: 'Reinforcement of the abdominal wall\n• Hernia\n• Eventration\nvia celioscopy or laparotomy',
      composition: 'Monofilament polypropylene knitted into an elastic, durable mesh',
      benefits: '<strong>Extreme dimensional stability</strong>\nVery thin mesh structure\nIdeal porosity\nExcellent transparency\nGood handling\nEasy to cut\nWell tolerated',
      order_number: 'Square & Rectangular Mesh STANDARD MESH 5 pc.\n5 cm x 10 cm – ZMS0510\n6 cm x 11 cm – ZMS0611\n7,5 cm x 15 cm – ZMS07515\n10 cm x 15 cm – ZMS1015\n15 cm x 15 cm – ZMS1515\n30 cm x 30 cm – ZMS3030'
    }
  }
];

async function createSpecifications() {
  const url = `${mainConfig.api_url}/api/product/specifications/create`;
  console.log('Creating product specifications...');
  try {
    for (let spec of specifications) {
      try {
        await axios.post(url, spec);
        console.log(`✓ Created specification: ${spec.name}`);
      } catch (error) {
        console.log(`✗ Failed to create specification ${spec.name}:`, error.response?.data?.message || error.message);
      }
    }
  } catch (err) {
    console.log('Error creating specifications:', err);
  }
}

async function createCategories() {
  const url = `${mainConfig.api_url}/api/product/category/create`;
  console.log('Creating categories...');
  try {
    for (let each of categories) {
      try {
        await axios.post(url, each);
        console.log(`✓ Created category: ${each.title}`);
      } catch (error) {
        console.log(`✗ Failed to create category ${each.title}:`, error.response?.data?.message || error.message);
      }
    }
  } catch (err) {
    console.log('Error creating categories:', err);
  }
}

async function createProducts() {
  const url = `${mainConfig.api_url}/api/product/create`;
  console.log('Creating products...');
  try {
    for (let each of products) {
      try {
        await axios.post(url, each);
        console.log(`✓ Created product: ${each.name}`);
      } catch (error) {
        console.log(`✗ Failed to create product ${each.name}:`, error.response?.data?.message || error.message);
      }
    }
  } catch (err) {
    console.log('Error creating products:', err);
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
