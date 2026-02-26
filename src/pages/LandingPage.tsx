import React, { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, MapPin, Droplets, Shield, Wrench, Home, Grid, Package, ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service_type: "Instalação de Calhas",
    address: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          service_type: "Instalação de Calhas",
          address: "",
          message: ""
        });
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1152d4] text-white">
              <Home size={24} />
            </div>
            <h2 className="text-xl font-black tracking-tight text-slate-900">Vital Calhas</h2>
          </div>

          <nav className="hidden lg:flex flex-1 justify-center gap-8">
            {["Home", "Serviços", "Galeria", "Depoimentos", "FAQ", "Contato"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-700 hover:text-[#1152d4] transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contato" className="hidden sm:flex min-w-[140px] items-center justify-center rounded-lg h-11 px-5 bg-[#1152d4] text-white text-sm font-bold tracking-wide hover:bg-[#1152d4]/90 transition-all shadow-lg shadow-[#1152d4]/20">
              Agendar Visita
            </a>
            <button className="lg:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 lg:hidden">
          <nav className="flex flex-col items-center gap-6 p-10">
            {["Home", "Serviços", "Galeria", "Depoimentos", "FAQ", "Contato"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-xl font-bold text-slate-900" onClick={() => setIsMenuOpen(false)}>
                {item}
              </a>
            ))}
            <Link to="/admin" className="text-sm text-slate-400 mt-10">Acesso Restrito</Link>
          </nav>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section id="home" className="relative h-[640px] overflow-hidden bg-slate-900 flex items-center">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAel7K6i1LPTCDjP1n4rM-dX4w7aVX0WcS4Twin3-aokdsHTKP7Pa2tVZy4C8PT7y-XJtg4-hTkgCvlXEpD-A7WEnkd-0C0mJKIOmwlgNZax7DaY8WVcgbOaCvv7-ZQF5hjM4HSAbn_oFAsleFyNzAcgBK_BZxjXj0Zwc9SVlaA17eZKcTuoz7vMM_FC6yCkrPG-YuRZAbOGZHhKOkZP6DXnL6dfOxz3Zh-a2TqU8jt4oof7iGuCchcNsZNP9osUlEki-pA13RAbT63" 
              alt="Casa moderna com sistema de calhas" 
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-10">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-widest mb-6"
              >
                Especialistas em Proteção Residencial
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-tight mb-6"
              >
                Proteção para sua casa começa pelo <span className="text-[#1152d4]">telhado</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-300 text-lg md:text-xl font-normal leading-relaxed mb-8"
              >
                Especialistas em calhas, rufos e telhados com acabamento impecável e durabilidade garantida. Proteja sua estrutura contra infiltrações com quem entende do assunto.
              </motion.p>
              <div className="flex flex-wrap gap-4">
                <a href="#contato" className="flex min-w-[180px] items-center justify-center rounded-lg h-14 px-8 bg-[#1152d4] text-white text-base font-bold hover:scale-105 transition-transform shadow-xl shadow-[#1152d4]/30">
                  Pedir Orçamento
                </a>
                <a href="#serviços" className="flex min-w-[180px] items-center justify-center rounded-lg h-14 px-8 bg-white/10 backdrop-blur-md border border-white/20 text-white text-base font-bold hover:bg-white/20 transition-all">
                  Nossos Serviços
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="serviços" className="py-24 px-4 md:px-10 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center gap-4 mb-16">
            <span className="text-[#1152d4] font-bold text-sm uppercase tracking-widest">Excelência em cada detalhe</span>
            <h2 className="text-slate-900 text-3xl md:text-4xl font-black tracking-tight">Soluções Completas em Calhas e Telhados</h2>
            <p className="text-slate-600 text-lg max-w-2xl">
              Oferecemos serviços profissionais com materiais de alta qualidade para garantir a segurança e longevidade da sua residência.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Calhas sob Medida", desc: "Instalação de calhas personalizadas para qualquer tipo de telhado, garantindo o escoamento perfeito da água.", icon: Droplets },
              { title: "Rufos de Proteção", desc: "Proteção vital contra infiltrações em muros, divisórias e encontros de telhados com paredes.", icon: Shield },
              { title: "Manutenção Preventiva", desc: "Limpeza técnica e reparos programados para evitar danos estruturais caros e garantir o fluxo livre.", icon: Wrench },
              { title: "Reformas de Telhados", desc: "Substituição de telhas, reparos em madeiramento e reforço de estruturas metálicas ou de madeira.", icon: Home },
              { title: "Fechamentos Metálicos", desc: "Soluções modernas e estéticas para áreas externas, sheds e estruturas industriais com acabamento premium.", icon: Grid },
              { title: "Venda de Materiais", desc: "Comercialização direta de chapas galvanizadas, alumínio e acessórios de alta resistência para profissionais.", icon: Package },
            ].map((service, idx) => (
              <div key={idx} className="group flex flex-col bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#1152d4]/50 transition-all hover:shadow-2xl hover:shadow-[#1152d4]/5">
                <div className="size-14 rounded-xl bg-[#1152d4]/10 text-[#1152d4] flex items-center justify-center mb-6 group-hover:bg-[#1152d4] group-hover:text-white transition-colors">
                  <service.icon size={28} />
                </div>
                <h3 className="text-slate-900 text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6 flex-1">{service.desc}</p>
                <button className="flex items-center gap-2 text-[#1152d4] font-bold text-sm group-hover:gap-3 transition-all">
                  Saiba Mais <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Proteja seu Patrimônio</h2>
                <p className="text-slate-600 mb-8">Preencha o formulário e nossa equipe entrará em contato em até 24 horas para agendar uma inspeção gratuita e orçamento.</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1152d4] rounded-full flex items-center justify-center text-white">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-500 uppercase">Ligue / WhatsApp</h4>
                      <p className="text-lg font-bold">(67) 99876-5432</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1152d4] rounded-full flex items-center justify-center text-white">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-500 uppercase">E-mail</h4>
                      <p className="text-lg font-bold">contato@vitalcalhas.com.br</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1152d4] rounded-full flex items-center justify-center text-white">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-500 uppercase">Endereço</h4>
                      <p className="text-lg font-bold">Rua Mato Grosso, 1234<br/>Dourados, MS</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
                {submitted ? (
                  <div className="text-center py-10">
                    <div className="size-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Solicitação Enviada!</h3>
                    <p className="text-slate-600">Obrigado pelo contato. Em breve nossa equipe entrará em contato.</p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-[#1152d4] font-bold hover:underline"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-1.5 opacity-70">Nome Completo</label>
                        <input 
                          required
                          className="w-full rounded-lg border-slate-200 bg-transparent focus:ring-[#1152d4] focus:border-[#1152d4]" 
                          placeholder="Ex: João Silva" 
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5 opacity-70">WhatsApp / Telefone</label>
                        <input 
                          required
                          className="w-full rounded-lg border-slate-200 bg-transparent focus:ring-[#1152d4] focus:border-[#1152d4]" 
                          placeholder="(67) 99999-9999" 
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 opacity-70">Tipo de Serviço</label>
                      <select 
                        className="w-full rounded-lg border-slate-200 bg-transparent focus:ring-[#1152d4] focus:border-[#1152d4]"
                        value={formData.service_type}
                        onChange={(e) => setFormData({...formData, service_type: e.target.value})}
                      >
                        <option>Instalação de Calhas</option>
                        <option>Reparo de Calhas</option>
                        <option>Limpeza de Calhas</option>
                        <option>Reforma de Telhado</option>
                        <option>Rufos / Outros</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 opacity-70">Endereço da Obra</label>
                      <input 
                        className="w-full rounded-lg border-slate-200 bg-transparent focus:ring-[#1152d4] focus:border-[#1152d4]" 
                        placeholder="Rua, Bairro, Cidade" 
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 opacity-70">Mensagem (Opcional)</label>
                      <textarea 
                        className="w-full rounded-lg border-slate-200 bg-transparent focus:ring-[#1152d4] focus:border-[#1152d4] min-h-[100px]" 
                        placeholder="Conte-nos mais sobre sua necessidade..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-[#1152d4] text-white py-4 rounded-lg font-bold hover:opacity-90 transition-all shadow-lg shadow-[#1152d4]/20 disabled:opacity-50" 
                      type="submit"
                    >
                      {isSubmitting ? "Enviando..." : "Solicitar Orçamento Grátis"}
                    </button>
                    <p className="text-xs text-center opacity-50">Ao enviar, você concorda com nossa política de privacidade.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 md:px-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded bg-[#1152d4] flex items-center justify-center text-white">
              <Home size={18} />
            </div>
            <span className="text-white font-bold text-lg">Vital Calhas Dourados</span>
          </div>
          <div className="flex gap-8 text-sm">
            <a className="hover:text-white transition-colors" href="#">Privacidade</a>
            <a className="hover:text-white transition-colors" href="#">Termos</a>
            <Link to="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
          <p className="text-sm">© 2024 Vital Calhas. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/5567998765432" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 group flex items-center gap-3"
      >
        <span className="bg-white px-4 py-2 rounded-lg shadow-xl text-slate-900 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">Fale Conosco</span>
        <div className="size-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
          <MessageCircle size={32} />
        </div>
      </a>
    </div>
  );
}
