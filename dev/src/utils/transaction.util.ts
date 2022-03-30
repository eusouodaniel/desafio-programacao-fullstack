import IProductFields from '../interfaces/IProductFields';

import AffiliateService from '../services/affiliate.service';
import ProductService from '../services/product.service';
import TransactionService from '../services/transaction.service';
import TransactionTypeService from '../services/transaction-type.service';

const affiliateService = new AffiliateService();
const productService = new ProductService();
const transactionService = new TransactionService();
const transactionTypeService = new TransactionTypeService();

class TransactionUtil {

  public async processImportTransaction(transactionFields: IProductFields[]) {
    const affiliates = await this.checkAffiliates(transactionFields);
    const products = await this.checkProducts(transactionFields);
    const transactionTypes = await this.checkTransactionTypes(transactionFields);

    return transactionService.executeImport(transactionFields, affiliates, products, transactionTypes);
  }

  private async checkAffiliates(transactionFields: IProductFields[]) {
    return affiliateService.execute(transactionFields);
  }

  private async checkProducts(transactionFields: IProductFields[]) {
    return productService.execute(transactionFields);
  }

  private async checkTransactionTypes(transactionFields: IProductFields[]) {
    return transactionTypeService.execute(transactionFields);
  }
}

export default TransactionUtil;
