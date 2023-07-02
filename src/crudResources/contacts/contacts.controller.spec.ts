import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from 'src/crudResources/contacts/contacts.controller';
import { ContactsService } from 'src/crudResources/contacts/contacts.service';
import { AwsService } from 'src/services/aws/aws.service';
import { PrismaService } from 'src/services/database/prisma.service';

describe('ContactsController', () => {
  let controller: ContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [ContactsService,PrismaService,AwsService],
    }).compile();

    controller = module.get<ContactsController>(ContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
