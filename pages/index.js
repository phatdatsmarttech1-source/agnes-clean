import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    return res.status(200).json({ reply: text });  // ĐÚNG
    setLoading(false);
  }

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Agnes - Trợ lý Phát Đạt SmartTech</h1>
      <form onSubmit={handleSubmit}>
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="Agnes, viết bài hôm nay"
          style={{ width: 300, padding: 8 }}
        />
        <button type="submit" disabled={loading} style={{ marginLeft: 8, padding: 8 }}>
          {loading? 'Đang viết...' : 'Gửi'}
        </button>
      </form>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{result}</pre>
    </div>
  );
}
