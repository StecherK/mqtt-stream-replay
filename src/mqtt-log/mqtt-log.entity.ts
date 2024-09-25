import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('mqtt_logs')  // Table name in PostgreSQL
export class MqttLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  topic: string;

  @Column('jsonb', { nullable: true }) // Store payload as JSON
  payload: any;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
