import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AllShopOffsetsResponse = {
  __typename?: 'AllShopOffsetsResponse';
  lastWeekWeight: Scalars['Float'];
  lastMonthWeight: Scalars['Float'];
  lastYearWeight: Scalars['Float'];
  monthlyWeight: Array<MonthlyWeight>;
};

export type BillingRedirectInput = {
  shop: Scalars['String'];
};

export type CreateShopInput = {
  shop: Scalars['String'];
  shopKey: Scalars['String'];
  scope: Scalars['String'];
  billingId: Scalars['String'];
};

export type DeleteShopInput = {
  shop: Scalars['String'];
};

export type GetShopInput = {
  shop: Scalars['String'];
};

export type MonthlyWeight = {
  __typename?: 'MonthlyWeight';
  month?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: ShopResponse;
  updateShop: ShopResponse;
  deleteShop: Scalars['Boolean'];
  recordOffset: Scalars['Boolean'];
  recordOrder: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  options: CreateShopInput;
};


export type MutationUpdateShopArgs = {
  options: UpdateShopInput;
};


export type MutationDeleteShopArgs = {
  options: DeleteShopInput;
};


export type MutationRecordOffsetArgs = {
  options: OffsetRecordInput;
};


export type MutationRecordOrderArgs = {
  options: RecordOrderOptions;
};

export type OffsetCalculationInput = {
  shop: Scalars['String'];
  weight: Scalars['String'];
  distance: Scalars['String'];
};

export type OffsetCalculationResponse = {
  __typename?: 'OffsetCalculationResponse';
  value: Scalars['String'];
  offsetWeight: Scalars['String'];
  variantId: Scalars['Float'];
};

export type OffsetRecordInput = {
  shop: Scalars['String'];
  value: Scalars['Float'];
  weight: Scalars['Float'];
  orderId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  getShop?: Maybe<ShopResponse>;
  createBillingRedirect: Scalars['String'];
  allShopOffsets: AllShopOffsetsResponse;
  calculateOffset: OffsetCalculationResponse;
};


export type QueryGetShopArgs = {
  options: GetShopInput;
};


export type QueryCreateBillingRedirectArgs = {
  options: BillingRedirectInput;
};


export type QueryCalculateOffsetArgs = {
  options: OffsetCalculationInput;
};

export type RecordOrderOptions = {
  shop: Scalars['String'];
  orderInfo: Scalars['String'];
};

export type Shop = {
  __typename?: 'Shop';
  id: Scalars['String'];
  shop?: Maybe<Scalars['String']>;
  scope?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  shopType?: Maybe<Scalars['String']>;
  shopKey?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  managerName?: Maybe<Scalars['String']>;
  companySize?: Maybe<Scalars['String']>;
  productCategory?: Maybe<Scalars['String']>;
  averageProductWeight?: Maybe<Scalars['String']>;
  merchantPaysOffset?: Maybe<Scalars['Boolean']>;
  calculateOffset?: Maybe<Scalars['Boolean']>;
  flatRateOffsetAmount?: Maybe<Scalars['String']>;
  completedOnboarding?: Maybe<Scalars['Boolean']>;
  appEnabledOnStorefront?: Maybe<Scalars['Boolean']>;
  neutrlCoversOffset?: Maybe<Scalars['Boolean']>;
  previewMode?: Maybe<Scalars['Boolean']>;
  shopifyProductId?: Maybe<Scalars['String']>;
  billingId?: Maybe<Scalars['String']>;
  billingActive?: Maybe<Scalars['Boolean']>;
  completedInstallation?: Maybe<Scalars['Boolean']>;
};

export type ShopResponse = {
  __typename?: 'ShopResponse';
  shop?: Maybe<Shop>;
};

