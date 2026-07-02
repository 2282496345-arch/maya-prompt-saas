"use client";

import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/Button";
import { PromptCard } from "@/components/PromptCard";
import { PromptDetail } from "@/components/PromptDetail";
import { seedPrompts } from "@/lib/seed";
import { isSupabaseReady, supabase } from "@/lib/supabase";
import { BarChart3, Cloud, Database, Folder, Plus, Search, Star } from "lucide-react";

const STORAGE_KEY = "maya_prompt_saas_local";

export default function DashboardPage() {
  const [prompts, setPrompts] = useState([]);
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState("");
  const [folder, setFolder] = useState("全部");
  const [model, setModel] = useState("全部");
  const [tag, setTag] = useState("全部");
  const [sort, setSort] = useState("newest");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    loadPrompts();
  }, []);

  async function loadPrompts() {
    if (isSupabaseReady) {
      const { data, error } = await supabase.from("prompts").select("*").order("updated_at", { ascending: false });
      if (!error && data?.length) {
        setPrompts(data);
        setActive(data[0]);
        return;
      }
    }
    const saved = localStorage.getItem(STORAGE_KEY);
    const local = saved ? JSON.parse(saved) : seedPrompts;
    setPrompts(local);
    setActive(local[0]);
  }

  function persist(next) {
    setPrompts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  async function savePrompt(form) {
    const item = {
      id: editing?.id || crypto.randomUUID(),
      title: form.title,
      model: form.model,
      folder: form.folder,
      category: form.category,
      tags: form.tags.split(/[,，#\n]/).map(x => x.trim()).filter(Boolean),
      content: form.content,
      note: form.note,
      image_url: form.image_url,
      favorite: editing?.favorite || false,
      popularity: editing?.popularity || Math.floor(Math.random() * 50) + 50,
      version: editing?.version ? editing.version + 1 : 1,
      history: [...(editing?.history || []), editing?.id ? "手动更新" : "新建 Prompt"],
      created_at: editing?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (isSupabaseReady) {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData?.user?.id;
      if (userId) {
        await supabase.from("prompts").upsert({ ...item, user_id: userId });
      }
    }

    const next = editing?.id ? prompts.map(p => p.id === editing.id ? item : p) : [item, ...prompts];
    persist(next);
    setActive(item);
    setEditing(false);
  }

  async function toggleFavorite(prompt) {
    const nextPrompt = { ...prompt, favorite: !prompt.favorite };
    const next = prompts.map(p => p.id === prompt.id ? nextPrompt : p);
    persist(next);
    setActive(nextPrompt);
    if (isSupabaseReady && !String(prompt.id).startsWith("demo")) {
      await supabase.from("prompts").update({ favorite: nextPrompt.favorite }).eq("id", prompt.id);
    }
  }

  async function deletePrompt(prompt) {
    if (!confirm("确定删除这条 Prompt 吗？")) return;
    const next = prompts.filter(p => p.id !== prompt.id);
    persist(next);
    setActive(next[0] || null);
    if (isSupabaseReady && !String(prompt.id).startsWith("demo")) {
      await supabase.from("prompts").delete().eq("id", prompt.id);
    }
  }

  const folders = useMemo(() => ["全部", ...new Set(prompts.map(p => p.folder))], [prompts]);
  const models = useMemo(() => ["全部", ...new Set(prompts.map(p => p.model))], [prompts]);
  const tags = useMemo(() => ["全部", ...new Set(prompts.flatMap(p => p.tags || []))], [prompts]);

  const filtered = useMemo(() => {
    let list = [...prompts];
    const q = query.trim().toLowerCase();
    if (q) list = list.filter(p => [p.title, p.model, p.folder, p.category, p.content, p.note, ...(p.tags || [])].join(" ").toLowerCase().includes(q));
    if (folder !== "全部") list = list.filter(p => p.folder === folder);
    if (model !== "全部") list = list.filter(p => p.model === model);
    if (tag !== "全部") list = list.filter(p => (p.tags || []).includes(tag));
    if (sort === "popular") list.sort((a, b) => b.popularity - a.popularity);
    else list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    return list;
  }, [prompts, query, folder, model, tag, sort]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="min-w-0 flex-1 p-5 lg:p-8">
        <section className="rounded-[2rem] border border-line bg-white/70 p-6 shadow-soft">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div>
              <span className="rounded-full bg-[#F1E4D2] px-3 py-1 text-xs font-black text-[#8A5A2B]">
                {isSupabaseReady ? "Supabase 云端版" : "本地演示版"}
              </span>
              <h1 className="mt-3 text-4xl font-black tracking-tight">Prompt 工作台</h1>
              <p className="mt-2 text-muted">搜索、收藏、管理和复用你的 AI Prompt 资产。</p>
            </div>
            <Button onClick={() => setEditing({})}><Plus size={17}/>新建 Prompt</Button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <Stat icon={<Database/>} label="Prompt" value={prompts.length}/>
            <Stat icon={<Star/>} label="收藏" value={prompts.filter(p => p.favorite).length}/>
            <Stat icon={<Folder/>} label="文件夹" value={folders.length - 1}/>
            <Stat icon={<BarChart3/>} label="平均热度" value={prompts.length ? Math.round(prompts.reduce((a,p)=>a+p.popularity,0)/prompts.length) : 0}/>
          </div>
        </section>

        <section className="mt-5 rounded-3xl border border-line bg-white/70 p-4 shadow-soft">
          <div className="flex flex-col gap-3 xl:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4 py-3">
              <Search size={19}/>
              <input className="w-full bg-transparent outline-none" value={query} onChange={e => setQuery(e.target.value)} placeholder="搜索标题、标签、内容、模型、场景..." />
            </div>
            <Select value={folder} onChange={setFolder} options={folders}/>
            <Select value={model} onChange={setModel} options={models}/>
            <Select value={tag} onChange={setTag} options={tags}/>
            <Select value={sort} onChange={setSort} options={["newest", "popular"]}/>
          </div>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="grid content-start gap-4 md:grid-cols-2">
            {filtered.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} onSelect={setActive} onFavorite={toggleFavorite}/>
            ))}
            {!filtered.length && <div className="col-span-full rounded-3xl border border-line bg-white/70 p-12 text-center text-muted">没有找到匹配结果。</div>}
          </div>

          <div className="sticky top-6 h-fit">
            <PromptDetail prompt={active} onDelete={deletePrompt}/>
          </div>
        </section>
      </main>

      {editing !== false && <PromptEditor prompt={editing} onClose={() => setEditing(false)} onSave={savePrompt}/>}
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select className="rounded-2xl border border-line bg-white px-4 py-3 text-sm font-bold" value={value} onChange={e => onChange(e.target.value)}>
      {options.map(x => <option key={x} value={x}>{x}</option>)}
    </select>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-5">
      <div className="text-gold">{icon}</div>
      <p className="mt-3 text-sm text-muted">{label}</p>
      <strong className="text-3xl font-black">{value}</strong>
    </div>
  );
}

