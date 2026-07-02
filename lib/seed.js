export const modelLinks = {
  ChatGPT: "https://chatgpt.com",
  Claude: "https://claude.ai",
  Gemini: "https://gemini.google.com",
  Midjourney: "https://www.midjourney.com",
  Flux: "https://fal.ai/models/fal-ai/flux-pro",
  "Stable Diffusion": "https://stablediffusionweb.com",
  ComfyUI: "https://www.comfy.org",
  可灵: "https://klingai.kuaishou.com",
  即梦AI: "https://jimeng.jianying.com"
};

export const seedPrompts = [
  {
    id: "demo-1",
    title: "浅色厨房茶巾产品场景图",
    model: "ChatGPT",
    folder: "家居产品",
    category: "产品摄影",
    tags: ["茶巾", "厨房", "浅色环境", "产品居中"],
    content: "保持产品不变，生成浅色厨房场景图。茶巾放置在洗碗池旁边，产品尺寸和花纹不变，四周留白 10%，柔和自然光，真实商业静物摄影，高级家居广告风，3:4。",
    note: "适合茶巾、毛巾、厨房用品。",
    image_url: "",
    favorite: true,
    popularity: 98,
    version: 3,
    history: ["初始版", "加入保持产品不变", "加入 3:4 和留白"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "demo-2",
    title: "高端卫浴品牌广告摄影",
    model: "Midjourney",
    folder: "卫浴灵感",
    category: "AI 场景图",
    tags: ["卫浴", "高级感", "酒店风", "品牌广告"],
    content: "Ultra realistic premium bathroom product photography, warm beige stone wall, soft diffused daylight, luxury hotel spa atmosphere, elegant composition, clean countertop, subtle shadows, realistic materials, editorial home catalog, no people, no text, no watermark --ar 3:4 --style raw",
    note: "适合卫浴、毛巾、收纳产品。",
    image_url: "",
    favorite: false,
    popularity: 91,
    version: 2,
    history: ["英文商业摄影版", "增加 no text/no watermark"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "demo-3",
    title: "Flux 电商产品图精修",
    model: "Flux",
    folder: "电商主图",
    category: "产品摄影",
    tags: ["电商", "白底", "精修", "真实材质"],
    content: "Create a premium e-commerce product image. Keep the product shape, pattern, color, texture and size unchanged. Warm white background, soft natural shadow, sharp realistic details, clean catalog composition, high-end minimalist home brand style.",
    note: "适合白底图和电商详情页。",
    image_url: "",
    favorite: false,
    popularity: 76,
    version: 1,
    history: ["初始导入"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function optimizePrompt(content) {
  return `${content}

专业优化版：
- 保持主体产品造型、颜色、纹理、图案、尺寸比例不变
- 使用真实商业摄影质感，柔和自然光，高级浅色环境
- 产品居中，构图平衡，四周留白 10%
- 背景干净，无杂物、无人物、无文字、无水印
- 适合家居品牌广告、电商详情页、社交媒体展示`;
}

export function translatePrompt(content) {
  return `English optimized prompt:

${content}

Keep the product unchanged, preserve original shape, color, pattern, texture and proportions. Create a realistic premium commercial lifestyle scene with soft natural lighting, clean composition, high-end home catalog aesthetic, no text, no watermark, no distortion.`;
}
