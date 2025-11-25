import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TasksService } from './tasks.service';

@ApiTags('Employees')
@Controller('employees/:employeeId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Listar tarefas de um funcionário' })
  async findAll(
    @Param('employeeId') employeeId: string,
    @Query() query: any,
  ) {
    return this.tasksService.findAll(employeeId, query);
  }

  @Post()
  @ApiOperation({ summary: 'Criar tarefa para um funcionário' })
  async create(
    @Param('employeeId') employeeId: string,
    @Body() createDto: any,
  ) {
    return this.tasksService.create(employeeId, createDto);
  }

  @Get(':taskId')
  @ApiOperation({ summary: 'Buscar tarefa específica' })
  async findOne(
    @Param('employeeId') employeeId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.findOne(employeeId, taskId);
  }

  @Put(':taskId')
  @ApiOperation({ summary: 'Atualizar tarefa (completo)' })
  async update(
    @Param('employeeId') employeeId: string,
    @Param('taskId') taskId: string,
    @Body() updateDto: any,
  ) {
    return this.tasksService.update(employeeId, taskId, updateDto);
  }

  @Patch(':taskId')
  @ApiOperation({ summary: 'Atualizar tarefa (parcial)' })
  async patch(
    @Param('employeeId') employeeId: string,
    @Param('taskId') taskId: string,
    @Body() updateDto: any,
  ) {
    return this.tasksService.patch(employeeId, taskId, updateDto);
  }

  @Delete(':taskId')
  @ApiOperation({ summary: 'Deletar tarefa' })
  async remove(
    @Param('employeeId') employeeId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.tasksService.remove(employeeId, taskId);
  }
}

