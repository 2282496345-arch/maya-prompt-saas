import Link from "next/link";
import { BarChart3, Database, Folder, Import, Settings, ShieldCheck, Sparkles, Star } from "lucide-react";

const items = [
  ["工作台", "/dashboard", Database],
  ["收藏", "/dashboard?view=favorites", Star],
  ["热门排行", "/dashboard?view=hot", BarChart3],
  ["批量导入", "/import", Import],
  ["管理后台", "/admin", ShieldCheck],
  ["系统设置", "/settings", Settings]
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 overflow-auto border-r border-line bg-white/70 p-5 backdrop-blur-xl lg:block">
      <Link href="/" className="mb-7 flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink font-black text-white">MP</div>
        <div>
          <div className="font-black">Maya Prompt</div>
          <div className="text-xs text-muted">SaaS Admin</div>
        </div>
      </Link>

      <Link href="/dashboard/new" className="mb-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-bold text-white">
        <Sparkles size={17} /> 新建 Prompt
      </Link>

      <nav className="space-y-1">
        {items.map(([name, href, Icon]) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold text-muted hover:bg-cream hover:text-ink">
            <Icon size={17} /> {name}
          </Link>
        ))}
      </nav>

      <div className="mt-8 rounded-3xl border border-line bg-cream/80 p-4">
        <div className="flex items-center gap-2 font-black"><Folder size={17} />云端能力</div>
        <p className="mt-2 text-sm leading-6 text-muted">
          配置 Supabase 后支持登录、数据库同步、图片存储和多设备访问。
        </p>
      </div>
    </aside>
  );
}
