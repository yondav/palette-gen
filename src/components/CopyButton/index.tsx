import { useCallback, useState } from 'react';
import { BiCopyAlt } from 'react-icons/bi';

import { useCopyToClipboard } from '../../hooks';

interface CopyButtonProps {
  content: string;
}

/**
 * Component for copying text to the clipboard.
 *
 * @param {string} content - The text content to be copied.
 */
export default function CopyButton({ content }: CopyButtonProps) {
  const [, setCopiedText] = useCopyToClipboard();

  const [copied, setCopied] = useState<boolean | 'blank'>('blank');

  // Handle the copy action when the button is clicked.
  const handleCopy = useCallback(async () => {
    const isCopied = await setCopiedText(content);

    setCopied(isCopied);

    setTimeout(() => setCopied('blank'), 4000);
  }, [content, setCopiedText]);

  return (
    <>
      <button
        className='palette-feature dark squared absolute top-1 right-1'
        onClick={handleCopy}
      >
        <BiCopyAlt
          className={
            typeof copied === 'string' ? '' : copied ? 'text-green-400' : 'text-red-400'
          }
        />
      </button>
      {typeof copied !== 'string' && (
        <div className='absolute top-10 right-0 bg-stone-200 shadow-lg transition-all'>
          {copied ? (
            <p className='text-green-700 border border-green-700 rounded-md p-1 text-xs'>
              Copied!
            </p>
          ) : (
            <p className='text-red-700 border border-red-700 rounded-md p-1 text-xs'>
              Clipboard unsupported!
            </p>
          )}
        </div>
      )}
    </>
  );
}
