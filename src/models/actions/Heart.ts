import { createSchema, Type, typedModel } from 'ts-mongoose';
import { UserSchema } from '../User';
import { BookSchema } from '../Book';

const HeartSchema = createSchema({
  creator: Type.ref(Type.objectId()).to('User', UserSchema),
  book: Type.ref(Type.objectId()).to('Book', BookSchema),
}, { versionKey: false, timestamps: true });

const HeartModel = typedModel('Heart', HeartSchema);

export {
  HeartSchema,
  HeartModel,
};
