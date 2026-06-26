import fs from "fs";
import path from "path";

const deleteFile = (filePath) => {
  if (!filePath) return;

  // remove leading slash
  const cleanPath = filePath.startsWith("/")
    ? filePath.slice(1)
    : filePath;

  const fullPath = path.join(process.cwd(), cleanPath);

  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
  }
};

export default deleteFile;