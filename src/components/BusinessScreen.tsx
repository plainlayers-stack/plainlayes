import React, { useState, useRef } from 'react';
import {
  Wrench,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  FileCheck,
  Building2,
  Receipt,
  Percent,
  Zap,
  UserCheck,
  Send,
} from 'lucide-react';
import { B2BQuoteFormData } from '../types';

export const BusinessScreen: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<B2BQuoteFormData>({
    companyName: '',
    contactPerson: '',
    businessEmail: '',
    requirementType: 'Rapid Prototyping',
    estimatedQuantity: '',
    cadFileName: '',
    notes: '',
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.businessEmail) return;

    // Generate B2B reference ID
    const refId = `B2B-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRef(refId);
  };

  const scrollToForm = () => {
    const el = document.getElementById('b2b-quote-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 pb-24">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* B2B Services Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
              <Wrench className="w-3.5 h-3.5 text-slate-900" />
              <span className="tracking-widest uppercase text-[10px]">B2B Services</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tighter leading-[1.1] font-['Inter'] uppercase">
              Industrial-Grade 3D Manufacturing for Your Business
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl font-normal">
              Scale your production, accelerate R&D, and deliver precision parts with Plain Layers'
              enterprise-class additive manufacturing fleet.
            </p>

            {/* CTA Button */}
            <div>
              <button
                id="hero-request-quote-btn"
                onClick={scrollToForm}
                className="px-8 py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest inline-flex items-center gap-2.5 transition-all shadow-xl shadow-slate-200 cursor-pointer"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-xl group">
              <img
                src="/assets/printer_fleet_b2b.jpg"
                alt="Plain Layers Industrial 3D Printer Fleet"
                className="w-full aspect-[16/10] object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Capabilities Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-['Inter'] uppercase mb-2">
            Enterprise Capabilities
          </h2>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">
            Precision solutions tailored for demanding industrial applications.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Capability 1: Prototyping */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight text-slate-950 mb-2">Prototyping</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Rapid iteration cycles for engineering and product design validation.
              </p>
            </div>
          </div>

          {/* Capability 2: Small-Batch */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight text-slate-950 mb-2">Small-Batch</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Bridge manufacturing and end-use part production without tooling costs.
              </p>
            </div>
          </div>

          {/* Capability 3: Corporate Gifts */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight text-slate-950 mb-2">Corporate Gifts</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Customized, high-quality promotional items and executive awards.
              </p>
            </div>
          </div>

          {/* Capability 4: Engineering Parts */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight text-slate-950 mb-2">Engineering Parts</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                High-strength, temperature-resistant components for critical applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form + Advantages Section */}
      <section id="b2b-quote-form" className="pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Request a Custom Quote Form */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-3xl p-7 sm:p-9 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 font-['Inter'] mb-6">
              Request a Custom Quote
            </h2>

            {submittedRef ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-950">Quote Request Submitted!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="text-slate-950 font-bold">{formData.contactPerson || 'Partner'}</span>. Your enterprise request has been assigned reference ID:
                </p>
                <div className="inline-block px-4 py-2 bg-white border border-emerald-300 rounded-full font-mono text-sm font-black text-emerald-800 shadow-sm">
                  {submittedRef}
                </div>
                <p className="text-[11px] text-slate-500">
                  Our B2B engineering lead will email a formal commercial quotation within 4 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedRef(null);
                    setFormData({
                      companyName: '',
                      contactPerson: '',
                      businessEmail: '',
                      requirementType: 'Rapid Prototyping',
                      estimatedQuantity: '',
                      cadFileName: '',
                      notes: '',
                    });
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-slate-950 text-xs font-black uppercase tracking-wider text-white hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Company Name */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Company Name
                  </label>
                  <input
                    id="b2b-company-input"
                    type="text"
                    required
                    placeholder="Acme Corp"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 rounded-full bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 shadow-sm"
                  />
                </div>

                {/* Contact Person */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Contact Person
                  </label>
                  <input
                    id="b2b-contact-input"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-4 py-3 rounded-full bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 shadow-sm"
                  />
                </div>

                {/* Business Email */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Business Email
                  </label>
                  <input
                    id="b2b-email-input"
                    type="email"
                    required
                    placeholder="jane@acmecorp.com"
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-full bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 shadow-sm"
                  />
                </div>

                {/* Requirement Type */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Requirement Type
                  </label>
                  <select
                    id="b2b-requirement-select"
                    value={formData.requirementType}
                    onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })}
                    className="w-full px-5 py-3 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-900 focus:outline-none focus:border-slate-950 cursor-pointer shadow-sm"
                  >
                    <option value="Rapid Prototyping">Rapid Prototyping</option>
                    <option value="Batch Production">Batch Production (50 - 5,000 units)</option>
                    <option value="Corporate Gifts">Corporate Gifts & Awards</option>
                    <option value="Engineering Parts">Engineering Parts & Fixtures</option>
                  </select>
                </div>

                {/* Estimated Quantity */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Estimated Quantity
                  </label>
                  <input
                    id="b2b-quantity-input"
                    type="text"
                    placeholder="e.g. 50"
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full px-4 py-3 rounded-full bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 shadow-sm"
                  />
                </div>

                {/* Upload CAD Files Zone */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                    Upload CAD Files
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-200 hover:border-slate-950 rounded-2xl p-6 text-center cursor-pointer bg-slate-50 transition-colors"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".stl,.step,.stp,.obj,.iges,.zip"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFormData({ ...formData, cadFileName: e.target.files[0].name });
                        }
                      }}
                      className="hidden"
                    />
                    <UploadCloud className="w-8 h-8 text-slate-900 mx-auto mb-2" />
                    <p className="text-xs text-slate-900 font-black uppercase tracking-wider">Drag & Drop or Click to Browse</p>
                    <p className="text-[11px] text-slate-400 mt-1 font-medium">
                      Supported formats: .STL, .STEP, .OBJ (Max 50MB)
                    </p>
                    {formData.cadFileName && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-800 border border-emerald-200">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>{formData.cadFileName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  id="b2b-submit-btn"
                  type="submit"
                  className="w-full py-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-slate-200 cursor-pointer"
                >
                  Submit Request
                </button>
              </form>
            )}
          </div>

          {/* Right Column: B2B Advantages */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 font-['Inter'] mb-2">B2B Advantages</h2>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Partner with us for streamlined operations.</p>
            </div>

            <div className="space-y-6">
              {/* Advantage 1 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-950 mb-1">Direct Commercial Invoicing</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Itemized commercial bills and receipts for corporate expense accounting with zero tax markups.
                  </p>
                </div>
              </div>

              {/* Advantage 2 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-950 mb-1">Bulk Discounts</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Tiered pricing structures that scale favorably with your production volume.
                  </p>
                </div>
              </div>

              {/* Advantage 3 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-950 mb-1">Priority Production</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    Fast-tracked queue placement for critical business deadlines.
                  </p>
                </div>
              </div>

              {/* Advantage 4 */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-950 flex items-center justify-center shrink-0 shadow-sm">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight text-slate-950 mb-1">Dedicated Account Manager</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    A single point of contact for technical support, tracking, and logistics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
