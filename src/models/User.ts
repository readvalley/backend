import { createSchema, Type, typedModel } from 'ts-mongoose';

const UserSchema = createSchema({
  name: Type.string({ required: true }),
  email: Type.string({ required: true }),
  password: Type.string({ required: true }),
  profileURL: Type.string({ required: true }),
  klaytnAddress: Type.string({ required: true }), // ?
}, { versionKey: false, timestamps: true });

const UserModel = typedModel('User', UserSchema);

export {
  UserSchema,
  UserModel,
};
