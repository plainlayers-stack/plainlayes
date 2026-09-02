import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  ShoppingCart,
  ExternalLink,
  Copy,
  Star,
  Heart,
  MessageSquare,
  ShieldCheck,
  Ruler,
  Palette,
  Sparkles,
  Send,
  UserCheck
} from 'lucide-react';
import { Product, ProductSizeOption, ProductColorOption, ProductReview } from '../types';
import {
  STANDARD_COLORS,
  getProductReviews,
  addProductReview,
  getProductRatingSummary
} from '../data/mockData';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    selectedSize?: ProductSizeOption,
    selectedColor?: ProductColorOption
  ) => void;
  onOpenShopifyModal: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenShopifyModal,
  isWishlisted,
  onToggleWishlist,
}) => {
  // Available variations
  const colorOptions: ProductColorOption[] = product?.colorVariations || STANDARD_COLORS;
  const sizeOptions: ProductSizeOption[] = product?.sizeOptions || [
    {
      id: 'sz-standard',
      name: 'Standard',
      dimensionsMm: product?.dimensions || '85 × 85 × 110 mm',
      price: product?.price || 450,
    },
    {
      id: 'sz-large',
      name: 'Large',
      dimensionsMm: '120 × 120 × 150 mm',
      price: Math.round((product?.price || 450) * 1.35),
    },
  ];

  // Active variation states
  const [selectedSize, setSelectedSize] = useState<ProductSizeOption>(sizeOptions[0]);
  const [selectedColor, setSelectedColor] = useState<ProductColorOption>(colorOptions[0]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');

  // Review System State
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [ratingSummary, setRatingSummary] = useState({
    average: 5.0,
    count: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>,
  });

  // Review Form States
  const [newRating, setNewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [reviewTitle, setReviewTitle] = useState<string>('');
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewSuccess, setReviewSuccess] = useState<boolean>(false);
  const [reviewError, setReviewError] = useState<string>('');

  // Sync state when product changes
  useEffect(() => {
    if (product) {
      const defaultSizes = product.sizeOptions && product.sizeOptions.length > 0
        ? product.sizeOptions
        : sizeOptions;
      setSelectedSize(defaultSizes[0]);

      const defaultColors = product.colorVariations && product.colorVariations.length > 0
        ? product.colorVariations
        : STANDARD_COLORS;
      setSelectedColor(defaultColors[0]);

      // Load reviews and stats
      loadReviews(product.id);
      setActiveTab('overview');
      setReviewSuccess(false);
      setReviewError('');
    }
  }, [product]);

  const loadReviews = (productId: string) => {
    const list = getProductReviews(productId);
    const summary = getProductRatingSummary(productId);
    setReviews(list);
    setRatingSummary(summary);
  };

  if (!product) return null;

  const currentPrice = selectedSize ? selectedSize.price : product.price;

  const handleCopyHotlink = () => {
    const fullUrl = `${window.location.origin}${product.image}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    onClose();
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      setReviewError('Please write your review comment before submitting.');
      return;
    }

    const created = addProductReview({
      productId: product.id,
      userName: reviewerName.trim() || 'Verified Maker',
      rating: newRating,
      title: reviewTitle.trim() || undefined,
      comment: reviewComment.trim(),
    });

    // Refresh review list & stats
    loadReviews(product.id);
    setReviewSuccess(true);
    setReviewComment('');
    setReviewTitle('');
    setReviewerName('');
    setReviewError('');

    setTimeout(() => {
      setReviewSuccess(false);
    }, 4000);
  };

  // Dynamic image styling based on selected color variation
  const getImageFilterStyle = () => {
    if (!selectedColor) return {};
    if (selectedColor.name === 'Red') {
      return { filter: 'hue-rotate(340deg) saturate(1.4) contrast(1.05)' };
    }
    if (selectedColor.name === 'Blue') {
      return { filter: 'hue-rotate(190deg) saturate(1.5) contrast(1.05)' };
    }
    if (selectedColor.name === 'Green') {
      return { filter: 'hue-rotate(110deg) saturate(1.5) contrast(1.05)' };
    }
    return {};
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#fcfcfc] border border-slate-100 text-slate-900 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              {product.category}
            </span>
            {product.bestseller && (
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-950 text-white">
                BESTSELLER
              </span>
            )}
            <div className="hidden sm:flex items-center gap-1.5 ml-2 px-2.5 py-1 bg-amber-50 rounded-full border border-amber-100">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span className="text-xs font-black text-amber-900">{ratingSummary.average}</span>
              <span className="text-[10px] text-amber-700">({ratingSummary.count} reviews)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Wishlist Button */}
            <button
              onClick={() => onToggleWishlist(product.id)}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isWishlisted
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-white border-slate-200 text-slate-400 hover:text-slate-950 hover:border-slate-300'
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-950 hover:bg-slate-100 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Nav Tabs: Overview vs Reviews */}
        <div className="px-6 border-b border-slate-100 bg-white flex items-center space-x-6 text-xs font-bold uppercase tracking-wider shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 relative cursor-pointer transition-colors ${
              activeTab === 'overview'
                ? 'text-slate-950 font-black'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Product Overview & Variations
            {activeTab === 'overview' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-950 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 relative cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'text-slate-950 font-black'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Customer Reviews ({ratingSummary.count})</span>
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-950 rounded-full" />
            )}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 flex-1">
          {activeTab === 'overview' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left Column: Product Visuals & Color Simulation */}
              <div className="md:col-span-6 space-y-4">
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    style={getImageFilterStyle()}
                    className="w-full h-full object-cover transition-all duration-300"
                  />

                  {/* Variation Indicator Tag */}
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-slate-100 flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border border-white shadow-xs"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">
                      Color: {selectedColor.name} • {selectedSize.dimensionsMm}
                    </span>
                  </div>
                </div>

                {/* Hotlink direct action */}
                <button
                  onClick={handleCopyHotlink}
                  className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-700 border border-slate-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Asset URL Copied for Shopify!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Image Hotlink for Shopify Embed</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Title, Variations & Controls */}
              <div className="md:col-span-6 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-950 mb-1">
                    {product.title}
                  </h3>

                  {/* Rating Stars Summary in Header */}
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="flex items-center gap-2 mb-3 cursor-pointer group text-left"
                  >
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.round(ratingSummary.average)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      {ratingSummary.average}
                    </span>
                    <span className="text-xs text-slate-400 underline decoration-slate-300 group-hover:text-slate-900">
                      ({ratingSummary.count} customer reviews)
                    </span>
                  </button>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 pb-4 border-b border-slate-100 mb-5">
                    <span className="text-3xl font-mono font-black text-slate-950">
                      ₹{currentPrice}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">All-Inclusive Price • No Hidden Tax</span>
                    {selectedSize.name !== 'Standard' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                        Size Variation Active
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-normal mb-6">
                    {product.description}
                  </p>

                  {/* --- Variation 1: Color Selection (Red, Blue, Green) --- */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-slate-950" />
                        <span>Select Color</span>
                      </label>
                      <span className="text-xs font-black text-slate-950">
                        {selectedColor.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {colorOptions.map((color) => {
                        const isSelected = selectedColor.id === color.id;
                        return (
                          <button
                            key={color.id}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`px-3 py-2.5 rounded-2xl border flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'border-slate-950 bg-slate-950 text-white shadow-sm'
                                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                            }`}
                          >
                            <span
                              className="w-4 h-4 rounded-full shrink-0 border border-black/10 shadow-xs"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div className="leading-tight">
                              <span className="text-xs font-bold block">{color.name}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* --- Variation 2: Size in MM Selection --- */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5 text-slate-950" />
                        <span>Select Size IN MM</span>
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-950">
                        {selectedSize.dimensionsMm}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {sizeOptions.map((size) => {
                        const isSelected = selectedSize.id === size.id;
                        return (
                          <button
                            key={size.id}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                              isSelected
                                ? 'border-slate-950 bg-slate-950 text-white shadow-sm'
                                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-900'
                            }`}
                          >
                            <div className="text-left">
                              <span className="text-xs font-black block">{size.name}</span>
                              <span
                                className={`text-[11px] font-mono block mt-0.5 ${
                                  isSelected ? 'text-slate-300' : 'text-slate-500'
                                }`}
                              >
                                {size.dimensionsMm}
                              </span>
                            </div>
                            <span className="text-xs font-mono font-black">
                              ₹{size.price}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Specifications & Lead Time */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Material
                      </span>
                      <span className="font-bold text-slate-950">{product.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Selected Dimensions
                      </span>
                      <span className="font-mono font-bold text-slate-950">
                        {selectedSize.dimensionsMm}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Lead Time
                      </span>
                      <span className="text-emerald-700 font-bold">Ready to Dispatch (24h)</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* Add to Cart */}
                    <button
                      id="modal-add-to-cart-btn"
                      onClick={handleAddToCart}
                      className="py-3.5 px-4 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-slate-200 cursor-pointer transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart (₹{currentPrice})</span>
                    </button>

                    {/* Add / Remove from Wishlist */}
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className={`py-3.5 px-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                        isWishlisted
                          ? 'bg-red-50 text-red-600 border-red-200'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`} />
                      <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenShopifyModal();
                    }}
                    className="w-full py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-950 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Full Shopify Embed Guide</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Customer Review System Tab */
            <div className="space-y-8 max-w-3xl mx-auto">
              {/* Rating Summary Banner */}
              <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 text-center sm:text-left space-y-1 sm:border-r sm:border-slate-100 sm:pr-6">
                  <div className="text-4xl font-black text-slate-950 font-mono">
                    {ratingSummary.average}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= Math.round(ratingSummary.average)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Based on {ratingSummary.count} verified reviews
                  </p>
                </div>

                {/* Rating breakdown bars */}
                <div className="sm:col-span-7 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((r) => {
                    const count = ratingSummary.breakdown[r] || 0;
                    const percent = ratingSummary.count > 0 ? (count / ratingSummary.count) * 100 : 0;
                    return (
                      <div key={r} className="flex items-center gap-2 text-xs">
                        <span className="w-7 font-bold text-slate-600 flex items-center gap-0.5">
                          {r} <Star className="w-3 h-3 text-amber-400 fill-amber-400 inline" />
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-slate-950 rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="w-6 text-right text-[10px] font-mono text-slate-400">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit a Review Form */}
              <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-tight text-slate-950">
                      Write a Customer Review
                    </h4>
                    <p className="text-xs text-slate-400">
                      Share your feedback on tolerances, finish, or functional performance.
                    </p>
                  </div>
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                </div>

                {reviewSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Your review has been submitted and published successfully!</span>
                  </div>
                )}

                {reviewError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
                    {reviewError}
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Star Rating selector */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Your Rating (1 to 5 Stars) *
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-1 cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= (hoverRating ?? newRating)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-200'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs font-black uppercase text-slate-950">
                        {newRating === 5 && '5.0 — Excellent!'}
                        {newRating === 4 && '4.0 — Very Good'}
                        {newRating === 3 && '3.0 — Average'}
                        {newRating === 2 && '2.0 — Needs Improvement'}
                        {newRating === 1 && '1.0 — Poor Quality'}
                      </span>
                    </div>
                  </div>

                  {/* Name and Title inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Your Name / Handle
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-950 placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Review Headline (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Great layer adhesion & precision"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-950 placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Comment Textarea */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Written Feedback *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe the print finish, dimensional tolerance, packaging, or customer experience..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-slate-950 placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </form>
              </div>

              {/* Existing Reviews List */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                  All Reviews ({reviews.length})
                </h4>

                {reviews.length === 0 ? (
                  <div className="p-8 text-center rounded-3xl bg-white border border-slate-100 text-slate-400 text-xs">
                    No reviews yet. Be the first to leave a review!
                  </div>
                ) : (
                  reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3.5 h-3.5 ${
                                  star <= rev.rating
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-black text-slate-950">
                            {rev.userName}
                          </span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Verified Buyer
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">{rev.date}</span>
                      </div>

                      {rev.title && (
                        <h5 className="text-xs font-black text-slate-900">{rev.title}</h5>
                      )}

                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {rev.comment}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
