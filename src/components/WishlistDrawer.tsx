import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight, Check } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onExploreShop: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onExploreShop,
}) => {
  const [addedIds, setAddedIds] = React.useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleAddWithFeedback = (product: Product) => {
    onAddToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach((p) => onAddToCart(p));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#fcfcfc] text-slate-900 h-full shadow-2xl z-10 flex flex-col border-l border-slate-100">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-red-500" />
            </div>
            <div>
              <h2 className="text-base font-black uppercase tracking-tight text-slate-950 font-['Inter']">
                Saved Wishlist
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-950 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-xs">
                <h3 className="text-sm font-black uppercase tracking-tight text-slate-950">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Save your favorite functional parts, desk organizers, and custom models to view or purchase anytime.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onExploreShop();
                }}
                className="mt-4 px-6 py-3 rounded-full bg-slate-950 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => {
              const isAdded = addedIds[product.id];
              return (
                <div
                  key={product.id}
                  className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex gap-4 transition-all hover:border-slate-200"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-black text-slate-950 uppercase tracking-tight line-clamp-1">
                          {product.title}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          title="Remove from wishlist"
                          className="text-slate-300 hover:text-red-500 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {product.material}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {product.dimensions || 'Custom size'}
                        </span>
                      </div>

                      <div className="text-sm font-black text-slate-950 font-mono mt-1">
                        ₹{product.price}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="pt-2 flex items-center justify-end">
                      <button
                        onClick={() => handleAddWithFeedback(product)}
                        className={`px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-950 hover:bg-slate-800 text-white shadow-sm'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3 h-3" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-white space-y-3">
            <button
              onClick={handleMoveAllToCart}
              className="w-full py-3.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-slate-200 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add All to Cart</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onExploreShop();
              }}
              className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-950 flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
