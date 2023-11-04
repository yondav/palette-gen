import { useCallback, useMemo, type ReactNode, type MouseEvent } from 'react';

interface ButtonProps {
  copy: string | ReactNode;
  variant?: 'light' | 'dark';
  squared?: boolean;
  onClick?: () => void;
}

/**
 * A button component that can be customized for different styles and behaviors.
 *
 * @component
 *
 * @param {string | ReactNode} copy - The content to display on the button. It can be a string or a ReactNode.
 * @param {('light' | 'dark')} [variant='light'] - The visual style of the button ('light' or 'dark').
 * @param {boolean} [squared] - If `true`, the button will have squared corners.
 * @param {() => void} [onClick] - A function to execute when the button is clicked.
 */
export default function Button({
  copy,
  variant = 'light',
  squared,
  onClick,
}: ButtonProps) {
  const styles = useMemo(() => {
    const classes = ['palette-feature'];

    if (squared) classes.push('squared');
    if (variant === 'dark') classes.push('dark');

    return classes.join(' ');
  }, [squared, variant]);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (onClick) onClick();
    },
    [onClick]
  );

  return (
    <button className={styles} onClick={handleClick}>
      {copy}
    </button>
  );
}
