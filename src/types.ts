export type ScreenType = 'home' | 'shop' | 'custom-printing' | 'business' | 'portfolio' | 'learn';

export interface ProductSizeOption {
  id: string;
  name: string; // e.g. "Standard", "Medium", "Large"
  dimensionsMm: string; // e.g. "85 × 85 × 110 mm"
  price: number; // calculated or specific price for this variation
}

export interface ProductColorOption {
  id: string;
  name: string; // e.g. "Red", "Blue", "Green"
  hex: string;
  tailwindClass: string;
  previewHueShift?: number; // CSS hue-rotate degree or filter for visual simulation
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  rating: number; // 1 - 5
  title?: string;
  comment: string;
  date: string;
  verifiedPurchase?: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: 'Desk Accessories' | 'Keychains & EDC' | 'Home Decor' | 'Mechanical Parts';
  material: 'PLA' | 'PETG' | 'TPU' | 'Resin';
  image: string;
  bestseller?: boolean;
  colorOptions?: string[];
  dimensions?: string;
  weightGrams?: number;
  printTimeHours?: number;
  rating?: number;
  reviewCount?: number;
  sizeOptions?: ProductSizeOption[];
  colorVariations?: ProductColorOption[];
  reviews?: ProductReview[];
}

export type MaterialType = 'PLA' | 'PETG' | 'TPU';
export type LayerHeightType = '0.12mm' | '0.20mm' | '0.28mm';

export interface PrintSettings {
  material: MaterialType;
  layerHeight: LayerHeightType;
  infillDensity: number; // 10 to 100
  color: string;
  quantity: number;
}

export interface UploadedFile {
  name: string;
  sizeMb: number;
  volumeCm3: number;
  dimensionsMm: { x: number; y: number; z: number };
  estimatedWeightGrams: number;
  estimatedPrintHours: number;
}

export interface QuoteBreakdown {
  materialCost: number;
  machineTime: number;
  shipping: number;
  gst: number;
  total: number;
}

export interface CartItem {
  id: string;
  type: 'product' | 'custom_print';
  title: string;
  price: number;
  quantity: number;
  image: string;
  subtitle?: string;
  specs?: {
    material?: string;
    layerHeight?: string;
    infill?: number;
    color?: string;
    fileName?: string;
    sizeMm?: string;
    colorName?: string;
  };
}

export interface B2BQuoteFormData {
  companyName: string;
  contactPerson: string;
  businessEmail: string;
  requirementType: string;
  estimatedQuantity: string;
  cadFileName?: string;
  notes?: string;
}
