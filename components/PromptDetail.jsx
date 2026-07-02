import { Copy, ExternalLink, History, ImageIcon, Languages, Trash2, Wand2 } from "lucide-react";
import { Button } from "./Button";
import { modelLinks, optimizePrompt, translatePrompt } from "@/lib/seed";

export function PromptDetail({ prompt, onDelete }) {
  if (!prompt) {
    return (
      <div className="grid min-h-[520px] place-items-center rounded-3xl border border-line bg-white/75 p-8 text-center shadow-soft">
        <div>
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-cream text-gold">
            <ImageIcon size={32} />
          </div>
          <h3 className="text-xl font-black">选择一条 Prompt</h3>
          <p className="mt-2 text-sm leading-7 text-muted">查看内容、复制、优化、翻译、调用模型。</p>
        </div>
      </div>
    );
  }

  async function copy(text) {
    await navigator.clipboard.writeText(text);
    alert("已复制");
  }

  function openModel() {
    navigator.clipboard.writeText(prompt.content);
    window.open(modelLinks[prompt.model] || "https://chatgpt.com", "_blank");
  }

  return (
    <div className="rounded-3xl border border-line bg-white/85 p-6 shadow-soft">
      <span className="rounded-full bg-ink px-3 py-1 text-xs font-black text-white">{prompt.model}</span>
      <h2 className="mt-4 text-3xl font-black tracking-tight">{prompt.title}</h2>
      <p className="mt-2 text-sm text-muted">{prompt.folder} / {prompt.category}</p>

      {prompt.image_url ? (
        <img src={prompt.image_url} alt="" className="mt-5 max-h-72 w-full rounded-3xl object-cover" />
      ) : (
        <div className="mt-5 grid h-44 place-items-center rounded-3xl border border-dashed border-line bg-cream text-gold">
          <div className="text-center">
            <ImageIcon className="mx-auto mb-2" />
            图片 + Prompt 关联区域
          </div>
        </div>
      )}

      <pre className="prose-prompt mt-5 max-h-80 overflow-auto rounded-3xl bg-ink p-5 text-sm text-white">
        {prompt.content}
      </pre>

      <div className="mt-4 flex flex-wrap gap-2">
        {(prompt.tags || []).map((tag) => (
          <span key={tag} className="rounded-full bg-[#F1E4D2] px-3 py-1 text-xs font-bold text-[#8A5A2B]">#{tag}</span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="soft" onClick={() => copy(prompt.content)}><Copy size={16}/>复制</Button>
        <Button variant="soft" onClick={openModel}><ExternalLink size={16}/>调用模型</Button>
        <Button variant="soft" onClick={() => copy(optimizePrompt(prompt.content))}><Wand2 size={16}/>AI优化</Button>
        <Button variant="soft" onClick={() => copy(translatePrompt(prompt.content))}><Languages size={16}/>英文翻译</Button>
        <Button variant="danger" onClick={() => onDelete(prompt)} className="col-span-2"><Trash2 size={16}/>删除</Button>
      </div>

      <section className="mt-6 border-t border-line pt-5">
        <h3 className="flex items-center gap-2 font-black"><History size={17}/>版本历史</h3>
        <div className="mt-3 space-y-2">
          {(prompt.history || []).map((h, i) => (
            <p key={i} className="text-sm text-muted">v{i + 1} · {h}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
