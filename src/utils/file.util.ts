import { readFileSync } from 'fs';
import path from 'path';

import uploadConfig from '../config/upload';

class FileUtil {

  public processFile(filename: string) {
    const filePath = path.join(uploadConfig.directory, filename);
    const fileTransaction = readFileSync(filePath, 'utf-8');
  }

}

export default FileUtil;
