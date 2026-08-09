'use client';

import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  words: string[];
  typingSpeed?: number;
  erasingSpeed?: number;
  delayBetweenWords?: number;
}

export default function TypingAnimation({
  words,
  typingSpeed = 100,
  erasingSpeed = 50,
  delayBetweenWords = 2000,
}: TypingAnimationProps) {
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentWord = words[currentWordIdx];

    if (isDeleting) {
      // Erasing text
      timer = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
      }, erasingSpeed);
    } else {
      // Typing text
      timer = setTimeout(() => {
        setDisplayedText((prev) => currentWord.slice(0, prev.length + 1));
      }, typingSpeed);
    }

    // Word typed fully, wait before erasing
    if (!isDeleting && displayedText === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), delayBetweenWords);
    }

    // Word erased fully, move to next word
    if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIdx, words, typingSpeed, erasingSpeed, delayBetweenWords]);

  return (
    <span style={{ display: 'inline-block', minHeight: '1.2em' }}>
      {displayedText}
      <span className="typing-cursor"></span>
    </span>
  );
}
