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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UsePipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  )
  @ApiOperation({ summary: 'Listar usuários' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @ApiQuery({ name: 'enabled', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  async findAll(
    @Query('page') page?: string,
    @Query('size') size?: string,
    @Query('enabled') enabled?: string,
  ) {
    const pagination: PaginationDto = {
      page: page ? parseInt(page, 10) : 1,
      size: size ? parseInt(size, 10) : 10,
    };
    const enabledBool = enabled === 'true' ? true : enabled === 'false' ? false : undefined;
    return this.usersService.findAll(pagination, enabledBool);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Dados do usuário' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Atualizar usuário (completo)' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado' })
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Get(':userId/roles')
  @ApiOperation({ summary: 'Listar roles de um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de roles do usuário' })
  async getUserRoles(@Param('userId') userId: string) {
    return this.usersService.getUserRoles(userId);
  }

  @Post(':userId/roles')
  @ApiOperation({ summary: 'Atribuir roles a um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Roles atribuídos com sucesso' })
  async assignRolesToUser(
    @Param('userId') userId: string,
    @Body() body: { roleIds: string[] },
  ) {
    return this.usersService.assignRolesToUser(userId, body.roleIds);
  }

  @Delete(':userId/roles')
  @ApiOperation({ summary: 'Remover roles de um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 204, description: 'Roles removidos com sucesso' })
  async removeRolesFromUser(
    @Param('userId') userId: string,
    @Body() body: { roleIds: string[] },
  ) {
    return this.usersService.removeRolesFromUser(userId, body.roleIds);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Atualizar senha de um usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 200, description: 'Senha atualizada' })
  async updatePassword(
    @Param('userId') userId: string,
    @Body() updatePasswordDto: { password: string },
  ) {
    return this.usersService.updatePassword(userId, updatePasswordDto);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Desativar usuário' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiResponse({ status: 204, description: 'Usuário desativado' })
  async remove(@Param('userId') userId: string) {
    return this.usersService.remove(userId);
  }
}

