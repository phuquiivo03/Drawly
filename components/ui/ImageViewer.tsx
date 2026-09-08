"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageViewerProps {
  src: string;
  alt?: string;
}

export default function ImageViewer({ src, alt = "Image" }: ImageViewerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="cursor-pointer"
      >
        <Image
          src={src}
          alt={alt}
          width={300}
          height={300}
          className="rounded-lg object-cover"
        />
      </button>

      {/* Preview */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 text-3xl text-white"
            aria-label="Close"
          >
            ×
          </button>

          {/* Prevent clicking image from closing */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
