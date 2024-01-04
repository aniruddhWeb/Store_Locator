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
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   * compliant with the 'date-time' format outlined in section 5.6 of
   * the RFC 3339 profile of the ISO 8601 standard for representation
   * of dates and times using the Gregorian calendar.
   */
  DateTime: any;
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: any;
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: any;
};

/** Content for sections on "About Us" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/aboutItem) */
export type AboutItem = Entry & {
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<AboutItemLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** Content for sections on "About Us" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/aboutItem) */
export type AboutItemDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for sections on "About Us" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/aboutItem) */
export type AboutItemImageArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for sections on "About Us" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/aboutItem) */
export type AboutItemLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Content for sections on "About Us" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/aboutItem) */
export type AboutItemTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type AboutItemCollection = {
  items: Array<Maybe<AboutItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AboutItemFilter = {
  AND?: Maybe<Array<Maybe<AboutItemFilter>>>;
  OR?: Maybe<Array<Maybe<AboutItemFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  image_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AboutItemLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type AboutItemLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum AboutItemOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Content for video section on "About Us" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/aboutVideo) */
export type AboutVideo = Entry & {
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<AboutVideoLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


/** Content for video section on "About Us" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/aboutVideo) */
export type AboutVideoDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for video section on "About Us" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/aboutVideo) */
export type AboutVideoLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Content for video section on "About Us" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/aboutVideo) */
export type AboutVideoTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for video section on "About Us" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/aboutVideo) */
export type AboutVideoUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type AboutVideoCollection = {
  items: Array<Maybe<AboutVideo>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AboutVideoFilter = {
  AND?: Maybe<Array<Maybe<AboutVideoFilter>>>;
  OR?: Maybe<Array<Maybe<AboutVideoFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type AboutVideoLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type AboutVideoLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum AboutVideoOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  contentType?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: Maybe<Scalars['String']>;
  transform?: Maybe<ImageTransformOptions>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type AssetCollection = {
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type AssetFilter = {
  AND?: Maybe<Array<Maybe<AssetFilter>>>;
  OR?: Maybe<Array<Maybe<AssetFilter>>>;
  contentType?: Maybe<Scalars['String']>;
  contentType_contains?: Maybe<Scalars['String']>;
  contentType_exists?: Maybe<Scalars['Boolean']>;
  contentType_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentType_not?: Maybe<Scalars['String']>;
  contentType_not_contains?: Maybe<Scalars['String']>;
  contentType_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName?: Maybe<Scalars['String']>;
  fileName_contains?: Maybe<Scalars['String']>;
  fileName_exists?: Maybe<Scalars['Boolean']>;
  fileName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  fileName_not?: Maybe<Scalars['String']>;
  fileName_not_contains?: Maybe<Scalars['String']>;
  fileName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  height?: Maybe<Scalars['Int']>;
  height_exists?: Maybe<Scalars['Boolean']>;
  height_gt?: Maybe<Scalars['Int']>;
  height_gte?: Maybe<Scalars['Int']>;
  height_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  height_lt?: Maybe<Scalars['Int']>;
  height_lte?: Maybe<Scalars['Int']>;
  height_not?: Maybe<Scalars['Int']>;
  height_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size?: Maybe<Scalars['Int']>;
  size_exists?: Maybe<Scalars['Boolean']>;
  size_gt?: Maybe<Scalars['Int']>;
  size_gte?: Maybe<Scalars['Int']>;
  size_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  size_lt?: Maybe<Scalars['Int']>;
  size_lte?: Maybe<Scalars['Int']>;
  size_not?: Maybe<Scalars['Int']>;
  size_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  width?: Maybe<Scalars['Int']>;
  width_exists?: Maybe<Scalars['Boolean']>;
  width_gt?: Maybe<Scalars['Int']>;
  width_gte?: Maybe<Scalars['Int']>;
  width_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  width_lt?: Maybe<Scalars['Int']>;
  width_lte?: Maybe<Scalars['Int']>;
  width_not?: Maybe<Scalars['Int']>;
  width_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
};

export type AssetLinkingCollections = {
  aboutItemCollection?: Maybe<AboutItemCollection>;
  bannerCollection?: Maybe<BannerCollection>;
  carouselImageCollection?: Maybe<CarouselImageCollection>;
  entryCollection?: Maybe<EntryCollection>;
  homeTopSectionCollection?: Maybe<HomeTopSectionCollection>;
  newsCollection?: Maybe<NewsCollection>;
  ourStoryContentCollection?: Maybe<OurStoryContentCollection>;
  productHeaderCollection?: Maybe<ProductHeaderCollection>;
  productMenuItemCollection?: Maybe<ProductMenuItemCollection>;
  serviceCollection?: Maybe<ServiceCollection>;
  torontoLandingCollection?: Maybe<TorontoLandingCollection>;
};


export type AssetLinkingCollectionsAboutItemCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsBannerCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsCarouselImageCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsHomeTopSectionCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsNewsCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsOurStoryContentCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsProductHeaderCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsProductMenuItemCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsServiceCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};


export type AssetLinkingCollectionsTorontoLandingCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum AssetOrder {
  ContentTypeAsc = 'contentType_ASC',
  ContentTypeDesc = 'contentType_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** Items for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/banner) */
export type Banner = Entry & {
  businessName?: Maybe<Scalars['String']>;
  buttonText?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<BannerLinkingCollections>;
  plCountryId?: Maybe<Scalars['Int']>;
  shortDescription?: Maybe<Scalars['String']>;
  shortLink?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


/** Items for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/banner) */
export type BannerBusinessNameArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Items for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/banner) */
export type BannerButtonTextArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Items for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/banner) */
export type BannerImageArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Items for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/banner) */
export type BannerLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Items for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/banner) */
export type BannerPlCountryIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Items for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/banner) */
export type BannerShortDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Items for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/banner) */
export type BannerShortLinkArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Items for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/banner) */
export type BannerTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Items for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/banner) */
export type BannerTypeArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type BannerCollection = {
  items: Array<Maybe<Banner>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type BannerFilter = {
  AND?: Maybe<Array<Maybe<BannerFilter>>>;
  OR?: Maybe<Array<Maybe<BannerFilter>>>;
  businessName?: Maybe<Scalars['String']>;
  businessName_contains?: Maybe<Scalars['String']>;
  businessName_exists?: Maybe<Scalars['Boolean']>;
  businessName_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  businessName_not?: Maybe<Scalars['String']>;
  businessName_not_contains?: Maybe<Scalars['String']>;
  businessName_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  buttonText?: Maybe<Scalars['String']>;
  buttonText_contains?: Maybe<Scalars['String']>;
  buttonText_exists?: Maybe<Scalars['Boolean']>;
  buttonText_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  buttonText_not?: Maybe<Scalars['String']>;
  buttonText_not_contains?: Maybe<Scalars['String']>;
  buttonText_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  image_exists?: Maybe<Scalars['Boolean']>;
  plCountryId?: Maybe<Scalars['Int']>;
  plCountryId_exists?: Maybe<Scalars['Boolean']>;
  plCountryId_gt?: Maybe<Scalars['Int']>;
  plCountryId_gte?: Maybe<Scalars['Int']>;
  plCountryId_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  plCountryId_lt?: Maybe<Scalars['Int']>;
  plCountryId_lte?: Maybe<Scalars['Int']>;
  plCountryId_not?: Maybe<Scalars['Int']>;
  plCountryId_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  shortDescription?: Maybe<Scalars['String']>;
  shortDescription_contains?: Maybe<Scalars['String']>;
  shortDescription_exists?: Maybe<Scalars['Boolean']>;
  shortDescription_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  shortDescription_not?: Maybe<Scalars['String']>;
  shortDescription_not_contains?: Maybe<Scalars['String']>;
  shortDescription_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  shortLink?: Maybe<Scalars['String']>;
  shortLink_contains?: Maybe<Scalars['String']>;
  shortLink_exists?: Maybe<Scalars['Boolean']>;
  shortLink_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  shortLink_not?: Maybe<Scalars['String']>;
  shortLink_not_contains?: Maybe<Scalars['String']>;
  shortLink_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Scalars['String']>;
  type_contains?: Maybe<Scalars['String']>;
  type_exists?: Maybe<Scalars['Boolean']>;
  type_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  type_not?: Maybe<Scalars['String']>;
  type_not_contains?: Maybe<Scalars['String']>;
  type_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type BannerLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type BannerLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

/** Banners list for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/bannerList) */
export type BannerList = Entry & {
  bannerCollection?: Maybe<BannerListBannerCollection>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<BannerListLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** Banners list for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/bannerList) */
export type BannerListBannerCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};


/** Banners list for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/bannerList) */
export type BannerListLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Banners list for "Banners" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/bannerList) */
export type BannerListTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type BannerListBannerCollection = {
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type BannerListCollection = {
  items: Array<Maybe<BannerList>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type BannerListFilter = {
  AND?: Maybe<Array<Maybe<BannerListFilter>>>;
  OR?: Maybe<Array<Maybe<BannerListFilter>>>;
  bannerCollection_exists?: Maybe<Scalars['Boolean']>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type BannerListLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type BannerListLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum BannerListOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export enum BannerOrder {
  ButtonTextAsc = 'buttonText_ASC',
  ButtonTextDesc = 'buttonText_DESC',
  PlCountryIdAsc = 'plCountryId_ASC',
  PlCountryIdDesc = 'plCountryId_DESC',
  ShortDescriptionAsc = 'shortDescription_ASC',
  ShortDescriptionDesc = 'shortDescription_DESC',
  ShortLinkAsc = 'shortLink_ASC',
  ShortLinkDesc = 'shortLink_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC'
}

/** Images list for carousel section on top of the Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/carouselImage) */
export type CarouselImage = Entry & {
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  imageMobile?: Maybe<Asset>;
  linkedFrom?: Maybe<CarouselImageLinkingCollections>;
  order?: Maybe<Scalars['Int']>;
  plCountryId?: Maybe<Scalars['Int']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


/** Images list for carousel section on top of the Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/carouselImage) */
export type CarouselImageImageArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Images list for carousel section on top of the Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/carouselImage) */
export type CarouselImageImageMobileArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Images list for carousel section on top of the Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/carouselImage) */
export type CarouselImageLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Images list for carousel section on top of the Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/carouselImage) */
export type CarouselImageOrderArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Images list for carousel section on top of the Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/carouselImage) */
export type CarouselImagePlCountryIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Images list for carousel section on top of the Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/carouselImage) */
export type CarouselImageTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Images list for carousel section on top of the Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/carouselImage) */
export type CarouselImageUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type CarouselImageCollection = {
  items: Array<Maybe<CarouselImage>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type CarouselImageFilter = {
  AND?: Maybe<Array<Maybe<CarouselImageFilter>>>;
  OR?: Maybe<Array<Maybe<CarouselImageFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  imageMobile_exists?: Maybe<Scalars['Boolean']>;
  image_exists?: Maybe<Scalars['Boolean']>;
  order?: Maybe<Scalars['Int']>;
  order_exists?: Maybe<Scalars['Boolean']>;
  order_gt?: Maybe<Scalars['Int']>;
  order_gte?: Maybe<Scalars['Int']>;
  order_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  order_lt?: Maybe<Scalars['Int']>;
  order_lte?: Maybe<Scalars['Int']>;
  order_not?: Maybe<Scalars['Int']>;
  order_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  plCountryId?: Maybe<Scalars['Int']>;
  plCountryId_exists?: Maybe<Scalars['Boolean']>;
  plCountryId_gt?: Maybe<Scalars['Int']>;
  plCountryId_gte?: Maybe<Scalars['Int']>;
  plCountryId_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  plCountryId_lt?: Maybe<Scalars['Int']>;
  plCountryId_lte?: Maybe<Scalars['Int']>;
  plCountryId_not?: Maybe<Scalars['Int']>;
  plCountryId_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CarouselImageLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type CarouselImageLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum CarouselImageOrder {
  OrderAsc = 'order_ASC',
  OrderDesc = 'order_DESC',
  PlCountryIdAsc = 'plCountryId_ASC',
  PlCountryIdDesc = 'plCountryId_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type ContentfulMetadata = {
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataFilter = {
  tags?: Maybe<ContentfulMetadataTagsFilter>;
  tags_exists?: Maybe<Scalars['Boolean']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains_none?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_contains_some?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 * Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};



export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type EntryFilter = {
  AND?: Maybe<Array<Maybe<EntryFilter>>>;
  OR?: Maybe<Array<Maybe<EntryFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  sys?: Maybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Items for "Frequently Asked Questions" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/faq) */
export type Faq = Entry & {
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  index?: Maybe<Scalars['Int']>;
  linkedFrom?: Maybe<FaqLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** Items for "Frequently Asked Questions" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/faq) */
export type FaqDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Items for "Frequently Asked Questions" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/faq) */
export type FaqIndexArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Items for "Frequently Asked Questions" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/faq) */
export type FaqLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Items for "Frequently Asked Questions" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/faq) */
export type FaqTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type FaqCollection = {
  items: Array<Maybe<Faq>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type FaqFilter = {
  AND?: Maybe<Array<Maybe<FaqFilter>>>;
  OR?: Maybe<Array<Maybe<FaqFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  index?: Maybe<Scalars['Int']>;
  index_exists?: Maybe<Scalars['Boolean']>;
  index_gt?: Maybe<Scalars['Int']>;
  index_gte?: Maybe<Scalars['Int']>;
  index_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  index_lt?: Maybe<Scalars['Int']>;
  index_lte?: Maybe<Scalars['Int']>;
  index_not?: Maybe<Scalars['Int']>;
  index_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type FaqLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type FaqLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum FaqOrder {
  IndexAsc = 'index_ASC',
  IndexDesc = 'index_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}


/** Content for top section on Home page (with H1) [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/homeTopSection) */
export type HomeTopSection = Entry & {
  contentfulMetadata: ContentfulMetadata;
  highlights?: Maybe<Scalars['String']>;
  image?: Maybe<Asset>;
  imageMobile?: Maybe<Asset>;
  link?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<HomeTopSectionLinkingCollections>;
  plCountryId?: Maybe<Scalars['Int']>;
  sys: Sys;
  text?: Maybe<Scalars['String']>;
};


/** Content for top section on Home page (with H1) [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/homeTopSection) */
export type HomeTopSectionHighlightsArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for top section on Home page (with H1) [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/homeTopSection) */
export type HomeTopSectionImageArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for top section on Home page (with H1) [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/homeTopSection) */
export type HomeTopSectionImageMobileArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for top section on Home page (with H1) [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/homeTopSection) */
export type HomeTopSectionLinkArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for top section on Home page (with H1) [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/homeTopSection) */
export type HomeTopSectionLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Content for top section on Home page (with H1) [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/homeTopSection) */
export type HomeTopSectionPlCountryIdArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for top section on Home page (with H1) [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/homeTopSection) */
export type HomeTopSectionTextArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type HomeTopSectionCollection = {
  items: Array<Maybe<HomeTopSection>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type HomeTopSectionFilter = {
  AND?: Maybe<Array<Maybe<HomeTopSectionFilter>>>;
  OR?: Maybe<Array<Maybe<HomeTopSectionFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  highlights?: Maybe<Scalars['String']>;
  highlights_contains?: Maybe<Scalars['String']>;
  highlights_exists?: Maybe<Scalars['Boolean']>;
  highlights_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  highlights_not?: Maybe<Scalars['String']>;
  highlights_not_contains?: Maybe<Scalars['String']>;
  highlights_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  imageMobile_exists?: Maybe<Scalars['Boolean']>;
  image_exists?: Maybe<Scalars['Boolean']>;
  link?: Maybe<Scalars['String']>;
  link_contains?: Maybe<Scalars['String']>;
  link_exists?: Maybe<Scalars['Boolean']>;
  link_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  link_not?: Maybe<Scalars['String']>;
  link_not_contains?: Maybe<Scalars['String']>;
  link_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  plCountryId?: Maybe<Scalars['Int']>;
  plCountryId_exists?: Maybe<Scalars['Boolean']>;
  plCountryId_gt?: Maybe<Scalars['Int']>;
  plCountryId_gte?: Maybe<Scalars['Int']>;
  plCountryId_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  plCountryId_lt?: Maybe<Scalars['Int']>;
  plCountryId_lte?: Maybe<Scalars['Int']>;
  plCountryId_not?: Maybe<Scalars['Int']>;
  plCountryId_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  sys?: Maybe<SysFilter>;
  text?: Maybe<Scalars['String']>;
  text_contains?: Maybe<Scalars['String']>;
  text_exists?: Maybe<Scalars['Boolean']>;
  text_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  text_not?: Maybe<Scalars['String']>;
  text_not_contains?: Maybe<Scalars['String']>;
  text_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type HomeTopSectionLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type HomeTopSectionLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum HomeTopSectionOrder {
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  PlCountryIdAsc = 'plCountryId_ASC',
  PlCountryIdDesc = 'plCountryId_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export enum ImageFormat {
  Avif = 'AVIF',
  /** JPG image format. */
  Jpg = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   * When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   * will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   * early as possible to make the layout look as designed.
   */
  JpgProgressive = 'JPG_PROGRESSIVE',
  /** PNG image format */
  Png = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   * The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = 'PNG8',
  /** WebP image format. */
  Webp = 'WEBP'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BottomLeft = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BottomRight = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  Center = 'CENTER',
  /** Focus the resizing on the largest face. */
  Face = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  Faces = 'FACES',
  /** Focus the resizing on the left. */
  Left = 'LEFT',
  /** Focus the resizing on the right. */
  Right = 'RIGHT',
  /** Focus the resizing on the top. */
  Top = 'TOP',
  /** Focus the resizing on the top left. */
  TopLeft = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TopRight = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  Fit = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   * Uses desired background color as padding color.
   */
  Pad = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = 'SCALE',
  /** Creates a thumbnail from the image. */
  Thumb = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   * Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: Maybe<Scalars['HexColor']>;
  /**
   * Desired corner radius in pixels.
   * Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   * Defaults to `0`. Uses desired background color as padding color,
   * unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: Maybe<Scalars['Int']>;
  /** Desired image format. Defaults to the original image format. */
  format?: Maybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: Maybe<Scalars['Dimension']>;
  /**
   * Desired quality of the image in percents.
   * Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: Maybe<Scalars['Quality']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: Maybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: Maybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: Maybe<Scalars['Dimension']>;
};


/** [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/news) */
export type News = Entry & {
  contentfulMetadata: ContentfulMetadata;
  iframe?: Maybe<Scalars['String']>;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<NewsLinkingCollections>;
  mobileIframe?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  subTitle?: Maybe<Scalars['String']>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  topic?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/news) */
export type NewsIframeArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/news) */
export type NewsImageArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/news) */
export type NewsLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/news) */
export type NewsMobileIframeArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/news) */
export type NewsOrderArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/news) */
export type NewsSubTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/news) */
export type NewsTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/news) */
export type NewsTopicArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/news) */
export type NewsUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type NewsCollection = {
  items: Array<Maybe<News>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type NewsFilter = {
  AND?: Maybe<Array<Maybe<NewsFilter>>>;
  OR?: Maybe<Array<Maybe<NewsFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  iframe?: Maybe<Scalars['String']>;
  iframe_contains?: Maybe<Scalars['String']>;
  iframe_exists?: Maybe<Scalars['Boolean']>;
  iframe_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  iframe_not?: Maybe<Scalars['String']>;
  iframe_not_contains?: Maybe<Scalars['String']>;
  iframe_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  image_exists?: Maybe<Scalars['Boolean']>;
  mobileIframe?: Maybe<Scalars['String']>;
  mobileIframe_contains?: Maybe<Scalars['String']>;
  mobileIframe_exists?: Maybe<Scalars['Boolean']>;
  mobileIframe_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  mobileIframe_not?: Maybe<Scalars['String']>;
  mobileIframe_not_contains?: Maybe<Scalars['String']>;
  mobileIframe_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  order?: Maybe<Scalars['Int']>;
  order_exists?: Maybe<Scalars['Boolean']>;
  order_gt?: Maybe<Scalars['Int']>;
  order_gte?: Maybe<Scalars['Int']>;
  order_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  order_lt?: Maybe<Scalars['Int']>;
  order_lte?: Maybe<Scalars['Int']>;
  order_not?: Maybe<Scalars['Int']>;
  order_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  subTitle?: Maybe<Scalars['String']>;
  subTitle_contains?: Maybe<Scalars['String']>;
  subTitle_exists?: Maybe<Scalars['Boolean']>;
  subTitle_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  subTitle_not?: Maybe<Scalars['String']>;
  subTitle_not_contains?: Maybe<Scalars['String']>;
  subTitle_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  topic?: Maybe<Scalars['String']>;
  topic_contains?: Maybe<Scalars['String']>;
  topic_exists?: Maybe<Scalars['Boolean']>;
  topic_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  topic_not?: Maybe<Scalars['String']>;
  topic_not_contains?: Maybe<Scalars['String']>;
  topic_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type NewsLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type NewsLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum NewsOrder {
  OrderAsc = 'order_ASC',
  OrderDesc = 'order_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TopicAsc = 'topic_ASC',
  TopicDesc = 'topic_DESC'
}

/** Content for "Our Story" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/ourStoryContent) */
export type OurStoryContent = Entry & {
  button?: Maybe<Scalars['String']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<OurStoryContentLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  video?: Maybe<Asset>;
};


/** Content for "Our Story" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/ourStoryContent) */
export type OurStoryContentButtonArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for "Our Story" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/ourStoryContent) */
export type OurStoryContentDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for "Our Story" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/ourStoryContent) */
export type OurStoryContentImageArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for "Our Story" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/ourStoryContent) */
export type OurStoryContentLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Content for "Our Story" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/ourStoryContent) */
export type OurStoryContentTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for "Our Story" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/ourStoryContent) */
export type OurStoryContentUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for "Our Story" section on Home page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/ourStoryContent) */
export type OurStoryContentVideoArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};

