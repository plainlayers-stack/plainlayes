import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ShoppingCart, Check, ExternalLink, SlidersHorizontal, Heart, Star, Eye } from 'lucide-react';
import { Product, ScreenType } from '../types';
import { PRODUCTS, getProductRatingSummary } from '../data/mockData';

interface ShopScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onAddToCart: (product: Product) => void;
  onQuickViewShopify: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const ShopScreen: React.FC<ShopScreenProps> = ({
  onNavigate,
  onAddToCart,
  onQuickViewShopify,
  wishlistIds,
  onToggleWishlist,
}) => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high' | 'name'>('popularity');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Desk Accessories']);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const categories = ['Desk Accessories', 'Keychains & EDC', 'Home Decor', 'Mechanical Parts'];
  const materials = ['PLA', 'PETG', 'TPU', 'Resin'];

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const toggleMaterial = (mat: string) => {
    if (selectedMaterials.includes(mat)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== mat));
    } else {
      setSelectedMaterials([...selectedMaterials, mat]);
    }
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        const matchMat = product.material.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchMat) return false;
      }

      // Categories (if any selected)
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Price Range
      if (selectedPriceRange === '0-500' && product.price > 500) return false;
      if (selectedPriceRange === '500-1000' && (product.price < 500 || product.price > 1000)) return false;
      if (selectedPriceRange === '1000+' && product.price < 1000) return false;

      // Material
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      // Popularity default
      return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0);
    });
  }, [searchQuery, selectedCategories, selectedPriceRange, selectedMaterials, sortBy]);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-slate-950 font-black">Shop</span>
        </div>

        {/* Top Control Bar: Search and Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 mb-8">
          {/* Search Input */}
          <div className="relative flex-1 sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              id="shop-search-input"
              type="text"
              placeholder="Search models, materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-950 focus:ring-1 focus:ring-slate-950 shadow-sm transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              id="shop-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none w-full sm:w-auto pl-5 pr-10 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-900 focus:outline-none focus:border-slate-950 cursor-pointer shadow-sm"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Main Shop Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Filters */}
          <div className="lg:col-span-3 space-y-6">
            {/* Categories Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((cat) => {
                  const isChecked = selectedCategories.includes(cat);
                  return (
                    <label
                      key={cat}
                      className="flex items-center gap-3 text-xs font-medium text-slate-600 hover:text-slate-950 cursor-pointer select-none group"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCategory(cat)}
                        className="w-4 h-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950 focus:ring-offset-0 cursor-pointer"
                      />
                      <span className={isChecked ? 'text-slate-950 font-bold' : ''}>{cat}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price (INR) Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Price (INR)</h3>
              <div className="space-y-3">
                {[
                  { label: 'Any Price', val: 'all' },
                  { label: '₹0 - ₹500', val: '0-500' },
                  { label: '₹500 - ₹1000', val: '500-1000' },
                  { label: '₹1000+', val: '1000+' },
                ].map((item) => {
                  const isChecked = selectedPriceRange === item.val;
                  return (
                    <label
                      key={item.val}
                      className="flex items-center gap-3 text-xs font-medium text-slate-600 hover:text-slate-950 cursor-pointer select-none"
                    >
                      <input
                        type="radio"
                        name="price-range"
                        checked={isChecked}
                        onChange={() => setSelectedPriceRange(item.val)}
                        className="w-4 h-4 text-slate-950 border-slate-300 focus:ring-slate-950 cursor-pointer"
                      />
                      <span className={isChecked ? 'text-slate-950 font-bold' : ''}>{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Material Card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Material</h3>
              <div className="flex flex-wrap gap-2">
                {materials.map((mat) => {
                  const isSelected = selectedMaterials.includes(mat);
                  return (
                    <button
                      key={mat}
                      onClick={() => toggleMaterial(mat)}
                      className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-slate-950 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950'
                      }`}
                    >
                      {mat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clear Filters helper */}
            {(selectedCategories.length > 0 || selectedPriceRange !== 'all' || selectedMaterials.length > 0 || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedPriceRange('all');
                  setSelectedMaterials([]);
                  setSearchQuery('');
                }}
                className="w-full py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-colors text-center cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-sm">
                <p className="text-slate-400 text-sm mb-4">No products found matching your active filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedPriceRange('all');
                    setSelectedMaterials([]);
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 bg-slate-950 text-white rounded-full text-xs font-black uppercase tracking-wider hover:bg-slate-800"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => {
                  const isAdded = addedProductId === product.id;
                  const isWishlisted = wishlistIds.includes(product.id);
                  const ratingInfo = getProductRatingSummary(product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white border border-slate-100 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-slate-300 hover:shadow-md group shadow-sm"
                    >
                      {/* Product Image Box */}
                      <div className="relative aspect-square bg-slate-50 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                          onClick={() => onQuickViewShopify(product)}
                          loading="lazy"
                        />

                        {/* Wishlist Button (Top-Left) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(product.id);
                          }}
                          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                          className={`absolute top-3 left-3 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-sm ${
                            isWishlisted
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : 'bg-white/90 text-slate-400 hover:text-slate-950 hover:bg-white'
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                          />
                        </button>

                        {/* Bestseller Badge */}
                        {product.bestseller && (
                          <div className="absolute top-3 right-3">
                            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-[10px] tracking-wider uppercase shadow-sm">
                              BESTSELLER
                            </span>
                          </div>
                        )}

                        {/* Quick View & Variations overlay button */}
                        <button
                          onClick={() => onQuickViewShopify(product)}
                          title="View options, variations & customer reviews"
                          className="absolute bottom-3 right-3 px-3 py-2 rounded-full bg-white/95 text-slate-900 hover:bg-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer shadow-md"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Variations & Reviews</span>
                        </button>
                      </div>

                      {/* Product Content */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Rating & Review Counter */}
                          <div className="flex items-center gap-1.5 mb-2">
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= Math.round(ratingInfo.average)
                                      ? 'text-amber-400 fill-amber-400'
                                      : 'text-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-[11px] font-bold text-slate-800 font-mono">
                              {ratingInfo.average}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              ({ratingInfo.count} {ratingInfo.count === 1 ? 'review' : 'reviews'})
                            </span>
                          </div>

                          {/* Title & Price Row */}
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <h4
                              onClick={() => onQuickViewShopify(product)}
                              className="text-base font-black text-slate-950 tracking-tight leading-snug cursor-pointer hover:underline"
                            >
                              {product.title}
                            </h4>
                            <span className="text-base font-black text-slate-950 whitespace-nowrap font-mono">
                              ₹{product.price}
                            </span>
                          </div>

                          {/* Variations Previews: Colors & Size in MM */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold uppercase text-slate-400">Colors:</span>
                              <div className="flex items-center -space-x-1">
                                <span className="w-3 h-3 rounded-full bg-red-500 border border-white" title="Red" />
                                <span className="w-3 h-3 rounded-full bg-blue-600 border border-white" title="Blue" />
                                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white" title="Green" />
                              </div>
                            </div>

                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              {product.dimensions || 'Size in mm'}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-xs text-slate-500 leading-relaxed mb-5 line-clamp-2 font-normal">
                            {product.description}
                          </p>
                        </div>

                        {/* Card Buttons */}
                        <div className="space-y-2">
                          <button
                            id={`add-to-cart-${product.id}`}
                            onClick={() => handleAddToCart(product)}
                            className={`w-full py-3 px-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                              isAdded
                                ? 'bg-emerald-600 text-white shadow-emerald-200'
                                : 'bg-slate-950 text-white hover:bg-slate-800 shadow-slate-200'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added to Cart</span>
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
