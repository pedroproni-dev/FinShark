import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StockQuote, Stock } from "../models";
import { getStockQuoteAPI, searchStocksAPI, addStockToPortfolioAPI } from "../services/AuthService";
import QuoteCard from "../components/QuoteCard";
import CommentSection from "../components/CommentSection";
import { toast } from "react-toastify";

const CompanyPage = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!symbol) return;
      const [quoteRes, stockRes] = await Promise.all([
        getStockQuoteAPI(symbol),
        searchStocksAPI(symbol),
      ]);
      setQuote(quoteRes);
      if (stockRes && stockRes.length > 0) {
        const found = stockRes.find((s) => s.symbol.toLowerCase() === symbol.toLowerCase());
        setStock(found || stockRes[0]);
      }
      setLoading(false);
    };
    fetchData();
  }, [symbol]);

  const handleAddPortfolio = async () => {
    if (!symbol) return;
    const res = await addStockToPortfolioAPI(symbol);
    if (res) {
      toast.success(`${symbol} adicionado ao portfólio!`);
    } else {
      toast.warning("Erro ou já está no portfólio.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-slate-400">Carregando dados de {symbol}...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white">{symbol}</h1>
            {stock && <p className="text-slate-400">{stock.companyName} · {stock.industry}</p>}
          </div>
          <button
            onClick={handleAddPortfolio}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            + Adicionar ao Portfólio
          </button>
        </div>

        {/* Quote Card */}
        {quote ? (
          <QuoteCard quote={quote} />
        ) : (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <p className="text-slate-400">Cotação em tempo real não disponível para {symbol}.</p>
            {stock && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-slate-400">Preço Base</p>
                  <p className="text-white font-bold">${stock.purchase.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Último Dividendo</p>
                  <p className="text-white font-bold">${stock.lastDiv.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Market Cap</p>
                  <p className="text-white font-bold">${(stock.marketCap / 1e9).toFixed(2)}B</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Comments */}
        {stock && <CommentSection stockId={stock.id} />}
      </div>
    </div>
  );
};

export default CompanyPage;