export type OurStoryContentCollection = {
  items: Array<Maybe<OurStoryContent>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type OurStoryContentFilter = {
  AND?: Maybe<Array<Maybe<OurStoryContentFilter>>>;
  OR?: Maybe<Array<Maybe<OurStoryContentFilter>>>;
  button?: Maybe<Scalars['String']>;
  button_contains?: Maybe<Scalars['String']>;
  button_exists?: Maybe<Scalars['Boolean']>;
  button_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  button_not?: Maybe<Scalars['String']>;
  button_not_contains?: Maybe<Scalars['String']>;
  button_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  image_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  video_exists?: Maybe<Scalars['Boolean']>;
};

export type OurStoryContentLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type OurStoryContentLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum OurStoryContentOrder {
  ButtonAsc = 'button_ASC',
  ButtonDesc = 'button_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

/** Content for top sections on product category pages [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productHeader) */
export type ProductHeader = Entry & {
  backgroundImage?: Maybe<Asset>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ProductHeaderLinkingCollections>;
  sys: Sys;
  text?: Maybe<Scalars['String']>;
  textUrlMap?: Maybe<Scalars['JSON']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


/** Content for top sections on product category pages [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productHeader) */
export type ProductHeaderBackgroundImageArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for top sections on product category pages [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productHeader) */
export type ProductHeaderLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Content for top sections on product category pages [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productHeader) */
export type ProductHeaderTextArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for top sections on product category pages [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productHeader) */
export type ProductHeaderTextUrlMapArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for top sections on product category pages [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productHeader) */
export type ProductHeaderTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for top sections on product category pages [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productHeader) */
export type ProductHeaderTypeArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type ProductHeaderCollection = {
  items: Array<Maybe<ProductHeader>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ProductHeaderFilter = {
  AND?: Maybe<Array<Maybe<ProductHeaderFilter>>>;
  OR?: Maybe<Array<Maybe<ProductHeaderFilter>>>;
  backgroundImage_exists?: Maybe<Scalars['Boolean']>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  sys?: Maybe<SysFilter>;
  text?: Maybe<Scalars['String']>;
  textUrlMap_exists?: Maybe<Scalars['Boolean']>;
  text_contains?: Maybe<Scalars['String']>;
  text_exists?: Maybe<Scalars['Boolean']>;
  text_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  text_not?: Maybe<Scalars['String']>;
  text_not_contains?: Maybe<Scalars['String']>;
  text_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Scalars['String']>;
  type_contains?: Maybe<Scalars['String']>;
  type_exists?: Maybe<Scalars['Boolean']>;
  type_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  type_not?: Maybe<Scalars['String']>;
  type_not_contains?: Maybe<Scalars['String']>;
  type_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ProductHeaderLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type ProductHeaderLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum ProductHeaderOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC'
}

/** Banners for header menu for product categories [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productMenuItem) */
export type ProductMenuItem = Entry & {
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<ProductMenuItemLinkingCollections>;
  sys: Sys;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


/** Banners for header menu for product categories [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productMenuItem) */
export type ProductMenuItemImageArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Banners for header menu for product categories [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productMenuItem) */
export type ProductMenuItemLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Banners for header menu for product categories [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productMenuItem) */
export type ProductMenuItemTextArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Banners for header menu for product categories [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productMenuItem) */
export type ProductMenuItemTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Banners for header menu for product categories [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productMenuItem) */
export type ProductMenuItemTypeArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Banners for header menu for product categories [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/productMenuItem) */
export type ProductMenuItemUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type ProductMenuItemCollection = {
  items: Array<Maybe<ProductMenuItem>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ProductMenuItemFilter = {
  AND?: Maybe<Array<Maybe<ProductMenuItemFilter>>>;
  OR?: Maybe<Array<Maybe<ProductMenuItemFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  image_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  text?: Maybe<Scalars['String']>;
  text_contains?: Maybe<Scalars['String']>;
  text_exists?: Maybe<Scalars['Boolean']>;
  text_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  text_not?: Maybe<Scalars['String']>;
  text_not_contains?: Maybe<Scalars['String']>;
  text_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  type?: Maybe<Scalars['String']>;
  type_contains?: Maybe<Scalars['String']>;
  type_exists?: Maybe<Scalars['Boolean']>;
  type_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  type_not?: Maybe<Scalars['String']>;
  type_not_contains?: Maybe<Scalars['String']>;
  type_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ProductMenuItemLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type ProductMenuItemLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum ProductMenuItemOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC'
}


export type Query = {
  aboutItem?: Maybe<AboutItem>;
  aboutItemCollection?: Maybe<AboutItemCollection>;
  aboutVideo?: Maybe<AboutVideo>;
  aboutVideoCollection?: Maybe<AboutVideoCollection>;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  banner?: Maybe<Banner>;
  bannerCollection?: Maybe<BannerCollection>;
  bannerList?: Maybe<BannerList>;
  bannerListCollection?: Maybe<BannerListCollection>;
  carouselImage?: Maybe<CarouselImage>;
  carouselImageCollection?: Maybe<CarouselImageCollection>;
  entryCollection?: Maybe<EntryCollection>;
  faq?: Maybe<Faq>;
  faqCollection?: Maybe<FaqCollection>;
  homeTopSection?: Maybe<HomeTopSection>;
  homeTopSectionCollection?: Maybe<HomeTopSectionCollection>;
  news?: Maybe<News>;
  newsCollection?: Maybe<NewsCollection>;
  ourStoryContent?: Maybe<OurStoryContent>;
  ourStoryContentCollection?: Maybe<OurStoryContentCollection>;
  productHeader?: Maybe<ProductHeader>;
  productHeaderCollection?: Maybe<ProductHeaderCollection>;
  productMenuItem?: Maybe<ProductMenuItem>;
  productMenuItemCollection?: Maybe<ProductMenuItemCollection>;
  service?: Maybe<Service>;
  serviceCollection?: Maybe<ServiceCollection>;
  serviceGroup?: Maybe<ServiceGroup>;
  serviceGroupCollection?: Maybe<ServiceGroupCollection>;
  socialLink?: Maybe<SocialLink>;
  socialLinkCollection?: Maybe<SocialLinkCollection>;
  staticPage?: Maybe<StaticPage>;
  staticPageCollection?: Maybe<StaticPageCollection>;
  torontoLanding?: Maybe<TorontoLanding>;
  torontoLandingCollection?: Maybe<TorontoLandingCollection>;
};


export type QueryAboutItemArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryAboutItemCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<AboutItemOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<AboutItemFilter>;
};


export type QueryAboutVideoArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryAboutVideoCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<AboutVideoOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<AboutVideoFilter>;
};


export type QueryAssetArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryAssetCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<AssetOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<AssetFilter>;
};


export type QueryBannerArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryBannerCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<BannerOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<BannerFilter>;
};


export type QueryBannerListArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryBannerListCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<BannerListOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<BannerListFilter>;
};


export type QueryCarouselImageArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryCarouselImageCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<CarouselImageOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<CarouselImageFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<EntryOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<EntryFilter>;
};


