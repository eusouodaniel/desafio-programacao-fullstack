import { AppDataSource } from '../database';
import Affiliate from '../entities/affiliate.model';
import IProductFields from '../interfaces/IProductFields';

class AffiliateService {

  public async execute(transactions: IProductFields[]) {
    const affiliateRepository = AppDataSource.getRepository(Affiliate);
    return "";
  }

}

export default AffiliateService;
