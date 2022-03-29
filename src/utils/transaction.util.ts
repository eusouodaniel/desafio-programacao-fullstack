import IProductFields from '../interfaces/IProductFields';

import AffiliateService from '../services/AffiliateService';
import ProductService from '../services/ProductService';
import TransactionService from '../services/TransactionService';
import TransactionTypeService from '../services/TransactionTypeService';

const affiliateService = new AffiliateService();
const productService = new ProductService();
const transactionService = new TransactionService();
const transactionTypeService = new TransactionTypeService();

class TransactionUtil {

  public async processImportTransaction(transactionFields: IProductFields[]) {
    return ""
  }

}

export default TransactionUtil;
