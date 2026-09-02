import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Send } from 'lucide-react';

interface ConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultModal: React.FC<ConsultModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Design for Additive Manufacturing (DFAM)');
  const [date, setDate] = useState('Tomorrow 2:00 PM IST');
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fcfcfc] border border-slate-100 text-slate-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-slate-950" />
            <h2 className="text-base font-black uppercase tracking-tight text-slate-950 font-['Inter']">Book Additive Consult</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-950 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {booked ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-950">Consultation Reserved!</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                A calendar invitation with Google Meet link has been sent to <span className="font-bold text-slate-950">{email}</span> for <span className="font-bold text-slate-950">{date}</span>.
              </p>
              <button
                onClick={() => {
                  setBooked(false);
                  onClose();
                }}
                className="w-full py-3 bg-slate-950 text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all cursor-pointer shadow-md"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-950 placeholder:text-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="rahul@company.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-950 placeholder:text-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Topic of Consultation
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-950 cursor-pointer font-medium"
                >
                  <option value="Design for Additive Manufacturing (DFAM)">Design for Additive Manufacturing (DFAM)</option>
                  <option value="Material Selection (Carbon Fiber vs Resins)">Material Selection (Carbon Fiber vs Resins)</option>
                  <option value="Batch Production Tooling Reduction">Batch Production Tooling Reduction</option>
                  <option value="Part Weight Optimization / Generative Design">Part Weight Optimization / Generative Design</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Preferred Slot
                </label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-950 cursor-pointer font-medium"
                >
                  <option value="Tomorrow 2:00 PM IST">Tomorrow 2:00 PM IST</option>
                  <option value="Tomorrow 5:00 PM IST">Tomorrow 5:00 PM IST</option>
                  <option value="Thursday 11:00 AM IST">Thursday 11:00 AM IST</option>
                  <option value="Friday 3:30 PM IST">Friday 3:30 PM IST</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-xl shadow-slate-200 cursor-pointer transition-all mt-2"
              >
                Confirm 30-Min Free Session
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
