import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PatientsService } from './patients.service';
import { Patient } from './entities/patient.entity';
import { CreatePatientInput } from './dto/create-patient.input';
import { UpdatePatientInput } from './dto/update-patient.input';

@Resolver(() => Patient)
export class PatientsResolver {
  constructor(private readonly patientsService: PatientsService) {}

  @Mutation(() => Patient)
  createPatient(
    @Args('createPatientInput') createPatientInput: CreatePatientInput,
  ) {
    return this.patientsService.create(createPatientInput);
  }

  @Query(() => [Patient], { name: 'patients' })
  findAll() {
    return this.patientsService.findAll();
  }

  @Query(() => Patient, { name: 'patient' })
  findOne(@Args('patientId', { type: () => String }) patientId: string) {
    return this.patientsService.findOne(patientId);
  }

  @Query(() => [Patient], { name: 'patientsByClinicIdAndAdmissionDateRange' })
  findPatientsByClinicIdAndAdmissionDateRange(
    @Args('clinicId', { type: () => String }) clinicId: string,
    @Args('fromDate', { type: () => String }) fromDate: string,
    @Args('toDate', { type: () => String }) toDate: string,
  ) {
    return this.patientsService.findPatientsByClinicIdAndAdmissionDateRange(
      clinicId,
      fromDate,
      toDate,
    );
  }

  @Mutation(() => Patient)
  updatePatient(
    @Args('updatePatientInput') updatePatientInput: UpdatePatientInput,
  ) {
    return this.patientsService.update(
      updatePatientInput.patientId,
      updatePatientInput,
    );
  }

  @Mutation(() => Patient)
  removePatient(@Args('patientId', { type: () => String }) patientId: string) {
    return this.patientsService.remove(patientId);
  }
}
