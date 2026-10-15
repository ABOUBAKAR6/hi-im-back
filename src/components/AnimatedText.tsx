import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 select-text">
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalCharacters = text.length;

  let runningCharIndex = 0;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const startIndex = runningCharIndex;
        runningCharIndex += word.length + 1; // +1 for space

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.28em]">
            {wordChars.map((c, i) => {
              const charIdx = startIndex + i;
              const start = Math.max(0, charIdx / totalCharacters);
              const end = Math.min(1, (charIdx + 1) / totalCharacters);

              return (
                <Char
                  key={i}
                  char={c}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
