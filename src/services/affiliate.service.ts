import { In } from 'typeorm';

import { AppDataSource } from '../database';
import Affiliate from '../entities/affiliate.model';
import IProductFields from '../interfaces/IProductFields';

class AffiliateService {

  public async execute(transactions: IProductFields[]) {
    const affiliateRepository = AppDataSource.getRepository(Affiliate);

    let getAffiliates = await affiliateRepository.findBy({
      name: In(transactions.map(transaction => transaction.affiliate)),
    });

    return "";
  }

  private filterAffiliatesByName(transactions: IProductFields[], getAffiliates: Affiliate[]) {
    return transactions.map(transaction => transaction.affiliate)
      .filter(
        affiliateName =>
        !getAffiliates
          .map(affiliate => affiliate.name)
          .includes(affiliateName),
      ).filter((value, index, self) => self.indexOf(value) === index);
  }

  private mapAffiliatesByName(filterAffiliateNames: String[]): any {
    return filterAffiliateNames.map(affiliate => {
      return {
        name: affiliate,
      };
    })
  }

}

export default AffiliateService;
