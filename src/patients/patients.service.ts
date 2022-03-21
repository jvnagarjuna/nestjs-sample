import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addDays, endOfDay, startOfDay, subMonths } from 'date-fns';
import { Between, Repository } from 'typeorm';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientInput: CreatePatientInput): Promise<Patient> {
    const patient = this.patientRepository.create(createPatientInput);
    return await this.patientRepository.save(patient);
  }

  async findAll(): Promise<Array<Patient>> {
    return await this.patientRepository.find();
  }

  async findOne(patientId: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { patientId },
    });
    if (!patient) {
      throw new NotFoundException(`Patient #${patientId} not found`);
    }
    return patient;
  }

  async findPatientsByClinicIdAndAdmissionDateRange(
    clinicId: string,
    fromDate: string,
    toDate: string,
  ): Promise<Array<Patient>> {
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    return await this.patientRepository.find({
      where: {
        clinicId,
        admissionDate: Between(
          startOfDay(startDate).toISOString(),
          endOfDay(endDate).toISOString(),
        ),
      },
    });
  }

  async update(
    patientId: string,
    updatePatientInput: UpdatePatientInput,
  ): Promise<Patient> {
    const patient = await this.patientRepository.preload({
      patientId: patientId,
      ...updatePatientInput,
    });
    if (!patient) {
      throw new NotFoundException(`Patient #${patientId} not found`);
    }
    return this.patientRepository.save(patient);
  }

  async remove(patientId: string): Promise<Patient> {
    const patient = await this.findOne(patientId);
    await this.patientRepository.remove(patient);
    return {
      patientId: patientId,
      patientName: '',
      patientDescription: '',
      patientDob: '',
      patientGender: '',
      insuranceNumber: '',
      clinicId: '',
      admissionDate: '',
      dischargeDate: '',
    };
  }
}
