// pages/api/generate.js
export default async function handler(req, res) {
  if (req.method!== 'POST') return res.status(405).json({ error: 'Chỉ chấp nhận POST' });

  const { prompt } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: 'Chưa cấu hình GEMINI_API_KEY' });

  const systemPrompt = `Bạn là Agnes, trợ lý AI của Phát Đạt SmartTech. Nhiệm vụ: Viết content Facebook chuẩn 7 Pillar, giọng văn hài hước, gần gũi, chuyên về nhà thông minh. 7 Pillar: 1.Giáo dục 2.Giải trí 3.Truyền cảm hứng 4.Tương tác 5.Quảng bá 6.UGC 7.Hậu trường. Luôn xưng "Agnes", gọi khách là "sếp". Kết bài kêu gọi inbox Phát Đạt SmartTech.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${systemPrompt}\n\nYêu cầu của sếp: ${prompt}` }] }]
      })
    });
    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    const text = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ reply: text });
  } catch (error) {
    return res.status(500).json({ error: 'Lỗi gọi Gemini: ' + error.message });
  }
}
