import { Product, ProductReview, ProductColorOption, ProductSizeOption } from '../types';

export const STANDARD_COLORS: ProductColorOption[] = [
  { id: 'red', name: 'Red', hex: '#ef4444', tailwindClass: 'bg-red-500', previewHueShift: 340 },
  { id: 'blue', name: 'Blue', hex: '#2563eb', tailwindClass: 'bg-blue-600', previewHueShift: 200 },
  { id: 'green', name: 'Green', hex: '#10b981', tailwindClass: 'bg-emerald-500', previewHueShift: 115 },
];

export const INITIAL_REVIEWS: Record<string, ProductReview[]> = {
  'prod-1': [
    {
      id: 'rev-101',
      productId: 'prod-1',
      userName: 'Rohan Mehta',
      rating: 5,
      title: 'Stunning geometric detail & solid base',
      comment: 'Incredible geometric definition and zero stringing. Looks stunning on my birch workstation desk and holds all my fine drafting pens.',
      date: 'Aug 24, 2026',
      verifiedPurchase: true,
    },
    {
      id: 'rev-102',
      productId: 'prod-1',
      userName: 'Ananya Desai',
      rating: 5,
      title: 'Flawless matte finish',
      comment: 'The PLA matte finish is super clean. Weight feels balanced and sturdy. Very impressed with the Bangalore delivery turnaround.',
      date: 'Aug 18, 2026',
      verifiedPurchase: true,
    },
    {
      id: 'rev-103',
      productId: 'prod-1',
      userName: 'Karthik Nair',
      rating: 4,
      title: 'Superb quality, ordered larger size',
      comment: 'The 85mm standard is great, but ended up ordering the 110mm Large version for my calipers and chunky rulers. Highly recommended!',
      date: 'Jul 30, 2026',
      verifiedPurchase: true,
    },
  ],
  'prod-2': [
    {
      id: 'rev-201',
      productId: 'prod-2',
      userName: 'Col. Vikram S.',
      rating: 5,
      title: 'Remarkable topographic accuracy',
      comment: 'The elevation ridges of the Khumbu icefall and Hillary step are clearly visible. Incredible display piece for my mountaineering collection.',
      date: 'Aug 29, 2026',
      verifiedPurchase: true,
    },
    {
      id: 'rev-202',
      productId: 'prod-2',
      userName: 'Priya Sen (Architect)',
      rating: 5,
      title: 'Museum grade resin curing',
      comment: 'Crisp micro-layer resolution with zero wash marks or warpage. Looks like an archival museum artifact.',
      date: 'Aug 12, 2026',
      verifiedPurchase: true,
    },
  ],
  'prod-3': [
    {
      id: 'rev-301',
      productId: 'prod-3',
      userName: 'Devendra K.',
      rating: 5,
      title: 'Virtually indestructible TPU',
      comment: 'Been in my pocket with heavy brass keys for 3 weeks. Zero layer separation and the links flex smoothly. Red color is vibrant!',
      date: 'Aug 26, 2026',
      verifiedPurchase: true,
    },
    {
      id: 'rev-302',
      productId: 'prod-3',
      userName: 'Sunita B.',
      rating: 4,
      title: 'Super tactile EDC fidget',
      comment: 'Very satisfying print-in-place mechanism. Smooth clicky flex. Ordered two more in Green and Blue for colleagues.',
      date: 'Aug 14, 2026',
      verifiedPurchase: true,
    },
  ],
  'prod-4': [
    {
      id: 'rev-401',
      productId: 'prod-4',
      userName: 'Arunav Sengupta (Robotics Eng)',
      rating: 5,
      title: 'Excellent mechanical gear mesh',
      comment: 'Tolerances are dialed in perfectly. 0.2mm backlash at most. Sun and planet gears rotate with butter-smooth engagement in PETG.',
      date: 'Aug 22, 2026',
      verifiedPurchase: true,
    },
    {
      id: 'rev-402',
      productId: 'prod-4',
      userName: 'Manish Verma',
      rating: 5,
      title: 'Great educational demonstration model',
      comment: 'Used this to demonstrate epicyclic gearing principles to interns. The 90mm size has a very solid hand-feel.',
      date: 'Aug 05, 2026',
      verifiedPurchase: true,
    },
  ],
  'prod-5': [
    {
      id: 'rev-501',
      productId: 'prod-5',
      userName: 'Tanvi Joshi',
      rating: 5,
      title: 'Cleanest desk cable management',
      comment: 'The snap-fit joints clicked right into place without snapping the clips. Keeps power bricks and Thunderbolt cables neatly guided.',
      date: 'Aug 27, 2026',
      verifiedPurchase: true,
    },
  ],
  'prod-6': [
    {
      id: 'rev-601',
      productId: 'prod-6',
      userName: 'Gautam Rao',
      rating: 5,
      title: 'Eliminated floor vibration on 8Nm direct drive',
      comment: 'Mounted these 60mm dampeners under my aluminum rig. Absorbs kerb and rumble vibrations completely without wobbling.',
      date: 'Aug 28, 2026',
      verifiedPurchase: true,
    },
  ],
};

