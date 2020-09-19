import { createSchema, Type, typedModel } from 'ts-mongoose';
import { UserSchema } from './User';

const SeriesSchema = createSchema({
  title: Type.string({ required: true }),
  description: Type.string({ required: true }),
  creator: Type.ref(Type.objectId()).to('User', UserSchema),
  thumbnailURL: Type.string({ required: true }),
}, { versionKey: false, timestamps: true });

const SeriesModel = typedModel('Series', SeriesSchema);

export {
  SeriesSchema,
  SeriesModel,
};
