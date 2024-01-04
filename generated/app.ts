import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
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
  Date: any;
};

export type AnalyticsSearch = {
  searchWords: Scalars['String'];
  tag: Scalars['String'];
};

export type Business = {
  bizBusinessID: Scalars['String'];
  bizClaim?: Maybe<Scalars['Int']>;
  bizIsVerified?: Maybe<Scalars['Int']>;
  bizName: Scalars['String'];
  bizSlug: Scalars['String'];
  contact?: Maybe<Contact>;
  mdaLocalFileName?: Maybe<Scalars['String']>;
  plType?: Maybe<Scalars['String']>;
  rvwCount?: Maybe<Scalars['Int']>;
  isOpen?: Maybe<Scalars['Boolean']>;
  rvwScoreAvg?: Maybe<Scalars['Float']>;
};

export type BusinessDeals = {
  /** @deprecated bizName is deprecated. Use business[0] instead. */
  bizName: Scalars['String'];
  business: Array<Business>;
  dlsApplyTo?: Maybe<Scalars['String']>;
  dlsCouponCode?: Maybe<Scalars['String']>;
  dlsCreationDate?: Maybe<Scalars['Date']>;
  dlsDealsID: Scalars['String'];
  dlsDescription?: Maybe<Scalars['String']>;
  dlsExpireDate?: Maybe<Scalars['Date']>;
  dlsExpireDateToronto?: Maybe<Scalars['Date']>;
  dlsInstructions?: Maybe<Scalars['String']>;
  dlsName: Scalars['String'];
  dlsPublishDate?: Maybe<Scalars['Date']>;
  dlsSlug: Scalars['String'];
  dlsStatus?: Maybe<Scalars['Boolean']>;
  dlsUrl?: Maybe<Scalars['String']>;
  mdaLocalFileName?: Maybe<Scalars['String']>;
};


export type BusinessDealsBusinessArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type Contact = {
  bizChat?: Maybe<Scalars['String']>;
  bizEmailAddress?: Maybe<Scalars['String']>;
  bizIntersection?: Maybe<Scalars['String']>;
  bizLatitude?: Maybe<Scalars['Float']>;
  bizLongitude?: Maybe<Scalars['Float']>;
  bizPhone?: Maybe<Scalars['String']>;
  bizPostal?: Maybe<Scalars['String']>;
  bizRegionID?: Maybe<Scalars['String']>;
  bizStreetAddress?: Maybe<Scalars['String']>;
  bizText?: Maybe<Scalars['String']>;
  bizWebsiteURL?: Maybe<Scalars['String']>;
  linkContactMethod?: Maybe<Array<Maybe<Scalars['String']>>>;
  plCountryID?: Maybe<Scalars['Int']>;
  plProvinceID?: Maybe<Scalars['Int']>;
  plProvinceIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  provinceInitial?: Maybe<Scalars['String']>;
  provinceInitials?: Maybe<Scalars['String']>;
  provinceName?: Maybe<Scalars['String']>;
  provinceNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  regionName?: Maybe<Scalars['String']>;
  regionSlug?: Maybe<Scalars['String']>;
};

export type Country = {
  plCountryID: Scalars['Int'];
  plCountryName: Scalars['String'];
  plCountrySlug: Scalars['String'];
};

export type CurrentUser = {
  accountManager?: Maybe<User>;
  availableClaim?: Maybe<Scalars['Boolean']>;
  email: Scalars['String'];
  email_verified_at?: Maybe<Scalars['Date']>;
  mailPreferences?: Maybe<Array<Maybe<Scalars['String']>>>;
  userRoles?: Maybe<Array<Maybe<Scalars['String']>>>;
  username: Scalars['String'];
  usrBirthDate?: Maybe<Scalars['Date']>;
  usrCreationDate?: Maybe<Scalars['Date']>;
  usrFirstName?: Maybe<Scalars['String']>;
  usrLastLoginDate?: Maybe<Scalars['Date']>;
  usrLastModifiedDate?: Maybe<Scalars['Date']>;
  usrLastName?: Maybe<Scalars['String']>;
  usrLocationLatitude?: Maybe<Scalars['String']>;
  usrLocationLongitude?: Maybe<Scalars['String']>;
  usrProvinceID?: Maybe<Scalars['String']>;
  usrRegionID?: Maybe<Scalars['String']>;
  usrSubscription?: Maybe<Scalars['Int']>;
  usrUserID: Scalars['String'];
};


