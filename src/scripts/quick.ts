import axios from 'axios';
import mainConfig from '../configs/main.config';

const categories = [
  {
    slug: 'medical-devices-disposables',
    title: 'Medical Devices & Disposables',
    description: 'High-quality disposable medical supplies and advanced medical devices.',
    imageUrl: 'media/products/acs-product-medical.webp'
  },
  {
    slug: 'surgical-instruments',
    title: 'Surgical Instruments',
    description: 'Precision surgical tools and instruments for medical professionals.',
    imageUrl: 'media/products/acs-product-surgical.webp'
  },
  {
    slug: 'wound-care',
    title: 'Wound Care',
    description: 'Advanced wound care products and dressing solutions.',
    imageUrl: 'media/products/acs-product-wound.webp'
  },
  {
    slug: 'dental',
    title: 'Dental',
    description: 'Comprehensive dental equipment and supplies.',
    imageUrl: 'media/products/acs-product-dental.webp'
  },
  {
    slug: 'cardiology',
    title: 'Cardiology',
    description: 'Specialized cardiac care equipment and supplies.',
    imageUrl: 'media/products/acs-product-cardiology.webp'
  },
  {
    slug: 'orthopaedics',
    title: 'Orthopaedics',
    description: 'Complete range of orthopaedic supplies and equipment.',
    imageUrl: 'media/products/acs-product-orthopaedics.webp'
  }
];

