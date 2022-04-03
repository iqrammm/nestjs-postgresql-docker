import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createFreelancerTable1649001738436 implements MigrationInterface {
  name = 'createFreelancerTable1649001738436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'freelancer',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'phone_number',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'skillsets',
            type: 'varchar',
          },
          {
            name: 'hobby',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "freelancer"`);
  }
}
