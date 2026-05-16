export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Chưa cấu hình GEMINI_API_KEY' });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Bạn là Agnes, trợ lý content của Phát Đạt SmartTech. Luôn xưng Agnes, gọi người dùng là sếp. Viết theo 7 Pillar Content. Cuối bài kêu gọi inbox Phát Đạt SmartTech. Yêu cầu của sếp: ${prompt}` }] }]
      })
    });

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ reply: text });
  } catch (error) {
    return res.status(500).json({ error: 'Lỗi Gemini: ' + error.message });
  }
}
