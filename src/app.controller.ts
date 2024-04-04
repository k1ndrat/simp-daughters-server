import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor() {}

  @ApiOperation({
    summary: 'Information about API',
  })
  @ApiOkResponse({
    description: 'Get information about API',
    schema: {
      type: 'object',
      example: {
        description:
          'The server part of my web application SimpDaughters (which is written to track watched episodes of The Simpsons)',
        doc_url: 'http://localhost:8000/api',
      },
    },
  })
  @Get()
  async getInfo() {
    return {
      description:
        'The server part of my web application SimpDaughters (which is written to track watched episodes of The Simpsons)',
      doc_url: process.env.NEXT_PUBLIC_BASE_URL + '/api',
    };
  }
}
