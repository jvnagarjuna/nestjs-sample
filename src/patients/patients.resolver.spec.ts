import { Test, TestingModule } from '@nestjs/testing';
import { CreatePatientInput } from './dto/create-patient.input';
import { PatientsResolver } from './patients.resolver';
import { PatientsService } from './patients.service';

describe('PatientsResolver', () => {
  let resolver: PatientsResolver;
  let patientMockService: PatientsService;

  let createDTO = new CreatePatientInput();
  createDTO.patientName = 'James';
  createDTO.patientDescription = 'Coughing';
  createDTO.patientDob = '1986-08-18';
  createDTO.patientGender = 'Male';
  createDTO.insuranceNumber = 'INSIOKLO186';
  createDTO.clinicId = 'CLC1004';
  createDTO.admissionDate = '2022-02-06';
  createDTO.dischargeDate = '2022-02-10';

  const patientsService = {
    create: jest.fn((patient) => {
      return {
        patientId: 'fake-patient-id',
        ...createDTO,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsResolver,
        {
          provide: PatientsService,
          useValue: patientsService,
        },
      ],
    }).compile();

    resolver = module.get<PatientsResolver>(PatientsResolver);
    patientMockService = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should have create function', () => {
    expect(resolver.createPatient).toBeDefined();
  });

  it('should create patient and return with Id', () => {
    expect(resolver.createPatient(createDTO)).toEqual({
      patientId: 'fake-patient-id',
      ...createDTO,
    });
    expect(patientMockService.create).toBeCalled();
  });
});