const products = [
  {
    name: 'Advanced Patient Monitor',
    shortDescription: 'Multi-parameter vital signs monitoring system',
    fullDescription:
      'State-of-the-art patient monitoring system featuring advanced vital signs tracking, including ECG, SpO2, NIBP, and temperature. High-resolution touch screen display with wireless connectivity.',
    imageUrl: 'https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg',
    categorySlug: 'medical-devices-disposables',
    manufacturer: 'MedTech Solutions',
    certifications: ['CE', 'FDA', 'ISO 13485'],
    specifications: {
      Display: '15.6" Color TFT Touch Screen',
      Parameters: 'ECG, SpO2, NIBP, Temp, Resp',
      'Battery Life': '4 hours',
      Connectivity: 'Wi-Fi, Bluetooth'
    }
  },
  {
    name: 'Digital Infusion Pump',
    shortDescription: 'Precision medication delivery system',
    fullDescription:
      'Advanced infusion pump with multiple delivery modes, programmable rates, and safety features. Ideal for continuous or intermittent medication administration.',
    imageUrl: 'https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg',
   categorySlug: 'medical-devices-disposables',
    manufacturer: 'InfuTech',
    certifications: ['CE', 'FDA'],
    specifications: {
      'Flow Rate': '0.1-999 ml/hr',
      Accuracy: '±2%',
      Display: 'Color LCD',
      Battery: 'Lithium-ion'
    }
  },
  {
    name: 'Portable Ventilator',
    shortDescription: 'Compact respiratory support device',
    fullDescription:
      'Lightweight and portable ventilator for both invasive and non-invasive ventilation. Features multiple ventilation modes and built-in battery backup.',
    imageUrl: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg',
   categorySlug: 'medical-devices-disposables',
    manufacturer: 'RespiraCare',
    certifications: ['CE', 'FDA', 'ISO 13485'],
    specifications: {
      Weight: '4.5 kg',
      Modes: '6 ventilation modes',
      'Battery Life': '6 hours',
      Display: '7" Touch Screen'
    }
  },
  {
    name: 'Digital Thermometer',
    shortDescription: 'Fast and accurate temperature measurement',
    fullDescription: 'Professional-grade digital thermometer with quick reading time and high accuracy. Features memory function and fever alarm.',
    imageUrl: 'https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg',
   categorySlug: 'medical-devices-disposables',
    manufacturer: 'TempTech',
    certifications: ['CE'],
    specifications: {
      Range: '32.0°C - 42.9°C',
      Accuracy: '±0.1°C',
      'Response Time': '10 seconds',
      Memory: 'Last 10 readings'
    }
  },
  {
    name: 'Pulse Oximeter',
    shortDescription: 'SpO2 and pulse rate monitor',
    fullDescription:
      'Fingertip pulse oximeter for quick and reliable measurement of oxygen saturation and pulse rate. Perfect for both clinical and home use.',
    imageUrl: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg',
   categorySlug: 'medical-devices-disposables',
    manufacturer: 'OxyHealth',
    certifications: ['CE', 'FDA'],
    specifications: {
      'SpO2 Range': '0-100%',
      'Pulse Range': '30-250 bpm',
      Display: 'OLED',
      'Battery Life': '30 hours'
    }
  },
  {
    name: 'Blood Pressure Monitor',
    shortDescription: 'Automatic BP measurement device',
    fullDescription:
      'Professional automatic blood pressure monitor with irregular heartbeat detection and averaging function. Large display for easy reading.',
    imageUrl: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg',
   categorySlug: 'medical-devices-disposables',
    manufacturer: 'CardioTech',
    certifications: ['CE', 'FDA'],
    specifications: {
      Measurement: 'Oscillometric',
      Memory: '60 readings',
      'Cuff Size': '22-42 cm',
      Accuracy: '±3 mmHg'
    }
  },

  // Surgical Instruments
  {
    name: 'Premium Surgical Scissors',
    shortDescription: 'Precision-crafted surgical scissors',
    fullDescription:
      'High-quality surgical scissors made from surgical-grade stainless steel. Features precision-ground edges and ergonomic handles for optimal control.',
    imageUrl: 'https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg',
    categorySlug: 'surgical-instruments',
    manufacturer: 'SurgicalPro',
    certifications: ['CE', 'ISO 13485'],
    specifications: {
      Material: 'Surgical Grade Steel',
      Length: '14.5 cm',
      Type: 'Mayo-Stille',
      Sterilization: 'Autoclavable'
    }
  },
  {
    name: 'Surgical Forceps Set',
    shortDescription: 'Complete set of surgical forceps',
    fullDescription:
      'Comprehensive set of surgical forceps including tissue, dressing, and hemostatic forceps. Made from high-quality stainless steel with precise serrations.',
    imageUrl: 'https://images.unsplash.com/photo-1560269941-141b145a1b57',
    categorySlug: 'surgical-instruments',
    manufacturer: 'InstruMed',
    certifications: ['CE'],
    specifications: {
      'Set Contents': '6 pieces',
      Material: 'Stainless Steel',
      Finish: 'Satin',
      Case: 'Included'
    }
  },
  {
    name: 'Surgical Scalpel Set',
    shortDescription: 'Professional scalpel kit',
    fullDescription:
      'Complete surgical scalpel set with various blade sizes and handle options. Includes sterilization case and blade removal system.',
    imageUrl: 'https://images.pexels.com/photos/3376799/pexels-photo-3376799.jpeg',
    categorySlug: 'surgical-instruments',
    manufacturer: 'SharpMed',
    certifications: ['CE', 'ISO 13485'],
    specifications: {
      Handles: '3 sizes',
      Blades: '10 pieces',
      Material: 'Surgical Steel',
      Case: 'Autoclavable'
    }
  },
  {
    name: 'Needle Holder',
    shortDescription: 'Precision needle holder',
    fullDescription: 'Premium quality needle holder with tungsten carbide inserts for superior grip. Smooth action and precise needle control.',
    imageUrl: 'https://images.pexels.com/photos/3376800/pexels-photo-3376800.jpeg',
    categorySlug: 'surgical-instruments',
    manufacturer: 'SurgicalPro',
    certifications: ['CE'],
    specifications: {
      Length: '18 cm',
      Material: 'Stainless Steel',
      Insert: 'Tungsten Carbide',
      'Lock Type': 'Ratchet'
    }
  },
  {
    name: 'Surgical Retractor',
    shortDescription: 'Self-retaining surgical retractor',
    fullDescription: 'Versatile self-retaining retractor system with adjustable blades. Provides stable and clear surgical field access.',
    imageUrl: 'https://images.pexels.com/photos/3376801/pexels-photo-3376801.jpeg',
    categorySlug: 'surgical-instruments',
    manufacturer: 'InstruMed',
    certifications: ['CE', 'ISO 13485'],
    specifications: {
      Type: 'Self-retaining',
      Material: 'Stainless Steel',
      'Blade Width': '25mm',
      Adjustable: 'Yes'
    }
  },
  {
    name: 'Surgical Clamp Set',
    shortDescription: 'Versatile surgical clamps',
    fullDescription: 'Set of essential surgical clamps including hemostatic, tissue, and vascular clamps. Made from premium surgical steel.',
    imageUrl: 'https://images.pexels.com/photos/3376802/pexels-photo-3376802.jpeg',
    categorySlug: 'surgical-instruments',
    manufacturer: 'SurgicalPro',
    certifications: ['CE'],
    specifications: {
      'Set Contents': '8 pieces',
      Material: 'Surgical Steel',
      Types: 'Various',
      Case: 'Included'
    }
  },

  // Wound Care
  {
    name: 'Advanced Wound Dressing',
    shortDescription: 'Hydrocolloid wound dressing',
    fullDescription:
      'Advanced wound dressing with hydrocolloid technology for optimal wound healing environment. Excellent exudate management and waterproof outer layer.',
    imageUrl: 'https://images.pexels.com/photos/3987142/pexels-photo-3987142.jpeg',
    categorySlug:'wound-care',
    manufacturer: 'WoundTech',
    certifications: ['CE', 'FDA'],
    specifications: {
      Size: '10cm x 10cm',
      Type: 'Hydrocolloid',
      Adhesive: 'Gentle Silicone',
      'Wear Time': '7 days'
    }
  },
  {
    name: 'Negative Pressure Wound Therapy System',
    shortDescription: 'Portable wound vacuum system',
    fullDescription:
      'Compact negative pressure wound therapy system for advanced wound management. Features adjustable pressure settings and leak detection.',
    imageUrl: 'https://images.pexels.com/photos/3987143/pexels-photo-3987143.jpeg',
    categorySlug:'wound-care',
    manufacturer: 'HealTech',
    certifications: ['CE', 'FDA'],
    specifications: {
      'Pressure Range': '40-200 mmHg',
      Modes: 'Continuous/Intermittent',
      'Battery Life': '12 hours',
      Canister: '300ml'
    }
  },
  {
    name: 'Antimicrobial Gauze',
    shortDescription: 'Silver-infused wound gauze',
    fullDescription: 'Sterile gauze dressing with silver ions for antimicrobial protection. Highly absorbent and non-adherent to wounds.',
    imageUrl: 'https://images.pexels.com/photos/3987144/pexels-photo-3987144.jpeg',
    categorySlug:'wound-care',
    manufacturer: 'WoundTech',
    certifications: ['CE'],
    specifications: {
      Size: '10cm x 20cm',
      Material: 'Cotton with Silver',
      Sterility: 'Sterile',
      Packaging: 'Individual'
    }
  },
  {
    name: 'Wound Cleansing Solution',
    shortDescription: 'Sterile wound cleanser',
    fullDescription: 'pH-balanced wound cleansing solution for effective debris removal. Non-cytotoxic and suitable for all wound types.',
    imageUrl: 'https://images.pexels.com/photos/3987145/pexels-photo-3987145.jpeg',
    categorySlug:'wound-care',
    manufacturer: 'CleanMed',
    certifications: ['CE'],
    specifications: {
      Volume: '250ml',
      pH: '5.5-6.5',
      Sterility: 'Sterile',
      Application: 'Spray'
    }
  },
  {
    name: 'Compression Bandage System',
    shortDescription: 'Multi-layer compression therapy',
    fullDescription: 'Four-layer compression bandage system for effective management of venous leg ulcers and lymphedema.',
    imageUrl: 'https://images.pexels.com/photos/3987146/pexels-photo-3987146.jpeg',
    categorySlug:'wound-care',
    manufacturer: 'CompressCare',
    certifications: ['CE'],
    specifications: {
      Layers: '4',
      Length: '3m stretched',
      Width: '10cm',
      Compression: '40 mmHg'
    }
  },
  {
    name: 'Wound Care Kit',
    shortDescription: 'Complete dressing change kit',
    fullDescription:
      'Sterile wound care kit containing essential items for professional wound dressing changes. Single-use components ensure infection control.',
    imageUrl: 'https://images.pexels.com/photos/3987147/pexels-photo-3987147.jpeg',
    categorySlug:'wound-care',
    manufacturer: 'WoundTech',
    certifications: ['CE'],
    specifications: {
      Contents: '12 items',
      Type: 'Single-use',
      Sterility: 'Sterile',
      Packaging: 'Peel-open'
    }
  },

  // Dental Equipment
  {
    name: 'Dental Chair Unit',
    shortDescription: 'Complete dental treatment unit',
    fullDescription:
      'Comprehensive dental treatment unit with patient chair, delivery system, light, and assistant instrumentation. Features programmable positions and LED lighting.',
    imageUrl: 'https://images.pexels.com/photos/3845981/pexels-photo-3845981.jpeg',
    categorySlug:'dental',
    manufacturer: 'DentTech',
    certifications: ['CE', 'ISO 13485'],
    specifications: {
      'Chair Positions': '8 programmable',
      Light: 'LED 30000 lux',
      Display: 'Touch panel',
      Warranty: '3 years'
    }
  },
  {
    name: 'Dental X-Ray System',
    shortDescription: 'Digital dental imaging system',
    fullDescription: 'Advanced digital dental X-ray system with low radiation exposure. Features instant image preview and DICOM compatibility.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1661306446784-d2cf8d0e0a34',
    categorySlug:'dental',
    manufacturer: 'ImageDent',
    certifications: ['CE', 'FDA'],
    specifications: {
      Resolution: '20 lp/mm',
      'Exposure Time': '0.02-2 sec',
      Sensor: 'CMOS',
      Software: 'Included'
    }
  },
  {
    name: 'Dental Handpiece Set',
    shortDescription: 'High-speed dental handpieces',
    fullDescription:
      'Premium dental handpiece set including high-speed, low-speed, and electric handpieces. Features LED lighting and ceramic bearings.',
    imageUrl: 'https://images.pexels.com/photos/3845983/pexels-photo-3845983.jpeg',
    categorySlug:'dental',
    manufacturer: 'DentTech',
    certifications: ['CE'],
    specifications: {
      Speed: 'Up to 400,000 rpm',
      Light: 'LED',
      Spray: 'Triple',
      Sterilization: 'Autoclavable'
    }
  },
  {
    name: 'Dental Curing Light',
    shortDescription: 'LED polymerization light',
    fullDescription: 'High-power LED curing light with multiple curing modes. Cordless design with built-in light meter.',
    imageUrl: 'https://images.pexels.com/photos/3845984/pexels-photo-3845984.jpeg',
    categorySlug:'dental',
    manufacturer: 'LightCure',
    certifications: ['CE'],
    specifications: {
      Power: '2000 mW/cm²',
      Modes: '3',
      Battery: 'Li-ion',
      Display: 'OLED'
    }
  },
  {
    name: 'Dental Ultrasonic Scaler',
    shortDescription: 'Piezoelectric scaling system',
    fullDescription: 'Advanced ultrasonic scaling system with LED lighting and multiple tips. Features touch control and water flow adjustment.',
    imageUrl: 'https://images.pexels.com/photos/3845985/pexels-photo-3845985.jpeg',
    categorySlug:'dental',
    manufacturer: 'DentTech',
    certifications: ['CE', 'FDA'],
    specifications: {
      Frequency: '28-32 kHz',
      Tips: '6 included',
      Control: 'Touch panel',
      Light: 'LED'
    }
  },
  {
    name: 'Dental Sterilizer',
    shortDescription: 'Autoclave for dental instruments',
    fullDescription: 'Class B autoclave specifically designed for dental instruments. Features multiple sterilization cycles and built-in printer.',
    imageUrl: 'https://images.pexels.com/photos/3845986/pexels-photo-3845986.jpeg',
    categorySlug:'dental',
    manufacturer: 'SteriDent',
    certifications: ['CE'],
    specifications: {
      Chamber: '18L',
      Cycles: '5 programs',
      Display: 'LCD',
      Printer: 'Built-in'
    }
  },

  // Cardiology Equipment
  {
    name: '12-Lead ECG System',
    shortDescription: 'Advanced electrocardiograph',
    fullDescription:
      'High-performance 12-lead ECG system with touch screen interface and automatic interpretation. Features wireless data transfer and EMR integration.',
    imageUrl: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg',
    categorySlug:'cardiology',
    manufacturer: 'CardioTech',
    certifications: ['CE', 'FDA'],
    specifications: {
      Channels: '12',
      Display: '10" Touch Screen',
      Memory: '1000 ECGs',
      Connectivity: 'Wi-Fi/LAN'
    }
  },
  {
    name: 'Cardiac Ultrasound',
    shortDescription: 'Portable echocardiography system',
    fullDescription: 'Compact cardiac ultrasound system with advanced imaging technologies. Features color Doppler and strain analysis capabilities.',
    imageUrl: 'https://images.pexels.com/photos/4386468/pexels-photo-4386468.jpeg',
    categorySlug:'cardiology',
    manufacturer: 'EchoTech',
    certifications: ['CE', 'FDA'],
    specifications: {
      Modes: '2D/Color/PW/CW',
      Display: '15" LED',
      Storage: '500GB SSD',
      Probes: '3 ports'
    }
  },
  {
    name: 'Holter Monitor',
    shortDescription: '24-hour ECG recorder',
    fullDescription: 'Lightweight Holter monitor for continuous ECG recording. Features high-resolution recording and advanced analysis software.',
    imageUrl: 'https://images.pexels.com/photos/4386469/pexels-photo-4386469.jpeg',
    categorySlug:'cardiology',
    manufacturer: 'CardioTech',
    certifications: ['CE'],
    specifications: {
      Channels: '3/12',
      Recording: '24-48 hours',
      Memory: '32GB',
      Weight: '95g'
    }
  },
  {
    name: 'Stress Test System',
    shortDescription: 'Cardiac stress testing system',
    fullDescription:
      'Complete cardiac stress test system including treadmill and monitoring unit. Features automatic BP measurement and ST analysis.',
    imageUrl: 'https://images.pexels.com/photos/4386470/pexels-photo-4386470.jpeg',
    categorySlug:'cardiology',
    manufacturer: 'CardioFit',
    certifications: ['CE', 'FDA'],
    specifications: {
      ECG: '12-lead',
      Protocols: '12 pre-set',
      Display: '22" LCD',
      Treadmill: 'Included'
    }
  },
  {
    name: 'Defibrillator Monitor',
    shortDescription: 'Advanced life support defibrillator',
    fullDescription: 'Multi-parameter defibrillator monitor with manual and AED modes. Features pacing and SpO2 monitoring capabilities.',
    imageUrl: 'https://images.pexels.com/photos/4386471/pexels-photo-4386471.jpeg',
    categorySlug:'cardiology',
    manufacturer: 'CardioLife',
    certifications: ['CE', 'FDA'],
    specifications: {
      Energy: '1-200 joules',
      Display: '8.4" Color',
      Battery: '4 hours',
      Weight: '6 kg'
    }
  },
  {
    name: 'Blood Pressure Monitor',
    shortDescription: '24-hour ABPM system',
    fullDescription:
      'Ambulatory blood pressure monitoring system for 24-hour BP measurement. Features quiet operation and comprehensive analysis software.',
    imageUrl: 'https://images.pexels.com/photos/4386472/pexels-photo-4386472.jpeg',
    categorySlug:'cardiology',
    manufacturer: 'CardioTech',
    certifications: ['CE'],
    specifications: {
      Measurements: '250 readings',
      Intervals: 'Programmable',
      Display: 'LCD',
      Software: 'Included'
    }
  },

  // Orthopaedic Equipment
  {
    name: 'Surgical Power Tools Set',
    shortDescription: 'Orthopaedic power instrument set',
    fullDescription:
      'Complete set of battery-powered surgical tools including drill, saw, and reamer. Features quick-coupling system and sterilizable cases.',
    imageUrl: 'https://images.pexels.com/photos/4483327/pexels-photo-4483327.jpeg',
    categorySlug:'orthopaedics',
    manufacturer: 'OrthoTech',
    certifications: ['CE', 'FDA'],
    specifications: {
      Tools: '3 handpieces',
      Battery: 'Li-ion',
      Speed: 'Variable',
      Case: 'Sterilizable'
    }
  },
  {
    name: 'Arthroscopy System',
    shortDescription: 'HD arthroscopic imaging system',
    fullDescription: 'High-definition arthroscopy system with 4K camera and LED light source. Features image management and recording capabilities.',
    imageUrl: 'https://images.pexels.com/photos/4483328/pexels-photo-4483328.jpeg',
    categorySlug:'orthopaedics',
    manufacturer: 'EndoVision',
    certifications: ['CE'],
    specifications: {
      Resolution: '4K',
      Light: 'LED 300W',
      Recording: '4K/60fps',
      Monitor: '27" 4K'
    }
  },
  {
    name: 'External Fixation System',
    shortDescription: 'Modular fixation system',
    fullDescription: 'Versatile external fixation system for fracture treatment. Features carbon fiber rods and multiple clamp options.',
    imageUrl: 'https://images.pexels.com/photos/4483329/pexels-photo-4483329.jpeg',
    categorySlug:'orthopaedics',
    manufacturer: 'OrthoTech',
    certifications: ['CE', 'FDA'],
    specifications: {
      Material: 'Carbon Fiber/Steel',
      Clamps: 'Multiple sizes',
      Rods: '4-8mm',
      Kit: 'Complete set'
    }
  },
  {
    name: 'Casting Equipment Set',
    shortDescription: 'Complete casting solution',
    fullDescription:
      'Comprehensive casting equipment set including saw, scissors, and spreaders. Features variable speed cast saw with vacuum attachment.',
    imageUrl: 'https://images.pexels.com/photos/4483330/pexels-photo-4483330.jpeg',
    categorySlug:'orthopaedics',
    manufacturer: 'CastCare',
    certifications: ['CE'],
    specifications: {
      Saw: 'Variable speed',
      Tools: '12 pieces',
      Vacuum: 'Built-in',
      Case: 'Included'
    }
  },
  {
    name: 'Orthopedic Bed',
    shortDescription: 'Electric orthopedic hospital bed',
    fullDescription: 'Advanced electric hospital bed with orthopedic features. Multiple positions and built-in traction system.',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1664476702259-60105cd76d2d',
    categorySlug:'orthopaedics',
    manufacturer: 'OrthoTech',
    certifications: ['CE'],
    specifications: {
      Positions: '4 motors',
      Load: '250 kg',
      Rails: 'Collapsible',
      Battery: 'Backup'
    }
  },
  {
    name: 'Traction Unit',
    shortDescription: 'Electronic traction therapy system',
    fullDescription: 'Computerized traction unit for cervical and lumbar treatment. Features programmable protocols and patient data storage.',
    imageUrl: 'https://images.pexels.com/photos/4483332/pexels-photo-4483332.jpeg',
    categorySlug:'orthopaedics',
    manufacturer: 'PhysioTech',
    certifications: ['CE'],
    specifications: {
      Force: '0-90 kg',
      Programs: '20 preset',
      Display: 'Touch LCD',
      Timer: 'Digital'
    }
  }
];


async function run(){
  await createCategories();
  await createProducts();

}

async function createProducts(){
  const url = `${mainConfig.api_url}/api/product/create`;
  console.log({ url });
  try {
    for (let each of products) {
      const param = {
        ...each,
        certifications: each.certifications.join(','),
        specifications: JSON.stringify(each.specifications)
      };
      await axios.post(url, param);
    }
  } catch (err) {
    console.log('errr', err);
  }
}

async function createCategories(){
  const url = `${mainConfig.api_url}/api/product/category/create`;
  console.log({ url });
  try {
    for (let each of categories) {
      await axios.post(url, each);
    }
  } catch (err) {
    console.log('errr', err);
  }
}

run()