export type UpdateShopInput = {
  companyName?: Maybe<Scalars['String']>;
  managerName?: Maybe<Scalars['String']>;
  appEnabledOnStorefront?: Maybe<Scalars['Boolean']>;
  companySize?: Maybe<Scalars['String']>;
  productCategory?: Maybe<Scalars['String']>;
  averageProductWeight?: Maybe<Scalars['String']>;
  merchantPaysOffset?: Maybe<Scalars['Boolean']>;
  calculateOffset?: Maybe<Scalars['Boolean']>;
  flatRateOffsetAmount?: Maybe<Scalars['String']>;
  completedOnboarding?: Maybe<Scalars['Boolean']>;
  billingId?: Maybe<Scalars['String']>;
  billingActive?: Maybe<Scalars['Boolean']>;
  completedInstallation?: Maybe<Scalars['Boolean']>;
  previewMode?: Maybe<Scalars['Boolean']>;
};

export type DeleteShopMutationVariables = Exact<{
  shop: Scalars['String'];
}>;


export type DeleteShopMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteShop'>
);

export type RecordOrderOffsetMutationVariables = Exact<{
  shop: Scalars['String'];
  value: Scalars['Float'];
  weight: Scalars['Float'];
  orderId: Scalars['String'];
}>;


export type RecordOrderOffsetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'recordOffset'>
);

export type RecordOrderMutationVariables = Exact<{
  shop: Scalars['String'];
  orderInfo: Scalars['String'];
}>;


export type RecordOrderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'recordOrder'>
);

