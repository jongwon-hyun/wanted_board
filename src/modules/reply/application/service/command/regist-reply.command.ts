import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@post/domain/entity/post.entity";
import { Reply } from "@reply/domain/entity/reply.entity";
import { Connection, Repository } from "typeorm";

@Injectable()
export class RegistReplyCommand {
    constructor(
        @InjectRepository(Reply)
        private readonly replyRepository: Repository<Reply>,
        private readonly connection: Connection,
    ) {}

    async regist(reply: Partial<Reply>): Promise<Reply> {
        const queryRunner = this.connection.createQueryRunner()
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const persistedReply = await this.replyRepository.save(reply);

            await queryRunner.commitTransaction();
            Logger.log(`[persist reply] reply ID: ${persistedReply.id}`)
            return persistedReply;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(`[fail persist reply] title: writer: ${reply.writer}}`);
        } finally {
            await queryRunner.release();
        }
    }
}