export const HOTLINK_ASSETS = [
  {
    name: 'Voronoi Pen Holder',
    filename: 'voronoi_pen_holder.jpg',
    path: '/assets/voronoi_pen_holder.jpg',
    category: 'Desk Accessories',
    suggestedPrice: '₹450',
    description: 'Minimalist desk organizer printed in matte black PLA.',
  },
  {
    name: 'Topographical Map Mount Everest',
    filename: 'topographical_everest.jpg',
    path: '/assets/topographical_everest.jpg',
    category: 'Home Decor',
    suggestedPrice: '₹1200',
    description: 'High-resolution resin print for detailed display.',
  },
  {
    name: 'Articulated Flex Keychain',
    filename: 'articulated_keychain.jpg',
    path: '/assets/articulated_keychain.jpg',
    category: 'Keychains & EDC',
    suggestedPrice: '₹250',
    description: 'Durable TPU fidget keychain. Available in multiple colors.',
  },
  {
    name: 'Rapid Prototyping Lattice Part',
    filename: 'rapid_prototyping_part.jpg',
    path: '/assets/rapid_prototyping_part.jpg',
    category: 'Industrial / B2B',
    suggestedPrice: 'Custom Quote',
    description: 'Iterate faster with overnight delivery on high-resolution functional prototypes.',
  },
  {
    name: 'Industrial 3D Printer Fleet',
    filename: 'printer_fleet_b2b.jpg',
    path: '/assets/printer_fleet_b2b.jpg',
    category: 'B2B Manufacturing',
    suggestedPrice: 'Enterprise Services',
    description: 'Additive manufacturing factory floor with automated print farm.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Voronoi Pen Holder',
    price: 450,
    description: 'Minimalist desk organizer with biomimetic Voronoi lattice walls for lightweight structural rigidity.',
    category: 'Desk Accessories',
    material: 'PLA',
    image: '/assets/voronoi_pen_holder.jpg',
    bestseller: true,
    dimensions: '85 × 85 × 110 mm',
    weightGrams: 95,
    printTimeHours: 5.5,
    rating: 4.9,
    reviewCount: 3,
    colorOptions: ['#ef4444', '#2563eb', '#10b981'],
    colorVariations: STANDARD_COLORS,
    sizeOptions: [
      { id: 'sz-compact', name: 'Compact', dimensionsMm: '65 × 65 × 85 mm', price: 380 },
      { id: 'sz-standard', name: 'Standard', dimensionsMm: '85 × 85 × 110 mm', price: 450 },
      { id: 'sz-large', name: 'Large Desktop', dimensionsMm: '110 × 110 × 140 mm', price: 590 },
    ],
  },
  {
    id: 'prod-2',
    title: 'Topographical Map Mount Everest',
    price: 1200,
    description: 'High-resolution stereolithography resin display with true 1:50,000 elevation geometry of the Himalayan crest.',
    category: 'Home Decor',
    material: 'Resin',
    image: '/assets/topographical_everest.jpg',
    bestseller: false,
    dimensions: '140 × 140 × 35 mm',
    weightGrams: 210,
    printTimeHours: 12.0,
    rating: 5.0,
    reviewCount: 2,
    colorOptions: ['#ef4444', '#2563eb', '#10b981'],
    colorVariations: STANDARD_COLORS,
    sizeOptions: [
      { id: 'sz-compact', name: 'Desk Miniature', dimensionsMm: '100 × 100 × 25 mm', price: 850 },
      { id: 'sz-standard', name: 'Standard Display', dimensionsMm: '140 × 140 × 35 mm', price: 1200 },
      { id: 'sz-large', name: 'Architectural Scale', dimensionsMm: '200 × 200 × 50 mm', price: 1950 },
    ],
  },
  {
    id: 'prod-3',
    title: 'Articulated Flex Keychain',
    price: 250,
    description: 'Durable 95A Shore TPU print-in-place articulated keychain with high impact resilience and tactile mechanical links.',
    category: 'Keychains & EDC',
    material: 'TPU',
    image: '/assets/articulated_keychain.jpg',
    bestseller: false,
    dimensions: '120 × 24 × 18 mm',
    weightGrams: 28,
    printTimeHours: 2.2,
    rating: 4.8,
    reviewCount: 2,
    colorOptions: ['#ef4444', '#2563eb', '#10b981'],
    colorVariations: STANDARD_COLORS,
    sizeOptions: [
      { id: 'sz-compact', name: 'Pocket Size', dimensionsMm: '90 × 18 × 14 mm', price: 199 },
      { id: 'sz-standard', name: 'Standard EDC', dimensionsMm: '120 × 24 × 18 mm', price: 250 },
      { id: 'sz-large', name: 'Maxi Grip', dimensionsMm: '160 × 32 × 24 mm', price: 340 },
    ],
  },
  {
    id: 'prod-4',
    title: 'Industrial Planetary Gearbox Model',
    price: 850,
    description: 'Functional 4:1 mechanical gear reduction system with integrated ball-track races and high-torque PETG gears.',
    category: 'Mechanical Parts',
    material: 'PETG',
    image: '/assets/rapid_prototyping_part.jpg',
    bestseller: false,
    dimensions: '90 × 90 × 45 mm',
    weightGrams: 160,
    printTimeHours: 7.5,
    rating: 4.9,
    reviewCount: 2,
    colorOptions: ['#ef4444', '#2563eb', '#10b981'],
    colorVariations: STANDARD_COLORS,
    sizeOptions: [
      { id: 'sz-compact', name: 'Compact 2:1', dimensionsMm: '65 × 65 × 32 mm', price: 690 },
      { id: 'sz-standard', name: 'Standard 4:1', dimensionsMm: '90 × 90 × 45 mm', price: 850 },
      { id: 'sz-large', name: 'Heavy Duty 4:1', dimensionsMm: '130 × 130 × 65 mm', price: 1280 },
    ],
  },
  {
    id: 'prod-5',
    title: 'Parametric Hexagon Cable Organizers (Set of 4)',
    price: 320,
    description: 'Modular under-desk wire routing honeycomb channels with precision snap-fit joint locks in ductile PETG.',
    category: 'Desk Accessories',
    material: 'PETG',
    image: '/assets/voronoi_pen_holder.jpg',
    bestseller: false,
    dimensions: '50 × 40 × 25 mm each',
    weightGrams: 70,
    printTimeHours: 3.5,
    rating: 4.7,
    reviewCount: 1,
    colorOptions: ['#ef4444', '#2563eb', '#10b981'],
    colorVariations: STANDARD_COLORS,
    sizeOptions: [
      { id: 'sz-compact', name: 'Slim Cable (Single)', dimensionsMm: '38 × 30 × 20 mm', price: 260 },
      { id: 'sz-standard', name: 'Standard Harness (Set of 4)', dimensionsMm: '50 × 40 × 25 mm', price: 320 },
      { id: 'sz-large', name: 'Heavy Trunking (Set of 4)', dimensionsMm: '75 × 60 × 38 mm', price: 450 },
    ],
  },
  {
    id: 'prod-6',
    title: 'Vibration Dampening Feet for Sim-Rigs',
    price: 680,
    description: '95A Shore hardness TPU elastomeric pads designed for structural noise decoupling and high-torque rumble isolation.',
    category: 'Mechanical Parts',
    material: 'TPU',
    image: '/assets/articulated_keychain.jpg',
    bestseller: false,
    dimensions: '60 × 60 × 30 mm',
    weightGrams: 180,
    printTimeHours: 6.0,
    rating: 4.9,
    reviewCount: 1,
    colorOptions: ['#ef4444', '#2563eb', '#10b981'],
    colorVariations: STANDARD_COLORS,
    sizeOptions: [
      { id: 'sz-compact', name: 'Desk Mount', dimensionsMm: '45 × 45 × 22 mm', price: 520 },
      { id: 'sz-standard', name: 'Standard Rig', dimensionsMm: '60 × 60 × 30 mm', price: 680 },
      { id: 'sz-large', name: 'Direct Drive Pro', dimensionsMm: '80 × 80 × 40 mm', price: 950 },
    ],
  },
];