export type QueryFaqArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryFaqCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<FaqOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<FaqFilter>;
};


export type QueryHomeTopSectionArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryHomeTopSectionCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<HomeTopSectionOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<HomeTopSectionFilter>;
};


export type QueryNewsArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryNewsCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<NewsOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<NewsFilter>;
};


export type QueryOurStoryContentArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryOurStoryContentCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<OurStoryContentOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<OurStoryContentFilter>;
};


export type QueryProductHeaderArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryProductHeaderCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<ProductHeaderOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<ProductHeaderFilter>;
};


export type QueryProductMenuItemArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryProductMenuItemCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<ProductMenuItemOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<ProductMenuItemFilter>;
};


export type QueryServiceArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryServiceCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<ServiceOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<ServiceFilter>;
};


export type QueryServiceGroupArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryServiceGroupCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<ServiceGroupOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<ServiceGroupFilter>;
};


export type QuerySocialLinkArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QuerySocialLinkCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<SocialLinkOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<SocialLinkFilter>;
};


export type QueryStaticPageArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryStaticPageCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<StaticPageOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<StaticPageFilter>;
};


export type QueryTorontoLandingArgs = {
  id: Scalars['String'];
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


export type QueryTorontoLandingCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  order?: Maybe<Array<Maybe<TorontoLandingOrder>>>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
  where?: Maybe<TorontoLandingFilter>;
};

