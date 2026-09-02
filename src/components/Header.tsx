import React from 'react';
import { ShoppingCart, User, Menu, X, Share2, Sparkles, Heart } from 'lucide-react';
import { ScreenType } from '../types';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  activeScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenShopifyModal: () => void;
  onOpenAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeScreen,
  onNavigate,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  onOpenShopifyModal,
  onOpenAuthModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems: { label: string; screen: ScreenType }[] = [
    { label: 'Shop', screen: 'shop' },
    { label: 'Custom Printing', screen: 'custom-printing' },
    { label: 'Business', screen: 'business' },
    { label: 'Portfolio', screen: 'portfolio' },
    { label: 'Learn', screen: 'learn' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-2.5 sm:gap-3 group text-left cursor-pointer transition-transform duration-150 hover:scale-[1.01]"
        >
          <BrandLogo size="md" />
          <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tighter uppercase text-slate-950 font-['Inter'] flex items-center gap-1.5">
            Plain <span className="text-orange-600 font-bold">Layers</span>
          </span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-8 text-[11px] font-bold tracking-widest uppercase">
          {navItems.map((item) => {
            const isActive = activeScreen === item.screen;
            return (
              <button
                key={item.screen}
                id={`nav-${item.screen}-btn`}
                onClick={() => onNavigate(item.screen)}
                className={`relative py-2 transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? 'text-slate-950 font-black'
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-950 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Shopify Hotlinks & Embed Quick Button */}
          <button
            id="header-shopify-btn"
            onClick={onOpenShopifyModal}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer"
            title="Use on Shopify - Hotlink Images & Embed Quoter"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-600" />
            <span>Shopify Embed</span>
          </button>

          {/* Wishlist Pill */}
          <button
            id="header-wishlist-btn"
            onClick={onOpenWishlist}
            className="px-3 py-2 rounded-full border border-slate-200 bg-white hover:border-slate-950 text-slate-700 hover:text-slate-950 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            aria-label="View Wishlist"
            title="View Saved Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
            <span>Wishlist ({wishlistCount < 10 ? `0${wishlistCount}` : wishlistCount})</span>
          </button>

          {/* Cart Pill */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="relative px-4 py-2 bg-slate-950 text-white text-[10px] font-black rounded-full shadow-lg shadow-slate-200 uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Cart ({cartCount < 10 ? `0${cartCount}` : cartCount})</span>
          </button>

          {/* User Icon */}
          <button
            id="header-user-btn"
            onClick={onOpenAuthModal}
            className="w-9 h-9 rounded-full border border-slate-200 hover:border-slate-950 bg-white flex items-center justify-center text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            aria-label="User Account"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const isActive = activeScreen === item.screen;
            return (
              <button
                key={item.screen}
                onClick={() => {
                  onNavigate(item.screen);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
                  isActive
                    ? 'bg-slate-950 text-white'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                onOpenWishlist();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-slate-50 text-slate-700 border border-slate-200"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlistCount > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              <span>View Wishlist ({wishlistCount})</span>
            </button>
            <button
              onClick={() => {
                onOpenShopifyModal();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[10px] font-black uppercase tracking-wider rounded-full bg-slate-100 text-slate-700 border border-slate-200"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Use on Shopify & Hotlink Images</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
