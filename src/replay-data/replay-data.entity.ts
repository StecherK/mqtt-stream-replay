import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReplayData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sourcetopic: string;

  @Column()
  replaydata: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
