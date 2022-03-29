import { AppDataSource } from '../database';
import Product from '../entities/product.model';
import IProductFields from '../interfaces/IProductFields';

class ProductService {

  public async execute(transactions: IProductFields[]) {
    const productRepository = AppDataSource.getRepository(Product);
    return "";
  }

}

export default ProductService;