/** Service items for "Services" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/service) */
export type Service = Entry & {
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Asset>;
  linkedFrom?: Maybe<ServiceLinkingCollections>;
  name?: Maybe<Scalars['String']>;
  sys: Sys;
  url?: Maybe<Scalars['String']>;
};


/** Service items for "Services" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/service) */
export type ServiceDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Service items for "Services" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/service) */
export type ServiceImageArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Service items for "Services" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/service) */
export type ServiceLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Service items for "Services" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/service) */
export type ServiceNameArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Service items for "Services" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/service) */
export type ServiceUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type ServiceCollection = {
  items: Array<Maybe<Service>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ServiceFilter = {
  AND?: Maybe<Array<Maybe<ServiceFilter>>>;
  OR?: Maybe<Array<Maybe<ServiceFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  image_exists?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  name_contains?: Maybe<Scalars['String']>;
  name_exists?: Maybe<Scalars['Boolean']>;
  name_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  name_not?: Maybe<Scalars['String']>;
  name_not_contains?: Maybe<Scalars['String']>;
  name_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  url?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** Group titles for "Services" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/serviceGroup) */
export type ServiceGroup = Entry & {
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<ServiceGroupLinkingCollections>;
  order?: Maybe<Scalars['Int']>;
  servicesCollection?: Maybe<ServiceGroupServicesCollection>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** Group titles for "Services" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/serviceGroup) */
export type ServiceGroupLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Group titles for "Services" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/serviceGroup) */
export type ServiceGroupOrderArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Group titles for "Services" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/serviceGroup) */
export type ServiceGroupServicesCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};


