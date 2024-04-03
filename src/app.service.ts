import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async checkHealth() {
    return 'Hello! I am fine! Thank you! And you?';
  }
}
