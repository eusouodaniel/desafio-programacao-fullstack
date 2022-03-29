import { readFileSync } from 'fs';
import path from 'path';

import uploadConfig from '../config/upload';

class FileUtil {

  public processFile(filename: string) {
    const filePath = path.join(uploadConfig.directory, filename);
    const fileTransaction = readFileSync(filePath, 'utf-8');
  }

  private parseTransaction(transaction: string) {
    //transaction parsed by contract
    return {
      type: Number(transaction.slice(0, 1)),
      date: new Date(transaction.slice(1, 26)),
      product: transaction.slice(26, 56).trim(),
      price: Number(transaction.slice(56, 66)) / 100,
      affiliate: transaction.slice(66, 86).trim(),
    };
  }

}

export default FileUtil;
