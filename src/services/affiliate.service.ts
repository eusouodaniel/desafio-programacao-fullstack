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

}

export default AffiliateService;