export type RegisterMutationVariables = Exact<{
  shop: Scalars['String'];
  shopKey: Scalars['String'];
  scope: Scalars['String'];
  billingId: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'ShopResponse' }
    & { shop?: Maybe<(
      { __typename?: 'Shop' }
      & Pick<Shop, 'id' | 'shop' | 'scope' | 'shopKey' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type UpdateShopMutationVariables = Exact<{
  companyName?: Maybe<Scalars['String']>;
  managerName?: Maybe<Scalars['String']>;
  companySize?: Maybe<Scalars['String']>;
  productCategory?: Maybe<Scalars['String']>;
  averageProductWeight?: Maybe<Scalars['String']>;
  merchantPaysOffset?: Maybe<Scalars['Boolean']>;
  calculateOffset?: Maybe<Scalars['Boolean']>;
  flatRateOffsetAmount?: Maybe<Scalars['String']>;
  completedOnboarding?: Maybe<Scalars['Boolean']>;
  billingId?: Maybe<Scalars['String']>;
  appEnabledOnStorefront?: Maybe<Scalars['Boolean']>;
  billingActive?: Maybe<Scalars['Boolean']>;
  completedInstallation?: Maybe<Scalars['Boolean']>;
  previewMode?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateShopMutation = (
  { __typename?: 'Mutation' }
  & { updateShop: (
    { __typename?: 'ShopResponse' }
    & { shop?: Maybe<(
      { __typename?: 'Shop' }
      & Pick<Shop, 'shop' | 'createdAt' | 'updatedAt' | 'companyName' | 'billingActive' | 'appEnabledOnStorefront' | 'completedInstallation' | 'completedOnboarding' | 'previewMode'>
    )> }
  ) }
);

export type AdminShopQueryVariables = Exact<{
  shop: Scalars['String'];
}>;


export type AdminShopQuery = (
  { __typename?: 'Query' }
  & { getShop?: Maybe<(
    { __typename?: 'ShopResponse' }
    & { shop?: Maybe<(
      { __typename?: 'Shop' }
      & Pick<Shop, 'id' | 'shop' | 'scope' | 'shopKey' | 'email' | 'completedOnboarding' | 'companyName' | 'companySize' | 'managerName' | 'productCategory' | 'averageProductWeight' | 'merchantPaysOffset' | 'calculateOffset' | 'flatRateOffsetAmount' | 'createdAt' | 'updatedAt' | 'billingId' | 'shopifyProductId' | 'appEnabledOnStorefront' | 'billingActive' | 'completedInstallation' | 'previewMode'>
    )> }
  )> }
);

export type GetAllShopOffsetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllShopOffsetsQuery = (
  { __typename?: 'Query' }
  & { allShopOffsets: (
    { __typename?: 'AllShopOffsetsResponse' }
    & Pick<AllShopOffsetsResponse, 'lastWeekWeight' | 'lastMonthWeight' | 'lastYearWeight'>
    & { monthlyWeight: Array<(
      { __typename?: 'MonthlyWeight' }
      & Pick<MonthlyWeight, 'month' | 'weight'>
    )> }
  ) }
);

export type AppShopQueryVariables = Exact<{
  shop: Scalars['String'];
}>;


export type AppShopQuery = (
  { __typename?: 'Query' }
  & { getShop?: Maybe<(
    { __typename?: 'ShopResponse' }
    & { shop?: Maybe<(
      { __typename?: 'Shop' }
      & Pick<Shop, 'id' | 'shop' | 'email' | 'completedOnboarding' | 'companyName' | 'companySize' | 'managerName' | 'productCategory' | 'averageProductWeight' | 'merchantPaysOffset' | 'calculateOffset' | 'flatRateOffsetAmount' | 'createdAt' | 'updatedAt' | 'billingId' | 'shopifyProductId' | 'appEnabledOnStorefront' | 'billingActive' | 'completedInstallation' | 'previewMode'>
    )> }
  )> }
);

export type BillingRedirectQueryVariables = Exact<{
  shop: Scalars['String'];
}>;


export type BillingRedirectQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'createBillingRedirect'>
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type CalculateOffsetQueryVariables = Exact<{
  shop: Scalars['String'];
  weight: Scalars['String'];
  distance: Scalars['String'];
}>;


export type CalculateOffsetQuery = (
  { __typename?: 'Query' }
  & { calculateOffset: (
    { __typename?: 'OffsetCalculationResponse' }
    & Pick<OffsetCalculationResponse, 'value' | 'variantId' | 'offsetWeight'>
  ) }
);



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AllShopOffsetsResponse: ResolverTypeWrapper<AllShopOffsetsResponse>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  BillingRedirectInput: BillingRedirectInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  CreateShopInput: CreateShopInput;
  DeleteShopInput: DeleteShopInput;
  GetShopInput: GetShopInput;
  MonthlyWeight: ResolverTypeWrapper<MonthlyWeight>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  OffsetCalculationInput: OffsetCalculationInput;
  OffsetCalculationResponse: ResolverTypeWrapper<OffsetCalculationResponse>;
  OffsetRecordInput: OffsetRecordInput;
  Query: ResolverTypeWrapper<{}>;
  RecordOrderOptions: RecordOrderOptions;
  Shop: ResolverTypeWrapper<Shop>;
  ShopResponse: ResolverTypeWrapper<ShopResponse>;
  UpdateShopInput: UpdateShopInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AllShopOffsetsResponse: AllShopOffsetsResponse;
  Float: Scalars['Float'];
  BillingRedirectInput: BillingRedirectInput;
  String: Scalars['String'];
  CreateShopInput: CreateShopInput;
  DeleteShopInput: DeleteShopInput;
  GetShopInput: GetShopInput;
  MonthlyWeight: MonthlyWeight;
  Mutation: {};
  Boolean: Scalars['Boolean'];
  OffsetCalculationInput: OffsetCalculationInput;
  OffsetCalculationResponse: OffsetCalculationResponse;
  OffsetRecordInput: OffsetRecordInput;
  Query: {};
  RecordOrderOptions: RecordOrderOptions;
  Shop: Shop;
  ShopResponse: ShopResponse;
  UpdateShopInput: UpdateShopInput;
};

export type AllShopOffsetsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AllShopOffsetsResponse'] = ResolversParentTypes['AllShopOffsetsResponse']> = {
  lastWeekWeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lastMonthWeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lastYearWeight?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  monthlyWeight?: Resolver<Array<ResolversTypes['MonthlyWeight']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MonthlyWeightResolvers<ContextType = any, ParentType extends ResolversParentTypes['MonthlyWeight'] = ResolversParentTypes['MonthlyWeight']> = {
  month?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  register?: Resolver<ResolversTypes['ShopResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'options'>>;
  updateShop?: Resolver<ResolversTypes['ShopResponse'], ParentType, ContextType, RequireFields<MutationUpdateShopArgs, 'options'>>;
  deleteShop?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteShopArgs, 'options'>>;
  recordOffset?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRecordOffsetArgs, 'options'>>;
  recordOrder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRecordOrderArgs, 'options'>>;
};

export type OffsetCalculationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OffsetCalculationResponse'] = ResolversParentTypes['OffsetCalculationResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  offsetWeight?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  variantId?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  getShop?: Resolver<Maybe<ResolversTypes['ShopResponse']>, ParentType, ContextType, RequireFields<QueryGetShopArgs, 'options'>>;
  createBillingRedirect?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<QueryCreateBillingRedirectArgs, 'options'>>;
  allShopOffsets?: Resolver<ResolversTypes['AllShopOffsetsResponse'], ParentType, ContextType>;
  calculateOffset?: Resolver<ResolversTypes['OffsetCalculationResponse'], ParentType, ContextType, RequireFields<QueryCalculateOffsetArgs, 'options'>>;
};

export type ShopResolvers<ContextType = any, ParentType extends ResolversParentTypes['Shop'] = ResolversParentTypes['Shop']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shop?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  scope?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shopType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shopKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  managerName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companySize?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productCategory?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  averageProductWeight?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  merchantPaysOffset?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  calculateOffset?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  flatRateOffsetAmount?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedOnboarding?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  appEnabledOnStorefront?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  neutrlCoversOffset?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  previewMode?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  shopifyProductId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billingId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  billingActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  completedInstallation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ShopResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ShopResponse'] = ResolversParentTypes['ShopResponse']> = {
  shop?: Resolver<Maybe<ResolversTypes['Shop']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AllShopOffsetsResponse?: AllShopOffsetsResponseResolvers<ContextType>;
  MonthlyWeight?: MonthlyWeightResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OffsetCalculationResponse?: OffsetCalculationResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Shop?: ShopResolvers<ContextType>;
  ShopResponse?: ShopResponseResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;


export const DeleteShopDocument = gql`
    mutation DeleteShop($shop: String!) {
  deleteShop(options: {shop: $shop})
}
    `;
export type DeleteShopMutationFn = Apollo.MutationFunction<DeleteShopMutation, DeleteShopMutationVariables>;

/**
 * __useDeleteShopMutation__
 *
 * To run a mutation, you first call `useDeleteShopMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShopMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShopMutation, { data, loading, error }] = useDeleteShopMutation({
 *   variables: {
 *      shop: // value for 'shop'
 *   },
 * });
 */
export function useDeleteShopMutation(baseOptions?: Apollo.MutationHookOptions<DeleteShopMutation, DeleteShopMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteShopMutation, DeleteShopMutationVariables>(DeleteShopDocument, options);
      }
export type DeleteShopMutationHookResult = ReturnType<typeof useDeleteShopMutation>;
export type DeleteShopMutationResult = Apollo.MutationResult<DeleteShopMutation>;
export type DeleteShopMutationOptions = Apollo.BaseMutationOptions<DeleteShopMutation, DeleteShopMutationVariables>;
export const RecordOrderOffsetDocument = gql`
    mutation RecordOrderOffset($shop: String!, $value: Float!, $weight: Float!, $orderId: String!) {
  recordOffset(
    options: {shop: $shop, value: $value, weight: $weight, orderId: $orderId}
  )
}
    `;
export type RecordOrderOffsetMutationFn = Apollo.MutationFunction<RecordOrderOffsetMutation, RecordOrderOffsetMutationVariables>;

/**
 * __useRecordOrderOffsetMutation__
 *
 * To run a mutation, you first call `useRecordOrderOffsetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecordOrderOffsetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recordOrderOffsetMutation, { data, loading, error }] = useRecordOrderOffsetMutation({
 *   variables: {
 *      shop: // value for 'shop'
 *      value: // value for 'value'
 *      weight: // value for 'weight'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useRecordOrderOffsetMutation(baseOptions?: Apollo.MutationHookOptions<RecordOrderOffsetMutation, RecordOrderOffsetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecordOrderOffsetMutation, RecordOrderOffsetMutationVariables>(RecordOrderOffsetDocument, options);
      }
export type RecordOrderOffsetMutationHookResult = ReturnType<typeof useRecordOrderOffsetMutation>;
export type RecordOrderOffsetMutationResult = Apollo.MutationResult<RecordOrderOffsetMutation>;
export type RecordOrderOffsetMutationOptions = Apollo.BaseMutationOptions<RecordOrderOffsetMutation, RecordOrderOffsetMutationVariables>;
export const RecordOrderDocument = gql`
    mutation RecordOrder($shop: String!, $orderInfo: String!) {
  recordOrder(options: {shop: $shop, orderInfo: $orderInfo})
}
    `;
export type RecordOrderMutationFn = Apollo.MutationFunction<RecordOrderMutation, RecordOrderMutationVariables>;

/**
 * __useRecordOrderMutation__
 *
 * To run a mutation, you first call `useRecordOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecordOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recordOrderMutation, { data, loading, error }] = useRecordOrderMutation({
 *   variables: {
 *      shop: // value for 'shop'
 *      orderInfo: // value for 'orderInfo'
 *   },
 * });
 */
export function useRecordOrderMutation(baseOptions?: Apollo.MutationHookOptions<RecordOrderMutation, RecordOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecordOrderMutation, RecordOrderMutationVariables>(RecordOrderDocument, options);
      }
export type RecordOrderMutationHookResult = ReturnType<typeof useRecordOrderMutation>;
export type RecordOrderMutationResult = Apollo.MutationResult<RecordOrderMutation>;
export type RecordOrderMutationOptions = Apollo.BaseMutationOptions<RecordOrderMutation, RecordOrderMutationVariables>;
export const RegisterDocument = gql`
    mutation register($shop: String!, $shopKey: String!, $scope: String!, $billingId: String!) {
  register(
    options: {shop: $shop, shopKey: $shopKey, scope: $scope, billingId: $billingId}
  ) {
    shop {
      id
      shop
      scope
      shopKey
      createdAt
      updatedAt
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      shop: // value for 'shop'
 *      shopKey: // value for 'shopKey'
 *      scope: // value for 'scope'
 *      billingId: // value for 'billingId'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateShopDocument = gql`
    mutation UpdateShop($companyName: String, $managerName: String, $companySize: String, $productCategory: String, $averageProductWeight: String, $merchantPaysOffset: Boolean, $calculateOffset: Boolean, $flatRateOffsetAmount: String, $completedOnboarding: Boolean, $billingId: String, $appEnabledOnStorefront: Boolean, $billingActive: Boolean, $completedInstallation: Boolean, $previewMode: Boolean) {
  updateShop(
    options: {companyName: $companyName, managerName: $managerName, companySize: $companySize, productCategory: $productCategory, averageProductWeight: $averageProductWeight, merchantPaysOffset: $merchantPaysOffset, calculateOffset: $calculateOffset, flatRateOffsetAmount: $flatRateOffsetAmount, completedOnboarding: $completedOnboarding, billingId: $billingId, appEnabledOnStorefront: $appEnabledOnStorefront, billingActive: $billingActive, completedInstallation: $completedInstallation, previewMode: $previewMode}
  ) {
    shop {
      shop
      createdAt
      updatedAt
      companyName
      billingActive
      appEnabledOnStorefront
      completedInstallation
      completedOnboarding
      previewMode
    }
  }
}
    `;
export type UpdateShopMutationFn = Apollo.MutationFunction<UpdateShopMutation, UpdateShopMutationVariables>;

/**
 * __useUpdateShopMutation__
 *
 * To run a mutation, you first call `useUpdateShopMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShopMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShopMutation, { data, loading, error }] = useUpdateShopMutation({
 *   variables: {
 *      companyName: // value for 'companyName'
 *      managerName: // value for 'managerName'
 *      companySize: // value for 'companySize'
 *      productCategory: // value for 'productCategory'
 *      averageProductWeight: // value for 'averageProductWeight'
 *      merchantPaysOffset: // value for 'merchantPaysOffset'
 *      calculateOffset: // value for 'calculateOffset'
 *      flatRateOffsetAmount: // value for 'flatRateOffsetAmount'
 *      completedOnboarding: // value for 'completedOnboarding'
 *      billingId: // value for 'billingId'
 *      appEnabledOnStorefront: // value for 'appEnabledOnStorefront'
 *      billingActive: // value for 'billingActive'
 *      completedInstallation: // value for 'completedInstallation'
 *      previewMode: // value for 'previewMode'
 *   },
 * });
 */
export function useUpdateShopMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShopMutation, UpdateShopMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShopMutation, UpdateShopMutationVariables>(UpdateShopDocument, options);
      }
