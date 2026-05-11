// HomePage.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export const HomePage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          Dados de mercado em tempo real via Twelve Data
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
          Encontre dados
          <span className="text-emerald-400"> financeiros </span>
          relevantes
        </h1>

        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10">
          FinShark ajuda investidores a encontrar documentos financeiros relevantes
          sem o ruído de dados de curto prazo.
        </p>

        <div className="flex gap-4 justify-center">
          {isLoggedIn() ? (
            <Link
              to="/search"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
            >
              Ir para Busca →
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
              >
                Começar Agora
              </Link>
              <Link
                to="/login"
                className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors"
              >
                Fazer Login
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "📊", title: "Cotações em Tempo Real", desc: "Dados de preço, volume e variação via Twelve Data API" },
          { icon: "💼", title: "Portfólio Personalizado", desc: "Monte e gerencie sua carteira de ações favoritas" },
          { icon: "💬", title: "Comentários & Análises", desc: "Compartilhe insights com outros investidores" },
        ].map((f) => (
          <div key={f.title} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-white font-bold mb-2">{f.title}</h3>
            <p className="text-slate-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
