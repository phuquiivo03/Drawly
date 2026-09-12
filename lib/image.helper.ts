export async function compressImage(file: File, maxSizeKB = 30): Promise<File> {
  const maxSize = maxSizeKB * 1024;

  const image = new Image();
  image.src = URL.createObjectURL(file);

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas is not supported");
  }

  // Limit image dimensions
  let width = image.width;
  let height = image.height;

  const maxDimension = 1000;

  if (width > maxDimension || height > maxDimension) {
    const ratio = Math.min(maxDimension / width, maxDimension / height);

    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(image, 0, 0, width, height);

  URL.revokeObjectURL(image.src);

  // Try different JPEG qualities
  let quality = 0.9;
  let blob: Blob | null = null;

  while (quality >= 0.1) {
    blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", quality),
    );

    if (blob && blob.size <= maxSize) {
      break;
    }

    quality -= 0.1;
  }

  if (!blob) {
    throw new Error("Failed to compress image");
  }

  // If still > 30KB, reduce dimensions
  if (blob.size > maxSize) {
    return compressImage(
      new File([blob], file.name, { type: "image/jpeg" }),
      maxSizeKB,
    );
  }

  return new File([blob], `${file.name.split(".")[0]}.jpg`, {
    type: "image/jpeg",
  });
}


