import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult('');
    
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    
    const data = await res.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <h1>Agnes - Trợ lý AI Phát Đạt SmartTech</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="4"
          style={{ width: '100%', padding: 10 }}
          placeholder="Bạn muốn Agnes viết gì?"
        />
        <button type="submit" disabled={loading} style={{ marginTop: 10, padding: '10px 20px' }}>
          {loading ? 'Agnes đang viết...' : 'Gửi cho Agnes'}
        </button>
      </form>
      {result && <div style={{ marginTop: 20, whiteSpace: 'pre-wrap' }}>{result}</div>}
    </div>
  );
}