// Helper to get all reviews (initial + localStorage user reviews)
export function getProductReviews(productId: string): ProductReview[] {
  const seed = INITIAL_REVIEWS[productId] || [];
  try {
    const raw = localStorage.getItem('plain_layers_user_reviews');
    if (!raw) return seed;
    const allStored: Record<string, ProductReview[]> = JSON.parse(raw);
    const userReviews = allStored[productId] || [];
    return [...userReviews, ...seed];
  } catch (e) {
    return seed;
  }
}

// Helper to save a review to localStorage
export function addProductReview(reviewData: {
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  title?: string;
}): ProductReview {
  const newReview: ProductReview = {
    id: `rev-user-${Date.now()}`,
    productId: reviewData.productId,
    userName: reviewData.userName.trim() || 'Verified Customer',
    rating: Math.max(1, Math.min(5, reviewData.rating)),
    title: reviewData.title?.trim() || undefined,
    comment: reviewData.comment.trim(),
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    verifiedPurchase: true,
  };

  try {
    const raw = localStorage.getItem('plain_layers_user_reviews');
    const allStored: Record<string, ProductReview[]> = raw ? JSON.parse(raw) : {};
    if (!allStored[reviewData.productId]) {
      allStored[reviewData.productId] = [];
    }
    allStored[reviewData.productId].unshift(newReview);
    localStorage.setItem('plain_layers_user_reviews', JSON.stringify(allStored));
  } catch (e) {
    console.error('Failed to save review to localStorage', e);
  }

  return newReview;
}

