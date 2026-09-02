import React from 'react';
import { UploadCloud, Settings, Send, ArrowRight, Layers, Compass, Store, FileUp } from 'lucide-react';
import { ScreenType } from '../types';
import { BrandLogo } from './BrandLogo';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenConsult: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onOpenConsult }) => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900">
      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        {/* Subtle top background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-100/30 rounded-full blur-[120px] pointer-events-none" />

        {/* Brand Crest Badge */}
        <div className="flex justify-center mb-6">
          <div className="group p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-orange-500/40 hover:shadow-md transition-all duration-200 inline-flex items-center gap-3 pr-4 cursor-default">
            <BrandLogo size="md" />
            <div className="text-left">
              <span className="block text-[9px] font-black uppercase tracking-widest text-orange-600">Plain Layers Brand</span>
              <span className="block text-xs font-black uppercase tracking-tight text-slate-950 font-['Inter']">Additive Manufacturing Lab</span>
            </div>
          </div>
        </div>

        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Express Nationwide Shipping | Direct Maker Prices • No Hidden Tax</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tighter leading-[1.08] mb-6 font-['Inter'] uppercase">
          Precision Manufacturing <br />
          <span className="text-slate-400">For Everyone</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Industrial-grade 3D printing and prototyping services. Upload your CAD designs
          or explore our curated marketplace of ready-made engineered parts.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-upload-btn"
            onClick={() => onNavigate('custom-printing')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-slate-200 cursor-pointer"
          >
            <FileUp className="w-4 h-4" />
            <span>Upload 3D Design</span>
          </button>

          <button
            id="hero-shop-btn"
            onClick={() => onNavigate('shop')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-900 border border-slate-200 hover:border-slate-950 font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm"
          >
            <Store className="w-4 h-4 text-slate-700" />
            <span>Shop Ready-Made</span>
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-100">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-['Inter'] uppercase mb-3">
            How It Works
          </h2>
          <p className="text-slate-400 text-sm font-medium">
            From concept to physical part in three seamless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-200">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 text-slate-900">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-950 mb-2 uppercase tracking-tight">1. Upload</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload your STL, OBJ, or STEP files to our secure portal.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-200">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 text-slate-900">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-950 mb-2 uppercase tracking-tight">2. Configure</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Select material, infill, resolution, and get instant pricing.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-200">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-6 text-slate-900">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black text-slate-950 mb-2 uppercase tracking-tight">3. Print & Ship</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Track your order in real-time as we manufacture and dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* B2B Manufacturing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-100 mb-12">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-['Inter'] uppercase mb-2">
            B2B Manufacturing
          </h2>
          <p className="text-slate-400 text-sm font-medium">
            Scalable solutions for industrial and architectural needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Large Card: Rapid Prototyping */}
          <div className="lg:col-span-6 relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-950 min-h-[380px] flex flex-col justify-end p-8 group shadow-sm">
            {/* Background image */}
            <img
              src="/assets/rapid_prototyping_part.jpg"
              alt="Rapid Prototyping lattice part"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-40 group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

            {/* Content */}
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-3">
                Most Popular
              </span>
              <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Rapid Prototyping</h3>
              <p className="text-xs text-slate-300 mb-5 max-w-md leading-relaxed">
                Iterate faster with overnight delivery on high-resolution functional prototypes.
              </p>
              <button
                onClick={() => onNavigate('business')}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-slate-300 transition-colors cursor-pointer"
              >
                <span>Explore Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Grid Column */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Top Card: Batch Production */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 relative flex flex-col justify-between shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-950 mb-2 uppercase tracking-tight">Batch Production</h3>
                  <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                    Cost-effective short-run manufacturing (10-10,000 units) without tooling costs.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <button
                onClick={() => onNavigate('business')}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-950 hover:text-slate-500 transition-colors cursor-pointer mt-4"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom 2 mini cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Engineering Resins */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <h4 className="text-sm font-black text-slate-950 mb-2 uppercase tracking-tight">Engineering Resins</h4>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    High temp, tough, and flexible options.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-slate-100 text-slate-700">
                    ABS-like
                  </span>
                  <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-slate-100 text-slate-700">
                    Nylon
                  </span>
                </div>
              </div>

              {/* Design for Additive */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Design for Additive</h4>
                <button
                  onClick={onOpenConsult}
                  className="px-4 py-2 rounded-full bg-slate-950 text-white text-[10px] font-black tracking-widest uppercase hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Book Consult
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
