import { createSchema, Type, typedModel } from 'ts-mongoose';
import { UserSchema } from './User';
import { SeriesSchema } from './Series';

const ArticleSchema = createSchema({
  title: Type.string({ required: true }),
  description: Type.string({ required: true }),
  creator: Type.ref(Type.objectId()).to('User', UserSchema),
  series: Type.ref(Type.objectId()).to('Series', SeriesSchema),
  thumbnailURL: Type.string({ required: true }),
}, { versionKey: false, timestamps: true });

const ArticleModel = typedModel('Article', ArticleSchema);

export {
  ArticleSchema,
  ArticleModel,
};
