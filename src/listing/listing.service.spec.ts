import { Test, TestingModule } from '@nestjs/testing';
import { ListingService } from './listing.service';

describe('ListingService', () => {
  let service: ListingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListingService],
    }).compile();

    service = module.get<ListingService>(ListingService);
  });

  describe('findAll', () => {
    it('should return paginated results', async () => {
      const result = await service.findAll({});
      expect(result).toHaveProperty('page', 1);
      expect(result).toHaveProperty('limit', 10);
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('data');
      expect(Array.isArray(result.data)).toBeTruthy();
    });

    it('should filter by location', async () => {
      const result = await service.findAll({ location: 'Lagos' });
      expect(result.data.every(item => 
        item.location.toLowerCase().includes('lagos')
      )).toBeTruthy();
    });

    it('should filter by type', async () => {
      const result = await service.findAll({ type: 'House' });
      expect(result.data.every(item => 
        item.status[0].toLowerCase() === 'house'
      )).toBeTruthy();
    });

    it('should filter by price range', async () => {
      const result = await service.findAll({ 
        minPrice: '1000000', 
        maxPrice: '2000000' 
      });
      
      expect(result.data.every(item => {
        const price = parseInt(item.price.replace(/₦|,|\s\/\s(week|night)/g, ''));
        return price >= 1000000 && price <= 2000000;
      })).toBeTruthy();
    });
  });

  describe('findById', () => {
    it('should return a listing by id', async () => {
      const listing = await service.findById(1);
      expect(listing).toBeDefined();
      expect(listing?.id).toBe(1);
    });

    it('should return undefined for non-existent id', async () => {
      const listing = await service.findById(999);
      expect(listing).toBeUndefined();
    });
  });
});