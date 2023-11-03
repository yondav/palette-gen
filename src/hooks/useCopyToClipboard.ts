import { useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

/**
 * Custom hook for copying text to the clipboard and tracking the copied value.
 * @returns {Array} An array containing the copied text and a function to copy new text.
 */
function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  /**
   * Copy the provided text to the clipboard and update the copied value.
   * @param {string} text - The text to be copied to the clipboard.
   * @returns {Promise<boolean>} A promise that resolves to true if the copy was successful, or false if it failed.
   */
  const copy: CopyFn = async text => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to the clipboard and update the state if it worked.
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}

export default useCopyToClipboard;