export type UpdateShopMutationHookResult = ReturnType<typeof useUpdateShopMutation>;
export type UpdateShopMutationResult = Apollo.MutationResult<UpdateShopMutation>;
export type UpdateShopMutationOptions = Apollo.BaseMutationOptions<UpdateShopMutation, UpdateShopMutationVariables>;
export const AdminShopDocument = gql`
    query AdminShop($shop: String!) {
  getShop(options: {shop: $shop}) {
    shop {
      id
      shop
      scope
      shopKey
      email
      completedOnboarding
      companyName
      companySize
      managerName
      productCategory
      averageProductWeight
      merchantPaysOffset
      calculateOffset
      flatRateOffsetAmount
      createdAt
      updatedAt
      billingId
      shopifyProductId
      appEnabledOnStorefront
      billingActive
      completedInstallation
      previewMode
    }
  }
}
    `;

/**
 * __useAdminShopQuery__
 *
 * To run a query within a React component, call `useAdminShopQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminShopQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminShopQuery({
 *   variables: {
 *      shop: // value for 'shop'
 *   },
 * });
 */
export function useAdminShopQuery(baseOptions: Apollo.QueryHookOptions<AdminShopQuery, AdminShopQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminShopQuery, AdminShopQueryVariables>(AdminShopDocument, options);
      }
