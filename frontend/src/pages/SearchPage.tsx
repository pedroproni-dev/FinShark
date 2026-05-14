import { useState } from "react";
import { Stock } from "../models";
import { searchStocksAPI } from "../services/AuthService";
import StockCard from "../components/StockCard";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    const res = await searchStocksAPI(search);
    setStocks(res || []);
    setSearched(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-white mb-2">Buscar Ações</h1>
        <p className="text-slate-400 mb-8">Pesquise por símbolo ou nome da empresa</p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ex: AAPL, TSLA, MSFT..."
            className="flex-1 bg-slate-800 text-white placeholder-slate-400 border border-slate-600 rounded-xl px-5 py-3 text-base focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold transition-colors"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {/* Results */}
        {searched && stocks.length === 0 && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-white font-bold text-xl mb-2">Nenhuma ação encontrada</p>
            <p className="text-slate-400">Tente um símbolo diferente ou adicione a ação manualmente.</p>
          </div>
        )}

        {stocks.length > 0 && (
          <>
            <p className="text-slate-400 text-sm mb-4">{stocks.length} resultado(s) encontrado(s)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {stocks.map((s) => (
                <StockCard key={s.id} stock={s} />
              ))}
            </div>
          </>
        )}

        {!searched && (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🦈</p>
            <p className="text-slate-400">Digite um símbolo ou nome de empresa para começar.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
