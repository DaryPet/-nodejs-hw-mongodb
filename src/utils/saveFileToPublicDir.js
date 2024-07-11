import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, PUBLIC_PHOTOS_DIR } from '../constants/index.js';
import path from 'node:path';
import { env } from './env.js';

// const saveFileToPublicDir = async (file, filePath) => {
//   const domain = env('APP_DOMAIN');

//   const newPath = path.join(PUBLIC_DIR, filePath, file.filename);
//   await fs.rename(file.path, newPath);

//   return `${domain}/public/${filePath}/${file.filename}`;
// };

const saveFileToPublicDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(PUBLIC_PHOTOS_DIR, file.filename),
  );

  return `${env('APP_DOMAIN')}/public/${file.filename}`;
};

export default saveFileToPublicDir;
