import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'id of the clinic' })
  patientId: string;

  @Column({ name: 'patient_name', length: 255 })
  @Field(() => String, { description: 'name of the patient' })
  patientName: string;

  @Column({ type: 'text', name: 'patient_description' })
  @Field(() => String, { description: 'description of the patient' })
  patientDescription: string;

  @Column({ type: 'date', name: 'patient_dob' })
  @Field(() => String, { description: 'date of birth of the patient' })
  patientDob: string;

  @Column({ name: 'patient_gender', length: 6 })
  @Field(() => String, { description: 'gender of the patient' })
  patientGender: string;

  @Column({ name: 'insurance_number', length: 255 })
  @Field(() => String, { description: 'insurance number of the patient' })
  insuranceNumber: string;

  @Column({ name: 'clinit_id', length: 255 })
  @Field(() => String, { description: 'clinic id of the patient' })
  clinicId: string;

  @Column({ type: 'date', name: 'admission_date' })
  @Field(() => String, { description: 'admission date of the patient' })
  admissionDate: string;

  @Column({ type: 'date', name: 'discharge_date' })
  @Field(() => String, { description: 'Discharge date of the patient' })
  dischargeDate: string;
}
