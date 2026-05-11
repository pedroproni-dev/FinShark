import { useEffect, useState } from "react";
import { StockComment } from "../models";
import { createCommentAPI, getCommentsAPI } from "../services/AuthService";
import { toast } from "react-toastify";

type Props = { stockId: number };

const CommentSection = ({ stockId }: Props) => {
  const [comments, setComments] = useState<StockComment[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    const res = await getCommentsAPI(stockId);
    if (res) setComments(res);
  };

  useEffect(() => { fetchComments(); }, [stockId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    const res = await createCommentAPI(stockId, title, content);
    if (res) {
      toast.success("Comentário adicionado!");
      setTitle("");
      setContent("");
      fetchComments();
    } else {
      toast.error("Erro ao adicionar comentário.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
      <h3 className="text-white font-bold text-lg mb-4">Comentários</h3>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
        />
        <textarea
          placeholder="Deixe seu comentário sobre esta ação..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          className="w-full bg-slate-700 text-white placeholder-slate-400 border border-slate-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 resize-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {loading ? "Enviando..." : "Publicar Comentário"}
        </button>
      </form>

      {/* Comments list */}
      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-slate-400 text-sm">Nenhum comentário ainda. Seja o primeiro!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-emerald-400 text-sm font-semibold">{c.createdBy}</span>
                <span className="text-slate-500 text-xs">
                  {new Date(c.createdOn).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <p className="text-white text-sm font-medium mb-1">{c.title}</p>
              <p className="text-slate-300 text-sm">{c.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
