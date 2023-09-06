import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





type EagerUsers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Users, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly subscription?: StripeSubscription | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly usersSubscriptionId?: string | null;
}

type LazyUsers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Users, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly subscription: AsyncItem<StripeSubscription | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly usersSubscriptionId?: string | null;
}

export declare type Users = LazyLoading extends LazyLoadingDisabled ? EagerUsers : LazyUsers

export declare const Users: (new (init: ModelInit<Users>) => Users) & {
  copyOf(source: Users, mutator: (draft: MutableModel<Users>) => MutableModel<Users> | void): Users;
}

type EagerStripeSubscription = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StripeSubscription, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly stripeSubscriptionId: string;
  readonly plan: string;
  readonly status: string;
  readonly userId: string;
  readonly user?: Users | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStripeSubscription = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StripeSubscription, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly stripeSubscriptionId: string;
  readonly plan: string;
  readonly status: string;
  readonly userId: string;
  readonly user: AsyncItem<Users | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type StripeSubscription = LazyLoading extends LazyLoadingDisabled ? EagerStripeSubscription : LazyStripeSubscription

export declare const StripeSubscription: (new (init: ModelInit<StripeSubscription>) => StripeSubscription) & {
  copyOf(source: StripeSubscription, mutator: (draft: MutableModel<StripeSubscription>) => MutableModel<StripeSubscription> | void): StripeSubscription;
}