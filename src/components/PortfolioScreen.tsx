import React from 'react';
import { Layers, ShieldCheck, Cpu, Building, Sparkles, ArrowUpRight } from 'lucide-react';
import { ScreenType } from '../types';

interface PortfolioScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const PortfolioScreen: React.FC<PortfolioScreenProps> = ({ onNavigate }) => {
  const projects = [
    {
      title: 'Topographical Relief: Mount Everest Ridge',
      client: 'Himalayan Geographic Society',
      material: 'Ceramic-Infused Resin',
      resolution: '25 Microns (0.025mm)',
      image: '/assets/topographical_everest.jpg',
      category: 'Topography & Architecture',
      description:
        'High-density elevation model recreating the Khumbu Icefall and South Col with micron-level contour fidelity.',
      stats: { printTime: '24h 15m', tolerance: '± 0.05 mm' },
    },
    {
      title: 'Aerospace Generative Structural Lattice',
      client: 'SkyForge Aerospace Labs',
      material: 'Carbon Fiber Reinforced PETG',
      resolution: '0.12mm High Precision',
      image: '/assets/rapid_prototyping_part.jpg',
      category: 'Aviation & Defense',
      description:
        'Topology-optimized bracket reducing unladen structural weight by 42% while sustaining 12 kN torsional load.',
      stats: { printTime: '14h 40m', tolerance: '± 0.1 mm' },
    },
    {
      title: 'Voronoi Parametric Acoustic Baffle & Desk Sculptures',
      client: 'Kala Design Studio, Bengaluru',
      material: 'Recycled Matte PLA Pro',
      resolution: '0.16mm Standard',
      image: '/assets/voronoi_pen_holder.jpg',
      category: 'Product Design & Decor',
      description:
        'Cellular mathematically generated internal geometries balancing thermal airflow and desktop utility.',
      stats: { printTime: '6h 20m', tolerance: '± 0.15 mm' },
    },
    {
      title: 'Robotic Manipulator Segmented Articulations',
      client: 'IIT Madras Robotics Club',
      material: 'Elastomeric TPU 95A',
      resolution: '0.20mm Functional',
      image: '/assets/articulated_keychain.jpg',
      category: 'Robotics & Mechatronics',
      description:
        'Print-in-place ball-and-socket links requiring zero post-assembly or fasteners, surviving 50,000 continuous flex cycles.',
      stats: { printTime: '3h 45m', tolerance: '± 0.2 mm' },
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 pb-24">
      {/* Header */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <span className="inline-block px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
          Portfolio & Case Studies
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tighter uppercase font-['Inter'] mb-3">
          Engineered for Extreme Tolerances
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
          From mission-critical aerospace prototypes to bespoke architectural models, explore
          recent production runs manufactured in our Bengaluru clean-tech facility.
        </p>
      </section>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden flex flex-col justify-between group shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-90" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-slate-950 text-[10px] font-black uppercase tracking-wider border border-slate-200 backdrop-blur-md shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-slate-950 mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Client: {item.client}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Specs Box */}
                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-0.5 font-bold uppercase tracking-wider text-[10px]">Material</span>
                    <span className="font-bold text-slate-950 text-xs">{item.material}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5 font-bold uppercase tracking-wider text-[10px]">Tolerance</span>
                    <span className="font-mono font-bold text-slate-950 text-xs">{item.stats.tolerance}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-white border border-slate-100 text-center space-y-4 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950">Have a unique engineering project?</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal">
            Our applications team can review your CAD files, suggest optimal layer orientations, and provide custom DFM feedback.
          </p>
          <div className="pt-3 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigate('custom-printing')}
              className="px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-slate-200 cursor-pointer"
            >
              Get Instant CAD Quote
            </button>
            <button
              onClick={() => onNavigate('business')}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-950 font-bold text-xs uppercase tracking-widest border border-slate-200 transition-all cursor-pointer shadow-sm"
            >
              Talk to B2B Specialist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