export type List = {
  business?: Maybe<Array<Business>>;
  businessPagination?: Maybe<Pagination>;
  deals?: Maybe<Array<BusinessDeals>>;
  dealsPagination?: Maybe<Pagination>;
  productGenetics?: Maybe<Array<Maybe<Scalars['String']>>>;
  productTypes?: Maybe<Array<Maybe<ProductType>>>;
  products?: Maybe<Array<Product>>;
  productsPagination?: Maybe<Pagination>;
};

export type Location = {
  provinces?: Maybe<Array<Province>>;
  regions?: Maybe<Array<Region>>;
};

export type Mutation = {
  analyticsSaveSearch?: Maybe<Scalars['Boolean']>;
};


export type MutationAnalyticsSaveSearchArgs = {
  input?: Maybe<AnalyticsSearch>;
};

export type Pagination = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Product = {
  business: Array<Business>;
  mdaLocalFileName?: Maybe<Scalars['String']>;
  plSlugType?: Maybe<Scalars['String']>;
  prdCBDPercentage?: Maybe<Scalars['String']>;
  prdInStock?: Maybe<Scalars['Boolean']>;
  prdInStockForBrand?: Maybe<Scalars['Int']>;
  prdName: Scalars['String'];
  prdPriceEighthOunce?: Maybe<Scalars['Float']>;
  prdPriceHalfGram?: Maybe<Scalars['Float']>;
  prdPriceHalfOunce?: Maybe<Scalars['Float']>;
  prdPriceOneGram?: Maybe<Scalars['Float']>;
  prdPriceOneOunce?: Maybe<Scalars['Float']>;
  prdPricePerUnit?: Maybe<Scalars['Float']>;
  prdPriceQuarterOunce?: Maybe<Scalars['Float']>;
  prdPriceTwoGrams?: Maybe<Scalars['Float']>;
  prdProductCategories?: Maybe<Scalars['String']>;
  prdProductID: Scalars['String'];
  prdProductTypes?: Maybe<Scalars['String']>;
  prdPublishDate?: Maybe<Scalars['Date']>;
  prdSlug: Scalars['String'];
  prdStatus?: Maybe<Scalars['String']>;
  prdTHCPercentage?: Maybe<Scalars['String']>;
  rvwCount?: Maybe<Scalars['Int']>;
  rvwScoreAvg?: Maybe<Scalars['Float']>;
};


export type ProductBusinessArgs = {
  latitudeFront?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Int']>;
  longitudeFront?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Int']>;
  regionID?: Maybe<Scalars['Int']>;
};

export type ProductType = {
  amountSpent?: Maybe<Scalars['Float']>;
  available?: Maybe<Scalars['Boolean']>;
  businessCounter?: Maybe<Scalars['Int']>;
  categoriesItems?: Maybe<Array<Maybe<ProductType>>>;
  counter?: Maybe<Scalars['Int']>;
  engagements?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
  parentBusinessId?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  totalImpressions?: Maybe<Scalars['Int']>;
  typeItems?: Maybe<Array<Maybe<ProductType>>>;
  typeParent?: Maybe<Scalars['String']>;
  typeParentName?: Maybe<Array<Maybe<Scalars['String']>>>;
  typePriceBrand?: Maybe<Scalars['Float']>;
  typePriceDelivery?: Maybe<Scalars['Float']>;
  typePriceDispensary?: Maybe<Scalars['Float']>;
  typePriceMail?: Maybe<Scalars['Float']>;
};

export type Province = {
  country: Country;
  plCountryID: Scalars['String'];
  plDescription?: Maybe<Scalars['String']>;
  plInitials: Scalars['String'];
  plName: Scalars['String'];
  plProvinceID: Scalars['Int'];
};

