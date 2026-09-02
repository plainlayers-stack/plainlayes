import React from 'react';
import { ScreenType } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenOrderTracking: () => void;
  onOpenSupport: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenOrderTracking,
  onOpenSupport,
}) => {
  return (
    <footer className="w-full bg-white border-t border-slate-100 pt-14 pb-10 text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-100">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <BrandLogo size="md" />
              <div className="text-xl font-black text-slate-950 font-['Inter'] tracking-tighter uppercase">
                Plain <span className="text-orange-600 font-bold">Layers</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Precision Manufacturing for the Digital Age.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="md:col-span-3 space-y-3">
            <div>
              <button
                onClick={onOpenOrderTracking}
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
              >
                Order Tracking
              </button>
            </div>
            <div>
              <button
                onClick={onOpenSupport}
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
              >
                Support Center
              </button>
            </div>
          </div>

          {/* Links Col 2 */}
          <div className="md:col-span-3 space-y-3">
            <div>
              <button
                onClick={() => onNavigate('learn')}
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
              >
                Material Guide
              </button>
            </div>
            <div>
              <button
                onClick={() => onNavigate('business')}
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
              >
                B2B Solutions
              </button>
            </div>
          </div>

          {/* Links Col 3 */}
          <div className="md:col-span-2 space-y-3">
            <div>
              <button
                onClick={onOpenSupport}
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
            <div>
              <button
                onClick={onOpenSupport}
                className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-950 transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-[11px] font-medium text-slate-400">
          © 2026 Plain Layers. Precision Manufacturing for the Digital Age.
        </div>
      </div>
    </footer>
  );
};
