import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import { PrismaService } from 'src/services/database/prisma.service';
import { AwsService } from 'src/services/aws/aws.service';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactsService,PrismaService,AwsService],
    }).compile();
    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
