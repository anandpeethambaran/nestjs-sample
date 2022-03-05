import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Posts } from './posts.interface';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postservice: PostsService) { }

    @Get()
    public findAll(): Array<Posts> {
        return this.postservice.findAll();
    }

    @Get(':id')
    public findOne(@Param('id', ParseIntPipe) id: number): Posts {
        return this.postservice.findOne(id);
    }

    @Post()
    public create(@Body() data: Posts): Posts {
        return this.postservice.create(data)
    }

    @Delete(':id')
    public delete(@Param('id', ParseIntPipe) id: number) {
        return this.postservice.delete(id)
    }

    @Put(':id')
    public update(@Param('id', ParseIntPipe) id: number, data: Posts) {
        return this.postservice.update(id, data)
    }
}
