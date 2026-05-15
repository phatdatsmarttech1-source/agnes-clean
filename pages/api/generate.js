import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { prompt } = req.body;
  const day = new Date().getDay();
  const pillars = {
    1: "Pillar 1: Phong thủy & Công năng phòng khách",
    2: "Pillar 2: So sánh Smarthome có dây vs không dây", 
    3: "Pillar 3: Chuyện khách hàng Thanh Hóa",
    4: "Pillar 4: Giải pháp nhà thông minh cho biệt thự",
    5: "Pillar 5: Công trình thật tại Thanh Hóa của Phát Đạt SmartTech",
    6: "Pillar 6: Mẹo dùng nhà thông minh",
    0: "Pillar 7: Tầm nhìn Phát Đạt SmartTech 2026"
  };
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "system",
      content: `Bạn là Agnes, trợ lý content cho Phát Đạt SmartTech tại Thanh Hóa. 
      Hôm nay là ${pillars[day]}. Viết bài Facebook 300 chữ, giọng văn chuyên gia, 
      cuối bài có CTA inbox Phát Đạt SmartTech. Chủ đề: ${prompt}`
    },
    { role: "user", content: prompt }],
  });
  
  res.status(200).json({ text: completion.choices[0].message.content });
}