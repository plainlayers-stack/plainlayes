import React from 'react';
import { X, Headphones, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fcfcfc] border border-slate-100 text-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <Headphones className="w-5 h-5 text-slate-950" />
            <h2 className="text-base font-black uppercase tracking-tight text-slate-950 font-['Inter']">Support & Assistance</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-950 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-100 flex items-start gap-4 shadow-sm">
              <Mail className="w-5 h-5 text-slate-950 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-black uppercase tracking-tight text-slate-950">Direct Engineering Support</h4>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">cad@forge3d.in • support@forge3d.in</p>
                <p className="text-[11px] text-slate-400 mt-1 font-normal">Average response: &lt; 30 minutes (Mon-Sat 9AM - 8PM IST)</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-100 flex items-start gap-4 shadow-sm">
              <Phone className="w-5 h-5 text-slate-950 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-black uppercase tracking-tight text-slate-950">Phone & WhatsApp Hotline</h4>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">+91 (080) 4192-8300 / +91 98450-FORGE</p>
                <p className="text-[11px] text-slate-400 mt-1 font-normal">For expedited orders & corporate tenders</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-100 flex items-start gap-4 shadow-sm">
              <MapPin className="w-5 h-5 text-slate-950 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-black uppercase tracking-tight text-slate-950">Manufacturing Lab & Dispatch Facility</h4>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">
                  Plot 14B, Electronic City Phase 1, Hosur Road, Bengaluru, Karnataka 560100
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> ISO 9001:2015 Certified Clean Facility
            </span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
