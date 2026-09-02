/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenType, Product, CartItem, ProductSizeOption, ProductColorOption } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { ShopScreen } from './components/ShopScreen';
import { CustomPrintingScreen } from './components/CustomPrintingScreen';
import { BusinessScreen } from './components/BusinessScreen';
import { PortfolioScreen } from './components/PortfolioScreen';
import { LearnScreen } from './components/LearnScreen';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ShopifyModal } from './components/ShopifyModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { SupportModal } from './components/SupportModal';
import { ConsultModal } from './components/ConsultModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AuthModal } from './components/AuthModal';
import { PRODUCTS, getWishlistIds, toggleWishlistStorage } from './data/mockData';

export default function App() {
  // Navigation screen state
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-item-1',
      type: 'product',
      title: 'Voronoi Pen Holder',
      price: 450,
      quantity: 1,
      image: '/assets/voronoi_pen_holder.jpg',
      subtitle: 'PLA • Desk Accessories',
      specs: {
        material: 'PLA',
        sizeMm: '85 × 85 × 110 mm',
        colorName: 'Red',
      },
    },
  ]);

  // Wishlist state (persisted via localStorage)
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => getWishlistIds());

  // Modal dialog states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isShopifyModalOpen, setIsShopifyModalOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ScreenType;
      if (['home', 'shop', 'custom-printing', 'business', 'portfolio', 'learn'].includes(hash)) {
        setActiveScreen(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (screen: ScreenType) => {
    setActiveScreen(screen);
    window.location.hash = screen === 'home' ? '' : screen;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Wishlist toggle handler
  const handleToggleWishlist = (productId: string) => {
    const updated = toggleWishlistStorage(productId);
    setWishlistIds([...updated]);
  };

  // Cart handlers supporting product variations (size in mm & colors)
  const handleAddToCart = (
    product: Product,
    selectedSize?: ProductSizeOption,
    selectedColor?: ProductColorOption
  ) => {
    const sizeInfo = selectedSize || (product.sizeOptions ? product.sizeOptions[0] : undefined);
    const colorInfo = selectedColor || (product.colorVariations ? product.colorVariations[0] : undefined);
    const effectivePrice = sizeInfo ? sizeInfo.price : product.price;
    const variationKey = `${product.id}-${sizeInfo?.id || 'std'}-${colorInfo?.id || 'def'}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === variationKey);
      if (existing) {
        return prev.map((item) =>
          item.id === variationKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: variationKey,
          type: 'product',
          title: product.title,
          price: effectivePrice,
          quantity: 1,
          image: product.image,
          subtitle: `${product.material} • ${product.category}`,
          specs: {
            material: product.material,
            sizeMm: sizeInfo?.dimensionsMm || product.dimensions,
            colorName: colorInfo?.name || 'Standard',
          },
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleAddCustomPrintToCart = (item: CartItem) => {
    setCartItems((prev) => [item, ...prev]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 flex flex-col font-['Inter',sans-serif]">
      {/* Global Header */}
      <Header
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenShopifyModal={() => setIsShopifyModalOpen(true)}
        onOpenAuthModal={() => setIsAuthOpen(true)}
      />

      {/* Main Screen Content */}
      <main className="flex-1">
        {activeScreen === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onOpenConsult={() => setIsConsultOpen(true)}
          />
        )}

        {activeScreen === 'shop' && (
          <ShopScreen
            onNavigate={handleNavigate}
            onAddToCart={handleAddToCart}
            onQuickViewShopify={(product) => setQuickViewProduct(product)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeScreen === 'custom-printing' && (
          <CustomPrintingScreen onAddCustomPrintToCart={handleAddCustomPrintToCart} />
        )}

        {activeScreen === 'business' && <BusinessScreen />}

        {activeScreen === 'portfolio' && (
          <PortfolioScreen onNavigate={handleNavigate} />
        )}

        {activeScreen === 'learn' && (
          <LearnScreen onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenOrderTracking={() => setIsOrderTrackingOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenShopifyExport={() => {
          setIsCartOpen(false);
          setIsShopifyModalOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(product) => handleAddToCart(product)}
        onExploreShop={() => {
          setIsWishlistOpen(false);
          handleNavigate('shop');
        }}
      />

      {/* Shopify Integration & Hotlinks Modal */}
      <ShopifyModal
        isOpen={isShopifyModalOpen}
        onClose={() => setIsShopifyModalOpen(false)}
      />

      {/* Quick View Product Modal (Variations & Reviews) */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onOpenShopifyModal={() => {
          setQuickViewProduct(null);
          setIsShopifyModalOpen(true);
        }}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
      />

      {/* Support & Privacy Modal */}
      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      {/* Consult Booking Modal */}
      <ConsultModal
        isOpen={isConsultOpen}
        onClose={() => setIsConsultOpen(false)}
      />

      {/* Auth Account Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
