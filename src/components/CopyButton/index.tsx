import { useCallback, useState } from 'react';
import { BiCopyAlt } from 'react-icons/bi';

import { useCopyToClipboard } from '../../hooks';
import Button from '../Button';

interface CopyButtonProps {
  content: string;
  hidden?: boolean;
}

/**
 * A component for copying text to the clipboard.
 *
 * @component
 * @param {string} content - The text content to be copied.
 * @param {boolean} [hidden] - Indicates whether the copy button is hidden, useful for copying text programmatically.
 */
export default function CopyButton({ content, hidden }: CopyButtonProps) {
  const [, setCopiedText] = useCopyToClipboard();

  const [copied, setCopied] = useState<boolean | 'blank'>('blank');

  // Handle the copy action when the button is clicked.
  const handleCopy = useCallback(async () => {
    const isCopied = await setCopiedText(content);

    setCopied(isCopied);

    setTimeout(() => setCopied('blank'), 4000);
  }, [content, setCopiedText]);

  return (
    <div
      className={`absolute ${
        hidden ? 'top-0 left-0 w-full h-full cursor-pointer' : 'top-1 right-1'
      }`}
      onClick={hidden ? handleCopy : undefined}
    >
      <div className={hidden ? 'hidden' : ''}>
        <Button
          variant='dark'
          squared
          copy={
            <BiCopyAlt
              className={
                typeof copied === 'string'
                  ? ''
                  : copied
                  ? 'text-green-400'
                  : 'text-red-400'
              }
            />
          }
          onClick={handleCopy}
        />
      </div>
      {typeof copied !== 'string' && (
        <div className={`toast-container ${copied ? 'success' : 'fail'}`}>
          <p>{copied ? 'Copied!' : 'Clipboard unsupported!'}</p>
        </div>
      )}
    </div>
  );
}
