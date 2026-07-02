"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/Button";
import { Upload } from "lucide-react";

export default function ImportPage() {
  const [rows, setRows] = useState([]);

  function importFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      if (file.name.endsWith(".csv")) {
        const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
        setRows(parsed.data);
      } else if (file.name.endsWith(".json")) {
        setRows(JSON.parse(text));
      } else {
        const items = String(text).split(/\n#{1,3}\s+/).filter(Boolean).map((content, index) => ({
          title: content.split("\n")[0] || `Markdown Prompt ${index + 1}`,
          content
        }));
        setRows(items);
      }
    };
    reader.readAsText(file, "utf-8");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <section className="rounded-[2rem] border border-line bg-white/75 p-8 shadow-soft">
          <h1 className="text-4xl font-black">批量导入 Prompt</h1>
          <p className="mt-3 text-muted">支持 CSV / JSON / Markdown。CSV 推荐字段：title, model, folder, category, tags, content, note, image_url。</p>

          <label className="mt-8 grid cursor-pointer place-items-center rounded-[2rem] border-2 border-dashed border-line bg-cream p-16 text-center">
            <Upload size={48} className="mb-4 text-gold"/>
            <div className="text-xl font-black">点击选择文件</div>
            <p className="mt-2 text-sm text-muted">CSV / JSON / MD / TXT</p>
            <input type="file" accept=".csv,.json,.md,.txt" className="hidden" onChange={e => e.target.files?.[0] && importFile(e.target.files[0])}/>
          </label>

          {rows.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-2xl font-black">预览 {rows.length} 条</h2>
                <Button onClick={() => alert("正式导入到数据库功能已预留，可在下一版接入 Supabase 批量 insert。")}>确认导入</Button>
              </div>
              <div className="overflow-auto rounded-3xl border border-line">
                <table className="w-full min-w-[800px] bg-white text-sm">
                  <thead className="bg-cream text-left">
                    <tr>{Object.keys(rows[0] || {}).map(k => <th key={k} className="p-3">{k}</th>)}</tr>
                  </thead>
                  <tbody>
                    {rows.slice(0, 20).map((row, i) => (
                      <tr key={i} className="border-t border-line">
                        {Object.keys(rows[0] || {}).map(k => <td key={k} className="max-w-xs truncate p-3">{String(row[k] || "")}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
