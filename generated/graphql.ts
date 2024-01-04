import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  File: any;
  Upload: any;
};

export type AnalyticsCategoryHeader = {
  /**  for example ["Edibles"] or if selected 'Shop All' for example ["Concentrates"]  */
  category: Array<Maybe<Scalars['String']>>;
  /**  for example ["Other"]  */
  subcategory?: Maybe<Array<Maybe<Scalars['String']>>>;
  /**  for example ["Strength", "High - 251mg to 1000mg"]  */
  tier3?: Maybe<Array<Maybe<Scalars['String']>>>;
  usrRegionID?: Maybe<Scalars['Int']>;
  anaUserIP?: Maybe<Scalars['String']>;
};

export type AnalyticsDaily = {
  creationDate: Scalars['Date'];
  count: Scalars['Int'];
};

export type AnalyticsInfo = {
  bizBusinessID?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  bizRegionID?: Maybe<Scalars['Int']>;
  regionName?: Maybe<Scalars['String']>;
  plType?: Maybe<Scalars['String']>;
  start?: Maybe<Scalars['Date']>;
  end?: Maybe<Scalars['Date']>;
  creation?: Maybe<Scalars['Date']>;
  dealCategory?: Maybe<Scalars['String']>;
  dealBusinessName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Int']>;
  usrRegistrationIP?: Maybe<Scalars['String']>;
  bizFeaturedPosition?: Maybe<Scalars['Int']>;
  webViews?: Maybe<Scalars['Int']>;
  appViews?: Maybe<Scalars['Int']>;
  dealViews?: Maybe<Scalars['Int']>;
  topPickViews?: Maybe<Scalars['Int']>;
  verifiedViews?: Maybe<Scalars['Int']>;
  engagements?: Maybe<Scalars['Int']>;
  bizCount?: Maybe<Scalars['Int']>;
  featured?: Maybe<Scalars['Int']>;
  bizEmailAddress?: Maybe<Scalars['String']>;
};

export type AnalyticsSave = {
  anaBusinessID: Scalars['String'];
  anaDealID?: Maybe<Scalars['String']>;
  anaUserAction?: Maybe<Scalars['String']>;
};

export type AnalyticsSearch = {
  searchWords: Scalars['String'];
  tag: Scalars['String'];
};

export type AuthUser = {
  currentUser?: Maybe<CurrentUser>;
  token?: Maybe<Scalars['String']>;
};

export type Blog = {
  blgBlogID: Scalars['String'];
  blgTitle: Scalars['String'];
  blgSlug: Scalars['String'];
  blgDescription?: Maybe<Scalars['String']>;
  blgBody?: Maybe<Scalars['String']>;
  mdaLocalFileName?: Maybe<Scalars['String']>;
  blgPublishedAt?: Maybe<Scalars['Date']>;
  created_at?: Maybe<Scalars['Date']>;
  updated_at?: Maybe<Scalars['Date']>;
  authorName?: Maybe<User>;
  plType?: Maybe<Scalars['String']>;
  types?: Maybe<Array<Maybe<Scalars['String']>>>;
  comment?: Maybe<Array<Maybe<Comment>>>;
  canAddComment?: Maybe<Scalars['Boolean']>;
};

export type BlogInput = {
  blgBlogID?: Maybe<Scalars['String']>;
  blgTitle: Scalars['String'];
  blgDescription: Scalars['String'];
  blgBody: Scalars['String'];
  mdaLocalFileName: Scalars['String'];
  blgPublished: Scalars['Boolean'];
  types: Array<Maybe<Scalars['String']>>;
};

export type BlogType = {
  plBlogTypeID: Scalars['Int'];
  plType: Scalars['String'];
  plSlug?: Maybe<Scalars['String']>;
  blogs?: Maybe<Array<Maybe<Blog>>>;
};

export type Budget = {
  date: Scalars['Date'];
  budget?: Maybe<Scalars['Float']>;
};

export type Business = {
  plType: Scalars['String'];
  mdaLocalFileName?: Maybe<Scalars['String']>;
  rvwScoreAvg?: Maybe<Scalars['Float']>;
  rvwCount?: Maybe<Scalars['Int']>;
  contact?: Maybe<Contact>;
  dutchieAPI?: Maybe<Scalars['String']>;
  canAddReview?: Maybe<Scalars['Boolean']>;
  isOpen?: Maybe<Scalars['Boolean']>;
  isToday?: Maybe<Scalars['Int']>;
  willOpen?: Maybe<Scalars['String']>;
  productAvailable?: Maybe<Scalars['Boolean']>;
  productTypes?: Maybe<Array<Maybe<Scalars['String']>>>;
  productType?: Maybe<Array<Maybe<ProductType>>>;
  productGenetics?: Maybe<Array<Maybe<Scalars['String']>>>;
  bizTags?: Maybe<Array<Maybe<Scalars['String']>>>;
  bizExpirationDateToronto?: Maybe<Scalars['Date']>;
  accountManagerId?: Maybe<Scalars['String']>;
  accountManager?: Maybe<Scalars['String']>;
  bizUserBudget?: Maybe<Scalars['Float']>;
  bizCanonical?: Maybe<Business>;
  /**  0 - pending, 1 - approved, null - not reseller  */
  resellersApproved?: Maybe<Scalars['Int']>;
  reviews: Array<Review>;
  deals: Array<BusinessDeals>;
  workingHours?: Maybe<Array<Maybe<WorkingHours>>>;
  productCount: Scalars['Int'];
  products: Array<Product>;
  resellers: Array<Business>;
  brands: Array<Business>;
  monthlyTopPicks?: Maybe<Array<Maybe<MonthlyTopPicks>>>;
  bizID: Scalars['Int'];
  bizBusinessID: Scalars['String'];
  bizUserID: Scalars['String'];
  bizName: Scalars['String'];
  bizSlug: Scalars['String'];
  bizLicenseNumber?: Maybe<Scalars['String']>;
  bizDescription?: Maybe<Scalars['String']>;
  bizHasDeals: Scalars['Boolean'];
  bizHasLandingPage: Scalars['Int'];
  bizIsVerified: Scalars['Int'];
  bizIsFeatured: Scalars['Int'];
  bizFeaturedPosition: Scalars['Int'];
  bizCreationDate: Scalars['DateTime'];
  bizPublishDate?: Maybe<Scalars['DateTime']>;
  bizExpirationDate?: Maybe<Scalars['DateTime']>;
  deleted_at?: Maybe<Scalars['DateTime']>;
  bizAlwaysOpen: Scalars['Int'];
  bizMultiDeal: Scalars['Int'];
  bizHasMapPin: Scalars['Int'];
  bizDirectorName?: Maybe<Scalars['String']>;
  bizCorporateProfileFileName?: Maybe<Scalars['String']>;
  bizAuthorizationDocumentFileName?: Maybe<Scalars['String']>;
  bizPassportOrDriverLicenseFileName?: Maybe<Scalars['String']>;
  bizSubscription?: Maybe<Scalars['Int']>;
  bizScrapUrl?: Maybe<Scalars['String']>;
  bizClaim?: Maybe<Scalars['Int']>;
  bizSortOption?: Maybe<Scalars['String']>;
  bizCHP?: Maybe<Scalars['Int']>;
  bizIsRegulated?: Maybe<Scalars['Int']>;
  bizIsLite?: Maybe<Scalars['Int']>;
  bizBadge?: Maybe<Scalars['Int']>;
  bizComingSoon?: Maybe<Scalars['Int']>;
  bizClaimUnblurred?: Maybe<Scalars['Int']>;
  bizCanTradeWholesale?: Maybe<Scalars['Boolean']>;
  wholesaleCartItemQuantity?: Maybe<Scalars['Float']>;
};


export type BusinessReviewsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type BusinessDealsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type BusinessWorkingHoursArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type BusinessProductCountArgs = {
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdGenetics?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>>>;
  search?: Maybe<Scalars['String']>;
};


