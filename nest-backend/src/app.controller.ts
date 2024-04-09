import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  checkServer(): object {
    return { message: 'server is running' };
  }
}
