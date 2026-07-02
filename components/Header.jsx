import Link from "next/link";
import { Button } from "./Button";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Link href="/" className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-lg font-black text-white">
          MP
        </div>
        <div>
          <div className="text-lg font-black tracking-tight">Maya Prompt SaaS</div>
          <div className="text-xs text-muted">AI Prompt Operating System</div>
        </div>
      </Link>

      <nav className="hidden items-center gap-2 md:flex">
        <Link href="/dashboard" className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-white/60">工作台</Link>
        <Link href="/import" className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-white/60">导入</Link>
        <Link href="/admin" className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-white/60">后台</Link>
        <Link href="/settings" className="rounded-xl px-3 py-2 text-sm font-semibold hover:bg-white/60">设置</Link>
      </nav>

      <Link href="/dashboard">
        <Button><Sparkles size={17} />进入系统</Button>
      </Link>
    </header>
  );
}
