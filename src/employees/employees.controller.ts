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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { EmployeeQueryDto } from './dto/employee-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar funcionários' })
  @ApiResponse({ status: 200, description: 'Lista de funcionários' })
  async findAll(@Query() query: EmployeeQueryDto) {
    const pagination: PaginationDto = {
      page: query.page || 1,
      size: query.size || 10,
    };
    return this.employeesService.findAll(pagination, query.search);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrator')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrator')
  @ApiOperation({ summary: 'Atualizar funcionário (completo)' })
  async update(@Param('employeeId') employeeId: string, @Body() updateDto: any) {
    return this.employeesService.update(employeeId, updateDto);
  }

  @Patch(':employeeId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrator')
  @ApiOperation({ summary: 'Atualizar funcionário (parcial)' })
  async patch(@Param('employeeId') employeeId: string, @Body() updateDto: any) {
    return this.employeesService.patch(employeeId, updateDto);
  }

  @Delete(':employeeId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('administrator')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar funcionário' })
  async remove(@Param('employeeId') employeeId: string) {
    return this.employeesService.remove(employeeId);
  }
}

