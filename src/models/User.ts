import { randomBytes } from 'crypto';
import { createSchema, ExtractDoc, Type, typedModel } from 'ts-mongoose';

import encryptPassword from '../utils/encryptPassword';

export const UserSchema = createSchema({
  name: Type.string({ required: true }),
  email: Type.string({ required: true, unique: true }),
  password: Type.string({ required: true }),
  profileURL: Type.string({ required: true }),
  klaytnAddress: Type.string({ required: true, unique: true }),
  isPublisher: Type.boolean(),
  description: Type.string(),
}, { versionKey: false, timestamps: true });

export type UserDoc = ExtractDoc<typeof UserSchema>;

UserSchema.pre<UserDoc>('save', function (done) {
  if (!this.isModified('password')) {
    return done();
  }
  const salt: string = randomBytes(10).toString('base64');
  const encryptedPassword: string = encryptPassword(this.password, salt);
  this.password = `${encryptedPassword}|${salt}`;
  return done();
});

UserSchema.methods.toJSON = function () {
  const obj: any = this.toObject();
  delete obj['password'];
  return obj;
};

export const UserModel = typedModel('User', UserSchema);
