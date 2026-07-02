import Link from "next/link";
import { Header } from "@/components/Header";
import { Button } from "@/components/Button";
import { ArrowRight, Cloud, Database, ImageIcon, Search, ShieldCheck, Sparkles, Upload } from "lucide-react";

const features = [
  ["全文搜索", "标题、标签、内容、文件夹、模型统一检索。", Search],
  ["云端同步", "接入 Supabase 后，电脑和手机数据同步。", Cloud],
  ["图片管理", "每条 Prompt 可关联产品图、场景图和灵感图。", ImageIcon],
  ["批量导入", "支持 CSV / JSON，适合快速建立 Prompt 资产库。", Upload],
  ["后台管理", "管理 Prompt、分类、标签、收藏和热门内容。", ShieldCheck],
  ["AI 优化", "内置优化、翻译、改写入口，后续可接 API。", Sparkles]
];

export default function HomePage() {
  return (
    <div>
      <Header />

      <main className="mx-auto max-w-7xl px-6 pb-20">
        <section className="grid gap-8 rounded-[2rem] border border-line bg-white/65 p-8 shadow-soft backdrop-blur-xl lg:grid-cols-[1.1fr_.9fr] lg:p-12">
          <div>
            <span className="rounded-full bg-[#F1E4D2] px-4 py-2 text-xs font-black text-[#8A5A2B]">
              PromptHero + FlowGPT + Notion 风格
            </span>
            <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-[-0.05em] md:text-7xl">
              专业级 AI Prompt 管理 SaaS
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-muted">
              为家居产品、AI 场景图、电商广告和品牌摄影而设计。集中收集 Prompt，支持搜索、分类、图片关联、收藏、版本历史、批量导入和云端同步。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard"><Button>进入工作台 <ArrowRight size={17}/></Button></Link>
              <Link href="/auth"><Button variant="soft">登录 / 注册</Button></Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-line bg-cream p-5">
            <div className="rounded-3xl bg-ink p-5 text-white">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">Live Dashboard</span>
                <Database size={18}/>
              </div>
              <div className="space-y-3">
                {["浅色厨房产品摄影", "高端卫浴品牌广告", "Flux 白底电商主图", "毛巾挂杆场景图"].map((x, i) => (
                  <div key={x} className="rounded-2xl bg-white/10 p-4">
                    <div className="font-bold">{x}</div>
                    <div className="mt-2 h-2 w-full rounded-full bg-white/15">
                      <div className="h-2 rounded-full bg-white" style={{ width: `${90 - i * 15}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, desc, Icon]) => (
            <div key={title} className="rounded-3xl border border-line bg-white/75 p-6 shadow-soft">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cream text-gold">
                <Icon size={22}/>
              </div>
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-muted">{desc}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