// Calculate average rating and total count dynamically
export function getProductRatingSummary(productId: string): { average: number; count: number; breakdown: Record<number, number> } {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) {
    return { average: 5.0, count: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
  }

  const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;
  reviews.forEach((rev) => {
    const r = Math.min(5, Math.max(1, Math.round(rev.rating)));
    breakdown[r] = (breakdown[r] || 0) + 1;
    sum += rev.rating;
  });

  const average = Number((sum / reviews.length).toFixed(1));
  return { average, count: reviews.length, breakdown };
}

// Wishlist LocalStorage management
export function getWishlistIds(): string[] {
  try {
    const raw = localStorage.getItem('plain_layers_wishlist');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function toggleWishlistStorage(productId: string): string[] {
  try {
    const current = getWishlistIds();
    let updated: string[];
    if (current.includes(productId)) {
      updated = current.filter((id) => id !== productId);
    } else {
      updated = [...current, productId];
    }
    localStorage.setItem('plain_layers_wishlist', JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

export const SAMPLE_3D_FILES = [
  {
    name: 'drone_motor_mount_v3.stl',
    sizeMb: 4.2,
    volumeCm3: 38.4,
    dimensionsMm: { x: 74, y: 62, z: 28 },
    estimatedWeightGrams: 46,
    estimatedPrintHours: 3.2,
  },
  {
    name: 'voronoi_architectural_pavilion.obj',
    sizeMb: 12.8,
    volumeCm3: 65.2,
    dimensionsMm: { x: 110, y: 110, z: 85 },
    estimatedWeightGrams: 78,
    estimatedPrintHours: 6.5,
  },
  {
    name: 'herringbone_pinion_gear.stl',
    sizeMb: 2.1,
    volumeCm3: 22.1,
    dimensionsMm: { x: 45, y: 45, z: 32 },
    estimatedWeightGrams: 27,
    estimatedPrintHours: 2.1,
  },
];

export const MATERIAL_RATES: Record<string, { costPerGram: number; machineRatePerHour: number; density: number }> = {
  PLA: { costPerGram: 3.2, machineRatePerHour: 80, density: 1.24 },
  PETG: { costPerGram: 4.5, machineRatePerHour: 95, density: 1.27 },
  TPU: { costPerGram: 5.8, machineRatePerHour: 110, density: 1.21 },
};

export const LAYER_HEIGHT_FACTORS: Record<string, number> = {
  '0.12mm': 1.6, // Fine = longer machine time
  '0.20mm': 1.0, // Standard
  '0.28mm': 0.7, // Draft = faster machine time
};
