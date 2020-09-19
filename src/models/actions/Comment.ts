import { createSchema, Type, typedModel } from 'ts-mongoose';
import { UserSchema } from '../User';
import { ArticleSchema } from '../Article';

const CommentSchema = createSchema({
  creator: Type.ref(Type.objectId()).to('User', UserSchema),
  article: Type.ref(Type.objectId()).to('Article', ArticleSchema),
  content: Type.string({ required: true }),
}, { versionKey: false, timestamps: true });

const CommentModel = typedModel('Comment', CommentSchema);

export {
  CommentSchema,
  CommentModel,
};
