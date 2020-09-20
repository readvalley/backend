import { createSchema, Type, typedModel } from 'ts-mongoose';
import { UserSchema } from '../User';
import { BookSchema } from '../Book';

const CommentSchema = createSchema({
  creator: Type.ref(Type.objectId()).to('User', UserSchema),
  book: Type.ref(Type.objectId()).to('Book', BookSchema),
  content: Type.string({ required: true }),
}, { versionKey: false, timestamps: true });

const CommentModel = typedModel('Comment', CommentSchema);

export {
  CommentSchema,
  CommentModel,
};