function PromptEditor({ prompt, onClose, onSave }) {
  const [form, setForm] = useState({
    title: prompt.title || "",
    model: prompt.model || "ChatGPT",
    folder: prompt.folder || "家居产品",
    category: prompt.category || "产品摄影",
    tags: (prompt.tags || []).join(", "),
    content: prompt.content || "",
    note: prompt.note || "",
    image_url: prompt.image_url || ""
  });

  function update(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-5">
      <form onSubmit={e => { e.preventDefault(); onSave(form); }} className="max-h-[92vh] w-full max-w-3xl overflow-auto rounded-[2rem] bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black">{prompt.id ? "编辑 Prompt" : "新建 Prompt"}</h2>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-2xl bg-cream text-xl">×</button>
        </div>

        <Field label="标题"><input required value={form.title} onChange={e => update("title", e.target.value)} /></Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="模型"><select value={form.model} onChange={e => update("model", e.target.value)}>{["ChatGPT","Claude","Gemini","Midjourney","Flux","Stable Diffusion","ComfyUI","可灵","即梦AI"].map(x => <option key={x}>{x}</option>)}</select></Field>
          <Field label="文件夹"><input value={form.folder} onChange={e => update("folder", e.target.value)} /></Field>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="分类"><input value={form.category} onChange={e => update("category", e.target.value)} /></Field>
          <Field label="标签"><input value={form.tags} onChange={e => update("tags", e.target.value)} /></Field>
        </div>
        <Field label="Prompt 内容"><textarea required className="min-h-48" value={form.content} onChange={e => update("content", e.target.value)} /></Field>
        <Field label="备注"><textarea className="min-h-24" value={form.note} onChange={e => update("note", e.target.value)} /></Field>
        <Field label="图片链接"><input value={form.image_url} onChange={e => update("image_url", e.target.value)} placeholder="https://..." /></Field>

        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="soft" onClick={onClose}>取消</Button>
          <Button type="submit">保存</Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="mt-4 block">
      <span className="mb-2 block text-sm font-black">{label}</span>
      <div className="[&_input]:w-full [&_input]:rounded-2xl [&_input]:border [&_input]:border-line [&_input]:px-4 [&_input]:py-3 [&_select]:w-full [&_select]:rounded-2xl [&_select]:border [&_select]:border-line [&_select]:px-4 [&_select]:py-3 [&_textarea]:w-full [&_textarea]:rounded-2xl [&_textarea]:border [&_textarea]:border-line [&_textarea]:px-4 [&_textarea]:py-3">
        {children}
      </div>
    </label>
  );
}
