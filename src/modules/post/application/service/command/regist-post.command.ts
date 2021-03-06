import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "@post/domain/entity/post.entity";
import { Connection, Repository } from "typeorm";

/**
 * 게시글 등록
 */
@Injectable()
export class RegistPostCommand {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
        private readonly connection: Connection,
    ) {}

    /**
     * 게시글 등록
     * @param post 게시글
     * @returns 등록한 게시글
     */
    async regist(post: Partial<Post>): Promise<Post> {
        const queryRunner = this.connection.createQueryRunner()
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const persistedPost = await this.postRepository.save(post);

            await queryRunner.commitTransaction();
            Logger.log(`[persist post] post ID: ${persistedPost.id}`)
            return persistedPost;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            Logger.error(`[fail persist post] title: ${post.title} / writer: ${post.writer}`)
            throw new InternalServerErrorException('fail persist post');
        } finally {
            await queryRunner.release();
        }
    }
}