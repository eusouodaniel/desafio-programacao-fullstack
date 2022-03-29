import { In } from 'typeorm';

import { AppDataSource } from '../database';
import Product from '../entities/product.model';
import IProductFields from '../interfaces/IProductFields';

class ProductService {

  public async execute(transactions: IProductFields[]) {
    const productRepository = AppDataSource.getRepository(Product);
    let getProducts = await productRepository.findBy({
      name: In(transactions.map(transaction => transaction.product)),
    });

    const filterProductNames = this.filterProductsByName(transactions, getProducts);
    const createProducts = this.mapProductsByName(filterProductNames);

    const products = productRepository.create(createProducts);
    await productRepository.save(products);

    return getProducts.concat(products);
  }

  private filterProductsByName(transactions: IProductFields[], getProducts: Product[]) {
    return transactions.map(transaction => transaction.product)
      .filter(
        productName =>
        !getProducts
          .map(product => product.name)
          .includes(productName),
      ).filter((value, index, self) => self.indexOf(value) === index);
  }

  private mapProductsByName(filterProductNames: String[]): any {
    return filterProductNames.map(product => {
      return {
        name: product,
      };
    })
  }

}

export default ProductService;
