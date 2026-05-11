import { Link } from "react-router-dom";
import { Stock } from "../models";
import { addStockToPortfolioAPI } from "../services/AuthService";
import { toast } from "react-toastify";

type Props = {
  stock: Stock;
  onPortfolioAdd?: () => void;
};

const StockCard = ({ stock, onPortfolioAdd }: Props) => {
  const handleAddToPortfolio = async (e: React.MouseEvent) => {
    e.preventDefault();
    const res = await addStockToPortfolioAPI(stock.symbol);
    if (res) {
      toast.success(`${stock.symbol} adicionado ao portfólio!`);
      onPortfolioAdd && onPortfolioAdd();
    } else {
      toast.warning("Erro ao adicionar ao portfólio.");
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5 hover:border-emerald-500 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-md">
            {stock.symbol}
          </span>
          <h3 className="text-white font-semibold mt-2 text-sm line-clamp-1">
            {stock.companyName}
          </h3>
        </div>
        <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded-md">
          {stock.industry}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div>
          <p className="text-slate-400 text-xs">Price</p>
          <p className="text-white font-medium">${stock.purchase.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs">Last Div</p>
          <p className="text-white font-medium">${stock.lastDiv.toFixed(2)}</p>
        </div>
        <div className="col-span-2">
          <p className="text-slate-400 text-xs">Market Cap</p>
          <p className="text-white font-medium">
            ${(stock.marketCap / 1_000_000_000).toFixed(2)}B
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          to={`/company/${stock.symbol}`}
          className="flex-1 text-center text-xs bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors"
        >
          Ver Detalhes
        </Link>
        <button
          onClick={handleAddToPortfolio}
          className="flex-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition-colors"
        >
          + Portfólio
        </button>
      </div>
    </div>
  );
};

export default StockCard;
