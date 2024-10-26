import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CapteurModule } from './capteur/capteur.module';
import { MetricModule } from './metrics/metrics.module';
import { CapteurMetricModule } from './capteur_metrics/capteur-metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Optional, if you want the config to be globally available
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type:  'postgres',
        host: 'postgres',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'aq54_db',
        autoLoadEntities: true, 
        synchronize: true, 
      }),
    }),
    CapteurModule, MetricModule, CapteurMetricModule],
  controllers: [AppController],
  providers: [AppService],
})  
export class AppModule {}
