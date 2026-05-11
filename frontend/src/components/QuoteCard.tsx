import { StockQuote } from "../models";

type Props = { quote: StockQuote };

const QuoteCard = ({ quote }: Props) => {
  const isPositive = quote.change >= 0;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-black text-white">{quote.symbol}</h2>
          <p className="text-slate-400 text-sm">{quote.name}</p>
          <p className="text-xs text-slate-500">{quote.exchange}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-white">${quote.close.toFixed(2)}</p>
          <p className={`text-sm font-semibold mt-1 ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
            {isPositive ? "▲" : "▼"} {Math.abs(quote.change).toFixed(2)} ({quote.percentChange}%)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-700 pt-4">
        {[
          { label: "Open", value: `$${quote.open.toFixed(2)}` },
          { label: "Previous Close", value: `$${quote.previousClose.toFixed(2)}` },
          { label: "High", value: `$${quote.high.toFixed(2)}` },
          { label: "Low", value: `$${quote.low.toFixed(2)}` },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs text-slate-400">{label}</p>
            <p className="text-white font-semibold text-sm">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-slate-700 pt-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-400">Volume</p>
          <p className="text-white font-semibold text-sm">
            {quote.volume.toLocaleString()}
          </p>
        </div>
        <p className="text-xs text-slate-500">Atualizado: {quote.datetime}</p>
      </div>
    </div>
  );
};

export default QuoteCard;
