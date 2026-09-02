import React from 'react';
import { BookOpen, CheckCircle, ShieldAlert, Cpu, Sparkles, Sliders } from 'lucide-react';
import { ScreenType } from '../types';

interface LearnScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const LearnScreen: React.FC<LearnScreenProps> = ({ onNavigate }) => {
  const materials = [
    {
      name: 'PLA (Polylactic Acid)',
      tagline: 'Best for visual prototypes, concept models & desk accessories',
      tempResistance: '55°C (Glass Transition)',
      tensileStrength: '50 - 65 MPa',
      flexibility: 'Rigid / Brittle',
      surfaceFinish: 'Matte or Glossy with smooth layer lines',
      recommendedFor: 'Prototypes, display models, consumer items, low mechanical stress parts',
      notRecommended: 'Outdoor heat exposure, automotive engine bays, high impact gears',
    },
    {
      name: 'PETG (Polyethylene Terephthalate Glycol)',
      tagline: 'The sweet spot of impact toughness, chemical resistance & weatherability',
      tempResistance: '75°C - 80°C',
      tensileStrength: '45 - 55 MPa',
      flexibility: 'Slightly flexible under heavy load',
      surfaceFinish: 'Semi-gloss, excellent interlayer bonding',
      recommendedFor: 'Functional brackets, snap-fit enclosures, fluid containers, outdoor fixtures',
      notRecommended: 'Aesthetic miniature figurines with ultra-sharp micro overhangs',
    },
    {
      name: 'TPU 95A (Thermoplastic Polyurethane)',
      tagline: 'High-wear elastomeric rubber-like material with exceptional energy absorption',
      tempResistance: '90°C',
      tensileStrength: '30 - 40 MPa (600% Elongation at break)',
      flexibility: 'Highly flexible, rubber-like Shore 95A',
      surfaceFinish: 'Matte textured, virtually unbreakable',
      recommendedFor: 'Vibration dampers, gaskets, keychains, phone cases, wearable orthotics',
      notRecommended: 'Rigid structural load-bearing frames',
    },
    {
      name: 'Industrial SLA Resin',
      tagline: 'Micron-accurate resolution with isotropic mechanical strength and smooth finish',
      tempResistance: '65°C - 160°C (High Temp resins)',
      tensileStrength: '55 - 75 MPa',
      flexibility: 'Rigid with ceramic-like precision',
      surfaceFinish: 'Injection-mold smoothness, imperceptible layer lines (0.025mm)',
      recommendedFor: 'Dental guides, jewelry investment casting, fluidics, detailed topography',
      notRecommended: 'High-impact violent cycling',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 pb-24">
      {/* Hero */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
          Knowledge Base & Engineering Handbook
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tighter uppercase font-['Inter'] mb-3">
          Mastering Additive Manufacturing
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
          Learn how to design watertight CAD geometry, choose the right thermoplastic or photopolymer resin,
          and maximize strength-to-weight ratios.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Material Matrix */}
        <section>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 mb-6 font-['Inter']">
            Material Selection Matrix
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {materials.map((m, i) => (
              <div
                key={i}
                className="bg-white border border-slate-100 rounded-3xl p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-slate-950">{m.name}</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mb-5">{m.tagline}</p>

                  <div className="space-y-2.5 text-xs text-slate-600">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Thermal Resistance</span>
                      <span className="font-mono font-bold text-slate-950">{m.tempResistance}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Tensile Strength</span>
                      <span className="font-mono font-bold text-slate-950">{m.tensileStrength}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Flexibility</span>
                      <span className="font-bold text-slate-950">{m.flexibility}</span>
                    </div>
                    <div className="py-2.5">
                      <span className="text-slate-950 font-black uppercase tracking-wider text-[10px] block mb-1">Recommended for:</span>
                      <p className="text-slate-600 leading-relaxed font-normal">{m.recommendedFor}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate('custom-printing')}
                    className="text-xs font-black uppercase tracking-widest text-slate-950 hover:text-slate-600 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Configure {m.name.split(' ')[0]} Print</span>
                    <span>&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3 Core Rules for 3D Printing */}
        <section className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 mb-3">DFAM: Design for Additive Rules</h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-8 max-w-2xl leading-relaxed font-normal">
            Follow these simple guidelines when designing CAD parts in SolidWorks, Fusion 360, or Blender to avoid failed prints and reduce support waste.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-slate-950 font-black uppercase tracking-tight text-sm mb-2">45° Overhang Rule</div>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                FDM printers deposit molten plastic onto prior layers. Angles shallower than 45° from horizontal need support structures. Chamfer steep faces to print without supports!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-slate-950 font-black uppercase tracking-tight text-sm mb-2">1.2mm Minimum Wall</div>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Ensure all load-bearing structural walls have at least 3 perimeters (minimum 1.2mm to 1.6mm thickness). Fragile single-track walls are prone to buckling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="text-slate-950 font-black uppercase tracking-tight text-sm mb-2">0.4mm Pin & Hole Clearance</div>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                For moving interlinked assemblies, hinges, or snap-fits, leave 0.3mm to 0.5mm radial tolerance to prevent parts from fusing together during extrusion.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
