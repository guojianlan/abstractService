import { WrapAbstractTypeOrmRepostry } from "src/abstract.typeorm.repostry";
import { EntityRepository, Equal, Not } from "typeorm";
import { ArticleEntity } from "./entity";

@EntityRepository(ArticleEntity)
export class ArticleRepository extends WrapAbstractTypeOrmRepostry<ArticleEntity>({
    baseFind: {
        where: {
            dtime: Equal(0),
        },
    },

}) {

}