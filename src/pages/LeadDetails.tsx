import { useState, useEffect } from "react";
import { 
  ChevronRight, 
  Printer, 
  Save, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  FileText, 
  History, 
  Edit3, 
  Flag, 
  RefreshCw, 
  Send,
  Map,
  CreditCard,
  Archive,
  Trash2,
  MessageCircle
} from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  service_type: string;
  address: string;
  message: string;
  status: string;
  created_at: string;
}

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/leads/${id}`);
      if (res.ok) {
        const data = await res.json();
        setLead(data);
        setStatus(data.status);
      }
    } catch (error) {
      console.error("Error fetching lead:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        alert("Status atualizado com sucesso!");
        fetchLead();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;
    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" });
      navigate("/admin");
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  if (loading) return <div className="p-10 text-center">Carregando...</div>;
  if (!lead) return <div className="p-10 text-center">Lead não encontrado.</div>;

  return (
    <div className="min-h-screen bg-[#f6f6f8] text-slate-900 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 md:px-10 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-[#1152d4]">
            <div className="size-8 bg-[#1152d4] rounded flex items-center justify-center text-white">
              <RefreshCw size={18} />
            </div>
            <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Vital Calhas Dourados</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/admin" className="text-slate-600 text-sm font-medium hover:text-[#1152d4]">Dashboard</Link>
            <Link to="/admin" className="text-[#1152d4] text-sm font-semibold border-b-2 border-[#1152d4] py-1">Leads</Link>
            <button className="text-slate-600 text-sm font-medium hover:text-[#1152d4]">Agendamentos</button>
            <button className="text-slate-600 text-sm font-medium hover:text-[#1152d4]">Equipes</button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-full bg-slate-200 bg-cover bg-center border-2 border-slate-200" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxgaQX65CtCiujSMtoZdskE7mk2rOrg7SXNXx5o1jD4a4bPALjRlYSvyxQs0sTjy_rkkM-r95G_-ibD54pUFR86yNBaa_REwtlN2QmvWZ0Gz7YUVW06MS8DfbDEtMxgqgugTTJb6vi4EJlGD2Vib-z2RRJvPS_dA03IfdcOxws22Ru-yjPmwDQ469taEFj8x3wWUVNszBttiSO6nd6J87zVhE-ew5TQo2MrUVFy9U0fqIQuhdjz8haSqfz-Vb9uc-8twmPW2mLA_jI')" }} referrerPolicy="no-referrer"></div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto w-full p-4 md:p-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-6 text-slate-500 text-sm font-medium">
          <Link to="/admin" className="hover:text-[#1152d4]">Dashboard</Link>
          <ChevronRight size={14} />
          <Link to="/admin" className="hover:text-[#1152d4]">Leads</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900">Detalhes do Lead: {lead.name}</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-slate-900 text-3xl font-black tracking-tight">{lead.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">{lead.status}</span>
            </div>
            <p className="text-slate-500">ID do Lead: #L-{lead.id} • Recebido em {new Date(lead.created_at).toLocaleString('pt-BR')}</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all">
              <Printer size={18} />
              Imprimir Resumo
            </button>
            <button 
              onClick={handleUpdateStatus}
              className="flex items-center gap-2 px-4 py-2 bg-[#1152d4] text-white rounded-lg text-sm font-bold shadow-lg shadow-[#1152d4]/20 hover:brightness-110 transition-all"
            >
              <Save size={18} />
              Salvar Alterações
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <User size={18} className="text-[#1152d4]" />
                  Informações do Cliente
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nome Completo</p>
                    <p className="text-slate-900 font-medium">{lead.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">E-mail</p>
                    <a className="text-[#1152d4] hover:underline font-medium" href={`mailto:${lead.email}`}>{lead.email || "Não informado"}</a>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">WhatsApp</p>
                    <div className="flex items-center gap-3">
                      <p className="text-slate-900 font-medium">{lead.phone}</p>
                      <a 
                        href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-bold hover:bg-green-500/20"
                      >
                        <MessageCircle size={14} />
                        Abrir Conversa
                      </a>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tipo de Serviço</p>
                    <p className="text-slate-900 font-medium">{lead.service_type}</p>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Endereço Completo</p>
                    <div className="flex items-start gap-2">
                      <MapPin size={18} className="text-slate-400 mt-0.5" />
                      <p className="text-slate-900 font-medium leading-relaxed">
                        {lead.address || "Não informado"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Message Section */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                <FileText size={18} className="text-[#1152d4]" />
                Mensagem
              </h3>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 italic text-slate-700 leading-relaxed">
                "{lead.message || "Sem mensagem adicional."}"
              </div>
            </section>

            {/* Internal Notes */}
            <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <History size={18} className="text-[#1152d4]" />
                  Notas Internas
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex gap-4">
                  <div className="size-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                    <Flag size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm text-slate-900">Sistema</span>
                      <span className="text-xs text-slate-400">há 2 horas</span>
                    </div>
                    <p className="text-sm text-slate-600">Lead criado via Formulário de Contato do Site.</p>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Adicionar Nota Interna</label>
                  <textarea className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-[#1152d4] focus:border-[#1152d4] min-h-[80px]" placeholder="Digite seu comentário aqui..."></textarea>
                  <div className="mt-2 flex justify-end">
                    <button className="px-4 py-1.5 bg-slate-200 text-slate-700 text-sm font-bold rounded hover:brightness-95 transition-all">
                      Postar Nota
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Manage Lead */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <RefreshCw size={18} className="text-[#1152d4]" />
                Gerenciar Lead
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Dropdown de Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-[#1152d4] focus:border-[#1152d4] py-2.5"
                  >
                    <option value="Novo">Novo Lead</option>
                    <option value="Em Contato">Contatado</option>
                    <option value="Agendado">Agendado</option>
                    <option value="Orçado">Orçado</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Perdido">Perdido / Descartado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Atribuir Equipe</label>
                  <select className="w-full bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-[#1152d4] focus:border-[#1152d4] py-2.5">
                    <option value="">Não atribuído</option>
                    <option value="t1">Equipe Alfa (Limpeza)</option>
                    <option value="t2">Equipe Bravo (Reparo)</option>
                    <option value="t3">Equipe Charlie (Instalação)</option>
                  </select>
                </div>
                <div className="pt-4 space-y-2">
                  <button 
                    onClick={handleUpdateStatus}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1152d4] text-white rounded-lg text-sm font-bold shadow-lg shadow-[#1152d4]/20 hover:brightness-110 transition-all"
                  >
                    Atualizar Status
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-all">
                    <Send size={16} />
                    Enviar Confirmação
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Ações Rápidas</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-all text-slate-600">
                    <Map size={18} className="mb-1" />
                    <span className="text-[10px] font-bold">Direções</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-all text-slate-600">
                    <CreditCard size={18} className="mb-1" />
                    <span className="text-[10px] font-bold">Orçamento</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-all text-slate-600">
                    <Archive size={18} className="mb-1" />
                    <span className="text-[10px] font-bold">Arquivar</span>
                  </button>
                  <button 
                    onClick={handleDelete}
                    className="flex flex-col items-center justify-center p-3 rounded-lg border border-red-50 hover:bg-red-50 transition-all text-red-500"
                  >
                    <Trash2 size={18} className="mb-1" />
                    <span className="text-[10px] font-bold">Excluir Lead</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Map Preview */}
            <div className="bg-slate-200 rounded-xl h-48 w-full relative overflow-hidden group border border-slate-200 shadow-sm">
              <img 
                className="absolute inset-0 w-full h-full object-cover opacity-60" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjzJ9RvP99X5djPkdVlGtMn9Q1O62Vp9-qvaZLhPvr5z4MRpzoCQscRK0Ka97iVe_GyJmrBMINzDGwTb7KsLZpMOd7AWYXmjPQE3jadjL1pmvPQlUQ4gdkIGhF38Zfourt43-M4-0c44CHOsErI7sibBnYiF2RgCaNBOSGYef9PVoy4eKO4OZwrpYWDosn8Mg13y6ZQABfC8KvPyJqQpEHHVcc8nsqeN3yTbjIOdzlOCjkjNCp91Ku52uf3Vxjvvb1fvVL126UlmJK" 
                alt="Mapa da localização"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
                <MapPin size={32} className="text-[#1152d4] drop-shadow-md" />
                <p className="mt-2 text-xs font-bold text-slate-900 bg-white/80 px-2 py-1 rounded">Visualizar Local</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 py-8 border-t border-slate-200 bg-white">
        <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center text-slate-400 text-xs">
          <p>© 2024 Vital Calhas Dourados. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <button className="hover:text-[#1152d4]">Central de Ajuda</button>
            <button className="hover:text-[#1152d4]">Status do Sistema</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