export type Query = {
  currentUser?: Maybe<CurrentUser>;
  locationListProvinceForUser: Array<Maybe<Province>>;
  locationListRegionByProvinceForUser: Array<Region>;
  locationSearchRegion: Array<Region>;
  locationListRegion: Array<Region>;
  userRegion?: Maybe<Region>;
  userRegionCountry?: Maybe<Scalars['String']>;
  locationFooterPosition: Array<Region>;
  productListTypes: List;
  strainNameSearch: Array<Maybe<ProductType>>;
  busProdDealSearchByName: List;
  reportIssue: Scalars['Boolean'];
};


export type QueryLocationListRegionByProvinceForUserArgs = {
  provinceId: Scalars['Int'];
};


export type QueryLocationSearchRegionArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  sortPopular?: Maybe<Scalars['Boolean']>;
};


export type QueryLocationListRegionArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
  showAll?: Maybe<Scalars['Boolean']>;
  sortPopular?: Maybe<Scalars['Boolean']>;
};


export type QueryUserRegionArgs = {
  clientIp?: Maybe<Scalars['String']>;
};


export type QueryUserRegionCountryArgs = {
  clientIp?: Maybe<Scalars['String']>;
};


export type QueryProductListTypesArgs = {
  brandFilter?: Maybe<Scalars['Boolean']>;
  strainNameFilter?: Maybe<Scalars['Boolean']>;
  businessType?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryStrainNameSearchArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  strainName: Scalars['String'];
};


export type QueryBusProdDealSearchByNameArgs = {
  countryId?: Maybe<Scalars['Int']>;
  isGlobalSearch?: Maybe<Scalars['Boolean']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Int']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  plRegionID?: Maybe<Scalars['Int']>;
  prdGenetics?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
  prdProductType?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
  showBrand?: Maybe<Scalars['Boolean']>;
  showPagination?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
  type?: Maybe<Scalars['String']>;
  withPrice?: Maybe<Scalars['Boolean']>;
};


export type QueryReportIssueArgs = {
  city: Scalars['String'];
  description: Scalars['String'];
  emailFrom: Scalars['String'];
  name: Scalars['String'];
  originalPage?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['String']>;
  province: Scalars['String'];
  regionID: Scalars['String'];
  stepsReproduce?: Maybe<Scalars['String']>;
};

export type Region = {
  bizCount?: Maybe<Scalars['Int']>;
  mdaLocalFileName?: Maybe<Scalars['String']>;
  plDescription?: Maybe<Scalars['String']>;
  plDescription2?: Maybe<Scalars['String']>;
  plFooterPosition?: Maybe<Scalars['Int']>;
  plLatitude?: Maybe<Scalars['Float']>;
  plLongitude?: Maybe<Scalars['Float']>;
  plName: Scalars['String'];
  plNeighbourhood?: Maybe<Scalars['String']>;
  plProvinceID: Scalars['Int'];
  plRegionID: Scalars['Int'];
  plSlug: Scalars['String'];
  province: Province;
};

export type User = {
  accountManager?: Maybe<User>;
  bizCount?: Maybe<Scalars['Int']>;
  bizName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_verified_at?: Maybe<Scalars['Date']>;
  mailPreferences?: Maybe<Array<Maybe<Scalars['String']>>>;
  province?: Maybe<Province>;
  region?: Maybe<Region>;
  rvwCount?: Maybe<Scalars['Int']>;
  userRoles?: Maybe<Array<Maybe<Scalars['String']>>>;
  username?: Maybe<Scalars['String']>;
  usrBirthDate?: Maybe<Scalars['Date']>;
  usrCreationDate?: Maybe<Scalars['Date']>;
  usrFirstName?: Maybe<Scalars['String']>;
  usrLastLoginDate?: Maybe<Scalars['Date']>;
  usrLastName?: Maybe<Scalars['String']>;
  usrProvinceID?: Maybe<Scalars['String']>;
  usrRegionID?: Maybe<Scalars['String']>;
  usrRegistrationIP?: Maybe<Scalars['String']>;
  usrSubscription?: Maybe<Scalars['Int']>;
  usrUserID?: Maybe<Scalars['String']>;
};


export type UserBizCountArgs = {
  published?: Maybe<Scalars['Boolean']>;
};

export type AnalyticsSaveSearchMutationVariables = Exact<{
  input?: Maybe<AnalyticsSearch>;
}>;


