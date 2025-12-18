"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
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
        needleTypeUrl: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
        completeSheet: 'https://www.sutures.be/wp-content/uploads/Polypropylene.pdf',
        keyWords: 'Wound Care',
        type: 'Monofilament',
        composition: 'Polypropylene, a polymer of propylene',
        coating: 'None',
        colour: 'Blue',
        tissueReaction: 'Minimal',
        absorption: 'Non Absorbable',
        presentation: 'Box with 12 Sutures'
    },
    {
        name: 'Silk',
        slug: 'Silk',
        categorySlug: 'medical-devices',
        needleTypeUrl: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
        completeSheet: 'https://www.sutures.be/wp-content/uploads/2018/10/SILK.pdf',
        keyWords: 'Wound Care',
        type: 'Braided multifilament',
        composition: 'Braided fibres from the cocoon of the silkworm',
        coating: 'Silicone',
        colour: 'Black',
        tissueReaction: 'Moderate',
        absorption: 'Silk suture elicits an initial inflammatory reaction in tissues, which is followed by gradual encapsulation of the suture by fibrous connective tissues.',
        presentation: 'Box with 12 Sutures'
    },
    {
        name: 'Daclon Nylon',
        slug: 'Daclon Nylon',
        categorySlug: 'medical-devices',
        needleTypeUrl: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
        completeSheet: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
        keyWords: 'Wound Care',
        type: 'Monofilament',
        composition: 'Extrusion of polyamide 6.0 or 6.6',
        coating: 'None',
        colour: 'Blue / Black',
        tissueReaction: 'Minimal',
        absorption: 'Non absorbable, gradually encapsulated by connective tissue. The thread mass diminishes, approximately 10% a year by rupture of chemical links (hydrolytic action).',
        presentation: 'Box with 12 Sutures'
    },
    {
        name: 'Skin Stapler & Remover',
        slug: 'Skin Stapler Remover',
        categorySlug: 'medical-devices',
        completeSheet: 'https://www.sutures.be/wp-content/uploads/SKIN-STAPLER-REMOVER.pdf',
        indications: 'SMI Skin Stapler can be used for a variety of skin closures',
        benefits: 'ergonomic and user friendly design / clear view of operating site /easy to check remaining staples',
        orderNumber: 'ZS35W – Skin Stapler with 35 Wide Staples /1/ ZSR – Single use staple remover /2/ ZSR2 – Single use staple remover /3/'
    },
    {
        name: 'Surgicryl® 910',
        slug: 'Surgicryl 910',
        categorySlug: 'medical-devices',
        needleTypeUrl: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
        completeSheet: 'https://www.sutures.be/wp-content/uploads/2018/10/Surgicryl_910.pdf',
        keyWords: 'Wound Care',
        type: 'Braided and coated multifilament',
        composition: 'Polyglactine 910, a copolymer made of 90% glycolide and 10%L-lactide',
        coating: 'Poly-glycolide-co-L-lactide and calcium stearate (<1%)',
        colour: 'Violet',
        tissueReaction: 'Minimal',
        absorption: 'The hydrolytic action by which the material is broken down results in total absorption between 56 and 70 days. Approximately 50% of tensile strength remains after 21 days.',
        presentation: 'Box with 12 Sutures'
    },
    {
        name: 'Catgut Plain',
        slug: 'Catgut Plain',
        categorySlug: 'medical-devices',
        needleTypeUrl: 'https://www.sutures.be/wp-content/uploads/2018/10/Catgut_PLAIN.pdf',
        completeSheet: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
        keyWords: 'Wound Care',
        type: 'Twisted multifilament with a monofilament appearance',
        composition: 'Strands of purified collagen taken from the serosal layer of selected bovines. Origin from BSE-free classified countries.',
        coating: 'None',
        colour: 'Ivory',
        tissueReaction: 'Moderate',
        absorption: 'By phagocytosis. Complete mass absorption in approximately 63 days. Approximately 50% of tensile strength remains after 7 days. When used in infected tissues or in tissues with increased levels of proteolytic enzymes (stomach, cervix, vagina) it is more quickly absorbed.',
        presentation: 'Box with 12 Sutures'
    },
    {
        name: 'Catgut Chrome',
        slug: 'Catgut Chrome',
        categorySlug: 'medical-devices',
        needleTypeUrl: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
        completeSheet: 'https://www.sutures.be/wp-content/uploads/2018/10/Catgut_CHROM.pdf',
        keyWords: 'Wound Care',
        type: 'Twisted multifilament with a monofilament appearance',
        composition: 'Strands of purified collagen taken from the serosal layer of selected bovines, tanned with chrome salts. Origin from BSE-free classified countries.',
        coating: 'None',
        colour: 'Dark brown',
        tissueReaction: 'Moderate',
        absorption: 'By phagocytosis. The rate of absorption is slowed down by chromizing. Complete mass absorption in approximately 90 days. Approximately 50% of tensile strength remains after 14 days. When used in infected tissues or in tissues with increased levels of proteolytic enzymes (stomach, cervix, vagina) it is more quickly absorbed.',
        presentation: 'Box with 12 Sutures'
    },
    {
        name: 'Bone Wax',
        slug: 'Bone Wax',
        categorySlug: 'medical-devices',
        completeSheet: 'https://www.sutures.be/wp-content/uploads/MM-BW-1.0-EN-BONE-WAX.pdf',
        composition: 'refined white beeswax, paraffin and isopropyl palmitate',
        indications: 'used in the control of bleeding from bone surfaces by acting as a mechanical barrier',
        presentation: '2,5 g plates individually wrapped\n12 in one box, sterile',
        orderNumber: 'Z046'
    },
    {
        name: 'Surgicryl® PGA',
        slug: 'Surgicryl PGA',
        categorySlug: 'medical-devices',
        needleTypeUrl: 'https://www.sutures.be/wp-content/uploads/2018/10/Surgicryl_PGA.pdf',
        completeSheet: 'https://www.sutures.be/wp-content/uploads/2018/01/Needle-type.pdf',
        keyWords: 'Wound Care',
        type: 'Braided and coated multifilament',
        composition: 'Polyglycolic acid',
        coating: 'Polycaprolactone and calcium stearate (1%)',
        colour: 'Violet / Beige – undyed',
        tissueReaction: 'Minimal',
        absorption: 'The hydrolytic action by which the material is broken down results in total absorption in approximately 60 to 90 days. Approximately 50% of tensile strength remain after 21 days.',
        presentation: 'Box with 12 Sutures'
    },
    {
        name: 'Surgical blades',
        slug: 'Surgical blades',
        categorySlug: 'medical-devices',
        completeSheet: 'https://www.sutures.be/wp-content/uploads/MM-ZB-SURGICAL-BLADES-SCALPEL-HANDLES.pdf',
        composition: 'Carbon Steel',
        presentation: 'Individual sterile foil packs/\nBlades without handle: 100 / box\nBlades with plastic handle 10 / box',
        orderNumber: 'For more details, see the complete product sheet.'
    },
    {
        name: 'SMI Spon',
        slug: 'SMI Spon',
        categorySlug: 'medical-devices',
        completeSheet: 'https://www.sutures.be/wp-content/uploads/MM-ZHG-SMI-SPON.pdf',
        composition: 'Highly purified first grade gelatine material',
        indications: 'For use in various surgical procedures. Intended for haemostatic use by applying to a bleeding surface. Non pyrogenic and biocompatible.',
        orderNumber: 'ZHG805010 – STANDARD – 80 x 50 x 10 mm – /1/\nZHG705010 – REGULAR – 70 x 50 x 10 mm – /2/\nZHG805001 – SPECIAL – 80 x 50 x 1 mm – /3/\nZHG8030 – TAMPON – 80 x 30 mm DIA – /4/\nZHG101010 – DENTAL CUBE – 10 x 10 x 10 mm – /5/\nZHG20070005 – FILM – 200 x 70 x 0.5 mm'
    },
    {
        name: 'Polypropylene mesh',
        slug: 'Polypropylene mesh',
        categorySlug: 'medical-devices',
        completeSheet: 'https://www.sutures.be/wp-content/uploads/MM-ZM-V1.0-EN-MESH.pdf',
        indications: 'Reinforcement of the abdominal wall\n• Hernia\n• Eventration\nvia celioscopy or laparotomy',
        composition: 'Monofilament polypropylene knitted into an elastic, durable mesh',
        benefits: 'Extreme dimensional stability\nVery thin mesh structure\nIdeal porosity\nExcellent transparency\nGood handling\nEasy to cut\nWell tolerated',
        orderNumber: 'Square & Rectangular Mesh STANDARD MESH 5 pc.\n5 cm x 10 cm – ZMS0510\n6 cm x 11 cm – ZMS0611\n7,5 cm x 15 cm – ZMS07515\n10 cm x 15 cm – ZMS1015\n15 cm x 15 cm – ZMS1515\n30 cm x 30 cm – ZMS3030'
    }
];
async function run() {
    await createCategories();
    await createProducts();
}
async function createProducts() {
    const url = `http://localhost:3001/api/product/create`;
    console.log({ url });
    try {
        for (let each of products) {
            const param = {
                ...each
            };
            await axios_1.default.post(url, param);
        }
    }
    catch (err) {
        console.log('errr', err);
    }
}
async function createCategories() {
    const url = `http://localhost:3001/api/product/category/create`;
    console.log({ url });
    try {
        for (let each of categories) {
            await axios_1.default.post(url, each);
        }
    }
    catch (err) {
        console.log('errr', err);
    }
}
run();
//# sourceMappingURL=quick.js.map