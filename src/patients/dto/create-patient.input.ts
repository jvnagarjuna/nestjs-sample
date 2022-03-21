import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePatientInput {
  @Field(() => String, { description: 'name of the patient' })
  patientName: string;

  @Field(() => String, { description: 'description of the patient' })
  patientDescription: string;

  @Field(() => String, { description: 'name of the patient' })
  patientDob: string;

  @Field(() => String, { description: 'gender of the patient' })
  patientGender: string;

  @Field(() => String, { description: 'insurance number of the patient' })
  insuranceNumber: string;

  @Field(() => String, { description: 'clinic id of the patient' })
  clinicId: string;

  @Field(() => String, { description: 'adminssion date number of the patient' })
  admissionDate: string;

  @Field(() => String, { description: 'discharge date number of the patient' })
  dischargeDate: string;

  
}