/** Group titles for "Services" page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/serviceGroup) */
export type ServiceGroupTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type ServiceGroupCollection = {
  items: Array<Maybe<ServiceGroup>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ServiceGroupFilter = {
  AND?: Maybe<Array<Maybe<ServiceGroupFilter>>>;
  OR?: Maybe<Array<Maybe<ServiceGroupFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  order?: Maybe<Scalars['Int']>;
  order_exists?: Maybe<Scalars['Boolean']>;
  order_gt?: Maybe<Scalars['Int']>;
  order_gte?: Maybe<Scalars['Int']>;
  order_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  order_lt?: Maybe<Scalars['Int']>;
  order_lte?: Maybe<Scalars['Int']>;
  order_not?: Maybe<Scalars['Int']>;
  order_not_in?: Maybe<Array<Maybe<Scalars['Int']>>>;
  servicesCollection_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ServiceGroupLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type ServiceGroupLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum ServiceGroupOrder {
  OrderAsc = 'order_ASC',
  OrderDesc = 'order_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type ServiceGroupServicesCollection = {
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type ServiceLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type ServiceLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum ServiceOrder {
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

/** Content for Social Media links in the Footer [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/socialLink) */
export type SocialLink = Entry & {
  contentfulMetadata: ContentfulMetadata;
  linkedFrom?: Maybe<SocialLinkLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};


/** Content for Social Media links in the Footer [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/socialLink) */
export type SocialLinkLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Content for Social Media links in the Footer [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/socialLink) */
export type SocialLinkTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for Social Media links in the Footer [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/socialLink) */
export type SocialLinkUrlArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type SocialLinkCollection = {
  items: Array<Maybe<SocialLink>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type SocialLinkFilter = {
  AND?: Maybe<Array<Maybe<SocialLinkFilter>>>;
  OR?: Maybe<Array<Maybe<SocialLinkFilter>>>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url?: Maybe<Scalars['String']>;
  url_contains?: Maybe<Scalars['String']>;
  url_exists?: Maybe<Scalars['Boolean']>;
  url_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  url_not?: Maybe<Scalars['String']>;
  url_not_contains?: Maybe<Scalars['String']>;
  url_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type SocialLinkLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type SocialLinkLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum SocialLinkOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

/** Content for "Terms of Service" and "Privacy Policy" pages [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/staticPage) */
export type StaticPage = Entry & {
  body?: Maybe<StaticPageBody>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']>;
  linkedFrom?: Maybe<StaticPageLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
};


/** Content for "Terms of Service" and "Privacy Policy" pages [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/staticPage) */
export type StaticPageBodyArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for "Terms of Service" and "Privacy Policy" pages [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/staticPage) */
export type StaticPageDescriptionArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for "Terms of Service" and "Privacy Policy" pages [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/staticPage) */
export type StaticPageLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Content for "Terms of Service" and "Privacy Policy" pages [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/staticPage) */
export type StaticPageTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};

export type StaticPageBody = {
  json: Scalars['JSON'];
  links: StaticPageBodyLinks;
};

export type StaticPageBodyAssets = {
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type StaticPageBodyEntries = {
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type StaticPageBodyLinks = {
  assets: StaticPageBodyAssets;
  entries: StaticPageBodyEntries;
};

export type StaticPageCollection = {
  items: Array<Maybe<StaticPage>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type StaticPageFilter = {
  AND?: Maybe<Array<Maybe<StaticPageFilter>>>;
  OR?: Maybe<Array<Maybe<StaticPageFilter>>>;
  body_contains?: Maybe<Scalars['String']>;
  body_exists?: Maybe<Scalars['Boolean']>;
  body_not_contains?: Maybe<Scalars['String']>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  description?: Maybe<Scalars['String']>;
  description_contains?: Maybe<Scalars['String']>;
  description_exists?: Maybe<Scalars['Boolean']>;
  description_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  description_not?: Maybe<Scalars['String']>;
  description_not_contains?: Maybe<Scalars['String']>;
  description_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type StaticPageLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type StaticPageLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum StaticPageOrder {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC'
}

export type Sys = {
  environmentId: Scalars['String'];
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedVersion?: Maybe<Scalars['Int']>;
  spaceId: Scalars['String'];
};

export type SysFilter = {
  firstPublishedAt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_exists?: Maybe<Scalars['Boolean']>;
  firstPublishedAt_gt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_gte?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  firstPublishedAt_lt?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_lte?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_not?: Maybe<Scalars['DateTime']>;
  firstPublishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  id?: Maybe<Scalars['String']>;
  id_contains?: Maybe<Scalars['String']>;
  id_exists?: Maybe<Scalars['Boolean']>;
  id_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  id_not?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  id_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  publishedAt?: Maybe<Scalars['DateTime']>;
  publishedAt_exists?: Maybe<Scalars['Boolean']>;
  publishedAt_gt?: Maybe<Scalars['DateTime']>;
  publishedAt_gte?: Maybe<Scalars['DateTime']>;
  publishedAt_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  publishedAt_lt?: Maybe<Scalars['DateTime']>;
  publishedAt_lte?: Maybe<Scalars['DateTime']>;
  publishedAt_not?: Maybe<Scalars['DateTime']>;
  publishedAt_not_in?: Maybe<Array<Maybe<Scalars['DateTime']>>>;
  publishedVersion?: Maybe<Scalars['Float']>;
  publishedVersion_exists?: Maybe<Scalars['Boolean']>;
  publishedVersion_gt?: Maybe<Scalars['Float']>;
  publishedVersion_gte?: Maybe<Scalars['Float']>;
  publishedVersion_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
  publishedVersion_lt?: Maybe<Scalars['Float']>;
  publishedVersion_lte?: Maybe<Scalars['Float']>;
  publishedVersion_not?: Maybe<Scalars['Float']>;
  publishedVersion_not_in?: Maybe<Array<Maybe<Scalars['Float']>>>;
};

/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLanding = Entry & {
  aboutDeliveryBkg?: Maybe<Asset>;
  adviceProductBkg?: Maybe<Asset>;
  appleBlackButton?: Maybe<Asset>;
  contentfulMetadata: ContentfulMetadata;
  deliveryIcon?: Maybe<Asset>;
  deliveryMapBkg?: Maybe<Asset>;
  downloadAppCannabisBkg?: Maybe<Asset>;
  ediblesIcon?: Maybe<Asset>;
  etobicokeMapBkg?: Maybe<Asset>;
  extractsConcentratesIcon?: Maybe<Asset>;
  flowerIcon?: Maybe<Asset>;
  footerBkg?: Maybe<Asset>;
  googleBlackButton?: Maybe<Asset>;
  landingHighlights?: Maybe<Scalars['JSON']>;
  landingTitles?: Maybe<Scalars['JSON']>;
  linkedFrom?: Maybe<TorontoLandingLinkingCollections>;
  mainCardEast?: Maybe<Asset>;
  mainCardWest?: Maybe<Asset>;
  mississaugaMapBkg?: Maybe<Asset>;
  northYorkMapBkg?: Maybe<Asset>;
  orderDelivaryBkg?: Maybe<Asset>;
  orderMailBkg?: Maybe<Asset>;
  phoneBkg?: Maybe<Asset>;
  phoneMobileBkg?: Maybe<Asset>;
  scarboroughMapBkg?: Maybe<Asset>;
  serviceIcon?: Maybe<Asset>;
  sys: Sys;
  title?: Maybe<Scalars['String']>;
  torontoTexts?: Maybe<Scalars['JSON']>;
  unbeatableIcon?: Maybe<Asset>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingAboutDeliveryBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingAdviceProductBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingAppleBlackButtonArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingDeliveryIconArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingDeliveryMapBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingDownloadAppCannabisBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingEdiblesIconArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingEtobicokeMapBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingExtractsConcentratesIconArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingFlowerIconArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingFooterBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingGoogleBlackButtonArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingLandingHighlightsArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingLandingTitlesArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingLinkedFromArgs = {
  allowedLocales?: Maybe<Array<Maybe<Scalars['String']>>>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingMainCardEastArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingMainCardWestArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingMississaugaMapBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingNorthYorkMapBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingOrderDelivaryBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingOrderMailBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingPhoneBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingPhoneMobileBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingScarboroughMapBkgArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingServiceIconArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingTitleArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingTorontoTextsArgs = {
  locale?: Maybe<Scalars['String']>;
};


/** Content for Totronto landing page [See type definition](https://app.contentful.com/spaces/kn0flse2e6rl/content_types/torontoLanding) */
export type TorontoLandingUnbeatableIconArgs = {
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
};

export type TorontoLandingCollection = {
  items: Array<Maybe<TorontoLanding>>;
  limit: Scalars['Int'];
  skip: Scalars['Int'];
  total: Scalars['Int'];
};

export type TorontoLandingFilter = {
  AND?: Maybe<Array<Maybe<TorontoLandingFilter>>>;
  OR?: Maybe<Array<Maybe<TorontoLandingFilter>>>;
  aboutDeliveryBkg_exists?: Maybe<Scalars['Boolean']>;
  adviceProductBkg_exists?: Maybe<Scalars['Boolean']>;
  appleBlackButton_exists?: Maybe<Scalars['Boolean']>;
  contentfulMetadata?: Maybe<ContentfulMetadataFilter>;
  deliveryIcon_exists?: Maybe<Scalars['Boolean']>;
  deliveryMapBkg_exists?: Maybe<Scalars['Boolean']>;
  downloadAppCannabisBkg_exists?: Maybe<Scalars['Boolean']>;
  ediblesIcon_exists?: Maybe<Scalars['Boolean']>;
  etobicokeMapBkg_exists?: Maybe<Scalars['Boolean']>;
  extractsConcentratesIcon_exists?: Maybe<Scalars['Boolean']>;
  flowerIcon_exists?: Maybe<Scalars['Boolean']>;
  footerBkg_exists?: Maybe<Scalars['Boolean']>;
  googleBlackButton_exists?: Maybe<Scalars['Boolean']>;
  landingHighlights_exists?: Maybe<Scalars['Boolean']>;
  landingTitles_exists?: Maybe<Scalars['Boolean']>;
  mainCardEast_exists?: Maybe<Scalars['Boolean']>;
  mainCardWest_exists?: Maybe<Scalars['Boolean']>;
  mississaugaMapBkg_exists?: Maybe<Scalars['Boolean']>;
  northYorkMapBkg_exists?: Maybe<Scalars['Boolean']>;
  orderDelivaryBkg_exists?: Maybe<Scalars['Boolean']>;
  orderMailBkg_exists?: Maybe<Scalars['Boolean']>;
  phoneBkg_exists?: Maybe<Scalars['Boolean']>;
  phoneMobileBkg_exists?: Maybe<Scalars['Boolean']>;
  scarboroughMapBkg_exists?: Maybe<Scalars['Boolean']>;
  serviceIcon_exists?: Maybe<Scalars['Boolean']>;
  sys?: Maybe<SysFilter>;
  title?: Maybe<Scalars['String']>;
  title_contains?: Maybe<Scalars['String']>;
  title_exists?: Maybe<Scalars['Boolean']>;
  title_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  title_not?: Maybe<Scalars['String']>;
  title_not_contains?: Maybe<Scalars['String']>;
  title_not_in?: Maybe<Array<Maybe<Scalars['String']>>>;
  torontoTexts_exists?: Maybe<Scalars['Boolean']>;
  unbeatableIcon_exists?: Maybe<Scalars['Boolean']>;
};

export type TorontoLandingLinkingCollections = {
  entryCollection?: Maybe<EntryCollection>;
};


export type TorontoLandingLinkingCollectionsEntryCollectionArgs = {
  limit?: Maybe<Scalars['Int']>;
  locale?: Maybe<Scalars['String']>;
  preview?: Maybe<Scalars['Boolean']>;
  skip?: Maybe<Scalars['Int']>;
};

export enum TorontoLandingOrder {
  SysFirstPublishedAtAsc = 'sys_firstPublishedAt_ASC',
  SysFirstPublishedAtDesc = 'sys_firstPublishedAt_DESC',
  SysIdAsc = 'sys_id_ASC',
  SysIdDesc = 'sys_id_DESC',
  SysPublishedAtAsc = 'sys_publishedAt_ASC',
  SysPublishedAtDesc = 'sys_publishedAt_DESC',
  SysPublishedVersionAsc = 'sys_publishedVersion_ASC',
  SysPublishedVersionDesc = 'sys_publishedVersion_DESC'
}

export type BannersQueryVariables = Exact<{ [key: string]: never; }>;


export type BannersQuery = { bannerCollection?: Maybe<{ limit: number, skip: number, total: number, items: Array<Maybe<{ title?: Maybe<string>, shortLink?: Maybe<string>, buttonText?: Maybe<string>, shortDescription?: Maybe<string>, type?: Maybe<string>, plCountryId?: Maybe<number>, businessName?: Maybe<string>, image?: Maybe<{ url?: Maybe<string>, height?: Maybe<number>, width?: Maybe<number> }> }>> }> };

export type CarouselQueryVariables = Exact<{ [key: string]: never; }>;


export type CarouselQuery = { carouselImageCollection?: Maybe<{ limit: number, skip: number, total: number, items: Array<Maybe<{ title?: Maybe<string>, order?: Maybe<number>, url?: Maybe<string>, plCountryId?: Maybe<number>, imageMobile?: Maybe<{ url?: Maybe<string>, height?: Maybe<number>, width?: Maybe<number> }>, image?: Maybe<{ url?: Maybe<string>, height?: Maybe<number>, width?: Maybe<number> }> }>> }> };

export type OurStoryQueryVariables = Exact<{ [key: string]: never; }>;


export type OurStoryQuery = { ourStoryContent?: Maybe<{ title?: Maybe<string>, description?: Maybe<string>, url?: Maybe<string>, button?: Maybe<string>, image?: Maybe<{ url?: Maybe<string> }> }> };

export type YoutubeLinkQueryVariables = Exact<{ [key: string]: never; }>;


export type YoutubeLinkQuery = { socialLink?: Maybe<{ url?: Maybe<string>, title?: Maybe<string> }> };

export type FacebookLinkQueryVariables = Exact<{ [key: string]: never; }>;


export type FacebookLinkQuery = { socialLink?: Maybe<{ url?: Maybe<string>, title?: Maybe<string> }> };

export type InstagramLinkQueryVariables = Exact<{ [key: string]: never; }>;


export type InstagramLinkQuery = { socialLink?: Maybe<{ url?: Maybe<string>, title?: Maybe<string> }> };

export type EmailLinkQueryVariables = Exact<{ [key: string]: never; }>;


export type EmailLinkQuery = { socialLink?: Maybe<{ url?: Maybe<string>, title?: Maybe<string> }> };

export type GooglePlayLinkQueryVariables = Exact<{ [key: string]: never; }>;


export type GooglePlayLinkQuery = { socialLink?: Maybe<{ url?: Maybe<string>, title?: Maybe<string> }> };

export type AppleStoreLinkQueryVariables = Exact<{ [key: string]: never; }>;


export type AppleStoreLinkQuery = { socialLink?: Maybe<{ url?: Maybe<string>, title?: Maybe<string> }> };

export type TermsOfServiceQueryVariables = Exact<{ [key: string]: never; }>;


export type TermsOfServiceQuery = { staticPage?: Maybe<{ title?: Maybe<string>, body?: Maybe<{ json: any }> }> };

export type PrivacyPolicyQueryVariables = Exact<{ [key: string]: never; }>;


export type PrivacyPolicyQuery = { staticPage?: Maybe<{ title?: Maybe<string>, body?: Maybe<{ json: any }> }> };

export type FaqItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type FaqItemsQuery = { faqCollection?: Maybe<{ items: Array<Maybe<{ index?: Maybe<number>, description?: Maybe<string>, title?: Maybe<string> }>> }> };

export type AboutConnectQueryVariables = Exact<{ [key: string]: never; }>;


export type AboutConnectQuery = { aboutItem?: Maybe<{ title?: Maybe<string>, description?: Maybe<string>, image?: Maybe<{ url?: Maybe<string> }> }> };

export type AboutMissionQueryVariables = Exact<{ [key: string]: never; }>;


export type AboutMissionQuery = { aboutItem?: Maybe<{ title?: Maybe<string>, description?: Maybe<string>, image?: Maybe<{ url?: Maybe<string> }> }> };

export type AboutVideoQueryVariables = Exact<{ [key: string]: never; }>;


export type AboutVideoQuery = { aboutVideo?: Maybe<{ title?: Maybe<string>, description?: Maybe<string>, url?: Maybe<string> }> };

export type HomeTopSectionQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeTopSectionQuery = { homeTopSection?: Maybe<{ text?: Maybe<string>, link?: Maybe<string>, highlights?: Maybe<string>, image?: Maybe<{ url?: Maybe<string> }>, imageMobile?: Maybe<{ url?: Maybe<string> }> }>, homeTopSectionCollection?: Maybe<{ limit: number, skip: number, total: number, items: Array<Maybe<{ text?: Maybe<string>, link?: Maybe<string>, plCountryId?: Maybe<number>, highlights?: Maybe<string>, image?: Maybe<{ url?: Maybe<string> }>, imageMobile?: Maybe<{ url?: Maybe<string> }> }>> }> };

export type TorontoLandingQueryVariables = Exact<{ [key: string]: never; }>;


export type TorontoLandingQuery = { torontoLanding?: Maybe<{ title?: Maybe<string>, torontoTexts?: Maybe<any>, landingTitles?: Maybe<any>, landingHighlights?: Maybe<any>, mainCardEast?: Maybe<{ url?: Maybe<string> }>, mainCardWest?: Maybe<{ url?: Maybe<string> }>, etobicokeMapBkg?: Maybe<{ url?: Maybe<string> }>, scarboroughMapBkg?: Maybe<{ url?: Maybe<string> }>, northYorkMapBkg?: Maybe<{ url?: Maybe<string> }>, mississaugaMapBkg?: Maybe<{ url?: Maybe<string> }>, aboutDeliveryBkg?: Maybe<{ url?: Maybe<string> }>, orderDelivaryBkg?: Maybe<{ url?: Maybe<string> }>, deliveryMapBkg?: Maybe<{ url?: Maybe<string> }>, appleBlackButton?: Maybe<{ url?: Maybe<string> }>, googleBlackButton?: Maybe<{ url?: Maybe<string> }>, phoneBkg?: Maybe<{ url?: Maybe<string> }>, phoneMobileBkg?: Maybe<{ url?: Maybe<string> }>, downloadAppCannabisBkg?: Maybe<{ url?: Maybe<string> }>, adviceProductBkg?: Maybe<{ url?: Maybe<string> }>, orderMailBkg?: Maybe<{ url?: Maybe<string> }>, footerBkg?: Maybe<{ url?: Maybe<string> }>, unbeatableIcon?: Maybe<{ url?: Maybe<string> }>, deliveryIcon?: Maybe<{ url?: Maybe<string> }>, serviceIcon?: Maybe<{ url?: Maybe<string> }>, flowerIcon?: Maybe<{ url?: Maybe<string> }>, extractsConcentratesIcon?: Maybe<{ url?: Maybe<string> }>, ediblesIcon?: Maybe<{ url?: Maybe<string> }> }> };

export type NewsQueryVariables = Exact<{ [key: string]: never; }>;


export type NewsQuery = { newsCollection?: Maybe<{ limit: number, skip: number, total: number, items: Array<Maybe<{ title?: Maybe<string>, subTitle?: Maybe<string>, url?: Maybe<string>, iframe?: Maybe<string>, topic?: Maybe<string>, mobileIframe?: Maybe<string>, image?: Maybe<{ url?: Maybe<string>, height?: Maybe<number>, width?: Maybe<number> }> }>> }> };

export type ProductTypeBannersQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductTypeBannersQuery = { productMenuItemCollection?: Maybe<{ limit: number, skip: number, total: number, items: Array<Maybe<{ title?: Maybe<string>, type?: Maybe<string>, url?: Maybe<string>, text?: Maybe<string>, image?: Maybe<{ url?: Maybe<string>, height?: Maybe<number>, width?: Maybe<number> }> }>> }> };

export type ProductTypeHeadersQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductTypeHeadersQuery = { productHeaderCollection?: Maybe<{ limit: number, skip: number, total: number, items: Array<Maybe<{ title?: Maybe<string>, type?: Maybe<string>, text?: Maybe<string>, textUrlMap?: Maybe<any>, backgroundImage?: Maybe<{ url?: Maybe<string>, height?: Maybe<number>, width?: Maybe<number> }> }>> }> };

export type ServiceGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type ServiceGroupsQuery = { serviceGroupCollection?: Maybe<{ limit: number, skip: number, total: number, items: Array<Maybe<{ title?: Maybe<string>, servicesCollection?: Maybe<{ items: Array<Maybe<{ sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } } | { sys: { id: string } }>> }> }>> }> };

export type ServicesQueryVariables = Exact<{
  where?: Maybe<ServiceFilter>;
}>;


export type ServicesQuery = { serviceCollection?: Maybe<{ limit: number, skip: number, total: number, items: Array<Maybe<{ name?: Maybe<string>, description?: Maybe<string>, url?: Maybe<string>, image?: Maybe<{ width?: Maybe<number>, height?: Maybe<number>, url?: Maybe<string> }> }>> }> };


export const BannersDocument = gql`
    query Banners {
  bannerCollection {
    limit
    skip
    total
    items {
      title
      shortLink
      buttonText
      shortDescription
      type
      plCountryId
      businessName
      image {
        url
        height
        width
      }
    }
  }
}
    `;

/**
 * __useBannersQuery__
 *
 * To run a query within a React component, call `useBannersQuery` and pass it any options that fit your needs.
 * When your component renders, `useBannersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBannersQuery({
 *   variables: {
 *   },
 * });
 */
export function useBannersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BannersQuery, BannersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BannersQuery, BannersQueryVariables>(BannersDocument, options);
      }
export function useBannersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BannersQuery, BannersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BannersQuery, BannersQueryVariables>(BannersDocument, options);
        }
export type BannersQueryHookResult = ReturnType<typeof useBannersQuery>;
export type BannersLazyQueryHookResult = ReturnType<typeof useBannersLazyQuery>;
export type BannersQueryResult = ApolloReactCommon.QueryResult<BannersQuery, BannersQueryVariables>;
export const CarouselDocument = gql`
    query Carousel {
  carouselImageCollection(order: [order_ASC]) {
    limit
    skip
    total
    items {
      title
      order
      url
      plCountryId
      imageMobile {
        url
        height
        width
      }
      image {
        url
        height
        width
      }
    }
  }
}
    `;

/**
 * __useCarouselQuery__
 *
 * To run a query within a React component, call `useCarouselQuery` and pass it any options that fit your needs.
 * When your component renders, `useCarouselQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCarouselQuery({
 *   variables: {
 *   },
 * });
 */
export function useCarouselQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CarouselQuery, CarouselQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CarouselQuery, CarouselQueryVariables>(CarouselDocument, options);
      }
export function useCarouselLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CarouselQuery, CarouselQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CarouselQuery, CarouselQueryVariables>(CarouselDocument, options);
        }
export type CarouselQueryHookResult = ReturnType<typeof useCarouselQuery>;
export type CarouselLazyQueryHookResult = ReturnType<typeof useCarouselLazyQuery>;
export type CarouselQueryResult = ApolloReactCommon.QueryResult<CarouselQuery, CarouselQueryVariables>;
export const OurStoryDocument = gql`
    query OurStory {
  ourStoryContent(id: "550uSL8aaiLN1SB3qwRgY0") {
    title
    description
    url
    button
    image {
      url
    }
  }
}
    `;

/**
 * __useOurStoryQuery__
 *
 * To run a query within a React component, call `useOurStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useOurStoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOurStoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useOurStoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OurStoryQuery, OurStoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<OurStoryQuery, OurStoryQueryVariables>(OurStoryDocument, options);
      }
export function useOurStoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OurStoryQuery, OurStoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<OurStoryQuery, OurStoryQueryVariables>(OurStoryDocument, options);
        }
export type OurStoryQueryHookResult = ReturnType<typeof useOurStoryQuery>;
export type OurStoryLazyQueryHookResult = ReturnType<typeof useOurStoryLazyQuery>;
export type OurStoryQueryResult = ApolloReactCommon.QueryResult<OurStoryQuery, OurStoryQueryVariables>;
export const YoutubeLinkDocument = gql`
    query YoutubeLink {
  socialLink(id: "2msYLlK9oc98v4UJ94UnCL") {
    url
    title
  }
}
    `;

/**
 * __useYoutubeLinkQuery__
 *
 * To run a query within a React component, call `useYoutubeLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useYoutubeLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useYoutubeLinkQuery({
 *   variables: {
 *   },
 * });
 */
export function useYoutubeLinkQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<YoutubeLinkQuery, YoutubeLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<YoutubeLinkQuery, YoutubeLinkQueryVariables>(YoutubeLinkDocument, options);
      }
export function useYoutubeLinkLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<YoutubeLinkQuery, YoutubeLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<YoutubeLinkQuery, YoutubeLinkQueryVariables>(YoutubeLinkDocument, options);
        }
export type YoutubeLinkQueryHookResult = ReturnType<typeof useYoutubeLinkQuery>;
export type YoutubeLinkLazyQueryHookResult = ReturnType<typeof useYoutubeLinkLazyQuery>;
export type YoutubeLinkQueryResult = ApolloReactCommon.QueryResult<YoutubeLinkQuery, YoutubeLinkQueryVariables>;
export const FacebookLinkDocument = gql`
    query FacebookLink {
  socialLink(id: "7urpgpzLqjIbQdb89S7Spb") {
    url
    title
  }
}
    `;

/**
 * __useFacebookLinkQuery__
 *
 * To run a query within a React component, call `useFacebookLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useFacebookLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFacebookLinkQuery({
 *   variables: {
 *   },
 * });
 */
export function useFacebookLinkQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FacebookLinkQuery, FacebookLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FacebookLinkQuery, FacebookLinkQueryVariables>(FacebookLinkDocument, options);
      }
export function useFacebookLinkLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FacebookLinkQuery, FacebookLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FacebookLinkQuery, FacebookLinkQueryVariables>(FacebookLinkDocument, options);
        }
export type FacebookLinkQueryHookResult = ReturnType<typeof useFacebookLinkQuery>;
export type FacebookLinkLazyQueryHookResult = ReturnType<typeof useFacebookLinkLazyQuery>;
export type FacebookLinkQueryResult = ApolloReactCommon.QueryResult<FacebookLinkQuery, FacebookLinkQueryVariables>;
export const InstagramLinkDocument = gql`
    query InstagramLink {
  socialLink(id: "1pvUF9wCzZ4LMcUxhFUPhU") {
    url
    title
  }
}
    `;

/**
 * __useInstagramLinkQuery__
 *
 * To run a query within a React component, call `useInstagramLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useInstagramLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInstagramLinkQuery({
 *   variables: {
 *   },
 * });
 */
export function useInstagramLinkQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InstagramLinkQuery, InstagramLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<InstagramLinkQuery, InstagramLinkQueryVariables>(InstagramLinkDocument, options);
      }
export function useInstagramLinkLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InstagramLinkQuery, InstagramLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<InstagramLinkQuery, InstagramLinkQueryVariables>(InstagramLinkDocument, options);
        }
