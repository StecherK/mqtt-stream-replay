
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReplayData } from './replay-data.entity';

@Injectable()
export class ReplayService {
  constructor(
    @Inject('REPLAY_REPOSITORY')
    private photoRepository: Repository<ReplayData>,
  ) {}

  async findAll(): Promise<ReplayData[]> {
    return this.photoRepository.find();
  }
}