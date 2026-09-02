import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, Code2, Layers, Image as ImageIcon, Sparkles } from 'lucide-react';
import { HOTLINK_ASSETS } from '../data/mockData';

interface ShopifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAsset?: string;
}

export const ShopifyModal: React.FC<ShopifyModalProps> = ({
  isOpen,
  onClose,
  selectedAsset,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'hotlinks' | 'liquid' | 'cart-api'>('hotlinks');

  if (!isOpen) return null;

  const getFullUrl = (relativePath: string) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}${relativePath}`;
    }
    return relativePath;
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const sampleLiquidCode = `<!-- Shopify Sections / Custom Liquid: sections/plain-layers-quoter.liquid -->
<div class="plain-layers-shopify-container" style="min-height: 850px; width: 100%; border-radius: 12px; overflow: hidden; background: #0b1326;">
  <iframe 
    id="plain-layers-iframe"
    src="${getFullUrl('/#custom-printing')}"
    title="Plain Layers - Instant CAD Quoter & 3D Print Studio"
    style="width: 100%; height: 900px; border: none; display: block;"
    allow="clipboard-write;"
  ></iframe>
</div>

<script>
  // Listen for custom 3D print quote events from Plain Layers to add to Shopify Cart
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'PLAIN_LAYERS_ADD_TO_CART') {
      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            id: {{ section.settings.shopify_variant_id | default: 48920192831 }},
            quantity: event.data.quantity || 1,
            properties: {
              'CAD File': event.data.fileName,
              'Material': event.data.material,
              'Layer Height': event.data.layerHeight,
              'Infill Density': event.data.infill + '%',
              'Color': event.data.color
            }
          }]
        })
      })
      .then(res => res.json())
      .then(cart => {
        window.location.href = '/cart';
      })
      .catch(err => console.error('Shopify Cart Error:', err));
    }
  });
</script>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fcfcfc] border border-slate-100 text-slate-900 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-950">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black uppercase tracking-tight text-slate-950 font-['Inter']">
                Shopify Integration & Hotlink Center
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Hotlink images directly from this app or embed the 3D Quoter into your Shopify store.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-white px-6 gap-6 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('hotlinks')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'hotlinks'
                ? 'border-slate-950 text-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-950'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Direct Image Hotlinks</span>
          </button>

          <button
            onClick={() => setActiveTab('liquid')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'liquid'
                ? 'border-slate-950 text-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-950'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Shopify Liquid Embed</span>
          </button>

          <button
            onClick={() => setActiveTab('cart-api')}
            className={`py-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === 'cart-api'
                ? 'border-slate-950 text-slate-950'
                : 'border-transparent text-slate-400 hover:text-slate-950'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Cart API Spec</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'hotlinks' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs text-slate-600 leading-relaxed font-normal">
                <span className="text-slate-950 font-bold uppercase tracking-wider text-[10px]">How to use on Shopify: </span>
                Click <span className="text-slate-950 font-bold">Copy URL</span> and paste it into
                your Shopify Admin under <span className="text-slate-950 font-medium">Content &gt; Files</span> or directly into
                your product media image URLs, blog posts, or custom theme templates.
              </div>

              <div className="space-y-3">
                {HOTLINK_ASSETS.map((asset, idx) => {
                  const fullUrl = getFullUrl(asset.path);
                  const htmlTag = `<img src="${fullUrl}" alt="${asset.name}" width="600" height="600" loading="lazy" />`;
                  const isCopiedUrl = copiedIndex === `url-${idx}`;
                  const isCopiedHtml = copiedIndex === `html-${idx}`;

                  return (
                    <div
                      key={idx}
                      className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 hover:border-slate-200 transition-all shadow-sm"
                    >
                      {/* Image Thumbnail */}
                      <img
                        src={asset.path}
                        alt={asset.name}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-50 shrink-0 border border-slate-100"
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <h4 className="text-sm font-black uppercase tracking-tight text-slate-950 truncate">{asset.name}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">
                            {asset.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5 font-normal">{asset.description}</p>
                        <p className="text-[11px] font-mono text-slate-400 truncate mt-1">
                          {fullUrl}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                        <button
                          onClick={() => copyToClipboard(fullUrl, `url-${idx}`)}
                          className="flex-1 sm:flex-initial px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-xs font-black uppercase tracking-wider text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          {isCopiedUrl ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy URL</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => copyToClipboard(htmlTag, `html-${idx}`)}
                          className="flex-1 sm:flex-initial px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700 border border-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          {isCopiedHtml ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Copied HTML</span>
                            </>
                          ) : (
                            <>
                              <Code2 className="w-3.5 h-3.5" />
                              <span>Copy HTML</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'liquid' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 font-normal">
                  Paste this snippet into your Shopify theme under{' '}
                  <code className="text-slate-950 bg-slate-100 px-2 py-0.5 rounded font-mono text-[11px] font-bold">
                    sections/forge3d-quoter.liquid
                  </code>
                </p>
                <button
                  onClick={() => copyToClipboard(sampleLiquidCode, 'liquid')}
                  className="px-4 py-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copiedIndex === 'liquid' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Liquid Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed max-h-96">
                  {sampleLiquidCode}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'cart-api' && (
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-tight text-slate-950">
                How Custom Print Line-Item Attributes Sync to Shopify
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                When a customer uploads an STL file and customizes their print settings on Plain Layers,
                the quoter outputs custom line item properties that attach to your Shopify Order and
                Fulfillment dashboard:
              </p>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 space-y-2">
                <div className="text-emerald-400">// Shopify /cart/add.js payload:</div>
                <pre className="text-[11px] leading-relaxed overflow-x-auto">
{`{
  "items": [{
    "id": 48920192831,
    "quantity": 1,
    "properties": {
      "CAD File": "drone_motor_mount_v3.stl",
      "Material": "PETG",
      "Layer Height": "0.12mm Fine",
      "Infill": "20%",
      "Color": "Matte Black",
      "Slicing Hash": "pl_89a19c7f",
      "Fulfillment Mode": "Plain Layers Maker Hub"
    }
  }]
}`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between text-xs text-slate-400">
          <span className="font-medium">Plain Layers • Shopify Ready Assets</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold uppercase tracking-wider cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
