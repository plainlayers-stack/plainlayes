import React, { useState } from 'react';
import { X, Search, PackageCheck, Truck, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [orderNumber, setOrderNumber] = useState('PL-782941');
  const [trackingData, setTrackingData] = useState<any>({
    id: 'PL-782941',
    status: 'In Production (Bambu Lab X1E)',
    progress: 75,
    courier: 'Bluedart Express Surface',
    awb: 'BLU-984729184',
    eta: 'Tomorrow, 4:00 PM',
    destination: 'Whitefield, Bengaluru, Karnataka',
    items: ['Voronoi Pen Holder (Matte Black PLA)', 'Articulated Flex Keychain (Cyan TPU)'],
    steps: [
      { name: 'CAD Inspection & Toolpath Slicing', done: true, time: 'Sep 02, 09:15 AM' },
      { name: 'Layer Deposition on 3D Print Fleet', done: true, time: 'Sep 02, 11:30 AM' },
      { name: 'Ultrasonic Cleaning & Annealing', done: true, time: 'Sep 02, 03:45 PM' },
      { name: 'QC Tolerance Inspection & Packing', done: false, time: 'Pending (ETA 6:00 PM)' },
      { name: 'Handover to Logistics Carrier', done: false, time: 'Tomorrow 09:00 AM' },
    ],
  });

  if (!isOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fcfcfc] border border-slate-100 text-slate-900 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
            <h2 className="text-base font-black uppercase tracking-tight text-slate-950 font-['Inter']">Track 3D Print Order</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-950 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Enter Order ID (e.g. F3D-782941)"
              className="flex-1 px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-slate-950 uppercase placeholder:normal-case placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider rounded-full flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {trackingData && (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-100 flex justify-between items-center shadow-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Status</span>
                  <div className="text-sm font-black uppercase tracking-tight text-slate-950 mt-0.5">
                    {trackingData.status}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    Courier: {trackingData.courier} • AWB: {trackingData.awb}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Estimated Delivery</span>
                  <div className="text-sm font-bold text-slate-950 mt-0.5">{trackingData.eta}</div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Manufacturing & Shipping Milestones
                </span>
                <div className="space-y-2.5">
                  {trackingData.steps.map((step: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-100 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        {step.done ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Clock className="w-4 h-4 text-slate-300 shrink-0" />
                        )}
                        <span
                          className={`text-xs ${
                            step.done ? 'text-slate-950 font-bold' : 'text-slate-400 font-medium'
                          }`}
                        >
                          {step.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">{step.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
