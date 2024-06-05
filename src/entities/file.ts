import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class File {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  filename: string;

  @Column({
    type: "bytea",
  })
  data: Buffer;
}

export default File;
