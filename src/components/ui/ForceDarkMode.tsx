'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

export function ForceDarkMode() {
  const { setTheme, resolvedTheme } = useTheme();
  const savedTheme = useRef<string | undefined>(undefined);

  useEffect(() => {
    savedTheme.current = resolvedTheme;
    setTheme('dark');
    return () => {
      if (savedTheme.current && savedTheme.current !== 'dark') {
        setTheme(savedTheme.current);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
