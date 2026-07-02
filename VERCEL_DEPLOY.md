# Vercel 部署指南

## 1. 上传 GitHub

解压 `maya-prompt-saas.zip` 后，进入解压后的文件夹。

确认根目录直接能看到：

```text
package.json
app
components
lib
supabase
README.md
```

上传 GitHub 时，必须上传这些文件本身，不能再套一层文件夹。

正确结构：

```text
你的仓库
├─ package.json
├─ app
├─ components
├─ lib
├─ supabase
└─ README.md
```

错误结构：

```text
你的仓库
└─ maya-prompt-saas
   ├─ package.json
   └─ app
```

## 2. 创建 Supabase

1. 打开 Supabase
2. New Project
3. SQL Editor
4. 粘贴并执行 `supabase/schema.sql`
5. Project Settings > API
6. 复制：
   - Project URL
   - anon public key

## 3. 导入 Vercel

1. 打开 Vercel
2. Add New Project
3. Import GitHub 仓库
4. Framework 会自动识别为 Next.js
5. 添加环境变量：

```bash
NEXT_PUBLIC_SUPABASE_URL=你的 Supabase Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 Supabase anon public key
```

6. 点击 Deploy

## 4. 得到独立网站

部署完成后，Vercel 会给你：

```text
https://你的项目名.vercel.app
```

## 5. 后续更新

修改 GitHub 代码后，Vercel 会自动重新部署，网址不变。
