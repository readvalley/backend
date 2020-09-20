import { createSchema, Type, typedModel } from 'ts-mongoose';
import { UserSchema } from './User';
import { SeriesSchema } from './Series';

const BookSchema = createSchema({
  title: Type.string({ required: true }),
  description: Type.string({ required: true }),
  creator: Type.ref(Type.objectId()).to('User', UserSchema),
  series: Type.ref(Type.objectId()).to('Series', SeriesSchema),
  thumbnailURL: Type.string({ required: true }),
  isPublished: Type.boolean({ default: false }),
}, { versionKey: false, timestamps: true });

const BookModel = typedModel('Book', BookSchema);

export {
  BookSchema,
  BookModel,
};