export function useAdminShopLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminShopQuery, AdminShopQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminShopQuery, AdminShopQueryVariables>(AdminShopDocument, options);
        }
export type AdminShopQueryHookResult = ReturnType<typeof useAdminShopQuery>;
export type AdminShopLazyQueryHookResult = ReturnType<typeof useAdminShopLazyQuery>;
export type AdminShopQueryResult = Apollo.QueryResult<AdminShopQuery, AdminShopQueryVariables>;
export const GetAllShopOffsetsDocument = gql`
    query GetAllShopOffsets {
  allShopOffsets {
    lastWeekWeight
    lastMonthWeight
    lastYearWeight
    monthlyWeight {
      month
      weight
    }
  }
}
    `;

/**
 * __useGetAllShopOffsetsQuery__
 *
 * To run a query within a React component, call `useGetAllShopOffsetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllShopOffsetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllShopOffsetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllShopOffsetsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllShopOffsetsQuery, GetAllShopOffsetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllShopOffsetsQuery, GetAllShopOffsetsQueryVariables>(GetAllShopOffsetsDocument, options);
      }
export function useGetAllShopOffsetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllShopOffsetsQuery, GetAllShopOffsetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllShopOffsetsQuery, GetAllShopOffsetsQueryVariables>(GetAllShopOffsetsDocument, options);
        }
export type GetAllShopOffsetsQueryHookResult = ReturnType<typeof useGetAllShopOffsetsQuery>;
export type GetAllShopOffsetsLazyQueryHookResult = ReturnType<typeof useGetAllShopOffsetsLazyQuery>;
export type GetAllShopOffsetsQueryResult = Apollo.QueryResult<GetAllShopOffsetsQuery, GetAllShopOffsetsQueryVariables>;
export const AppShopDocument = gql`
    query AppShop($shop: String!) {
  getShop(options: {shop: $shop}) {
    shop {
      id
      shop
      email
      completedOnboarding
      companyName
      companySize
      managerName
      productCategory
      averageProductWeight
      merchantPaysOffset
      calculateOffset
      flatRateOffsetAmount
      createdAt
      updatedAt
      billingId
      shopifyProductId
      appEnabledOnStorefront
      billingActive
      completedInstallation
      previewMode
    }
  }
}
    `;

/**
 * __useAppShopQuery__
 *
 * To run a query within a React component, call `useAppShopQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppShopQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppShopQuery({
 *   variables: {
 *      shop: // value for 'shop'
 *   },
 * });
 */
