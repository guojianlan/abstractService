import { Controller, } from '@nestjs/common';
import { WrapController } from '../abstract/typeorm.controller';
import { ArticleEntity } from './entity';
import { ArticleService } from './article.service';
const CrudController = WrapController<ArticleEntity>({
    model: ArticleEntity,
});
@Controller('article')
export class ArticleController extends CrudController {
    constructor(private readonly service: ArticleService) {
        super(service);
    }

    // @Post()
    // public async create(@Body() body: UserEntity) {
    //   return 'create'
    // }
}
