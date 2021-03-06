import { CommonModule } from '@common/common.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@post/domain/entity/post.entity';
import { Reply } from '@reply/domain/entity/reply.entity';
import { NoticeScheduler } from './application/scheduler/notice.scheduler';
import { NoticeService } from './application/service/notice.service';
import { NoticeQueue } from './domain/entity/notice-queue.entity';
import { Notice } from './domain/entity/notice.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notice, NoticeQueue, Post, Reply, Notice]),
    CommonModule,
  ],
  controllers: [],
  providers: [
    NoticeScheduler,
    NoticeService,
  ],
  exports: [
    NoticeScheduler,
  ]
})
export class NoticeModule {}
