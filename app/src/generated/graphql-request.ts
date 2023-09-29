import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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


export const DeleteShopDocument = gql`
    mutation DeleteShop($shop: String!) {
  deleteShop(options: {shop: $shop})
}
    `;
export const RecordOrderOffsetDocument = gql`
    mutation RecordOrderOffset($shop: String!, $value: Float!, $weight: Float!, $orderId: String!) {
  recordOffset(
    options: {shop: $shop, value: $value, weight: $weight, orderId: $orderId}
  )
}
    `;
export const RecordOrderDocument = gql`
    mutation RecordOrder($shop: String!, $orderInfo: String!) {
  recordOrder(options: {shop: $shop, orderInfo: $orderInfo})
}
    `;
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
export const BillingRedirectDocument = gql`
    query BillingRedirect($shop: String!) {
  createBillingRedirect(options: {shop: $shop})
}
    `;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;
export const CalculateOffsetDocument = gql`
    query CalculateOffset($shop: String!, $weight: String!, $distance: String!) {
  calculateOffset(options: {shop: $shop, weight: $weight, distance: $distance}) {
    value
    variantId
    offsetWeight
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = sdkFunction => sdkFunction();
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    DeleteShop(variables: DeleteShopMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteShopMutation> {
      return withWrapper(() => client.request<DeleteShopMutation>(DeleteShopDocument, variables, requestHeaders));
    },
    RecordOrderOffset(variables: RecordOrderOffsetMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RecordOrderOffsetMutation> {
      return withWrapper(() => client.request<RecordOrderOffsetMutation>(RecordOrderOffsetDocument, variables, requestHeaders));
    },
    RecordOrder(variables: RecordOrderMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RecordOrderMutation> {
      return withWrapper(() => client.request<RecordOrderMutation>(RecordOrderDocument, variables, requestHeaders));
    },
    register(variables: RegisterMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RegisterMutation> {
      return withWrapper(() => client.request<RegisterMutation>(RegisterDocument, variables, requestHeaders));
    },
    UpdateShop(variables?: UpdateShopMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateShopMutation> {
      return withWrapper(() => client.request<UpdateShopMutation>(UpdateShopDocument, variables, requestHeaders));
    },
    AdminShop(variables: AdminShopQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AdminShopQuery> {
      return withWrapper(() => client.request<AdminShopQuery>(AdminShopDocument, variables, requestHeaders));
    },
    GetAllShopOffsets(variables?: GetAllShopOffsetsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetAllShopOffsetsQuery> {
      return withWrapper(() => client.request<GetAllShopOffsetsQuery>(GetAllShopOffsetsDocument, variables, requestHeaders));
    },
    AppShop(variables: AppShopQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AppShopQuery> {
      return withWrapper(() => client.request<AppShopQuery>(AppShopDocument, variables, requestHeaders));
    },
    BillingRedirect(variables: BillingRedirectQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<BillingRedirectQuery> {
      return withWrapper(() => client.request<BillingRedirectQuery>(BillingRedirectDocument, variables, requestHeaders));
    },
    Hello(variables?: HelloQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<HelloQuery> {
      return withWrapper(() => client.request<HelloQuery>(HelloDocument, variables, requestHeaders));
    },
    CalculateOffset(variables: CalculateOffsetQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CalculateOffsetQuery> {
      return withWrapper(() => client.request<CalculateOffsetQuery>(CalculateOffsetDocument, variables, requestHeaders));
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;