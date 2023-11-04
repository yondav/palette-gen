import React, { useCallback, useRef } from 'react';
import { BsCloudUpload } from 'react-icons/bs';

import { ImagePalette } from '../../contexts';

// Component responsible for handling image uploads and triggering color palette generation.
export default function PhotoUpload() {
  const {
    state: { view },
    actions: { uploadImageFile },
  } = ImagePalette.use();

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles the click event when the user wants to upload an image.
   * Opens the file input dialog if the current view is not 'palette'.
   */
  const handleUpload = useCallback(() => {
    if (view === 'palette') return;

    inputRef.current?.click();
  }, [view]);

  /**
   * Handles the change event when a user selects a file for upload.
   * Initiates the image upload and triggers color palette generation.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event containing the selected file.
   */
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        const file = files[0];
        uploadImageFile(file);
      }
    },
    [uploadImageFile]
  );

  return (
    <section className='photo-upload' onClick={handleUpload}>
      <div className='icon-container'>
        <BsCloudUpload />
        <p>Upload an image to generate a color palette</p>
      </div>
      <input
        ref={inputRef}
        type='file'
        className='hidden'
        id='file'
        name='file'
        onChange={handleFileChange}
      />
    </section>
  );
}
