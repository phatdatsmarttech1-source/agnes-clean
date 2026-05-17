import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Chỉ chấp nhận POST' });
  }

  const { prompt } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Chưa cấu hình GEMINI_API_KEY trên Vercel' });
  }

  if (!prompt) {
    return res.status(400).json({ error: 'Thiếu prompt' });
  }

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    
    const result = await model.generateContent(
      `Bạn là Agnes, trợ lý content của Phát Đạt SmartTech. Luôn xưng Agnes, gọi người dùng là sếp. Viết theo 7 Pillar. Yêu cầu: ${prompt}`
    );
    
    const text = result.response.text();
    return res.status(200).json({ reply: text });
    
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: 'Lỗi gọi Gemini: ' + error.message });
  }
}