export type InstagramLinkQueryHookResult = ReturnType<typeof useInstagramLinkQuery>;
export type InstagramLinkLazyQueryHookResult = ReturnType<typeof useInstagramLinkLazyQuery>;
export type InstagramLinkQueryResult = ApolloReactCommon.QueryResult<InstagramLinkQuery, InstagramLinkQueryVariables>;
export const EmailLinkDocument = gql`
    query EmailLink {
  socialLink(id: "5h2Pg9uh30dcsufSH6gsWa") {
    url
    title
  }
}
    `;

/**
 * __useEmailLinkQuery__
 *
 * To run a query within a React component, call `useEmailLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmailLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmailLinkQuery({
 *   variables: {
 *   },
 * });
 */
export function useEmailLinkQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EmailLinkQuery, EmailLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<EmailLinkQuery, EmailLinkQueryVariables>(EmailLinkDocument, options);
      }
export function useEmailLinkLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EmailLinkQuery, EmailLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<EmailLinkQuery, EmailLinkQueryVariables>(EmailLinkDocument, options);
        }
export type EmailLinkQueryHookResult = ReturnType<typeof useEmailLinkQuery>;
export type EmailLinkLazyQueryHookResult = ReturnType<typeof useEmailLinkLazyQuery>;
export type EmailLinkQueryResult = ApolloReactCommon.QueryResult<EmailLinkQuery, EmailLinkQueryVariables>;
export const GooglePlayLinkDocument = gql`
    query GooglePlayLink {
  socialLink(id: "2rvQD97xMT8WeNrXjFUxXJ") {
    url
    title
  }
}
    `;