export type AnalyticsSaveSearchMutation = { analyticsSaveSearch?: Maybe<boolean> };

export type ReportIssueQueryVariables = Exact<{
  name: Scalars['String'];
  emailFrom: Scalars['String'];
  description: Scalars['String'];
  city: Scalars['String'];
  regionID: Scalars['String'];
  province: Scalars['String'];
  stepsReproduce: Scalars['String'];
  page: Scalars['String'];
  originalPage?: Maybe<Scalars['String']>;
}>;


export type ReportIssueQuery = { reportIssue: boolean };

export type ProvinceItemFragment = { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } };

export type LocationItemFragment = { plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } };

export type LocationAllListProvinceForUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationAllListProvinceForUserQuery = { locationListProvinceForUser: Array<Maybe<{ plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } }>> };

export type LocationListRegionByProvinceForUserQueryVariables = Exact<{
  provinceId: Scalars['Int'];
}>;


export type LocationListRegionByProvinceForUserQuery = { locationListRegionByProvinceForUser: Array<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type LocationListRegionQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
  sortPopular?: Maybe<Scalars['Boolean']>;
}>;


export type LocationListRegionQuery = { locationListRegion: Array<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type LocationSearchRegionQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type LocationSearchRegionQuery = { locationSearchRegion: Array<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type UserRegionQueryVariables = Exact<{
  clientIp?: Maybe<Scalars['String']>;
}>;


export type UserRegionQuery = { userRegion?: Maybe<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type LocationFooterPositionQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationFooterPositionQuery = { locationFooterPosition: Array<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type UserRegionCountryQueryVariables = Exact<{
  clientIp?: Maybe<Scalars['String']>;
}>;


export type UserRegionCountryQuery = { userRegionCountry?: Maybe<string> };

export type ProductTypeItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductTypeItemsQuery = { productListTypes: { productTypes?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>> }>>> }>>> } };

export type ProductTypeStrainNameSearchQueryVariables = Exact<{
  strainName: Scalars['String'];
}>;


export type ProductTypeStrainNameSearchQuery = { strainNameSearch: Array<Maybe<{ slug?: Maybe<string>, name?: Maybe<string>, id?: Maybe<number> }>> };

export type SearchProductsQueryVariables = Exact<{
  withPrice?: Maybe<Scalars['Boolean']>;
  countryId?: Maybe<Scalars['Int']>;
  plRegionId?: Maybe<Scalars['Int']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  sort?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
  isGlobalSearch?: Maybe<Scalars['Boolean']>;
  search: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  productGenetics?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductType?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
}>;


export type SearchProductsQuery = { busProdDealSearchByName: { products?: Maybe<Array<{ mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock?: Maybe<boolean>, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes?: Maybe<string>, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, business: Array<{ bizName: string, bizSlug: string, plType?: Maybe<string>, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> }>> } };

export type SearchBusinessQueryVariables = Exact<{
  countryId?: Maybe<Scalars['Int']>;
  plRegionId?: Maybe<Scalars['Int']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  isGlobalSearch?: Maybe<Scalars['Boolean']>;
  search: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  productGenetics?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductType?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
}>;


export type SearchBusinessQuery = { busProdDealSearchByName: { business?: Maybe<Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType?: Maybe<string>, bizClaim?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, isOpen?: Maybe<boolean>, bizIsVerified?: Maybe<number>, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>> } };

export type SearchDealsQueryVariables = Exact<{
  countryId?: Maybe<Scalars['Int']>;
  plRegionId?: Maybe<Scalars['Int']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  isGlobalSearch?: Maybe<Scalars['Boolean']>;
  search: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  productGenetics?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductType?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
}>;


export type SearchDealsQuery = { busProdDealSearchByName: { deals?: Maybe<Array<{ dlsApplyTo?: Maybe<string>, dlsDealsID: string, dlsName: string, dlsSlug: string, mdaLocalFileName?: Maybe<string>, business: Array<{ bizBusinessID: string, plType?: Maybe<string>, bizName: string, bizSlug: string, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> }>> } };

export type SearchProductTypesQueryVariables = Exact<{
  withPrice?: Maybe<Scalars['Boolean']>;
  countryId?: Maybe<Scalars['Int']>;
  plRegionId?: Maybe<Scalars['Int']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  sort?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
  isGlobalSearch?: Maybe<Scalars['Boolean']>;
  search: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  productGenetics?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductType?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
}>;


export type SearchProductTypesQuery = { busProdDealSearchByName: { products?: Maybe<Array<{ prdSlug: string, prdProductID: string, prdName: string, prdProductTypes?: Maybe<string>, prdProductCategories?: Maybe<string> }>>, productTypes?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, counter?: Maybe<number>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, counter?: Maybe<number>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, counter?: Maybe<number>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, counter?: Maybe<number>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, counter?: Maybe<number>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, counter?: Maybe<number>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>> }>>> }>>> } };

export type SearchCountsQueryVariables = Exact<{
  countryId?: Maybe<Scalars['Int']>;
  plRegionId?: Maybe<Scalars['Int']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  sort?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
  isGlobalSearch?: Maybe<Scalars['Boolean']>;
  search: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  productGenetics?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductType?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
}>;


export type SearchCountsQuery = { busProdDealSearchByName: { productsPagination?: Maybe<{ totalCount?: Maybe<number> }>, businessPagination?: Maybe<{ totalCount?: Maybe<number> }>, dealsPagination?: Maybe<{ totalCount?: Maybe<number> }> } };

export type SearchSuggestBrandsQueryVariables = Exact<{
  search: Scalars['String'];
  countryId?: Maybe<Scalars['Int']>;
}>;


export type SearchSuggestBrandsQuery = { busProdDealSearchByName: { business?: Maybe<Array<{ plType?: Maybe<string>, bizName: string, bizSlug: string, bizBusinessID: string, mdaLocalFileName?: Maybe<string>, contact?: Maybe<{ regionSlug?: Maybe<string>, provinceInitial?: Maybe<string> }> }>> } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { currentUser?: Maybe<{ email: string, username: string, usrFirstName?: Maybe<string>, usrLastName?: Maybe<string>, usrUserID: string, email_verified_at?: Maybe<any>, userRoles?: Maybe<Array<Maybe<string>>>, usrSubscription?: Maybe<number> }> };

export const ProvinceItemFragmentDoc = gql`
    fragment ProvinceItem on Province {
  plProvinceID
  plName
  plInitials
  country {
    plCountryID
    plCountryName
    plCountrySlug
  }
}
    `;
export const LocationItemFragmentDoc = gql`
    fragment LocationItem on Region {
  plRegionID
  plProvinceID
  plName
  plSlug
  province {
    ...ProvinceItem
  }
  plLatitude
  plLongitude
}
    ${ProvinceItemFragmentDoc}`;
export const AnalyticsSaveSearchDocument = gql`
    mutation AnalyticsSaveSearch($input: AnalyticsSearch) {
  analyticsSaveSearch(input: $input)
}
    `;
export type AnalyticsSaveSearchMutationFn = ApolloReactCommon.MutationFunction<AnalyticsSaveSearchMutation, AnalyticsSaveSearchMutationVariables>;
export type AnalyticsSaveSearchMutationResult = ApolloReactCommon.MutationResult<AnalyticsSaveSearchMutation>;
export type AnalyticsSaveSearchMutationOptions = ApolloReactCommon.BaseMutationOptions<AnalyticsSaveSearchMutation, AnalyticsSaveSearchMutationVariables>;
export const ReportIssueDocument = gql`
    query ReportIssue($name: String!, $emailFrom: String!, $description: String!, $city: String!, $regionID: String!, $province: String!, $stepsReproduce: String!, $page: String!, $originalPage: String) {
  reportIssue(
    name: $name
    emailFrom: $emailFrom
    description: $description
    city: $city
    regionID: $regionID
    province: $province
    stepsReproduce: $stepsReproduce
    page: $page
    originalPage: $originalPage
  )
}
    `;
export type ReportIssueQueryResult = ApolloReactCommon.QueryResult<ReportIssueQuery, ReportIssueQueryVariables>;
export const LocationAllListProvinceForUserDocument = gql`
    query locationAllListProvinceForUser {
  locationListProvinceForUser {
    plProvinceID
    plName
    plInitials
    country {
      plCountryID
      plCountryName
      plCountrySlug
    }
  }
}
    `;
export type LocationAllListProvinceForUserQueryResult = ApolloReactCommon.QueryResult<LocationAllListProvinceForUserQuery, LocationAllListProvinceForUserQueryVariables>;
export const LocationListRegionByProvinceForUserDocument = gql`
    query locationListRegionByProvinceForUser($provinceId: Int!) {
  locationListRegionByProvinceForUser(provinceId: $provinceId) {
    plRegionID
    plProvinceID
    plName
    plSlug
    province {
      plProvinceID
      plName
      plInitials
      country {
        plCountryID
        plCountryName
        plCountrySlug
      }
    }
    plLatitude
    plLongitude
  }
}
    `;
export type LocationListRegionByProvinceForUserQueryResult = ApolloReactCommon.QueryResult<LocationListRegionByProvinceForUserQuery, LocationListRegionByProvinceForUserQueryVariables>;
export const LocationListRegionDocument = gql`
    query locationListRegion($offset: Int, $limit: Int, $plCountryID: Int, $sortPopular: Boolean) {
  locationListRegion(
    offset: $offset
    limit: $limit
    plCountryID: $plCountryID
    sortPopular: $sortPopular
  ) {
    plRegionID
    plProvinceID
    plName
    plSlug
    province {
      plProvinceID
      plName
      plInitials
      country {
        plCountryID
        plCountryName
        plCountrySlug
      }
    }
    plLatitude
    plLongitude
  }
}
    `;
export type LocationListRegionQueryResult = ApolloReactCommon.QueryResult<LocationListRegionQuery, LocationListRegionQueryVariables>;
export const LocationSearchRegionDocument = gql`
    query locationSearchRegion($search: String!) {
  locationSearchRegion(slug: $search) {
    plRegionID
    plProvinceID
    plName
    plSlug
    province {
      plProvinceID
      plName
      plInitials
      country {
        plCountryID
        plCountryName
        plCountrySlug
      }
    }
    plLatitude
    plLongitude
  }
}
    `;
export type LocationSearchRegionQueryResult = ApolloReactCommon.QueryResult<LocationSearchRegionQuery, LocationSearchRegionQueryVariables>;
export const UserRegionDocument = gql`
    query userRegion($clientIp: String) {
  userRegion(clientIp: $clientIp) {
    plRegionID
    plProvinceID
    plName
    plSlug
    province {
      plProvinceID
      plName
      plInitials
      country {
        plCountryID
        plCountryName
        plCountrySlug
      }
    }
    plLatitude
    plLongitude
  }
}
    `;
export type UserRegionQueryResult = ApolloReactCommon.QueryResult<UserRegionQuery, UserRegionQueryVariables>;
export const LocationFooterPositionDocument = gql`
    query locationFooterPosition {
  locationFooterPosition {
    ...LocationItem
  }
}
    ${LocationItemFragmentDoc}`;
export type LocationFooterPositionQueryResult = ApolloReactCommon.QueryResult<LocationFooterPositionQuery, LocationFooterPositionQueryVariables>;
export const UserRegionCountryDocument = gql`
    query userRegionCountry($clientIp: String) {
  userRegionCountry(clientIp: $clientIp)
}
    `;
export type UserRegionCountryQueryResult = ApolloReactCommon.QueryResult<UserRegionCountryQuery, UserRegionCountryQueryVariables>;
export const ProductTypeItemsDocument = gql`
    query productTypeItems {
  productListTypes(brandFilter: false, strainNameFilter: false) {
    productTypes {
      available
      name
      slug
      id
      categoriesItems {
        available
        name
        slug
        id
        categoriesItems {
          available
          name
          slug
          id
        }
      }
      typeItems {
        available
        name
        slug
        id
        categoriesItems {
          available
          name
          slug
          id
          categoriesItems {
            available
            name
            slug
            id
          }
        }
      }
    }
  }
}
    `;
export type ProductTypeItemsQueryResult = ApolloReactCommon.QueryResult<ProductTypeItemsQuery, ProductTypeItemsQueryVariables>;
export const ProductTypeStrainNameSearchDocument = gql`
    query productTypeStrainNameSearch($strainName: String!) {
  strainNameSearch(strainName: $strainName, offset: 0, limit: 50) {
    slug
    name
    id
  }
}
    `;
export type ProductTypeStrainNameSearchQueryResult = ApolloReactCommon.QueryResult<ProductTypeStrainNameSearchQuery, ProductTypeStrainNameSearchQueryVariables>;
export const SearchProductsDocument = gql`
    query searchProducts($withPrice: Boolean, $countryId: Int, $plRegionId: Int, $latitudeGPS: Float, $longitudeGPS: Float, $sort: [[String]], $isGlobalSearch: Boolean, $search: String!, $offset: Int, $limit: Int, $type: String, $productGenetics: [String], $prdProductType: [[String]], $prdProductCategories: [[String]]) {
  busProdDealSearchByName(
    withPrice: $withPrice
    countryId: $countryId
    plRegionID: $plRegionId
    latitudeGPS: $latitudeGPS
    longitudeGPS: $longitudeGPS
    sort: $sort
    isGlobalSearch: $isGlobalSearch
    offset: $offset
    limit: $limit
    name: $search
    type: $type
    prdGenetics: $productGenetics
    prdProductType: $prdProductType
    prdProductCategories: $prdProductCategories
  ) {
    products {
      mdaLocalFileName
      prdName
      prdInStock
      prdInStockForBrand
      prdPriceEighthOunce
      prdPriceHalfGram
      prdPriceHalfOunce
      prdPriceOneGram
      prdPriceOneOunce
      prdPricePerUnit
      prdPriceQuarterOunce
      prdPriceTwoGrams
      prdProductID
      prdProductTypes
      prdProductCategories
      prdCBDPercentage
      prdTHCPercentage
      prdSlug
      plSlugType
      rvwScoreAvg
      rvwCount
      prdStatus
      prdPublishDate
      business(offset: 0, limit: 1) {
        bizName
        bizSlug
        plType
        contact {
          provinceInitial
          regionSlug
          regionName
        }
      }
    }
  }
}
    `;
export type SearchProductsQueryResult = ApolloReactCommon.QueryResult<SearchProductsQuery, SearchProductsQueryVariables>;
export const SearchBusinessDocument = gql`
    query searchBusiness($countryId: Int, $plRegionId: Int, $latitudeGPS: Float, $longitudeGPS: Float, $isGlobalSearch: Boolean, $search: String!, $offset: Int, $limit: Int, $type: String, $productGenetics: [String], $prdProductType: [[String]], $prdProductCategories: [[String]]) {
  busProdDealSearchByName(
    countryId: $countryId
    plRegionID: $plRegionId
    latitudeGPS: $latitudeGPS
    longitudeGPS: $longitudeGPS
    isGlobalSearch: $isGlobalSearch
    offset: $offset
    limit: $limit
    name: $search
    type: $type
    prdGenetics: $productGenetics
    prdProductType: $prdProductType
    prdProductCategories: $prdProductCategories
  ) {
    business {
      bizBusinessID
      bizName
      bizSlug
      plType
      bizClaim
      mdaLocalFileName
      rvwScoreAvg
      rvwCount
      isOpen
      bizIsVerified
      contact {
        linkContactMethod
        provinceInitial
        regionSlug
        regionName
      }
    }
  }
}
    `;
export type SearchBusinessQueryResult = ApolloReactCommon.QueryResult<SearchBusinessQuery, SearchBusinessQueryVariables>;
export const SearchDealsDocument = gql`
    query searchDeals($countryId: Int, $plRegionId: Int, $latitudeGPS: Float, $longitudeGPS: Float, $isGlobalSearch: Boolean, $search: String!, $offset: Int, $limit: Int, $type: String, $productGenetics: [String], $prdProductType: [[String]], $prdProductCategories: [[String]]) {
  busProdDealSearchByName(
    countryId: $countryId
    plRegionID: $plRegionId
    latitudeGPS: $latitudeGPS
    longitudeGPS: $longitudeGPS
    isGlobalSearch: $isGlobalSearch
    offset: $offset
    limit: $limit
    name: $search
    type: $type
    prdGenetics: $productGenetics
    prdProductType: $prdProductType
    prdProductCategories: $prdProductCategories
  ) {
    deals {
      dlsApplyTo
      dlsDealsID
      dlsName
      dlsSlug
      mdaLocalFileName
      business(offset: 0, limit: 1) {
        bizBusinessID
        plType
        bizName
        bizSlug
        contact {
          provinceInitial
          regionSlug
          regionName
        }
      }
    }
  }
}
    `;
export type SearchDealsQueryResult = ApolloReactCommon.QueryResult<SearchDealsQuery, SearchDealsQueryVariables>;
export const SearchProductTypesDocument = gql`
    query searchProductTypes($withPrice: Boolean, $countryId: Int, $plRegionId: Int, $latitudeGPS: Float, $longitudeGPS: Float, $sort: [[String]], $isGlobalSearch: Boolean, $search: String!, $offset: Int, $limit: Int, $type: String, $productGenetics: [String], $prdProductType: [[String]], $prdProductCategories: [[String]]) {
  busProdDealSearchByName(
    withPrice: $withPrice
    countryId: $countryId
    plRegionID: $plRegionId
    latitudeGPS: $latitudeGPS
    longitudeGPS: $longitudeGPS
    sort: $sort
    isGlobalSearch: $isGlobalSearch
    offset: $offset
    limit: $limit
    name: $search
    type: $type
    prdGenetics: $productGenetics
    prdProductType: $prdProductType
    prdProductCategories: $prdProductCategories
  ) {
    products {
      prdSlug
      prdProductID
      prdName
      prdProductTypes
      prdProductCategories
    }
    productTypes {
      available
      name
      counter
      slug
      id
      categoriesItems {
        available
        name
        counter
        slug
        id
        categoriesItems {
          available
          name
          counter
          slug
          id
        }
      }
      typeItems {
        available
        name
        counter
        slug
        id
        categoriesItems {
          available
          name
          counter
          slug
          id
          categoriesItems {
            available
            name
            counter
            slug
            id
          }
        }
      }
    }
  }
}
    `;
export type SearchProductTypesQueryResult = ApolloReactCommon.QueryResult<SearchProductTypesQuery, SearchProductTypesQueryVariables>;
export const SearchCountsDocument = gql`
    query searchCounts($countryId: Int, $plRegionId: Int, $latitudeGPS: Float, $longitudeGPS: Float, $sort: [[String]], $isGlobalSearch: Boolean, $search: String!, $offset: Int, $limit: Int, $type: String, $productGenetics: [String], $prdProductType: [[String]], $prdProductCategories: [[String]]) {
  busProdDealSearchByName(
    showPagination: true
    countryId: $countryId
    plRegionID: $plRegionId
    latitudeGPS: $latitudeGPS
    longitudeGPS: $longitudeGPS
    sort: $sort
    isGlobalSearch: $isGlobalSearch
    offset: $offset
    limit: $limit
    name: $search
    type: $type
    prdGenetics: $productGenetics
    prdProductType: $prdProductType
    prdProductCategories: $prdProductCategories
  ) {
    productsPagination {
      totalCount
    }
    businessPagination {
      totalCount
    }
    dealsPagination {
      totalCount
    }
  }
}
    `;
export type SearchCountsQueryResult = ApolloReactCommon.QueryResult<SearchCountsQuery, SearchCountsQueryVariables>;
export const SearchSuggestBrandsDocument = gql`
    query searchSuggestBrands($search: String!, $countryId: Int) {
  busProdDealSearchByName(
    offset: 0
    limit: 3
    name: $search
    type: "Businesses"
    showBrand: true
    countryId: $countryId
  ) {
    business {
      plType
      bizName
      bizSlug
      contact {
        regionSlug
        provinceInitial
      }
      bizBusinessID
      mdaLocalFileName
    }
  }
}
    `;
export type SearchSuggestBrandsQueryResult = ApolloReactCommon.QueryResult<SearchSuggestBrandsQuery, SearchSuggestBrandsQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    email
    username
    usrFirstName
    usrLastName
    usrUserID
    email_verified_at
    userRoles
    usrSubscription
  }
}
    `;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;