import { useEffect, useState } from "react";
import { Portfolio } from "../models";
import { getUserPortfolioAPI, removeStockFromPortfolioAPI } from "../services/AuthService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPortfolio = async () => {
    const res = await getUserPortfolioAPI();
    setPortfolio(res || []);
    setLoading(false);
  };

  useEffect(() => { fetchPortfolio(); }, []);

  const handleRemove = async (symbol: string) => {
    const res = await removeStockFromPortfolioAPI(symbol);
    if (res !== null) {
      toast.success(`${symbol} removido do portfólio!`);
      fetchPortfolio();
    } else {
      toast.error("Erro ao remover ação.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Carregando portfólio...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-2">Meu Portfólio</h1>
        <p className="text-slate-400 mb-8">Suas ações favoritas em um só lugar</p>

        {portfolio.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">📂</p>
            <p className="text-white font-bold text-xl mb-2">Portfólio vazio</p>
            <p className="text-slate-400 mb-6">Adicione ações na página de busca.</p>
            <Link
              to="/search"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
            >
              Buscar Ações
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  {["Símbolo", "Empresa", "Setor", "Preço", "Último Div.", "Market Cap", "Ações"].map((h) => (
                    <th key={h} className="text-slate-400 text-sm font-medium pb-3 pr-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock) => (
                  <tr key={stock.symbol} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 pr-6">
                      <span className="text-emerald-400 font-bold">{stock.symbol}</span>
                    </td>
                    <td className="py-4 pr-6 text-white text-sm">{stock.companyName}</td>
                    <td className="py-4 pr-6">
                      <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">{stock.industry}</span>
                    </td>
                    <td className="py-4 pr-6 text-white font-medium">${stock.purchase.toFixed(2)}</td>
                    <td className="py-4 pr-6 text-white">${stock.lastDiv.toFixed(2)}</td>
                    <td className="py-4 pr-6 text-slate-300 text-sm">
                      ${(stock.marketCap / 1_000_000_000).toFixed(2)}B
                    </td>
                    <td className="py-4 pr-6">
                      <div className="flex gap-2">
                        <Link
                          to={`/company/${stock.symbol}`}
                          className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Detalhes
                        </Link>
                        <button
                          onClick={() => handleRemove(stock.symbol)}
                          className="text-xs bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg transition-all"
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
