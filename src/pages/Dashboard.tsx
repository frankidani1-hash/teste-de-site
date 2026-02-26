import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  Star, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface Lead {
  id: number;
  name: string;
  phone: string;
  email: string;
  service_type: string;
  status: string;
  created_at: string;
}

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este lead?")) return;
    try {
      await fetch(`/api/leads/${id}`, { method: "DELETE" });
      setLeads(leads.filter(l => l.id !== id));
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const stats = [
    { label: "Total de Leads", value: leads.length, change: "+12%", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Novos Hoje", value: leads.filter(l => new Date(l.created_at).toDateString() === new Date().toDateString()).length, change: "+5", icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Visitas Agendadas", value: leads.filter(l => l.status === "Agendado").length, change: "Hoje", icon: Calendar, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Concluídos", value: leads.filter(l => l.status === "Concluído").length, change: "Total", icon: CheckCircle, color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col border-r border-slate-200 bg-white">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 bg-[#0f172a] rounded-lg flex items-center justify-center text-white">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 leading-tight">Vital Calhas</h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Dourados</p>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2 bg-slate-100 text-[#0f172a] rounded-lg transition-colors">
            <LayoutDashboard size={20} />
            <span className="font-medium">Início</span>
          </Link>
          <Link to="/admin" className="flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Users size={20} />
            <span className="font-medium">Leads (Contatos)</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Settings size={20} />
            <span className="font-medium">Serviços</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <Star size={20} />
            <span className="font-medium">Depoimentos</span>
          </button>
          <div className="pt-4 mt-4 border-t border-slate-200">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <Settings size={20} />
              <span className="font-medium">Configurações</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link to="/" className="flex w-full items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <LogOut size={20} className="text-rose-500" />
            <span className="font-medium">Sair</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200">
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                className="w-full bg-slate-100 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-slate-400 text-slate-900" 
                placeholder="Pesquisar leads..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-900 leading-none">Administrador</p>
                <p className="text-xs text-slate-500 mt-1">Vital Calhas</p>
              </div>
              <div className="size-10 rounded-full bg-slate-200 bg-cover bg-center border border-slate-300" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4Hl9a0YRAtLVY8ThuasfS1FBUf7eaVZ8DHJqb2jfVjswAn0hqkcgc2K-NVZVbAlkx8BJ-2rW2XzLX4Jvfx0skjixdexdELENQkYnh4cwQWnGpdkCQNHWg6ttcCY1G7KI0XsdBx31UdirQ47x0q-XY-8zw71UO00vvv3tfMXDgZ8DBv9_txYcHZHZgFCg1GinJSeHuvB8wdq2LLsb4sxOweIMiW8yG3ueWLgGpUJZErHGGQg-jaLGXzT9cVCYOu0QAD7obBTwR77TL')" }} referrerPolicy="no-referrer"></div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("size-10 rounded-lg flex items-center justify-center", stat.bg, stat.color)}>
                    <stat.icon size={20} />
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
                </div>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Filters & Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                <span>Filtrar por Status</span>
                <MoreHorizontal size={16} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                <span>Filtrar por Serviço</span>
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Download size={16} />
                <span>Exportar CSV</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#0f172a] text-white rounded-lg text-sm font-bold shadow-md hover:opacity-90 transition-all">
                <Plus size={16} />
                <span>Novo Lead</span>
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">ID</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Nome</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Telefone</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Serviço</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Data</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-slate-400">Carregando leads...</td>
                    </tr>
                  ) : leads.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-slate-400">Nenhum lead encontrado.</td>
                    </tr>
                  ) : leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-500">#{lead.id}</td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900">{lead.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{lead.phone}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{lead.service_type}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          lead.status === "Novo" ? "bg-blue-100 text-blue-800" :
                          lead.status === "Em Contato" ? "bg-purple-100 text-purple-800" :
                          lead.status === "Agendado" ? "bg-emerald-100 text-emerald-800" :
                          lead.status === "Concluído" ? "bg-slate-100 text-slate-800" :
                          "bg-rose-100 text-rose-800"
                        )}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <Link to={`/admin/leads/${lead.id}`} className="text-xs font-bold text-slate-600 hover:text-[#1152d4]">Ver Detalhes</Link>
                          <button onClick={() => handleDelete(lead.id)} className="text-xs font-bold text-slate-600 hover:text-rose-500">Excluir</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
              <p className="text-sm text-slate-500">Mostrando {leads.length} resultados</p>
              <div className="flex items-center gap-2">
                <button className="size-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button className="size-8 flex items-center justify-center rounded bg-[#0f172a] text-white text-sm font-bold">1</button>
                <button className="size-8 flex items-center justify-center rounded border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
