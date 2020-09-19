import { createSchema, Type, typedModel } from 'ts-mongoose';
import { UserSchema } from '../User';
import { ArticleSchema } from '../Article';

const HeartSchema = createSchema({
  creator: Type.ref(Type.objectId()).to('User', UserSchema),
  article: Type.ref(Type.objectId()).to('Article', ArticleSchema),
}, { versionKey: false, timestamps: true });

const HeartModel = typedModel('Heart', HeartSchema);

export {
  HeartSchema,
  HeartModel,
};
