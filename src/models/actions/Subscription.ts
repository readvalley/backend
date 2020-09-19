import { createSchema, Type, typedModel } from 'ts-mongoose';
import { UserSchema } from '../User';
import { ArticleSchema } from '../Article';

const SubscriptionSchema = createSchema({
  creator: Type.ref(Type.objectId()).to('User', UserSchema),
  article: Type.ref(Type.objectId()).to('Article', ArticleSchema),
}, { versionKey: false, timestamps: true });

const SubscriptionModel = typedModel('Subscription', SubscriptionSchema);

export {
  SubscriptionSchema,
  SubscriptionModel,
};