export function useAppShopQuery(baseOptions: Apollo.QueryHookOptions<AppShopQuery, AppShopQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppShopQuery, AppShopQueryVariables>(AppShopDocument, options);
      }
export function useAppShopLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppShopQuery, AppShopQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppShopQuery, AppShopQueryVariables>(AppShopDocument, options);
        }
export type AppShopQueryHookResult = ReturnType<typeof useAppShopQuery>;
export type AppShopLazyQueryHookResult = ReturnType<typeof useAppShopLazyQuery>;
export type AppShopQueryResult = Apollo.QueryResult<AppShopQuery, AppShopQueryVariables>;
export const BillingRedirectDocument = gql`
    query BillingRedirect($shop: String!) {
  createBillingRedirect(options: {shop: $shop})
}
    `;

/**
 * __useBillingRedirectQuery__
 *
 * To run a query within a React component, call `useBillingRedirectQuery` and pass it any options that fit your needs.
 * When your component renders, `useBillingRedirectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBillingRedirectQuery({
 *   variables: {
 *      shop: // value for 'shop'
 *   },
 * });
 */
export function useBillingRedirectQuery(baseOptions: Apollo.QueryHookOptions<BillingRedirectQuery, BillingRedirectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BillingRedirectQuery, BillingRedirectQueryVariables>(BillingRedirectDocument, options);
      }
