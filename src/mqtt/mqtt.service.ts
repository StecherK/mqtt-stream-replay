import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReplayData } from '../replay-data/replay-data.entity';

@Injectable()
export class MqttService {
  constructor(
    @InjectRepository(ReplayData )
    private replayDataRepository: Repository<ReplayData>,
  ) {}

  async saveReplayData(sourcetopic: string, replaydata: string): Promise<ReplayData> {
    const replayData = this.replayDataRepository.create({ sourcetopic, replaydata });
    return this.replayDataRepository.save(replayData);
  }
}
