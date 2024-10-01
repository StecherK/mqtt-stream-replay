import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('replaylogs')

export class MqttLog {

  @PrimaryGeneratedColumn()

  id: number;



  @Column('json')

  payload: any;



  @Column()

  topic: string;



  @Column()

  timestamp: Date;


  @Column({ nullable: true })

  payloadHash: string;

}
