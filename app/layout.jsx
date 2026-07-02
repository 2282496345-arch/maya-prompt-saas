import "./globals.css";

export const metadata = {
  title: "Maya Prompt SaaS",
  description: "专业 AI Prompt 管理平台"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
