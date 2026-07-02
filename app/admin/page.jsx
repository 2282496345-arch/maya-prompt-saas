import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/Button";
import { BarChart3, Database, ShieldCheck, Users } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <section className="rounded-[2rem] border border-line bg-white/75 p-8 shadow-soft">
          <span className="rounded-full bg-[#F1E4D2] px-3 py-1 text-xs font-black text-[#8A5A2B]">Admin Console</span>
          <h1 className="mt-4 text-4xl font-black">管理后台</h1>
          <p className="mt-3 text-muted">用于管理用户、Prompt、分类、标签、热门推荐和导入任务。</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card icon={<Database/>} title="Prompt 管理" desc="审核、编辑、删除、置顶 Prompt。"/>
            <Card icon={<Users/>} title="用户管理" desc="查看用户、角色和使用量。"/>
            <Card icon={<BarChart3/>} title="数据分析" desc="热门 Prompt、模型使用量、搜索关键词。"/>
          </div>

          <div className="mt-8 rounded-3xl border border-line bg-cream p-6">
            <div className="flex items-center gap-2 text-xl font-black"><ShieldCheck/>正式版说明</div>
            <p className="mt-3 leading-8 text-muted">
              当前后台已经完成页面和架构预留。接入 Supabase 后，可进一步增加管理员角色、公开/私有 Prompt、团队空间、审核流和数据统计。
            </p>
            <Button className="mt-5">下一步：连接 Supabase 权限</Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function Card({ icon, title, desc }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6">
      <div className="mb-4 text-gold">{icon}</div>
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-3 leading-7 text-muted">{desc}</p>
    </div>
  );
}