/**
 * __useGooglePlayLinkQuery__
 *
 * To run a query within a React component, call `useGooglePlayLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGooglePlayLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGooglePlayLinkQuery({
 *   variables: {
 *   },
 * });
 */
export function useGooglePlayLinkQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GooglePlayLinkQuery, GooglePlayLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GooglePlayLinkQuery, GooglePlayLinkQueryVariables>(GooglePlayLinkDocument, options);
      }
export function useGooglePlayLinkLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GooglePlayLinkQuery, GooglePlayLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GooglePlayLinkQuery, GooglePlayLinkQueryVariables>(GooglePlayLinkDocument, options);
        }
export type GooglePlayLinkQueryHookResult = ReturnType<typeof useGooglePlayLinkQuery>;
export type GooglePlayLinkLazyQueryHookResult = ReturnType<typeof useGooglePlayLinkLazyQuery>;
export type GooglePlayLinkQueryResult = ApolloReactCommon.QueryResult<GooglePlayLinkQuery, GooglePlayLinkQueryVariables>;
export const AppleStoreLinkDocument = gql`
    query AppleStoreLink {
  socialLink(id: "5koDYMM0j8OnBm4S30dusR") {
    url
    title
  }
}
    `;

/**
 * __useAppleStoreLinkQuery__
 *
 * To run a query within a React component, call `useAppleStoreLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppleStoreLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppleStoreLinkQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppleStoreLinkQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AppleStoreLinkQuery, AppleStoreLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AppleStoreLinkQuery, AppleStoreLinkQueryVariables>(AppleStoreLinkDocument, options);
      }
export function useAppleStoreLinkLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AppleStoreLinkQuery, AppleStoreLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AppleStoreLinkQuery, AppleStoreLinkQueryVariables>(AppleStoreLinkDocument, options);
        }
export type AppleStoreLinkQueryHookResult = ReturnType<typeof useAppleStoreLinkQuery>;
export type AppleStoreLinkLazyQueryHookResult = ReturnType<typeof useAppleStoreLinkLazyQuery>;
export type AppleStoreLinkQueryResult = ApolloReactCommon.QueryResult<AppleStoreLinkQuery, AppleStoreLinkQueryVariables>;
export const TermsOfServiceDocument = gql`
    query TermsOfService {
  staticPage(id: "6BI9WsJoUpiSbX0B6bQqmb") {
    title
    body {
      json
    }
  }
}
    `;

/**
 * __useTermsOfServiceQuery__
 *
 * To run a query within a React component, call `useTermsOfServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useTermsOfServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTermsOfServiceQuery({
 *   variables: {
 *   },
 * });
 */
export function useTermsOfServiceQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TermsOfServiceQuery, TermsOfServiceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<TermsOfServiceQuery, TermsOfServiceQueryVariables>(TermsOfServiceDocument, options);
      }
export function useTermsOfServiceLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TermsOfServiceQuery, TermsOfServiceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<TermsOfServiceQuery, TermsOfServiceQueryVariables>(TermsOfServiceDocument, options);
        }
export type TermsOfServiceQueryHookResult = ReturnType<typeof useTermsOfServiceQuery>;
export type TermsOfServiceLazyQueryHookResult = ReturnType<typeof useTermsOfServiceLazyQuery>;
export type TermsOfServiceQueryResult = ApolloReactCommon.QueryResult<TermsOfServiceQuery, TermsOfServiceQueryVariables>;
export const PrivacyPolicyDocument = gql`
    query PrivacyPolicy {
  staticPage(id: "6EyXHd8I20fqZsJIF5EF4q") {
    title
    body {
      json
    }
  }
}
    `;

/**
 * __usePrivacyPolicyQuery__
 *
 * To run a query within a React component, call `usePrivacyPolicyQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrivacyPolicyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrivacyPolicyQuery({
 *   variables: {
 *   },
 * });
 */
export function usePrivacyPolicyQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PrivacyPolicyQuery, PrivacyPolicyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PrivacyPolicyQuery, PrivacyPolicyQueryVariables>(PrivacyPolicyDocument, options);
      }
export function usePrivacyPolicyLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PrivacyPolicyQuery, PrivacyPolicyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PrivacyPolicyQuery, PrivacyPolicyQueryVariables>(PrivacyPolicyDocument, options);
        }
export type PrivacyPolicyQueryHookResult = ReturnType<typeof usePrivacyPolicyQuery>;
export type PrivacyPolicyLazyQueryHookResult = ReturnType<typeof usePrivacyPolicyLazyQuery>;
export type PrivacyPolicyQueryResult = ApolloReactCommon.QueryResult<PrivacyPolicyQuery, PrivacyPolicyQueryVariables>;
export const FaqItemsDocument = gql`
    query FAQItems {
  faqCollection {
    items {
      index
      description
      title
    }
  }
}
    `;

/**
 * __useFaqItemsQuery__
 *
 * To run a query within a React component, call `useFaqItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFaqItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFaqItemsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFaqItemsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FaqItemsQuery, FaqItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FaqItemsQuery, FaqItemsQueryVariables>(FaqItemsDocument, options);
      }
export function useFaqItemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FaqItemsQuery, FaqItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FaqItemsQuery, FaqItemsQueryVariables>(FaqItemsDocument, options);
        }
export type FaqItemsQueryHookResult = ReturnType<typeof useFaqItemsQuery>;
export type FaqItemsLazyQueryHookResult = ReturnType<typeof useFaqItemsLazyQuery>;
export type FaqItemsQueryResult = ApolloReactCommon.QueryResult<FaqItemsQuery, FaqItemsQueryVariables>;
export const AboutConnectDocument = gql`
    query AboutConnect {
  aboutItem(id: "6IAmifpLOra6Ctnu7dVvId") {
    title
    image {
      url
    }
    description
  }
}
    `;

/**
 * __useAboutConnectQuery__
 *
 * To run a query within a React component, call `useAboutConnectQuery` and pass it any options that fit your needs.
 * When your component renders, `useAboutConnectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAboutConnectQuery({
 *   variables: {
 *   },
 * });
 */
export function useAboutConnectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AboutConnectQuery, AboutConnectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AboutConnectQuery, AboutConnectQueryVariables>(AboutConnectDocument, options);
      }
export function useAboutConnectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AboutConnectQuery, AboutConnectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AboutConnectQuery, AboutConnectQueryVariables>(AboutConnectDocument, options);
        }
export type AboutConnectQueryHookResult = ReturnType<typeof useAboutConnectQuery>;
export type AboutConnectLazyQueryHookResult = ReturnType<typeof useAboutConnectLazyQuery>;
export type AboutConnectQueryResult = ApolloReactCommon.QueryResult<AboutConnectQuery, AboutConnectQueryVariables>;
export const AboutMissionDocument = gql`
    query AboutMission {
  aboutItem(id: "1Ne0djcK7JxdJDQUNqVTRV") {
    title
    image {
      url
    }
    description
  }
}
    `;

/**
 * __useAboutMissionQuery__
 *
 * To run a query within a React component, call `useAboutMissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAboutMissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAboutMissionQuery({
 *   variables: {
 *   },
 * });
 */
export function useAboutMissionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AboutMissionQuery, AboutMissionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AboutMissionQuery, AboutMissionQueryVariables>(AboutMissionDocument, options);
      }
export function useAboutMissionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AboutMissionQuery, AboutMissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AboutMissionQuery, AboutMissionQueryVariables>(AboutMissionDocument, options);
        }
