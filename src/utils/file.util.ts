import { readFileSync } from 'fs';
import path from 'path';

import uploadConfig from '../config/upload';
import IProductFields from '../interfaces/IProductFields';

class FileUtil {

  public processFile(filename: string): IProductFields[] {
    const filePath = path.join(uploadConfig.directory, filename);
    const fileTransaction = readFileSync(filePath, 'utf-8');

    return fileTransaction.split('\n')
      .filter((transaction) => this.checkLineTransaction(transaction))
      .map((transaction) => this.parseTransaction(transaction));
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

  private checkLineTransaction(transaction) {
    if (transaction.length == 0) {
      return false;
    }

    return true;
  }

}

export default FileUtil;
