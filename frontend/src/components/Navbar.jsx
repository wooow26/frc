import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Kurslar', path: '/courses' },
    { name: 'Oyunlar', path: '/games' },
    { name: '2026 Sezonu', path: '/season' },
    { name: 'İletişim', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#E5AE32] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FRC</span>
            </div>
            <span className="font-bold text-xl text-gray-900">RobotikTR</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-[#E5AE32] bg-[#E5AE32]/10'
                    : 'text-gray-700 hover:text-[#E5AE32] hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              className="bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              onClick={() => alert('Takım girişi yakında aktif olacak!')}
            >
              Takım Girişi
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-[#E5AE32] bg-[#E5AE32]/10'
                      : 'text-gray-700 hover:text-[#E5AE32] hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button 
                  className="w-full bg-[#E5AE32] hover:bg-[#E5AE32]/90 text-white font-semibold py-2 rounded-lg"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    alert('Takım girişi yakında aktif olacak!');
                  }}
                >
                  Takım Girişi
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;