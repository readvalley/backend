import { createSchema, Type, typedModel } from 'ts-mongoose';
import { UserSchema } from '../User';
import { BookSchema } from '../Book';

const SubscriptionSchema = createSchema({
  creator: Type.ref(Type.objectId()).to('User', UserSchema),
  book: Type.ref(Type.objectId()).to('Book', BookSchema),
}, { versionKey: false, timestamps: true });

const SubscriptionModel = typedModel('Subscription', SubscriptionSchema);

export {
  SubscriptionSchema,
  SubscriptionModel,
};
