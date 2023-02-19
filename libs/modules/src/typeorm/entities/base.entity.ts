import { CreateDateColumn, UpdateDateColumn, VersionColumn } from 'typeorm';

export class BaseEntity {
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;

  @VersionColumn()
  version?: number;
}
