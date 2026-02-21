const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Logo & Tagline */}
          <div className="space-y-6">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-[0.15em] text-gray-900 uppercase">PRAESO</span>
              <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Inteligência em presença e antecipação estratégica para profissionais que valorizam o tempo e a previsibilidade.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Sistemas Online
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:col-span-3">
            <div className="space-y-6">
              <h5 className="text-sm font-black text-gray-900 uppercase tracking-widest">Solução</h5>
              <ul className="space-y-4">
                <li><a href="#features" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Recursos</a></li>
                <li><a href="#how-it-works" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Método</a></li>
                <li><a href="#stats" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Resultados</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-sm font-black text-gray-900 uppercase tracking-widest">Institucional</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Sobre nós</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Contato</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-sm font-black text-gray-900 uppercase tracking-widest">Legal</h5>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Privacidade</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">Termos</a></li>
                <li><a href="#" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-gray-400 font-medium">
            © {currentYear} PRAESO. Todos os direitos reservados.
            <span className="hidden md:inline ml-2 text-gray-300">|</span>
            <span className="md:ml-2 text-gray-500">Engenhado com precisão para alta performance.</span>
          </div>
          <div className="flex gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-primary-600 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;