export function useBillingRedirectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BillingRedirectQuery, BillingRedirectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BillingRedirectQuery, BillingRedirectQueryVariables>(BillingRedirectDocument, options);
        }
export type BillingRedirectQueryHookResult = ReturnType<typeof useBillingRedirectQuery>;
export type BillingRedirectLazyQueryHookResult = ReturnType<typeof useBillingRedirectLazyQuery>;
export type BillingRedirectQueryResult = Apollo.QueryResult<BillingRedirectQuery, BillingRedirectQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const CalculateOffsetDocument = gql`
    query CalculateOffset($shop: String!, $weight: String!, $distance: String!) {
  calculateOffset(options: {shop: $shop, weight: $weight, distance: $distance}) {
    value
    variantId
    offsetWeight
  }
}
    `;

/**
 * __useCalculateOffsetQuery__
 *
 * To run a query within a React component, call `useCalculateOffsetQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalculateOffsetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalculateOffsetQuery({
 *   variables: {
 *      shop: // value for 'shop'
 *      weight: // value for 'weight'
 *      distance: // value for 'distance'
 *   },
 * });
 */
export function useCalculateOffsetQuery(baseOptions: Apollo.QueryHookOptions<CalculateOffsetQuery, CalculateOffsetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CalculateOffsetQuery, CalculateOffsetQueryVariables>(CalculateOffsetDocument, options);
      }
export function useCalculateOffsetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CalculateOffsetQuery, CalculateOffsetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CalculateOffsetQuery, CalculateOffsetQueryVariables>(CalculateOffsetDocument, options);
        }
export type CalculateOffsetQueryHookResult = ReturnType<typeof useCalculateOffsetQuery>;
export type CalculateOffsetLazyQueryHookResult = ReturnType<typeof useCalculateOffsetLazyQuery>;
export type CalculateOffsetQueryResult = Apollo.QueryResult<CalculateOffsetQuery, CalculateOffsetQueryVariables>;