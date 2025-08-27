
"use client";

import { useEffect, useState } from 'react';

export default function AuthBackground() {
  const [spans, setSpans] = useState<number[]>([]);

  useEffect(() => {
    // 16 columns * 16 rows = 256
    const numSpans = 16 * 16; 
    setSpans(Array.from({ length: numSpans }, (_, i) => i));
  }, []);

  return (
    <section>
      {spans.map(i => <span key={i} />)}
    </section>
  );
}
