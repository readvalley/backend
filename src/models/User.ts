import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

export const UserSchema = createSchema({
  name: Type.string({ required: true }),
  email: Type.string({ required: true, unique: true }),
  password: Type.string({ required: true }),
  profileURL: Type.string({ required: true }),
  klaytnAddress: Type.string({ required: true, unique: true }),
}, { versionKey: false, timestamps: true });

export const UserModel = typedModel('User', UserSchema);

export type UserDoc = ExtractDoc<typeof UserSchema>;
