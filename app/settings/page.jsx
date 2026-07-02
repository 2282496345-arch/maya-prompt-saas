import { Sidebar } from "@/components/Sidebar";
import { isSupabaseReady } from "@/lib/supabase";
import { CheckCircle2, Cloud, Key, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <section className="rounded-[2rem] border border-line bg-white/75 p-8 shadow-soft">
          <h1 className="text-4xl font-black">系统设置</h1>
          <p className="mt-3 text-muted">配置云端数据库、品牌信息、AI 接口和团队权限。</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Setting icon={<Cloud/>} title="Supabase 状态" value={isSupabaseReady ? "已配置" : "未配置"} />
            <Setting icon={<Key/>} title="AI API" value="已预留 OPENAI_API_KEY" />
            <Setting icon={<Palette/>} title="品牌主题" value="Maya Prompt SaaS" />
            <Setting icon={<CheckCircle2/>} title="部署平台" value="Vercel Ready" />
          </div>

          <div className="mt-8 rounded-3xl border border-line bg-cream p-6">
            <h2 className="text-2xl font-black">下一步开发建议</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted">
              <li>在 Supabase 中执行 schema.sql。</li>
              <li>在 Vercel 添加环境变量。</li>
              <li>启用登录系统。</li>
              <li>把本地演示数据完全切换到 Supabase。</li>
              <li>增加图片上传 Storage 和 AI 优化 API。</li>
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
}

function Setting({ icon, title, value }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6">
      <div className="mb-4 text-gold">{icon}</div>
      <h3 className="font-black">{title}</h3>
      <p className="mt-2 text-muted">{value}</p>
    </div>
  );
}
