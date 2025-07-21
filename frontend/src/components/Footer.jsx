import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#E5AE32] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FRC</span>
              </div>
              <span className="font-bold text-xl">RobotikTR</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Türkiye'deki lise öğrencileri ve acemi FRC takımları için kapsamlı robotik eğitim platformu. 
              Geleceğin mühendislerini yetiştiriyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-[#E5AE32] transition-colors">
                  Kurslar
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-400 hover:text-[#E5AE32] transition-colors">
                  Oyunlar
                </Link>
              </li>
              <li>
                <Link to="/season" className="text-gray-400 hover:text-[#E5AE32] transition-colors">
                  2026 Sezonu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#E5AE32] transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">İletişim</h3>
            <div className="space-y-2 text-gray-400">
              <p>info@robotiktr.com</p>
              <p>Destek: support@robotiktr.com</p>
              <p>Türkiye</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 RobotikTR. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-[#E5AE32] transition-colors text-sm">
              Gizlilik Politikası
            </a>
            <a href="#" className="text-gray-400 hover:text-[#E5AE32] transition-colors text-sm">
              Kullanım Şartları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;