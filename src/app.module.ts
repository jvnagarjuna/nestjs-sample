import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: './schema.gql',
      debug: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'abc123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PatientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
