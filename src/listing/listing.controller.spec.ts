import { Test, TestingModule } from '@nestjs/testing';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { CustomHttpException } from '../filters/http-exception.filter';

describe('ListingController', () => {
  let controller: ListingController;
  let service: ListingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListingController],
      providers: [ListingService],
    }).compile();

    controller = module.get<ListingController>(ListingController);
    service = module.get<ListingService>(ListingService);
  });

  describe('getAllListings', () => {
    it('should return paginated listings', async () => {
      const result = await controller.getAllListings({});
      expect(result).toHaveProperty('page');
      expect(result).toHaveProperty('limit');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('data');
    });
  });

  describe('getListingById', () => {
    it('should return a listing when it exists', async () => {
      const result = await controller.getListingById(1);
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
    });

    it('should throw CustomHttpException when listing not found', async () => {
      try {
        await controller.getListingById(999);
        fail('Should have thrown an exception');
      } catch (error) {
        expect(error).toBeInstanceOf(CustomHttpException);
        expect(error.message).toBe('Listing with ID = 999 not found');
      }
    });
  });
});