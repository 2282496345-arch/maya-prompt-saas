import { Star } from "lucide-react";

export function PromptCard({ prompt, onSelect, onFavorite }) {
  return (
    <article
      onClick={() => onSelect(prompt)}
      className="cursor-pointer rounded-3xl border border-line bg-white/80 p-5 shadow-soft transition hover:-translate-y-1 hover:bg-white"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="rounded-full bg-ink px-3 py-1 text-xs font-black text-white">{prompt.model}</span>
          <h3 className="mt-3 text-xl font-black leading-snug">{prompt.title}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(prompt);
          }}
          className="rounded-2xl bg-cream p-3 text-gold"
        >
          <Star size={18} fill={prompt.favorite ? "currentColor" : "none"} />
        </button>
      </div>

      <p className="mt-4 line-clamp-5 rounded-2xl border border-line bg-cream/65 p-4 text-sm leading-7 text-slate-700">
        {prompt.content}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(prompt.tags || []).slice(0, 5).map((tag) => (
          <span key={tag} className="rounded-full bg-[#F1E4D2] px-3 py-1 text-xs font-bold text-[#8A5A2B]">
            #{tag}
          </span>
        ))}
      </div>

      <footer className="mt-4 flex justify-between border-t border-line pt-4 text-xs font-semibold text-muted">
        <span>{prompt.folder}</span>
        <span>v{prompt.version} · 🔥 {prompt.popularity}</span>
      </footer>
    </article>
  );
}
