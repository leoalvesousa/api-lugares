import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class places1665149557858 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'places',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'zipCode',
            type: 'char',
            length: '10',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'category',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'places',
      new TableForeignKey({
        columnNames: ['category'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('places');
  }
}
