"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { isSupabaseReady, supabase } from "@/lib/supabase";
import { ArrowLeft, Lock, Mail } from "lucide-react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn(type) {
    if (!isSupabaseReady) {
      alert("请先在 Vercel 环境变量中配置 Supabase。");
      return;
    }

    const action = type === "signup"
      ? supabase.auth.signUp({ email, password })
      : supabase.auth.signInWithPassword({ email, password });

    const { error } = await action;
    if (error) alert(error.message);
    else {
      alert(type === "signup" ? "注册成功，请查看邮箱确认。" : "登录成功");
      location.href = "/dashboard";
    }
  }

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <div className="w-full max-w-md rounded-[2rem] border border-line bg-white/80 p-8 shadow-soft">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-muted"><ArrowLeft size={16}/>返回首页</Link>
        <h1 className="text-3xl font-black">登录 / 注册</h1>
        <p className="mt-2 text-sm leading-7 text-muted">
          配置 Supabase 后启用账号系统和云端同步。当前状态：{isSupabaseReady ? "已配置" : "未配置"}
        </p>

        <label className="mt-6 block">
          <span className="mb-2 flex items-center gap-2 text-sm font-black"><Mail size={16}/>邮箱</span>
          <input className="w-full rounded-2xl border border-line px-4 py-3" value={email} onChange={e => setEmail(e.target.value)} />
        </label>

        <label className="mt-4 block">
          <span className="mb-2 flex items-center gap-2 text-sm font-black"><Lock size={16}/>密码</span>
          <input type="password" className="w-full rounded-2xl border border-line px-4 py-3" value={password} onChange={e => setPassword(e.target.value)} />
        </label>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button onClick={() => signIn("signin")}>登录</Button>
          <Button variant="soft" onClick={() => signIn("signup")}>注册</Button>
        </div>
      </div>
    </main>
  );
}