export type AboutMissionQueryHookResult = ReturnType<typeof useAboutMissionQuery>;
export type AboutMissionLazyQueryHookResult = ReturnType<typeof useAboutMissionLazyQuery>;
export type AboutMissionQueryResult = ApolloReactCommon.QueryResult<AboutMissionQuery, AboutMissionQueryVariables>;
export const AboutVideoDocument = gql`
    query AboutVideo {
  aboutVideo(id: "5eEBC8i6tgW47FGOHg4EuM") {
    title
    description
    url
  }
}
    `;

/**
 * __useAboutVideoQuery__
 *
 * To run a query within a React component, call `useAboutVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useAboutVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAboutVideoQuery({
 *   variables: {
 *   },
 * });
 */
export function useAboutVideoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AboutVideoQuery, AboutVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AboutVideoQuery, AboutVideoQueryVariables>(AboutVideoDocument, options);
      }
export function useAboutVideoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AboutVideoQuery, AboutVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AboutVideoQuery, AboutVideoQueryVariables>(AboutVideoDocument, options);
        }
export type AboutVideoQueryHookResult = ReturnType<typeof useAboutVideoQuery>;
export type AboutVideoLazyQueryHookResult = ReturnType<typeof useAboutVideoLazyQuery>;
export type AboutVideoQueryResult = ApolloReactCommon.QueryResult<AboutVideoQuery, AboutVideoQueryVariables>;
export const HomeTopSectionDocument = gql`
    query HomeTopSection {
  homeTopSection(id: "6ps0dzvMFVEX0PnZaEEz2G") {
    text
    image {
      url
    }
    link
    imageMobile {
      url
    }
    highlights
  }
  homeTopSectionCollection {
    limit
    skip
    total
    items {
      text
      image {
        url
      }
      link
      plCountryId
      imageMobile {
        url
      }
      highlights
    }
  }
}
    `;

/**
 * __useHomeTopSectionQuery__
 *
 * To run a query within a React component, call `useHomeTopSectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeTopSectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeTopSectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeTopSectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HomeTopSectionQuery, HomeTopSectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<HomeTopSectionQuery, HomeTopSectionQueryVariables>(HomeTopSectionDocument, options);
      }
export function useHomeTopSectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HomeTopSectionQuery, HomeTopSectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<HomeTopSectionQuery, HomeTopSectionQueryVariables>(HomeTopSectionDocument, options);
        }
export type HomeTopSectionQueryHookResult = ReturnType<typeof useHomeTopSectionQuery>;
export type HomeTopSectionLazyQueryHookResult = ReturnType<typeof useHomeTopSectionLazyQuery>;
export type HomeTopSectionQueryResult = ApolloReactCommon.QueryResult<HomeTopSectionQuery, HomeTopSectionQueryVariables>;
export const TorontoLandingDocument = gql`
    query TorontoLanding {
  torontoLanding(id: "35qeoUVurNM1bwFpdc0EWe") {
    title
    torontoTexts
    landingTitles
    landingHighlights
    mainCardEast {
      url
    }
    mainCardWest {
      url
    }
    etobicokeMapBkg {
      url
    }
    scarboroughMapBkg {
      url
    }
    northYorkMapBkg {
      url
    }
    mississaugaMapBkg {
      url
    }
    aboutDeliveryBkg {
      url
    }
    orderDelivaryBkg {
      url
    }
    deliveryMapBkg {
      url
    }
    appleBlackButton {
      url
    }
    googleBlackButton {
      url
    }
    phoneBkg {
      url
    }
    phoneMobileBkg {
      url
    }
    downloadAppCannabisBkg {
      url
    }
    adviceProductBkg {
      url
    }
    orderMailBkg {
      url
    }
    footerBkg {
      url
    }
    unbeatableIcon {
      url
    }
    deliveryIcon {
      url
    }
    serviceIcon {
      url
    }
    flowerIcon {
      url
    }
    extractsConcentratesIcon {
      url
    }
    ediblesIcon {
      url
    }
  }
}
    `;

/**
 * __useTorontoLandingQuery__
 *
 * To run a query within a React component, call `useTorontoLandingQuery` and pass it any options that fit your needs.
 * When your component renders, `useTorontoLandingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTorontoLandingQuery({
 *   variables: {
 *   },
 * });
 */
export function useTorontoLandingQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TorontoLandingQuery, TorontoLandingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<TorontoLandingQuery, TorontoLandingQueryVariables>(TorontoLandingDocument, options);
      }
export function useTorontoLandingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TorontoLandingQuery, TorontoLandingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<TorontoLandingQuery, TorontoLandingQueryVariables>(TorontoLandingDocument, options);
        }
export type TorontoLandingQueryHookResult = ReturnType<typeof useTorontoLandingQuery>;
export type TorontoLandingLazyQueryHookResult = ReturnType<typeof useTorontoLandingLazyQuery>;
export type TorontoLandingQueryResult = ApolloReactCommon.QueryResult<TorontoLandingQuery, TorontoLandingQueryVariables>;
export const NewsDocument = gql`
    query News {
  newsCollection(order: [sys_firstPublishedAt_ASC]) {
    limit
    skip
    total
    items {
      title
      subTitle
      url
      iframe
      topic
      mobileIframe
      image {
        url
        height
        width
      }
    }
  }
}
    `;

/**
 * __useNewsQuery__
 *
 * To run a query within a React component, call `useNewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NewsQuery, NewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<NewsQuery, NewsQueryVariables>(NewsDocument, options);
      }
export function useNewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NewsQuery, NewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<NewsQuery, NewsQueryVariables>(NewsDocument, options);
        }
export type NewsQueryHookResult = ReturnType<typeof useNewsQuery>;
export type NewsLazyQueryHookResult = ReturnType<typeof useNewsLazyQuery>;
export type NewsQueryResult = ApolloReactCommon.QueryResult<NewsQuery, NewsQueryVariables>;
export const ProductTypeBannersDocument = gql`
    query ProductTypeBanners {
  productMenuItemCollection {
    limit
    skip
    total
    items {
      title
      type
      url
      text
      image {
        url
        height
        width
      }
    }
  }
}
    `;

/**
 * __useProductTypeBannersQuery__
 *
 * To run a query within a React component, call `useProductTypeBannersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductTypeBannersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductTypeBannersQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductTypeBannersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductTypeBannersQuery, ProductTypeBannersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductTypeBannersQuery, ProductTypeBannersQueryVariables>(ProductTypeBannersDocument, options);
      }
export function useProductTypeBannersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductTypeBannersQuery, ProductTypeBannersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductTypeBannersQuery, ProductTypeBannersQueryVariables>(ProductTypeBannersDocument, options);
        }
export type ProductTypeBannersQueryHookResult = ReturnType<typeof useProductTypeBannersQuery>;
export type ProductTypeBannersLazyQueryHookResult = ReturnType<typeof useProductTypeBannersLazyQuery>;
export type ProductTypeBannersQueryResult = ApolloReactCommon.QueryResult<ProductTypeBannersQuery, ProductTypeBannersQueryVariables>;
export const ProductTypeHeadersDocument = gql`
    query ProductTypeHeaders {
  productHeaderCollection {
    limit
    skip
    total
    items {
      title
      type
      text
      textUrlMap
      backgroundImage {
        url
        height
        width
      }
    }
  }
}
    `;

/**
 * __useProductTypeHeadersQuery__
 *
 * To run a query within a React component, call `useProductTypeHeadersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductTypeHeadersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductTypeHeadersQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductTypeHeadersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductTypeHeadersQuery, ProductTypeHeadersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductTypeHeadersQuery, ProductTypeHeadersQueryVariables>(ProductTypeHeadersDocument, options);
      }
export function useProductTypeHeadersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductTypeHeadersQuery, ProductTypeHeadersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductTypeHeadersQuery, ProductTypeHeadersQueryVariables>(ProductTypeHeadersDocument, options);
        }
export type ProductTypeHeadersQueryHookResult = ReturnType<typeof useProductTypeHeadersQuery>;
export type ProductTypeHeadersLazyQueryHookResult = ReturnType<typeof useProductTypeHeadersLazyQuery>;
export type ProductTypeHeadersQueryResult = ApolloReactCommon.QueryResult<ProductTypeHeadersQuery, ProductTypeHeadersQueryVariables>;
export const ServiceGroupsDocument = gql`
    query ServiceGroups {
  serviceGroupCollection(order: [order_ASC]) {
    limit
    skip
    total
    items {
      title
      servicesCollection {
        items {
          sys {
            id
          }
        }
      }
    }
  }
}
    `;

/**
 * __useServiceGroupsQuery__
 *
 * To run a query within a React component, call `useServiceGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useServiceGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServiceGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useServiceGroupsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ServiceGroupsQuery, ServiceGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ServiceGroupsQuery, ServiceGroupsQueryVariables>(ServiceGroupsDocument, options);
      }
export function useServiceGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServiceGroupsQuery, ServiceGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ServiceGroupsQuery, ServiceGroupsQueryVariables>(ServiceGroupsDocument, options);
        }
export type ServiceGroupsQueryHookResult = ReturnType<typeof useServiceGroupsQuery>;
export type ServiceGroupsLazyQueryHookResult = ReturnType<typeof useServiceGroupsLazyQuery>;
export type ServiceGroupsQueryResult = ApolloReactCommon.QueryResult<ServiceGroupsQuery, ServiceGroupsQueryVariables>;
export const ServicesDocument = gql`
    query Services($where: ServiceFilter) {
  serviceCollection(where: $where) {
    limit
    skip
    total
    items {
      name
      image {
        width
        height
        url
      }
      description
      url
    }
  }
}
    `;

/**
 * __useServicesQuery__
 *
 * To run a query within a React component, call `useServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useServicesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, options);
      }
export function useServicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ServicesQuery, ServicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ServicesQuery, ServicesQueryVariables>(ServicesDocument, options);
        }
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesLazyQueryHookResult = ReturnType<typeof useServicesLazyQuery>;
export type ServicesQueryResult = ApolloReactCommon.QueryResult<ServicesQuery, ServicesQueryVariables>;