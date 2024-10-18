import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './entities/table.entity';
import { Status } from 'src/enum/status.enum';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  async create(createTableDto: CreateTableDto) {
    const newTable = this.tableRepository.create({
      number: createTableDto.number,
      status: createTableDto.status,
      capacity: createTableDto.capacity,
      ubication: createTableDto.ubication,
    });
    return await this.tableRepository.save(newTable);
  }

  async findAll() {
    return await this.tableRepository.find();
  }

  async findOne(id: string) {
    return await this.tableRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTableDto: UpdateTableDto): Promise<Table> {
    const table = await this.findOne(id);
    if (!table) {
      throw new Error(`Table with ID ${id} not found`);
    }
    Object.assign(table, updateTableDto);
    return await this.tableRepository.save(table);
  }

  async remove(id: string) {
    const tableRemove = this.findOne(id);
    if (!tableRemove) {
      throw new BadRequestException(`Table with ID ${id} not found`);
    }
    await this.tableRepository.delete(id);
  }

  async resetAllTables(): Promise<void> {
    await this.tableRepository
      .createQueryBuilder()
      .update(Table)
      .set({ status: Status.AVAILABLE })
      .where('status = :status', { status: Status.OCCUPIED })
      .execute();
  }
}
