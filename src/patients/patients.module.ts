import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsResolver } from './patients.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientsResolver, PatientsService],
})
export class PatientsModule {}
