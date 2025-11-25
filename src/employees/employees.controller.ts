import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar funcionários' })
  @ApiResponse({ status: 200, description: 'Lista de funcionários' })
  async findAll(@Query() pagination: PaginationDto, @Query('search') search?: string) {
    return this.employeesService.findAll(pagination, search);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar funcionário' })
  @ApiResponse({ status: 201, description: 'Funcionário criado com sucesso' })
  async create(@Body() createDto: any) {
    return this.employeesService.create(createDto);
  }

  @Get(':employeeId')
  @ApiOperation({ summary: 'Buscar funcionário por ID' })
  @ApiResponse({ status: 200, description: 'Dados do funcionário' })
  async findOne(@Param('employeeId') employeeId: string) {
    return this.employeesService.findOne(employeeId);
  }

  @Put(':employeeId')
  @ApiOperation({ summary: 'Atualizar funcionário (completo)' })
  async update(@Param('employeeId') employeeId: string, @Body() updateDto: any) {
    return this.employeesService.update(employeeId, updateDto);
  }

  @Patch(':employeeId')
  @ApiOperation({ summary: 'Atualizar funcionário (parcial)' })
  async patch(@Param('employeeId') employeeId: string, @Body() updateDto: any) {
    return this.employeesService.patch(employeeId, updateDto);
  }

  @Delete(':employeeId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar funcionário' })
  async remove(@Param('employeeId') employeeId: string) {
    return this.employeesService.remove(employeeId);
  }
}

