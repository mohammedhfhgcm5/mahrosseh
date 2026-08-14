import { v2 as cloudinary } from "cloudinary";

function configure() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}

export async function uploadImageBuffer(buffer: Buffer) {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured");
  }

  configure();
  const dataUri = `data:image/jpeg;base64,${buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "fragola",
    resource_type: "image",
  });

  return {
    secure_url: result.secure_url,
    public_id: result.public_id,
  };
}

export { cloudinary };
