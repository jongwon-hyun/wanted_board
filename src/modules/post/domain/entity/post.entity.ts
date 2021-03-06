import { BaseEntity } from '@common/entity/base.entity';
import { Reply } from '@reply/domain/entity/reply.entity';
import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 게시글 엔티티
 */
@Entity('posts')
export class Post extends BaseEntity {
  /**
   * 게시글 ID
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  /**
   * 제목
   */
  @Index({ unique: false })
  @Column({ type: 'varchar', length: 50, nullable: false })
  title: string;

  /**
   * 내용
   */
  @Column({ type: 'text', nullable: false })
  content: string;

  /**
   * 작성자
   */
  @Index({ unique: false })
  @Column({ type: 'varchar', length: 20, nullable: false })
  writer: string;

  /**
   * 패스워드
   */
  @Column({ type: 'varchar', length: 72, nullable: false })
  password: string;

  @OneToMany(() => Reply, reply => reply.id)
  @JoinColumn({ name: 'reply_id' })
  reply: Array<Reply>;
}