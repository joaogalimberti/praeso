import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-1.5 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <span className="text-xl font-black tracking-[0.15em] text-gray-900 uppercase">PRAESO</span>
            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Recursos</a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Como Funciona</a>
            <button
              className="bg-primary-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-700 transition-all active:scale-95 shadow-lg shadow-primary-500/20"
              onClick={() => navigate('/login')}
            >
              Começar Agora
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 space-y-4 shadow-xl animate-fade-in">
          <a
            href="#features"
            className="block text-base font-medium text-gray-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Recursos
          </a>
          <a
            href="#how-it-works"
            className="block text-base font-medium text-gray-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Como Funciona
          </a>
          <button
            className="w-full bg-primary-600 text-white px-5 py-3 rounded-xl text-base font-semibold"
            onClick={() => {
              navigate('/login');
              setMobileMenuOpen(false);
            }}
          >
            Começar Agora
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;