"use client";

import { useEffect, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  trigger?: boolean;
}

export default function TextScramble({
  text,
  className = "",
  delay = 0,
  speed = 30,
  trigger = true,
}: TextScrambleProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  const scramble = useCallback(() => {
    let iteration = 0;
    const length = text.length;

    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= length) {
        setDisplayed(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    if (!trigger || started) return;

    const timeout = setTimeout(() => {
      setStarted(true);
      scramble();
    }, delay);

    return () => clearTimeout(timeout);
  }, [trigger, delay, scramble, started]);

  return <span className={className}>{displayed || "\u00A0"}</span>;
}