export type BusinessProductsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdGenetics?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>>>;
  search?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type BusinessResellersArgs = {
  filterByLocation?: Maybe<Scalars['Boolean']>;
  clientIp?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  latitudeFront?: Maybe<Scalars['Float']>;
  longitudeFront?: Maybe<Scalars['Float']>;
  regionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type BusinessBrandsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type BusinessAdminInput = {
  usrAccountManager?: Maybe<Scalars['String']>;
  bizIsVerified?: Maybe<Scalars['Int']>;
  bizHasDeals?: Maybe<Scalars['Int']>;
  dutchieAPI?: Maybe<Scalars['String']>;
  bizHasLandingPage?: Maybe<Scalars['Int']>;
  bizLatitude?: Maybe<Scalars['Float']>;
  bizLongitude?: Maybe<Scalars['Float']>;
  /**  Date format YYYY-MM-DD  */
  bizExpirationDate?: Maybe<Scalars['Date']>;
  /**  Date format YYYY-MM-DD  */
  bizPublishDate?: Maybe<Scalars['Date']>;
  bizIsFeatured?: Maybe<Scalars['Int']>;
  bizFeaturedPosition?: Maybe<Scalars['Int']>;
  bizMultiDeal?: Maybe<Scalars['Int']>;
  bizCanonicalID?: Maybe<Scalars['String']>;
  bizClaim?: Maybe<Scalars['Int']>;
  bizClaimUnblurred?: Maybe<Scalars['Int']>;
  bizCHP?: Maybe<Scalars['Int']>;
  bizIsLite?: Maybe<Scalars['Int']>;
  bizBadge?: Maybe<Scalars['Int']>;
  bizComingSoon?: Maybe<Scalars['Int']>;
  bizCanTradeWholesale?: Maybe<Scalars['Boolean']>;
};

export type BusinessDeals = {
  dlsDealsID: Scalars['String'];
  dlsName: Scalars['String'];
  dlsSlug: Scalars['String'];
  dlsApplyTo?: Maybe<Scalars['String']>;
  mdaLocalFileName?: Maybe<Scalars['String']>;
  /** @deprecated bizName is deprecated. Use business[0] instead. */
  bizName: Scalars['String'];
  dlsDescription?: Maybe<Scalars['String']>;
  dlsInstructions?: Maybe<Scalars['String']>;
  dlsExpireDate?: Maybe<Scalars['Date']>;
  dlsExpireDateToronto?: Maybe<Scalars['Date']>;
  dlsPublishDate?: Maybe<Scalars['Date']>;
  dlsCreationDate?: Maybe<Scalars['Date']>;
  dlsCouponCode?: Maybe<Scalars['String']>;
  dlsUrl?: Maybe<Scalars['String']>;
  dlsStatus?: Maybe<Scalars['Boolean']>;
  business: Array<Business>;
};


export type BusinessDealsBusinessArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type BusinessFinanceInput = {
  bizBusinessID: Scalars['String'];
  productTypes: Array<Maybe<ProductTypeInput>>;
};

export type BusinessInput = {
  bizBusinessID?: Maybe<Scalars['String']>;
  bizName: Scalars['String'];
  bizSlug?: Maybe<Scalars['String']>;
  plType: Scalars['String'];
  mdaLocalFileName?: Maybe<Scalars['String']>;
  contact: ContactInput;
  bizDescription: Scalars['String'];
  bizLicenseNumber?: Maybe<Scalars['String']>;
  bizTags?: Maybe<Scalars['String']>;
  bizAlwaysOpen?: Maybe<Scalars['Int']>;
  bizCorporateProfileFileName?: Maybe<Scalars['String']>;
  bizDirectorName?: Maybe<Scalars['String']>;
  bizPassportOrDriverLicenseFileName?: Maybe<Scalars['String']>;
  bizAuthorizationDocumentFileName?: Maybe<Scalars['String']>;
  bizSubscription: Scalars['Int'];
  bizUserID?: Maybe<Scalars['String']>;
  bizSortOption?: Maybe<Scalars['String']>;
  bizLatitude?: Maybe<Scalars['Float']>;
  bizLongitude?: Maybe<Scalars['Float']>;
  bizClaim?: Maybe<Scalars['Int']>;
  bizIsLite?: Maybe<Scalars['Int']>;
  bizBadge?: Maybe<Scalars['Int']>;
  bizComingSoon?: Maybe<Scalars['Int']>;
  bizIsRegulated?: Maybe<Scalars['Int']>;
  workingHours?: Maybe<Array<Maybe<WorkingHoursInput>>>;
};

export type BusinessPage = {
  pagination: Pagination;
  businesses: Array<Business>;
};

export enum BusinessSortField {
  BizCreationDate = 'bizCreationDate',
  BizExpirationDate = 'bizExpirationDate',
  BizName = 'bizName',
  RvwScoreAvg = 'rvwScoreAvg'
}

export type CartItem = {
  cartID: Scalars['String'];
  cartQuantity: Scalars['Int'];
  cartPriceID: Scalars['String'];
  price: Price;
  total: Scalars['Float'];
};

export type CartItemInput = {
  cartQuantity: Scalars['Int'];
  cartPriceID: Scalars['String'];
};

export type Comment = {
  commentId: Scalars['Int'];
  userID: Scalars['String'];
  blogID: Scalars['String'];
  commentBody: Scalars['String'];
  createdAt?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type CommentInput = {
  blogID: Scalars['String'];
  commentBody: Scalars['String'];
};

export type Contact = {
  bizPostal?: Maybe<Scalars['String']>;
  bizRegionID?: Maybe<Scalars['String']>;
  regionName?: Maybe<Scalars['String']>;
  regionSlug?: Maybe<Scalars['String']>;
  plProvinceID?: Maybe<Scalars['Int']>;
  plProvinceIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  plCountryID?: Maybe<Scalars['Int']>;
  provinceName?: Maybe<Scalars['String']>;
  provinceNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  provinceInitial?: Maybe<Scalars['String']>;
  provinceInitials?: Maybe<Scalars['String']>;
  provinceInitialArray?: Maybe<Array<Maybe<Scalars['String']>>>;
  bizEmailAddress?: Maybe<Scalars['String']>;
  bizPhone?: Maybe<Scalars['String']>;
  bizText?: Maybe<Scalars['String']>;
  bizWebsiteURL?: Maybe<Scalars['String']>;
  bizChat?: Maybe<Scalars['String']>;
  bizLatitude?: Maybe<Scalars['Float']>;
  bizLongitude?: Maybe<Scalars['Float']>;
  bizIntersection?: Maybe<Scalars['String']>;
  bizStreetAddress?: Maybe<Scalars['String']>;
  linkContactMethod?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ContactInput = {
  bizPostal?: Maybe<Scalars['String']>;
  bizRegionID?: Maybe<Scalars['String']>;
  bizEmailAddress: Scalars['String'];
  bizPhone?: Maybe<Scalars['String']>;
  bizWebsiteURL?: Maybe<Scalars['String']>;
  bizScrapUrl?: Maybe<Scalars['String']>;
  bizIntersection?: Maybe<Scalars['String']>;
  bizStreetAddress?: Maybe<Scalars['String']>;
  plProvinceIDs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  linkContactMethod: Array<Maybe<Scalars['String']>>;
};

export type Country = {
  plCountryID: Scalars['Int'];
  plCountrySlug: Scalars['String'];
  plCountryName: Scalars['String'];
};

export type CurrentUser = {
  accountManager?: Maybe<User>;
  usrUserID: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  usrFirstName?: Maybe<Scalars['String']>;
  usrLastName?: Maybe<Scalars['String']>;
  usrBirthDate?: Maybe<Scalars['DateTime']>;
  usrLocationLongitude?: Maybe<Scalars['String']>;
  usrLocationLatitude?: Maybe<Scalars['String']>;
  usrCreationDate: Scalars['DateTime'];
  usrLastModifiedDate: Scalars['DateTime'];
  usrLastLoginDate: Scalars['DateTime'];
  email_verified_at?: Maybe<Scalars['DateTime']>;
  usrRegionID?: Maybe<Scalars['Int']>;
  usrProvinceID?: Maybe<Scalars['Int']>;
  usrSubscription?: Maybe<Scalars['Int']>;
  userRoles?: Maybe<Array<Scalars['String']>>;
  availableClaim: Scalars['Boolean'];
  mailPreferences?: Maybe<Array<Scalars['String']>>;
  cartCount: Scalars['Float'];
  canBuyWholesaleProducts: Scalars['Boolean'];
  canSellWholesaleProducts: Scalars['Boolean'];
};



export type DealInput = {
  dlsDealsID?: Maybe<Scalars['String']>;
  dlsName: Scalars['String'];
  dlsApplyTo: Scalars['String'];
  mdaLocalFileName?: Maybe<Scalars['String']>;
  dlsDescription: Scalars['String'];
  dlsInstructions: Scalars['String'];
  dlsExpireDate: Scalars['Date'];
  dlsPublish: Scalars['Boolean'];
  bizBusinessIDs: Array<Maybe<Scalars['String']>>;
  dlsCouponCode?: Maybe<Scalars['String']>;
  dlsUrl?: Maybe<Scalars['String']>;
};

export type Event = {
  evtEventID: Scalars['Int'];
  evtTitle: Scalars['String'];
  evtSlug: Scalars['String'];
  evtUserId: Scalars['String'];
  evtDescription?: Maybe<Scalars['String']>;
  evtBody?: Maybe<Scalars['String']>;
  evtDate?: Maybe<Scalars['Date']>;
  created_at?: Maybe<Scalars['Date']>;
  updated_at?: Maybe<Scalars['Date']>;
  evtPublishDate?: Maybe<Scalars['Date']>;
  deleted_at?: Maybe<Scalars['Date']>;
  mdaLocalFileName?: Maybe<Array<Maybe<Scalars['String']>>>;
  authorName?: Maybe<User>;
};

export type EventInput = {
  evtEventID?: Maybe<Scalars['Int']>;
  evtTitle?: Maybe<Scalars['String']>;
  evtDescription?: Maybe<Scalars['String']>;
  evtBody?: Maybe<Scalars['String']>;
  /**  Date format YYYY-MM-DD  */
  evtDate?: Maybe<Scalars['Date']>;
  evtPublishDate?: Maybe<Scalars['Date']>;
  mdaLocalFileName?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type List = {
  business?: Maybe<Array<Business>>;
  products?: Maybe<Array<Product>>;
  deals?: Maybe<Array<BusinessDeals>>;
  productTypes?: Maybe<Array<Maybe<ProductType>>>;
  productGenetics?: Maybe<Array<Maybe<Scalars['String']>>>;
  businessPagination?: Maybe<Pagination>;
  productsPagination?: Maybe<Pagination>;
  dealsPagination?: Maybe<Pagination>;
};

export type Location = {
  provinces?: Maybe<Array<Province>>;
  regions?: Maybe<Array<Region>>;
};

export type LocationMetaInput = {
  id?: Maybe<Scalars['Int']>;
  categoryType: Scalars['String'];
  locationID: Scalars['Int'];
  plMetaTitle?: Maybe<Scalars['String']>;
  plMetaDescription?: Maybe<Scalars['String']>;
  plCustomH1?: Maybe<Scalars['String']>;
  plDescription1?: Maybe<Scalars['String']>;
  plDescription2?: Maybe<Scalars['String']>;
};

export type MetaTag = {
  id: Scalars['Int'];
  categoryType: Scalars['String'];
  plRegionID: Scalars['Int'];
  plMetaTitle?: Maybe<Scalars['String']>;
  plMetaDescription?: Maybe<Scalars['String']>;
  plCustomH1?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Date']>;
  plDescription1?: Maybe<Scalars['String']>;
  plDescription2?: Maybe<Scalars['String']>;
};

export type MetaTagProvince = {
  id: Scalars['Int'];
  categoryType: Scalars['String'];
  plProvinceID: Scalars['Int'];
  plMetaTitle?: Maybe<Scalars['String']>;
  plMetaDescription?: Maybe<Scalars['String']>;
  plCustomH1?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Date']>;
  plDescription1?: Maybe<Scalars['String']>;
  plDescription2?: Maybe<Scalars['String']>;
};

export type MetaTagType = {
  id: Scalars['Int'];
  product_type_id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  product_type?: Maybe<ProductType>;
};

export type MetaTagTypeInput = {
  product_type_id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type MonthlyTopPicks = {
  linkTopPosition?: Maybe<Scalars['Int']>;
  linkStartDate?: Maybe<Scalars['Date']>;
  linkEndDate?: Maybe<Scalars['Date']>;
  linkIsScheduled?: Maybe<Scalars['Int']>;
  linkLocationID?: Maybe<Scalars['Int']>;
};

export type MonthlyTopPicksInput = {
  linkBusinessID?: Maybe<Scalars['String']>;
  linkLocationID?: Maybe<Scalars['Int']>;
  linkTopPosition?: Maybe<Scalars['Int']>;
  linkStartDate?: Maybe<Scalars['Date']>;
  linkEndDate?: Maybe<Scalars['Date']>;
  linkIsScheduled?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  login: AuthUser;
  loginWithUserId: AuthUser;
  userRegister: AuthUser;
  editUser: CurrentUser;
  editUserRoleByAdmin: CurrentUser;
  userVerification: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  newPassword: AuthUser;
  changePasswordActualUser: AuthUser;
  resendEmailConfirm: Scalars['Boolean'];
  commentDelete: Scalars['Boolean'];
  commentSave: Comment;
  deleteByBusinessIdIn: Scalars['Boolean'];
  saveBusiness: Business;
  addReseller: Scalars['Boolean'];
  deleteResellerByBusinessId: Scalars['Boolean'];
  approveReseller: Scalars['Boolean'];
  deleteByProductIdIn: Scalars['Boolean'];
  addLinkBusinessIdsProductIdsIn?: Maybe<Array<Maybe<Scalars['Int']>>>;
  deleteLinkBusinessIdsProductIdsIn: Scalars['Boolean'];
  addLinkProductReseller?: Maybe<Array<Maybe<Scalars['Int']>>>;
  deleteLinkProductReseller: Scalars['Boolean'];
  saveProduct: Product;
  updateProductsStatusIn: Scalars['Boolean'];
  deleteDealByDealIdIn: Scalars['Boolean'];
  saveDeal: BusinessDeals;
  businessRestoreIn: Scalars['Boolean'];
  editBusinessByAdmin: Business;
  publishByBusinessIdIn: Scalars['Boolean'];
  verifyByBusinessIdIn: Scalars['Boolean'];
  unVerifyByBusinessIdIn: Scalars['Boolean'];
  publishByProductIdIn: Scalars['Boolean'];
  saveImages: Scalars['String'];
  saveDoc: Scalars['String'];
  saveMonthlyTopPicksIn: Scalars['Boolean'];
  deleteMonthlyTopPicksIn: Scalars['Boolean'];
  publishByBlogIdIn: Scalars['Boolean'];
  publishByDealIdIn: Scalars['Boolean'];
  deleteByBlogIdIn: Scalars['Boolean'];
  editBlog: Blog;
  saveBlog: Blog;
  businessClaimListingPage: Scalars['Boolean'];
  editProductsCategories: Scalars['Boolean'];
  saveLocationMeta: Scalars['Boolean'];
  saveProvinceMeta: Scalars['Boolean'];
  editFooterPositionIn: Scalars['Boolean'];
  deleteFooterPosition: Scalars['Boolean'];
  saveBusinessAdPriceIn: Scalars['Boolean'];
  saveUserAdBudget: Scalars['Boolean'];
  saveProductTypePriceIn: Scalars['Boolean'];
  scrape: Scalars['Boolean'];
  scrapeImage?: Maybe<Scalars['Boolean']>;
  fillProductStrainName: Scalars['Boolean'];
  editMetaTagType?: Maybe<MetaTagType>;
  sendPushNotification?: Maybe<Scalars['Boolean']>;
  saveEvent: Event;
  deleteImagesEvent: Scalars['Boolean'];
  deleteEvent: Scalars['Boolean'];
  saveFiles: Array<Maybe<Scalars['String']>>;
  saveFileWaterMark: Array<Maybe<Scalars['String']>>;
  analyticsSave?: Maybe<Scalars['Boolean']>;
  analyticsSaveSearch?: Maybe<Scalars['Boolean']>;
  analyticsBannerClick?: Maybe<Scalars['Boolean']>;
  analyticsSaveCategoryHeader?: Maybe<Scalars['Boolean']>;
  reviewSave: Review;
  reviewReply: Review;
  reviewDelete?: Maybe<Scalars['Boolean']>;
  reviewDeleteIn: Scalars['Boolean'];
  reviewRestore: Scalars['Boolean'];
  wholesaleSaveProduct: Product;
  wholesaleAddToCart: CartItem;
  wholesaleRemoveFromCart: Scalars['Boolean'];
  wholesaleSubmitOrder: Scalars['Boolean'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginWithUserIdArgs = {
  userId: Scalars['String'];
};


export type MutationUserRegisterArgs = {
  input: UserInput;
  wired?: Maybe<Scalars['Boolean']>;
  source?: Maybe<Scalars['String']>;
};


export type MutationEditUserArgs = {
  input: UserInput;
};


export type MutationEditUserRoleByAdminArgs = {
  userId: Scalars['String'];
  userRoles: Array<Maybe<Scalars['String']>>;
};


export type MutationUserVerificationArgs = {
  code: Scalars['String'];
  id: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationNewPasswordArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationChangePasswordActualUserArgs = {
  passwordNew: Scalars['String'];
  passwordOld: Scalars['String'];
};


export type MutationResendEmailConfirmArgs = {
  userId: Scalars['String'];
};


export type MutationCommentDeleteArgs = {
  commentId: Scalars['String'];
};


export type MutationCommentSaveArgs = {
  input: CommentInput;
};


export type MutationDeleteByBusinessIdInArgs = {
  bizBusinessIDs: Array<Maybe<Scalars['String']>>;
};


export type MutationSaveBusinessArgs = {
  business: BusinessInput;
};


export type MutationAddResellerArgs = {
  businessId: Array<Maybe<Scalars['String']>>;
  resellerId: Scalars['String'];
  selectAll?: Maybe<Scalars['Boolean']>;
};


export type MutationDeleteResellerByBusinessIdArgs = {
  businessId: Scalars['String'];
  resellerId: Scalars['String'];
};


export type MutationApproveResellerArgs = {
  businessId: Scalars['String'];
  resellerId: Scalars['String'];
};


export type MutationDeleteByProductIdInArgs = {
  productIds: Array<Maybe<Scalars['String']>>;
};


export type MutationAddLinkBusinessIdsProductIdsInArgs = {
  businessIds: Array<Maybe<Scalars['String']>>;
  prdProductIds: Array<Maybe<Scalars['String']>>;
};


export type MutationDeleteLinkBusinessIdsProductIdsInArgs = {
  businessIds: Array<Maybe<Scalars['String']>>;
  prdProductIds: Array<Maybe<Scalars['String']>>;
};


export type MutationAddLinkProductResellerArgs = {
  brandProductID: Scalars['String'];
  resellerProductID: Scalars['String'];
};


export type MutationDeleteLinkProductResellerArgs = {
  brandProductID: Scalars['String'];
  resellerProductID: Scalars['String'];
};


export type MutationSaveProductArgs = {
  product: ProductInput;
};


export type MutationUpdateProductsStatusInArgs = {
  prdProductIDs: Array<Maybe<Scalars['String']>>;
  status: Scalars['String'];
};


export type MutationDeleteDealByDealIdInArgs = {
  dlsDealsIDs: Array<Maybe<Scalars['String']>>;
};


export type MutationSaveDealArgs = {
  deal: DealInput;
};


export type MutationBusinessRestoreInArgs = {
  bizBusinessIDs: Array<Maybe<Scalars['String']>>;
};


export type MutationEditBusinessByAdminArgs = {
  business: BusinessInput;
  businessAdmin: BusinessAdminInput;
};


export type MutationPublishByBusinessIdInArgs = {
  bizBusinessIDs: Array<Maybe<Scalars['String']>>;
  publish: Scalars['Boolean'];
  expiryDate?: Maybe<Scalars['Date']>;
};


export type MutationVerifyByBusinessIdInArgs = {
  bizBusinessIDs: Array<Maybe<Scalars['String']>>;
};


export type MutationUnVerifyByBusinessIdInArgs = {
  bizBusinessIDs: Array<Maybe<Scalars['String']>>;
};


export type MutationPublishByProductIdInArgs = {
  prdProductIDs: Array<Maybe<Scalars['String']>>;
  publish: Scalars['Boolean'];
};


export type MutationSaveImagesArgs = {
  imgBase64: Scalars['String'];
};


export type MutationSaveDocArgs = {
  base64: Scalars['String'];
  type: Scalars['String'];
  fileType: Scalars['String'];
};


export type MutationSaveMonthlyTopPicksInArgs = {
  input: Array<Maybe<MonthlyTopPicksInput>>;
};


export type MutationDeleteMonthlyTopPicksInArgs = {
  input: Array<Maybe<MonthlyTopPicksInput>>;
};


export type MutationPublishByBlogIdInArgs = {
  blgBlogIDs: Array<Maybe<Scalars['String']>>;
  publish: Scalars['Boolean'];
};


export type MutationPublishByDealIdInArgs = {
  dlsDealsIDs: Array<Maybe<Scalars['String']>>;
  publish: Scalars['Boolean'];
  expiryDate?: Maybe<Scalars['Date']>;
};


export type MutationDeleteByBlogIdInArgs = {
  blgBlogIDs: Array<Maybe<Scalars['String']>>;
};


export type MutationEditBlogArgs = {
  input: BlogInput;
};


export type MutationSaveBlogArgs = {
  input: BlogInput;
};


export type MutationBusinessClaimListingPageArgs = {
  bizBusinessIDs: Array<Maybe<Scalars['String']>>;
};


export type MutationEditProductsCategoriesArgs = {
  prdProductIDs: Array<Maybe<Scalars['String']>>;
  prdProductTypes: Array<Maybe<Scalars['String']>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationSaveLocationMetaArgs = {
  input: LocationMetaInput;
};


export type MutationSaveProvinceMetaArgs = {
  input: LocationMetaInput;
};


export type MutationEditFooterPositionInArgs = {
  plRegionIDs: Array<Maybe<Scalars['Int']>>;
  footerPositions: Array<Maybe<Scalars['Int']>>;
};


export type MutationDeleteFooterPositionArgs = {
  plRegionID: Scalars['Int'];
  footerPosition: Scalars['Int'];
};


export type MutationSaveBusinessAdPriceInArgs = {
  input: Array<Maybe<BusinessFinanceInput>>;
};


export type MutationSaveUserAdBudgetArgs = {
  usrUserID: Scalars['String'];
  budget: Scalars['Int'];
};


export type MutationSaveProductTypePriceInArgs = {
  input: Array<Maybe<ProductTypeInput>>;
};


export type MutationScrapeArgs = {
  businessId: Scalars['String'];
  sha256Hash: Scalars['String'];
  dutchieSlug: Scalars['String'];
  dispensaryId: Scalars['String'];
};


export type MutationScrapeImageArgs = {
  sha256Hash: Scalars['String'];
  tokenProxy: Scalars['String'];
  dispensaryId: Scalars['String'];
};


export type MutationEditMetaTagTypeArgs = {
  input: MetaTagTypeInput;
};


export type MutationSendPushNotificationArgs = {
  operatingSystem: Scalars['String'];
  title: Scalars['String'];
  action: Scalars['String'];
  linkID?: Maybe<Scalars['String']>;
};


export type MutationSaveEventArgs = {
  input: EventInput;
};


export type MutationDeleteImagesEventArgs = {
  mdaLocalFileName: Array<Maybe<Scalars['String']>>;
  evtEventID: Scalars['Int'];
};


export type MutationDeleteEventArgs = {
  evtEventID: Scalars['Int'];
};


export type MutationSaveFilesArgs = {
  stream: Array<Maybe<Scalars['File']>>;
};


export type MutationSaveFileWaterMarkArgs = {
  base64: Scalars['String'];
  waterMark?: Maybe<Scalars['Boolean']>;
};


export type MutationAnalyticsSaveArgs = {
  input?: Maybe<AnalyticsSave>;
};


export type MutationAnalyticsSaveSearchArgs = {
  input?: Maybe<AnalyticsSearch>;
};


export type MutationAnalyticsBannerClickArgs = {
  userAction: Scalars['String'];
  userIP?: Maybe<Scalars['String']>;
};


export type MutationAnalyticsSaveCategoryHeaderArgs = {
  input?: Maybe<AnalyticsCategoryHeader>;
};


export type MutationReviewSaveArgs = {
  input: ReviewInput;
};


export type MutationReviewReplyArgs = {
  input: ReviewReplyInput;
};


export type MutationReviewDeleteArgs = {
  reviewId: Scalars['String'];
};


export type MutationReviewDeleteInArgs = {
  reviewIds: Array<Maybe<Scalars['String']>>;
};


export type MutationReviewRestoreArgs = {
  reviewId: Scalars['String'];
};


export type MutationWholesaleSaveProductArgs = {
  product: ProductInput;
};


export type MutationWholesaleAddToCartArgs = {
  cartItem: CartItemInput;
};


export type MutationWholesaleRemoveFromCartArgs = {
  prcPriceID: Scalars['String'];
};

export type Pagination = {
  totalCount?: Maybe<Scalars['Float']>;
  beforeCount?: Maybe<Scalars['Float']>;
  afterCount?: Maybe<Scalars['Float']>;
  pageIds?: Maybe<Array<Scalars['Float']>>;
  offset?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Float']>;
};

export type Price = {
  prcPriceID: Scalars['String'];
  prcProductID: Scalars['String'];
  prcPrice: Scalars['Float'];
  prcMinimumQuantity?: Maybe<Scalars['Int']>;
  prcUnitsPerCase?: Maybe<Scalars['Int']>;
  prcUnit: TradeUnit;
  product: Product;
  wholesaleCartItemQuantity?: Maybe<Scalars['Float']>;
};

export type PriceInput = {
  prcPrice: Scalars['Float'];
  prcMinimumQuantity?: Maybe<Scalars['Int']>;
  prcUnitsPerCase?: Maybe<Scalars['Int']>;
  prcUnit: TradeUnit;
  prcPriceID?: Maybe<Scalars['String']>;
};

export type PricePage = {
  pagination: Pagination;
  items: Array<Price>;
};

export type Product = {
  mdaLocalFileName?: Maybe<Scalars['String']>;
  rvwScoreAvg?: Maybe<Scalars['Float']>;
  rvwCount?: Maybe<Scalars['Int']>;
  prdInStockForBrand?: Maybe<Scalars['Int']>;
  canAddReview?: Maybe<Scalars['Boolean']>;
  reviews: Array<Review>;
  business: Array<Business>;
  plSlugType?: Maybe<Scalars['String']>;
  businessCount?: Maybe<Scalars['Int']>;
  productReseller?: Maybe<Array<Maybe<Product>>>;
  businessProductReseller?: Maybe<Array<Maybe<Business>>>;
  productBrandReseller?: Maybe<Product>;
  brand?: Maybe<Business>;
  prdWeightWeed?: Maybe<Scalars['String']>;
  prdID: Scalars['Int'];
  prdProductID: Scalars['String'];
  prdName: Scalars['String'];
  prdSlug: Scalars['String'];
  prdDescription: Scalars['String'];
  prdTags?: Maybe<Scalars['String']>;
  prdGenetics?: Maybe<Scalars['String']>;
  prdTHCPercentage?: Maybe<Scalars['String']>;
  prdCBDPercentage?: Maybe<Scalars['String']>;
  prdPricePerUnit?: Maybe<Scalars['Float']>;
  prdPriceHalfGram?: Maybe<Scalars['Float']>;
  prdPriceOneGram?: Maybe<Scalars['Float']>;
  prdPriceTwoGrams?: Maybe<Scalars['Float']>;
  prdPriceEighthOunce?: Maybe<Scalars['Float']>;
  prdPriceQuarterOunce?: Maybe<Scalars['Float']>;
  prdPriceHalfOunce?: Maybe<Scalars['Float']>;
  prdPriceOneOunce?: Maybe<Scalars['Float']>;
  prdCreationDate: Scalars['DateTime'];
  prdPublishDate?: Maybe<Scalars['DateTime']>;
  prdProductTypes: Scalars['String'];
  prdProductCategories?: Maybe<Scalars['String']>;
  prdTypeIds?: Maybe<Scalars['String']>;
  prdInStock: Scalars['Boolean'];
  prdProductEffects?: Maybe<Scalars['String']>;
  prdProductUses?: Maybe<Scalars['String']>;
  prdProductTimes?: Maybe<Scalars['String']>;
  prdStrainId?: Maybe<Scalars['Int']>;
  prdStatus?: Maybe<Scalars['String']>;
  prdIsWholesale: Scalars['Boolean'];
  prices?: Maybe<Array<Price>>;
};


export type ProductReviewsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type ProductBusinessArgs = {
  latitudeFront?: Maybe<Scalars['Float']>;
  longitudeFront?: Maybe<Scalars['Float']>;
  regionID?: Maybe<Scalars['Int']>;
  ignoreStatuses?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type ProductProductResellerArgs = {
  filterByLocation?: Maybe<Scalars['Boolean']>;
  latitudeFront?: Maybe<Scalars['Float']>;
  longitudeFront?: Maybe<Scalars['Float']>;
  regionID?: Maybe<Scalars['Int']>;
};


export type ProductBusinessProductResellerArgs = {
  latitudeFront?: Maybe<Scalars['Float']>;
  longitudeFront?: Maybe<Scalars['Float']>;
  regionID?: Maybe<Scalars['Int']>;
};

export type ProductFilterInput = {
  prdName?: Maybe<Scalars['String']>;
  bizName?: Maybe<Scalars['String']>;
  bizBusinessID?: Maybe<Scalars['String']>;
  prdProductType?: Maybe<Scalars['String']>;
};

export type ProductInput = {
  prdName: Scalars['String'];
  prdTags?: Maybe<Scalars['String']>;
  prdGenetics?: Maybe<Scalars['String']>;
  prdTHCPercentage?: Maybe<Scalars['String']>;
  prdCBDPercentage?: Maybe<Scalars['String']>;
  prdPricePerUnit?: Maybe<Scalars['Float']>;
  prdPriceHalfGram?: Maybe<Scalars['Float']>;
  prdPriceOneGram?: Maybe<Scalars['Float']>;
  prdPriceTwoGrams?: Maybe<Scalars['Float']>;
  prdPriceEighthOunce?: Maybe<Scalars['Float']>;
  prdPriceQuarterOunce?: Maybe<Scalars['Float']>;
  prdPriceHalfOunce?: Maybe<Scalars['Float']>;
  prdPriceOneOunce?: Maybe<Scalars['Float']>;
  prdUserID?: Maybe<Scalars['String']>;
  prdStrainId?: Maybe<Scalars['Int']>;
  prdStatus?: Maybe<Scalars['String']>;
  strainName?: Maybe<Scalars['String']>;
  prdProductID?: Maybe<Scalars['String']>;
  prdDescription?: Maybe<Scalars['String']>;
  prdProductTypes: Array<Scalars['String']>;
  prdProductCategories?: Maybe<Array<Scalars['String']>>;
  prdProductEffects?: Maybe<Array<Scalars['String']>>;
  prdProductUses?: Maybe<Array<Scalars['String']>>;
  prdProductTimes?: Maybe<Array<Scalars['String']>>;
  prdInStock?: Maybe<Scalars['String']>;
  mdaLocalFileName?: Maybe<Scalars['String']>;
  prices?: Maybe<Array<PriceInput>>;
};

export type ProductPage = {
  pagination: Pagination;
  items: Array<Product>;
};

export enum ProductSortOrder {
  PrdName = 'prdName',
  PrdCreationDate = 'prdCreationDate'
}

export type ProductType = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  counter?: Maybe<Scalars['Int']>;
  available?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  typeParent?: Maybe<Scalars['String']>;
  typeParentName?: Maybe<Array<Maybe<Scalars['String']>>>;
  parent?: Maybe<Scalars['String']>;
  parentBusinessId?: Maybe<Scalars['String']>;
  typePriceDelivery?: Maybe<Scalars['Float']>;
  typePriceBrand?: Maybe<Scalars['Float']>;
  typePriceDispensary?: Maybe<Scalars['Float']>;
  typePriceMail?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Int']>;
  businessCounter?: Maybe<Scalars['Int']>;
  engagements?: Maybe<Scalars['Float']>;
  amountSpent?: Maybe<Scalars['Float']>;
  totalImpressions?: Maybe<Scalars['Int']>;
  typeItems?: Maybe<Array<Maybe<ProductType>>>;
  categoriesItems?: Maybe<Array<Maybe<ProductType>>>;
};

export type ProductTypeInput = {
  id?: Maybe<Scalars['Int']>;
  slug?: Maybe<Scalars['String']>;
  typeParent?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  typePriceDelivery?: Maybe<Scalars['Float']>;
  typePriceBrand?: Maybe<Scalars['Float']>;
  typePriceDispensary?: Maybe<Scalars['Float']>;
  typePriceMail?: Maybe<Scalars['Float']>;
};

export type Province = {
  plProvinceID: Scalars['Int'];
  plInitials: Scalars['String'];
  plName: Scalars['String'];
  plDescription?: Maybe<Scalars['String']>;
  plCountryID: Scalars['String'];
  country: Country;
  bizCount?: Maybe<Scalars['Int']>;
  bizBrandCount?: Maybe<Scalars['Int']>;
  bizMailOrderCount?: Maybe<Scalars['Int']>;
  bizDeliveryCount?: Maybe<Scalars['Int']>;
  bizDispensaryCount?: Maybe<Scalars['Int']>;
  bizFeaturedCount?: Maybe<Scalars['Int']>;
  bizVerifiedCount?: Maybe<Scalars['Int']>;
  bizLiteCount?: Maybe<Scalars['Int']>;
};

export type Query = {
  locationSearchRegion: Array<Region>;
  locationListRegion: Array<Region>;
  locationListRegionSEOPanel: Result;
  locationListProvinceSEOPanel: Result;
  locationListRegionByProvince: Array<Region>;
  locationListRegionByProvinceForUser: Array<Region>;
  locationListRegionNearRegion: Array<Region>;
  businessMonthlyTopPicks: Array<Business>;
  businessMonthlyTopPicksBrands: Array<Business>;
  businessMonthlyTopPicksDeliveries: Array<Business>;
  businessMonthlyTopPicksMail: Array<Business>;
  businessMonthlyTopPicksDispensary: Array<Business>;
  businessMonthlyTopPicksForAdmin: Array<Business>;
  businessFeaturedBrands: Array<Business>;
  businessFeaturedDeliveries: Array<Business>;
  businessFeaturedMail: Array<Business>;
  businessFeaturedDispensary: Array<Business>;
  businessVerifiedBrands: Array<Business>;
  businessVerifiedDeliveries: Array<Business>;
  businessVerifiedMail: Array<Business>;
  businessVerifiedDispensary: Array<Business>;
  businessAllVerified: Array<Business>;
  businessAllByLocation: Array<Business>;
  businessAllBrands: Array<Business>;
  businessAllDeliveries: Array<Business>;
  businessAllMail: Array<Business>;
  businessAllDispensary: Array<Business>;
  productById: Array<Product>;
  productByIdDashboard?: Maybe<Array<Maybe<Product>>>;
  productByIdForBrandLibrary: Array<Maybe<Product>>;
  productBySlug: Array<Product>;
  businessListTypes: Array<Type>;
  businessById?: Maybe<Business>;
  businessByIdDashboard?: Maybe<Business>;
  businessBySlug?: Maybe<Business>;
  dealById?: Maybe<BusinessDeals>;
  dealByIdForDashboard?: Maybe<BusinessDeals>;
  dealBySlug?: Maybe<BusinessDeals>;
  dealListByTypeByReg: Array<BusinessDeals>;
  busProdDealSearchByName: List;
  blogListByType: Array<Blog>;
  provinceByInitial: Province;
  blogById: Blog;
  blogBySlug?: Maybe<Blog>;
  blogTypeAll: Array<BlogType>;
  locationListNearLocation: Location;
  locationListProvince: Array<Maybe<Province>>;
  locationListProvinceForUser: Array<Maybe<Province>>;
  businessByCoordinates: Array<Business>;
  dealListByRegRandom: Array<BusinessDeals>;
  metaTagByRegionIDByType: Array<MetaTag>;
  metaTagByProvinceIDByType: Array<MetaTagProvince>;
  metaTagProductTypes: Array<MetaTagType>;
  contactUs: Scalars['Boolean'];
  siteMap: SiteMap;
  userRegionId?: Maybe<Scalars['String']>;
  blogSearch: Array<BlogType>;
  businessBySlugHasLanding?: Maybe<Business>;
  siteMapTop5: SiteMapWeb;
  userSubscription: Scalars['Boolean'];
  locationListProvinceForSiteMap: Array<Maybe<Province>>;
  locationListRegionByProvinceForSiteMap: Array<Region>;
  productsByRegions: Array<Maybe<Product>>;
  userRegionCountry?: Maybe<Scalars['String']>;
  userRegion?: Maybe<Region>;
  usersSalesNameAll: Array<User>;
  reportIssue: Scalars['Boolean'];
  businessNearBy?: Maybe<Array<Maybe<Business>>>;
  businessByUserId: Result;
  userUnSubscription: Scalars['Boolean'];
  sendEmail: Scalars['Boolean'];
  sendFeedback: Scalars['Boolean'];
  productByUserId: Result;
  locationFooterPosition: Array<Region>;
  locationFooterPositionSEOPanel: Result;
  dealByUserId: Result;
  businessHasDealsByUserId: Array<Business>;
  businessAll: Result;
  locationListAllRegion: Array<Region>;
  businessAllRestore: Result;
  businessFeaturedSearch: Result;
  productAll: Result;
  productAllByType?: Maybe<Array<Maybe<Product>>>;
  nearRegionByProductType?: Maybe<Array<Maybe<Region>>>;
  productAllByTypeDistance2km: Result;
  productAllByTypeDistance10km: Result;
  productAllByTypeMailOrder?: Maybe<Array<Maybe<Product>>>;
  productAllByTypeMailOrderLinkBrand?: Maybe<Array<Maybe<Product>>>;
  productAllByTypeBrandLinkMailOrder?: Maybe<Array<Maybe<Product>>>;
  businessByIdForAdmin?: Maybe<Business>;
  productListTypes: List;
  businessFeaturedPositionByRegion: Array<Maybe<Scalars['Int']>>;
  productCategoriesCounter: List;
  userById?: Maybe<User>;
  claimYourListing: Scalars['Boolean'];
  userAll: Result;
  blogsAll: Result;
  authorsBlogsAll: Array<Maybe<User>>;
  blogByIdForAdmin?: Maybe<Blog>;
  businessAllBrandsForDashboard: Array<Business>;
  businessAllDashboardSearch?: Maybe<Array<Maybe<Business>>>;
  productTypeBySlug?: Maybe<Scalars['String']>;
  allBrandsForBrandLibrary: Array<Maybe<Business>>;
  productsByBusinessIdForBrandLibrary: Array<Maybe<Product>>;
  productTypesByBusinessID: Array<Maybe<ProductType>>;
  userAdBudgetByUserId?: Maybe<Scalars['Float']>;
  userAdBudgetByUserIdByDate: Array<Maybe<Budget>>;
  userAdPositiveTransactionsByUserId: Array<Maybe<Transaction>>;
  userAdNegativeTransactionsByUserId: Array<Maybe<TransactionNegative>>;
  productAdvertisement: Array<Maybe<Product>>;
  productAdvertisementForProductPage: Array<Maybe<Product>>;
  businessAdvertisementForProductPage: Array<Maybe<Business>>;
  productListTypesForAdminAdvertisement: Array<Maybe<ProductType>>;
  strainNameSearch: Array<Maybe<ProductType>>;
  brandBusinessByProductType?: Maybe<Array<Maybe<Scalars['String']>>>;
  strainNameByRegionByType: Array<Maybe<Scalars['String']>>;
  productTypeAll: Result;
  metaTagProductTypesById?: Maybe<MetaTagType>;
  productAllTotalCount: Result;
  productAllBeforeCount: Result;
  productAllAfterCount: Result;
  businessAllTotalCount: Result;
  businessAllBeforeCount: Result;
  businessAllAfterCount: Result;
  productAllPageIds: Result;
  businessAllPageIds: Result;
  eventById?: Maybe<Event>;
  eventAll: Result;
  productsByBusinessId: Result;
  sendMailWholeSale: Scalars['Boolean'];
  analyticsBusinessesCount: Scalars['Int'];
  analyticsProductsCount: Scalars['Int'];
  analyticsUsersCount: Scalars['Int'];
  analyticsRegionsCount: Scalars['Int'];
  analyticsDealsCount: Scalars['Int'];
  analyticsBannerClicks: Scalars['Int'];
  analyticsBannerClicksList: Result;
  analyticsBusinessesDailyCount: Result;
  analyticsUsersDailyCount: Result;
  analyticsBusinessesAdmin: Result;
  analyticsBusinessesSale: Result;
  analyticsRegions: Result;
  analyticsDeals: Result;
  analyticsUsers: Result;
  reviewsByBusinessId: Result;
  reviewsByProductId: Result;
  reviewsByUserId: Result;
  currentUser?: Maybe<CurrentUser>;
  wholesaleBrands: BusinessPage;
  wholesalePrices: PricePage;
  wholesaleEditProductList: ProductPage;
  wholesaleSellerBrands: Array<Business>;
  wholesaleSellerProducts: Array<Product>;
  wholesaleCart: Array<CartItem>;
};


export type QueryLocationSearchRegionArgs = {
  slug?: Maybe<Scalars['String']>;
  sortPopular?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryLocationListRegionArgs = {
  longitudeGPS?: Maybe<Scalars['Float']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  sortByLocation?: Maybe<Scalars['Boolean']>;
  plCountryID?: Maybe<Scalars['Int']>;
  sortPopular?: Maybe<Scalars['Boolean']>;
  showAll?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryLocationListRegionSeoPanelArgs = {
  plCountryID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryLocationListProvinceSeoPanelArgs = {
  plCountryID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryLocationListRegionByProvinceArgs = {
  provinceId: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryLocationListRegionByProvinceForUserArgs = {
  provinceId: Scalars['Int'];
};


export type QueryLocationListRegionNearRegionArgs = {
  regionId: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessMonthlyTopPicksArgs = {
  plRegionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessMonthlyTopPicksBrandsArgs = {
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessMonthlyTopPicksDeliveriesArgs = {
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessMonthlyTopPicksMailArgs = {
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessMonthlyTopPicksDispensaryArgs = {
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessMonthlyTopPicksForAdminArgs = {
  date: Scalars['String'];
  plRegionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessFeaturedBrandsArgs = {
  linkProvinceID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
};


export type QueryBusinessFeaturedDeliveriesArgs = {
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
};


export type QueryBusinessFeaturedMailArgs = {
  linkProvinceID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
};


export type QueryBusinessFeaturedDispensaryArgs = {
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
};


export type QueryBusinessVerifiedBrandsArgs = {
  linkProvinceID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
};


export type QueryBusinessVerifiedDeliveriesArgs = {
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
};


export type QueryBusinessVerifiedMailArgs = {
  linkProvinceID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
};


export type QueryBusinessVerifiedDispensaryArgs = {
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllVerifiedArgs = {
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllByLocationArgs = {
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllBrandsArgs = {
  linkProvinceID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllDeliveriesArgs = {
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllMailArgs = {
  linkProvinceID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllDispensaryArgs = {
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
};


export type QueryProductByIdArgs = {
  id: Scalars['String'];
};


export type QueryProductByIdDashboardArgs = {
  id: Scalars['String'];
};


export type QueryProductByIdForBrandLibraryArgs = {
  id: Scalars['String'];
};


export type QueryProductBySlugArgs = {
  plSlugType: Scalars['String'];
  bizSlug: Scalars['String'];
  prdSlug: Scalars['String'];
  regionSlug?: Maybe<Scalars['String']>;
};


export type QueryBusinessByIdArgs = {
  bizBusinessID: Scalars['String'];
  currentTime?: Maybe<Scalars['String']>;
  bizIsRegulated?: Maybe<Scalars['Boolean']>;
};


export type QueryBusinessByIdDashboardArgs = {
  bizBusinessID: Scalars['String'];
};


export type QueryBusinessBySlugArgs = {
  plSlugType: Scalars['String'];
  bizSlug: Scalars['String'];
  regionSlug?: Maybe<Scalars['String']>;
};


export type QueryDealByIdArgs = {
  dlsDealsID: Scalars['String'];
};


export type QueryDealByIdForDashboardArgs = {
  dlsDealsID: Scalars['String'];
};


export type QueryDealBySlugArgs = {
  bizSlug: Scalars['String'];
  dlsSlug: Scalars['String'];
};


export type QueryDealListByTypeByRegArgs = {
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  dlsApplyTo?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusProdDealSearchByNameArgs = {
  name: Scalars['String'];
  plRegionID?: Maybe<Scalars['Int']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
  prdProductType?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
  prdGenetics?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
  isGlobalSearch?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
  countryId?: Maybe<Scalars['Int']>;
  showPagination?: Maybe<Scalars['Boolean']>;
  showBrand?: Maybe<Scalars['Boolean']>;
  withPrice?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBlogListByTypeArgs = {
  type?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProvinceByInitialArgs = {
  initial: Scalars['String'];
};


export type QueryBlogByIdArgs = {
  blgBlogID?: Maybe<Scalars['String']>;
};


export type QueryBlogBySlugArgs = {
  blgSlug?: Maybe<Scalars['String']>;
};


export type QueryBlogTypeAllArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryLocationListNearLocationArgs = {
  locationSlug: Scalars['String'];
  type: Scalars['String'];
  countryId?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryLocationListProvinceArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessByCoordinatesArgs = {
  firstLongitude: Scalars['Float'];
  firstLatitude: Scalars['Float'];
  secondLongitude: Scalars['Float'];
  secondLatitude: Scalars['Float'];
  plSlugType?: Maybe<Scalars['String']>;
  plRegionID?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['String']>;
};


export type QueryDealListByRegRandomArgs = {
  plRegionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryMetaTagByRegionIdByTypeArgs = {
  plRegionID: Scalars['Int'];
  categoryType: Scalars['String'];
};


export type QueryMetaTagByProvinceIdByTypeArgs = {
  plProvinceID: Scalars['Int'];
  categoryType: Scalars['String'];
};


export type QueryContactUsArgs = {
  name: Scalars['String'];
  subject: Scalars['String'];
  message: Scalars['String'];
  emailFrom: Scalars['String'];
  city: Scalars['String'];
  RegionID: Scalars['String'];
  province: Scalars['String'];
};


export type QueryBlogSearchArgs = {
  name: Scalars['String'];
};


export type QueryBusinessBySlugHasLandingArgs = {
  bizSlug: Scalars['String'];
};


export type QuerySiteMapTop5Args = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryUserSubscriptionArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  usrRegionID?: Maybe<Scalars['String']>;
  mailPreferences?: Maybe<Scalars['String']>;
};


export type QueryLocationListProvinceForSiteMapArgs = {
  longitudeGPS?: Maybe<Scalars['Float']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  sortByLocation?: Maybe<Scalars['Boolean']>;
};


export type QueryLocationListRegionByProvinceForSiteMapArgs = {
  provinceId: Scalars['Int'];
};


export type QueryProductsByRegionsArgs = {
  bizRegionIDs: Array<Maybe<Scalars['String']>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryUserRegionCountryArgs = {
  clientIp?: Maybe<Scalars['String']>;
};


export type QueryUserRegionArgs = {
  clientIp?: Maybe<Scalars['String']>;
};


export type QueryReportIssueArgs = {
  name: Scalars['String'];
  emailFrom: Scalars['String'];
  description: Scalars['String'];
  city: Scalars['String'];
  regionID: Scalars['String'];
  province: Scalars['String'];
  stepsReproduce?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['String']>;
  originalPage?: Maybe<Scalars['String']>;
};


export type QueryBusinessNearByArgs = {
  countryId: Scalars['Int'];
  plRegionID: Scalars['Int'];
  plType?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessByUserIdArgs = {
  userId: Scalars['String'];
  regionID?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  expired?: Maybe<Scalars['Boolean']>;
  featured?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Scalars['Boolean']>;
  bizClaim?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryUserUnSubscriptionArgs = {
  email: Scalars['String'];
  id: Scalars['String'];
};


export type QuerySendEmailArgs = {
  id: Scalars['String'];
  emailFrom: Scalars['String'];
  emailTo: Scalars['String'];
  subject: Scalars['String'];
  message: Scalars['String'];
  button?: Maybe<Scalars['String']>;
  buttonSecond?: Maybe<Scalars['String']>;
};


export type QuerySendFeedbackArgs = {
  message: Scalars['String'];
  questions?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>>>>>;
  email?: Maybe<Scalars['String']>;
};


export type QueryProductByUserIdArgs = {
  userId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  bizName?: Maybe<Scalars['String']>;
  businessId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryLocationFooterPositionSeoPanelArgs = {
  plCountryID?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryDealByUserIdArgs = {
  userId: Scalars['String'];
  dlsName?: Maybe<Scalars['String']>;
  bizBusinessID?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessHasDealsByUserIdArgs = {
  userId: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllArgs = {
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  regionID?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  expired?: Maybe<Scalars['Boolean']>;
  featured?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Scalars['Boolean']>;
  bizClaim?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  back?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryLocationListAllRegionArgs = {
  plCountryID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllRestoreArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessFeaturedSearchArgs = {
  regionId: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  featured?: Maybe<Scalars['Boolean']>;
  bizIsLite?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductAllArgs = {
  name?: Maybe<Scalars['String']>;
  businessId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Scalars['Boolean']>;
  createdDateStart?: Maybe<Scalars['String']>;
  createdDateEnd?: Maybe<Scalars['String']>;
  back?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductAllByTypeArgs = {
  bizSlugType?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductTypeSlug?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategoriesSlug?: Maybe<Array<Maybe<Scalars['String']>>>;
  distance?: Maybe<Array<Maybe<Scalars['Int']>>>;
  clientIp?: Maybe<Scalars['String']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryNearRegionByProductTypeArgs = {
  plRegionID: Scalars['Int'];
  prdProductType: Array<Maybe<Scalars['String']>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>>>;
  strainSlug?: Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductAllByTypeDistance2kmArgs = {
  bizSlugType?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductTypeSlug?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategoriesSlug?: Maybe<Array<Maybe<Scalars['String']>>>;
  clientIp?: Maybe<Scalars['String']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductAllByTypeDistance10kmArgs = {
  bizSlugType: Array<Maybe<Scalars['String']>>;
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductTypeSlug?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategoriesSlug?: Maybe<Array<Maybe<Scalars['String']>>>;
  clientIp?: Maybe<Scalars['String']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductAllByTypeMailOrderArgs = {
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductTypeSlug?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategoriesSlug?: Maybe<Array<Maybe<Scalars['String']>>>;
  distance?: Maybe<Array<Maybe<Scalars['Int']>>>;
  clientIp?: Maybe<Scalars['String']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductAllByTypeMailOrderLinkBrandArgs = {
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductTypeSlug?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategoriesSlug?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductAllByTypeBrandLinkMailOrderArgs = {
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductTypeSlug?: Maybe<Array<Maybe<Scalars['String']>>>;
  prdProductCategoriesSlug?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessByIdForAdminArgs = {
  bizBusinessID: Scalars['String'];
};


export type QueryProductListTypesArgs = {
  businessType?: Maybe<Array<Maybe<Scalars['String']>>>;
  brandFilter?: Maybe<Scalars['Boolean']>;
  strainNameFilter?: Maybe<Scalars['Boolean']>;
};


export type QueryBusinessFeaturedPositionByRegionArgs = {
  bizBusinessID: Scalars['String'];
  regionId: Scalars['Int'];
  type: Scalars['String'];
};


export type QueryProductCategoriesCounterArgs = {
  name: Scalars['String'];
  scope?: Maybe<Scalars['Int']>;
};


export type QueryUserByIdArgs = {
  userId: Scalars['String'];
};


export type QueryClaimYourListingArgs = {
  name: Scalars['String'];
  phoneNumber: Scalars['String'];
  timeToCall: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};


export type QueryUserAllArgs = {
  name?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  ip?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  leafythingsEmailsOnly?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBlogsAllArgs = {
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBlogByIdForAdminArgs = {
  blgBlogID: Scalars['String'];
};


export type QueryBusinessAllBrandsForDashboardArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllDashboardSearchArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryProductTypeBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryProductsByBusinessIdForBrandLibraryArgs = {
  bizBusinessID: Scalars['String'];
};


export type QueryProductTypesByBusinessIdArgs = {
  bizBusinessID: Scalars['String'];
};


export type QueryUserAdBudgetByUserIdArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryUserAdBudgetByUserIdByDateArgs = {
  userId: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
};


export type QueryUserAdPositiveTransactionsByUserIdArgs = {
  userId: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
};


export type QueryUserAdNegativeTransactionsByUserIdArgs = {
  userId: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
};


export type QueryProductAdvertisementArgs = {
  bizSlugType: Array<Maybe<Scalars['String']>>;
  productTypeNames: Array<Maybe<Scalars['String']>>;
  productCategoriesNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  clientIp?: Maybe<Scalars['String']>;
  plProvinceID?: Maybe<Scalars['Int']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductAdvertisementForProductPageArgs = {
  prdProductID: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAdvertisementForProductPageArgs = {
  prdProductID: Scalars['String'];
  clientIp?: Maybe<Scalars['String']>;
  plProvinceID?: Maybe<Scalars['Int']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductListTypesForAdminAdvertisementArgs = {
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryStrainNameSearchArgs = {
  strainName: Scalars['String'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBrandBusinessByProductTypeArgs = {
  prdProductType: Array<Maybe<Scalars['String']>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>>>;
  strainSlug?: Maybe<Scalars['String']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  distance?: Maybe<Array<Maybe<Scalars['Int']>>>;
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryStrainNameByRegionByTypeArgs = {
  regionId: Scalars['Int'];
  prdProductType: Array<Maybe<Scalars['String']>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>>>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
};


export type QueryProductTypeAllArgs = {
  search?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryMetaTagProductTypesByIdArgs = {
  typeId?: Maybe<Scalars['Int']>;
};


export type QueryProductAllTotalCountArgs = {
  name?: Maybe<Scalars['String']>;
  businessId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Scalars['Boolean']>;
  createdDateStart?: Maybe<Scalars['String']>;
  createdDateEnd?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductAllBeforeCountArgs = {
  name?: Maybe<Scalars['String']>;
  businessId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Scalars['Boolean']>;
  createdDateStart?: Maybe<Scalars['String']>;
  createdDateEnd?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductAllAfterCountArgs = {
  name?: Maybe<Scalars['String']>;
  businessId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Scalars['Boolean']>;
  createdDateStart?: Maybe<Scalars['String']>;
  createdDateEnd?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllTotalCountArgs = {
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  regionID?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  expired?: Maybe<Scalars['Boolean']>;
  featured?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Scalars['Boolean']>;
  bizClaim?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllBeforeCountArgs = {
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  regionID?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  expired?: Maybe<Scalars['Boolean']>;
  featured?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Scalars['Boolean']>;
  bizClaim?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllAfterCountArgs = {
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  regionID?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  expired?: Maybe<Scalars['Boolean']>;
  featured?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Scalars['Boolean']>;
  bizClaim?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductAllPageIdsArgs = {
  name?: Maybe<Scalars['String']>;
  businessId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Scalars['Boolean']>;
  createdDateStart?: Maybe<Scalars['String']>;
  createdDateEnd?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryBusinessAllPageIdsArgs = {
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  regionID?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  expired?: Maybe<Scalars['Boolean']>;
  featured?: Maybe<Scalars['Boolean']>;
  verified?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Scalars['Boolean']>;
  bizClaim?: Maybe<Scalars['Boolean']>;
  email?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryEventByIdArgs = {
  evtEventID: Scalars['Int'];
};


export type QueryEventAllArgs = {
  search?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryProductsByBusinessIdArgs = {
  bizBusinessID: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  regionID?: Maybe<Scalars['Int']>;
  published?: Maybe<Scalars['Boolean']>;
  reviews?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  wholeSale?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QuerySendMailWholeSaleArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
  message: Scalars['String'];
  bizEmail: Scalars['String'];
};


export type QueryAnalyticsBannerClicksListArgs = {
  startDate: Scalars['String'];
  endDate: Scalars['String'];
};


export type QueryAnalyticsBusinessesDailyCountArgs = {
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryAnalyticsUsersDailyCountArgs = {
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type QueryAnalyticsBusinessesAdminArgs = {
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  regionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryAnalyticsBusinessesSaleArgs = {
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  regionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryAnalyticsRegionsArgs = {
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  sort?: Maybe<Scalars['String']>;
  regionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryAnalyticsDealsArgs = {
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryAnalyticsUsersArgs = {
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryReviewsByBusinessIdArgs = {
  businessId: Scalars['String'];
  showDeleted?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryReviewsByProductIdArgs = {
  productId: Scalars['String'];
  showDeleted?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryReviewsByUserIdArgs = {
  userId: Scalars['String'];
  showDeleted?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryWholesaleBrandsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  sortField?: Maybe<BusinessSortField>;
  sortOrder?: Maybe<SortOrder>;
  name?: Maybe<Scalars['String']>;
};


export type QueryWholesalePricesArgs = {
  sortField?: Maybe<ProductSortOrder>;
  sortOrder?: Maybe<SortOrder>;
  filter: ProductFilterInput;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryWholesaleEditProductListArgs = {
  sortField?: Maybe<ProductSortOrder>;
  sortOrder?: Maybe<SortOrder>;
  filter: ProductFilterInput;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryWholesaleSellerProductsArgs = {
  filter: ProductFilterInput;
};

export type Region = {
  plRegionID: Scalars['Int'];
  plProvinceID: Scalars['Int'];
  plName: Scalars['String'];
  plSlug: Scalars['String'];
  plLatitude?: Maybe<Scalars['Float']>;
  plLongitude?: Maybe<Scalars['Float']>;
  plFooterPosition?: Maybe<Scalars['Int']>;
  plDescription?: Maybe<Scalars['String']>;
  plDescription2?: Maybe<Scalars['String']>;
  plNeighbourhood?: Maybe<Scalars['String']>;
  mdaLocalFileName?: Maybe<Scalars['String']>;
  province: Province;
  bizCount?: Maybe<Scalars['Int']>;
  bizBrandCount?: Maybe<Scalars['Int']>;
  bizMailOrderCount?: Maybe<Scalars['Int']>;
  bizDeliveryCount?: Maybe<Scalars['Int']>;
  bizDispensaryCount?: Maybe<Scalars['Int']>;
  bizFeaturedCount?: Maybe<Scalars['Int']>;
  bizVerifiedCount?: Maybe<Scalars['Int']>;
  bizLiteCount?: Maybe<Scalars['Int']>;
  topPickCount?: Maybe<Scalars['Int']>;
};

export type Result = {
  pagination?: Maybe<Pagination>;
  products?: Maybe<Array<Maybe<Product>>>;
  businesses?: Maybe<Array<Maybe<Business>>>;
  deals?: Maybe<Array<Maybe<BusinessDeals>>>;
  users?: Maybe<Array<Maybe<User>>>;
  reviews?: Maybe<Array<Maybe<Review>>>;
  blogs?: Maybe<Array<Maybe<Blog>>>;
  regions?: Maybe<Array<Maybe<Region>>>;
  province?: Maybe<Array<Maybe<Province>>>;
  events?: Maybe<Array<Maybe<Event>>>;
  analyticsInfo?: Maybe<Array<Maybe<AnalyticsInfo>>>;
  analyticsDaily?: Maybe<Array<Maybe<AnalyticsDaily>>>;
  productType?: Maybe<Array<Maybe<ProductType>>>;
  productStrainName?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Review = {
  rvwReviewID: Scalars['String'];
  rvwAssociateID: Scalars['String'];
  rvwScore: Scalars['Int'];
  rvwComment: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  rvwCreationDate?: Maybe<Scalars['Date']>;
  deleted_at?: Maybe<Scalars['Date']>;
  rvwReply?: Maybe<Scalars['String']>;
  canDeleteReview?: Maybe<Scalars['Boolean']>;
  rvwReplyCreatedAt?: Maybe<Scalars['Date']>;
  rvwReplyAuthorName?: Maybe<User>;
};

export type ReviewInput = {
  rvwAssociateID: Scalars['String'];
  rvwScore: Scalars['Int'];
  rvwComment: Scalars['String'];
};

export type ReviewReplyInput = {
  rvwAssociateID: Scalars['String'];
  rvwReply: Scalars['String'];
  rvwReviewID: Scalars['String'];
};

export type SiteMap = {
  static: Array<Maybe<Scalars['String']>>;
  brands: Array<Maybe<Scalars['String']>>;
  deals: Array<Maybe<Scalars['String']>>;
  mail_order_marijuana: Array<Maybe<Scalars['String']>>;
  marijuana_dispensary: Array<Maybe<Scalars['String']>>;
  medical_marijuana_prescription: Array<Maybe<Scalars['String']>>;
  weed_delivery: Array<Maybe<Scalars['String']>>;
  blog: Array<Maybe<Scalars['String']>>;
};

export type SiteMapCity = {
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type SiteMapProvince = {
  provinceId: Scalars['Int'];
  province: Scalars['String'];
  type: Scalars['String'];
  city?: Maybe<Array<Maybe<SiteMapCity>>>;
};


export type SiteMapProvinceCityArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};

export type SiteMapWeb = {
  brands: Array<Maybe<SiteMapProvince>>;
  mail_order_marijuana: Array<Maybe<SiteMapProvince>>;
  weed_delivery: Array<Maybe<SiteMapProvince>>;
  marijuana_dispensary: Array<Maybe<SiteMapProvince>>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum TradeUnit {
  SevenGrams = 'SevenGrams',
  FourteenGrams = 'FourteenGrams',
  TwentyEightGrams = 'TwentyEightGrams',
  QuarterPound = 'QuarterPound',
  HalfPound = 'HalfPound',
  OnePound = 'OnePound',
  OneKilogram = 'OneKilogram',
  Case = 'Case'
}

export type Transaction = {
  hisCreationDate: Scalars['Date'];
  hisAmount: Scalars['Float'];
};

export type TransactionNegative = {
  creationDate: Scalars['Date'];
  amount: Scalars['Float'];
  count: Scalars['Int'];
  budget: Scalars['Float'];
};

export type Type = {
  plBusinessTypeID?: Maybe<Scalars['Int']>;
  plType: Scalars['String'];
  plCategory?: Maybe<Scalars['String']>;
  plSlug: Scalars['String'];
  plSortOrder?: Maybe<Scalars['Int']>;
};


export type User = {
  usrUserID?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  usrRegistrationIP?: Maybe<Scalars['String']>;
  usrRegionID?: Maybe<Scalars['String']>;
  usrProvinceID?: Maybe<Scalars['String']>;
  usrBirthDate?: Maybe<Scalars['Date']>;
  usrFirstName?: Maybe<Scalars['String']>;
  usrLastName?: Maybe<Scalars['String']>;
  usrCreationDate?: Maybe<Scalars['Date']>;
  usrLastLoginDate?: Maybe<Scalars['Date']>;
  email_verified_at?: Maybe<Scalars['Date']>;
  usrSubscription?: Maybe<Scalars['Int']>;
  userRoles?: Maybe<Array<Maybe<Scalars['String']>>>;
  bizName?: Maybe<Scalars['String']>;
  accountManager?: Maybe<User>;
  mailPreferences?: Maybe<Array<Maybe<Scalars['String']>>>;
  rvwCount?: Maybe<Scalars['Int']>;
  bizCount?: Maybe<Scalars['Int']>;
  region?: Maybe<Region>;
  province?: Maybe<Province>;
};


export type UserBizCountArgs = {
  published?: Maybe<Scalars['Boolean']>;
};

export type UserInput = {
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  usrProvinceID?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  usrRegionID?: Maybe<Scalars['String']>;
  usrUserID?: Maybe<Scalars['String']>;
  userSubscription?: Maybe<Scalars['Boolean']>;
  mailPreferences?: Maybe<Scalars['String']>;
  usrFirstName?: Maybe<Scalars['String']>;
  usrLastName?: Maybe<Scalars['String']>;
  usrBirthDate?: Maybe<Scalars['String']>;
  usrRegistrationSource?: Maybe<Scalars['String']>;
};

export type VerificationsInput = {
  userID?: Maybe<Scalars['String']>;
  verification_code?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
};

export type WorkingHours = {
  ophBusinessID?: Maybe<Scalars['String']>;
  ophDayOfWeek?: Maybe<Scalars['Int']>;
  ophOpenTime?: Maybe<Scalars['Date']>;
  ophCloseTime?: Maybe<Scalars['Date']>;
  ophIsOpen?: Maybe<Scalars['Int']>;
};

export type WorkingHoursInput = {
  ophDayOfWeek: Scalars['Int'];
  ophOpenTime: Scalars['Date'];
  ophCloseTime: Scalars['Date'];
  ophIsOpen: Scalars['Int'];
};

export type AnalyticsSaveMutationVariables = Exact<{
  input?: Maybe<AnalyticsSave>;
}>;


export type AnalyticsSaveMutation = { analyticsSave?: Maybe<boolean> };

export type AnalyticsSaveSearchMutationVariables = Exact<{
  input?: Maybe<AnalyticsSearch>;
}>;


export type AnalyticsSaveSearchMutation = { analyticsSaveSearch?: Maybe<boolean> };

export type AnalyticsBannerClickMutationVariables = Exact<{
  userAction: Scalars['String'];
  userIP?: Maybe<Scalars['String']>;
}>;


export type AnalyticsBannerClickMutation = { analyticsBannerClick?: Maybe<boolean> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { currentUser?: Maybe<{ email: string, username: string, usrFirstName?: Maybe<string>, usrLastName?: Maybe<string>, usrUserID: string, email_verified_at?: Maybe<any>, userRoles?: Maybe<Array<string>>, usrSubscription?: Maybe<number> }> };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { login: { token?: Maybe<string>, currentUser?: Maybe<{ email: string, username: string, usrFirstName?: Maybe<string>, usrLastName?: Maybe<string>, usrUserID: string, email_verified_at?: Maybe<any>, userRoles?: Maybe<Array<string>>, usrSubscription?: Maybe<number> }> } };

export type RegisterUserMutationVariables = Exact<{
  input: UserInput;
  wired?: Maybe<Scalars['Boolean']>;
  source?: Maybe<Scalars['String']>;
}>;


export type RegisterUserMutation = { userRegister: { token?: Maybe<string>, currentUser?: Maybe<{ email: string, username: string, usrFirstName?: Maybe<string>, usrLastName?: Maybe<string>, usrUserID: string, email_verified_at?: Maybe<any>, userRoles?: Maybe<Array<string>>, usrSubscription?: Maybe<number> }> } };

export type SendPasswordEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendPasswordEmailMutation = { resetPassword: boolean };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type ResetPasswordMutation = { newPassword: { token?: Maybe<string>, currentUser?: Maybe<{ email: string, username: string, usrFirstName?: Maybe<string>, usrLastName?: Maybe<string>, usrUserID: string, email_verified_at?: Maybe<any>, userRoles?: Maybe<Array<string>>, usrSubscription?: Maybe<number> }> } };

export type UserVerificationMutationVariables = Exact<{
  id: Scalars['String'];
  code: Scalars['String'];
}>;


export type UserVerificationMutation = { userVerification: boolean };

export type ResendVerificationMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ResendVerificationMutation = { resendEmailConfirm: boolean };

export type BlogListByTypeQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
}>;


export type BlogListByTypeQuery = { blogListByType: Array<{ blgDescription?: Maybe<string>, blgBody?: Maybe<string>, blgBlogID: string, blgPublishedAt?: Maybe<any>, blgSlug: string, blgTitle: string, mdaLocalFileName?: Maybe<string>, plType?: Maybe<string>, types?: Maybe<Array<Maybe<string>>>, authorName?: Maybe<{ username?: Maybe<string>, bizName?: Maybe<string> }> }> };

export type BlogTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type BlogTypesQuery = { blogTypeAll: Array<{ plBlogTypeID: number, plSlug?: Maybe<string>, plType: string }> };

export type BlogBySlugQueryVariables = Exact<{
  blogSlug: Scalars['String'];
}>;


export type BlogBySlugQuery = { blogBySlug?: Maybe<{ blgDescription?: Maybe<string>, blgBody?: Maybe<string>, blgBlogID: string, blgPublishedAt?: Maybe<any>, blgSlug: string, blgTitle: string, mdaLocalFileName?: Maybe<string>, plType?: Maybe<string>, types?: Maybe<Array<Maybe<string>>>, authorName?: Maybe<{ username?: Maybe<string>, bizName?: Maybe<string> }> }> };

export type BlogSearchQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type BlogSearchQuery = { blogSearch: Array<{ plBlogTypeID: number, plSlug?: Maybe<string>, plType: string, blogs?: Maybe<Array<Maybe<{ blgBlogID: string, blgDescription?: Maybe<string>, blgPublishedAt?: Maybe<any>, blgSlug: string, blgTitle: string, mdaLocalFileName?: Maybe<string>, plType?: Maybe<string>, types?: Maybe<Array<Maybe<string>>>, authorName?: Maybe<{ username?: Maybe<string>, bizName?: Maybe<string> }> }>>> }> };

export type BusinessNameBySlugQueryVariables = Exact<{
  bizSlug: Scalars['String'];
  plSlugType: Scalars['String'];
  regionSlug?: Maybe<Scalars['String']>;
}>;


export type BusinessNameBySlugQuery = { businessBySlug?: Maybe<{ bizBusinessID: string, bizName: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizSlug: string, plType: string, bizTags?: Maybe<Array<Maybe<string>>>, dutchieAPI?: Maybe<string>, rvwScoreAvg?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwCount?: Maybe<number>, reviews: Array<{ username?: Maybe<string>, rvwComment: string, rvwScore: number }>, contact?: Maybe<{ bizPhone?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizWebsiteURL?: Maybe<string>, bizPostal?: Maybe<string>, bizLongitude?: Maybe<number>, bizLatitude?: Maybe<number>, bizStreetAddress?: Maybe<string>, bizIntersection?: Maybe<string>, provinceName?: Maybe<string>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }>, workingHours?: Maybe<Array<Maybe<{ ophBusinessID?: Maybe<string>, ophCloseTime?: Maybe<any>, ophDayOfWeek?: Maybe<number>, ophIsOpen?: Maybe<number>, ophOpenTime?: Maybe<any> }>>> }> };

export type ProductNameBySlugQueryVariables = Exact<{
  bizSlug: Scalars['String'];
  plSlugType: Scalars['String'];
  prdSlug: Scalars['String'];
  regionSlug?: Maybe<Scalars['String']>;
}>;


export type ProductNameBySlugQuery = { productBySlug: Array<{ prdName: string, prdProductID: string, prdSlug: string, prdDescription: string, mdaLocalFileName?: Maybe<string>, rvwCount?: Maybe<number>, rvwScoreAvg?: Maybe<number>, reviews: Array<{ rvwReviewID: string, username?: Maybe<string>, rvwComment: string, rvwScore: number }>, business: Array<{ bizBusinessID: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizName: string, bizSlug: string, plType: string, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> }> };

export type DealNameBySlugQueryVariables = Exact<{
  bizSlug: Scalars['String'];
  dlsSlug: Scalars['String'];
}>;


export type DealNameBySlugQuery = { dealBySlug?: Maybe<{ dlsName: string, dlsDealsID: string, dlsSlug: string, mdaLocalFileName?: Maybe<string> }> };

export type BlogNameBySlugQueryVariables = Exact<{
  blgSlug: Scalars['String'];
}>;


export type BlogNameBySlugQuery = { blogBySlug?: Maybe<{ blgTitle: string, blgBlogID: string, blgSlug: string, mdaLocalFileName?: Maybe<string> }> };

export type RegionNameBySlugQueryVariables = Exact<{
  regionSlug: Scalars['String'];
}>;


export type RegionNameBySlugQuery = { locationSearchRegion: Array<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type ProductTypeNameBySlugQueryVariables = Exact<{
  prdTypeSlug: Scalars['String'];
}>;


export type ProductTypeNameBySlugQuery = { productTypeBySlug?: Maybe<string> };

export type BusinessMonthlyTopPicksQueryVariables = Exact<{
  plRegionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessMonthlyTopPicksQuery = { businessMonthlyTopPicks: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessNearByQueryVariables = Exact<{
  countryId: Scalars['Int'];
  plRegionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plType?: Maybe<Scalars['String']>;
}>;


export type BusinessNearByQuery = { businessNearBy?: Maybe<Array<Maybe<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>>> };

export type BusinessMonthlyTopPicksBrandsQueryVariables = Exact<{
  plRegionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessMonthlyTopPicksBrandsQuery = { businessMonthlyTopPicksBrands: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessMonthlyTopPicksMailQueryVariables = Exact<{
  plRegionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessMonthlyTopPicksMailQuery = { businessMonthlyTopPicksMail: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessMonthlyTopPicksDeliveriesQueryVariables = Exact<{
  plRegionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessMonthlyTopPicksDeliveriesQuery = { businessMonthlyTopPicksDeliveries: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessMonthlyTopPicksDispensariesQueryVariables = Exact<{
  plRegionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessMonthlyTopPicksDispensariesQuery = { businessMonthlyTopPicksDispensary: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessFeaturedBrandsQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
  linkProvinceID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessFeaturedBrandsQuery = { businessFeaturedBrands: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessVerifiedBrandsQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
  linkProvinceID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessVerifiedBrandsQuery = { businessVerifiedBrands: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessAllBrandsQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
  linkProvinceID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessAllBrandsQuery = { businessAllBrands: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessFeaturedDeliveriesQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessFeaturedDeliveriesQuery = { businessFeaturedDeliveries: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessVerifiedDeliveriesQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessVerifiedDeliveriesQuery = { businessVerifiedDeliveries: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessAllDeliveriesQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessAllDeliveriesQuery = { businessAllDeliveries: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessFeaturedDispensaryQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessFeaturedDispensaryQuery = { businessFeaturedDispensary: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessVerifiedDispensaryQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessVerifiedDispensaryQuery = { businessVerifiedDispensary: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessAllDispensaryQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessAllDispensaryQuery = { businessAllDispensary: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessFeaturedMailQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
  linkProvinceID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessFeaturedMailQuery = { businessFeaturedMail: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessVerifiedMailQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
  linkProvinceID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessVerifiedMailQuery = { businessVerifiedMail: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessAllMailQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
  linkProvinceID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessAllMailQuery = { businessAllMail: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessBySlugQueryVariables = Exact<{
  plSlugType: Scalars['String'];
  bizSlug: Scalars['String'];
  regionSlug?: Maybe<Scalars['String']>;
  prdGenetics?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  search?: Maybe<Scalars['String']>;
  productOffset?: Maybe<Scalars['Int']>;
  productLimit?: Maybe<Scalars['Int']>;
  filterByLocation?: Maybe<Scalars['Boolean']>;
  latitudeFront?: Maybe<Scalars['Float']>;
  longitudeFront?: Maybe<Scalars['Float']>;
  regionID?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  clientIp?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  resellersLimit?: Maybe<Scalars['Int']>;
  brandsLimit?: Maybe<Scalars['Int']>;
}>;


export type BusinessBySlugQuery = { businessBySlug?: Maybe<{ plType: string, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, isOpen?: Maybe<boolean>, isToday?: Maybe<number>, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, willOpen?: Maybe<string>, canAddReview?: Maybe<boolean>, bizBusinessID: string, bizName: string, bizSlug: string, productAvailable?: Maybe<boolean>, productCount: number, dutchieAPI?: Maybe<string>, bizDescription?: Maybe<string>, bizFeaturedPosition: number, bizIsVerified: number, bizIsLite?: Maybe<number>, bizHasMapPin: number, bizSortOption?: Maybe<string>, productType?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>> }>>> }>>>, brands: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, resellers: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, bizChat?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizIntersection?: Maybe<string>, bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, bizPhone?: Maybe<string>, bizStreetAddress?: Maybe<string>, bizText?: Maybe<string>, bizWebsiteURL?: Maybe<string>, bizPostal?: Maybe<string>, bizRegionID?: Maybe<string>, plProvinceID?: Maybe<number>, provinceName?: Maybe<string> }> }>, contact?: Maybe<{ bizChat?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizIntersection?: Maybe<string>, bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, bizPhone?: Maybe<string>, bizStreetAddress?: Maybe<string>, bizText?: Maybe<string>, bizWebsiteURL?: Maybe<string>, linkContactMethod?: Maybe<Array<Maybe<string>>>, bizPostal?: Maybe<string>, bizRegionID?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, plProvinceID?: Maybe<number>, provinceInitial?: Maybe<string>, provinceName?: Maybe<string> }>, deals: Array<{ dlsApplyTo?: Maybe<string>, dlsDealsID: string, dlsName: string, dlsSlug: string, mdaLocalFileName?: Maybe<string>, business: Array<{ bizBusinessID: string, plType: string, bizName: string, bizSlug: string, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> }>, products: Array<{ mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any> }>, reviews: Array<{ rvwComment: string, canDeleteReview?: Maybe<boolean>, rvwCreationDate?: Maybe<any>, rvwReply?: Maybe<string>, rvwReplyCreatedAt?: Maybe<any>, rvwReviewID: string, rvwScore: number, username?: Maybe<string>, rvwReplyAuthorName?: Maybe<{ bizName?: Maybe<string>, username?: Maybe<string>, usrUserID?: Maybe<string> }> }>, workingHours?: Maybe<Array<Maybe<{ ophBusinessID?: Maybe<string>, ophCloseTime?: Maybe<any>, ophDayOfWeek?: Maybe<number>, ophIsOpen?: Maybe<number>, ophOpenTime?: Maybe<any> }>>> }> };

export type BusinessProductsBySlugQueryVariables = Exact<{
  plSlugType: Scalars['String'];
  bizSlug: Scalars['String'];
  regionSlug?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  prdGenetics?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  search?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;


export type BusinessProductsBySlugQuery = { businessBySlug?: Maybe<{ plType: string, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, isOpen?: Maybe<boolean>, isToday?: Maybe<number>, willOpen?: Maybe<string>, canAddReview?: Maybe<boolean>, bizBusinessID: string, bizName: string, bizSlug: string, productAvailable?: Maybe<boolean>, productCount: number, dutchieAPI?: Maybe<string>, bizDescription?: Maybe<string>, bizFeaturedPosition: number, bizIsVerified: number, bizIsLite?: Maybe<number>, bizHasMapPin: number, bizSortOption?: Maybe<string>, productType?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>> }>>> }>>>, contact?: Maybe<{ bizChat?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizIntersection?: Maybe<string>, bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, bizPhone?: Maybe<string>, bizStreetAddress?: Maybe<string>, bizText?: Maybe<string>, bizWebsiteURL?: Maybe<string>, linkContactMethod?: Maybe<Array<Maybe<string>>>, bizPostal?: Maybe<string>, bizRegionID?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, plProvinceID?: Maybe<number>, provinceInitial?: Maybe<string>, provinceName?: Maybe<string> }>, products: Array<{ mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any> }>, workingHours?: Maybe<Array<Maybe<{ ophBusinessID?: Maybe<string>, ophCloseTime?: Maybe<any>, ophDayOfWeek?: Maybe<number>, ophIsOpen?: Maybe<number>, ophOpenTime?: Maybe<any> }>>> }> };

export type BusinessDealsBySlugQueryVariables = Exact<{
  plSlugType: Scalars['String'];
  bizSlug: Scalars['String'];
  regionSlug?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type BusinessDealsBySlugQuery = { businessBySlug?: Maybe<{ plType: string, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, isOpen?: Maybe<boolean>, isToday?: Maybe<number>, willOpen?: Maybe<string>, canAddReview?: Maybe<boolean>, bizBusinessID: string, bizName: string, bizSlug: string, dutchieAPI?: Maybe<string>, bizDescription?: Maybe<string>, bizFeaturedPosition: number, bizIsVerified: number, bizIsLite?: Maybe<number>, bizHasMapPin: number, productType?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>> }>>> }>>>, contact?: Maybe<{ bizChat?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizIntersection?: Maybe<string>, bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, bizPhone?: Maybe<string>, bizStreetAddress?: Maybe<string>, bizText?: Maybe<string>, bizWebsiteURL?: Maybe<string>, linkContactMethod?: Maybe<Array<Maybe<string>>>, bizPostal?: Maybe<string>, bizRegionID?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, plProvinceID?: Maybe<number>, provinceInitial?: Maybe<string>, provinceName?: Maybe<string> }>, deals: Array<{ dlsApplyTo?: Maybe<string>, dlsDealsID: string, dlsName: string, dlsSlug: string, mdaLocalFileName?: Maybe<string>, business: Array<{ bizBusinessID: string, plType: string, bizName: string, bizSlug: string, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> }>, workingHours?: Maybe<Array<Maybe<{ ophBusinessID?: Maybe<string>, ophCloseTime?: Maybe<any>, ophDayOfWeek?: Maybe<number>, ophIsOpen?: Maybe<number>, ophOpenTime?: Maybe<any> }>>> }> };

export type BusinessReviewsBySlugQueryVariables = Exact<{
  plSlugType: Scalars['String'];
  bizSlug: Scalars['String'];
  regionSlug?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type BusinessReviewsBySlugQuery = { businessBySlug?: Maybe<{ plType: string, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, isOpen?: Maybe<boolean>, isToday?: Maybe<number>, willOpen?: Maybe<string>, canAddReview?: Maybe<boolean>, bizBusinessID: string, bizName: string, bizSlug: string, dutchieAPI?: Maybe<string>, bizDescription?: Maybe<string>, bizFeaturedPosition: number, bizIsVerified: number, bizIsLite?: Maybe<number>, bizHasMapPin: number, productType?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>> }>>> }>>>, contact?: Maybe<{ bizChat?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizIntersection?: Maybe<string>, bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, bizPhone?: Maybe<string>, bizStreetAddress?: Maybe<string>, bizText?: Maybe<string>, bizWebsiteURL?: Maybe<string>, linkContactMethod?: Maybe<Array<Maybe<string>>>, bizPostal?: Maybe<string>, bizRegionID?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, plProvinceID?: Maybe<number>, provinceInitial?: Maybe<string>, provinceName?: Maybe<string> }>, reviews: Array<{ rvwComment: string, canDeleteReview?: Maybe<boolean>, rvwCreationDate?: Maybe<any>, rvwReply?: Maybe<string>, rvwReplyCreatedAt?: Maybe<any>, rvwReviewID: string, rvwScore: number, username?: Maybe<string>, rvwReplyAuthorName?: Maybe<{ bizName?: Maybe<string>, username?: Maybe<string>, usrUserID?: Maybe<string> }> }>, workingHours?: Maybe<Array<Maybe<{ ophBusinessID?: Maybe<string>, ophCloseTime?: Maybe<any>, ophDayOfWeek?: Maybe<number>, ophIsOpen?: Maybe<number>, ophOpenTime?: Maybe<any> }>>> }> };

export type BusinessResellersBySlugQueryVariables = Exact<{
  plSlugType: Scalars['String'];
  bizSlug: Scalars['String'];
  regionSlug?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
  filterByLocation?: Maybe<Scalars['Boolean']>;
  latitudeFront?: Maybe<Scalars['Float']>;
  longitudeFront?: Maybe<Scalars['Float']>;
  regionID?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  clientIp?: Maybe<Scalars['String']>;
}>;


export type BusinessResellersBySlugQuery = { businessBySlug?: Maybe<{ plType: string, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, isOpen?: Maybe<boolean>, isToday?: Maybe<number>, willOpen?: Maybe<string>, canAddReview?: Maybe<boolean>, bizBusinessID: string, bizName: string, bizSlug: string, dutchieAPI?: Maybe<string>, bizDescription?: Maybe<string>, bizFeaturedPosition: number, bizIsVerified: number, bizIsLite?: Maybe<number>, bizHasMapPin: number, productType?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>> }>>> }>>>, contact?: Maybe<{ bizChat?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizIntersection?: Maybe<string>, bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, bizPhone?: Maybe<string>, bizStreetAddress?: Maybe<string>, bizText?: Maybe<string>, bizWebsiteURL?: Maybe<string>, linkContactMethod?: Maybe<Array<Maybe<string>>>, bizPostal?: Maybe<string>, bizRegionID?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, plProvinceID?: Maybe<number>, provinceInitial?: Maybe<string>, provinceName?: Maybe<string> }>, brands: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, resellers: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, bizChat?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizIntersection?: Maybe<string>, bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, bizPhone?: Maybe<string>, bizStreetAddress?: Maybe<string>, bizText?: Maybe<string>, bizWebsiteURL?: Maybe<string>, bizPostal?: Maybe<string>, bizRegionID?: Maybe<string>, plProvinceID?: Maybe<number>, provinceName?: Maybe<string> }> }>, workingHours?: Maybe<Array<Maybe<{ ophBusinessID?: Maybe<string>, ophCloseTime?: Maybe<any>, ophDayOfWeek?: Maybe<number>, ophIsOpen?: Maybe<number>, ophOpenTime?: Maybe<any> }>>> }> };

export type BusinessInterlinkingQueryVariables = Exact<{
  locationSlug: Scalars['String'];
  type: Scalars['String'];
  countryId: Scalars['Int'];
}>;


export type BusinessInterlinkingQuery = { locationListNearLocation: { provinces?: Maybe<Array<{ plProvinceID: number, plName: string, plInitials: string }>>, regions?: Maybe<Array<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, province: { plProvinceID: number, plName: string, plInitials: string } }>> } };

export type BusinessOnlyBySlugQueryVariables = Exact<{
  bizSlug: Scalars['String'];
}>;


export type BusinessOnlyBySlugQuery = { businessBySlugHasLanding?: Maybe<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessAllVerifiedQueryVariables = Exact<{
  provinceID: Scalars['Int'];
  regionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessAllVerifiedQuery = { businessAllVerified: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessAllByLocationQueryVariables = Exact<{
  provinceID: Scalars['Int'];
  regionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BusinessAllByLocationQuery = { businessAllByLocation: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type BusinessGetAllQueryVariables = Exact<{
  userId: Scalars['String'];
  sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type BusinessGetAllQuery = { businessByUserId: { businesses?: Maybe<Array<Maybe<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>>> } };

export type BusinessForProductAdsQueryVariables = Exact<{
  userId: Scalars['String'];
  sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type BusinessForProductAdsQuery = { businessByUserId: { businesses?: Maybe<Array<Maybe<{ plType: string, bizName: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizPublishDate?: Maybe<any>, bizExpirationDateToronto?: Maybe<any>, bizExpirationDate?: Maybe<any>, bizBusinessID: string, bizIsLite?: Maybe<number>, contact?: Maybe<{ regionName?: Maybe<string>, provinceInitial?: Maybe<string> }>, productType?: Maybe<Array<Maybe<{ totalImpressions?: Maybe<number>, available?: Maybe<boolean>, counter?: Maybe<number>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, price?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ totalImpressions?: Maybe<number>, available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, counter?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ totalImpressions?: Maybe<number>, available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, counter?: Maybe<number>, price?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ totalImpressions?: Maybe<number>, available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, counter?: Maybe<number>, price?: Maybe<number> }>>> }>>> }>>> } };

export type BusinessAdvertisementForProductPageQueryVariables = Exact<{
  productId: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  plProvinceID?: Maybe<Scalars['Int']>;
  plRegionID?: Maybe<Scalars['Int']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
}>;


export type BusinessAdvertisementForProductPageQuery = { businessAdvertisementForProductPage: Array<Maybe<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, products: Array<{ mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, business: Array<{ bizBusinessID: string }> }>, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>> };

export type SaveBusinessAdPriceInMutationVariables = Exact<{
  input: Array<Maybe<BusinessFinanceInput>> | Maybe<BusinessFinanceInput>;
}>;


export type SaveBusinessAdPriceInMutation = { saveBusinessAdPriceIn: boolean };

export type BusinessAdvertisementAnalyticsQueryVariables = Exact<{
  userId: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
}>;


export type BusinessAdvertisementAnalyticsQuery = { userAdPositiveTransactionsByUserId: Array<Maybe<{ hisAmount: number, hisCreationDate: any }>>, userAdNegativeTransactionsByUserId: Array<Maybe<{ amount: number, creationDate: any, count: number }>>, userAdBudgetByUserIdByDate: Array<Maybe<{ budget?: Maybe<number>, date: any }>> };

export type ClaimListingQueryVariables = Exact<{
  name: Scalars['String'];
  phone: Scalars['String'];
  time: Scalars['String'];
  url: Scalars['String'];
}>;


export type ClaimListingQuery = { claimYourListing: boolean };

export type ContactUsSendQueryVariables = Exact<{
  regionID: Scalars['String'];
  province: Scalars['String'];
  city: Scalars['String'];
  emailFrom: Scalars['String'];
  message: Scalars['String'];
  name: Scalars['String'];
  subject: Scalars['String'];
}>;


export type ContactUsSendQuery = { contactUs: boolean };

export type DealListByTypeByRegQueryVariables = Exact<{
  type?: Maybe<Scalars['String']>;
  linkProvinceID: Scalars['Int'];
  plRegionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type DealListByTypeByRegQuery = { dealListByTypeByReg: Array<{ dlsApplyTo?: Maybe<string>, dlsDealsID: string, dlsName: string, dlsSlug: string, mdaLocalFileName?: Maybe<string>, business: Array<{ bizBusinessID: string, plType: string, bizName: string, bizSlug: string, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> }> };

export type DealBySlugQueryVariables = Exact<{
  dealSlug: Scalars['String'];
  bizSlug: Scalars['String'];
}>;


export type DealBySlugQuery = { dealBySlug?: Maybe<{ dlsApplyTo?: Maybe<string>, dlsDealsID: string, dlsName: string, dlsSlug: string, mdaLocalFileName?: Maybe<string>, dlsExpireDate?: Maybe<any>, dlsExpireDateToronto?: Maybe<any>, dlsDescription?: Maybe<string>, dlsInstructions?: Maybe<string>, dlsCouponCode?: Maybe<string>, dlsUrl?: Maybe<string>, business: Array<{ bizBusinessID: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, plType: string, bizName: string, bizSlug: string, mdaLocalFileName?: Maybe<string>, contact?: Maybe<{ bizChat?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizIntersection?: Maybe<string>, bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, bizPhone?: Maybe<string>, bizStreetAddress?: Maybe<string>, bizText?: Maybe<string>, bizWebsiteURL?: Maybe<string>, linkContactMethod?: Maybe<Array<Maybe<string>>>, bizPostal?: Maybe<string>, bizRegionID?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, plProvinceID?: Maybe<number>, provinceInitial?: Maybe<string>, provinceName?: Maybe<string> }> }> }> };

export type SendFeedbackQueryVariables = Exact<{
  message: Scalars['String'];
  questions?: Maybe<Array<Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>> | Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>>;
  email?: Maybe<Scalars['String']>;
}>;


export type SendFeedbackQuery = { sendFeedback: boolean };

export type BusinessItemFragment = { bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> };

export type ProductItemFragment = { mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any> };

export type DealItemFragment = { dlsApplyTo?: Maybe<string>, dlsDealsID: string, dlsName: string, dlsSlug: string, mdaLocalFileName?: Maybe<string>, business: Array<{ bizBusinessID: string, plType: string, bizName: string, bizSlug: string, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type ReviewItemFragment = { rvwComment: string, canDeleteReview?: Maybe<boolean>, rvwCreationDate?: Maybe<any>, rvwReply?: Maybe<string>, rvwReplyCreatedAt?: Maybe<any>, rvwReviewID: string, rvwScore: number, username?: Maybe<string>, rvwReplyAuthorName?: Maybe<{ bizName?: Maybe<string>, username?: Maybe<string>, usrUserID?: Maybe<string> }> };

export type ContactItemFragment = { bizChat?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizIntersection?: Maybe<string>, bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, bizPhone?: Maybe<string>, bizStreetAddress?: Maybe<string>, bizText?: Maybe<string>, bizWebsiteURL?: Maybe<string>, linkContactMethod?: Maybe<Array<Maybe<string>>>, bizPostal?: Maybe<string>, bizRegionID?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, plProvinceID?: Maybe<number>, provinceInitial?: Maybe<string>, provinceName?: Maybe<string> };

export type WorkingHourItemFragment = { ophBusinessID?: Maybe<string>, ophCloseTime?: Maybe<any>, ophDayOfWeek?: Maybe<number>, ophIsOpen?: Maybe<number>, ophOpenTime?: Maybe<any> };

export type BlogItemFragment = { blgBlogID: string, blgDescription?: Maybe<string>, blgPublishedAt?: Maybe<any>, blgSlug: string, blgTitle: string, mdaLocalFileName?: Maybe<string>, plType?: Maybe<string>, types?: Maybe<Array<Maybe<string>>>, authorName?: Maybe<{ username?: Maybe<string>, bizName?: Maybe<string> }> };

export type CurrentUserFragment = { email: string, username: string, usrFirstName?: Maybe<string>, usrLastName?: Maybe<string>, usrUserID: string, email_verified_at?: Maybe<any>, userRoles?: Maybe<Array<string>>, usrSubscription?: Maybe<number> };

export type ProvinceItemFragment = { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } };

export type LocationItemFragment = { plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } };

export type ProductTypeItemFragment = { available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>> }>>> };

export type LocationListRegionQueryVariables = Exact<{
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  plCountryID?: Maybe<Scalars['Int']>;
  sortPopular?: Maybe<Scalars['Boolean']>;
}>;


export type LocationListRegionQuery = { locationListRegion: Array<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type LocationAllListProvinceQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationAllListProvinceQuery = { locationListProvince: Array<Maybe<{ plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } }>> };

export type LocationAllListProvinceForUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationAllListProvinceForUserQuery = { locationListProvinceForUser: Array<Maybe<{ plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } }>> };

export type LocationListRegionByProvinceQueryVariables = Exact<{
  provinceId: Scalars['Int'];
}>;


export type LocationListRegionByProvinceQuery = { locationListRegionByProvince: Array<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type LocationListRegionByProvinceForUserQueryVariables = Exact<{
  provinceId: Scalars['Int'];
}>;


export type LocationListRegionByProvinceForUserQuery = { locationListRegionByProvinceForUser: Array<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type LocationSearchRegionQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type LocationSearchRegionQuery = { locationSearchRegion: Array<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type LocationGetNearestRegionIdQueryVariables = Exact<{
  plCountryID?: Maybe<Scalars['Int']>;
}>;


export type LocationGetNearestRegionIdQuery = { userRegionId?: Maybe<string>, locationListRegion: Array<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type UserRegionQueryVariables = Exact<{
  clientIp?: Maybe<Scalars['String']>;
}>;


export type UserRegionQuery = { userRegion?: Maybe<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type LocationFooterPositionQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationFooterPositionQuery = { locationFooterPosition: Array<{ plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }> };

export type SubscribeMailQueryVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  userRegionID?: Maybe<Scalars['String']>;
  mailPreferences?: Maybe<Scalars['String']>;
}>;


export type SubscribeMailQuery = { userSubscription: boolean };

export type MapDealsQueryQueryVariables = Exact<{
  plRegionID: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
  offset: Scalars['Int'];
}>;


export type MapDealsQueryQuery = { dealListByRegRandom: Array<{ dlsApplyTo?: Maybe<string>, dlsDealsID: string, dlsName: string, dlsSlug: string, mdaLocalFileName?: Maybe<string>, business: Array<{ bizBusinessID: string, plType: string, bizName: string, bizSlug: string, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> }> };

export type MapBusinessQueryQueryVariables = Exact<{
  lat1: Scalars['Float'];
  lng1: Scalars['Float'];
  lat2: Scalars['Float'];
  lng2: Scalars['Float'];
  sort?: Maybe<Scalars['String']>;
  plSlugType?: Maybe<Scalars['String']>;
  plRegionID?: Maybe<Scalars['Int']>;
}>;


export type MapBusinessQueryQuery = { businessByCoordinates: Array<{ bizIsFeatured: number, bizIsVerified: number, bizHasMapPin: number, bizFeaturedPosition: number, bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, contact?: Maybe<{ bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, linkContactMethod?: Maybe<Array<Maybe<string>>> }> }> };

export type MetaTagsRegionQueryVariables = Exact<{
  plRegionID: Scalars['Int'];
  categoryType: Scalars['String'];
}>;


export type MetaTagsRegionQuery = { metaTagByRegionIDByType: Array<{ id: number, categoryType: string, plRegionID: number, plMetaTitle?: Maybe<string>, plMetaDescription?: Maybe<string>, plCustomH1?: Maybe<string>, plDescription1?: Maybe<string>, plDescription2?: Maybe<string> }> };

export type MetaTagsProvinceQueryVariables = Exact<{
  plProvinceID: Scalars['Int'];
  categoryType: Scalars['String'];
}>;


export type MetaTagsProvinceQuery = { metaTagByProvinceIDByType: Array<{ id: number, categoryType: string, plProvinceID: number, plMetaTitle?: Maybe<string>, plMetaDescription?: Maybe<string>, plCustomH1?: Maybe<string>, plDescription1?: Maybe<string>, plDescription2?: Maybe<string> }> };

export type MetaTagsProductCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type MetaTagsProductCategoryQuery = { metaTagProductTypes: Array<{ id: number, title?: Maybe<string>, description?: Maybe<string>, content?: Maybe<string>, product_type_id: number, product_type?: Maybe<{ id?: Maybe<number>, name?: Maybe<string>, slug?: Maybe<string>, typeParent?: Maybe<string>, typeParentName?: Maybe<Array<Maybe<string>>> }> }> };

export type HomePageDataStatusQueryVariables = Exact<{
  provinceID: Scalars['Int'];
  regionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type HomePageDataStatusQuery = { businessAllByLocation: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type HomePageDataQueryVariables = Exact<{
  provinceID: Scalars['Int'];
  regionID: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  featuredOffset?: Maybe<Scalars['Int']>;
  featuredLimit?: Maybe<Scalars['Int']>;
}>;


export type HomePageDataQuery = { businessMonthlyTopPicks: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessFeaturedBrands: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessFeaturedDeliveries: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessFeaturedDispensary: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessFeaturedMail: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessAllVerified: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessAllByLocation: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, blogListByType: Array<{ blgBlogID: string, blgDescription?: Maybe<string>, blgPublishedAt?: Maybe<any>, blgSlug: string, blgTitle: string, mdaLocalFileName?: Maybe<string>, plType?: Maybe<string>, types?: Maybe<Array<Maybe<string>>>, authorName?: Maybe<{ username?: Maybe<string>, bizName?: Maybe<string> }> }> };

export type VerifiedPageDataQueryVariables = Exact<{
  provinceId: Scalars['Int'];
  regionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type VerifiedPageDataQuery = { businessVerifiedBrands: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessVerifiedDeliveries: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessVerifiedDispensary: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessVerifiedMail: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type FeaturedPageDataQueryVariables = Exact<{
  provinceId: Scalars['Int'];
  regionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type FeaturedPageDataQuery = { businessFeaturedBrands: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessFeaturedDeliveries: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessFeaturedDispensary: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessFeaturedMail: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type AllPageDataQueryVariables = Exact<{
  provinceId: Scalars['Int'];
  regionID?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type AllPageDataQuery = { businessAllBrands: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessAllDeliveries: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessAllDispensary: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, businessAllMail: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> };

export type ProductBySlugQueryVariables = Exact<{
  bizSlug: Scalars['String'];
  plSlugType: Scalars['String'];
  prdSlug: Scalars['String'];
  regionSlug?: Maybe<Scalars['String']>;
  prdGenetics?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  search?: Maybe<Scalars['String']>;
  productOffset?: Maybe<Scalars['Int']>;
  productLimit?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  latitudeFront?: Maybe<Scalars['Float']>;
  longitudeFront?: Maybe<Scalars['Float']>;
  regionID?: Maybe<Scalars['Int']>;
}>;


export type ProductBySlugQuery = { productBySlug: Array<{ canAddReview?: Maybe<boolean>, prdDescription: string, prdProductEffects?: Maybe<string>, prdProductUses?: Maybe<string>, prdProductTimes?: Maybe<string>, mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, business: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, reviews: Array<{ rvwComment: string, canDeleteReview?: Maybe<boolean>, rvwCreationDate?: Maybe<any>, rvwReply?: Maybe<string>, rvwReplyCreatedAt?: Maybe<any>, rvwReviewID: string, rvwScore: number, username?: Maybe<string>, rvwReplyAuthorName?: Maybe<{ bizName?: Maybe<string>, username?: Maybe<string>, usrUserID?: Maybe<string> }> }>, productReseller?: Maybe<Array<Maybe<{ mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, business: Array<{ bizBusinessID: string }> }>>>, businessProductReseller?: Maybe<Array<Maybe<{ bizFeaturedPosition: number, bizHasMapPin: number, bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>>> }>, businessBySlug?: Maybe<{ bizBusinessID: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, productAvailable?: Maybe<boolean>, productCount: number, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, plType: string, bizName: string, bizSlug: string, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, bizSortOption?: Maybe<string>, productType?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>> }>>> }>>>, contact?: Maybe<{ bizChat?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizIntersection?: Maybe<string>, bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, bizPhone?: Maybe<string>, bizStreetAddress?: Maybe<string>, bizText?: Maybe<string>, bizWebsiteURL?: Maybe<string>, linkContactMethod?: Maybe<Array<Maybe<string>>>, bizPostal?: Maybe<string>, bizRegionID?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, plProvinceID?: Maybe<number>, provinceInitial?: Maybe<string>, provinceName?: Maybe<string> }>, products: Array<{ mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any> }> }> };

export type ProductReviewsBySlugQueryVariables = Exact<{
  bizSlug: Scalars['String'];
  plSlugType: Scalars['String'];
  prdSlug: Scalars['String'];
  regionSlug?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type ProductReviewsBySlugQuery = { productBySlug: Array<{ mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, reviews: Array<{ rvwComment: string, canDeleteReview?: Maybe<boolean>, rvwCreationDate?: Maybe<any>, rvwReply?: Maybe<string>, rvwReplyCreatedAt?: Maybe<any>, rvwReviewID: string, rvwScore: number, username?: Maybe<string>, rvwReplyAuthorName?: Maybe<{ bizName?: Maybe<string>, username?: Maybe<string>, usrUserID?: Maybe<string> }> }> }>, businessBySlug?: Maybe<{ bizBusinessID: string, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, plType: string, bizName: string, bizSlug: string, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, productType?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>> }>>> }>>>, contact?: Maybe<{ bizChat?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizIntersection?: Maybe<string>, bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, bizPhone?: Maybe<string>, bizStreetAddress?: Maybe<string>, bizText?: Maybe<string>, bizWebsiteURL?: Maybe<string>, linkContactMethod?: Maybe<Array<Maybe<string>>>, bizPostal?: Maybe<string>, bizRegionID?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, plProvinceID?: Maybe<number>, provinceInitial?: Maybe<string>, provinceName?: Maybe<string> }> }> };

export type ProductResellersBySlugQueryVariables = Exact<{
  bizSlug: Scalars['String'];
  plSlugType: Scalars['String'];
  prdSlug: Scalars['String'];
  regionSlug?: Maybe<Scalars['String']>;
  latitudeFront?: Maybe<Scalars['Float']>;
  longitudeFront?: Maybe<Scalars['Float']>;
  regionID?: Maybe<Scalars['Int']>;
}>;


export type ProductResellersBySlugQuery = { productBySlug: Array<{ mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, business: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>, productReseller?: Maybe<Array<Maybe<{ mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, business: Array<{ bizBusinessID: string }> }>>>, businessProductReseller?: Maybe<Array<Maybe<{ bizFeaturedPosition: number, bizHasMapPin: number, bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }>>> }>, businessBySlug?: Maybe<{ bizBusinessID: string, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, plType: string, bizName: string, bizSlug: string, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, productType?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>> }>>> }>>>, contact?: Maybe<{ bizChat?: Maybe<string>, bizEmailAddress?: Maybe<string>, bizIntersection?: Maybe<string>, bizLatitude?: Maybe<number>, bizLongitude?: Maybe<number>, bizPhone?: Maybe<string>, bizStreetAddress?: Maybe<string>, bizText?: Maybe<string>, bizWebsiteURL?: Maybe<string>, linkContactMethod?: Maybe<Array<Maybe<string>>>, bizPostal?: Maybe<string>, bizRegionID?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string>, plProvinceID?: Maybe<number>, provinceInitial?: Maybe<string>, provinceName?: Maybe<string> }> }> };

export type ProductTypeItemsQueryVariables = Exact<{
  brandFilter?: Maybe<Scalars['Boolean']>;
  strainNameFilter?: Maybe<Scalars['Boolean']>;
}>;


export type ProductTypeItemsQuery = { productListTypes: { productTypes?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>>, typeItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number>, categoriesItems?: Maybe<Array<Maybe<{ available?: Maybe<boolean>, name?: Maybe<string>, slug?: Maybe<string>, id?: Maybe<number> }>>> }>>> }>>> }>>> } };

export type NearRegionByProductTypeQueryVariables = Exact<{
  plRegionID: Scalars['Int'];
  prdProductType: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  prdProductCategories: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
}>;


export type NearRegionByProductTypeQuery = { nearRegionByProductType?: Maybe<Array<Maybe<{ mdaLocalFileName?: Maybe<string>, plRegionID: number, plProvinceID: number, plName: string, plSlug: string, plLatitude?: Maybe<number>, plLongitude?: Maybe<number>, province: { plProvinceID: number, plName: string, plInitials: string, country: { plCountryID: number, plCountryName: string, plCountrySlug: string } } }>>> };

export type StrainNameByRegionByTypeQueryVariables = Exact<{
  plRegionID: Scalars['Int'];
  prdProductType: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  prdProductCategories: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
}>;


export type StrainNameByRegionByTypeQuery = { strainNameByRegionByType: Array<Maybe<string>> };

export type ProductAllByTypeDistance2kmQueryVariables = Exact<{
  plRegionID?: Maybe<Scalars['Int']>;
  clientIp?: Maybe<Scalars['String']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  bizTypes: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductTypeSlug?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductCategoriesSlug?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type ProductAllByTypeDistance2kmQuery = { productAllByTypeDistance2km: { productStrainName?: Maybe<Array<Maybe<string>>>, products?: Maybe<Array<Maybe<{ businessCount?: Maybe<number>, mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, business: Array<{ bizSlug: string, plType: string, mdaLocalFileName?: Maybe<string>, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string> }> }> }>>> } };

export type ProductAllByTypeDistance10kmQueryVariables = Exact<{
  plRegionID?: Maybe<Scalars['Int']>;
  clientIp?: Maybe<Scalars['String']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  bizTypes: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  search?: Maybe<Scalars['String']>;
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductTypeSlug?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductCategoriesSlug?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type ProductAllByTypeDistance10kmQuery = { productAllByTypeDistance10km: { productStrainName?: Maybe<Array<Maybe<string>>>, products?: Maybe<Array<Maybe<{ businessCount?: Maybe<number>, mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, business: Array<{ bizSlug: string, plType: string, mdaLocalFileName?: Maybe<string>, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string> }> }> }>>> } };

export type ProductAllByTypeMailOrderQueryVariables = Exact<{
  search?: Maybe<Scalars['String']>;
  prdProductType?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductTypeSlug?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  prdProductCategoriesSlug?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type ProductAllByTypeMailOrderQuery = { productAllByTypeBrandLinkMailOrder?: Maybe<Array<Maybe<{ mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, business: Array<{ bizSlug: string, plType: string, mdaLocalFileName?: Maybe<string>, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string> }> }> }>>> };

export type BrandBusinessByProductTypeQueryVariables = Exact<{
  distance?: Maybe<Array<Maybe<Scalars['Int']>> | Maybe<Scalars['Int']>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  strainSlug?: Maybe<Scalars['String']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  prdProductType: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;


export type BrandBusinessByProductTypeQuery = { brandBusinessByProductType?: Maybe<Array<Maybe<string>>> };

export type ProductAdvertisementQueryVariables = Exact<{
  plProvinceID?: Maybe<Scalars['Int']>;
  plRegionID?: Maybe<Scalars['Int']>;
  latitudeGPS?: Maybe<Scalars['Float']>;
  longitudeGPS?: Maybe<Scalars['Float']>;
  bizTypes: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  prdProductType: Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>;
  prdProductCategories?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type ProductAdvertisementQuery = { productAdvertisement: Array<Maybe<{ businessCount?: Maybe<number>, mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, business: Array<{ bizSlug: string, plType: string, mdaLocalFileName?: Maybe<string>, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string> }> }> }>> };

export type ProductListTypesForAdminAdvertisementQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<Array<Maybe<Scalars['String']>> | Maybe<Scalars['String']>>;
}>;


export type ProductListTypesForAdminAdvertisementQuery = { productListTypesForAdminAdvertisement: Array<Maybe<{ id?: Maybe<number>, slug?: Maybe<string>, name?: Maybe<string>, typeParent?: Maybe<string>, amountSpent?: Maybe<number>, businessCounter?: Maybe<number>, engagements?: Maybe<number>, typePriceDelivery?: Maybe<number>, typePriceBrand?: Maybe<number>, typePriceDispensary?: Maybe<number>, typePriceMail?: Maybe<number>, typeParentName?: Maybe<Array<Maybe<string>>> }>> };

export type ProductAdBudgetQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductAdBudgetQuery = { userAdBudgetByUserId?: Maybe<number> };

export type ProductAdvertisementForProductPageQueryVariables = Exact<{
  productId: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type ProductAdvertisementForProductPageQuery = { productAdvertisementForProductPage: Array<Maybe<{ mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, business: Array<{ bizSlug: string, plType: string, contact?: Maybe<{ provinceInitial?: Maybe<string>, regionSlug?: Maybe<string> }> }> }>> };

export type ProductTypeAnalyticsMutationVariables = Exact<{
  input?: Maybe<AnalyticsCategoryHeader>;
}>;


export type ProductTypeAnalyticsMutation = { analyticsSaveCategoryHeader?: Maybe<boolean> };

export type SaveProductTypePriceInMutationVariables = Exact<{
  input: Array<Maybe<ProductTypeInput>> | Maybe<ProductTypeInput>;
}>;


export type SaveProductTypePriceInMutation = { saveProductTypePriceIn: boolean };

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

export type ReviewSaveMutationVariables = Exact<{
  input: ReviewInput;
}>;


export type ReviewSaveMutation = { reviewSave: { rvwComment: string, canDeleteReview?: Maybe<boolean>, rvwCreationDate?: Maybe<any>, rvwReply?: Maybe<string>, rvwReplyCreatedAt?: Maybe<any>, rvwReviewID: string, rvwScore: number, username?: Maybe<string>, rvwReplyAuthorName?: Maybe<{ bizName?: Maybe<string>, username?: Maybe<string>, usrUserID?: Maybe<string> }> } };

export type ReviewDeleteMutationVariables = Exact<{
  reviewId: Scalars['String'];
}>;


export type ReviewDeleteMutation = { reviewDelete?: Maybe<boolean> };

export type SiteMapQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteMapQuery = { siteMapTop5: { brands: Array<Maybe<{ province: string, provinceId: number }>>, mail_order_marijuana: Array<Maybe<{ province: string, provinceId: number }>>, marijuana_dispensary: Array<Maybe<{ province: string, city?: Maybe<Array<Maybe<{ name: string, slug: string }>>> }>>, weed_delivery: Array<Maybe<{ province: string, city?: Maybe<Array<Maybe<{ name: string, slug: string }>>> }>> } };

export type LocationListProvinceForSiteMapQueryVariables = Exact<{ [key: string]: never; }>;


export type LocationListProvinceForSiteMapQuery = { locationListProvinceForSiteMap: Array<Maybe<{ plProvinceID: number, plDescription?: Maybe<string>, plInitials: string, plName: string }>> };

export type LocationListRegionByProvinceForSiteMapQueryVariables = Exact<{
  provinceId: Scalars['Int'];
}>;


export type LocationListRegionByProvinceForSiteMapQuery = { locationListRegionByProvinceForSiteMap: Array<{ plProvinceID: number, plRegionID: number, plDescription?: Maybe<string>, plSlug: string, plName: string }> };

export type TorontoProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type TorontoProductsQuery = { productsByRegions: Array<Maybe<{ mdaLocalFileName?: Maybe<string>, prdName: string, prdInStock: boolean, prdInStockForBrand?: Maybe<number>, prdPriceEighthOunce?: Maybe<number>, prdPriceHalfGram?: Maybe<number>, prdPriceHalfOunce?: Maybe<number>, prdPriceOneGram?: Maybe<number>, prdPriceOneOunce?: Maybe<number>, prdPricePerUnit?: Maybe<number>, prdPriceQuarterOunce?: Maybe<number>, prdPriceTwoGrams?: Maybe<number>, prdProductID: string, prdProductTypes: string, prdProductCategories?: Maybe<string>, prdCBDPercentage?: Maybe<string>, prdTHCPercentage?: Maybe<string>, prdSlug: string, plSlugType?: Maybe<string>, rvwScoreAvg?: Maybe<number>, rvwCount?: Maybe<number>, prdStatus?: Maybe<string>, prdPublishDate?: Maybe<any>, business: Array<{ bizBusinessID: string, bizName: string, bizSlug: string, plType: string, bizClaim?: Maybe<number>, bizClaimUnblurred?: Maybe<number>, bizIsLite?: Maybe<number>, mdaLocalFileName?: Maybe<string>, rvwScoreAvg?: Maybe<number>, isOpen?: Maybe<boolean>, rvwCount?: Maybe<number>, bizIsVerified: number, contact?: Maybe<{ linkContactMethod?: Maybe<Array<Maybe<string>>>, provinceInitial?: Maybe<string>, regionSlug?: Maybe<string>, regionName?: Maybe<string> }> }> }>> };

export const BusinessItemFragmentDoc = gql`
    fragment BusinessItem on Business {
  bizBusinessID
  bizName
  bizSlug
  plType
  bizClaim
  bizClaimUnblurred
  bizIsLite
  mdaLocalFileName
  rvwScoreAvg
  isOpen
  rvwCount
  bizIsVerified
  contact {
    linkContactMethod
    provinceInitial
    regionSlug
    regionName
  }
}
    `;
export const ProductItemFragmentDoc = gql`
    fragment ProductItem on Product {
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
}
    `;
export const DealItemFragmentDoc = gql`
    fragment DealItem on BusinessDeals {
  dlsApplyTo
  dlsDealsID
  dlsName
  dlsSlug
  mdaLocalFileName
  business {
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
    `;
export const ReviewItemFragmentDoc = gql`
    fragment ReviewItem on Review {
  rvwComment
  canDeleteReview
  rvwCreationDate
  rvwReply
  rvwReplyCreatedAt
  rvwReplyAuthorName {
    bizName
    username
    usrUserID
  }
  rvwReviewID
  rvwScore
  username
}
    `;
export const ContactItemFragmentDoc = gql`
    fragment ContactItem on Contact {
  bizChat
  bizEmailAddress
  bizIntersection
  bizLatitude
  bizLongitude
  bizPhone
  bizStreetAddress
  bizText
  bizWebsiteURL
  linkContactMethod
  bizPostal
  bizRegionID
  regionSlug
  regionName
  plProvinceID
  provinceInitial
  provinceName
}
    `;
export const WorkingHourItemFragmentDoc = gql`
    fragment WorkingHourItem on WorkingHours {
  ophBusinessID
  ophCloseTime
  ophDayOfWeek
  ophIsOpen
  ophOpenTime
}
    `;
export const BlogItemFragmentDoc = gql`
    fragment BlogItem on Blog {
  authorName {
    username
    bizName
  }
  blgBlogID
  blgDescription
  blgPublishedAt
  blgSlug
  blgTitle
  mdaLocalFileName
  plType
  types
}
    `;
export const CurrentUserFragmentDoc = gql`
    fragment CurrentUser on CurrentUser {
  email
  username
  usrFirstName
  usrLastName
  usrUserID
  email_verified_at
  userRoles
  usrSubscription
}
    `;
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
export const ProductTypeItemFragmentDoc = gql`
    fragment ProductTypeItem on ProductType {
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
    `;
export const AnalyticsSaveDocument = gql`
    mutation AnalyticsSave($input: AnalyticsSave) {
  analyticsSave(input: $input)
}
    `;
export type AnalyticsSaveMutationFn = ApolloReactCommon.MutationFunction<AnalyticsSaveMutation, AnalyticsSaveMutationVariables>;

/**
 * __useAnalyticsSaveMutation__
 *
 * To run a mutation, you first call `useAnalyticsSaveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnalyticsSaveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [analyticsSaveMutation, { data, loading, error }] = useAnalyticsSaveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAnalyticsSaveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AnalyticsSaveMutation, AnalyticsSaveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AnalyticsSaveMutation, AnalyticsSaveMutationVariables>(AnalyticsSaveDocument, options);
      }
export type AnalyticsSaveMutationHookResult = ReturnType<typeof useAnalyticsSaveMutation>;
export type AnalyticsSaveMutationResult = ApolloReactCommon.MutationResult<AnalyticsSaveMutation>;
export type AnalyticsSaveMutationOptions = ApolloReactCommon.BaseMutationOptions<AnalyticsSaveMutation, AnalyticsSaveMutationVariables>;
export const AnalyticsSaveSearchDocument = gql`
    mutation AnalyticsSaveSearch($input: AnalyticsSearch) {
  analyticsSaveSearch(input: $input)
}
    `;
export type AnalyticsSaveSearchMutationFn = ApolloReactCommon.MutationFunction<AnalyticsSaveSearchMutation, AnalyticsSaveSearchMutationVariables>;

/**
 * __useAnalyticsSaveSearchMutation__
 *
 * To run a mutation, you first call `useAnalyticsSaveSearchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnalyticsSaveSearchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [analyticsSaveSearchMutation, { data, loading, error }] = useAnalyticsSaveSearchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAnalyticsSaveSearchMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AnalyticsSaveSearchMutation, AnalyticsSaveSearchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AnalyticsSaveSearchMutation, AnalyticsSaveSearchMutationVariables>(AnalyticsSaveSearchDocument, options);
      }
export type AnalyticsSaveSearchMutationHookResult = ReturnType<typeof useAnalyticsSaveSearchMutation>;
export type AnalyticsSaveSearchMutationResult = ApolloReactCommon.MutationResult<AnalyticsSaveSearchMutation>;
export type AnalyticsSaveSearchMutationOptions = ApolloReactCommon.BaseMutationOptions<AnalyticsSaveSearchMutation, AnalyticsSaveSearchMutationVariables>;
export const AnalyticsBannerClickDocument = gql`
    mutation AnalyticsBannerClick($userAction: String!, $userIP: String) {
  analyticsBannerClick(userAction: $userAction, userIP: $userIP)
}
    `;
export type AnalyticsBannerClickMutationFn = ApolloReactCommon.MutationFunction<AnalyticsBannerClickMutation, AnalyticsBannerClickMutationVariables>;

/**
 * __useAnalyticsBannerClickMutation__
 *
 * To run a mutation, you first call `useAnalyticsBannerClickMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAnalyticsBannerClickMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [analyticsBannerClickMutation, { data, loading, error }] = useAnalyticsBannerClickMutation({
 *   variables: {
 *      userAction: // value for 'userAction'
 *      userIP: // value for 'userIP'
 *   },
 * });
 */
export function useAnalyticsBannerClickMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AnalyticsBannerClickMutation, AnalyticsBannerClickMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AnalyticsBannerClickMutation, AnalyticsBannerClickMutationVariables>(AnalyticsBannerClickDocument, options);
      }
export type AnalyticsBannerClickMutationHookResult = ReturnType<typeof useAnalyticsBannerClickMutation>;
export type AnalyticsBannerClickMutationResult = ApolloReactCommon.MutationResult<AnalyticsBannerClickMutation>;
export type AnalyticsBannerClickMutationOptions = ApolloReactCommon.BaseMutationOptions<AnalyticsBannerClickMutation, AnalyticsBannerClickMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...CurrentUser
  }
}
    ${CurrentUserFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    currentUser {
      ...CurrentUser
    }
  }
}
    ${CurrentUserFragmentDoc}`;
export type LoginUserMutationFn = ApolloReactCommon.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = ApolloReactCommon.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: UserInput!, $wired: Boolean, $source: String) {
  userRegister(input: $input, wired: $wired, source: $source) {
    token
    currentUser {
      ...CurrentUser
    }
  }
}
    ${CurrentUserFragmentDoc}`;
export type RegisterUserMutationFn = ApolloReactCommon.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *      wired: // value for 'wired'
 *      source: // value for 'source'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const SendPasswordEmailDocument = gql`
    mutation SendPasswordEmail($email: String!) {
  resetPassword(email: $email)
}
    `;
export type SendPasswordEmailMutationFn = ApolloReactCommon.MutationFunction<SendPasswordEmailMutation, SendPasswordEmailMutationVariables>;

/**
 * __useSendPasswordEmailMutation__
 *
 * To run a mutation, you first call `useSendPasswordEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPasswordEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPasswordEmailMutation, { data, loading, error }] = useSendPasswordEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendPasswordEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendPasswordEmailMutation, SendPasswordEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SendPasswordEmailMutation, SendPasswordEmailMutationVariables>(SendPasswordEmailDocument, options);
      }
export type SendPasswordEmailMutationHookResult = ReturnType<typeof useSendPasswordEmailMutation>;
export type SendPasswordEmailMutationResult = ApolloReactCommon.MutationResult<SendPasswordEmailMutation>;
export type SendPasswordEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<SendPasswordEmailMutation, SendPasswordEmailMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($email: String!, $password: String!, $token: String!) {
  newPassword(email: $email, password: $password, token: $token) {
    token
    currentUser {
      ...CurrentUser
    }
  }
}
    ${CurrentUserFragmentDoc}`;
export type ResetPasswordMutationFn = ApolloReactCommon.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = ApolloReactCommon.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UserVerificationDocument = gql`
    mutation UserVerification($id: String!, $code: String!) {
  userVerification(id: $id, code: $code)
}
    `;
export type UserVerificationMutationFn = ApolloReactCommon.MutationFunction<UserVerificationMutation, UserVerificationMutationVariables>;

/**
 * __useUserVerificationMutation__
 *
 * To run a mutation, you first call `useUserVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userVerificationMutation, { data, loading, error }] = useUserVerificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useUserVerificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UserVerificationMutation, UserVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UserVerificationMutation, UserVerificationMutationVariables>(UserVerificationDocument, options);
      }
export type UserVerificationMutationHookResult = ReturnType<typeof useUserVerificationMutation>;
export type UserVerificationMutationResult = ApolloReactCommon.MutationResult<UserVerificationMutation>;
export type UserVerificationMutationOptions = ApolloReactCommon.BaseMutationOptions<UserVerificationMutation, UserVerificationMutationVariables>;
export const ResendVerificationDocument = gql`
    mutation ResendVerification($userId: String!) {
  resendEmailConfirm(userId: $userId)
}
    `;
export type ResendVerificationMutationFn = ApolloReactCommon.MutationFunction<ResendVerificationMutation, ResendVerificationMutationVariables>;

/**
 * __useResendVerificationMutation__
 *
 * To run a mutation, you first call `useResendVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendVerificationMutation, { data, loading, error }] = useResendVerificationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useResendVerificationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResendVerificationMutation, ResendVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ResendVerificationMutation, ResendVerificationMutationVariables>(ResendVerificationDocument, options);
      }
export type ResendVerificationMutationHookResult = ReturnType<typeof useResendVerificationMutation>;
export type ResendVerificationMutationResult = ApolloReactCommon.MutationResult<ResendVerificationMutation>;
export type ResendVerificationMutationOptions = ApolloReactCommon.BaseMutationOptions<ResendVerificationMutation, ResendVerificationMutationVariables>;
export const BlogListByTypeDocument = gql`
    query blogListByType($limit: Int, $offset: Int, $type: String) {
  blogListByType(type: $type, offset: $offset, limit: $limit) {
    ...BlogItem
    blgDescription
    blgBody
  }
}
    ${BlogItemFragmentDoc}`;

/**
 * __useBlogListByTypeQuery__
 *
 * To run a query within a React component, call `useBlogListByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogListByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogListByTypeQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useBlogListByTypeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BlogListByTypeQuery, BlogListByTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BlogListByTypeQuery, BlogListByTypeQueryVariables>(BlogListByTypeDocument, options);
      }
export function useBlogListByTypeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BlogListByTypeQuery, BlogListByTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BlogListByTypeQuery, BlogListByTypeQueryVariables>(BlogListByTypeDocument, options);
        }
export type BlogListByTypeQueryHookResult = ReturnType<typeof useBlogListByTypeQuery>;
export type BlogListByTypeLazyQueryHookResult = ReturnType<typeof useBlogListByTypeLazyQuery>;
export type BlogListByTypeQueryResult = ApolloReactCommon.QueryResult<BlogListByTypeQuery, BlogListByTypeQueryVariables>;
export const BlogTypesDocument = gql`
    query blogTypes {
  blogTypeAll {
    plBlogTypeID
    plSlug
    plType
  }
}
    `;

/**
 * __useBlogTypesQuery__
 *
 * To run a query within a React component, call `useBlogTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useBlogTypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BlogTypesQuery, BlogTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BlogTypesQuery, BlogTypesQueryVariables>(BlogTypesDocument, options);
      }
export function useBlogTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BlogTypesQuery, BlogTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BlogTypesQuery, BlogTypesQueryVariables>(BlogTypesDocument, options);
        }
export type BlogTypesQueryHookResult = ReturnType<typeof useBlogTypesQuery>;
export type BlogTypesLazyQueryHookResult = ReturnType<typeof useBlogTypesLazyQuery>;
export type BlogTypesQueryResult = ApolloReactCommon.QueryResult<BlogTypesQuery, BlogTypesQueryVariables>;
export const BlogBySlugDocument = gql`
    query blogBySlug($blogSlug: String!) {
  blogBySlug(blgSlug: $blogSlug) {
    ...BlogItem
    blgDescription
    blgBody
  }
}
    ${BlogItemFragmentDoc}`;

/**
 * __useBlogBySlugQuery__
 *
 * To run a query within a React component, call `useBlogBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogBySlugQuery({
 *   variables: {
 *      blogSlug: // value for 'blogSlug'
 *   },
 * });
 */
export function useBlogBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BlogBySlugQuery, BlogBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BlogBySlugQuery, BlogBySlugQueryVariables>(BlogBySlugDocument, options);
      }
export function useBlogBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BlogBySlugQuery, BlogBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BlogBySlugQuery, BlogBySlugQueryVariables>(BlogBySlugDocument, options);
        }
export type BlogBySlugQueryHookResult = ReturnType<typeof useBlogBySlugQuery>;
export type BlogBySlugLazyQueryHookResult = ReturnType<typeof useBlogBySlugLazyQuery>;
export type BlogBySlugQueryResult = ApolloReactCommon.QueryResult<BlogBySlugQuery, BlogBySlugQueryVariables>;
export const BlogSearchDocument = gql`
    query blogSearch($search: String!) {
  blogSearch(name: $search) {
    blogs {
      ...BlogItem
    }
    plBlogTypeID
    plSlug
    plType
  }
}
    ${BlogItemFragmentDoc}`;

/**
 * __useBlogSearchQuery__
 *
 * To run a query within a React component, call `useBlogSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogSearchQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useBlogSearchQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BlogSearchQuery, BlogSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BlogSearchQuery, BlogSearchQueryVariables>(BlogSearchDocument, options);
      }
export function useBlogSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BlogSearchQuery, BlogSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BlogSearchQuery, BlogSearchQueryVariables>(BlogSearchDocument, options);
        }
export type BlogSearchQueryHookResult = ReturnType<typeof useBlogSearchQuery>;
export type BlogSearchLazyQueryHookResult = ReturnType<typeof useBlogSearchLazyQuery>;
export type BlogSearchQueryResult = ApolloReactCommon.QueryResult<BlogSearchQuery, BlogSearchQueryVariables>;
export const BusinessNameBySlugDocument = gql`
    query BusinessNameBySlug($bizSlug: String!, $plSlugType: String!, $regionSlug: String) {
  businessBySlug(
    bizSlug: $bizSlug
    plSlugType: $plSlugType
    regionSlug: $regionSlug
  ) {
    bizBusinessID
    bizName
    bizClaim
    bizClaimUnblurred
    bizSlug
    plType
    bizTags
    dutchieAPI
    rvwScoreAvg
    mdaLocalFileName
    rvwCount
    reviews(limit: 1, offset: 0) {
      username
      rvwComment
      rvwScore
    }
    contact {
      bizPhone
      bizEmailAddress
      bizWebsiteURL
      bizPostal
      bizLongitude
      bizLatitude
      bizStreetAddress
      bizIntersection
      provinceName
      provinceInitial
      regionSlug
      regionName
    }
    workingHours {
      ...WorkingHourItem
    }
  }
}
    ${WorkingHourItemFragmentDoc}`;

/**
 * __useBusinessNameBySlugQuery__
 *
 * To run a query within a React component, call `useBusinessNameBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessNameBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessNameBySlugQuery({
 *   variables: {
 *      bizSlug: // value for 'bizSlug'
 *      plSlugType: // value for 'plSlugType'
 *      regionSlug: // value for 'regionSlug'
 *   },
 * });
 */
export function useBusinessNameBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessNameBySlugQuery, BusinessNameBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessNameBySlugQuery, BusinessNameBySlugQueryVariables>(BusinessNameBySlugDocument, options);
      }
export function useBusinessNameBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessNameBySlugQuery, BusinessNameBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessNameBySlugQuery, BusinessNameBySlugQueryVariables>(BusinessNameBySlugDocument, options);
        }
export type BusinessNameBySlugQueryHookResult = ReturnType<typeof useBusinessNameBySlugQuery>;
export type BusinessNameBySlugLazyQueryHookResult = ReturnType<typeof useBusinessNameBySlugLazyQuery>;
export type BusinessNameBySlugQueryResult = ApolloReactCommon.QueryResult<BusinessNameBySlugQuery, BusinessNameBySlugQueryVariables>;
export const ProductNameBySlugDocument = gql`
    query ProductNameBySlug($bizSlug: String!, $plSlugType: String!, $prdSlug: String!, $regionSlug: String) {
  productBySlug(
    bizSlug: $bizSlug
    plSlugType: $plSlugType
    prdSlug: $prdSlug
    regionSlug: $regionSlug
  ) {
    prdName
    prdProductID
    prdSlug
    prdDescription
    mdaLocalFileName
    rvwCount
    rvwScoreAvg
    reviews(offset: 0, limit: 100) {
      rvwReviewID
      username
      rvwComment
      rvwScore
    }
    business {
      bizBusinessID
      bizClaim
      bizClaimUnblurred
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
    `;

/**
 * __useProductNameBySlugQuery__
 *
 * To run a query within a React component, call `useProductNameBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductNameBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductNameBySlugQuery({
 *   variables: {
 *      bizSlug: // value for 'bizSlug'
 *      plSlugType: // value for 'plSlugType'
 *      prdSlug: // value for 'prdSlug'
 *      regionSlug: // value for 'regionSlug'
 *   },
 * });
 */
export function useProductNameBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductNameBySlugQuery, ProductNameBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductNameBySlugQuery, ProductNameBySlugQueryVariables>(ProductNameBySlugDocument, options);
      }
export function useProductNameBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductNameBySlugQuery, ProductNameBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductNameBySlugQuery, ProductNameBySlugQueryVariables>(ProductNameBySlugDocument, options);
        }
export type ProductNameBySlugQueryHookResult = ReturnType<typeof useProductNameBySlugQuery>;
export type ProductNameBySlugLazyQueryHookResult = ReturnType<typeof useProductNameBySlugLazyQuery>;
export type ProductNameBySlugQueryResult = ApolloReactCommon.QueryResult<ProductNameBySlugQuery, ProductNameBySlugQueryVariables>;
export const DealNameBySlugDocument = gql`
    query DealNameBySlug($bizSlug: String!, $dlsSlug: String!) {
  dealBySlug(bizSlug: $bizSlug, dlsSlug: $dlsSlug) {
    dlsName
    dlsDealsID
    dlsSlug
    mdaLocalFileName
  }
}
    `;

/**
 * __useDealNameBySlugQuery__
 *
 * To run a query within a React component, call `useDealNameBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealNameBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDealNameBySlugQuery({
 *   variables: {
 *      bizSlug: // value for 'bizSlug'
 *      dlsSlug: // value for 'dlsSlug'
 *   },
 * });
 */
export function useDealNameBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<DealNameBySlugQuery, DealNameBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<DealNameBySlugQuery, DealNameBySlugQueryVariables>(DealNameBySlugDocument, options);
      }
export function useDealNameBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DealNameBySlugQuery, DealNameBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<DealNameBySlugQuery, DealNameBySlugQueryVariables>(DealNameBySlugDocument, options);
        }
export type DealNameBySlugQueryHookResult = ReturnType<typeof useDealNameBySlugQuery>;
export type DealNameBySlugLazyQueryHookResult = ReturnType<typeof useDealNameBySlugLazyQuery>;
export type DealNameBySlugQueryResult = ApolloReactCommon.QueryResult<DealNameBySlugQuery, DealNameBySlugQueryVariables>;
export const BlogNameBySlugDocument = gql`
    query BlogNameBySlug($blgSlug: String!) {
  blogBySlug(blgSlug: $blgSlug) {
    blgTitle
    blgBlogID
    blgSlug
    mdaLocalFileName
  }
}
    `;

/**
 * __useBlogNameBySlugQuery__
 *
 * To run a query within a React component, call `useBlogNameBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogNameBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogNameBySlugQuery({
 *   variables: {
 *      blgSlug: // value for 'blgSlug'
 *   },
 * });
 */
export function useBlogNameBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BlogNameBySlugQuery, BlogNameBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BlogNameBySlugQuery, BlogNameBySlugQueryVariables>(BlogNameBySlugDocument, options);
      }
export function useBlogNameBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BlogNameBySlugQuery, BlogNameBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BlogNameBySlugQuery, BlogNameBySlugQueryVariables>(BlogNameBySlugDocument, options);
        }
export type BlogNameBySlugQueryHookResult = ReturnType<typeof useBlogNameBySlugQuery>;
export type BlogNameBySlugLazyQueryHookResult = ReturnType<typeof useBlogNameBySlugLazyQuery>;
export type BlogNameBySlugQueryResult = ApolloReactCommon.QueryResult<BlogNameBySlugQuery, BlogNameBySlugQueryVariables>;
export const RegionNameBySlugDocument = gql`
    query RegionNameBySlug($regionSlug: String!) {
  locationSearchRegion(slug: $regionSlug) {
    ...LocationItem
  }
}
    ${LocationItemFragmentDoc}`;

/**
 * __useRegionNameBySlugQuery__
 *
 * To run a query within a React component, call `useRegionNameBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useRegionNameBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegionNameBySlugQuery({
 *   variables: {
 *      regionSlug: // value for 'regionSlug'
 *   },
 * });
 */
export function useRegionNameBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<RegionNameBySlugQuery, RegionNameBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<RegionNameBySlugQuery, RegionNameBySlugQueryVariables>(RegionNameBySlugDocument, options);
      }
export function useRegionNameBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RegionNameBySlugQuery, RegionNameBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<RegionNameBySlugQuery, RegionNameBySlugQueryVariables>(RegionNameBySlugDocument, options);
        }
export type RegionNameBySlugQueryHookResult = ReturnType<typeof useRegionNameBySlugQuery>;
export type RegionNameBySlugLazyQueryHookResult = ReturnType<typeof useRegionNameBySlugLazyQuery>;
export type RegionNameBySlugQueryResult = ApolloReactCommon.QueryResult<RegionNameBySlugQuery, RegionNameBySlugQueryVariables>;
export const ProductTypeNameBySlugDocument = gql`
    query ProductTypeNameBySlug($prdTypeSlug: String!) {
  productTypeBySlug(slug: $prdTypeSlug)
}
    `;

/**
 * __useProductTypeNameBySlugQuery__
 *
 * To run a query within a React component, call `useProductTypeNameBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductTypeNameBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductTypeNameBySlugQuery({
 *   variables: {
 *      prdTypeSlug: // value for 'prdTypeSlug'
 *   },
 * });
 */
export function useProductTypeNameBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductTypeNameBySlugQuery, ProductTypeNameBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductTypeNameBySlugQuery, ProductTypeNameBySlugQueryVariables>(ProductTypeNameBySlugDocument, options);
      }
export function useProductTypeNameBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductTypeNameBySlugQuery, ProductTypeNameBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductTypeNameBySlugQuery, ProductTypeNameBySlugQueryVariables>(ProductTypeNameBySlugDocument, options);
        }
export type ProductTypeNameBySlugQueryHookResult = ReturnType<typeof useProductTypeNameBySlugQuery>;
export type ProductTypeNameBySlugLazyQueryHookResult = ReturnType<typeof useProductTypeNameBySlugLazyQuery>;
export type ProductTypeNameBySlugQueryResult = ApolloReactCommon.QueryResult<ProductTypeNameBySlugQuery, ProductTypeNameBySlugQueryVariables>;
export const BusinessMonthlyTopPicksDocument = gql`
    query businessMonthlyTopPicks($plRegionID: Int!, $offset: Int, $limit: Int) {
  businessMonthlyTopPicks(plRegionID: $plRegionID, offset: $offset, limit: $limit) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessMonthlyTopPicksQuery__
 *
 * To run a query within a React component, call `useBusinessMonthlyTopPicksQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessMonthlyTopPicksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessMonthlyTopPicksQuery({
 *   variables: {
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessMonthlyTopPicksQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessMonthlyTopPicksQuery, BusinessMonthlyTopPicksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessMonthlyTopPicksQuery, BusinessMonthlyTopPicksQueryVariables>(BusinessMonthlyTopPicksDocument, options);
      }
export function useBusinessMonthlyTopPicksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessMonthlyTopPicksQuery, BusinessMonthlyTopPicksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessMonthlyTopPicksQuery, BusinessMonthlyTopPicksQueryVariables>(BusinessMonthlyTopPicksDocument, options);
        }
export type BusinessMonthlyTopPicksQueryHookResult = ReturnType<typeof useBusinessMonthlyTopPicksQuery>;
export type BusinessMonthlyTopPicksLazyQueryHookResult = ReturnType<typeof useBusinessMonthlyTopPicksLazyQuery>;
export type BusinessMonthlyTopPicksQueryResult = ApolloReactCommon.QueryResult<BusinessMonthlyTopPicksQuery, BusinessMonthlyTopPicksQueryVariables>;
export const BusinessNearByDocument = gql`
    query businessNearBy($countryId: Int!, $plRegionID: Int!, $offset: Int, $limit: Int, $plType: String) {
  businessNearBy(
    countryId: $countryId
    plRegionID: $plRegionID
    offset: $offset
    limit: $limit
    plType: $plType
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessNearByQuery__
 *
 * To run a query within a React component, call `useBusinessNearByQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessNearByQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessNearByQuery({
 *   variables: {
 *      countryId: // value for 'countryId'
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      plType: // value for 'plType'
 *   },
 * });
 */
export function useBusinessNearByQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessNearByQuery, BusinessNearByQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessNearByQuery, BusinessNearByQueryVariables>(BusinessNearByDocument, options);
      }
export function useBusinessNearByLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessNearByQuery, BusinessNearByQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessNearByQuery, BusinessNearByQueryVariables>(BusinessNearByDocument, options);
        }
export type BusinessNearByQueryHookResult = ReturnType<typeof useBusinessNearByQuery>;
export type BusinessNearByLazyQueryHookResult = ReturnType<typeof useBusinessNearByLazyQuery>;
export type BusinessNearByQueryResult = ApolloReactCommon.QueryResult<BusinessNearByQuery, BusinessNearByQueryVariables>;
export const BusinessMonthlyTopPicksBrandsDocument = gql`
    query businessMonthlyTopPicksBrands($plRegionID: Int!, $offset: Int, $limit: Int) {
  businessMonthlyTopPicksBrands(
    plRegionID: $plRegionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessMonthlyTopPicksBrandsQuery__
 *
 * To run a query within a React component, call `useBusinessMonthlyTopPicksBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessMonthlyTopPicksBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessMonthlyTopPicksBrandsQuery({
 *   variables: {
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessMonthlyTopPicksBrandsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessMonthlyTopPicksBrandsQuery, BusinessMonthlyTopPicksBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessMonthlyTopPicksBrandsQuery, BusinessMonthlyTopPicksBrandsQueryVariables>(BusinessMonthlyTopPicksBrandsDocument, options);
      }
export function useBusinessMonthlyTopPicksBrandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessMonthlyTopPicksBrandsQuery, BusinessMonthlyTopPicksBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessMonthlyTopPicksBrandsQuery, BusinessMonthlyTopPicksBrandsQueryVariables>(BusinessMonthlyTopPicksBrandsDocument, options);
        }
export type BusinessMonthlyTopPicksBrandsQueryHookResult = ReturnType<typeof useBusinessMonthlyTopPicksBrandsQuery>;
export type BusinessMonthlyTopPicksBrandsLazyQueryHookResult = ReturnType<typeof useBusinessMonthlyTopPicksBrandsLazyQuery>;
export type BusinessMonthlyTopPicksBrandsQueryResult = ApolloReactCommon.QueryResult<BusinessMonthlyTopPicksBrandsQuery, BusinessMonthlyTopPicksBrandsQueryVariables>;
export const BusinessMonthlyTopPicksMailDocument = gql`
    query businessMonthlyTopPicksMail($plRegionID: Int!, $offset: Int, $limit: Int) {
  businessMonthlyTopPicksMail(
    plRegionID: $plRegionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessMonthlyTopPicksMailQuery__
 *
 * To run a query within a React component, call `useBusinessMonthlyTopPicksMailQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessMonthlyTopPicksMailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessMonthlyTopPicksMailQuery({
 *   variables: {
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessMonthlyTopPicksMailQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessMonthlyTopPicksMailQuery, BusinessMonthlyTopPicksMailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessMonthlyTopPicksMailQuery, BusinessMonthlyTopPicksMailQueryVariables>(BusinessMonthlyTopPicksMailDocument, options);
      }
export function useBusinessMonthlyTopPicksMailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessMonthlyTopPicksMailQuery, BusinessMonthlyTopPicksMailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessMonthlyTopPicksMailQuery, BusinessMonthlyTopPicksMailQueryVariables>(BusinessMonthlyTopPicksMailDocument, options);
        }
export type BusinessMonthlyTopPicksMailQueryHookResult = ReturnType<typeof useBusinessMonthlyTopPicksMailQuery>;
export type BusinessMonthlyTopPicksMailLazyQueryHookResult = ReturnType<typeof useBusinessMonthlyTopPicksMailLazyQuery>;
export type BusinessMonthlyTopPicksMailQueryResult = ApolloReactCommon.QueryResult<BusinessMonthlyTopPicksMailQuery, BusinessMonthlyTopPicksMailQueryVariables>;
export const BusinessMonthlyTopPicksDeliveriesDocument = gql`
    query businessMonthlyTopPicksDeliveries($plRegionID: Int!, $offset: Int, $limit: Int) {
  businessMonthlyTopPicksDeliveries(
    plRegionID: $plRegionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessMonthlyTopPicksDeliveriesQuery__
 *
 * To run a query within a React component, call `useBusinessMonthlyTopPicksDeliveriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessMonthlyTopPicksDeliveriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessMonthlyTopPicksDeliveriesQuery({
 *   variables: {
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessMonthlyTopPicksDeliveriesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessMonthlyTopPicksDeliveriesQuery, BusinessMonthlyTopPicksDeliveriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessMonthlyTopPicksDeliveriesQuery, BusinessMonthlyTopPicksDeliveriesQueryVariables>(BusinessMonthlyTopPicksDeliveriesDocument, options);
      }
export function useBusinessMonthlyTopPicksDeliveriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessMonthlyTopPicksDeliveriesQuery, BusinessMonthlyTopPicksDeliveriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessMonthlyTopPicksDeliveriesQuery, BusinessMonthlyTopPicksDeliveriesQueryVariables>(BusinessMonthlyTopPicksDeliveriesDocument, options);
        }
export type BusinessMonthlyTopPicksDeliveriesQueryHookResult = ReturnType<typeof useBusinessMonthlyTopPicksDeliveriesQuery>;
export type BusinessMonthlyTopPicksDeliveriesLazyQueryHookResult = ReturnType<typeof useBusinessMonthlyTopPicksDeliveriesLazyQuery>;
export type BusinessMonthlyTopPicksDeliveriesQueryResult = ApolloReactCommon.QueryResult<BusinessMonthlyTopPicksDeliveriesQuery, BusinessMonthlyTopPicksDeliveriesQueryVariables>;
export const BusinessMonthlyTopPicksDispensariesDocument = gql`
    query businessMonthlyTopPicksDispensaries($plRegionID: Int!, $offset: Int, $limit: Int) {
  businessMonthlyTopPicksDispensary(
    plRegionID: $plRegionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessMonthlyTopPicksDispensariesQuery__
 *
 * To run a query within a React component, call `useBusinessMonthlyTopPicksDispensariesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessMonthlyTopPicksDispensariesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessMonthlyTopPicksDispensariesQuery({
 *   variables: {
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessMonthlyTopPicksDispensariesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessMonthlyTopPicksDispensariesQuery, BusinessMonthlyTopPicksDispensariesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessMonthlyTopPicksDispensariesQuery, BusinessMonthlyTopPicksDispensariesQueryVariables>(BusinessMonthlyTopPicksDispensariesDocument, options);
      }
export function useBusinessMonthlyTopPicksDispensariesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessMonthlyTopPicksDispensariesQuery, BusinessMonthlyTopPicksDispensariesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessMonthlyTopPicksDispensariesQuery, BusinessMonthlyTopPicksDispensariesQueryVariables>(BusinessMonthlyTopPicksDispensariesDocument, options);
        }
export type BusinessMonthlyTopPicksDispensariesQueryHookResult = ReturnType<typeof useBusinessMonthlyTopPicksDispensariesQuery>;
export type BusinessMonthlyTopPicksDispensariesLazyQueryHookResult = ReturnType<typeof useBusinessMonthlyTopPicksDispensariesLazyQuery>;
export type BusinessMonthlyTopPicksDispensariesQueryResult = ApolloReactCommon.QueryResult<BusinessMonthlyTopPicksDispensariesQuery, BusinessMonthlyTopPicksDispensariesQueryVariables>;
export const BusinessFeaturedBrandsDocument = gql`
    query businessFeaturedBrands($plCountryID: Int, $linkProvinceID: Int!, $offset: Int, $limit: Int) {
  businessFeaturedBrands(
    plCountryID: $plCountryID
    linkProvinceID: $linkProvinceID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessFeaturedBrandsQuery__
 *
 * To run a query within a React component, call `useBusinessFeaturedBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessFeaturedBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessFeaturedBrandsQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessFeaturedBrandsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessFeaturedBrandsQuery, BusinessFeaturedBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessFeaturedBrandsQuery, BusinessFeaturedBrandsQueryVariables>(BusinessFeaturedBrandsDocument, options);
      }
export function useBusinessFeaturedBrandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessFeaturedBrandsQuery, BusinessFeaturedBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessFeaturedBrandsQuery, BusinessFeaturedBrandsQueryVariables>(BusinessFeaturedBrandsDocument, options);
        }
export type BusinessFeaturedBrandsQueryHookResult = ReturnType<typeof useBusinessFeaturedBrandsQuery>;
export type BusinessFeaturedBrandsLazyQueryHookResult = ReturnType<typeof useBusinessFeaturedBrandsLazyQuery>;
export type BusinessFeaturedBrandsQueryResult = ApolloReactCommon.QueryResult<BusinessFeaturedBrandsQuery, BusinessFeaturedBrandsQueryVariables>;
export const BusinessVerifiedBrandsDocument = gql`
    query businessVerifiedBrands($plCountryID: Int, $linkProvinceID: Int!, $offset: Int, $limit: Int) {
  businessVerifiedBrands(
    plCountryID: $plCountryID
    linkProvinceID: $linkProvinceID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessVerifiedBrandsQuery__
 *
 * To run a query within a React component, call `useBusinessVerifiedBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessVerifiedBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessVerifiedBrandsQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessVerifiedBrandsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessVerifiedBrandsQuery, BusinessVerifiedBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessVerifiedBrandsQuery, BusinessVerifiedBrandsQueryVariables>(BusinessVerifiedBrandsDocument, options);
      }
export function useBusinessVerifiedBrandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessVerifiedBrandsQuery, BusinessVerifiedBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessVerifiedBrandsQuery, BusinessVerifiedBrandsQueryVariables>(BusinessVerifiedBrandsDocument, options);
        }
export type BusinessVerifiedBrandsQueryHookResult = ReturnType<typeof useBusinessVerifiedBrandsQuery>;
export type BusinessVerifiedBrandsLazyQueryHookResult = ReturnType<typeof useBusinessVerifiedBrandsLazyQuery>;
export type BusinessVerifiedBrandsQueryResult = ApolloReactCommon.QueryResult<BusinessVerifiedBrandsQuery, BusinessVerifiedBrandsQueryVariables>;
export const BusinessAllBrandsDocument = gql`
    query businessAllBrands($plCountryID: Int, $linkProvinceID: Int!, $offset: Int, $limit: Int) {
  businessAllBrands(
    plCountryID: $plCountryID
    linkProvinceID: $linkProvinceID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessAllBrandsQuery__
 *
 * To run a query within a React component, call `useBusinessAllBrandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessAllBrandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessAllBrandsQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessAllBrandsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessAllBrandsQuery, BusinessAllBrandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessAllBrandsQuery, BusinessAllBrandsQueryVariables>(BusinessAllBrandsDocument, options);
      }
export function useBusinessAllBrandsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessAllBrandsQuery, BusinessAllBrandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessAllBrandsQuery, BusinessAllBrandsQueryVariables>(BusinessAllBrandsDocument, options);
        }
export type BusinessAllBrandsQueryHookResult = ReturnType<typeof useBusinessAllBrandsQuery>;
export type BusinessAllBrandsLazyQueryHookResult = ReturnType<typeof useBusinessAllBrandsLazyQuery>;
export type BusinessAllBrandsQueryResult = ApolloReactCommon.QueryResult<BusinessAllBrandsQuery, BusinessAllBrandsQueryVariables>;
export const BusinessFeaturedDeliveriesDocument = gql`
    query businessFeaturedDeliveries($plCountryID: Int, $linkProvinceID: Int!, $plRegionID: Int, $offset: Int, $limit: Int) {
  businessFeaturedDeliveries(
    plCountryID: $plCountryID
    linkProvinceID: $linkProvinceID
    plRegionID: $plRegionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessFeaturedDeliveriesQuery__
 *
 * To run a query within a React component, call `useBusinessFeaturedDeliveriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessFeaturedDeliveriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessFeaturedDeliveriesQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessFeaturedDeliveriesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessFeaturedDeliveriesQuery, BusinessFeaturedDeliveriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessFeaturedDeliveriesQuery, BusinessFeaturedDeliveriesQueryVariables>(BusinessFeaturedDeliveriesDocument, options);
      }
export function useBusinessFeaturedDeliveriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessFeaturedDeliveriesQuery, BusinessFeaturedDeliveriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessFeaturedDeliveriesQuery, BusinessFeaturedDeliveriesQueryVariables>(BusinessFeaturedDeliveriesDocument, options);
        }
export type BusinessFeaturedDeliveriesQueryHookResult = ReturnType<typeof useBusinessFeaturedDeliveriesQuery>;
export type BusinessFeaturedDeliveriesLazyQueryHookResult = ReturnType<typeof useBusinessFeaturedDeliveriesLazyQuery>;
export type BusinessFeaturedDeliveriesQueryResult = ApolloReactCommon.QueryResult<BusinessFeaturedDeliveriesQuery, BusinessFeaturedDeliveriesQueryVariables>;
export const BusinessVerifiedDeliveriesDocument = gql`
    query businessVerifiedDeliveries($plCountryID: Int, $linkProvinceID: Int!, $plRegionID: Int, $offset: Int, $limit: Int) {
  businessVerifiedDeliveries(
    plCountryID: $plCountryID
    linkProvinceID: $linkProvinceID
    plRegionID: $plRegionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessVerifiedDeliveriesQuery__
 *
 * To run a query within a React component, call `useBusinessVerifiedDeliveriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessVerifiedDeliveriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessVerifiedDeliveriesQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessVerifiedDeliveriesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessVerifiedDeliveriesQuery, BusinessVerifiedDeliveriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessVerifiedDeliveriesQuery, BusinessVerifiedDeliveriesQueryVariables>(BusinessVerifiedDeliveriesDocument, options);
      }
export function useBusinessVerifiedDeliveriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessVerifiedDeliveriesQuery, BusinessVerifiedDeliveriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessVerifiedDeliveriesQuery, BusinessVerifiedDeliveriesQueryVariables>(BusinessVerifiedDeliveriesDocument, options);
        }
export type BusinessVerifiedDeliveriesQueryHookResult = ReturnType<typeof useBusinessVerifiedDeliveriesQuery>;
export type BusinessVerifiedDeliveriesLazyQueryHookResult = ReturnType<typeof useBusinessVerifiedDeliveriesLazyQuery>;
export type BusinessVerifiedDeliveriesQueryResult = ApolloReactCommon.QueryResult<BusinessVerifiedDeliveriesQuery, BusinessVerifiedDeliveriesQueryVariables>;
export const BusinessAllDeliveriesDocument = gql`
    query businessAllDeliveries($plCountryID: Int, $linkProvinceID: Int!, $plRegionID: Int, $offset: Int, $limit: Int) {
  businessAllDeliveries(
    plCountryID: $plCountryID
    linkProvinceID: $linkProvinceID
    plRegionID: $plRegionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessAllDeliveriesQuery__
 *
 * To run a query within a React component, call `useBusinessAllDeliveriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessAllDeliveriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessAllDeliveriesQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessAllDeliveriesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessAllDeliveriesQuery, BusinessAllDeliveriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessAllDeliveriesQuery, BusinessAllDeliveriesQueryVariables>(BusinessAllDeliveriesDocument, options);
      }
export function useBusinessAllDeliveriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessAllDeliveriesQuery, BusinessAllDeliveriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessAllDeliveriesQuery, BusinessAllDeliveriesQueryVariables>(BusinessAllDeliveriesDocument, options);
        }
export type BusinessAllDeliveriesQueryHookResult = ReturnType<typeof useBusinessAllDeliveriesQuery>;
export type BusinessAllDeliveriesLazyQueryHookResult = ReturnType<typeof useBusinessAllDeliveriesLazyQuery>;
export type BusinessAllDeliveriesQueryResult = ApolloReactCommon.QueryResult<BusinessAllDeliveriesQuery, BusinessAllDeliveriesQueryVariables>;
export const BusinessFeaturedDispensaryDocument = gql`
    query businessFeaturedDispensary($plCountryID: Int, $linkProvinceID: Int!, $plRegionID: Int, $offset: Int, $limit: Int) {
  businessFeaturedDispensary(
    plCountryID: $plCountryID
    linkProvinceID: $linkProvinceID
    plRegionID: $plRegionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessFeaturedDispensaryQuery__
 *
 * To run a query within a React component, call `useBusinessFeaturedDispensaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessFeaturedDispensaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessFeaturedDispensaryQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessFeaturedDispensaryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessFeaturedDispensaryQuery, BusinessFeaturedDispensaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessFeaturedDispensaryQuery, BusinessFeaturedDispensaryQueryVariables>(BusinessFeaturedDispensaryDocument, options);
      }
export function useBusinessFeaturedDispensaryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessFeaturedDispensaryQuery, BusinessFeaturedDispensaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessFeaturedDispensaryQuery, BusinessFeaturedDispensaryQueryVariables>(BusinessFeaturedDispensaryDocument, options);
        }
export type BusinessFeaturedDispensaryQueryHookResult = ReturnType<typeof useBusinessFeaturedDispensaryQuery>;
export type BusinessFeaturedDispensaryLazyQueryHookResult = ReturnType<typeof useBusinessFeaturedDispensaryLazyQuery>;
export type BusinessFeaturedDispensaryQueryResult = ApolloReactCommon.QueryResult<BusinessFeaturedDispensaryQuery, BusinessFeaturedDispensaryQueryVariables>;
export const BusinessVerifiedDispensaryDocument = gql`
    query businessVerifiedDispensary($plCountryID: Int, $linkProvinceID: Int!, $plRegionID: Int, $offset: Int, $limit: Int) {
  businessVerifiedDispensary(
    plCountryID: $plCountryID
    linkProvinceID: $linkProvinceID
    plRegionID: $plRegionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessVerifiedDispensaryQuery__
 *
 * To run a query within a React component, call `useBusinessVerifiedDispensaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessVerifiedDispensaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessVerifiedDispensaryQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessVerifiedDispensaryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessVerifiedDispensaryQuery, BusinessVerifiedDispensaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessVerifiedDispensaryQuery, BusinessVerifiedDispensaryQueryVariables>(BusinessVerifiedDispensaryDocument, options);
      }
export function useBusinessVerifiedDispensaryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessVerifiedDispensaryQuery, BusinessVerifiedDispensaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessVerifiedDispensaryQuery, BusinessVerifiedDispensaryQueryVariables>(BusinessVerifiedDispensaryDocument, options);
        }
export type BusinessVerifiedDispensaryQueryHookResult = ReturnType<typeof useBusinessVerifiedDispensaryQuery>;
export type BusinessVerifiedDispensaryLazyQueryHookResult = ReturnType<typeof useBusinessVerifiedDispensaryLazyQuery>;
export type BusinessVerifiedDispensaryQueryResult = ApolloReactCommon.QueryResult<BusinessVerifiedDispensaryQuery, BusinessVerifiedDispensaryQueryVariables>;
export const BusinessAllDispensaryDocument = gql`
    query businessAllDispensary($plCountryID: Int, $linkProvinceID: Int!, $plRegionID: Int, $offset: Int, $limit: Int) {
  businessAllDispensary(
    plCountryID: $plCountryID
    linkProvinceID: $linkProvinceID
    plRegionID: $plRegionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessAllDispensaryQuery__
 *
 * To run a query within a React component, call `useBusinessAllDispensaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessAllDispensaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessAllDispensaryQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessAllDispensaryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessAllDispensaryQuery, BusinessAllDispensaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessAllDispensaryQuery, BusinessAllDispensaryQueryVariables>(BusinessAllDispensaryDocument, options);
      }
export function useBusinessAllDispensaryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessAllDispensaryQuery, BusinessAllDispensaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessAllDispensaryQuery, BusinessAllDispensaryQueryVariables>(BusinessAllDispensaryDocument, options);
        }
export type BusinessAllDispensaryQueryHookResult = ReturnType<typeof useBusinessAllDispensaryQuery>;
export type BusinessAllDispensaryLazyQueryHookResult = ReturnType<typeof useBusinessAllDispensaryLazyQuery>;
export type BusinessAllDispensaryQueryResult = ApolloReactCommon.QueryResult<BusinessAllDispensaryQuery, BusinessAllDispensaryQueryVariables>;
export const BusinessFeaturedMailDocument = gql`
    query businessFeaturedMail($plCountryID: Int, $linkProvinceID: Int!, $offset: Int, $limit: Int) {
  businessFeaturedMail(
    plCountryID: $plCountryID
    linkProvinceID: $linkProvinceID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessFeaturedMailQuery__
 *
 * To run a query within a React component, call `useBusinessFeaturedMailQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessFeaturedMailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessFeaturedMailQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessFeaturedMailQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessFeaturedMailQuery, BusinessFeaturedMailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessFeaturedMailQuery, BusinessFeaturedMailQueryVariables>(BusinessFeaturedMailDocument, options);
      }
export function useBusinessFeaturedMailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessFeaturedMailQuery, BusinessFeaturedMailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessFeaturedMailQuery, BusinessFeaturedMailQueryVariables>(BusinessFeaturedMailDocument, options);
        }
export type BusinessFeaturedMailQueryHookResult = ReturnType<typeof useBusinessFeaturedMailQuery>;
export type BusinessFeaturedMailLazyQueryHookResult = ReturnType<typeof useBusinessFeaturedMailLazyQuery>;
export type BusinessFeaturedMailQueryResult = ApolloReactCommon.QueryResult<BusinessFeaturedMailQuery, BusinessFeaturedMailQueryVariables>;
export const BusinessVerifiedMailDocument = gql`
    query businessVerifiedMail($plCountryID: Int, $linkProvinceID: Int!, $offset: Int, $limit: Int) {
  businessVerifiedMail(
    plCountryID: $plCountryID
    linkProvinceID: $linkProvinceID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessVerifiedMailQuery__
 *
 * To run a query within a React component, call `useBusinessVerifiedMailQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessVerifiedMailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessVerifiedMailQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessVerifiedMailQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessVerifiedMailQuery, BusinessVerifiedMailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessVerifiedMailQuery, BusinessVerifiedMailQueryVariables>(BusinessVerifiedMailDocument, options);
      }
export function useBusinessVerifiedMailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessVerifiedMailQuery, BusinessVerifiedMailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessVerifiedMailQuery, BusinessVerifiedMailQueryVariables>(BusinessVerifiedMailDocument, options);
        }
export type BusinessVerifiedMailQueryHookResult = ReturnType<typeof useBusinessVerifiedMailQuery>;
export type BusinessVerifiedMailLazyQueryHookResult = ReturnType<typeof useBusinessVerifiedMailLazyQuery>;
export type BusinessVerifiedMailQueryResult = ApolloReactCommon.QueryResult<BusinessVerifiedMailQuery, BusinessVerifiedMailQueryVariables>;
export const BusinessAllMailDocument = gql`
    query businessAllMail($plCountryID: Int, $linkProvinceID: Int!, $offset: Int, $limit: Int) {
  businessAllMail(
    plCountryID: $plCountryID
    linkProvinceID: $linkProvinceID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessAllMailQuery__
 *
 * To run a query within a React component, call `useBusinessAllMailQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessAllMailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessAllMailQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessAllMailQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessAllMailQuery, BusinessAllMailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessAllMailQuery, BusinessAllMailQueryVariables>(BusinessAllMailDocument, options);
      }
export function useBusinessAllMailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessAllMailQuery, BusinessAllMailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessAllMailQuery, BusinessAllMailQueryVariables>(BusinessAllMailDocument, options);
        }
export type BusinessAllMailQueryHookResult = ReturnType<typeof useBusinessAllMailQuery>;
export type BusinessAllMailLazyQueryHookResult = ReturnType<typeof useBusinessAllMailLazyQuery>;
export type BusinessAllMailQueryResult = ApolloReactCommon.QueryResult<BusinessAllMailQuery, BusinessAllMailQueryVariables>;
export const BusinessBySlugDocument = gql`
    query businessBySlug($plSlugType: String!, $bizSlug: String!, $regionSlug: String, $prdGenetics: [String], $prdProductType: [String], $prdProductCategories: [String], $search: String, $productOffset: Int, $productLimit: Int, $filterByLocation: Boolean, $latitudeFront: Float, $longitudeFront: Float, $regionID: Int, $type: String, $clientIp: String, $sort: [String], $resellersLimit: Int = 300, $brandsLimit: Int = 12) {
  businessBySlug(
    plSlugType: $plSlugType
    bizSlug: $bizSlug
    regionSlug: $regionSlug
  ) {
    plType
    mdaLocalFileName
    rvwScoreAvg
    rvwCount
    isOpen
    isToday
    bizClaim
    bizClaimUnblurred
    willOpen
    canAddReview
    canAddReview
    bizBusinessID
    bizName
    bizSlug
    productType {
      ...ProductTypeItem
    }
    productAvailable
    productCount(
      prdGenetics: $prdGenetics
      prdProductType: $prdProductType
      prdProductCategories: $prdProductCategories
      search: $search
    )
    dutchieAPI
    bizDescription
    bizFeaturedPosition
    bizIsVerified
    bizIsLite
    bizHasMapPin
    bizSortOption
    brands(offset: 0, limit: $brandsLimit) {
      ...BusinessItem
    }
    resellers(
      clientIp: $clientIp
      type: $type
      filterByLocation: $filterByLocation
      latitudeFront: $latitudeFront
      longitudeFront: $longitudeFront
      regionID: $regionID
      offset: 0
      limit: $resellersLimit
    ) {
      ...BusinessItem
      contact {
        ...ContactItem
      }
    }
    contact {
      ...ContactItem
    }
    deals(offset: 0, limit: 12) {
      ...DealItem
    }
    products(
      offset: $productOffset
      limit: $productLimit
      prdGenetics: $prdGenetics
      prdProductType: $prdProductType
      prdProductCategories: $prdProductCategories
      search: $search
      sort: $sort
    ) {
      ...ProductItem
    }
    reviews(offset: 0, limit: 12) {
      ...ReviewItem
    }
    workingHours {
      ...WorkingHourItem
    }
  }
}
    ${ProductTypeItemFragmentDoc}
${BusinessItemFragmentDoc}
${ContactItemFragmentDoc}
${DealItemFragmentDoc}
${ProductItemFragmentDoc}
${ReviewItemFragmentDoc}
${WorkingHourItemFragmentDoc}`;

/**
 * __useBusinessBySlugQuery__
 *
 * To run a query within a React component, call `useBusinessBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessBySlugQuery({
 *   variables: {
 *      plSlugType: // value for 'plSlugType'
 *      bizSlug: // value for 'bizSlug'
 *      regionSlug: // value for 'regionSlug'
 *      prdGenetics: // value for 'prdGenetics'
 *      prdProductType: // value for 'prdProductType'
 *      prdProductCategories: // value for 'prdProductCategories'
 *      search: // value for 'search'
 *      productOffset: // value for 'productOffset'
 *      productLimit: // value for 'productLimit'
 *      filterByLocation: // value for 'filterByLocation'
 *      latitudeFront: // value for 'latitudeFront'
 *      longitudeFront: // value for 'longitudeFront'
 *      regionID: // value for 'regionID'
 *      type: // value for 'type'
 *      clientIp: // value for 'clientIp'
 *      sort: // value for 'sort'
 *      resellersLimit: // value for 'resellersLimit'
 *      brandsLimit: // value for 'brandsLimit'
 *   },
 * });
 */
export function useBusinessBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessBySlugQuery, BusinessBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessBySlugQuery, BusinessBySlugQueryVariables>(BusinessBySlugDocument, options);
      }
export function useBusinessBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessBySlugQuery, BusinessBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessBySlugQuery, BusinessBySlugQueryVariables>(BusinessBySlugDocument, options);
        }
export type BusinessBySlugQueryHookResult = ReturnType<typeof useBusinessBySlugQuery>;
export type BusinessBySlugLazyQueryHookResult = ReturnType<typeof useBusinessBySlugLazyQuery>;
export type BusinessBySlugQueryResult = ApolloReactCommon.QueryResult<BusinessBySlugQuery, BusinessBySlugQueryVariables>;
export const BusinessProductsBySlugDocument = gql`
    query businessProductsBySlug($plSlugType: String!, $bizSlug: String!, $regionSlug: String, $limit: Int!, $prdGenetics: [String], $prdProductType: [String], $prdProductCategories: [String], $search: String, $sort: [String]) {
  businessBySlug(
    plSlugType: $plSlugType
    bizSlug: $bizSlug
    regionSlug: $regionSlug
  ) {
    plType
    mdaLocalFileName
    rvwScoreAvg
    rvwCount
    isOpen
    isToday
    willOpen
    canAddReview
    canAddReview
    bizBusinessID
    bizName
    bizSlug
    productType {
      ...ProductTypeItem
    }
    productAvailable
    productCount(
      prdGenetics: $prdGenetics
      prdProductType: $prdProductType
      prdProductCategories: $prdProductCategories
      search: $search
    )
    dutchieAPI
    bizDescription
    bizFeaturedPosition
    bizIsVerified
    bizIsLite
    bizHasMapPin
    bizSortOption
    contact {
      ...ContactItem
    }
    products(
      offset: 0
      limit: $limit
      prdGenetics: $prdGenetics
      prdProductType: $prdProductType
      prdProductCategories: $prdProductCategories
      search: $search
      sort: $sort
    ) {
      ...ProductItem
    }
    workingHours {
      ...WorkingHourItem
    }
  }
}
    ${ProductTypeItemFragmentDoc}
${ContactItemFragmentDoc}
${ProductItemFragmentDoc}
${WorkingHourItemFragmentDoc}`;

/**
 * __useBusinessProductsBySlugQuery__
 *
 * To run a query within a React component, call `useBusinessProductsBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessProductsBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessProductsBySlugQuery({
 *   variables: {
 *      plSlugType: // value for 'plSlugType'
 *      bizSlug: // value for 'bizSlug'
 *      regionSlug: // value for 'regionSlug'
 *      limit: // value for 'limit'
 *      prdGenetics: // value for 'prdGenetics'
 *      prdProductType: // value for 'prdProductType'
 *      prdProductCategories: // value for 'prdProductCategories'
 *      search: // value for 'search'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useBusinessProductsBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessProductsBySlugQuery, BusinessProductsBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessProductsBySlugQuery, BusinessProductsBySlugQueryVariables>(BusinessProductsBySlugDocument, options);
      }
export function useBusinessProductsBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessProductsBySlugQuery, BusinessProductsBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessProductsBySlugQuery, BusinessProductsBySlugQueryVariables>(BusinessProductsBySlugDocument, options);
        }
export type BusinessProductsBySlugQueryHookResult = ReturnType<typeof useBusinessProductsBySlugQuery>;
export type BusinessProductsBySlugLazyQueryHookResult = ReturnType<typeof useBusinessProductsBySlugLazyQuery>;
export type BusinessProductsBySlugQueryResult = ApolloReactCommon.QueryResult<BusinessProductsBySlugQuery, BusinessProductsBySlugQueryVariables>;
export const BusinessDealsBySlugDocument = gql`
    query businessDealsBySlug($plSlugType: String!, $bizSlug: String!, $regionSlug: String, $limit: Int!) {
  businessBySlug(
    plSlugType: $plSlugType
    bizSlug: $bizSlug
    regionSlug: $regionSlug
  ) {
    plType
    mdaLocalFileName
    rvwScoreAvg
    rvwCount
    isOpen
    isToday
    willOpen
    canAddReview
    canAddReview
    bizBusinessID
    bizName
    bizSlug
    productType {
      ...ProductTypeItem
    }
    dutchieAPI
    bizDescription
    bizFeaturedPosition
    bizIsVerified
    bizIsLite
    bizHasMapPin
    contact {
      ...ContactItem
    }
    deals(offset: 0, limit: $limit) {
      ...DealItem
    }
    workingHours {
      ...WorkingHourItem
    }
  }
}
    ${ProductTypeItemFragmentDoc}
${ContactItemFragmentDoc}
${DealItemFragmentDoc}
${WorkingHourItemFragmentDoc}`;

/**
 * __useBusinessDealsBySlugQuery__
 *
 * To run a query within a React component, call `useBusinessDealsBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessDealsBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessDealsBySlugQuery({
 *   variables: {
 *      plSlugType: // value for 'plSlugType'
 *      bizSlug: // value for 'bizSlug'
 *      regionSlug: // value for 'regionSlug'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessDealsBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessDealsBySlugQuery, BusinessDealsBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessDealsBySlugQuery, BusinessDealsBySlugQueryVariables>(BusinessDealsBySlugDocument, options);
      }
export function useBusinessDealsBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessDealsBySlugQuery, BusinessDealsBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessDealsBySlugQuery, BusinessDealsBySlugQueryVariables>(BusinessDealsBySlugDocument, options);
        }
export type BusinessDealsBySlugQueryHookResult = ReturnType<typeof useBusinessDealsBySlugQuery>;
export type BusinessDealsBySlugLazyQueryHookResult = ReturnType<typeof useBusinessDealsBySlugLazyQuery>;
export type BusinessDealsBySlugQueryResult = ApolloReactCommon.QueryResult<BusinessDealsBySlugQuery, BusinessDealsBySlugQueryVariables>;
export const BusinessReviewsBySlugDocument = gql`
    query businessReviewsBySlug($plSlugType: String!, $bizSlug: String!, $regionSlug: String, $limit: Int!) {
  businessBySlug(
    plSlugType: $plSlugType
    bizSlug: $bizSlug
    regionSlug: $regionSlug
  ) {
    plType
    mdaLocalFileName
    rvwScoreAvg
    rvwCount
    isOpen
    isToday
    willOpen
    canAddReview
    canAddReview
    bizBusinessID
    bizName
    bizSlug
    productType {
      ...ProductTypeItem
    }
    dutchieAPI
    bizDescription
    bizFeaturedPosition
    bizIsVerified
    bizIsLite
    bizHasMapPin
    contact {
      ...ContactItem
    }
    reviews(offset: 0, limit: $limit) {
      ...ReviewItem
    }
    workingHours {
      ...WorkingHourItem
    }
  }
}
    ${ProductTypeItemFragmentDoc}
${ContactItemFragmentDoc}
${ReviewItemFragmentDoc}
${WorkingHourItemFragmentDoc}`;

/**
 * __useBusinessReviewsBySlugQuery__
 *
 * To run a query within a React component, call `useBusinessReviewsBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessReviewsBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessReviewsBySlugQuery({
 *   variables: {
 *      plSlugType: // value for 'plSlugType'
 *      bizSlug: // value for 'bizSlug'
 *      regionSlug: // value for 'regionSlug'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessReviewsBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessReviewsBySlugQuery, BusinessReviewsBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessReviewsBySlugQuery, BusinessReviewsBySlugQueryVariables>(BusinessReviewsBySlugDocument, options);
      }
export function useBusinessReviewsBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessReviewsBySlugQuery, BusinessReviewsBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessReviewsBySlugQuery, BusinessReviewsBySlugQueryVariables>(BusinessReviewsBySlugDocument, options);
        }
export type BusinessReviewsBySlugQueryHookResult = ReturnType<typeof useBusinessReviewsBySlugQuery>;
export type BusinessReviewsBySlugLazyQueryHookResult = ReturnType<typeof useBusinessReviewsBySlugLazyQuery>;
export type BusinessReviewsBySlugQueryResult = ApolloReactCommon.QueryResult<BusinessReviewsBySlugQuery, BusinessReviewsBySlugQueryVariables>;
export const BusinessResellersBySlugDocument = gql`
    query businessResellersBySlug($plSlugType: String!, $bizSlug: String!, $regionSlug: String, $limit: Int!, $filterByLocation: Boolean, $latitudeFront: Float, $longitudeFront: Float, $regionID: Int, $type: String, $clientIp: String) {
  businessBySlug(
    plSlugType: $plSlugType
    bizSlug: $bizSlug
    regionSlug: $regionSlug
  ) {
    plType
    mdaLocalFileName
    rvwScoreAvg
    rvwCount
    isOpen
    isToday
    willOpen
    canAddReview
    canAddReview
    bizBusinessID
    bizName
    bizSlug
    productType {
      ...ProductTypeItem
    }
    dutchieAPI
    bizDescription
    bizFeaturedPosition
    bizIsVerified
    bizIsLite
    bizHasMapPin
    contact {
      ...ContactItem
    }
    brands(offset: 0, limit: $limit) {
      ...BusinessItem
    }
    resellers(
      clientIp: $clientIp
      type: $type
      filterByLocation: $filterByLocation
      latitudeFront: $latitudeFront
      longitudeFront: $longitudeFront
      regionID: $regionID
      offset: 0
      limit: $limit
    ) {
      ...BusinessItem
      contact {
        ...ContactItem
      }
    }
    workingHours {
      ...WorkingHourItem
    }
  }
}
    ${ProductTypeItemFragmentDoc}
${ContactItemFragmentDoc}
${BusinessItemFragmentDoc}
${WorkingHourItemFragmentDoc}`;

/**
 * __useBusinessResellersBySlugQuery__
 *
 * To run a query within a React component, call `useBusinessResellersBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessResellersBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessResellersBySlugQuery({
 *   variables: {
 *      plSlugType: // value for 'plSlugType'
 *      bizSlug: // value for 'bizSlug'
 *      regionSlug: // value for 'regionSlug'
 *      limit: // value for 'limit'
 *      filterByLocation: // value for 'filterByLocation'
 *      latitudeFront: // value for 'latitudeFront'
 *      longitudeFront: // value for 'longitudeFront'
 *      regionID: // value for 'regionID'
 *      type: // value for 'type'
 *      clientIp: // value for 'clientIp'
 *   },
 * });
 */
export function useBusinessResellersBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessResellersBySlugQuery, BusinessResellersBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessResellersBySlugQuery, BusinessResellersBySlugQueryVariables>(BusinessResellersBySlugDocument, options);
      }
export function useBusinessResellersBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessResellersBySlugQuery, BusinessResellersBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessResellersBySlugQuery, BusinessResellersBySlugQueryVariables>(BusinessResellersBySlugDocument, options);
        }
export type BusinessResellersBySlugQueryHookResult = ReturnType<typeof useBusinessResellersBySlugQuery>;
export type BusinessResellersBySlugLazyQueryHookResult = ReturnType<typeof useBusinessResellersBySlugLazyQuery>;
export type BusinessResellersBySlugQueryResult = ApolloReactCommon.QueryResult<BusinessResellersBySlugQuery, BusinessResellersBySlugQueryVariables>;
export const BusinessInterlinkingDocument = gql`
    query businessInterlinking($locationSlug: String!, $type: String!, $countryId: Int!) {
  locationListNearLocation(
    countryId: $countryId
    locationSlug: $locationSlug
    type: $type
    offset: 0
    limit: 50
  ) {
    provinces {
      plProvinceID
      plName
      plInitials
    }
    regions {
      plRegionID
      plProvinceID
      plName
      plSlug
      province {
        plProvinceID
        plName
        plInitials
      }
    }
  }
}
    `;

/**
 * __useBusinessInterlinkingQuery__
 *
 * To run a query within a React component, call `useBusinessInterlinkingQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessInterlinkingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessInterlinkingQuery({
 *   variables: {
 *      locationSlug: // value for 'locationSlug'
 *      type: // value for 'type'
 *      countryId: // value for 'countryId'
 *   },
 * });
 */
export function useBusinessInterlinkingQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessInterlinkingQuery, BusinessInterlinkingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessInterlinkingQuery, BusinessInterlinkingQueryVariables>(BusinessInterlinkingDocument, options);
      }
export function useBusinessInterlinkingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessInterlinkingQuery, BusinessInterlinkingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessInterlinkingQuery, BusinessInterlinkingQueryVariables>(BusinessInterlinkingDocument, options);
        }
export type BusinessInterlinkingQueryHookResult = ReturnType<typeof useBusinessInterlinkingQuery>;
export type BusinessInterlinkingLazyQueryHookResult = ReturnType<typeof useBusinessInterlinkingLazyQuery>;
export type BusinessInterlinkingQueryResult = ApolloReactCommon.QueryResult<BusinessInterlinkingQuery, BusinessInterlinkingQueryVariables>;
export const BusinessOnlyBySlugDocument = gql`
    query businessOnlyBySlug($bizSlug: String!) {
  businessBySlugHasLanding(bizSlug: $bizSlug) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessOnlyBySlugQuery__
 *
 * To run a query within a React component, call `useBusinessOnlyBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessOnlyBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessOnlyBySlugQuery({
 *   variables: {
 *      bizSlug: // value for 'bizSlug'
 *   },
 * });
 */
export function useBusinessOnlyBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessOnlyBySlugQuery, BusinessOnlyBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessOnlyBySlugQuery, BusinessOnlyBySlugQueryVariables>(BusinessOnlyBySlugDocument, options);
      }
export function useBusinessOnlyBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessOnlyBySlugQuery, BusinessOnlyBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessOnlyBySlugQuery, BusinessOnlyBySlugQueryVariables>(BusinessOnlyBySlugDocument, options);
        }
export type BusinessOnlyBySlugQueryHookResult = ReturnType<typeof useBusinessOnlyBySlugQuery>;
export type BusinessOnlyBySlugLazyQueryHookResult = ReturnType<typeof useBusinessOnlyBySlugLazyQuery>;
export type BusinessOnlyBySlugQueryResult = ApolloReactCommon.QueryResult<BusinessOnlyBySlugQuery, BusinessOnlyBySlugQueryVariables>;
export const BusinessAllVerifiedDocument = gql`
    query businessAllVerified($provinceID: Int!, $regionID: Int!, $offset: Int, $limit: Int) {
  businessAllVerified(
    linkProvinceID: $provinceID
    plRegionID: $regionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessAllVerifiedQuery__
 *
 * To run a query within a React component, call `useBusinessAllVerifiedQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessAllVerifiedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessAllVerifiedQuery({
 *   variables: {
 *      provinceID: // value for 'provinceID'
 *      regionID: // value for 'regionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessAllVerifiedQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessAllVerifiedQuery, BusinessAllVerifiedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessAllVerifiedQuery, BusinessAllVerifiedQueryVariables>(BusinessAllVerifiedDocument, options);
      }
export function useBusinessAllVerifiedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessAllVerifiedQuery, BusinessAllVerifiedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessAllVerifiedQuery, BusinessAllVerifiedQueryVariables>(BusinessAllVerifiedDocument, options);
        }
export type BusinessAllVerifiedQueryHookResult = ReturnType<typeof useBusinessAllVerifiedQuery>;
export type BusinessAllVerifiedLazyQueryHookResult = ReturnType<typeof useBusinessAllVerifiedLazyQuery>;
export type BusinessAllVerifiedQueryResult = ApolloReactCommon.QueryResult<BusinessAllVerifiedQuery, BusinessAllVerifiedQueryVariables>;
export const BusinessAllByLocationDocument = gql`
    query businessAllByLocation($provinceID: Int!, $regionID: Int!, $offset: Int, $limit: Int) {
  businessAllByLocation(
    linkProvinceID: $provinceID
    plRegionID: $regionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessAllByLocationQuery__
 *
 * To run a query within a React component, call `useBusinessAllByLocationQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessAllByLocationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessAllByLocationQuery({
 *   variables: {
 *      provinceID: // value for 'provinceID'
 *      regionID: // value for 'regionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBusinessAllByLocationQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessAllByLocationQuery, BusinessAllByLocationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessAllByLocationQuery, BusinessAllByLocationQueryVariables>(BusinessAllByLocationDocument, options);
      }
export function useBusinessAllByLocationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessAllByLocationQuery, BusinessAllByLocationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessAllByLocationQuery, BusinessAllByLocationQueryVariables>(BusinessAllByLocationDocument, options);
        }
export type BusinessAllByLocationQueryHookResult = ReturnType<typeof useBusinessAllByLocationQuery>;
export type BusinessAllByLocationLazyQueryHookResult = ReturnType<typeof useBusinessAllByLocationLazyQuery>;
export type BusinessAllByLocationQueryResult = ApolloReactCommon.QueryResult<BusinessAllByLocationQuery, BusinessAllByLocationQueryVariables>;
export const BusinessGetAllDocument = gql`
    query businessGetAll($userId: String!, $sort: [String], $limit: Int, $offset: Int) {
  businessByUserId(userId: $userId, limit: $limit, offset: $offset, sort: $sort) {
    businesses {
      ...BusinessItem
    }
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useBusinessGetAllQuery__
 *
 * To run a query within a React component, call `useBusinessGetAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessGetAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessGetAllQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      sort: // value for 'sort'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useBusinessGetAllQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessGetAllQuery, BusinessGetAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessGetAllQuery, BusinessGetAllQueryVariables>(BusinessGetAllDocument, options);
      }
export function useBusinessGetAllLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessGetAllQuery, BusinessGetAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessGetAllQuery, BusinessGetAllQueryVariables>(BusinessGetAllDocument, options);
        }
export type BusinessGetAllQueryHookResult = ReturnType<typeof useBusinessGetAllQuery>;
export type BusinessGetAllLazyQueryHookResult = ReturnType<typeof useBusinessGetAllLazyQuery>;
export type BusinessGetAllQueryResult = ApolloReactCommon.QueryResult<BusinessGetAllQuery, BusinessGetAllQueryVariables>;
export const BusinessForProductAdsDocument = gql`
    query businessForProductAds($userId: String!, $sort: [String], $limit: Int, $offset: Int) {
  businessByUserId(userId: $userId, limit: $limit, offset: $offset, sort: $sort) {
    businesses {
      plType
      bizName
      bizClaim
      bizClaimUnblurred
      bizPublishDate
      bizExpirationDateToronto
      bizExpirationDate
      bizBusinessID
      bizIsLite
      contact {
        regionName
        provinceInitial
      }
      productType {
        totalImpressions
        available
        counter
        name
        slug
        id
        price
        categoriesItems {
          totalImpressions
          available
          name
          slug
          id
          counter
          categoriesItems {
            totalImpressions
            available
            name
            slug
            id
            counter
            price
          }
        }
        typeItems {
          totalImpressions
          available
          name
          slug
          id
          counter
          price
        }
      }
    }
  }
}
    `;

/**
 * __useBusinessForProductAdsQuery__
 *
 * To run a query within a React component, call `useBusinessForProductAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessForProductAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessForProductAdsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      sort: // value for 'sort'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useBusinessForProductAdsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessForProductAdsQuery, BusinessForProductAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessForProductAdsQuery, BusinessForProductAdsQueryVariables>(BusinessForProductAdsDocument, options);
      }
export function useBusinessForProductAdsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessForProductAdsQuery, BusinessForProductAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessForProductAdsQuery, BusinessForProductAdsQueryVariables>(BusinessForProductAdsDocument, options);
        }
export type BusinessForProductAdsQueryHookResult = ReturnType<typeof useBusinessForProductAdsQuery>;
export type BusinessForProductAdsLazyQueryHookResult = ReturnType<typeof useBusinessForProductAdsLazyQuery>;
export type BusinessForProductAdsQueryResult = ApolloReactCommon.QueryResult<BusinessForProductAdsQuery, BusinessForProductAdsQueryVariables>;
export const BusinessAdvertisementForProductPageDocument = gql`
    query businessAdvertisementForProductPage($productId: String!, $limit: Int, $offset: Int, $plProvinceID: Int, $plRegionID: Int, $longitudeGPS: Float, $latitudeGPS: Float) {
  businessAdvertisementForProductPage(
    prdProductID: $productId
    limit: $limit
    offset: $offset
    plProvinceID: $plProvinceID
    plRegionID: $plRegionID
    longitudeGPS: $longitudeGPS
    latitudeGPS: $latitudeGPS
  ) {
    ...BusinessItem
    products {
      ...ProductItem
      business {
        bizBusinessID
      }
    }
  }
}
    ${BusinessItemFragmentDoc}
${ProductItemFragmentDoc}`;

/**
 * __useBusinessAdvertisementForProductPageQuery__
 *
 * To run a query within a React component, call `useBusinessAdvertisementForProductPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessAdvertisementForProductPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessAdvertisementForProductPageQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      plProvinceID: // value for 'plProvinceID'
 *      plRegionID: // value for 'plRegionID'
 *      longitudeGPS: // value for 'longitudeGPS'
 *      latitudeGPS: // value for 'latitudeGPS'
 *   },
 * });
 */
export function useBusinessAdvertisementForProductPageQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessAdvertisementForProductPageQuery, BusinessAdvertisementForProductPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessAdvertisementForProductPageQuery, BusinessAdvertisementForProductPageQueryVariables>(BusinessAdvertisementForProductPageDocument, options);
      }
export function useBusinessAdvertisementForProductPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessAdvertisementForProductPageQuery, BusinessAdvertisementForProductPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessAdvertisementForProductPageQuery, BusinessAdvertisementForProductPageQueryVariables>(BusinessAdvertisementForProductPageDocument, options);
        }
export type BusinessAdvertisementForProductPageQueryHookResult = ReturnType<typeof useBusinessAdvertisementForProductPageQuery>;
export type BusinessAdvertisementForProductPageLazyQueryHookResult = ReturnType<typeof useBusinessAdvertisementForProductPageLazyQuery>;
export type BusinessAdvertisementForProductPageQueryResult = ApolloReactCommon.QueryResult<BusinessAdvertisementForProductPageQuery, BusinessAdvertisementForProductPageQueryVariables>;
export const SaveBusinessAdPriceInDocument = gql`
    mutation saveBusinessAdPriceIn($input: [BusinessFinanceInput]!) {
  saveBusinessAdPriceIn(input: $input)
}
    `;
export type SaveBusinessAdPriceInMutationFn = ApolloReactCommon.MutationFunction<SaveBusinessAdPriceInMutation, SaveBusinessAdPriceInMutationVariables>;

/**
 * __useSaveBusinessAdPriceInMutation__
 *
 * To run a mutation, you first call `useSaveBusinessAdPriceInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveBusinessAdPriceInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveBusinessAdPriceInMutation, { data, loading, error }] = useSaveBusinessAdPriceInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveBusinessAdPriceInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveBusinessAdPriceInMutation, SaveBusinessAdPriceInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SaveBusinessAdPriceInMutation, SaveBusinessAdPriceInMutationVariables>(SaveBusinessAdPriceInDocument, options);
      }
export type SaveBusinessAdPriceInMutationHookResult = ReturnType<typeof useSaveBusinessAdPriceInMutation>;
export type SaveBusinessAdPriceInMutationResult = ApolloReactCommon.MutationResult<SaveBusinessAdPriceInMutation>;
export type SaveBusinessAdPriceInMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveBusinessAdPriceInMutation, SaveBusinessAdPriceInMutationVariables>;
export const BusinessAdvertisementAnalyticsDocument = gql`
    query businessAdvertisementAnalytics($userId: String!, $startDate: String!, $endDate: String!) {
  userAdPositiveTransactionsByUserId(
    userId: $userId
    startDate: $startDate
    endDate: $endDate
  ) {
    hisAmount
    hisCreationDate
  }
  userAdNegativeTransactionsByUserId(
    userId: $userId
    startDate: $startDate
    endDate: $endDate
  ) {
    amount
    creationDate
    count
  }
  userAdBudgetByUserIdByDate(
    userId: $userId
    startDate: $startDate
    endDate: $endDate
  ) {
    budget
    date
  }
}
    `;

/**
 * __useBusinessAdvertisementAnalyticsQuery__
 *
 * To run a query within a React component, call `useBusinessAdvertisementAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBusinessAdvertisementAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBusinessAdvertisementAnalyticsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useBusinessAdvertisementAnalyticsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BusinessAdvertisementAnalyticsQuery, BusinessAdvertisementAnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BusinessAdvertisementAnalyticsQuery, BusinessAdvertisementAnalyticsQueryVariables>(BusinessAdvertisementAnalyticsDocument, options);
      }
export function useBusinessAdvertisementAnalyticsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BusinessAdvertisementAnalyticsQuery, BusinessAdvertisementAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BusinessAdvertisementAnalyticsQuery, BusinessAdvertisementAnalyticsQueryVariables>(BusinessAdvertisementAnalyticsDocument, options);
        }
export type BusinessAdvertisementAnalyticsQueryHookResult = ReturnType<typeof useBusinessAdvertisementAnalyticsQuery>;
export type BusinessAdvertisementAnalyticsLazyQueryHookResult = ReturnType<typeof useBusinessAdvertisementAnalyticsLazyQuery>;
export type BusinessAdvertisementAnalyticsQueryResult = ApolloReactCommon.QueryResult<BusinessAdvertisementAnalyticsQuery, BusinessAdvertisementAnalyticsQueryVariables>;
export const ClaimListingDocument = gql`
    query claimListing($name: String!, $phone: String!, $time: String!, $url: String!) {
  claimYourListing(phoneNumber: $phone, name: $name, timeToCall: $time, url: $url)
}
    `;

/**
 * __useClaimListingQuery__
 *
 * To run a query within a React component, call `useClaimListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useClaimListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClaimListingQuery({
 *   variables: {
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *      time: // value for 'time'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useClaimListingQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ClaimListingQuery, ClaimListingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ClaimListingQuery, ClaimListingQueryVariables>(ClaimListingDocument, options);
      }
export function useClaimListingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ClaimListingQuery, ClaimListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ClaimListingQuery, ClaimListingQueryVariables>(ClaimListingDocument, options);
        }
export type ClaimListingQueryHookResult = ReturnType<typeof useClaimListingQuery>;
export type ClaimListingLazyQueryHookResult = ReturnType<typeof useClaimListingLazyQuery>;
export type ClaimListingQueryResult = ApolloReactCommon.QueryResult<ClaimListingQuery, ClaimListingQueryVariables>;
export const ContactUsSendDocument = gql`
    query ContactUsSend($regionID: String!, $province: String!, $city: String!, $emailFrom: String!, $message: String!, $name: String!, $subject: String!) {
  contactUs(
    emailFrom: $emailFrom
    message: $message
    name: $name
    subject: $subject
    RegionID: $regionID
    province: $province
    city: $city
  )
}
    `;

/**
 * __useContactUsSendQuery__
 *
 * To run a query within a React component, call `useContactUsSendQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactUsSendQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactUsSendQuery({
 *   variables: {
 *      regionID: // value for 'regionID'
 *      province: // value for 'province'
 *      city: // value for 'city'
 *      emailFrom: // value for 'emailFrom'
 *      message: // value for 'message'
 *      name: // value for 'name'
 *      subject: // value for 'subject'
 *   },
 * });
 */
export function useContactUsSendQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ContactUsSendQuery, ContactUsSendQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ContactUsSendQuery, ContactUsSendQueryVariables>(ContactUsSendDocument, options);
      }
export function useContactUsSendLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContactUsSendQuery, ContactUsSendQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ContactUsSendQuery, ContactUsSendQueryVariables>(ContactUsSendDocument, options);
        }
export type ContactUsSendQueryHookResult = ReturnType<typeof useContactUsSendQuery>;
export type ContactUsSendLazyQueryHookResult = ReturnType<typeof useContactUsSendLazyQuery>;
export type ContactUsSendQueryResult = ApolloReactCommon.QueryResult<ContactUsSendQuery, ContactUsSendQueryVariables>;
export const DealListByTypeByRegDocument = gql`
    query dealListByTypeByReg($type: String, $linkProvinceID: Int!, $plRegionID: Int, $offset: Int, $limit: Int) {
  dealListByTypeByReg(
    dlsApplyTo: $type
    linkProvinceID: $linkProvinceID
    plRegionID: $plRegionID
    offset: $offset
    limit: $limit
  ) {
    ...DealItem
  }
}
    ${DealItemFragmentDoc}`;

/**
 * __useDealListByTypeByRegQuery__
 *
 * To run a query within a React component, call `useDealListByTypeByRegQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealListByTypeByRegQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDealListByTypeByRegQuery({
 *   variables: {
 *      type: // value for 'type'
 *      linkProvinceID: // value for 'linkProvinceID'
 *      plRegionID: // value for 'plRegionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useDealListByTypeByRegQuery(baseOptions: ApolloReactHooks.QueryHookOptions<DealListByTypeByRegQuery, DealListByTypeByRegQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<DealListByTypeByRegQuery, DealListByTypeByRegQueryVariables>(DealListByTypeByRegDocument, options);
      }
export function useDealListByTypeByRegLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DealListByTypeByRegQuery, DealListByTypeByRegQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<DealListByTypeByRegQuery, DealListByTypeByRegQueryVariables>(DealListByTypeByRegDocument, options);
        }
export type DealListByTypeByRegQueryHookResult = ReturnType<typeof useDealListByTypeByRegQuery>;
export type DealListByTypeByRegLazyQueryHookResult = ReturnType<typeof useDealListByTypeByRegLazyQuery>;
export type DealListByTypeByRegQueryResult = ApolloReactCommon.QueryResult<DealListByTypeByRegQuery, DealListByTypeByRegQueryVariables>;
export const DealBySlugDocument = gql`
    query dealBySlug($dealSlug: String!, $bizSlug: String!) {
  dealBySlug(dlsSlug: $dealSlug, bizSlug: $bizSlug) {
    dlsApplyTo
    dlsDealsID
    dlsName
    dlsSlug
    mdaLocalFileName
    dlsExpireDate
    dlsExpireDateToronto
    dlsDescription
    dlsInstructions
    dlsCouponCode
    dlsUrl
    business {
      bizBusinessID
      bizClaim
      bizClaimUnblurred
      rvwScoreAvg
      rvwCount
      plType
      bizName
      bizSlug
      mdaLocalFileName
      contact {
        ...ContactItem
      }
    }
  }
}
    ${ContactItemFragmentDoc}`;

/**
 * __useDealBySlugQuery__
 *
 * To run a query within a React component, call `useDealBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useDealBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDealBySlugQuery({
 *   variables: {
 *      dealSlug: // value for 'dealSlug'
 *      bizSlug: // value for 'bizSlug'
 *   },
 * });
 */
export function useDealBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<DealBySlugQuery, DealBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<DealBySlugQuery, DealBySlugQueryVariables>(DealBySlugDocument, options);
      }
export function useDealBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DealBySlugQuery, DealBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<DealBySlugQuery, DealBySlugQueryVariables>(DealBySlugDocument, options);
        }
export type DealBySlugQueryHookResult = ReturnType<typeof useDealBySlugQuery>;
export type DealBySlugLazyQueryHookResult = ReturnType<typeof useDealBySlugLazyQuery>;
export type DealBySlugQueryResult = ApolloReactCommon.QueryResult<DealBySlugQuery, DealBySlugQueryVariables>;
export const SendFeedbackDocument = gql`
    query sendFeedback($message: String!, $questions: [[String]], $email: String) {
  sendFeedback(message: $message, questions: $questions, email: $email)
}
    `;

/**
 * __useSendFeedbackQuery__
 *
 * To run a query within a React component, call `useSendFeedbackQuery` and pass it any options that fit your needs.
 * When your component renders, `useSendFeedbackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSendFeedbackQuery({
 *   variables: {
 *      message: // value for 'message'
 *      questions: // value for 'questions'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendFeedbackQuery(baseOptions: ApolloReactHooks.QueryHookOptions<SendFeedbackQuery, SendFeedbackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SendFeedbackQuery, SendFeedbackQueryVariables>(SendFeedbackDocument, options);
      }
export function useSendFeedbackLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SendFeedbackQuery, SendFeedbackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SendFeedbackQuery, SendFeedbackQueryVariables>(SendFeedbackDocument, options);
        }
export type SendFeedbackQueryHookResult = ReturnType<typeof useSendFeedbackQuery>;
export type SendFeedbackLazyQueryHookResult = ReturnType<typeof useSendFeedbackLazyQuery>;
export type SendFeedbackQueryResult = ApolloReactCommon.QueryResult<SendFeedbackQuery, SendFeedbackQueryVariables>;
export const LocationListRegionDocument = gql`
    query locationListRegion($offset: Int, $limit: Int, $plCountryID: Int, $sortPopular: Boolean) {
  locationListRegion(
    offset: $offset
    limit: $limit
    plCountryID: $plCountryID
    sortPopular: $sortPopular
  ) {
    ...LocationItem
  }
}
    ${LocationItemFragmentDoc}`;

/**
 * __useLocationListRegionQuery__
 *
 * To run a query within a React component, call `useLocationListRegionQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationListRegionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationListRegionQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      plCountryID: // value for 'plCountryID'
 *      sortPopular: // value for 'sortPopular'
 *   },
 * });
 */
export function useLocationListRegionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LocationListRegionQuery, LocationListRegionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LocationListRegionQuery, LocationListRegionQueryVariables>(LocationListRegionDocument, options);
      }
export function useLocationListRegionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LocationListRegionQuery, LocationListRegionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LocationListRegionQuery, LocationListRegionQueryVariables>(LocationListRegionDocument, options);
        }
export type LocationListRegionQueryHookResult = ReturnType<typeof useLocationListRegionQuery>;
export type LocationListRegionLazyQueryHookResult = ReturnType<typeof useLocationListRegionLazyQuery>;
export type LocationListRegionQueryResult = ApolloReactCommon.QueryResult<LocationListRegionQuery, LocationListRegionQueryVariables>;
export const LocationAllListProvinceDocument = gql`
    query locationAllListProvince {
  locationListProvince(offset: 0, limit: 9999) {
    ...ProvinceItem
  }
}
    ${ProvinceItemFragmentDoc}`;

/**
 * __useLocationAllListProvinceQuery__
 *
 * To run a query within a React component, call `useLocationAllListProvinceQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationAllListProvinceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationAllListProvinceQuery({
 *   variables: {
 *   },
 * });
 */
export function useLocationAllListProvinceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LocationAllListProvinceQuery, LocationAllListProvinceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LocationAllListProvinceQuery, LocationAllListProvinceQueryVariables>(LocationAllListProvinceDocument, options);
      }
export function useLocationAllListProvinceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LocationAllListProvinceQuery, LocationAllListProvinceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LocationAllListProvinceQuery, LocationAllListProvinceQueryVariables>(LocationAllListProvinceDocument, options);
        }
export type LocationAllListProvinceQueryHookResult = ReturnType<typeof useLocationAllListProvinceQuery>;
export type LocationAllListProvinceLazyQueryHookResult = ReturnType<typeof useLocationAllListProvinceLazyQuery>;
export type LocationAllListProvinceQueryResult = ApolloReactCommon.QueryResult<LocationAllListProvinceQuery, LocationAllListProvinceQueryVariables>;
export const LocationAllListProvinceForUserDocument = gql`
    query locationAllListProvinceForUser {
  locationListProvinceForUser {
    ...ProvinceItem
  }
}
    ${ProvinceItemFragmentDoc}`;

/**
 * __useLocationAllListProvinceForUserQuery__
 *
 * To run a query within a React component, call `useLocationAllListProvinceForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationAllListProvinceForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationAllListProvinceForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useLocationAllListProvinceForUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LocationAllListProvinceForUserQuery, LocationAllListProvinceForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LocationAllListProvinceForUserQuery, LocationAllListProvinceForUserQueryVariables>(LocationAllListProvinceForUserDocument, options);
      }
export function useLocationAllListProvinceForUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LocationAllListProvinceForUserQuery, LocationAllListProvinceForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LocationAllListProvinceForUserQuery, LocationAllListProvinceForUserQueryVariables>(LocationAllListProvinceForUserDocument, options);
        }
export type LocationAllListProvinceForUserQueryHookResult = ReturnType<typeof useLocationAllListProvinceForUserQuery>;
export type LocationAllListProvinceForUserLazyQueryHookResult = ReturnType<typeof useLocationAllListProvinceForUserLazyQuery>;
export type LocationAllListProvinceForUserQueryResult = ApolloReactCommon.QueryResult<LocationAllListProvinceForUserQuery, LocationAllListProvinceForUserQueryVariables>;
export const LocationListRegionByProvinceDocument = gql`
    query locationListRegionByProvince($provinceId: Int!) {
  locationListRegionByProvince(provinceId: $provinceId, offset: 0, limit: 9999) {
    ...LocationItem
  }
}
    ${LocationItemFragmentDoc}`;

/**
 * __useLocationListRegionByProvinceQuery__
 *
 * To run a query within a React component, call `useLocationListRegionByProvinceQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationListRegionByProvinceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationListRegionByProvinceQuery({
 *   variables: {
 *      provinceId: // value for 'provinceId'
 *   },
 * });
 */
export function useLocationListRegionByProvinceQuery(baseOptions: ApolloReactHooks.QueryHookOptions<LocationListRegionByProvinceQuery, LocationListRegionByProvinceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LocationListRegionByProvinceQuery, LocationListRegionByProvinceQueryVariables>(LocationListRegionByProvinceDocument, options);
      }
export function useLocationListRegionByProvinceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LocationListRegionByProvinceQuery, LocationListRegionByProvinceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LocationListRegionByProvinceQuery, LocationListRegionByProvinceQueryVariables>(LocationListRegionByProvinceDocument, options);
        }
export type LocationListRegionByProvinceQueryHookResult = ReturnType<typeof useLocationListRegionByProvinceQuery>;
export type LocationListRegionByProvinceLazyQueryHookResult = ReturnType<typeof useLocationListRegionByProvinceLazyQuery>;
export type LocationListRegionByProvinceQueryResult = ApolloReactCommon.QueryResult<LocationListRegionByProvinceQuery, LocationListRegionByProvinceQueryVariables>;
export const LocationListRegionByProvinceForUserDocument = gql`
    query locationListRegionByProvinceForUser($provinceId: Int!) {
  locationListRegionByProvinceForUser(provinceId: $provinceId) {
    ...LocationItem
  }
}
    ${LocationItemFragmentDoc}`;

/**
 * __useLocationListRegionByProvinceForUserQuery__
 *
 * To run a query within a React component, call `useLocationListRegionByProvinceForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationListRegionByProvinceForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationListRegionByProvinceForUserQuery({
 *   variables: {
 *      provinceId: // value for 'provinceId'
 *   },
 * });
 */
export function useLocationListRegionByProvinceForUserQuery(baseOptions: ApolloReactHooks.QueryHookOptions<LocationListRegionByProvinceForUserQuery, LocationListRegionByProvinceForUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LocationListRegionByProvinceForUserQuery, LocationListRegionByProvinceForUserQueryVariables>(LocationListRegionByProvinceForUserDocument, options);
      }
export function useLocationListRegionByProvinceForUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LocationListRegionByProvinceForUserQuery, LocationListRegionByProvinceForUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LocationListRegionByProvinceForUserQuery, LocationListRegionByProvinceForUserQueryVariables>(LocationListRegionByProvinceForUserDocument, options);
        }
export type LocationListRegionByProvinceForUserQueryHookResult = ReturnType<typeof useLocationListRegionByProvinceForUserQuery>;
export type LocationListRegionByProvinceForUserLazyQueryHookResult = ReturnType<typeof useLocationListRegionByProvinceForUserLazyQuery>;
export type LocationListRegionByProvinceForUserQueryResult = ApolloReactCommon.QueryResult<LocationListRegionByProvinceForUserQuery, LocationListRegionByProvinceForUserQueryVariables>;
export const LocationSearchRegionDocument = gql`
    query locationSearchRegion($search: String!) {
  locationSearchRegion(slug: $search) {
    ...LocationItem
  }
}
    ${LocationItemFragmentDoc}`;

/**
 * __useLocationSearchRegionQuery__
 *
 * To run a query within a React component, call `useLocationSearchRegionQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationSearchRegionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationSearchRegionQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useLocationSearchRegionQuery(baseOptions: ApolloReactHooks.QueryHookOptions<LocationSearchRegionQuery, LocationSearchRegionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LocationSearchRegionQuery, LocationSearchRegionQueryVariables>(LocationSearchRegionDocument, options);
      }
export function useLocationSearchRegionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LocationSearchRegionQuery, LocationSearchRegionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LocationSearchRegionQuery, LocationSearchRegionQueryVariables>(LocationSearchRegionDocument, options);
        }
export type LocationSearchRegionQueryHookResult = ReturnType<typeof useLocationSearchRegionQuery>;
export type LocationSearchRegionLazyQueryHookResult = ReturnType<typeof useLocationSearchRegionLazyQuery>;
export type LocationSearchRegionQueryResult = ApolloReactCommon.QueryResult<LocationSearchRegionQuery, LocationSearchRegionQueryVariables>;
export const LocationGetNearestRegionIdDocument = gql`
    query locationGetNearestRegionId($plCountryID: Int) {
  locationListRegion(offset: 0, limit: 999, plCountryID: $plCountryID) {
    ...LocationItem
  }
  userRegionId
}
    ${LocationItemFragmentDoc}`;

/**
 * __useLocationGetNearestRegionIdQuery__
 *
 * To run a query within a React component, call `useLocationGetNearestRegionIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationGetNearestRegionIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationGetNearestRegionIdQuery({
 *   variables: {
 *      plCountryID: // value for 'plCountryID'
 *   },
 * });
 */
export function useLocationGetNearestRegionIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LocationGetNearestRegionIdQuery, LocationGetNearestRegionIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LocationGetNearestRegionIdQuery, LocationGetNearestRegionIdQueryVariables>(LocationGetNearestRegionIdDocument, options);
      }
export function useLocationGetNearestRegionIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LocationGetNearestRegionIdQuery, LocationGetNearestRegionIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LocationGetNearestRegionIdQuery, LocationGetNearestRegionIdQueryVariables>(LocationGetNearestRegionIdDocument, options);
        }
export type LocationGetNearestRegionIdQueryHookResult = ReturnType<typeof useLocationGetNearestRegionIdQuery>;
export type LocationGetNearestRegionIdLazyQueryHookResult = ReturnType<typeof useLocationGetNearestRegionIdLazyQuery>;
export type LocationGetNearestRegionIdQueryResult = ApolloReactCommon.QueryResult<LocationGetNearestRegionIdQuery, LocationGetNearestRegionIdQueryVariables>;
export const UserRegionDocument = gql`
    query userRegion($clientIp: String) {
  userRegion(clientIp: $clientIp) {
    ...LocationItem
  }
}
    ${LocationItemFragmentDoc}`;

/**
 * __useUserRegionQuery__
 *
 * To run a query within a React component, call `useUserRegionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRegionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRegionQuery({
 *   variables: {
 *      clientIp: // value for 'clientIp'
 *   },
 * });
 */
export function useUserRegionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserRegionQuery, UserRegionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserRegionQuery, UserRegionQueryVariables>(UserRegionDocument, options);
      }
export function useUserRegionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserRegionQuery, UserRegionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserRegionQuery, UserRegionQueryVariables>(UserRegionDocument, options);
        }
export type UserRegionQueryHookResult = ReturnType<typeof useUserRegionQuery>;
export type UserRegionLazyQueryHookResult = ReturnType<typeof useUserRegionLazyQuery>;
export type UserRegionQueryResult = ApolloReactCommon.QueryResult<UserRegionQuery, UserRegionQueryVariables>;
export const LocationFooterPositionDocument = gql`
    query locationFooterPosition {
  locationFooterPosition {
    ...LocationItem
  }
}
    ${LocationItemFragmentDoc}`;

/**
 * __useLocationFooterPositionQuery__
 *
 * To run a query within a React component, call `useLocationFooterPositionQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationFooterPositionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationFooterPositionQuery({
 *   variables: {
 *   },
 * });
 */
export function useLocationFooterPositionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LocationFooterPositionQuery, LocationFooterPositionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LocationFooterPositionQuery, LocationFooterPositionQueryVariables>(LocationFooterPositionDocument, options);
      }
export function useLocationFooterPositionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LocationFooterPositionQuery, LocationFooterPositionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LocationFooterPositionQuery, LocationFooterPositionQueryVariables>(LocationFooterPositionDocument, options);
        }
export type LocationFooterPositionQueryHookResult = ReturnType<typeof useLocationFooterPositionQuery>;
export type LocationFooterPositionLazyQueryHookResult = ReturnType<typeof useLocationFooterPositionLazyQuery>;
export type LocationFooterPositionQueryResult = ApolloReactCommon.QueryResult<LocationFooterPositionQuery, LocationFooterPositionQueryVariables>;
export const SubscribeMailDocument = gql`
    query SubscribeMail($email: String!, $name: String!, $userRegionID: String, $mailPreferences: String) {
  userSubscription(
    email: $email
    name: $name
    usrRegionID: $userRegionID
    mailPreferences: $mailPreferences
  )
}
    `;

/**
 * __useSubscribeMailQuery__
 *
 * To run a query within a React component, call `useSubscribeMailQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeMailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeMailQuery({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      userRegionID: // value for 'userRegionID'
 *      mailPreferences: // value for 'mailPreferences'
 *   },
 * });
 */
export function useSubscribeMailQuery(baseOptions: ApolloReactHooks.QueryHookOptions<SubscribeMailQuery, SubscribeMailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SubscribeMailQuery, SubscribeMailQueryVariables>(SubscribeMailDocument, options);
      }
export function useSubscribeMailLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SubscribeMailQuery, SubscribeMailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SubscribeMailQuery, SubscribeMailQueryVariables>(SubscribeMailDocument, options);
        }
export type SubscribeMailQueryHookResult = ReturnType<typeof useSubscribeMailQuery>;
export type SubscribeMailLazyQueryHookResult = ReturnType<typeof useSubscribeMailLazyQuery>;
export type SubscribeMailQueryResult = ApolloReactCommon.QueryResult<SubscribeMailQuery, SubscribeMailQueryVariables>;
export const MapDealsQueryDocument = gql`
    query MapDealsQuery($plRegionID: Int!, $limit: Int, $offset: Int!) {
  dealListByRegRandom(plRegionID: $plRegionID, limit: $limit, offset: $offset) {
    ...DealItem
  }
}
    ${DealItemFragmentDoc}`;

/**
 * __useMapDealsQueryQuery__
 *
 * To run a query within a React component, call `useMapDealsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMapDealsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMapDealsQueryQuery({
 *   variables: {
 *      plRegionID: // value for 'plRegionID'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useMapDealsQueryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<MapDealsQueryQuery, MapDealsQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MapDealsQueryQuery, MapDealsQueryQueryVariables>(MapDealsQueryDocument, options);
      }
export function useMapDealsQueryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MapDealsQueryQuery, MapDealsQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MapDealsQueryQuery, MapDealsQueryQueryVariables>(MapDealsQueryDocument, options);
        }
export type MapDealsQueryQueryHookResult = ReturnType<typeof useMapDealsQueryQuery>;
export type MapDealsQueryLazyQueryHookResult = ReturnType<typeof useMapDealsQueryLazyQuery>;
export type MapDealsQueryQueryResult = ApolloReactCommon.QueryResult<MapDealsQueryQuery, MapDealsQueryQueryVariables>;
export const MapBusinessQueryDocument = gql`
    query MapBusinessQuery($lat1: Float!, $lng1: Float!, $lat2: Float!, $lng2: Float!, $sort: String, $plSlugType: String, $plRegionID: Int) {
  businessByCoordinates(
    firstLatitude: $lat1
    firstLongitude: $lng1
    secondLatitude: $lat2
    secondLongitude: $lng2
    sort: $sort
    plSlugType: $plSlugType
    plRegionID: $plRegionID
  ) {
    ...BusinessItem
    bizIsFeatured
    bizIsVerified
    bizHasMapPin
    bizFeaturedPosition
    contact {
      bizLatitude
      bizLongitude
      provinceInitial
      regionSlug
      regionName
    }
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useMapBusinessQueryQuery__
 *
 * To run a query within a React component, call `useMapBusinessQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMapBusinessQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMapBusinessQueryQuery({
 *   variables: {
 *      lat1: // value for 'lat1'
 *      lng1: // value for 'lng1'
 *      lat2: // value for 'lat2'
 *      lng2: // value for 'lng2'
 *      sort: // value for 'sort'
 *      plSlugType: // value for 'plSlugType'
 *      plRegionID: // value for 'plRegionID'
 *   },
 * });
 */
export function useMapBusinessQueryQuery(baseOptions: ApolloReactHooks.QueryHookOptions<MapBusinessQueryQuery, MapBusinessQueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MapBusinessQueryQuery, MapBusinessQueryQueryVariables>(MapBusinessQueryDocument, options);
      }
export function useMapBusinessQueryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MapBusinessQueryQuery, MapBusinessQueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MapBusinessQueryQuery, MapBusinessQueryQueryVariables>(MapBusinessQueryDocument, options);
        }
export type MapBusinessQueryQueryHookResult = ReturnType<typeof useMapBusinessQueryQuery>;
export type MapBusinessQueryLazyQueryHookResult = ReturnType<typeof useMapBusinessQueryLazyQuery>;
export type MapBusinessQueryQueryResult = ApolloReactCommon.QueryResult<MapBusinessQueryQuery, MapBusinessQueryQueryVariables>;
export const MetaTagsRegionDocument = gql`
    query MetaTagsRegion($plRegionID: Int!, $categoryType: String!) {
  metaTagByRegionIDByType(plRegionID: $plRegionID, categoryType: $categoryType) {
    id
    categoryType
    plRegionID
    plMetaTitle
    plMetaDescription
    plCustomH1
    plDescription1
    plDescription2
  }
}
    `;

/**
 * __useMetaTagsRegionQuery__
 *
 * To run a query within a React component, call `useMetaTagsRegionQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetaTagsRegionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetaTagsRegionQuery({
 *   variables: {
 *      plRegionID: // value for 'plRegionID'
 *      categoryType: // value for 'categoryType'
 *   },
 * });
 */
export function useMetaTagsRegionQuery(baseOptions: ApolloReactHooks.QueryHookOptions<MetaTagsRegionQuery, MetaTagsRegionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MetaTagsRegionQuery, MetaTagsRegionQueryVariables>(MetaTagsRegionDocument, options);
      }
export function useMetaTagsRegionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MetaTagsRegionQuery, MetaTagsRegionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MetaTagsRegionQuery, MetaTagsRegionQueryVariables>(MetaTagsRegionDocument, options);
        }
export type MetaTagsRegionQueryHookResult = ReturnType<typeof useMetaTagsRegionQuery>;
export type MetaTagsRegionLazyQueryHookResult = ReturnType<typeof useMetaTagsRegionLazyQuery>;
export type MetaTagsRegionQueryResult = ApolloReactCommon.QueryResult<MetaTagsRegionQuery, MetaTagsRegionQueryVariables>;
export const MetaTagsProvinceDocument = gql`
    query MetaTagsProvince($plProvinceID: Int!, $categoryType: String!) {
  metaTagByProvinceIDByType(
    plProvinceID: $plProvinceID
    categoryType: $categoryType
  ) {
    id
    categoryType
    plProvinceID
    plMetaTitle
    plMetaDescription
    plCustomH1
    plDescription1
    plDescription2
  }
}
    `;

/**
 * __useMetaTagsProvinceQuery__
 *
 * To run a query within a React component, call `useMetaTagsProvinceQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetaTagsProvinceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetaTagsProvinceQuery({
 *   variables: {
 *      plProvinceID: // value for 'plProvinceID'
 *      categoryType: // value for 'categoryType'
 *   },
 * });
 */
export function useMetaTagsProvinceQuery(baseOptions: ApolloReactHooks.QueryHookOptions<MetaTagsProvinceQuery, MetaTagsProvinceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MetaTagsProvinceQuery, MetaTagsProvinceQueryVariables>(MetaTagsProvinceDocument, options);
      }
export function useMetaTagsProvinceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MetaTagsProvinceQuery, MetaTagsProvinceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MetaTagsProvinceQuery, MetaTagsProvinceQueryVariables>(MetaTagsProvinceDocument, options);
        }
export type MetaTagsProvinceQueryHookResult = ReturnType<typeof useMetaTagsProvinceQuery>;
export type MetaTagsProvinceLazyQueryHookResult = ReturnType<typeof useMetaTagsProvinceLazyQuery>;
export type MetaTagsProvinceQueryResult = ApolloReactCommon.QueryResult<MetaTagsProvinceQuery, MetaTagsProvinceQueryVariables>;
export const MetaTagsProductCategoryDocument = gql`
    query MetaTagsProductCategory {
  metaTagProductTypes {
    id
    title
    description
    content
    product_type_id
    product_type {
      id
      name
      slug
      typeParent
      typeParentName
    }
  }
}
    `;

/**
 * __useMetaTagsProductCategoryQuery__
 *
 * To run a query within a React component, call `useMetaTagsProductCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetaTagsProductCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetaTagsProductCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useMetaTagsProductCategoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MetaTagsProductCategoryQuery, MetaTagsProductCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MetaTagsProductCategoryQuery, MetaTagsProductCategoryQueryVariables>(MetaTagsProductCategoryDocument, options);
      }
export function useMetaTagsProductCategoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MetaTagsProductCategoryQuery, MetaTagsProductCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MetaTagsProductCategoryQuery, MetaTagsProductCategoryQueryVariables>(MetaTagsProductCategoryDocument, options);
        }
export type MetaTagsProductCategoryQueryHookResult = ReturnType<typeof useMetaTagsProductCategoryQuery>;
export type MetaTagsProductCategoryLazyQueryHookResult = ReturnType<typeof useMetaTagsProductCategoryLazyQuery>;
export type MetaTagsProductCategoryQueryResult = ApolloReactCommon.QueryResult<MetaTagsProductCategoryQuery, MetaTagsProductCategoryQueryVariables>;
export const HomePageDataStatusDocument = gql`
    query homePageDataStatus($provinceID: Int!, $regionID: Int!, $offset: Int, $limit: Int) {
  businessAllByLocation(
    linkProvinceID: $provinceID
    plRegionID: $regionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useHomePageDataStatusQuery__
 *
 * To run a query within a React component, call `useHomePageDataStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePageDataStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePageDataStatusQuery({
 *   variables: {
 *      provinceID: // value for 'provinceID'
 *      regionID: // value for 'regionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useHomePageDataStatusQuery(baseOptions: ApolloReactHooks.QueryHookOptions<HomePageDataStatusQuery, HomePageDataStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<HomePageDataStatusQuery, HomePageDataStatusQueryVariables>(HomePageDataStatusDocument, options);
      }
export function useHomePageDataStatusLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HomePageDataStatusQuery, HomePageDataStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<HomePageDataStatusQuery, HomePageDataStatusQueryVariables>(HomePageDataStatusDocument, options);
        }
export type HomePageDataStatusQueryHookResult = ReturnType<typeof useHomePageDataStatusQuery>;
export type HomePageDataStatusLazyQueryHookResult = ReturnType<typeof useHomePageDataStatusLazyQuery>;
export type HomePageDataStatusQueryResult = ApolloReactCommon.QueryResult<HomePageDataStatusQuery, HomePageDataStatusQueryVariables>;
export const HomePageDataDocument = gql`
    query homePageData($provinceID: Int!, $regionID: Int!, $offset: Int, $limit: Int, $featuredOffset: Int, $featuredLimit: Int) {
  businessMonthlyTopPicks(plRegionID: $regionID, offset: $offset, limit: $limit) {
    ...BusinessItem
  }
  businessFeaturedBrands(linkProvinceID: $provinceID, offset: 0, limit: 999) {
    ...BusinessItem
  }
  businessFeaturedDeliveries(
    linkProvinceID: $provinceID
    plRegionID: $regionID
    offset: $featuredOffset
    limit: $featuredLimit
  ) {
    ...BusinessItem
  }
  businessFeaturedDispensary(
    linkProvinceID: $provinceID
    plRegionID: $regionID
    offset: $featuredOffset
    limit: $featuredLimit
  ) {
    ...BusinessItem
  }
  businessFeaturedMail(linkProvinceID: $provinceID, offset: 0, limit: 999) {
    ...BusinessItem
  }
  businessAllVerified(
    linkProvinceID: $provinceID
    plRegionID: $regionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
  businessAllByLocation(
    linkProvinceID: $provinceID
    plRegionID: $regionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
  blogListByType(offset: 0, limit: 3) {
    ...BlogItem
  }
}
    ${BusinessItemFragmentDoc}
${BlogItemFragmentDoc}`;

/**
 * __useHomePageDataQuery__
 *
 * To run a query within a React component, call `useHomePageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePageDataQuery({
 *   variables: {
 *      provinceID: // value for 'provinceID'
 *      regionID: // value for 'regionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      featuredOffset: // value for 'featuredOffset'
 *      featuredLimit: // value for 'featuredLimit'
 *   },
 * });
 */
export function useHomePageDataQuery(baseOptions: ApolloReactHooks.QueryHookOptions<HomePageDataQuery, HomePageDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<HomePageDataQuery, HomePageDataQueryVariables>(HomePageDataDocument, options);
      }
export function useHomePageDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HomePageDataQuery, HomePageDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<HomePageDataQuery, HomePageDataQueryVariables>(HomePageDataDocument, options);
        }
export type HomePageDataQueryHookResult = ReturnType<typeof useHomePageDataQuery>;
export type HomePageDataLazyQueryHookResult = ReturnType<typeof useHomePageDataLazyQuery>;
export type HomePageDataQueryResult = ApolloReactCommon.QueryResult<HomePageDataQuery, HomePageDataQueryVariables>;
export const VerifiedPageDataDocument = gql`
    query verifiedPageData($provinceId: Int!, $regionID: Int, $offset: Int, $limit: Int) {
  businessVerifiedBrands(
    linkProvinceID: $provinceId
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
  businessVerifiedDeliveries(
    linkProvinceID: $provinceId
    plRegionID: $regionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
  businessVerifiedDispensary(
    linkProvinceID: $provinceId
    plRegionID: $regionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
  businessVerifiedMail(
    linkProvinceID: $provinceId
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useVerifiedPageDataQuery__
 *
 * To run a query within a React component, call `useVerifiedPageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifiedPageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifiedPageDataQuery({
 *   variables: {
 *      provinceId: // value for 'provinceId'
 *      regionID: // value for 'regionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useVerifiedPageDataQuery(baseOptions: ApolloReactHooks.QueryHookOptions<VerifiedPageDataQuery, VerifiedPageDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<VerifiedPageDataQuery, VerifiedPageDataQueryVariables>(VerifiedPageDataDocument, options);
      }
export function useVerifiedPageDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VerifiedPageDataQuery, VerifiedPageDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<VerifiedPageDataQuery, VerifiedPageDataQueryVariables>(VerifiedPageDataDocument, options);
        }
export type VerifiedPageDataQueryHookResult = ReturnType<typeof useVerifiedPageDataQuery>;
export type VerifiedPageDataLazyQueryHookResult = ReturnType<typeof useVerifiedPageDataLazyQuery>;
export type VerifiedPageDataQueryResult = ApolloReactCommon.QueryResult<VerifiedPageDataQuery, VerifiedPageDataQueryVariables>;
export const FeaturedPageDataDocument = gql`
    query featuredPageData($provinceId: Int!, $regionID: Int, $offset: Int, $limit: Int) {
  businessFeaturedBrands(
    linkProvinceID: $provinceId
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
  businessFeaturedDeliveries(
    linkProvinceID: $provinceId
    plRegionID: $regionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
  businessFeaturedDispensary(
    linkProvinceID: $provinceId
    plRegionID: $regionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
  businessFeaturedMail(
    linkProvinceID: $provinceId
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useFeaturedPageDataQuery__
 *
 * To run a query within a React component, call `useFeaturedPageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturedPageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturedPageDataQuery({
 *   variables: {
 *      provinceId: // value for 'provinceId'
 *      regionID: // value for 'regionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFeaturedPageDataQuery(baseOptions: ApolloReactHooks.QueryHookOptions<FeaturedPageDataQuery, FeaturedPageDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FeaturedPageDataQuery, FeaturedPageDataQueryVariables>(FeaturedPageDataDocument, options);
      }
export function useFeaturedPageDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeaturedPageDataQuery, FeaturedPageDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FeaturedPageDataQuery, FeaturedPageDataQueryVariables>(FeaturedPageDataDocument, options);
        }
export type FeaturedPageDataQueryHookResult = ReturnType<typeof useFeaturedPageDataQuery>;
export type FeaturedPageDataLazyQueryHookResult = ReturnType<typeof useFeaturedPageDataLazyQuery>;
export type FeaturedPageDataQueryResult = ApolloReactCommon.QueryResult<FeaturedPageDataQuery, FeaturedPageDataQueryVariables>;
export const AllPageDataDocument = gql`
    query allPageData($provinceId: Int!, $regionID: Int, $offset: Int, $limit: Int) {
  businessAllBrands(linkProvinceID: $provinceId, offset: $offset, limit: $limit) {
    ...BusinessItem
  }
  businessAllDeliveries(
    linkProvinceID: $provinceId
    plRegionID: $regionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
  businessAllDispensary(
    linkProvinceID: $provinceId
    plRegionID: $regionID
    offset: $offset
    limit: $limit
  ) {
    ...BusinessItem
  }
  businessAllMail(linkProvinceID: $provinceId, offset: $offset, limit: $limit) {
    ...BusinessItem
  }
}
    ${BusinessItemFragmentDoc}`;

/**
 * __useAllPageDataQuery__
 *
 * To run a query within a React component, call `useAllPageDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPageDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPageDataQuery({
 *   variables: {
 *      provinceId: // value for 'provinceId'
 *      regionID: // value for 'regionID'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAllPageDataQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AllPageDataQuery, AllPageDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AllPageDataQuery, AllPageDataQueryVariables>(AllPageDataDocument, options);
      }
export function useAllPageDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllPageDataQuery, AllPageDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AllPageDataQuery, AllPageDataQueryVariables>(AllPageDataDocument, options);
        }
export type AllPageDataQueryHookResult = ReturnType<typeof useAllPageDataQuery>;
export type AllPageDataLazyQueryHookResult = ReturnType<typeof useAllPageDataLazyQuery>;
export type AllPageDataQueryResult = ApolloReactCommon.QueryResult<AllPageDataQuery, AllPageDataQueryVariables>;
export const ProductBySlugDocument = gql`
    query productBySlug($bizSlug: String!, $plSlugType: String!, $prdSlug: String!, $regionSlug: String, $prdGenetics: [String], $prdProductType: [String], $prdProductCategories: [String], $search: String, $productOffset: Int, $productLimit: Int, $sort: [String], $latitudeFront: Float, $longitudeFront: Float, $regionID: Int) {
  productBySlug(
    bizSlug: $bizSlug
    plSlugType: $plSlugType
    prdSlug: $prdSlug
    regionSlug: $regionSlug
  ) {
    ...ProductItem
    canAddReview
    prdDescription
    prdProductEffects
    prdProductUses
    prdProductTimes
    business(
      offset: 0
      limit: 300
      latitudeFront: $latitudeFront
      longitudeFront: $longitudeFront
      regionID: $regionID
    ) {
      ...BusinessItem
      contact {
        bizLatitude
        bizLongitude
        linkContactMethod
        provinceInitial
        regionSlug
        regionName
      }
    }
    reviews(offset: 0, limit: 12) {
      ...ReviewItem
    }
    productReseller {
      ...ProductItem
      business {
        bizBusinessID
      }
    }
    businessProductReseller(
      latitudeFront: $latitudeFront
      longitudeFront: $longitudeFront
      regionID: $regionID
    ) {
      ...BusinessItem
      bizFeaturedPosition
      bizHasMapPin
      contact {
        bizLatitude
        bizLongitude
        linkContactMethod
        provinceInitial
        regionSlug
        regionName
      }
    }
  }
  businessBySlug(
    bizSlug: $bizSlug
    plSlugType: $plSlugType
    regionSlug: $regionSlug
  ) {
    bizBusinessID
    bizClaim
    bizClaimUnblurred
    productType {
      ...ProductTypeItem
    }
    productAvailable
    productCount(
      prdGenetics: $prdGenetics
      prdProductType: $prdProductType
      prdProductCategories: $prdProductCategories
      search: $search
    )
    rvwScoreAvg
    rvwCount
    plType
    bizName
    bizSlug
    bizIsLite
    mdaLocalFileName
    contact {
      ...ContactItem
    }
    bizSortOption
    products(
      offset: $productOffset
      limit: $productLimit
      prdGenetics: $prdGenetics
      prdProductType: $prdProductType
      prdProductCategories: $prdProductCategories
      search: $search
      sort: $sort
    ) {
      ...ProductItem
    }
  }
}
    ${ProductItemFragmentDoc}
${BusinessItemFragmentDoc}
${ReviewItemFragmentDoc}
${ProductTypeItemFragmentDoc}
${ContactItemFragmentDoc}`;

/**
 * __useProductBySlugQuery__
 *
 * To run a query within a React component, call `useProductBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductBySlugQuery({
 *   variables: {
 *      bizSlug: // value for 'bizSlug'
 *      plSlugType: // value for 'plSlugType'
 *      prdSlug: // value for 'prdSlug'
 *      regionSlug: // value for 'regionSlug'
 *      prdGenetics: // value for 'prdGenetics'
 *      prdProductType: // value for 'prdProductType'
 *      prdProductCategories: // value for 'prdProductCategories'
 *      search: // value for 'search'
 *      productOffset: // value for 'productOffset'
 *      productLimit: // value for 'productLimit'
 *      sort: // value for 'sort'
 *      latitudeFront: // value for 'latitudeFront'
 *      longitudeFront: // value for 'longitudeFront'
 *      regionID: // value for 'regionID'
 *   },
 * });
 */
export function useProductBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductBySlugQuery, ProductBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductBySlugQuery, ProductBySlugQueryVariables>(ProductBySlugDocument, options);
      }
export function useProductBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductBySlugQuery, ProductBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductBySlugQuery, ProductBySlugQueryVariables>(ProductBySlugDocument, options);
        }
export type ProductBySlugQueryHookResult = ReturnType<typeof useProductBySlugQuery>;
export type ProductBySlugLazyQueryHookResult = ReturnType<typeof useProductBySlugLazyQuery>;
export type ProductBySlugQueryResult = ApolloReactCommon.QueryResult<ProductBySlugQuery, ProductBySlugQueryVariables>;
export const ProductReviewsBySlugDocument = gql`
    query productReviewsBySlug($bizSlug: String!, $plSlugType: String!, $prdSlug: String!, $regionSlug: String, $limit: Int!) {
  productBySlug(
    bizSlug: $bizSlug
    plSlugType: $plSlugType
    prdSlug: $prdSlug
    regionSlug: $regionSlug
  ) {
    ...ProductItem
    reviews(offset: 0, limit: $limit) {
      ...ReviewItem
    }
  }
  businessBySlug(
    bizSlug: $bizSlug
    plSlugType: $plSlugType
    regionSlug: $regionSlug
  ) {
    bizBusinessID
    rvwScoreAvg
    rvwCount
    productType {
      ...ProductTypeItem
    }
    plType
    bizName
    bizSlug
    bizIsLite
    mdaLocalFileName
    contact {
      ...ContactItem
    }
  }
}
    ${ProductItemFragmentDoc}
${ReviewItemFragmentDoc}
${ProductTypeItemFragmentDoc}
${ContactItemFragmentDoc}`;

/**
 * __useProductReviewsBySlugQuery__
 *
 * To run a query within a React component, call `useProductReviewsBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductReviewsBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductReviewsBySlugQuery({
 *   variables: {
 *      bizSlug: // value for 'bizSlug'
 *      plSlugType: // value for 'plSlugType'
 *      prdSlug: // value for 'prdSlug'
 *      regionSlug: // value for 'regionSlug'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useProductReviewsBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductReviewsBySlugQuery, ProductReviewsBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductReviewsBySlugQuery, ProductReviewsBySlugQueryVariables>(ProductReviewsBySlugDocument, options);
      }
export function useProductReviewsBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductReviewsBySlugQuery, ProductReviewsBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductReviewsBySlugQuery, ProductReviewsBySlugQueryVariables>(ProductReviewsBySlugDocument, options);
        }
export type ProductReviewsBySlugQueryHookResult = ReturnType<typeof useProductReviewsBySlugQuery>;
export type ProductReviewsBySlugLazyQueryHookResult = ReturnType<typeof useProductReviewsBySlugLazyQuery>;
export type ProductReviewsBySlugQueryResult = ApolloReactCommon.QueryResult<ProductReviewsBySlugQuery, ProductReviewsBySlugQueryVariables>;
export const ProductResellersBySlugDocument = gql`
    query productResellersBySlug($bizSlug: String!, $plSlugType: String!, $prdSlug: String!, $regionSlug: String, $latitudeFront: Float, $longitudeFront: Float, $regionID: Int) {
  productBySlug(
    bizSlug: $bizSlug
    plSlugType: $plSlugType
    prdSlug: $prdSlug
    regionSlug: $regionSlug
  ) {
    ...ProductItem
    business(
      offset: 0
      limit: 300
      latitudeFront: $latitudeFront
      longitudeFront: $longitudeFront
      regionID: $regionID
    ) {
      ...BusinessItem
      contact {
        bizLatitude
        bizLongitude
        linkContactMethod
        provinceInitial
        regionSlug
        regionName
      }
    }
    productReseller {
      ...ProductItem
      business {
        bizBusinessID
      }
    }
    businessProductReseller(
      latitudeFront: $latitudeFront
      longitudeFront: $longitudeFront
      regionID: $regionID
    ) {
      ...BusinessItem
      bizFeaturedPosition
      bizHasMapPin
      contact {
        bizLatitude
        bizLongitude
        linkContactMethod
        provinceInitial
        regionSlug
        regionName
      }
    }
  }
  businessBySlug(
    bizSlug: $bizSlug
    plSlugType: $plSlugType
    regionSlug: $regionSlug
  ) {
    bizBusinessID
    rvwScoreAvg
    rvwCount
    productType {
      ...ProductTypeItem
    }
    plType
    bizName
    bizSlug
    bizIsLite
    mdaLocalFileName
    contact {
      ...ContactItem
    }
  }
}
    ${ProductItemFragmentDoc}
${BusinessItemFragmentDoc}
${ProductTypeItemFragmentDoc}
${ContactItemFragmentDoc}`;

/**
 * __useProductResellersBySlugQuery__
 *
 * To run a query within a React component, call `useProductResellersBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductResellersBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductResellersBySlugQuery({
 *   variables: {
 *      bizSlug: // value for 'bizSlug'
 *      plSlugType: // value for 'plSlugType'
 *      prdSlug: // value for 'prdSlug'
 *      regionSlug: // value for 'regionSlug'
 *      latitudeFront: // value for 'latitudeFront'
 *      longitudeFront: // value for 'longitudeFront'
 *      regionID: // value for 'regionID'
 *   },
 * });
 */
export function useProductResellersBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductResellersBySlugQuery, ProductResellersBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductResellersBySlugQuery, ProductResellersBySlugQueryVariables>(ProductResellersBySlugDocument, options);
      }
export function useProductResellersBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductResellersBySlugQuery, ProductResellersBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductResellersBySlugQuery, ProductResellersBySlugQueryVariables>(ProductResellersBySlugDocument, options);
        }
export type ProductResellersBySlugQueryHookResult = ReturnType<typeof useProductResellersBySlugQuery>;
export type ProductResellersBySlugLazyQueryHookResult = ReturnType<typeof useProductResellersBySlugLazyQuery>;
export type ProductResellersBySlugQueryResult = ApolloReactCommon.QueryResult<ProductResellersBySlugQuery, ProductResellersBySlugQueryVariables>;
export const ProductTypeItemsDocument = gql`
    query productTypeItems($brandFilter: Boolean = false, $strainNameFilter: Boolean = false) {
  productListTypes(brandFilter: $brandFilter, strainNameFilter: $strainNameFilter) {
    productTypes {
      ...ProductTypeItem
    }
  }
}
    ${ProductTypeItemFragmentDoc}`;

/**
 * __useProductTypeItemsQuery__
 *
 * To run a query within a React component, call `useProductTypeItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductTypeItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductTypeItemsQuery({
 *   variables: {
 *      brandFilter: // value for 'brandFilter'
 *      strainNameFilter: // value for 'strainNameFilter'
 *   },
 * });
 */
export function useProductTypeItemsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductTypeItemsQuery, ProductTypeItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductTypeItemsQuery, ProductTypeItemsQueryVariables>(ProductTypeItemsDocument, options);
      }
export function useProductTypeItemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductTypeItemsQuery, ProductTypeItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductTypeItemsQuery, ProductTypeItemsQueryVariables>(ProductTypeItemsDocument, options);
        }
export type ProductTypeItemsQueryHookResult = ReturnType<typeof useProductTypeItemsQuery>;
export type ProductTypeItemsLazyQueryHookResult = ReturnType<typeof useProductTypeItemsLazyQuery>;
export type ProductTypeItemsQueryResult = ApolloReactCommon.QueryResult<ProductTypeItemsQuery, ProductTypeItemsQueryVariables>;
export const NearRegionByProductTypeDocument = gql`
    query nearRegionByProductType($plRegionID: Int!, $prdProductType: [String]!, $prdProductCategories: [String]!) {
  nearRegionByProductType(
    plRegionID: $plRegionID
    limit: 5
    offset: 0
    prdProductType: $prdProductType
    prdProductCategories: $prdProductCategories
  ) {
    ...LocationItem
    mdaLocalFileName
  }
}
    ${LocationItemFragmentDoc}`;

/**
 * __useNearRegionByProductTypeQuery__
 *
 * To run a query within a React component, call `useNearRegionByProductTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useNearRegionByProductTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNearRegionByProductTypeQuery({
 *   variables: {
 *      plRegionID: // value for 'plRegionID'
 *      prdProductType: // value for 'prdProductType'
 *      prdProductCategories: // value for 'prdProductCategories'
 *   },
 * });
 */
export function useNearRegionByProductTypeQuery(baseOptions: ApolloReactHooks.QueryHookOptions<NearRegionByProductTypeQuery, NearRegionByProductTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<NearRegionByProductTypeQuery, NearRegionByProductTypeQueryVariables>(NearRegionByProductTypeDocument, options);
      }
export function useNearRegionByProductTypeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NearRegionByProductTypeQuery, NearRegionByProductTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<NearRegionByProductTypeQuery, NearRegionByProductTypeQueryVariables>(NearRegionByProductTypeDocument, options);
        }
export type NearRegionByProductTypeQueryHookResult = ReturnType<typeof useNearRegionByProductTypeQuery>;
export type NearRegionByProductTypeLazyQueryHookResult = ReturnType<typeof useNearRegionByProductTypeLazyQuery>;
export type NearRegionByProductTypeQueryResult = ApolloReactCommon.QueryResult<NearRegionByProductTypeQuery, NearRegionByProductTypeQueryVariables>;
export const StrainNameByRegionByTypeDocument = gql`
    query strainNameByRegionByType($plRegionID: Int!, $prdProductType: [String]!, $prdProductCategories: [String]!, $longitudeGPS: Float, $latitudeGPS: Float) {
  strainNameByRegionByType(
    regionId: $plRegionID
    prdProductType: $prdProductType
    prdProductCategories: $prdProductCategories
    latitudeGPS: $latitudeGPS
    longitudeGPS: $longitudeGPS
  )
}
    `;

/**
 * __useStrainNameByRegionByTypeQuery__
 *
 * To run a query within a React component, call `useStrainNameByRegionByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useStrainNameByRegionByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStrainNameByRegionByTypeQuery({
 *   variables: {
 *      plRegionID: // value for 'plRegionID'
 *      prdProductType: // value for 'prdProductType'
 *      prdProductCategories: // value for 'prdProductCategories'
 *      longitudeGPS: // value for 'longitudeGPS'
 *      latitudeGPS: // value for 'latitudeGPS'
 *   },
 * });
 */
export function useStrainNameByRegionByTypeQuery(baseOptions: ApolloReactHooks.QueryHookOptions<StrainNameByRegionByTypeQuery, StrainNameByRegionByTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<StrainNameByRegionByTypeQuery, StrainNameByRegionByTypeQueryVariables>(StrainNameByRegionByTypeDocument, options);
      }
export function useStrainNameByRegionByTypeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StrainNameByRegionByTypeQuery, StrainNameByRegionByTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<StrainNameByRegionByTypeQuery, StrainNameByRegionByTypeQueryVariables>(StrainNameByRegionByTypeDocument, options);
        }
export type StrainNameByRegionByTypeQueryHookResult = ReturnType<typeof useStrainNameByRegionByTypeQuery>;
export type StrainNameByRegionByTypeLazyQueryHookResult = ReturnType<typeof useStrainNameByRegionByTypeLazyQuery>;
export type StrainNameByRegionByTypeQueryResult = ApolloReactCommon.QueryResult<StrainNameByRegionByTypeQuery, StrainNameByRegionByTypeQueryVariables>;
export const ProductAllByTypeDistance2kmDocument = gql`
    query productAllByTypeDistance2km($plRegionID: Int, $clientIp: String, $latitudeGPS: Float, $longitudeGPS: Float, $bizTypes: [String]!, $search: String, $prdProductType: [String], $prdProductCategories: [String], $sort: [String], $prdProductTypeSlug: [String], $prdProductCategoriesSlug: [String], $offset: Int, $limit: Int) {
  productAllByTypeDistance2km(
    plRegionID: $plRegionID
    clientIp: $clientIp
    latitudeGPS: $latitudeGPS
    longitudeGPS: $longitudeGPS
    bizSlugType: $bizTypes
    prdProductType: $prdProductType
    prdProductCategories: $prdProductCategories
    prdProductTypeSlug: $prdProductTypeSlug
    prdProductCategoriesSlug: $prdProductCategoriesSlug
    sort: $sort
    offset: $offset
    limit: $limit
    name: $search
  ) {
    products {
      ...ProductItem
      business(offset: 0, limit: 1) {
        bizSlug
        plType
        mdaLocalFileName
        contact {
          provinceInitial
          regionSlug
        }
      }
      businessCount
    }
    productStrainName
  }
}
    ${ProductItemFragmentDoc}`;

/**
 * __useProductAllByTypeDistance2kmQuery__
 *
 * To run a query within a React component, call `useProductAllByTypeDistance2kmQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductAllByTypeDistance2kmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductAllByTypeDistance2kmQuery({
 *   variables: {
 *      plRegionID: // value for 'plRegionID'
 *      clientIp: // value for 'clientIp'
 *      latitudeGPS: // value for 'latitudeGPS'
 *      longitudeGPS: // value for 'longitudeGPS'
 *      bizTypes: // value for 'bizTypes'
 *      search: // value for 'search'
 *      prdProductType: // value for 'prdProductType'
 *      prdProductCategories: // value for 'prdProductCategories'
 *      sort: // value for 'sort'
 *      prdProductTypeSlug: // value for 'prdProductTypeSlug'
 *      prdProductCategoriesSlug: // value for 'prdProductCategoriesSlug'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useProductAllByTypeDistance2kmQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductAllByTypeDistance2kmQuery, ProductAllByTypeDistance2kmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductAllByTypeDistance2kmQuery, ProductAllByTypeDistance2kmQueryVariables>(ProductAllByTypeDistance2kmDocument, options);
      }
export function useProductAllByTypeDistance2kmLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductAllByTypeDistance2kmQuery, ProductAllByTypeDistance2kmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductAllByTypeDistance2kmQuery, ProductAllByTypeDistance2kmQueryVariables>(ProductAllByTypeDistance2kmDocument, options);
        }
export type ProductAllByTypeDistance2kmQueryHookResult = ReturnType<typeof useProductAllByTypeDistance2kmQuery>;
export type ProductAllByTypeDistance2kmLazyQueryHookResult = ReturnType<typeof useProductAllByTypeDistance2kmLazyQuery>;
export type ProductAllByTypeDistance2kmQueryResult = ApolloReactCommon.QueryResult<ProductAllByTypeDistance2kmQuery, ProductAllByTypeDistance2kmQueryVariables>;
export const ProductAllByTypeDistance10kmDocument = gql`
    query productAllByTypeDistance10km($plRegionID: Int, $clientIp: String, $latitudeGPS: Float, $longitudeGPS: Float, $bizTypes: [String]!, $search: String, $prdProductType: [String], $prdProductCategories: [String], $sort: [String], $prdProductTypeSlug: [String], $prdProductCategoriesSlug: [String], $offset: Int, $limit: Int) {
  productAllByTypeDistance10km(
    plRegionID: $plRegionID
    clientIp: $clientIp
    latitudeGPS: $latitudeGPS
    longitudeGPS: $longitudeGPS
    bizSlugType: $bizTypes
    prdProductType: $prdProductType
    prdProductCategories: $prdProductCategories
    prdProductTypeSlug: $prdProductTypeSlug
    prdProductCategoriesSlug: $prdProductCategoriesSlug
    sort: $sort
    offset: $offset
    limit: $limit
    name: $search
  ) {
    products {
      ...ProductItem
      business(offset: 0, limit: 1) {
        bizSlug
        plType
        mdaLocalFileName
        contact {
          provinceInitial
          regionSlug
        }
      }
      businessCount
    }
    productStrainName
  }
}
    ${ProductItemFragmentDoc}`;

/**
 * __useProductAllByTypeDistance10kmQuery__
 *
 * To run a query within a React component, call `useProductAllByTypeDistance10kmQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductAllByTypeDistance10kmQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductAllByTypeDistance10kmQuery({
 *   variables: {
 *      plRegionID: // value for 'plRegionID'
 *      clientIp: // value for 'clientIp'
 *      latitudeGPS: // value for 'latitudeGPS'
 *      longitudeGPS: // value for 'longitudeGPS'
 *      bizTypes: // value for 'bizTypes'
 *      search: // value for 'search'
 *      prdProductType: // value for 'prdProductType'
 *      prdProductCategories: // value for 'prdProductCategories'
 *      sort: // value for 'sort'
 *      prdProductTypeSlug: // value for 'prdProductTypeSlug'
 *      prdProductCategoriesSlug: // value for 'prdProductCategoriesSlug'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useProductAllByTypeDistance10kmQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductAllByTypeDistance10kmQuery, ProductAllByTypeDistance10kmQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductAllByTypeDistance10kmQuery, ProductAllByTypeDistance10kmQueryVariables>(ProductAllByTypeDistance10kmDocument, options);
      }
export function useProductAllByTypeDistance10kmLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductAllByTypeDistance10kmQuery, ProductAllByTypeDistance10kmQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductAllByTypeDistance10kmQuery, ProductAllByTypeDistance10kmQueryVariables>(ProductAllByTypeDistance10kmDocument, options);
        }
export type ProductAllByTypeDistance10kmQueryHookResult = ReturnType<typeof useProductAllByTypeDistance10kmQuery>;
export type ProductAllByTypeDistance10kmLazyQueryHookResult = ReturnType<typeof useProductAllByTypeDistance10kmLazyQuery>;
export type ProductAllByTypeDistance10kmQueryResult = ApolloReactCommon.QueryResult<ProductAllByTypeDistance10kmQuery, ProductAllByTypeDistance10kmQueryVariables>;
export const ProductAllByTypeMailOrderDocument = gql`
    query productAllByTypeMailOrder($search: String, $prdProductType: [String], $prdProductCategories: [String], $sort: [String], $prdProductTypeSlug: [String], $prdProductCategoriesSlug: [String], $offset: Int, $limit: Int) {
  productAllByTypeBrandLinkMailOrder(
    prdProductType: $prdProductType
    prdProductCategories: $prdProductCategories
    prdProductTypeSlug: $prdProductTypeSlug
    prdProductCategoriesSlug: $prdProductCategoriesSlug
    sort: $sort
    offset: $offset
    limit: $limit
    name: $search
  ) {
    ...ProductItem
    business(offset: 0, limit: 1) {
      bizSlug
      plType
      mdaLocalFileName
      contact {
        provinceInitial
        regionSlug
      }
    }
  }
}
    ${ProductItemFragmentDoc}`;

/**
 * __useProductAllByTypeMailOrderQuery__
 *
 * To run a query within a React component, call `useProductAllByTypeMailOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductAllByTypeMailOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductAllByTypeMailOrderQuery({
 *   variables: {
 *      search: // value for 'search'
 *      prdProductType: // value for 'prdProductType'
 *      prdProductCategories: // value for 'prdProductCategories'
 *      sort: // value for 'sort'
 *      prdProductTypeSlug: // value for 'prdProductTypeSlug'
 *      prdProductCategoriesSlug: // value for 'prdProductCategoriesSlug'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useProductAllByTypeMailOrderQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductAllByTypeMailOrderQuery, ProductAllByTypeMailOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductAllByTypeMailOrderQuery, ProductAllByTypeMailOrderQueryVariables>(ProductAllByTypeMailOrderDocument, options);
      }
export function useProductAllByTypeMailOrderLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductAllByTypeMailOrderQuery, ProductAllByTypeMailOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductAllByTypeMailOrderQuery, ProductAllByTypeMailOrderQueryVariables>(ProductAllByTypeMailOrderDocument, options);
        }
export type ProductAllByTypeMailOrderQueryHookResult = ReturnType<typeof useProductAllByTypeMailOrderQuery>;
export type ProductAllByTypeMailOrderLazyQueryHookResult = ReturnType<typeof useProductAllByTypeMailOrderLazyQuery>;
export type ProductAllByTypeMailOrderQueryResult = ApolloReactCommon.QueryResult<ProductAllByTypeMailOrderQuery, ProductAllByTypeMailOrderQueryVariables>;
export const BrandBusinessByProductTypeDocument = gql`
    query brandBusinessByProductType($distance: [Int], $offset: Int, $limit: Int, $strainSlug: String, $latitudeGPS: Float, $longitudeGPS: Float, $prdProductType: [String]!, $prdProductCategories: [String]) {
  brandBusinessByProductType(
    distance: $distance
    offset: $offset
    limit: $limit
    strainSlug: $strainSlug
    latitudeGPS: $latitudeGPS
    longitudeGPS: $longitudeGPS
    prdProductType: $prdProductType
    prdProductCategories: $prdProductCategories
  )
}
    `;

/**
 * __useBrandBusinessByProductTypeQuery__
 *
 * To run a query within a React component, call `useBrandBusinessByProductTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrandBusinessByProductTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrandBusinessByProductTypeQuery({
 *   variables: {
 *      distance: // value for 'distance'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      strainSlug: // value for 'strainSlug'
 *      latitudeGPS: // value for 'latitudeGPS'
 *      longitudeGPS: // value for 'longitudeGPS'
 *      prdProductType: // value for 'prdProductType'
 *      prdProductCategories: // value for 'prdProductCategories'
 *   },
 * });
 */
export function useBrandBusinessByProductTypeQuery(baseOptions: ApolloReactHooks.QueryHookOptions<BrandBusinessByProductTypeQuery, BrandBusinessByProductTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BrandBusinessByProductTypeQuery, BrandBusinessByProductTypeQueryVariables>(BrandBusinessByProductTypeDocument, options);
      }
export function useBrandBusinessByProductTypeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BrandBusinessByProductTypeQuery, BrandBusinessByProductTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BrandBusinessByProductTypeQuery, BrandBusinessByProductTypeQueryVariables>(BrandBusinessByProductTypeDocument, options);
        }
export type BrandBusinessByProductTypeQueryHookResult = ReturnType<typeof useBrandBusinessByProductTypeQuery>;
export type BrandBusinessByProductTypeLazyQueryHookResult = ReturnType<typeof useBrandBusinessByProductTypeLazyQuery>;
export type BrandBusinessByProductTypeQueryResult = ApolloReactCommon.QueryResult<BrandBusinessByProductTypeQuery, BrandBusinessByProductTypeQueryVariables>;
export const ProductAdvertisementDocument = gql`
    query productAdvertisement($plProvinceID: Int, $plRegionID: Int, $latitudeGPS: Float, $longitudeGPS: Float, $bizTypes: [String]!, $prdProductType: [String]!, $prdProductCategories: [String], $offset: Int, $limit: Int) {
  productAdvertisement(
    plProvinceID: $plProvinceID
    plRegionID: $plRegionID
    latitudeGPS: $latitudeGPS
    longitudeGPS: $longitudeGPS
    bizSlugType: $bizTypes
    productTypeNames: $prdProductType
    productCategoriesNames: $prdProductCategories
    offset: $offset
    limit: $limit
  ) {
    ...ProductItem
    business(offset: 0, limit: 1) {
      bizSlug
      plType
      mdaLocalFileName
      contact {
        provinceInitial
        regionSlug
      }
    }
    businessCount
  }
}
    ${ProductItemFragmentDoc}`;

/**
 * __useProductAdvertisementQuery__
 *
 * To run a query within a React component, call `useProductAdvertisementQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductAdvertisementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductAdvertisementQuery({
 *   variables: {
 *      plProvinceID: // value for 'plProvinceID'
 *      plRegionID: // value for 'plRegionID'
 *      latitudeGPS: // value for 'latitudeGPS'
 *      longitudeGPS: // value for 'longitudeGPS'
 *      bizTypes: // value for 'bizTypes'
 *      prdProductType: // value for 'prdProductType'
 *      prdProductCategories: // value for 'prdProductCategories'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useProductAdvertisementQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductAdvertisementQuery, ProductAdvertisementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductAdvertisementQuery, ProductAdvertisementQueryVariables>(ProductAdvertisementDocument, options);
      }
export function useProductAdvertisementLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductAdvertisementQuery, ProductAdvertisementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductAdvertisementQuery, ProductAdvertisementQueryVariables>(ProductAdvertisementDocument, options);
        }
export type ProductAdvertisementQueryHookResult = ReturnType<typeof useProductAdvertisementQuery>;
export type ProductAdvertisementLazyQueryHookResult = ReturnType<typeof useProductAdvertisementLazyQuery>;
export type ProductAdvertisementQueryResult = ApolloReactCommon.QueryResult<ProductAdvertisementQuery, ProductAdvertisementQueryVariables>;
export const ProductListTypesForAdminAdvertisementDocument = gql`
    query productListTypesForAdminAdvertisement($name: String, $sort: [String]) {
  productListTypesForAdminAdvertisement(name: $name, sort: $sort) {
    id
    slug
    name
    typeParent
    amountSpent
    businessCounter
    engagements
    typePriceDelivery
    typePriceBrand
    typePriceDispensary
    typePriceMail
    typeParentName
  }
}
    `;

/**
 * __useProductListTypesForAdminAdvertisementQuery__
 *
 * To run a query within a React component, call `useProductListTypesForAdminAdvertisementQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductListTypesForAdminAdvertisementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductListTypesForAdminAdvertisementQuery({
 *   variables: {
 *      name: // value for 'name'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useProductListTypesForAdminAdvertisementQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductListTypesForAdminAdvertisementQuery, ProductListTypesForAdminAdvertisementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductListTypesForAdminAdvertisementQuery, ProductListTypesForAdminAdvertisementQueryVariables>(ProductListTypesForAdminAdvertisementDocument, options);
      }
export function useProductListTypesForAdminAdvertisementLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductListTypesForAdminAdvertisementQuery, ProductListTypesForAdminAdvertisementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductListTypesForAdminAdvertisementQuery, ProductListTypesForAdminAdvertisementQueryVariables>(ProductListTypesForAdminAdvertisementDocument, options);
        }
export type ProductListTypesForAdminAdvertisementQueryHookResult = ReturnType<typeof useProductListTypesForAdminAdvertisementQuery>;
export type ProductListTypesForAdminAdvertisementLazyQueryHookResult = ReturnType<typeof useProductListTypesForAdminAdvertisementLazyQuery>;
export type ProductListTypesForAdminAdvertisementQueryResult = ApolloReactCommon.QueryResult<ProductListTypesForAdminAdvertisementQuery, ProductListTypesForAdminAdvertisementQueryVariables>;
export const ProductAdBudgetDocument = gql`
    query productAdBudget {
  userAdBudgetByUserId
}
    `;

/**
 * __useProductAdBudgetQuery__
 *
 * To run a query within a React component, call `useProductAdBudgetQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductAdBudgetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductAdBudgetQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductAdBudgetQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductAdBudgetQuery, ProductAdBudgetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductAdBudgetQuery, ProductAdBudgetQueryVariables>(ProductAdBudgetDocument, options);
      }
export function useProductAdBudgetLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductAdBudgetQuery, ProductAdBudgetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductAdBudgetQuery, ProductAdBudgetQueryVariables>(ProductAdBudgetDocument, options);
        }
export type ProductAdBudgetQueryHookResult = ReturnType<typeof useProductAdBudgetQuery>;
export type ProductAdBudgetLazyQueryHookResult = ReturnType<typeof useProductAdBudgetLazyQuery>;
export type ProductAdBudgetQueryResult = ApolloReactCommon.QueryResult<ProductAdBudgetQuery, ProductAdBudgetQueryVariables>;
export const ProductAdvertisementForProductPageDocument = gql`
    query productAdvertisementForProductPage($productId: String!, $limit: Int, $offset: Int) {
  productAdvertisementForProductPage(
    prdProductID: $productId
    limit: $limit
    offset: $offset
  ) {
    ...ProductItem
    business(offset: 0, limit: 1) {
      bizSlug
      plType
      contact {
        provinceInitial
        regionSlug
      }
    }
  }
}
    ${ProductItemFragmentDoc}`;

/**
 * __useProductAdvertisementForProductPageQuery__
 *
 * To run a query within a React component, call `useProductAdvertisementForProductPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductAdvertisementForProductPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductAdvertisementForProductPageQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useProductAdvertisementForProductPageQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductAdvertisementForProductPageQuery, ProductAdvertisementForProductPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductAdvertisementForProductPageQuery, ProductAdvertisementForProductPageQueryVariables>(ProductAdvertisementForProductPageDocument, options);
      }
export function useProductAdvertisementForProductPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductAdvertisementForProductPageQuery, ProductAdvertisementForProductPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductAdvertisementForProductPageQuery, ProductAdvertisementForProductPageQueryVariables>(ProductAdvertisementForProductPageDocument, options);
        }
export type ProductAdvertisementForProductPageQueryHookResult = ReturnType<typeof useProductAdvertisementForProductPageQuery>;
export type ProductAdvertisementForProductPageLazyQueryHookResult = ReturnType<typeof useProductAdvertisementForProductPageLazyQuery>;
export type ProductAdvertisementForProductPageQueryResult = ApolloReactCommon.QueryResult<ProductAdvertisementForProductPageQuery, ProductAdvertisementForProductPageQueryVariables>;
export const ProductTypeAnalyticsDocument = gql`
    mutation productTypeAnalytics($input: AnalyticsCategoryHeader) {
  analyticsSaveCategoryHeader(input: $input)
}
    `;
export type ProductTypeAnalyticsMutationFn = ApolloReactCommon.MutationFunction<ProductTypeAnalyticsMutation, ProductTypeAnalyticsMutationVariables>;

/**
 * __useProductTypeAnalyticsMutation__
 *
 * To run a mutation, you first call `useProductTypeAnalyticsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProductTypeAnalyticsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [productTypeAnalyticsMutation, { data, loading, error }] = useProductTypeAnalyticsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProductTypeAnalyticsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ProductTypeAnalyticsMutation, ProductTypeAnalyticsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ProductTypeAnalyticsMutation, ProductTypeAnalyticsMutationVariables>(ProductTypeAnalyticsDocument, options);
      }
export type ProductTypeAnalyticsMutationHookResult = ReturnType<typeof useProductTypeAnalyticsMutation>;
export type ProductTypeAnalyticsMutationResult = ApolloReactCommon.MutationResult<ProductTypeAnalyticsMutation>;
export type ProductTypeAnalyticsMutationOptions = ApolloReactCommon.BaseMutationOptions<ProductTypeAnalyticsMutation, ProductTypeAnalyticsMutationVariables>;
export const SaveProductTypePriceInDocument = gql`
    mutation saveProductTypePriceIn($input: [ProductTypeInput]!) {
  saveProductTypePriceIn(input: $input)
}
    `;
export type SaveProductTypePriceInMutationFn = ApolloReactCommon.MutationFunction<SaveProductTypePriceInMutation, SaveProductTypePriceInMutationVariables>;

/**
 * __useSaveProductTypePriceInMutation__
 *
 * To run a mutation, you first call `useSaveProductTypePriceInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveProductTypePriceInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveProductTypePriceInMutation, { data, loading, error }] = useSaveProductTypePriceInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSaveProductTypePriceInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveProductTypePriceInMutation, SaveProductTypePriceInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SaveProductTypePriceInMutation, SaveProductTypePriceInMutationVariables>(SaveProductTypePriceInDocument, options);
      }
export type SaveProductTypePriceInMutationHookResult = ReturnType<typeof useSaveProductTypePriceInMutation>;
export type SaveProductTypePriceInMutationResult = ApolloReactCommon.MutationResult<SaveProductTypePriceInMutation>;
export type SaveProductTypePriceInMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveProductTypePriceInMutation, SaveProductTypePriceInMutationVariables>;
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

/**
 * __useReportIssueQuery__
 *
 * To run a query within a React component, call `useReportIssueQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportIssueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportIssueQuery({
 *   variables: {
 *      name: // value for 'name'
 *      emailFrom: // value for 'emailFrom'
 *      description: // value for 'description'
 *      city: // value for 'city'
 *      regionID: // value for 'regionID'
 *      province: // value for 'province'
 *      stepsReproduce: // value for 'stepsReproduce'
 *      page: // value for 'page'
 *      originalPage: // value for 'originalPage'
 *   },
 * });
 */
export function useReportIssueQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ReportIssueQuery, ReportIssueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ReportIssueQuery, ReportIssueQueryVariables>(ReportIssueDocument, options);
      }
export function useReportIssueLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ReportIssueQuery, ReportIssueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ReportIssueQuery, ReportIssueQueryVariables>(ReportIssueDocument, options);
        }
export type ReportIssueQueryHookResult = ReturnType<typeof useReportIssueQuery>;
export type ReportIssueLazyQueryHookResult = ReturnType<typeof useReportIssueLazyQuery>;
export type ReportIssueQueryResult = ApolloReactCommon.QueryResult<ReportIssueQuery, ReportIssueQueryVariables>;
export const ReviewSaveDocument = gql`
    mutation ReviewSave($input: ReviewInput!) {
  reviewSave(input: $input) {
    ...ReviewItem
  }
}
    ${ReviewItemFragmentDoc}`;
export type ReviewSaveMutationFn = ApolloReactCommon.MutationFunction<ReviewSaveMutation, ReviewSaveMutationVariables>;

/**
 * __useReviewSaveMutation__
 *
 * To run a mutation, you first call `useReviewSaveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReviewSaveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reviewSaveMutation, { data, loading, error }] = useReviewSaveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useReviewSaveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReviewSaveMutation, ReviewSaveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ReviewSaveMutation, ReviewSaveMutationVariables>(ReviewSaveDocument, options);
      }
export type ReviewSaveMutationHookResult = ReturnType<typeof useReviewSaveMutation>;
export type ReviewSaveMutationResult = ApolloReactCommon.MutationResult<ReviewSaveMutation>;
export type ReviewSaveMutationOptions = ApolloReactCommon.BaseMutationOptions<ReviewSaveMutation, ReviewSaveMutationVariables>;
export const ReviewDeleteDocument = gql`
    mutation ReviewDelete($reviewId: String!) {
  reviewDelete(reviewId: $reviewId)
}
    `;
export type ReviewDeleteMutationFn = ApolloReactCommon.MutationFunction<ReviewDeleteMutation, ReviewDeleteMutationVariables>;

/**
 * __useReviewDeleteMutation__
 *
 * To run a mutation, you first call `useReviewDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReviewDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reviewDeleteMutation, { data, loading, error }] = useReviewDeleteMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useReviewDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReviewDeleteMutation, ReviewDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ReviewDeleteMutation, ReviewDeleteMutationVariables>(ReviewDeleteDocument, options);
      }
export type ReviewDeleteMutationHookResult = ReturnType<typeof useReviewDeleteMutation>;
export type ReviewDeleteMutationResult = ApolloReactCommon.MutationResult<ReviewDeleteMutation>;
export type ReviewDeleteMutationOptions = ApolloReactCommon.BaseMutationOptions<ReviewDeleteMutation, ReviewDeleteMutationVariables>;
export const SiteMapDocument = gql`
    query SiteMap {
  siteMapTop5 {
    brands {
      province
      provinceId
    }
    mail_order_marijuana {
      province
      provinceId
    }
    marijuana_dispensary {
      province
      city {
        name
        slug
      }
    }
    weed_delivery {
      province
      city {
        name
        slug
      }
    }
  }
}
    `;

/**
 * __useSiteMapQuery__
 *
 * To run a query within a React component, call `useSiteMapQuery` and pass it any options that fit your needs.
 * When your component renders, `useSiteMapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSiteMapQuery({
 *   variables: {
 *   },
 * });
 */
export function useSiteMapQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SiteMapQuery, SiteMapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<SiteMapQuery, SiteMapQueryVariables>(SiteMapDocument, options);
      }
export function useSiteMapLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SiteMapQuery, SiteMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<SiteMapQuery, SiteMapQueryVariables>(SiteMapDocument, options);
        }
export type SiteMapQueryHookResult = ReturnType<typeof useSiteMapQuery>;
export type SiteMapLazyQueryHookResult = ReturnType<typeof useSiteMapLazyQuery>;
export type SiteMapQueryResult = ApolloReactCommon.QueryResult<SiteMapQuery, SiteMapQueryVariables>;
export const LocationListProvinceForSiteMapDocument = gql`
    query LocationListProvinceForSiteMap {
  locationListProvinceForSiteMap {
    plProvinceID
    plDescription
    plInitials
    plName
  }
}
    `;

/**
 * __useLocationListProvinceForSiteMapQuery__
 *
 * To run a query within a React component, call `useLocationListProvinceForSiteMapQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationListProvinceForSiteMapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationListProvinceForSiteMapQuery({
 *   variables: {
 *   },
 * });
 */
export function useLocationListProvinceForSiteMapQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LocationListProvinceForSiteMapQuery, LocationListProvinceForSiteMapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LocationListProvinceForSiteMapQuery, LocationListProvinceForSiteMapQueryVariables>(LocationListProvinceForSiteMapDocument, options);
      }
export function useLocationListProvinceForSiteMapLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LocationListProvinceForSiteMapQuery, LocationListProvinceForSiteMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LocationListProvinceForSiteMapQuery, LocationListProvinceForSiteMapQueryVariables>(LocationListProvinceForSiteMapDocument, options);
        }
export type LocationListProvinceForSiteMapQueryHookResult = ReturnType<typeof useLocationListProvinceForSiteMapQuery>;
export type LocationListProvinceForSiteMapLazyQueryHookResult = ReturnType<typeof useLocationListProvinceForSiteMapLazyQuery>;
export type LocationListProvinceForSiteMapQueryResult = ApolloReactCommon.QueryResult<LocationListProvinceForSiteMapQuery, LocationListProvinceForSiteMapQueryVariables>;
export const LocationListRegionByProvinceForSiteMapDocument = gql`
    query locationListRegionByProvinceForSiteMap($provinceId: Int!) {
  locationListRegionByProvinceForSiteMap(provinceId: $provinceId) {
    plProvinceID
    plRegionID
    plDescription
    plSlug
    plName
  }
}
    `;

/**
 * __useLocationListRegionByProvinceForSiteMapQuery__
 *
 * To run a query within a React component, call `useLocationListRegionByProvinceForSiteMapQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationListRegionByProvinceForSiteMapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationListRegionByProvinceForSiteMapQuery({
 *   variables: {
 *      provinceId: // value for 'provinceId'
 *   },
 * });
 */
export function useLocationListRegionByProvinceForSiteMapQuery(baseOptions: ApolloReactHooks.QueryHookOptions<LocationListRegionByProvinceForSiteMapQuery, LocationListRegionByProvinceForSiteMapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<LocationListRegionByProvinceForSiteMapQuery, LocationListRegionByProvinceForSiteMapQueryVariables>(LocationListRegionByProvinceForSiteMapDocument, options);
      }
export function useLocationListRegionByProvinceForSiteMapLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LocationListRegionByProvinceForSiteMapQuery, LocationListRegionByProvinceForSiteMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<LocationListRegionByProvinceForSiteMapQuery, LocationListRegionByProvinceForSiteMapQueryVariables>(LocationListRegionByProvinceForSiteMapDocument, options);
        }
export type LocationListRegionByProvinceForSiteMapQueryHookResult = ReturnType<typeof useLocationListRegionByProvinceForSiteMapQuery>;
export type LocationListRegionByProvinceForSiteMapLazyQueryHookResult = ReturnType<typeof useLocationListRegionByProvinceForSiteMapLazyQuery>;
export type LocationListRegionByProvinceForSiteMapQueryResult = ApolloReactCommon.QueryResult<LocationListRegionByProvinceForSiteMapQuery, LocationListRegionByProvinceForSiteMapQueryVariables>;
export const TorontoProductsDocument = gql`
    query TorontoProducts {
  productsByRegions(bizRegionIDs: ["182", "183", "7", "5", "24", "26"], limit: 12) {
    ...ProductItem
    business {
      ...BusinessItem
    }
  }
}
    ${ProductItemFragmentDoc}
${BusinessItemFragmentDoc}`;

/**
 * __useTorontoProductsQuery__
 *
 * To run a query within a React component, call `useTorontoProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTorontoProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTorontoProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTorontoProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TorontoProductsQuery, TorontoProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<TorontoProductsQuery, TorontoProductsQueryVariables>(TorontoProductsDocument, options);
      }
export function useTorontoProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TorontoProductsQuery, TorontoProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<TorontoProductsQuery, TorontoProductsQueryVariables>(TorontoProductsDocument, options);
        }
export type TorontoProductsQueryHookResult = ReturnType<typeof useTorontoProductsQuery>;
export type TorontoProductsLazyQueryHookResult = ReturnType<typeof useTorontoProductsLazyQuery>;
export type TorontoProductsQueryResult = ApolloReactCommon.QueryResult<TorontoProductsQuery, TorontoProductsQueryVariables>;