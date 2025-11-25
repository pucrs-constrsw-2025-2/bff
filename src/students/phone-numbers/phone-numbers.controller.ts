import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PhoneNumbersService } from './phone-numbers.service';

@ApiTags('Students')
@Controller('students/:studentId/phone-numbers')
export class PhoneNumbersController {
  constructor(private readonly phoneNumbersService: PhoneNumbersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar telefones de um estudante' })
  async findAll(@Param('studentId') studentId: string) {
    return this.phoneNumbersService.findAll(studentId);
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar telefone a um estudante' })
  async create(@Param('studentId') studentId: string, @Body() createDto: any) {
    return this.phoneNumbersService.create(studentId, createDto);
  }

  @Get(':phoneNumberId')
  @ApiOperation({ summary: 'Buscar telefone específico por ID' })
  async findOne(
    @Param('studentId') studentId: string,
    @Param('phoneNumberId') phoneNumberId: string,
  ) {
    return this.phoneNumbersService.findOne(studentId, phoneNumberId);
  }

  @Put(':phoneNumberId')
  @ApiOperation({ summary: 'Atualizar telefone (completo)' })
  async update(
    @Param('studentId') studentId: string,
    @Param('phoneNumberId') phoneNumberId: string,
    @Body() updateDto: any,
  ) {
    return this.phoneNumbersService.update(studentId, phoneNumberId, updateDto);
  }

  @Patch(':phoneNumberId')
  @ApiOperation({ summary: 'Atualizar telefone (parcial)' })
  async patch(
    @Param('studentId') studentId: string,
    @Param('phoneNumberId') phoneNumberId: string,
    @Body() updateDto: any,
  ) {
    return this.phoneNumbersService.patch(studentId, phoneNumberId, updateDto);
  }

  @Delete(':phoneNumberId')
  @ApiOperation({ summary: 'Deletar telefone' })
  async remove(
    @Param('studentId') studentId: string,
    @Param('phoneNumberId') phoneNumberId: string,
  ) {
    return this.phoneNumbersService.remove(studentId, phoneNumberId);
  }
}

