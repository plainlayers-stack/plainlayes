import React, { useState, useMemo, useRef } from 'react';
import {
  UploadCloud,
  Sliders,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Package,
  Layers,
  Sparkles,
  ChevronRight,
  Info,
  Ruler,
  HelpCircle,
  ShieldAlert,
  ShoppingCart,
  RotateCcw,
} from 'lucide-react';
import { MaterialType, LayerHeightType, PrintSettings, UploadedFile, QuoteBreakdown, CartItem } from '../types';
import { SAMPLE_3D_FILES, MATERIAL_RATES, LAYER_HEIGHT_FACTORS } from '../data/mockData';

interface CustomPrintingScreenProps {
  onAddCustomPrintToCart: (item: CartItem) => void;
}

export const CustomPrintingScreen: React.FC<CustomPrintingScreenProps> = ({
  onAddCustomPrintToCart,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Default uploaded sample or null
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(SAMPLE_3D_FILES[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  const [settings, setSettings] = useState<PrintSettings>({
    material: 'PLA',
    layerHeight: '0.20mm',
    infillDensity: 20,
    color: '#18181b', // Matte Black
    quantity: 1,
  });

  const colors = [
    { label: 'Matte Black', hex: '#18181b' },
    { label: 'Pure White', hex: '#f8fafc' },
    { label: 'Signal Red', hex: '#ef4444' },
    { label: 'Precision Blue', hex: '#3b82f6' },
    { label: 'Industrial Grey', hex: '#64748b' },
  ];

  // Calculate instant quote
  const quote: QuoteBreakdown = useMemo(() => {
    if (!uploadedFile) {
      return {
        materialCost: 0,
        machineTime: 0,
        shipping: 0,
        gst: 0,
        total: 0,
      };
    }

    const matInfo = MATERIAL_RATES[settings.material] || MATERIAL_RATES.PLA;
    const heightMultiplier = LAYER_HEIGHT_FACTORS[settings.layerHeight] || 1.0;
    const infillFactor = 0.3 + (settings.infillDensity / 100) * 0.7;

    // Weight estimate = volume * density * infillFactor
    const weightGrams = uploadedFile.volumeCm3 * matInfo.density * infillFactor;
    const singleMaterialCost = weightGrams * matInfo.costPerGram;

    // Machine time = baseHours * heightMultiplier * infillFactor * hourly rate
    const machineHours = uploadedFile.estimatedPrintHours * heightMultiplier * infillFactor;
    const singleMachineCost = machineHours * matInfo.machineRatePerHour;

    const subtotalRaw = (singleMaterialCost + singleMachineCost) * settings.quantity;
    const shipping = subtotalRaw > 999 ? 0 : 99;
    const total = Math.round(subtotalRaw + shipping);

    return {
      materialCost: Math.round(singleMaterialCost * settings.quantity),
      machineTime: Math.round(singleMachineCost * settings.quantity),
      shipping,
      gst: 0,
      total,
    };
  }, [uploadedFile, settings]);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const sizeMb = Number((file.size / (1024 * 1024)).toFixed(1));
    // Generate realistic volume based on size
    const estVolume = Math.max(15, Math.min(220, Math.round(sizeMb * 12 + 18)));
    const newFile: UploadedFile = {
      name: file.name,
      sizeMb: sizeMb || 1.2,
      volumeCm3: estVolume,
      dimensionsMm: {
        x: Math.round(Math.cbrt(estVolume * 1000) * 1.1),
        y: Math.round(Math.cbrt(estVolume * 1000) * 0.9),
        z: Math.round(Math.cbrt(estVolume * 1000) * 0.7),
      },
      estimatedWeightGrams: Math.round(estVolume * 1.25),
      estimatedPrintHours: Number((estVolume * 0.08 + 1.2).toFixed(1)),
    };
    setUploadedFile(newFile);
  };

  const handleAddToCart = () => {
    if (!uploadedFile) return;

    const item: CartItem = {
      id: `custom-${Date.now()}`,
      type: 'custom_print',
      title: `Custom Print: ${uploadedFile.name}`,
      subtitle: `${settings.material} • ${settings.layerHeight} • ${settings.infillDensity}% Infill`,
      price: quote.total / settings.quantity,
      quantity: settings.quantity,
      image: '/assets/rapid_prototyping_part.jpg',
      specs: {
        material: settings.material,
        layerHeight: settings.layerHeight,
        infill: settings.infillDensity,
        color: colors.find((c) => c.hex === settings.color)?.label || 'Custom',
        fileName: uploadedFile.name,
      },
    };

    onAddCustomPrintToCart(item);
    setIsSuccessToast(true);
    setTimeout(() => setIsSuccessToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 pb-24">
      {/* Top Header */}
      <section className="pt-14 pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tighter uppercase font-['Inter'] mb-3">
          Have a 3D Model? <span className="text-slate-400">We'll Print It.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Upload your designs for instant quoting and precision manufacturing. We support STL,
          3MF, and OBJ formats.
        </p>
      </section>

      {/* Main Quoter Body */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Upload Zone + Slicer Settings */}
          <div className="lg:col-span-8 space-y-6">
            {/* Upload Dropzone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center transition-all bg-white shadow-sm ${
                isDragging
                  ? 'border-slate-950 bg-slate-50'
                  : 'border-slate-200 hover:border-slate-400'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".stl,.obj,.3mf,.step"
                onChange={handleFileInput}
                className="hidden"
              />

              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4 text-slate-900">
                <UploadCloud className="w-6 h-6" />
              </div>

              <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950 mb-1">
                Drag & Drop your 3D file here
              </h3>
              <p className="text-xs text-slate-400 mb-5 font-medium">
                Supports .STL, .OBJ, .3MF (Max 100MB)
              </p>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-8 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-widest transition-all shadow-md cursor-pointer"
              >
                Browse Files
              </button>

              {/* Sample Files shortcuts */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Or try demo CAD:</span>
                {SAMPLE_3D_FILES.map((sample) => (
                  <button
                    key={sample.name}
                    type="button"
                    onClick={() => setUploadedFile(sample)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-colors cursor-pointer border ${
                      uploadedFile?.name === sample.name
                        ? 'bg-slate-950 border-slate-950 text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {sample.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Uploaded File Info Card (if present) */}
            {uploadedFile && (
              <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-900">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-tight text-slate-950">{uploadedFile.name}</h4>
                    <p className="text-xs text-slate-500">
                      {uploadedFile.sizeMb} MB • Volume: {uploadedFile.volumeCm3} cm³ • Dimensions:{' '}
                      {uploadedFile.dimensionsMm.x} × {uploadedFile.dimensionsMm.y} ×{' '}
                      {uploadedFile.dimensionsMm.z} mm
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Watertight Solid
                  </span>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="text-xs font-bold text-slate-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                    title="Remove file"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}

            {/* Print Settings Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-5 h-5 text-slate-900" />
                  <h3 className="text-base font-black uppercase tracking-tight text-slate-950">Print Settings</h3>
                </div>
                <span className="text-xs font-medium text-slate-400">
                  {uploadedFile ? 'Geometry verified' : 'No file uploaded'}
                </span>
              </div>

              {/* Material Choice */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                  Material
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['PLA', 'PETG', 'TPU'] as MaterialType[]).map((mat) => {
                    const isSelected = settings.material === mat;
                    return (
                      <button
                        key={mat}
                        type="button"
                        onClick={() => setSettings({ ...settings, material: mat })}
                        className={`py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-wider border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-slate-950 text-white border-slate-950 shadow-md shadow-slate-200'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:text-slate-950'
                        }`}
                      >
                        {mat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Layer Height (Quality) */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                  Layer Height (Quality)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: '0.12mm', label: 'Fine (0.12mm)' },
                    { val: '0.20mm', label: 'Standard (0.20mm)' },
                    { val: '0.28mm', label: 'Draft (0.28mm)' },
                  ].map((lh) => {
                    const isSelected = settings.layerHeight === lh.val;
                    return (
                      <button
                        key={lh.val}
                        type="button"
                        onClick={() =>
                          setSettings({ ...settings, layerHeight: lh.val as LayerHeightType })
                        }
                        className={`py-3 px-4 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer text-center ${
                          isSelected
                            ? 'bg-slate-950 text-white border-slate-950'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-950'
                        }`}
                      >
                        {lh.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Infill Density Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Infill Density
                  </label>
                  <span className="text-sm font-black text-slate-950">
                    {settings.infillDensity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={settings.infillDensity}
                  onChange={(e) =>
                    setSettings({ ...settings, infillDensity: Number(e.target.value) })
                  }
                  className="w-full accent-slate-950 bg-slate-200 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                  <span>10% (Light)</span>
                  <span>20% (Standard)</span>
                  <span>50% (Rigid)</span>
                  <span>100% (Solid)</span>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  {colors.map((c) => {
                    const isSelected = settings.color === c.hex;
                    return (
                      <button
                        key={c.hex}
                        type="button"
                        onClick={() => setSettings({ ...settings, color: c.hex })}
                        className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center shadow-sm ${
                          isSelected
                            ? 'border-slate-950 scale-110 shadow-md'
                            : 'border-slate-200 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.label}
                      >
                        {isSelected && (
                          <span
                            className={`w-2 h-2 rounded-full ${
                              c.hex === '#f8fafc' ? 'bg-black' : 'bg-white'
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Quote Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white border border-slate-100 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-950">Instant Quote</h3>

              {/* Breakdown Rows */}
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span className="uppercase tracking-wider">Material Cost</span>
                  <span className="font-mono text-slate-950 font-bold">
                    {quote.materialCost > 0 ? `₹ ${quote.materialCost.toFixed(2)}` : '₹ 0.00'}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 font-medium">
                  <span className="uppercase tracking-wider">Machine Time</span>
                  <span className="font-mono text-slate-950 font-bold">
                    {quote.machineTime > 0 ? `₹ ${quote.machineTime.toFixed(2)}` : '₹ 0.00'}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 font-medium">
                  <span className="uppercase tracking-wider">Shipping</span>
                  <span className="font-mono text-slate-950 font-bold">
                    {uploadedFile
                      ? quote.shipping === 0
                        ? 'FREE'
                        : `₹ ${quote.shipping.toFixed(2)}`
                      : 'TBD'}
                  </span>
                </div>

                <div className="flex justify-between text-slate-500 font-medium">
                  <span className="uppercase tracking-wider">Taxes / GST</span>
                  <span className="font-mono text-emerald-600 font-bold">
                    ₹ 0.00 (Direct Maker Price)
                  </span>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-baseline">
                  <span className="text-sm font-black uppercase tracking-wider text-slate-950">Total</span>
                  <span className="text-2xl font-black text-slate-950 font-mono">
                    {quote.total > 0 ? `₹ ${quote.total.toFixed(2)}` : '₹ 0.00'}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Quantity
                </span>
                <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setSettings({ ...settings, quantity: Math.max(1, settings.quantity - 1) })
                    }
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3.5 py-1.5 text-xs font-mono font-black text-slate-950 min-w-8 text-center">
                    {settings.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, quantity: settings.quantity + 1 })}
                    className="px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                id="quoter-add-to-cart-btn"
                type="button"
                disabled={!uploadedFile}
                onClick={handleAddToCart}
                className={`w-full py-4 px-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  uploadedFile
                    ? 'bg-slate-950 hover:bg-slate-800 text-white shadow-slate-200'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Status Note */}
              <div className="text-center">
                <p className="text-[11px] font-medium text-slate-400">
                  {uploadedFile
                    ? '✓ Ready to order. 2-3 business days dispatch.'
                    : 'Upload a file to get a quote'}
                </p>
              </div>

              {isSuccessToast && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-xs font-bold text-emerald-700 animate-in fade-in">
                  Custom print job added to cart!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How to Prepare Your File Section */}
        <section className="mt-20 pt-16 border-t border-slate-100">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 font-['Inter'] mb-8">
            How to Prepare Your File
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Check Manifold */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-sm font-black uppercase tracking-tight text-slate-950 mb-2">Check Manifold</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Ensure your 3D model is watertight and free of holes or non-manifold edges.
                </p>
              </div>
            </div>

            {/* Card 2: Scale Correctly */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-sm font-black uppercase tracking-tight text-slate-950 mb-2">Scale Correctly</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Export your model in millimeters (mm) to ensure accurate sizing when imported.
                </p>
              </div>
            </div>

            {/* Card 3: Consider Supports */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-sm font-black uppercase tracking-tight text-slate-950 mb-2">Consider Supports</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  Design with 3D printing in mind. Avoid extreme overhangs or thin fragile walls if possible.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
