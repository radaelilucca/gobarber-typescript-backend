import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(8).toString('hex');

      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};