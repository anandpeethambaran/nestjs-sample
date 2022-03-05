import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Posts } from './posts.interface';

@Injectable()
export class PostsService {
    private posts: Array<Posts> = [];

    public findAll(): Array<Posts> {
        return this.posts;
    }

    public findOne(id: number): Posts {
        const post: Posts = this.posts.find(post => post.id === id);
        if (!post) {
            throw new NotFoundException('Post not found!')
        }

        return post
    }

    public create(data: Posts): Posts {

        const titleExists = this.posts.some(item => item.title === data.title)
        if (titleExists) {
            throw new UnprocessableEntityException('Post title already exists')
        }

        const maxId: number = Math.max(...this.posts.map(item => item.id), 0)
        const id: number = maxId + 1

        const newItem: Posts = {
            id,
            ...data
        }

        this.posts.push(newItem)

        return newItem
    }

    public delete(id: number) {

        const index = this.posts.findIndex(item => item.id === id);

        if (index === -1) {
            throw new NotFoundException('Post not found!')
        }

        this.posts.splice(index, 1);
        return "SUCCESS"
    }

    public update(id: number, data: Posts) {

        const index = this.posts.findIndex(item => item.id === id);

        if (index === -1) {
            throw new NotFoundException('Post not found!')
        }

        const titleExists = this.posts.some(item => item.title === data.title)
        if (titleExists) {
            throw new UnprocessableEntityException('Post title already exists')
        }

        const newItem: Posts = {
            id,
            ...data
        }

        this.posts[index] = newItem

        return newItem
    }
}
