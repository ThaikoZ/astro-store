/* eslint-disable */
// @ts-nocheck
// This file is auto-generated. Do not edit manually - run `npm run graphql:codegen` to regenerate.

/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { type GraphQLClient, type RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Input for the addCartItems mutation. */
export type AddCartItemsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Cart items to be added */
  items?: InputMaybe<Array<InputMaybe<CartItemInput>>>;
};

/** Input for the addFee mutation. */
export type AddFeeInput = {
  /** Fee amount */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique name for the fee. */
  name: Scalars['String']['input'];
  /** The tax class for the fee if taxable. */
  taxClass?: InputMaybe<TaxClassEnum>;
  /** Is the fee taxable? */
  taxable?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Input for the addMethodToShippingZone mutation. */
export type AddMethodToShippingZoneInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the shipping method is enabled or not. */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the shipping method to add. */
  methodId: Scalars['String']['input'];
  /** The order of the shipping method. */
  order?: InputMaybe<Scalars['Int']['input']>;
  /** The settings for the shipping method. */
  settings?: InputMaybe<Array<InputMaybe<WcSettingInput>>>;
  /** The ID of the shipping zone to delete. */
  zoneId: Scalars['Int']['input'];
};

/** Input for the addToCart mutation. */
export type AddToCartInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** JSON string representation of extra cart item data */
  extraData?: InputMaybe<Scalars['String']['input']>;
  /** Cart item product database ID or global ID */
  productId: Scalars['Int']['input'];
  /** Cart item quantity */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** Cart item product variation attributes */
  variation?: InputMaybe<Array<InputMaybe<ProductAttributeInput>>>;
  /** Cart item product variation database ID or global ID */
  variationId?: InputMaybe<Scalars['Int']['input']>;
};

/** Input for the applyCoupon mutation. */
export type ApplyCouponInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Code of coupon being applied */
  code: Scalars['String']['input'];
};

/** Collection statistic attributes operators */
export type AttributeOperatorEnum =
  | 'AND'
  | 'IN'
  | 'NOT_IN';

/** Content rating filter for user avatars. Determines the maximum maturity level of avatars to display, following standard content rating classifications (G, PG, R, X). */
export type AvatarRatingEnum =
  /** Indicates a G level avatar rating level. */
  | 'G'
  /** Indicates a PG level avatar rating level. */
  | 'PG'
  /** Indicates an R level avatar rating level. */
  | 'R'
  /** Indicates an X level avatar rating level. */
  | 'X';

/** Product backorder enumeration */
export type BackordersEnum =
  | 'NO'
  | 'NOTIFY'
  | 'YES';

/** Cart error type enumeration */
export type CartErrorType =
  | 'INVALID_CART_ITEM'
  | 'INVALID_COUPON'
  | 'INVALID_SHIPPING_METHOD'
  | 'UNKNOWN';

/** Cart item quantity */
export type CartItemInput = {
  /** JSON string representation of extra cart item data */
  extraData?: InputMaybe<Scalars['String']['input']>;
  /** Cart item product database ID or global ID */
  productId: Scalars['Int']['input'];
  /** Cart item quantity */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** Cart item product variation attributes */
  variation?: InputMaybe<Array<InputMaybe<ProductAttributeInput>>>;
  /** Cart item product variation database ID or global ID */
  variationId?: InputMaybe<Scalars['Int']['input']>;
};

/** Cart item quantity */
export type CartItemQuantityInput = {
  /** Cart item being updated */
  key: Scalars['ID']['input'];
  /** Cart item's new quantity */
  quantity: Scalars['Int']['input'];
};

/** Arguments for filtering the CartItemToProductConnection connection */
export type CartItemToProductConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** WooCommerce notice types */
export type CartNoticeTypeEnum =
  /** Error notice */
  | 'ERROR'
  /** General notice */
  | 'NOTICE'
  /** Success notice */
  | 'SUCCESS';

/** Arguments for filtering the CartToCartItemConnection connection */
export type CartToCartItemConnectionWhereArgs = {
  /** Limit results to cart items that require shipping */
  needsShipping?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Product catalog visibility enumeration */
export type CatalogVisibilityEnum =
  | 'CATALOG'
  | 'HIDDEN'
  | 'SEARCH'
  | 'VISIBLE';

/** Identifier types for retrieving a specific Category. Determines which unique property (global ID, database ID, slug, etc.) is used to locate the Category. */
export type CategoryIdType =
  /** The Database ID for the node */
  | 'DATABASE_ID'
  /** The hashed Global ID */
  | 'ID'
  /** The name of the node */
  | 'NAME'
  /** Url friendly name of the node */
  | 'SLUG'
  /** The URI for the node */
  | 'URI';

/** Arguments for filtering the CategoryToCategoryConnection connection */
export type CategoryToCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the CategoryToContentNodeConnection connection */
export type CategoryToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfCategoryEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the CategoryToPostConnection connection */
export type CategoryToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']['input']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the checkout mutation. */
export type CheckoutInput = {
  /** Create new customer account */
  account?: InputMaybe<CreateAccountInput>;
  /** Order billing address */
  billing?: InputMaybe<CustomerAddressInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Source of the order. Useful when WooCommerce is driven from multiple sources. Defaults to "checkout". */
  createdVia?: InputMaybe<Scalars['String']['input']>;
  /** Order customer note */
  customerNote?: InputMaybe<Scalars['String']['input']>;
  /** Fees to add to the order. */
  fees?: InputMaybe<Array<InputMaybe<FeeInput>>>;
  /** Define if the order is paid. It will set the status to processing and reduce stock items. */
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  /** Order meta data */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** Payment method ID. */
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  /** Ship to a separate address */
  shipToDifferentAddress?: InputMaybe<Scalars['Boolean']['input']>;
  /** Order shipping address */
  shipping?: InputMaybe<CustomerAddressInput>;
  /** Order shipping method */
  shippingMethod?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Order transaction ID */
  transactionId?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the clearShippingZoneLocations mutation. */
export type ClearShippingZoneLocationsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The type of location to remove. */
  type?: InputMaybe<ShippingLocationTypeEnum>;
  /** The ID of the shipping zone to delete. */
  zoneId: Scalars['Int']['input'];
};

/** Taxonomy query */
export type CollectionStatsQueryInput = {
  /** Taxonomy relation to query */
  relation?: InputMaybe<RelationEnum>;
  /** Product Taxonomy */
  taxonomy: ProductAttributeEnum;
};

/** Arguments used to filter the collection results */
export type CollectionStatsWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Identifier types for retrieving a specific comment. Specifies which unique attribute is used to find a particular comment. */
export type CommentNodeIdTypeEnum =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID';

/** Moderation state for user comments. Determines whether comments are publicly visible, pending approval, or marked as spam. */
export type CommentStatusEnum =
  /** Comments with the Approved status */
  | 'APPROVE'
  /** Comments with the Unapproved status */
  | 'HOLD'
  /** Comments with the Spam status */
  | 'SPAM'
  /** Comments with the Trash status */
  | 'TRASH';

/** Arguments for filtering the CommentToCommentConnection connection */
export type CommentToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** One or more Comment Statuses to limit results by */
  statusIn?: InputMaybe<Array<InputMaybe<CommentStatusEnum>>>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Arguments for filtering the CommentToParentCommentConnection connection */
export type CommentToParentCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** One or more Comment Statuses to limit results by */
  statusIn?: InputMaybe<Array<InputMaybe<CommentStatusEnum>>>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Sorting attributes for comment collections. Specifies which comment property determines the order of results. */
export type CommentsConnectionOrderbyEnum =
  /** Order by browser user agent of the commenter. */
  | 'COMMENT_AGENT'
  /** Order by approval status of the comment. */
  | 'COMMENT_APPROVED'
  /** Order by name of the comment author. */
  | 'COMMENT_AUTHOR'
  /** Order by e-mail of the comment author. */
  | 'COMMENT_AUTHOR_EMAIL'
  /** Order by IP address of the comment author. */
  | 'COMMENT_AUTHOR_IP'
  /** Order by URL address of the comment author. */
  | 'COMMENT_AUTHOR_URL'
  /** Order by the comment contents. */
  | 'COMMENT_CONTENT'
  /** Chronological ordering by comment submission date. */
  | 'COMMENT_DATE'
  /** Chronological ordering by comment date in UTC/GMT time. */
  | 'COMMENT_DATE_GMT'
  /** Ordering by internal ID (typically reflects creation order). */
  | 'COMMENT_ID'
  /** Preserve custom order of IDs as specified in the query. */
  | 'COMMENT_IN'
  /** Order by the comment karma score. */
  | 'COMMENT_KARMA'
  /** Ordering by parent comment relationship (threaded discussions). */
  | 'COMMENT_PARENT'
  /** Ordering by associated content item ID. */
  | 'COMMENT_POST_ID'
  /** Ordering by comment classification (standard comments, pingbacks, etc.). */
  | 'COMMENT_TYPE'
  /** Ordering by the user account ID associated with the comment as the comment author. */
  | 'USER_ID';

/** Identifier types for retrieving specific content. Determines which property (global ID, database ID, URI) is used to locate content objects. */
export type ContentNodeIdTypeEnum =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID'
  /** Identify a resource by the URI. */
  | 'URI';

/** The templates that can be assigned to content. Used to filter a connection by the template its content uses. */
export type ContentTemplateEnum =
  /** The default template, applied when no specific template is assigned. */
  | 'DEFAULT_TEMPLATE'
  /** The "Page No Title" template. */
  | 'PAGE_NO_TITLE_BLOCK_TEMPLATE';

/** Available content entity types that can be queried or filtered. Identifies the primary content structures available in the system. */
export type ContentTypeEnum =
  /** The Type of Content object */
  | 'ATTACHMENT'
  /** The Type of Content object */
  | 'PAGE'
  /** The Type of Content object */
  | 'POST'
  /** The Type of Content object */
  | 'PRODUCT'
  /** The Type of Content object */
  | 'PRODUCT_VARIATION';

/** Identifier types for retrieving a specific content type definition. Determines whether to look up content types by ID or name. */
export type ContentTypeIdTypeEnum =
  /** The globally unique ID */
  | 'ID'
  /** The name of the content type. */
  | 'NAME';

/** Arguments for filtering the ContentTypeToContentNodeConnection connection */
export type ContentTypeToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Allowed Content Types of the Category taxonomy. */
export type ContentTypesOfCategoryEnum =
  /** The Type of Content object */
  | 'POST';

/** Allowed Content Types of the PostFormat taxonomy. */
export type ContentTypesOfPostFormatEnum =
  /** The Type of Content object */
  | 'POST';

/** Allowed Content Types of the ProductBrand taxonomy. */
export type ContentTypesOfProductBrandEnum =
  /** The Type of Content object */
  | 'PRODUCT';

/** Allowed Content Types of the ProductCategory taxonomy. */
export type ContentTypesOfProductCategoryEnum =
  /** The Type of Content object */
  | 'PRODUCT';

/** Allowed Content Types of the ProductTag taxonomy. */
export type ContentTypesOfProductTagEnum =
  /** The Type of Content object */
  | 'PRODUCT';

/** Allowed Content Types of the ProductType taxonomy. */
export type ContentTypesOfProductTypeEnum =
  /** The Type of Content object */
  | 'PRODUCT';

/** Allowed Content Types of the ShippingClass taxonomy. */
export type ContentTypesOfShippingClassEnum =
  /** The Type of Content object */
  | 'PRODUCT'
  /** The Type of Content object */
  | 'PRODUCT_VARIATION';

/** Allowed Content Types of the Tag taxonomy. */
export type ContentTypesOfTagEnum =
  /** The Type of Content object */
  | 'POST';

/** Allowed Content Types of the VisibleProduct taxonomy. */
export type ContentTypesOfVisibleProductEnum =
  /** The Type of Content object */
  | 'PRODUCT'
  /** The Type of Content object */
  | 'PRODUCT_VARIATION';

/** Countries enumeration */
export type CountriesEnum =
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AQ'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BV'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CU'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GS'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HM'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PN'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TC'
  | 'TD'
  | 'TF'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'UM'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'XK'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW';

/** The Type of Identifier used to fetch a single Coupon. Default is ID. */
export type CouponIdTypeEnum =
  /** Coupon code. */
  | 'CODE'
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID';

/** Arguments for filtering the CouponToCustomerConnection connection */
export type CouponToCustomerConnectionWhereArgs = {
  /** Limit result set to resources with a specific email. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Order of results. */
  order?: InputMaybe<OrderEnum>;
  /** Order results by a specific field. */
  orderby?: InputMaybe<CustomerConnectionOrderbyEnum>;
  /** Limit results to those matching a string. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the CouponToExcludedProductCategoriesConnection connection */
export type CouponToExcludedProductCategoriesConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the CouponToExcludedProductsConnection connection */
export type CouponToExcludedProductsConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Include variations in the result set. */
  includeVariations?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesWithVariationsEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Arguments for filtering the CouponToProductCategoryConnection connection */
export type CouponToProductCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the CouponToProductUnionConnection connection */
export type CouponToProductUnionConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Include variations in the result set. */
  includeVariations?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesWithVariationsEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Customer account credentials */
export type CreateAccountInput = {
  /** Set the current user to the newly created customer after checkout. */
  authenticate?: InputMaybe<Scalars['Boolean']['input']>;
  /** Customer password */
  password: Scalars['String']['input'];
  /** Customer username */
  username: Scalars['String']['input'];
};

/** Input for the createCategory mutation. */
export type CreateCategoryInput = {
  /** The slug that the category will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the category object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the category object to mutate */
  name: Scalars['String']['input'];
  /** The database ID of the category that should be set as the parent. This field cannot be used in conjunction with parentId */
  parentDatabaseId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the category that should be set as the parent. This field cannot be used in conjunction with parentDatabaseId */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createComment mutation. */
export type CreateCommentInput = {
  /** The name of the comment's author. */
  author?: InputMaybe<Scalars['String']['input']>;
  /** The email of the comment's author. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** The url of the comment's author. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The database ID of the post object the comment belongs to. */
  commentOn?: InputMaybe<Scalars['Int']['input']>;
  /** Content of the comment. */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** Parent comment ID of current comment. */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** The approval status of the comment */
  status?: InputMaybe<CommentStatusEnum>;
  /** Type of comment. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createCoupon mutation. */
export type CreateCouponInput = {
  /** The amount of discount. Should always be numeric, even if setting a percentage. */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Coupon code. */
  code: Scalars['String']['input'];
  /** The date the coupon expires, in the site's timezone. */
  dateExpires?: InputMaybe<Scalars['String']['input']>;
  /** The date the coupon expires, as GMT. */
  dateExpiresGmt?: InputMaybe<Scalars['String']['input']>;
  /** Coupon description. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Determines the type of discount that will be applied. */
  discountType?: InputMaybe<DiscountTypeEnum>;
  /** List of email addresses that can use this coupon. */
  emailRestrictions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** If true, this coupon will not be applied to items that have sale prices. */
  excludeSaleItems?: InputMaybe<Scalars['Boolean']['input']>;
  /** List of category IDs the coupon does not apply to. */
  excludedProductCategories?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** List of product IDs the coupon cannot be used on. */
  excludedProductIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** If true and if the free shipping method requires a coupon, this coupon will enable free shipping. */
  freeShipping?: InputMaybe<Scalars['Boolean']['input']>;
  /** If true, the coupon can only be used individually. Other applied coupons will be removed from the cart. */
  individualUse?: InputMaybe<Scalars['Boolean']['input']>;
  /** Max number of items in the cart the coupon can be applied to. */
  limitUsageToXItems?: InputMaybe<Scalars['Int']['input']>;
  /** Maximum order amount allowed when using the coupon. */
  maximumAmount?: InputMaybe<Scalars['String']['input']>;
  /** Meta data. */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** Minimum order amount that needs to be in the cart before coupon applies. */
  minimumAmount?: InputMaybe<Scalars['String']['input']>;
  /** List of category IDs the coupon applies to. */
  productCategories?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** List of product IDs the coupon can be used on. */
  productIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** How many times the coupon can be used in total. */
  usageLimit?: InputMaybe<Scalars['Int']['input']>;
  /** How many times the coupon can be used per customer. */
  usageLimitPerUser?: InputMaybe<Scalars['Int']['input']>;
};

/** Input for the createMediaItem mutation. */
export type CreateMediaItemInput = {
  /** Alternative text to display when mediaItem is not displayed */
  altText?: InputMaybe<Scalars['String']['input']>;
  /** The userId to assign as the author of the mediaItem */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** The caption for the mediaItem */
  caption?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The comment status for the mediaItem */
  commentStatus?: InputMaybe<Scalars['String']['input']>;
  /** The date of the mediaItem */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The date (in GMT zone) of the mediaItem */
  dateGmt?: InputMaybe<Scalars['String']['input']>;
  /** Description of the mediaItem */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The file name of the mediaItem */
  filePath?: InputMaybe<Scalars['String']['input']>;
  /** The file type of the mediaItem */
  fileType?: InputMaybe<MimeTypeEnum>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** The ping status for the mediaItem */
  pingStatus?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the mediaItem */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the mediaItem */
  status?: InputMaybe<MediaItemStatusEnum>;
  /** The title of the mediaItem */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createOrder mutation. */
export type CreateOrderInput = {
  /** Order billing address */
  billing?: InputMaybe<CustomerAddressInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Coupons codes to be applied to order */
  coupons?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Source of the order. Useful when WooCommerce is driven from multiple sources. Defaults to "graphql-api". */
  createdVia?: InputMaybe<Scalars['String']['input']>;
  /** Currency the order was created with, in ISO format. */
  currency?: InputMaybe<CurrencyEnum>;
  /** Order customer ID */
  customerId?: InputMaybe<Scalars['Int']['input']>;
  /** Note left by customer during checkout. */
  customerNote?: InputMaybe<Scalars['String']['input']>;
  /** Order shipping lines */
  feeLines?: InputMaybe<Array<InputMaybe<FeeLineInput>>>;
  /** Define if the order is paid. It will set the status to processing and reduce stock items. */
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  /** Order line items */
  lineItems?: InputMaybe<Array<InputMaybe<LineItemInput>>>;
  /** Order meta data */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** Parent order ID. */
  parentId?: InputMaybe<Scalars['Int']['input']>;
  /** Payment method ID. */
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  /** Payment method title. */
  paymentMethodTitle?: InputMaybe<Scalars['String']['input']>;
  /** Order shipping address */
  shipping?: InputMaybe<CustomerAddressInput>;
  /** Order shipping lines */
  shippingLines?: InputMaybe<Array<InputMaybe<ShippingLineInput>>>;
  /** Order status */
  status?: InputMaybe<OrderStatusEnum>;
  /** Order transaction ID */
  transactionId?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createOrderNote mutation. */
export type CreateOrderNoteInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Shows/define if the note is only for reference or for the customer (the user will be notified). */
  isCustomerNote?: InputMaybe<Scalars['Boolean']['input']>;
  /** Order note. */
  note?: InputMaybe<Scalars['String']['input']>;
  /** Database ID or global ID of the order */
  orderId?: InputMaybe<Scalars['ID']['input']>;
};

/** Input for the createPage mutation. */
export type CreatePageInput = {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars['String']['input']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createPostFormat mutation. */
export type CreatePostFormatInput = {
  /** The slug that the post_format will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the post_format object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the post_format object to mutate */
  name: Scalars['String']['input'];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createPost mutation. */
export type CreatePostInput = {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** Set connections between the post and categories */
  categories?: InputMaybe<PostCategoriesInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars['String']['input']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The excerpt of the object */
  excerpt?: InputMaybe<Scalars['String']['input']>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The ping status for the object */
  pingStatus?: InputMaybe<Scalars['String']['input']>;
  /** URLs that have been pinged. */
  pinged?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Set connections between the post and postFormats */
  postFormats?: InputMaybe<PostPostFormatsInput>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** Set connections between the post and tags */
  tags?: InputMaybe<PostTagsInput>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
  /** URLs queued to be pinged. */
  toPing?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Input for the createProductAttribute mutation. */
export type CreateProductAttributeInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the attribute has archives. */
  hasArchives?: InputMaybe<Scalars['Boolean']['input']>;
  /** Name of the attribute. */
  name: Scalars['String']['input'];
  /** Order by which the attribute should be sorted. */
  orderBy?: InputMaybe<Scalars['String']['input']>;
  /** Slug of the attribute. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Type of the attribute. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createProductAttributeTerm mutation. */
export type CreateProductAttributeTermInput = {
  /** The ID of the attribute to which the term belongs. */
  attributeId: Scalars['Int']['input'];
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the term. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The order of the term in the menu. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The name of the term. */
  name: Scalars['String']['input'];
  /** The slug of the term. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createProductBrand mutation. */
export type CreateProductBrandInput = {
  /** The slug that the product_brand will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the product_brand object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the product_brand object to mutate */
  name: Scalars['String']['input'];
  /** The database ID of the product_brand that should be set as the parent. This field cannot be used in conjunction with parentId */
  parentDatabaseId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the product_brand that should be set as the parent. This field cannot be used in conjunction with parentDatabaseId */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createProductCategory mutation. */
export type CreateProductCategoryInput = {
  /** The slug that the product_cat will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the product_cat object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Category archive display type. */
  display?: InputMaybe<ProductCategoryDisplay>;
  /** The ID of an image attachment to associate with the category. */
  imageId?: InputMaybe<Scalars['ID']['input']>;
  /** Menu order, used to custom sort the category. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The name of the product_cat object to mutate */
  name: Scalars['String']['input'];
  /** The database ID of the product_cat that should be set as the parent. This field cannot be used in conjunction with parentId */
  parentDatabaseId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the product_cat that should be set as the parent. This field cannot be used in conjunction with parentDatabaseId */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createProduct mutation. */
export type CreateProductInput = {
  /** Product attributes. */
  attributes?: InputMaybe<Array<InputMaybe<ProductAttributesInput>>>;
  /** Backorders. */
  backorders?: InputMaybe<BackordersEnum>;
  /** Product button text. (External products only) */
  buttonText?: InputMaybe<Scalars['String']['input']>;
  /** Catalog visibility. */
  catalogVisibility?: InputMaybe<CatalogVisibilityEnum>;
  /** Product categories. */
  categories?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Cross-sell product IDs. */
  crossSellIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Product sale start date. */
  dateOnSaleFrom?: InputMaybe<Scalars['String']['input']>;
  /** Product sale end date. */
  dateOnSaleTo?: InputMaybe<Scalars['String']['input']>;
  /** Product default attributes. */
  defaultAttributes?: InputMaybe<Array<InputMaybe<ProductAttributeInput>>>;
  /** Product description. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Product dimensions. */
  dimensions?: InputMaybe<ProductDimensionsInput>;
  /** Number of days until download access expires. */
  downloadExpiry?: InputMaybe<Scalars['Int']['input']>;
  /** Product download limit. */
  downloadLimit?: InputMaybe<Scalars['Int']['input']>;
  /** Product downloadable. */
  downloadable?: InputMaybe<Scalars['Boolean']['input']>;
  /** Product downloads. */
  downloads?: InputMaybe<Array<InputMaybe<ProductDownloadInput>>>;
  /** Product external URL. (External products only) */
  externalUrl?: InputMaybe<Scalars['String']['input']>;
  /** Featured product. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Grouped product IDs. */
  groupedProducts?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Product images. */
  images?: InputMaybe<Array<InputMaybe<ProductImageInput>>>;
  /** Manage stock. */
  manageStock?: InputMaybe<Scalars['Boolean']['input']>;
  /** Menu order. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Meta data. */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** Name of the product. */
  name: Scalars['String']['input'];
  /** Parent product ID. */
  parentId?: InputMaybe<Scalars['Int']['input']>;
  /** Purchase note. */
  purchaseNote?: InputMaybe<Scalars['String']['input']>;
  /** Product regular price. */
  regularPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Allow reviews. Default is true */
  reviewsAllowed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Product sale price. */
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  /** Shipping class. */
  shippingClass?: InputMaybe<Scalars['String']['input']>;
  /** Product short description. */
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  /** Product SKU. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Product slug. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Sold individually. */
  soldIndividually?: InputMaybe<Scalars['Boolean']['input']>;
  /** Status of the product. */
  status?: InputMaybe<PostStatusEnum>;
  /** Stock quantity. */
  stockQuantity?: InputMaybe<Scalars['Int']['input']>;
  /** Stock status. */
  stockStatus?: InputMaybe<StockStatusEnum>;
  /** Product tags. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Tax class. */
  taxClass?: InputMaybe<TaxClassEnum>;
  /** Tax status. */
  taxStatus?: InputMaybe<TaxStatusEnum>;
  /** Type of the product. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Upsell product IDs. */
  upsellIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Product virtual. */
  virtual?: InputMaybe<Scalars['Boolean']['input']>;
  /** Product weight. */
  weight?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createProductTag mutation. */
export type CreateProductTagInput = {
  /** The slug that the product_tag will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the product_tag object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the product_tag object to mutate */
  name: Scalars['String']['input'];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createProductType mutation. */
export type CreateProductTypeInput = {
  /** The slug that the product_type will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the product_type object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the product_type object to mutate */
  name: Scalars['String']['input'];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createProductVariation mutation. */
export type CreateProductVariationInput = {
  /** Attributes of the product variation. */
  attributes?: InputMaybe<Array<InputMaybe<ProductAttributeInput>>>;
  /** Backorder status. */
  backorders?: InputMaybe<BackordersEnum>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Start date of sale price. */
  dateOnSaleFrom?: InputMaybe<Scalars['String']['input']>;
  /** End date of sale price. */
  dateOnSaleTo?: InputMaybe<Scalars['String']['input']>;
  /** Description of the product variation. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Dimensions of the product variation. */
  dimensions?: InputMaybe<ProductDimensionsInput>;
  /** Number of days until the download expires. */
  downloadExpiry?: InputMaybe<Scalars['Int']['input']>;
  /** Number of times downloadable files can be downloaded. */
  downloadLimit?: InputMaybe<Scalars['Int']['input']>;
  /** Whether the product variation is downloadable. */
  downloadable?: InputMaybe<Scalars['Boolean']['input']>;
  /** Downloadable files. */
  downloads?: InputMaybe<Array<InputMaybe<ProductDownloadInput>>>;
  /** Image of the product variation. */
  image?: InputMaybe<ProductImageInput>;
  /** Whether to manage stock. Either "yes", "no", or "parent". */
  manageStock?: InputMaybe<Scalars['String']['input']>;
  /** Menu order of the product variation. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Meta data of the product variation. */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** Unique identifier for the product. */
  productId: Scalars['ID']['input'];
  /** Regular price of the product variation. */
  regularPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Sale price of the product variation. */
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  /** Shipping class of the product variation. */
  shippingClass?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Stock quantity. */
  stockQuantity?: InputMaybe<Scalars['Int']['input']>;
  /** Stock status of the product variation. */
  stockStatus?: InputMaybe<StockStatusEnum>;
  /** Tax class of the product variation. */
  taxClass?: InputMaybe<Scalars['String']['input']>;
  /** Tax status of the product variation. */
  taxStatus?: InputMaybe<TaxStatusEnum>;
  /** Whether the product variation is virtual. */
  virtual?: InputMaybe<Scalars['Boolean']['input']>;
  /** Is product variation public? */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
  /** Weight of the product variation. */
  weight?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createRefund mutation. */
export type CreateRefundInput = {
  /** Refund amount. */
  amount: Scalars['String']['input'];
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Meta data. */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** The ID of the order to refund. */
  orderId: Scalars['Int']['input'];
  /** Reason for refund. */
  reason?: InputMaybe<Scalars['String']['input']>;
  /** When true, the payment gateway API is used to generate the refund. */
  refundPayment?: InputMaybe<Scalars['Boolean']['input']>;
  /** When true, refunded items are restocked. */
  restockItems?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Input for the createShippingClass mutation. */
export type CreateShippingClassInput = {
  /** The slug that the product_shipping_class will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the product_shipping_class object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the product_shipping_class object to mutate */
  name: Scalars['String']['input'];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createShippingZone mutation. */
export type CreateShippingZoneInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Name of the shipping zone. */
  name: Scalars['String']['input'];
  /** Order of the shipping zone. */
  order?: InputMaybe<Scalars['Int']['input']>;
};

/** Input for the createTag mutation. */
export type CreateTagInput = {
  /** The slug that the post_tag will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the post_tag object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the post_tag object to mutate */
  name: Scalars['String']['input'];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createTaxClass mutation. */
export type CreateTaxClassInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Name of the tax class. */
  name: Scalars['String']['input'];
  /** Slug of the tax class. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createTaxRate mutation. */
export type CreateTaxRateInput = {
  /** Cities for the tax rate. */
  cities?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Tax rate class. */
  class?: InputMaybe<TaxClassEnum>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the tax rate is compound. */
  compound?: InputMaybe<Scalars['Boolean']['input']>;
  /** Country code for the tax rate. */
  country?: InputMaybe<Scalars['String']['input']>;
  /** Tax rate name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Tax rate order. */
  order?: InputMaybe<Scalars['Int']['input']>;
  /** Postcodes for the tax rate. */
  postcodes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Tax rate priority. */
  priority?: InputMaybe<Scalars['Int']['input']>;
  /** Tax rate. */
  rate?: InputMaybe<Scalars['String']['input']>;
  /** Whether the tax rate is applied to shipping. */
  shipping?: InputMaybe<Scalars['Boolean']['input']>;
  /** State code for the tax rate. */
  state?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createUser mutation. */
export type CreateUserInput = {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The user's first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars['String']['input']>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** User's locale. */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars['String']['input']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** If true, this will refresh the users JWT secret. */
  refreshJwtUserSecret?: InputMaybe<Scalars['Boolean']['input']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars['String']['input']>;
  /** If true, this will revoke the users JWT secret. If false, this will unrevoke the JWT secret AND issue a new one. To revoke, the user must have proper capabilities to edit users JWT secrets. */
  revokeJwtUserSecret?: InputMaybe<Scalars['Boolean']['input']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars['String']['input']>;
  /** An array of roles to be assigned to the user. */
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** A string that contains the user's username for logging in. */
  username: Scalars['String']['input'];
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the createVisibleProduct mutation. */
export type CreateVisibleProductInput = {
  /** The slug that the product_visibility will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the product_visibility object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The name of the product_visibility object to mutate */
  name: Scalars['String']['input'];
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Currencies enumeration */
export type CurrencyEnum =
  /** United Arab Emirates dirham */
  | 'AED'
  /** Afghan afghani */
  | 'AFN'
  /** Albanian lek */
  | 'ALL'
  /** Armenian dram */
  | 'AMD'
  /** Netherlands Antillean guilder */
  | 'ANG'
  /** Angolan kwanza */
  | 'AOA'
  /** Argentine peso */
  | 'ARS'
  /** Australian dollar */
  | 'AUD'
  /** Aruban florin */
  | 'AWG'
  /** Azerbaijani manat */
  | 'AZN'
  /** Bosnia and Herzegovina convertible mark */
  | 'BAM'
  /** Barbadian dollar */
  | 'BBD'
  /** Bangladeshi taka */
  | 'BDT'
  /** Bulgarian lev */
  | 'BGN'
  /** Bahraini dinar */
  | 'BHD'
  /** Burundian franc */
  | 'BIF'
  /** Bermudian dollar */
  | 'BMD'
  /** Brunei dollar */
  | 'BND'
  /** Bolivian boliviano */
  | 'BOB'
  /** Brazilian real */
  | 'BRL'
  /** Bahamian dollar */
  | 'BSD'
  /** Bitcoin */
  | 'BTC'
  /** Bhutanese ngultrum */
  | 'BTN'
  /** Botswana pula */
  | 'BWP'
  /** Belarusian ruble */
  | 'BYN'
  /** Belarusian ruble (old) */
  | 'BYR'
  /** Belize dollar */
  | 'BZD'
  /** Canadian dollar */
  | 'CAD'
  /** Congolese franc */
  | 'CDF'
  /** Swiss franc */
  | 'CHF'
  /** Chilean peso */
  | 'CLP'
  /** Chinese yuan */
  | 'CNY'
  /** Colombian peso */
  | 'COP'
  /** Costa Rican col&oacute;n */
  | 'CRC'
  /** Cuban convertible peso */
  | 'CUC'
  /** Cuban peso */
  | 'CUP'
  /** Cape Verdean escudo */
  | 'CVE'
  /** Czech koruna */
  | 'CZK'
  /** Djiboutian franc */
  | 'DJF'
  /** Danish krone */
  | 'DKK'
  /** Dominican peso */
  | 'DOP'
  /** Algerian dinar */
  | 'DZD'
  /** Egyptian pound */
  | 'EGP'
  /** Eritrean nakfa */
  | 'ERN'
  /** Ethiopian birr */
  | 'ETB'
  /** Euro */
  | 'EUR'
  /** Fijian dollar */
  | 'FJD'
  /** Falkland Islands pound */
  | 'FKP'
  /** Pound sterling */
  | 'GBP'
  /** Georgian lari */
  | 'GEL'
  /** Guernsey pound */
  | 'GGP'
  /** Ghana cedi */
  | 'GHS'
  /** Gibraltar pound */
  | 'GIP'
  /** Gambian dalasi */
  | 'GMD'
  /** Guinean franc */
  | 'GNF'
  /** Guatemalan quetzal */
  | 'GTQ'
  /** Guyanese dollar */
  | 'GYD'
  /** Hong Kong dollar */
  | 'HKD'
  /** Honduran lempira */
  | 'HNL'
  /** Croatian kuna */
  | 'HRK'
  /** Haitian gourde */
  | 'HTG'
  /** Hungarian forint */
  | 'HUF'
  /** Indonesian rupiah */
  | 'IDR'
  /** Israeli new shekel */
  | 'ILS'
  /** Manx pound */
  | 'IMP'
  /** Indian rupee */
  | 'INR'
  /** Iraqi dinar */
  | 'IQD'
  /** Iranian rial */
  | 'IRR'
  /** Iranian toman */
  | 'IRT'
  /** Icelandic kr&oacute;na */
  | 'ISK'
  /** Jersey pound */
  | 'JEP'
  /** Jamaican dollar */
  | 'JMD'
  /** Jordanian dinar */
  | 'JOD'
  /** Japanese yen */
  | 'JPY'
  /** Kenyan shilling */
  | 'KES'
  /** Kyrgyzstani som */
  | 'KGS'
  /** Cambodian riel */
  | 'KHR'
  /** Comorian franc */
  | 'KMF'
  /** North Korean won */
  | 'KPW'
  /** South Korean won */
  | 'KRW'
  /** Kuwaiti dinar */
  | 'KWD'
  /** Cayman Islands dollar */
  | 'KYD'
  /** Kazakhstani tenge */
  | 'KZT'
  /** Lao kip */
  | 'LAK'
  /** Lebanese pound */
  | 'LBP'
  /** Sri Lankan rupee */
  | 'LKR'
  /** Liberian dollar */
  | 'LRD'
  /** Lesotho loti */
  | 'LSL'
  /** Libyan dinar */
  | 'LYD'
  /** Moroccan dirham */
  | 'MAD'
  /** Moldovan leu */
  | 'MDL'
  /** Malagasy ariary */
  | 'MGA'
  /** Macedonian denar */
  | 'MKD'
  /** Burmese kyat */
  | 'MMK'
  /** Mongolian t&ouml;gr&ouml;g */
  | 'MNT'
  /** Macanese pataca */
  | 'MOP'
  /** Mauritanian ouguiya */
  | 'MRU'
  /** Mauritian rupee */
  | 'MUR'
  /** Maldivian rufiyaa */
  | 'MVR'
  /** Malawian kwacha */
  | 'MWK'
  /** Mexican peso */
  | 'MXN'
  /** Malaysian ringgit */
  | 'MYR'
  /** Mozambican metical */
  | 'MZN'
  /** Namibian dollar */
  | 'NAD'
  /** Nigerian naira */
  | 'NGN'
  /** Nicaraguan c&oacute;rdoba */
  | 'NIO'
  /** Norwegian krone */
  | 'NOK'
  /** Nepalese rupee */
  | 'NPR'
  /** New Zealand dollar */
  | 'NZD'
  /** Omani rial */
  | 'OMR'
  /** Panamanian balboa */
  | 'PAB'
  /** Sol */
  | 'PEN'
  /** Papua New Guinean kina */
  | 'PGK'
  /** Philippine peso */
  | 'PHP'
  /** Pakistani rupee */
  | 'PKR'
  /** Polish z&#x142;oty */
  | 'PLN'
  /** Transnistrian ruble */
  | 'PRB'
  /** Paraguayan guaran&iacute; */
  | 'PYG'
  /** Qatari riyal */
  | 'QAR'
  /** Romanian leu */
  | 'RON'
  /** Serbian dinar */
  | 'RSD'
  /** Russian ruble */
  | 'RUB'
  /** Rwandan franc */
  | 'RWF'
  /** Saudi riyal */
  | 'SAR'
  /** Solomon Islands dollar */
  | 'SBD'
  /** Seychellois rupee */
  | 'SCR'
  /** Sudanese pound */
  | 'SDG'
  /** Swedish krona */
  | 'SEK'
  /** Singapore dollar */
  | 'SGD'
  /** Saint Helena pound */
  | 'SHP'
  /** Sierra Leonean leone */
  | 'SLL'
  /** Somali shilling */
  | 'SOS'
  /** Surinamese dollar */
  | 'SRD'
  /** South Sudanese pound */
  | 'SSP'
  /** S&atilde;o Tom&eacute; and Pr&iacute;ncipe dobra */
  | 'STN'
  /** Syrian pound */
  | 'SYP'
  /** Swazi lilangeni */
  | 'SZL'
  /** Thai baht */
  | 'THB'
  /** Tajikistani somoni */
  | 'TJS'
  /** Turkmenistan manat */
  | 'TMT'
  /** Tunisian dinar */
  | 'TND'
  /** Tongan pa&#x2bb;anga */
  | 'TOP'
  /** Turkish lira */
  | 'TRY'
  /** Trinidad and Tobago dollar */
  | 'TTD'
  /** New Taiwan dollar */
  | 'TWD'
  /** Tanzanian shilling */
  | 'TZS'
  /** Ukrainian hryvnia */
  | 'UAH'
  /** Ugandan shilling */
  | 'UGX'
  /** United States (US) dollar */
  | 'USD'
  /** Uruguayan peso */
  | 'UYU'
  /** Uzbekistani som */
  | 'UZS'
  /** Venezuelan bol&iacute;var (2008–2018) */
  | 'VEF'
  /** Venezuelan bol&iacute;var */
  | 'VES'
  /** Vietnamese &#x111;&#x1ed3;ng */
  | 'VND'
  /** Vanuatu vatu */
  | 'VUV'
  /** Samoan t&#x101;l&#x101; */
  | 'WST'
  /** Central African CFA franc */
  | 'XAF'
  /** East Caribbean dollar */
  | 'XCD'
  /** West African CFA franc */
  | 'XOF'
  /** CFP franc */
  | 'XPF'
  /** Yemeni rial */
  | 'YER'
  /** South African rand */
  | 'ZAR'
  /** Zambian kwacha */
  | 'ZMW';

/** Customer address information */
export type CustomerAddressInput = {
  /** Address 1 */
  address1?: InputMaybe<Scalars['String']['input']>;
  /** Address 2 */
  address2?: InputMaybe<Scalars['String']['input']>;
  /** City */
  city?: InputMaybe<Scalars['String']['input']>;
  /** Company */
  company?: InputMaybe<Scalars['String']['input']>;
  /** Country */
  country?: InputMaybe<CountriesEnum>;
  /** E-mail */
  email?: InputMaybe<Scalars['String']['input']>;
  /** First name */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** Last name */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** Clear old address data */
  overwrite?: InputMaybe<Scalars['Boolean']['input']>;
  /** Phone */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** Zip Postal Code */
  postcode?: InputMaybe<Scalars['String']['input']>;
  /** State */
  state?: InputMaybe<Scalars['String']['input']>;
};

/** Field to order the connection by */
export type CustomerConnectionOrderbyEnum =
  /** Order by customer email */
  | 'EMAIL'
  /** Order by customer ID */
  | 'ID'
  /** Order by include field */
  | 'INCLUDE'
  /** Order by customer display name */
  | 'NAME'
  /** Order by customer registration date */
  | 'REGISTERED_DATE'
  /** Order by customer username */
  | 'USERNAME';

/** Arguments for filtering the CustomerToDownloadableItemConnection connection */
export type CustomerToDownloadableItemConnectionWhereArgs = {
  /** Limit results to downloadable items that can be downloaded now. */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit results to downloadable items that are expired. */
  expired?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit results to downloadable items that have downloads remaining. */
  hasDownloadsRemaining?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the CustomerToOrderConnection connection */
export type CustomerToOrderConnectionWhereArgs = {
  /** Limit result set to orders assigned a specific billing email. */
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to orders assigned a specific customer. */
  customerId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to orders assigned a specific group of customers. */
  customersIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<OrdersOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to orders assigned a specific product. */
  productId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit results to those matching a string. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to orders assigned a specific status. */
  statuses?: InputMaybe<Array<InputMaybe<OrderStatusEnum>>>;
};

/** Arguments for filtering the CustomerToRefundConnection connection */
export type CustomerToRefundConnectionWhereArgs = {
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to refunds from a specific group of order IDs. */
  orderIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostTypeOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit results to those matching a string. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to refunds assigned a specific status. */
  statuses?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Date values */
export type DateInput = {
  /** Day of the month (from 1 to 31) */
  day?: InputMaybe<Scalars['Int']['input']>;
  /** Hour of the day (from 0 to 23) */
  hour?: InputMaybe<Scalars['Int']['input']>;
  /** Minute of the hour (from 0 to 59) */
  minute?: InputMaybe<Scalars['Int']['input']>;
  /** Month number (from 1 to 12) */
  month?: InputMaybe<Scalars['Int']['input']>;
  /** Second of the minute (from 0 to 59) */
  second?: InputMaybe<Scalars['Int']['input']>;
  /** 4 digit year (e.g. 2017) */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** Filter the connection based on input */
export type DateQueryInput = {
  /** Nodes should be returned after this date */
  after?: InputMaybe<DateInput>;
  /** Nodes should be returned before this date */
  before?: InputMaybe<DateInput>;
  /** Column to query against */
  column?: InputMaybe<PostObjectsConnectionDateColumnEnum>;
  /** For after/before, whether exact value should be matched or not */
  compare?: InputMaybe<Scalars['String']['input']>;
  /** Day of the month (from 1 to 31) */
  day?: InputMaybe<Scalars['Int']['input']>;
  /** Hour (from 0 to 23) */
  hour?: InputMaybe<Scalars['Int']['input']>;
  /** For after/before, whether exact value should be matched or not */
  inclusive?: InputMaybe<Scalars['Boolean']['input']>;
  /** Minute (from 0 to 59) */
  minute?: InputMaybe<Scalars['Int']['input']>;
  /** Month number (from 1 to 12) */
  month?: InputMaybe<Scalars['Int']['input']>;
  /** OR or AND, how the sub-arrays should be compared */
  relation?: InputMaybe<RelationEnum>;
  /** Second (0 to 59) */
  second?: InputMaybe<Scalars['Int']['input']>;
  /** Week of the year (from 0 to 53) */
  week?: InputMaybe<Scalars['Int']['input']>;
  /** 4 digit year (e.g. 2017) */
  year?: InputMaybe<Scalars['Int']['input']>;
};

/** Input for the deleteCategory mutation. */
export type DeleteCategoryInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the category to delete */
  id: Scalars['ID']['input'];
};

/** Input for the deleteComment mutation. */
export type DeleteCommentInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the comment should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The deleted comment ID */
  id: Scalars['ID']['input'];
};

/** Input for the deleteCoupon mutation. */
export type DeleteCouponInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Delete the object. Set to "false" by default. */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Unique identifier for the object. */
  id: Scalars['ID']['input'];
};

/** Input for the deleteMediaItem mutation. */
export type DeleteMediaItemInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the mediaItem should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the mediaItem to delete */
  id: Scalars['ID']['input'];
};

/** Input for the deleteOrder mutation. */
export type DeleteOrderInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Delete or simply place in trash. */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** Database ID or global ID of the order */
  id?: InputMaybe<Scalars['ID']['input']>;
};

/** Input for the deleteOrderItems mutation. */
export type DeleteOrderItemsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Database ID or global ID of the order */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** ID Order items being deleted */
  itemIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

/** Input for the deleteOrderNote mutation. */
export type DeleteOrderNoteInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Delete or simply place in trash. */
  force?: InputMaybe<Scalars['Boolean']['input']>;
  /** Database ID or global ID of the order note */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Database ID or global ID of the order */
  orderId?: InputMaybe<Scalars['ID']['input']>;
};

/** Input for the deletePage mutation. */
export type DeletePageInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the page to delete */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Input for the deletePaymentMethod mutation. */
export type DeletePaymentMethodInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Token ID of the payment token being deleted. */
  tokenId: Scalars['Int']['input'];
};

/** Input for the deletePostFormat mutation. */
export type DeletePostFormatInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the postFormat to delete */
  id: Scalars['ID']['input'];
};

/** Input for the deletePost mutation. */
export type DeletePostInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the object should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the post to delete */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Input for the deleteProductAttribute mutation. */
export type DeleteProductAttributeInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier for the product. */
  id: Scalars['ID']['input'];
};

/** Input for the deleteProductAttributeTerm mutation. */
export type DeleteProductAttributeTermInput = {
  /** The ID of the attribute to which the term belongs. */
  attributeId: Scalars['Int']['input'];
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the term to update. */
  id: Scalars['Int']['input'];
};

/** Input for the deleteProductBrand mutation. */
export type DeleteProductBrandInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the productBrand to delete */
  id: Scalars['ID']['input'];
};

/** Input for the deleteProductCategory mutation. */
export type DeleteProductCategoryInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the productCategory to delete */
  id: Scalars['ID']['input'];
};

/** Input for the deleteProduct mutation. */
export type DeleteProductInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether to bypass trash and force deletion. */
  force?: InputMaybe<Scalars['Boolean']['input']>;
  /** Unique identifier for the product. */
  id: Scalars['ID']['input'];
};

/** Input for the deleteProductTag mutation. */
export type DeleteProductTagInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the productTag to delete */
  id: Scalars['ID']['input'];
};

/** Input for the deleteProductType mutation. */
export type DeleteProductTypeInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the productType to delete */
  id: Scalars['ID']['input'];
};

/** Input for the deleteProductVariation mutation. */
export type DeleteProductVariationInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether to bypass trash and force deletion. */
  force?: InputMaybe<Scalars['Boolean']['input']>;
  /** Unique identifier for the product. */
  id: Scalars['ID']['input'];
};

/** Input for the deleteRefund mutation. */
export type DeleteRefundInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Force delete the refund. Defaults to true. */
  force?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the refund to delete. */
  id: Scalars['ID']['input'];
};

/** Input for the deleteReview mutation. */
export type DeleteReviewInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the product review should be force deleted instead of being moved to the trash */
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  /** The ID of the target product review */
  id: Scalars['ID']['input'];
};

/** Input for the deleteShippingClass mutation. */
export type DeleteShippingClassInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the shippingClass to delete */
  id: Scalars['ID']['input'];
};

/** Input for the deleteShippingZone mutation. */
export type DeleteShippingZoneInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the shipping zone to delete. */
  id: Scalars['Int']['input'];
};

/** Input for the deleteTag mutation. */
export type DeleteTagInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the tag to delete */
  id: Scalars['ID']['input'];
};

/** Input for the deleteTaxClass mutation. */
export type DeleteTaxClassInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Slug of the tax class. */
  slug: Scalars['String']['input'];
};

/** Input for the deleteTaxRate mutation. */
export type DeleteTaxRateInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the tax rate to update. */
  id: Scalars['Int']['input'];
};

/** Input for the deleteUser mutation. */
export type DeleteUserInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the user you want to delete */
  id: Scalars['ID']['input'];
  /** Reassign posts and links to new User ID. */
  reassignId?: InputMaybe<Scalars['ID']['input']>;
};

/** Input for the deleteVisibleProduct mutation. */
export type DeleteVisibleProductInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the visibleProduct to delete */
  id: Scalars['ID']['input'];
};

/** Coupon discount type enumeration */
export type DiscountTypeEnum =
  /** Fixed cart discount */
  | 'FIXED_CART'
  /** Fixed product discount */
  | 'FIXED_PRODUCT'
  /** Percentage discount */
  | 'PERCENT';

/** Input for the emptyCart mutation. */
export type EmptyCartInput = {
  clearPersistentCart?: InputMaybe<Scalars['Boolean']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** Fee line data. */
export type FeeInput = {
  /** Fee amount */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** Unique name for the fee. */
  name: Scalars['String']['input'];
  /** The tax class for the fee if taxable. */
  taxClass?: InputMaybe<TaxClassEnum>;
  /** Is the fee taxable? */
  taxable?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Fee line data. */
export type FeeLineInput = {
  /** Fee amount. */
  amount?: InputMaybe<Scalars['String']['input']>;
  /** Fee Line ID */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Fee name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Tax class of fee. */
  taxClass?: InputMaybe<TaxClassEnum>;
  /** Tax status of fee. */
  taxStatus?: InputMaybe<TaxStatusEnum>;
  /** Line total (after discounts). */
  total?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the fillCart mutation. */
export type FillCartInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Coupons to be applied to the cart */
  coupons?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Cart items to be added */
  items?: InputMaybe<Array<InputMaybe<CartItemInput>>>;
  /** Shipping methods to be used. */
  shippingMethods?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Input for the forgetSession mutation. */
export type ForgetSessionInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the GlobalProductAttributeToTermNodeConnection connection */
export type GlobalProductAttributeToTermNodeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<ProductAttributesConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the GroupProductToProductUnionConnection connection */
export type GroupProductToProductUnionConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Include variations in the result set. */
  includeVariations?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesWithVariationsEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Arguments for filtering the HierarchicalContentNodeToContentNodeAncestorsConnection connection */
export type HierarchicalContentNodeToContentNodeAncestorsConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the HierarchicalContentNodeToContentNodeChildrenConnection connection */
export type HierarchicalContentNodeToContentNodeChildrenConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Meta data. */
export type LineItemInput = {
  /** Line Item ID */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Meta data. */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** Line name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Product ID. */
  productId?: InputMaybe<Scalars['Int']['input']>;
  /** Quantity ordered. */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** Product SKU. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Line subtotal (before discounts). */
  subtotal?: InputMaybe<Scalars['String']['input']>;
  /** Tax class of product. */
  taxClass?: InputMaybe<TaxClassEnum>;
  /** Line total (after discounts). */
  total?: InputMaybe<Scalars['String']['input']>;
  /** Variation ID, if applicable. */
  variationId?: InputMaybe<Scalars['Int']['input']>;
};

/** Arguments for filtering the LineItemToProductConnection connection */
export type LineItemToProductConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Input for the login mutation. */
export type LoginInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The plain-text password for the user logging in. */
  password: Scalars['String']['input'];
  /** The username used for login. Typically a unique or email address depending on specific configuration */
  username: Scalars['String']['input'];
};

/** Product manage stock enumeration */
export type ManageStockEnum =
  | 'FALSE'
  | 'PARENT'
  | 'TRUE';

/** Identifier types for retrieving a specific MediaItem. Specifies which unique attribute is used to find an exact MediaItem. */
export type MediaItemIdType =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID'
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  | 'SLUG'
  /** Identify a media item by its source url */
  | 'SOURCE_URL'
  /** Identify a resource by the URI. */
  | 'URI';

/** Predefined image size variations. Represents the standard image dimensions available for media assets. */
export type MediaItemSizeEnum =
  /** Large image preview suitable for detail views. (1024x1024) */
  | 'LARGE'
  /** Medium image preview typically suitable for listings and detail views. (300x300) */
  | 'MEDIUM'
  /** Medium-to-large image preview suitable for listings and detail views. (768x0) */
  | 'MEDIUM_LARGE'
  /** Small image preview suitable for thumbnails and listings. (150x150) */
  | 'THUMBNAIL'
  /** Custom Image Size. (100x100) */
  | 'WOOCOMMERCE_GALLERY_THUMBNAIL'
  /** Custom Image Size. (600x0) */
  | 'WOOCOMMERCE_SINGLE'
  /** Custom Image Size. (300x300) */
  | 'WOOCOMMERCE_THUMBNAIL'
  /** Custom Image Size. (1536x1536) */
  | '_1536X1536'
  /** Custom Image Size. (2048x2048) */
  | '_2048X2048';

/** Publication status for media items. Controls whether media is publicly accessible, private, or in another state. */
export type MediaItemStatusEnum =
  /** Automatically created media that has not been finalized */
  | 'AUTO_DRAFT'
  /** Media that inherits its publication status from the parent content */
  | 'INHERIT'
  /** Media visible only to users with appropriate permissions */
  | 'PRIVATE'
  /** Media marked for deletion but still recoverable */
  | 'TRASH';

/** Arguments for filtering the MediaItemToCommentConnection connection */
export type MediaItemToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** One or more Comment Statuses to limit results by */
  statusIn?: InputMaybe<Array<InputMaybe<CommentStatusEnum>>>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Identifier types for retrieving a specific menu item. Determines whether to look up menu items by global ID or database ID. */
export type MenuItemNodeIdTypeEnum =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID';

/** Arguments for filtering the MenuItemToMenuItemConnection connection */
export type MenuItemToMenuItemConnectionWhereArgs = {
  /** The database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the parent menu object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

/** Designated areas where navigation menus can be displayed. Represents the named regions in the interface where menus can be assigned. */
export type MenuLocationEnum =
  /** Empty menu location */
  | 'EMPTY';

/** Identifier types for retrieving a specific navigation menu. Specifies which property (ID, name, location) is used to locate a particular menu. */
export type MenuNodeIdTypeEnum =
  /** Identify a menu node by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a menu node by the (hashed) Global ID. */
  | 'ID'
  /** Identify a menu node by the slug of menu location to which it is assigned */
  | 'LOCATION'
  /** Identify a menu node by its name */
  | 'NAME'
  /** Identify a menu node by its slug */
  | 'SLUG';

/** Arguments for filtering the MenuToMenuItemConnection connection */
export type MenuToMenuItemConnectionWhereArgs = {
  /** The database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the parent menu object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

/** Meta data. */
export type MetaDataInput = {
  /** Meta ID. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Meta key. */
  key: Scalars['String']['input'];
  /** Meta value. */
  value: Scalars['String']['input'];
};

/** Media file type classification based on MIME standards. Used to identify and filter media items by their format and content type. */
export type MimeTypeEnum =
  /** application/java mime type. */
  | 'APPLICATION_JAVA'
  /** application/msword mime type. */
  | 'APPLICATION_MSWORD'
  /** application/octet-stream mime type. */
  | 'APPLICATION_OCTET_STREAM'
  /** application/onenote mime type. */
  | 'APPLICATION_ONENOTE'
  /** application/oxps mime type. */
  | 'APPLICATION_OXPS'
  /** application/pdf mime type. */
  | 'APPLICATION_PDF'
  /** application/rar mime type. */
  | 'APPLICATION_RAR'
  /** application/rtf mime type. */
  | 'APPLICATION_RTF'
  /** application/ttaf+xml mime type. */
  | 'APPLICATION_TTAF_XML'
  /** application/vnd.apple.keynote mime type. */
  | 'APPLICATION_VND_APPLE_KEYNOTE'
  /** application/vnd.apple.numbers mime type. */
  | 'APPLICATION_VND_APPLE_NUMBERS'
  /** application/vnd.apple.pages mime type. */
  | 'APPLICATION_VND_APPLE_PAGES'
  /** application/vnd.ms-access mime type. */
  | 'APPLICATION_VND_MS_ACCESS'
  /** application/vnd.ms-excel mime type. */
  | 'APPLICATION_VND_MS_EXCEL'
  /** application/vnd.ms-excel.addin.macroEnabled.12 mime type. */
  | 'APPLICATION_VND_MS_EXCEL_ADDIN_MACROENABLED_12'
  /** application/vnd.ms-excel.sheet.binary.macroEnabled.12 mime type. */
  | 'APPLICATION_VND_MS_EXCEL_SHEET_BINARY_MACROENABLED_12'
  /** application/vnd.ms-excel.sheet.macroEnabled.12 mime type. */
  | 'APPLICATION_VND_MS_EXCEL_SHEET_MACROENABLED_12'
  /** application/vnd.ms-excel.template.macroEnabled.12 mime type. */
  | 'APPLICATION_VND_MS_EXCEL_TEMPLATE_MACROENABLED_12'
  /** application/vnd.ms-powerpoint mime type. */
  | 'APPLICATION_VND_MS_POWERPOINT'
  /** application/vnd.ms-powerpoint.addin.macroEnabled.12 mime type. */
  | 'APPLICATION_VND_MS_POWERPOINT_ADDIN_MACROENABLED_12'
  /** application/vnd.ms-powerpoint.presentation.macroEnabled.12 mime type. */
  | 'APPLICATION_VND_MS_POWERPOINT_PRESENTATION_MACROENABLED_12'
  /** application/vnd.ms-powerpoint.slideshow.macroEnabled.12 mime type. */
  | 'APPLICATION_VND_MS_POWERPOINT_SLIDESHOW_MACROENABLED_12'
  /** application/vnd.ms-powerpoint.slide.macroEnabled.12 mime type. */
  | 'APPLICATION_VND_MS_POWERPOINT_SLIDE_MACROENABLED_12'
  /** application/vnd.ms-powerpoint.template.macroEnabled.12 mime type. */
  | 'APPLICATION_VND_MS_POWERPOINT_TEMPLATE_MACROENABLED_12'
  /** application/vnd.ms-project mime type. */
  | 'APPLICATION_VND_MS_PROJECT'
  /** application/vnd.ms-word.document.macroEnabled.12 mime type. */
  | 'APPLICATION_VND_MS_WORD_DOCUMENT_MACROENABLED_12'
  /** application/vnd.ms-word.template.macroEnabled.12 mime type. */
  | 'APPLICATION_VND_MS_WORD_TEMPLATE_MACROENABLED_12'
  /** application/vnd.ms-write mime type. */
  | 'APPLICATION_VND_MS_WRITE'
  /** application/vnd.ms-xpsdocument mime type. */
  | 'APPLICATION_VND_MS_XPSDOCUMENT'
  /** application/vnd.oasis.opendocument.chart mime type. */
  | 'APPLICATION_VND_OASIS_OPENDOCUMENT_CHART'
  /** application/vnd.oasis.opendocument.database mime type. */
  | 'APPLICATION_VND_OASIS_OPENDOCUMENT_DATABASE'
  /** application/vnd.oasis.opendocument.formula mime type. */
  | 'APPLICATION_VND_OASIS_OPENDOCUMENT_FORMULA'
  /** application/vnd.oasis.opendocument.graphics mime type. */
  | 'APPLICATION_VND_OASIS_OPENDOCUMENT_GRAPHICS'
  /** application/vnd.oasis.opendocument.presentation mime type. */
  | 'APPLICATION_VND_OASIS_OPENDOCUMENT_PRESENTATION'
  /** application/vnd.oasis.opendocument.spreadsheet mime type. */
  | 'APPLICATION_VND_OASIS_OPENDOCUMENT_SPREADSHEET'
  /** application/vnd.oasis.opendocument.text mime type. */
  | 'APPLICATION_VND_OASIS_OPENDOCUMENT_TEXT'
  /** application/vnd.openxmlformats-officedocument.presentationml.presentation mime type. */
  | 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_PRESENTATION'
  /** application/vnd.openxmlformats-officedocument.presentationml.slide mime type. */
  | 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDE'
  /** application/vnd.openxmlformats-officedocument.presentationml.slideshow mime type. */
  | 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_SLIDESHOW'
  /** application/vnd.openxmlformats-officedocument.presentationml.template mime type. */
  | 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_PRESENTATIONML_TEMPLATE'
  /** application/vnd.openxmlformats-officedocument.spreadsheetml.sheet mime type. */
  | 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_SHEET'
  /** application/vnd.openxmlformats-officedocument.spreadsheetml.template mime type. */
  | 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_SPREADSHEETML_TEMPLATE'
  /** application/vnd.openxmlformats-officedocument.wordprocessingml.document mime type. */
  | 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT'
  /** application/vnd.openxmlformats-officedocument.wordprocessingml.template mime type. */
  | 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_TEMPLATE'
  /** application/wordperfect mime type. */
  | 'APPLICATION_WORDPERFECT'
  /** application/x-7z-compressed mime type. */
  | 'APPLICATION_X_7Z_COMPRESSED'
  /** application/x-gzip mime type. */
  | 'APPLICATION_X_GZIP'
  /** application/x-tar mime type. */
  | 'APPLICATION_X_TAR'
  /** application/zip mime type. */
  | 'APPLICATION_ZIP'
  /** audio/aac mime type. */
  | 'AUDIO_AAC'
  /** audio/flac mime type. */
  | 'AUDIO_FLAC'
  /** audio/midi mime type. */
  | 'AUDIO_MIDI'
  /** audio/mpeg mime type. */
  | 'AUDIO_MPEG'
  /** audio/ogg mime type. */
  | 'AUDIO_OGG'
  /** audio/wav mime type. */
  | 'AUDIO_WAV'
  /** audio/x-matroska mime type. */
  | 'AUDIO_X_MATROSKA'
  /** audio/x-ms-wax mime type. */
  | 'AUDIO_X_MS_WAX'
  /** audio/x-ms-wma mime type. */
  | 'AUDIO_X_MS_WMA'
  /** audio/x-realaudio mime type. */
  | 'AUDIO_X_REALAUDIO'
  /** image/avif mime type. */
  | 'IMAGE_AVIF'
  /** image/bmp mime type. */
  | 'IMAGE_BMP'
  /** image/gif mime type. */
  | 'IMAGE_GIF'
  /** image/heic mime type. */
  | 'IMAGE_HEIC'
  /** image/heic-sequence mime type. */
  | 'IMAGE_HEIC_SEQUENCE'
  /** image/heif mime type. */
  | 'IMAGE_HEIF'
  /** image/heif-sequence mime type. */
  | 'IMAGE_HEIF_SEQUENCE'
  /** image/jpeg mime type. */
  | 'IMAGE_JPEG'
  /** image/png mime type. */
  | 'IMAGE_PNG'
  /** image/tiff mime type. */
  | 'IMAGE_TIFF'
  /** image/webp mime type. */
  | 'IMAGE_WEBP'
  /** image/x-icon mime type. */
  | 'IMAGE_X_ICON'
  /** text/calendar mime type. */
  | 'TEXT_CALENDAR'
  /** text/css mime type. */
  | 'TEXT_CSS'
  /** text/csv mime type. */
  | 'TEXT_CSV'
  /** text/plain mime type. */
  | 'TEXT_PLAIN'
  /** text/richtext mime type. */
  | 'TEXT_RICHTEXT'
  /** text/tab-separated-values mime type. */
  | 'TEXT_TAB_SEPARATED_VALUES'
  /** text/vtt mime type. */
  | 'TEXT_VTT'
  /** video/3gpp mime type. */
  | 'VIDEO_3GPP'
  /** video/3gpp2 mime type. */
  | 'VIDEO_3GPP2'
  /** video/avi mime type. */
  | 'VIDEO_AVI'
  /** video/divx mime type. */
  | 'VIDEO_DIVX'
  /** video/mp4 mime type. */
  | 'VIDEO_MP4'
  /** video/mpeg mime type. */
  | 'VIDEO_MPEG'
  /** video/ogg mime type. */
  | 'VIDEO_OGG'
  /** video/quicktime mime type. */
  | 'VIDEO_QUICKTIME'
  /** video/webm mime type. */
  | 'VIDEO_WEBM'
  /** video/x-flv mime type. */
  | 'VIDEO_X_FLV'
  /** video/x-matroska mime type. */
  | 'VIDEO_X_MATROSKA'
  /** video/x-ms-asf mime type. */
  | 'VIDEO_X_MS_ASF'
  /** video/x-ms-wm mime type. */
  | 'VIDEO_X_MS_WM'
  /** video/x-ms-wmv mime type. */
  | 'VIDEO_X_MS_WMV'
  /** video/x-ms-wmx mime type. */
  | 'VIDEO_X_MS_WMX';

/** Sort direction for ordered results. Determines whether items are returned in ascending or descending order. */
export type OrderEnum =
  /** Results ordered from lowest to highest values (i.e. A-Z, oldest-newest) */
  | 'ASC'
  /** Results ordered from highest to lowest values (i.e. Z-A, newest-oldest) */
  | 'DESC';

/** The Type of Identifier used to fetch a single Order. Default is ID. */
export type OrderIdTypeEnum =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID'
  /** Order key. */
  | 'ORDER_KEY';

/** Order status enumeration */
export type OrderStatusEnum =
  /** Cancelled */
  | 'CANCELLED'
  /** Draft */
  | 'CHECKOUT_DRAFT'
  /** Completed */
  | 'COMPLETED'
  /** Failed */
  | 'FAILED'
  /** On hold */
  | 'ON_HOLD'
  /** Pending payment */
  | 'PENDING'
  /** Processing */
  | 'PROCESSING'
  /** Refunded */
  | 'REFUNDED';

/** Arguments for filtering the OrderToDownloadableItemConnection connection */
export type OrderToDownloadableItemConnectionWhereArgs = {
  /** Limit results to downloadable items that can be downloaded now. */
  active?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit results to downloadable items that are expired. */
  expired?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit results to downloadable items that have downloads remaining. */
  hasDownloadsRemaining?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the OrderToOrderNoteConnection connection */
export type OrderToOrderNoteConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** One or more Comment Statuses to limit results by */
  statusIn?: InputMaybe<Array<InputMaybe<CommentStatusEnum>>>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Arguments for filtering the OrderToRefundConnection connection */
export type OrderToRefundConnectionWhereArgs = {
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to refunds from a specific group of order IDs. */
  orderIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostTypeOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit results to those matching a string. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to refunds assigned a specific status. */
  statuses?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Fields to order the Orders connection by */
export type OrdersOrderByEnum =
  /** Order by publish date */
  | 'DATE'
  /** Order by date the order was completed */
  | 'DATE_COMPLETED'
  /** Order by date the order was paid */
  | 'DATE_PAID'
  /** Order by order discount amount */
  | 'DISCOUNT'
  /** Preserve the ID order given in the IN array */
  | 'IN'
  /** Order by the menu order value */
  | 'MENU_ORDER'
  /** Order by last modified date */
  | 'MODIFIED'
  /** Order by name */
  | 'NAME'
  /** Preserve slug order given in the NAME_IN array */
  | 'NAME_IN'
  /** Order by order key */
  | 'ORDER_KEY'
  /** Order by parent ID */
  | 'PARENT'
  /** Order by slug */
  | 'SLUG'
  /** Order by order total */
  | 'TAX'
  /** Order by order total */
  | 'TOTAL';

/** Options for ordering the connection */
export type OrdersOrderbyInput = {
  field: OrdersOrderByEnum;
  order?: InputMaybe<OrderEnum>;
};

/** Identifier types for retrieving a specific Page. Specifies which unique attribute is used to find an exact Page. */
export type PageIdType =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID'
  /** Identify a resource by the URI. */
  | 'URI';

/** Arguments for filtering the PageToCommentConnection connection */
export type PageToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** One or more Comment Statuses to limit results by */
  statusIn?: InputMaybe<Array<InputMaybe<CommentStatusEnum>>>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Arguments for filtering the PageToRevisionConnection connection */
export type PageToRevisionConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Operational status of a plugin. Indicates whether a plugin is active, inactive, or in another state that affects its functionality. */
export type PluginStatusEnum =
  /** The plugin is currently active. */
  | 'ACTIVE'
  /** The plugin is a drop-in plugin. */
  | 'DROP_IN'
  /** The plugin is currently inactive. */
  | 'INACTIVE'
  /** The plugin is a must-use plugin. */
  | 'MUST_USE'
  /** The plugin is technically active but was paused while loading. */
  | 'PAUSED'
  /** The plugin was active recently. */
  | 'RECENTLY_ACTIVE'
  /** The plugin has an upgrade available. */
  | 'UPGRADE';

/** Set relationships between the post to categories */
export type PostCategoriesInput = {
  /** If true, this will append the category to existing related categories. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars['Boolean']['input']>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<PostCategoriesNodeInput>>>;
};

/** List of categories to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export type PostCategoriesNodeInput = {
  /** The description of the category. This field is used to set a description of the category if a new one is created during the mutation. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the category. If present, this will be used to connect to the post. If no existing category exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** The name of the category. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the category. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Identifier types for retrieving a specific PostFormat. Determines which unique property (global ID, database ID, slug, etc.) is used to locate the PostFormat. */
export type PostFormatIdType =
  /** The Database ID for the node */
  | 'DATABASE_ID'
  /** The hashed Global ID */
  | 'ID'
  /** The name of the node */
  | 'NAME'
  /** Url friendly name of the node */
  | 'SLUG'
  /** The URI for the node */
  | 'URI';

/** Arguments for filtering the PostFormatToContentNodeConnection connection */
export type PostFormatToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfPostFormatEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the PostFormatToPostConnection connection */
export type PostFormatToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']['input']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Identifier types for retrieving a specific Post. Specifies which unique attribute is used to find an exact Post. */
export type PostIdType =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID'
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  | 'SLUG'
  /** Identify a resource by the URI. */
  | 'URI';

/** Content field rendering options. Determines whether content fields are returned as raw data or with applied formatting and transformations. Default is RENDERED. */
export type PostObjectFieldFormatEnum =
  /** Unprocessed content exactly as stored in the database, requires appropriate permissions. */
  | 'RAW'
  /** Content with all formatting and transformations applied, ready for display. */
  | 'RENDERED';

/** Date field selectors for content filtering. Specifies which date attribute (creation date, modification date) should be used for date-based queries. */
export type PostObjectsConnectionDateColumnEnum =
  /** The date the comment was created in local time. */
  | 'DATE'
  /** The most recent modification date of the comment. */
  | 'MODIFIED';

/** Content sorting attributes for post-type objects. Identifies which content property should be used to determine result order. */
export type PostObjectsConnectionOrderbyEnum =
  /** Ordering by content author (typically by author name). */
  | 'AUTHOR'
  /** Ordering by popularity based on number of comments. */
  | 'COMMENT_COUNT'
  /** Chronological ordering by publication date. */
  | 'DATE'
  /** Maintain custom order of IDs exactly as specified in the query with the IN field. */
  | 'IN'
  /** Ordering by manually defined sort position. */
  | 'MENU_ORDER'
  /** Chronological ordering by modified date. */
  | 'MODIFIED'
  /** Maintain custom order of IDs exactly as specified in the query with the NAME_IN field. */
  | 'NAME_IN'
  /** Ordering by parent-child relationship in hierarchical content. */
  | 'PARENT'
  /** Alphabetical ordering by URL-friendly name. */
  | 'SLUG'
  /** Alphabetical ordering by content title */
  | 'TITLE';

/** Options for ordering the connection */
export type PostObjectsConnectionOrderbyInput = {
  /** The field to order the connection by */
  field: PostObjectsConnectionOrderbyEnum;
  /** Possible directions in which to order a list of items */
  order: OrderEnum;
};

/** Set relationships between the post to postFormats */
export type PostPostFormatsInput = {
  /** If true, this will append the postFormat to existing related postFormats. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars['Boolean']['input']>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<PostPostFormatsNodeInput>>>;
};

/** List of postFormats to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export type PostPostFormatsNodeInput = {
  /** The description of the postFormat. This field is used to set a description of the postFormat if a new one is created during the mutation. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the postFormat. If present, this will be used to connect to the post. If no existing postFormat exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** The name of the postFormat. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the postFormat. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Publishing status that controls the visibility and editorial state of content. Determines whether content is published, pending review, in draft state, or private. */
export type PostStatusEnum =
  /** Automatically saved content that has not been manually saved */
  | 'AUTO_DRAFT'
  /** Content that is saved but not yet published or visible to the public */
  | 'DRAFT'
  /** Objects with the future status */
  | 'FUTURE'
  /** Content that inherits its status from a parent object */
  | 'INHERIT'
  /** Content awaiting review before publication */
  | 'PENDING'
  /** Content only visible to authorized users with appropriate permissions */
  | 'PRIVATE'
  /** Content that is publicly visible to all visitors */
  | 'PUBLISH'
  /** Objects with the request-completed status */
  | 'REQUEST_COMPLETED'
  /** Objects with the request-confirmed status */
  | 'REQUEST_CONFIRMED'
  /** Objects with the request-failed status */
  | 'REQUEST_FAILED'
  /** Objects with the request-pending status */
  | 'REQUEST_PENDING'
  /** Content marked for deletion but still recoverable */
  | 'TRASH'
  /** Objects with the wc-cancelled status */
  | 'WC_CANCELLED'
  /** Objects with the wc-checkout-draft status */
  | 'WC_CHECKOUT_DRAFT'
  /** Objects with the wc-completed status */
  | 'WC_COMPLETED'
  /** Objects with the wc-failed status */
  | 'WC_FAILED'
  /** Objects with the wc-on-hold status */
  | 'WC_ON_HOLD'
  /** Objects with the wc-pending status */
  | 'WC_PENDING'
  /** Objects with the wc-processing status */
  | 'WC_PROCESSING'
  /** Objects with the wc-refunded status */
  | 'WC_REFUNDED';

/** Set relationships between the post to tags */
export type PostTagsInput = {
  /** If true, this will append the tag to existing related tags. If false, this will replace existing relationships. Default true. */
  append?: InputMaybe<Scalars['Boolean']['input']>;
  /** The input list of items to set. */
  nodes?: InputMaybe<Array<InputMaybe<PostTagsNodeInput>>>;
};

/** List of tags to connect the post to. If an ID is set, it will be used to create the connection. If not, it will look for a slug. If neither are valid existing terms, and the site is configured to allow terms to be created during post mutations, a term will be created using the Name if it exists in the input, then fallback to the slug if it exists. */
export type PostTagsNodeInput = {
  /** The description of the tag. This field is used to set a description of the tag if a new one is created during the mutation. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the tag. If present, this will be used to connect to the post. If no existing tag exists with this ID, no connection will be made. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** The name of the tag. This field is used to create a new term, if term creation is enabled in nested mutations, and if one does not already exist with the provided slug or ID or if a slug or ID is not provided. If no name is included and a term is created, the creation will fallback to the slug field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the tag. If no ID is present, this field will be used to make a connection. If no existing term exists with this slug, this field will be used as a fallback to the Name field when creating a new term to connect to, if term creation is enabled as a nested mutation. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the PostToCategoryConnection connection */
export type PostToCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the PostToCommentConnection connection */
export type PostToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** One or more Comment Statuses to limit results by */
  statusIn?: InputMaybe<Array<InputMaybe<CommentStatusEnum>>>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Arguments for filtering the PostToPostFormatConnection connection */
export type PostToPostFormatConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the PostToRevisionConnection connection */
export type PostToRevisionConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']['input']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the PostToTagConnection connection */
export type PostToTagConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the PostToTermNodeConnection connection */
export type PostToTermNodeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: InputMaybe<Array<InputMaybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Fields to order the PostType connection by */
export type PostTypeOrderByEnum =
  /** Order by publish date */
  | 'DATE'
  /** Preserve the ID order given in the IN array */
  | 'IN'
  /** Order by the menu order value */
  | 'MENU_ORDER'
  /** Order by last modified date */
  | 'MODIFIED'
  /** Order by name */
  | 'NAME'
  /** Preserve slug order given in the NAME_IN array */
  | 'NAME_IN'
  /** Order by parent ID */
  | 'PARENT'
  /** Order by slug */
  | 'SLUG';

/** Options for ordering the connection */
export type PostTypeOrderbyInput = {
  field: PostTypeOrderByEnum;
  order?: InputMaybe<OrderEnum>;
};

/** Pricing field format enumeration */
export type PricingFieldFormatEnum =
  | 'FORMATTED'
  | 'RAW';

/** Product attribute taxonomies */
export type ProductAttributeEnum =
  | 'NONE';

/** Product filter */
export type ProductAttributeFilterInput = {
  /** A list of term ids */
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Filter operation type */
  operator?: InputMaybe<AttributeOperatorEnum>;
  /** Which field to select taxonomy term by. */
  taxonomy: ProductAttributeEnum;
  /** A list of term slugs */
  terms?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Options for ordering the connection */
export type ProductAttributeInput = {
  attributeName: Scalars['String']['input'];
  attributeValue?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

/** Product filter */
export type ProductAttributeQueryInput = {
  /** Limit result set to products with selected global attributes. */
  queries?: InputMaybe<Array<InputMaybe<ProductAttributeFilterInput>>>;
  /** The logical relationship between attributes when filtering across multiple at once. */
  relation?: InputMaybe<AttributeOperatorEnum>;
};

/** Arguments for filtering the ProductAttributeToProductUnionConnection connection */
export type ProductAttributeToProductUnionConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Include variations in the result set. */
  includeVariations?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesWithVariationsEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Product attribute type enumeration */
export type ProductAttributeTypesEnum =
  /** A global product attribute */
  | 'GLOBAL'
  /** A local product attribute */
  | 'LOCAL';

/** Product attributes connection orderby enum */
export type ProductAttributesConnectionOrderbyEnum =
  /** Order the connection by item count. */
  | 'COUNT'
  /** Order the connection by description. */
  | 'DESCRIPTION'
  /** Order the connection by woocommerce menu order. */
  | 'MENU_ORDER'
  /** Order the connection by name. */
  | 'NAME'
  /** Order the connection by slug. */
  | 'SLUG'
  /** Order the connection by term group. */
  | 'TERM_GROUP'
  /** Order the connection by term id. */
  | 'TERM_ID'
  /** Order the connection by term order. */
  | 'TERM_ORDER';

/** Product attribute properties */
export type ProductAttributesInput = {
  /** Attribute ID */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Attribute name */
  name: Scalars['String']['input'];
  /** List of available term names for the attribute */
  options?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Attribute position */
  position?: InputMaybe<Scalars['Int']['input']>;
  /** Define if the attribute can be used as variation. Default is false. */
  variation?: InputMaybe<Scalars['Boolean']['input']>;
  /** Define if the attribute is visible on the "Additional information" tab in the product's page. Default is false. */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifier types for retrieving a specific ProductBrand. Determines which unique property (global ID, database ID, slug, etc.) is used to locate the ProductBrand. */
export type ProductBrandIdType =
  /** The Database ID for the node */
  | 'DATABASE_ID'
  /** The hashed Global ID */
  | 'ID'
  /** The name of the node */
  | 'NAME'
  /** Url friendly name of the node */
  | 'SLUG'
  /** The URI for the node */
  | 'URI';

/** Arguments for filtering the ProductBrandToContentNodeConnection connection */
export type ProductBrandToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfProductBrandEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the ProductBrandToProductBrandConnection connection */
export type ProductBrandToProductBrandConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the ProductBrandToProductConnection connection */
export type ProductBrandToProductConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Product category display type enumeration */
export type ProductCategoryDisplay =
  /** Display both products and subcategories of this category. */
  | 'BOTH'
  /** Display default content connected to this category. */
  | 'DEFAULT'
  /** Display products associated with this category. */
  | 'PRODUCTS'
  /** Display subcategories of this category. */
  | 'SUBCATEGORIES';

/** Identifier types for retrieving a specific ProductCategory. Determines which unique property (global ID, database ID, slug, etc.) is used to locate the ProductCategory. */
export type ProductCategoryIdType =
  /** The Database ID for the node */
  | 'DATABASE_ID'
  /** The hashed Global ID */
  | 'ID'
  /** The name of the node */
  | 'NAME'
  /** Url friendly name of the node */
  | 'SLUG'
  /** The URI for the node */
  | 'URI';

/** Arguments for filtering the ProductCategoryToContentNodeConnection connection */
export type ProductCategoryToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfProductCategoryEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the ProductCategoryToProductCategoryConnection connection */
export type ProductCategoryToProductCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the ProductCategoryToProductConnection connection */
export type ProductCategoryToProductConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Product dimensions */
export type ProductDimensionsInput = {
  /** Height of the product */
  height?: InputMaybe<Scalars['String']['input']>;
  /** Length of the product */
  length?: InputMaybe<Scalars['String']['input']>;
  /** Width of the product */
  width?: InputMaybe<Scalars['String']['input']>;
};

/** Product download */
export type ProductDownloadInput = {
  /** File URL */
  file: Scalars['String']['input'];
  /** File ID */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** File name */
  name: Scalars['String']['input'];
};

/** The Type of Identifier used to fetch a single Product. Default is ID. */
export type ProductIdTypeEnum =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID'
  /** Unique store identifier for product. */
  | 'SKU'
  /** Identify a resource by the slug. Available to non-hierarchcial Types where the slug is a unique identifier. */
  | 'SLUG';

/** Product image */
export type ProductImageInput = {
  /** Image alternative text */
  altText?: InputMaybe<Scalars['String']['input']>;
  /** Image ID */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Image name */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Image URL */
  src?: InputMaybe<Scalars['String']['input']>;
};

/** Identifier types for retrieving a specific ProductTag. Determines which unique property (global ID, database ID, slug, etc.) is used to locate the ProductTag. */
export type ProductTagIdType =
  /** The Database ID for the node */
  | 'DATABASE_ID'
  /** The hashed Global ID */
  | 'ID'
  /** The name of the node */
  | 'NAME'
  /** Url friendly name of the node */
  | 'SLUG'
  /** The URI for the node */
  | 'URI';

/** Arguments for filtering the ProductTagToContentNodeConnection connection */
export type ProductTagToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfProductTagEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the ProductTagToProductConnection connection */
export type ProductTagToProductConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Product taxonomies */
export type ProductTaxonomyEnum =
  | 'PRODUCT_BRAND'
  | 'PRODUCT_CAT'
  | 'PRODUCT_SHIPPING_CLASS'
  | 'PRODUCT_TAG'
  | 'PRODUCT_TYPE'
  | 'PRODUCT_VISIBILITY';

/** Product filter */
export type ProductTaxonomyFilterInput = {
  /** A list of term ids */
  ids?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Filter operation type */
  operator?: InputMaybe<TaxonomyOperatorEnum>;
  /** Which field to select taxonomy term by. */
  taxonomy: ProductTaxonomyEnum;
  /** A list of term slugs */
  terms?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Product taxonomy filter type */
export type ProductTaxonomyInput = {
  /** Product taxonomy rules connected by AND logic */
  and?: InputMaybe<Array<InputMaybe<ProductTaxonomyFilterInput>>>;
  /** Product taxonomy rules to be filter results by */
  filters?: InputMaybe<Array<InputMaybe<ProductTaxonomyFilterInput>>>;
  /** Product taxonomy rules connected by OR logic */
  or?: InputMaybe<Array<InputMaybe<ProductTaxonomyFilterInput>>>;
  /** Logic relation between each filter. */
  relation?: InputMaybe<RelationEnum>;
};

/** Arguments for filtering the ProductToCommentConnection connection */
export type ProductToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** One or more Comment Statuses to limit results by */
  statusIn?: InputMaybe<Array<InputMaybe<CommentStatusEnum>>>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Arguments for filtering the ProductToCommentsConnection connection */
export type ProductToCommentsConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** One or more Comment Statuses to limit results by */
  statusIn?: InputMaybe<Array<InputMaybe<CommentStatusEnum>>>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Arguments for filtering the ProductToMediaItemConnection connection */
export type ProductToMediaItemConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the ProductToProductBrandConnection connection */
export type ProductToProductBrandConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the ProductToProductCategoryConnection connection */
export type ProductToProductCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the ProductToProductConnection connection */
export type ProductToProductConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Arguments for filtering the ProductToProductTagConnection connection */
export type ProductToProductTagConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the ProductToProductTypeConnection connection */
export type ProductToProductTypeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the ProductToProductUnionConnection connection */
export type ProductToProductUnionConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Include variations in the result set. */
  includeVariations?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Shuffle results? (Pagination currently not support by this argument) */
  shuffle?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesWithVariationsEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Arguments for filtering the ProductToShippingClassConnection connection */
export type ProductToShippingClassConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the ProductToTermNodeConnection connection */
export type ProductToTermNodeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: InputMaybe<Array<InputMaybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the ProductToUpsellConnection connection */
export type ProductToUpsellConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Include variations in the result set. */
  includeVariations?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesWithVariationsEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Arguments for filtering the ProductToVisibleProductConnection connection */
export type ProductToVisibleProductConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Identifier types for retrieving a specific ProductType. Determines which unique property (global ID, database ID, slug, etc.) is used to locate the ProductType. */
export type ProductTypeIdType =
  /** The Database ID for the node */
  | 'DATABASE_ID'
  /** The hashed Global ID */
  | 'ID'
  /** The name of the node */
  | 'NAME'
  /** Url friendly name of the node */
  | 'SLUG'
  /** The URI for the node */
  | 'URI';

/** Arguments for filtering the ProductTypeToContentNodeConnection connection */
export type ProductTypeToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfProductTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the ProductTypeToProductConnection connection */
export type ProductTypeToProductConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Product type enumeration */
export type ProductTypesEnum =
  /** An external product */
  | 'EXTERNAL'
  /** A product group */
  | 'GROUPED'
  /** A simple product */
  | 'SIMPLE'
  /** A variable product */
  | 'VARIABLE'
  /** A product variation */
  | 'VARIATION';

/** Product type enumeration including variation types */
export type ProductTypesWithVariationsEnum =
  /** An external product */
  | 'EXTERNAL'
  /** A product group */
  | 'GROUPED'
  /** A simple product */
  | 'SIMPLE'
  /** A variable product */
  | 'VARIABLE'
  /** A product variation */
  | 'VARIATION';

/** The Type of Identifier used to fetch a single ProductVariation. Default is ID. */
export type ProductVariationIdTypeEnum =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID';

/** Arguments for filtering the ProductVariationToProductConnection connection */
export type ProductVariationToProductConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Arguments for filtering the ProductVariationToShippingClassConnection connection */
export type ProductVariationToShippingClassConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the ProductVariationToTermNodeConnection connection */
export type ProductVariationToTermNodeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: InputMaybe<Array<InputMaybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the ProductVariationToVisibleProductConnection connection */
export type ProductVariationToVisibleProductConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the ProductWithAttributesToProductAttributeConnection connection */
export type ProductWithAttributesToProductAttributeConnectionWhereArgs = {
  /** Filter results by attribute scope. */
  type?: InputMaybe<ProductAttributeTypesEnum>;
};

/** Arguments for filtering the ProductWithVariationsToProductVariationConnection connection */
export type ProductWithVariationsToProductVariationConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Include variations in the result set. */
  includeVariations?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesWithVariationsEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Fields to order the Products connection by */
export type ProductsOrderByEnum =
  /** Order by publish date */
  | 'DATE'
  /** Preserve the ID order given in the IN array */
  | 'IN'
  /** Order by the menu order value */
  | 'MENU_ORDER'
  /** Order by last modified date */
  | 'MODIFIED'
  /** Order by name */
  | 'NAME'
  /** Preserve slug order given in the NAME_IN array */
  | 'NAME_IN'
  /** Order by date product sale starts */
  | 'ON_SALE_FROM'
  /** Order by date product sale ends */
  | 'ON_SALE_TO'
  /** Order by parent ID */
  | 'PARENT'
  /** Order by product popularity */
  | 'POPULARITY'
  /** Order by product's current price */
  | 'PRICE'
  /** Order by product average rating */
  | 'RATING'
  /** Order by product's regular price */
  | 'REGULAR_PRICE'
  /** Order by number of reviews on product */
  | 'REVIEW_COUNT'
  /** Order by product's sale price */
  | 'SALE_PRICE'
  /** Order by slug */
  | 'SLUG'
  /** Order by total sales of products sold */
  | 'TOTAL_SALES';

/** Options for ordering the connection */
export type ProductsOrderbyInput = {
  field: ProductsOrderByEnum;
  order?: InputMaybe<OrderEnum>;
};

/** Input for the refreshJwtAuthToken mutation. */
export type RefreshJwtAuthTokenInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A valid, previously issued JWT refresh token. If valid a new Auth token will be provided. If invalid, expired, revoked or otherwise invalid, a new AuthToken will not be provided. */
  jwtRefreshToken: Scalars['String']['input'];
};

/** The Type of Identifier used to fetch a single Refund. Default is ID. */
export type RefundIdTypeEnum =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID';

/** Input for the registerCustomer mutation. */
export type RegisterCustomerInput = {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars['String']['input']>;
  /** Set the current user to the newly registered customer. Avoid using in GraphiQL or contexts where a nonce is sent, as it will cause nonce verification to fail. */
  authenticate?: InputMaybe<Scalars['Boolean']['input']>;
  /** Customer billing information */
  billing?: InputMaybe<CustomerAddressInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The user's first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars['String']['input']>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** User's locale. */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** Meta data. */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars['String']['input']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars['String']['input']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars['String']['input']>;
  /** Customer shipping address */
  shipping?: InputMaybe<CustomerAddressInput>;
  /** Customer shipping is identical to billing address */
  shippingSameAsBilling?: InputMaybe<Scalars['Boolean']['input']>;
  /** A string that contains the user's username. */
  username?: InputMaybe<Scalars['String']['input']>;
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the registerUser mutation. */
export type RegisterUserInput = {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The user's first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars['String']['input']>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** User's locale. */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars['String']['input']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** If true, this will refresh the users JWT secret. */
  refreshJwtUserSecret?: InputMaybe<Scalars['Boolean']['input']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars['String']['input']>;
  /** If true, this will revoke the users JWT secret. If false, this will unrevoke the JWT secret AND issue a new one. To revoke, the user must have proper capabilities to edit users JWT secrets. */
  revokeJwtUserSecret?: InputMaybe<Scalars['Boolean']['input']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains the user's username. */
  username: Scalars['String']['input'];
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars['String']['input']>;
};

/** Logical operators for filter conditions. Determines whether multiple filtering criteria should be combined with AND (all must match) or OR (any can match). */
export type RelationEnum =
  /** All conditions must match (more restrictive filtering) */
  | 'AND'
  /** Any condition can match (more inclusive filtering) */
  | 'OR';

/** Input for the removeCoupons mutation. */
export type RemoveCouponsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Code of coupon being applied */
  codes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Input for the removeItemsFromCart mutation. */
export type RemoveItemsFromCartInput = {
  /** Remove all cart items */
  all?: InputMaybe<Scalars['Boolean']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Item keys of the items being removed */
  keys?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

/** Input for the removeMethodFromShippingZone mutation. */
export type RemoveMethodFromShippingZoneInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Shipping method instance ID */
  instanceId: Scalars['Int']['input'];
  /** The ID of the shipping zone to delete. */
  zoneId: Scalars['Int']['input'];
};

/** Input for the resetUserPassword mutation. */
export type ResetUserPasswordInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Password reset key */
  key?: InputMaybe<Scalars['String']['input']>;
  /** The user's login (username). */
  login?: InputMaybe<Scalars['String']['input']>;
  /** The new password. */
  password?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the restoreCartItems mutation. */
export type RestoreCartItemsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Cart item key of the item being removed */
  keys?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

/** Input for the restoreComment mutation. */
export type RestoreCommentInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the comment to be restored */
  id: Scalars['ID']['input'];
};

/** Input for the restoreReview mutation. */
export type RestoreReviewInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the target product review */
  id: Scalars['ID']['input'];
};

/** Arguments for filtering the RootQueryToCategoryConnection connection */
export type RootQueryToCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the RootQueryToCommentConnection connection */
export type RootQueryToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** One or more Comment Statuses to limit results by */
  statusIn?: InputMaybe<Array<InputMaybe<CommentStatusEnum>>>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Arguments for filtering the RootQueryToContentNodeConnection connection */
export type RootQueryToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the RootQueryToCouponConnection connection */
export type RootQueryToCouponConnectionWhereArgs = {
  /** Limit result set to resources with a specific code. */
  code?: InputMaybe<Scalars['String']['input']>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostTypeOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit results to those matching a string. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the RootQueryToCustomerConnection connection */
export type RootQueryToCustomerConnectionWhereArgs = {
  /** Limit result set to resources with a specific email. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Order of results. */
  order?: InputMaybe<OrderEnum>;
  /** Order results by a specific field. */
  orderby?: InputMaybe<CustomerConnectionOrderbyEnum>;
  /** Limit results to those matching a string. */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the RootQueryToMediaItemConnection connection */
export type RootQueryToMediaItemConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the RootQueryToMenuConnection connection */
export type RootQueryToMenuConnectionWhereArgs = {
  /** The database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The slug of the menu to query items for */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the RootQueryToMenuItemConnection connection */
export type RootQueryToMenuItemConnectionWhereArgs = {
  /** The database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** The menu location for the menu being queried */
  location?: InputMaybe<MenuLocationEnum>;
  /** The database ID of the parent menu object */
  parentDatabaseId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the parent menu object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

/** Arguments for filtering the RootQueryToOrderConnection connection */
export type RootQueryToOrderConnectionWhereArgs = {
  /** Limit result set to orders assigned a specific billing email. */
  billingEmail?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to orders assigned a specific customer. */
  customerId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to orders assigned a specific group of customers. */
  customersIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<OrdersOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to orders assigned a specific product. */
  productId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit results to those matching a string. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to orders assigned a specific status. */
  statuses?: InputMaybe<Array<InputMaybe<OrderStatusEnum>>>;
};

/** Arguments for filtering the RootQueryToPageConnection connection */
export type RootQueryToPageConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the RootQueryToPaymentGatewayConnection connection */
export type RootQueryToPaymentGatewayConnectionWhereArgs = {
  /** Include disabled payment gateways? */
  all?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the RootQueryToPluginConnection connection */
export type RootQueryToPluginConnectionWhereArgs = {
  /** Show plugin based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve plugins where plugin status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PluginStatusEnum>>>;
  /** Show plugins with a specific status. */
  status?: InputMaybe<PluginStatusEnum>;
};

/** Arguments for filtering the RootQueryToPostConnection connection */
export type RootQueryToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']['input']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the RootQueryToPostFormatConnection connection */
export type RootQueryToPostFormatConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the RootQueryToProductBrandConnection connection */
export type RootQueryToProductBrandConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the RootQueryToProductCategoryConnection connection */
export type RootQueryToProductCategoryConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the RootQueryToProductConnection connection */
export type RootQueryToProductConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Arguments for filtering the RootQueryToProductTagConnection connection */
export type RootQueryToProductTagConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the RootQueryToProductTypeConnection connection */
export type RootQueryToProductTypeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the RootQueryToProductUnionConnection connection */
export type RootQueryToProductUnionConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Include variations in the result set. */
  includeVariations?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesWithVariationsEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Arguments for filtering the RootQueryToRefundConnection connection */
export type RootQueryToRefundConnectionWhereArgs = {
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to refunds from a specific group of order IDs. */
  orderIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostTypeOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit results to those matching a string. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to refunds assigned a specific status. */
  statuses?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Arguments for filtering the RootQueryToRevisionsConnection connection */
export type RootQueryToRevisionsConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the RootQueryToShippingClassConnection connection */
export type RootQueryToShippingClassConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the RootQueryToTagConnection connection */
export type RootQueryToTagConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the RootQueryToTaxRateConnection connection */
export type RootQueryToTaxRateConnectionWhereArgs = {
  /** Sort by tax class. */
  class?: InputMaybe<TaxClassEnum>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<TaxRateConnectionOrderbyInput>>>;
  /** Filter results by a post code. */
  postCode?: InputMaybe<Scalars['String']['input']>;
  /** Filter results by a group of post codes. */
  postCodeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Arguments for filtering the RootQueryToTermNodeConnection connection */
export type RootQueryToTermNodeConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The Taxonomy to filter terms by */
  taxonomies?: InputMaybe<Array<InputMaybe<TaxonomyEnum>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Arguments for filtering the RootQueryToUserConnection connection */
export type RootQueryToUserConnectionWhereArgs = {
  /** Array of userIds to exclude. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Pass an array of post types to filter results to users who have published posts in those post types. */
  hasPublishedPosts?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of userIds to include. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** The user login. */
  login?: InputMaybe<Scalars['String']['input']>;
  /** An array of logins to include. Users matching one of these logins will be included in results. */
  loginIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** An array of logins to exclude. Users matching one of these logins will not be included in results. */
  loginNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The user nicename. */
  nicename?: InputMaybe<Scalars['String']['input']>;
  /** An array of nicenames to include. Users matching one of these nicenames will be included in results. */
  nicenameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** An array of nicenames to exclude. Users matching one of these nicenames will not be included in results. */
  nicenameNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<UsersConnectionOrderbyInput>>>;
  /** An array of role names that users must match to be included in results. Note that this is an inclusive list: users must match *each* role. */
  role?: InputMaybe<UserRoleEnum>;
  /** An array of role names. Matched users must have at least one of these roles. */
  roleIn?: InputMaybe<Array<InputMaybe<UserRoleEnum>>>;
  /** An array of role names to exclude. Users matching one or more of these roles will not be included in results. */
  roleNotIn?: InputMaybe<Array<InputMaybe<UserRoleEnum>>>;
  /** Search keyword. Searches for possible string matches on columns. When "searchColumns" is left empty, it tries to determine which column to search in based on search string. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of column names to be searched. Accepts 'ID', 'login', 'nicename', 'email', 'url'. */
  searchColumns?: InputMaybe<Array<InputMaybe<UsersConnectionSearchColumnEnum>>>;
};

/** Arguments for filtering the RootQueryToVisibleProductConnection connection */
export type RootQueryToVisibleProductConnectionWhereArgs = {
  /** Unique cache key to be produced when this query is stored in an object cache. Default is 'core'. */
  cacheDomain?: InputMaybe<Scalars['String']['input']>;
  /** Term ID to retrieve child terms of. If multiple taxonomies are passed, $child_of is ignored. Default 0. */
  childOf?: InputMaybe<Scalars['Int']['input']>;
  /** True to limit results to terms that have no children. This parameter has no effect on non-hierarchical taxonomies. Default false. */
  childless?: InputMaybe<Scalars['Boolean']['input']>;
  /** Retrieve terms where the description is LIKE the input value. Default empty. */
  descriptionLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of term ids to exclude. If $include is non-empty, $exclude is ignored. Default empty array. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of term ids to exclude along with all of their descendant terms. If $include is non-empty, $exclude_tree is ignored. Default empty array. */
  excludeTree?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to hide terms not assigned to any posts. Accepts true or false. Default false */
  hideEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  /** Whether to include terms that have non-empty descendants (even if $hide_empty is set to true). Default true. */
  hierarchical?: InputMaybe<Scalars['Boolean']['input']>;
  /** Array of term ids to include. Default empty array. */
  include?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of names to return term(s) for. Default empty. */
  name?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve terms where the name is LIKE the input value. Default empty. */
  nameLike?: InputMaybe<Scalars['String']['input']>;
  /** Array of object IDs. Results will be limited to terms associated with these objects. */
  objectIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Direction the connection should be ordered in */
  order?: InputMaybe<OrderEnum>;
  /** Field(s) to order terms by. Defaults to 'name'. */
  orderby?: InputMaybe<TermObjectsConnectionOrderbyEnum>;
  /** Whether to pad the quantity of a term's children in the quantity of each term's "count" object variable. Default false. */
  padCounts?: InputMaybe<Scalars['Boolean']['input']>;
  /** Parent term ID to retrieve direct-child terms of. Default empty. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Search criteria to match terms. Will be SQL-formatted with wildcards before and after. Default empty. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Array of slugs to return term(s) for. Default empty. */
  slug?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of term taxonomy IDs, to match when querying terms. */
  termTaxonomyId?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Whether to prime meta caches for matched terms. Default true. */
  updateTermMetaCache?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Script insertion positions in the document structure. Determines whether scripts are placed in the document head or before the closing body tag. */
export type ScriptLoadingGroupLocationEnum =
  /** Delayed loading at end of document, right before the closing `<body>` tag. (allows content to render first) */
  | 'FOOTER'
  /** Early loading in document `<head>` tag. (executes before page content renders) */
  | 'HEADER';

/** Script loading optimization attributes. Controls browser behavior for script loading to improve page performance (async or defer). */
export type ScriptLoadingStrategyEnum =
  /** Load script in parallel with page rendering, executing as soon as downloaded */
  | 'ASYNC'
  /** Download script in parallel but defer execution until page is fully parsed */
  | 'DEFER';

/** Input for the sendPasswordResetEmail mutation. */
export type SendPasswordResetEmailInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains the user's username or email address. */
  username: Scalars['String']['input'];
};

/** Input for the setDefaultPaymentMethod mutation. */
export type SetDefaultPaymentMethodInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Token ID of the payment token being deleted. */
  tokenId: Scalars['Int']['input'];
};

/** Identifier types for retrieving a specific ShippingClass. Determines which unique property (global ID, database ID, slug, etc.) is used to locate the ShippingClass. */
export type ShippingClassIdType =
  /** The Database ID for the node */
  | 'DATABASE_ID'
  /** The hashed Global ID */
  | 'ID'
  /** The name of the node */
  | 'NAME'
  /** Url friendly name of the node */
  | 'SLUG'
  /** The URI for the node */
  | 'URI';

/** Arguments for filtering the ShippingClassToContentNodeConnection connection */
export type ShippingClassToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfShippingClassEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the ShippingClassToProductConnection connection */
export type ShippingClassToProductConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Arguments for filtering the ShippingClassToProductVariationConnection connection */
export type ShippingClassToProductVariationConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Shipping lines data. */
export type ShippingLineInput = {
  /** Shipping Line ID */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Shipping instance ID. */
  instanceId?: InputMaybe<Scalars['String']['input']>;
  /** Meta data. */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** Shipping method ID. */
  methodId: Scalars['String']['input'];
  /** Shipping method name. */
  methodTitle: Scalars['String']['input'];
  /** Line total (after discounts). */
  total: Scalars['String']['input'];
};

/** Shipping lines data. */
export type ShippingLocationInput = {
  /** Shipping location code. */
  code?: InputMaybe<Scalars['String']['input']>;
  /** Shipping location type. */
  type?: InputMaybe<ShippingLocationTypeEnum>;
};

/** A Shipping zone location type. */
export type ShippingLocationTypeEnum =
  | 'CONTINENT'
  | 'COUNTRY'
  | 'POSTCODE'
  | 'STATE';

/** The Type of Identifier used to fetch a single Shipping Method. Default is ID. */
export type ShippingMethodIdTypeEnum =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID';

/** The Type of Identifier used to fetch a single Shipping Zone. Default is ID. */
export type ShippingZoneIdTypeEnum =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID';

/** Arguments for filtering the SimpleProductToProductUnionConnection connection */
export type SimpleProductToProductUnionConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Include variations in the result set. */
  includeVariations?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesWithVariationsEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Product stock status enumeration */
export type StockStatusEnum =
  | 'IN_STOCK'
  | 'ON_BACKORDER'
  | 'OUT_OF_STOCK';

/** Identifier types for retrieving a specific Tag. Determines which unique property (global ID, database ID, slug, etc.) is used to locate the Tag. */
export type TagIdType =
  /** The Database ID for the node */
  | 'DATABASE_ID'
  /** The hashed Global ID */
  | 'ID'
  /** The name of the node */
  | 'NAME'
  /** Url friendly name of the node */
  | 'SLUG'
  /** The URI for the node */
  | 'URI';

/** Arguments for filtering the TagToContentNodeConnection connection */
export type TagToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfTagEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the TagToPostConnection connection */
export type TagToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']['input']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Tax class enumeration */
export type TaxClassEnum =
  /** Inherits Tax class from cart */
  | 'INHERIT_CART'
  | 'REDUCED_RATE'
  /** Standard Tax rate */
  | 'STANDARD'
  | 'ZERO_RATE';

/** Field to order the connection by */
export type TaxRateConnectionOrderbyEnum =
  | 'ID'
  | 'ORDER';

/** Options for ordering the connection */
export type TaxRateConnectionOrderbyInput = {
  field: TaxRateConnectionOrderbyEnum;
  order?: InputMaybe<OrderEnum>;
};

/** The Type of Identifier used to fetch a single Tax rate. Default is ID. */
export type TaxRateIdTypeEnum =
  /** Identify a resource by the Database ID. */
  | 'DATABASE_ID'
  /** Identify a resource by the (hashed) Global ID. */
  | 'ID';

/** Product tax status enumeration */
export type TaxStatusEnum =
  | 'NONE'
  | 'SHIPPING'
  | 'TAXABLE';

/** Available classification systems for organizing content. Identifies the different taxonomy types that can be used for content categorization. */
export type TaxonomyEnum =
  /** Taxonomy enum category */
  | 'CATEGORY'
  /** Taxonomy enum post_format */
  | 'POSTFORMAT'
  /** Taxonomy enum product_brand */
  | 'PRODUCTBRAND'
  /** Taxonomy enum product_cat */
  | 'PRODUCTCATEGORY'
  /** Taxonomy enum product_tag */
  | 'PRODUCTTAG'
  /** Taxonomy enum product_type */
  | 'PRODUCTTYPE'
  /** Taxonomy enum product_shipping_class */
  | 'SHIPPINGCLASS'
  /** Taxonomy enum post_tag */
  | 'TAG'
  /** Taxonomy enum product_visibility */
  | 'VISIBLEPRODUCT';

/** Identifier types for retrieving a taxonomy definition. Determines whether to look up taxonomies by ID or name. */
export type TaxonomyIdTypeEnum =
  /** The globally unique ID */
  | 'ID'
  /** The name of the taxonomy */
  | 'NAME';

/** Taxonomy query operators */
export type TaxonomyOperatorEnum =
  | 'AND'
  | 'EXISTS'
  | 'IN'
  | 'NOT_EXISTS'
  | 'NOT_IN';

/** The Type of Identifier used to fetch a single resource. Default is "ID". To be used along with the "id" field. */
export type TermNodeIdTypeEnum =
  /** The Database ID for the node */
  | 'DATABASE_ID'
  /** The hashed Global ID */
  | 'ID'
  /** The name of the node */
  | 'NAME'
  /** Url friendly name of the node */
  | 'SLUG'
  /** The URI for the node */
  | 'URI';

/** Sorting attributes for taxonomy term collections. Determines which property of taxonomy terms is used for ordering results. */
export type TermObjectsConnectionOrderbyEnum =
  /** Ordering by number of associated content items. */
  | 'COUNT'
  /** Alphabetical ordering by term description text. */
  | 'DESCRIPTION'
  /** Alphabetical ordering by term name. */
  | 'NAME'
  /** Alphabetical ordering by URL-friendly name. */
  | 'SLUG'
  /** Ordering by assigned term grouping value. */
  | 'TERM_GROUP'
  /** Ordering by internal identifier. */
  | 'TERM_ID'
  /** Ordering by manually defined sort position. */
  | 'TERM_ORDER';

/** Input for the updateCategory mutation. */
export type UpdateCategoryInput = {
  /** The slug that the category will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the category object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the category object to update */
  id: Scalars['ID']['input'];
  /** The name of the category object to mutate */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The database ID of the category that should be set as the parent. This field cannot be used in conjunction with parentId */
  parentDatabaseId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the category that should be set as the parent. This field cannot be used in conjunction with parentDatabaseId */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateComment mutation. */
export type UpdateCommentInput = {
  /** The name of the comment's author. */
  author?: InputMaybe<Scalars['String']['input']>;
  /** The email of the comment's author. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** The url of the comment's author. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The database ID of the post object the comment belongs to. */
  commentOn?: InputMaybe<Scalars['Int']['input']>;
  /** Content of the comment. */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the comment being updated. */
  id: Scalars['ID']['input'];
  /** Parent comment ID of current comment. */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** The approval status of the comment */
  status?: InputMaybe<CommentStatusEnum>;
  /** Type of comment. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateCoupon mutation. */
export type UpdateCouponInput = {
  /** The amount of discount. Should always be numeric, even if setting a percentage. */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Coupon code. */
  code?: InputMaybe<Scalars['String']['input']>;
  /** The date the coupon expires, in the site's timezone. */
  dateExpires?: InputMaybe<Scalars['String']['input']>;
  /** The date the coupon expires, as GMT. */
  dateExpiresGmt?: InputMaybe<Scalars['String']['input']>;
  /** Coupon description. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Determines the type of discount that will be applied. */
  discountType?: InputMaybe<DiscountTypeEnum>;
  /** List of email addresses that can use this coupon. */
  emailRestrictions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** If true, this coupon will not be applied to items that have sale prices. */
  excludeSaleItems?: InputMaybe<Scalars['Boolean']['input']>;
  /** List of category IDs the coupon does not apply to. */
  excludedProductCategories?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** List of product IDs the coupon cannot be used on. */
  excludedProductIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** If true and if the free shipping method requires a coupon, this coupon will enable free shipping. */
  freeShipping?: InputMaybe<Scalars['Boolean']['input']>;
  /** Unique identifier for the object. */
  id: Scalars['ID']['input'];
  /** If true, the coupon can only be used individually. Other applied coupons will be removed from the cart. */
  individualUse?: InputMaybe<Scalars['Boolean']['input']>;
  /** Max number of items in the cart the coupon can be applied to. */
  limitUsageToXItems?: InputMaybe<Scalars['Int']['input']>;
  /** Maximum order amount allowed when using the coupon. */
  maximumAmount?: InputMaybe<Scalars['String']['input']>;
  /** Meta data. */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** Minimum order amount that needs to be in the cart before coupon applies. */
  minimumAmount?: InputMaybe<Scalars['String']['input']>;
  /** List of category IDs the coupon applies to. */
  productCategories?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** List of product IDs the coupon can be used on. */
  productIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** How many times the coupon can be used in total. */
  usageLimit?: InputMaybe<Scalars['Int']['input']>;
  /** How many times the coupon can be used per customer. */
  usageLimitPerUser?: InputMaybe<Scalars['Int']['input']>;
};

/** Input for the updateCustomer mutation. */
export type UpdateCustomerInput = {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars['String']['input']>;
  /** Customer billing information */
  billing?: InputMaybe<CustomerAddressInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The user's first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the user */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Whether to save changes on the session or in the database */
  isSession?: InputMaybe<Scalars['Boolean']['input']>;
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars['String']['input']>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** User's locale. */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** Meta data. */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars['String']['input']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars['String']['input']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars['String']['input']>;
  /** An array of roles to be assigned to the user. */
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Customer shipping address */
  shipping?: InputMaybe<CustomerAddressInput>;
  /** Customer shipping is identical to billing address */
  shippingSameAsBilling?: InputMaybe<Scalars['Boolean']['input']>;
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateGraphqlSetting mutation. */
export type UpdateGraphqlSettingInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The field name within the section. */
  field: Scalars['String']['input'];
  /** The settings section slug (e.g. "graphql_general_settings"). */
  section: Scalars['String']['input'];
  /** The new value. The variant key must match the field's registered type (text → text, checkbox → checkbox, etc). */
  value: UpdateGraphqlSettingValueInput;
};

/** Value to set for a WPGraphQL setting. Exactly one variant must be provided, matching the registered field type. */
export type UpdateGraphqlSettingValueInput = {
  /** Boolean value (checkbox-typed setting). */
  checkbox?: InputMaybe<Scalars['Boolean']['input']>;
  /** CSS color value. */
  color?: InputMaybe<Scalars['String']['input']>;
  /** Array of string values matching the registered multicheck options. */
  multicheck?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Numeric value. */
  number?: InputMaybe<Scalars['Float']['input']>;
  /** String value matching one of the registered radio options. */
  radio?: InputMaybe<Scalars['String']['input']>;
  /** String value matching one of the registered select options. */
  select?: InputMaybe<Scalars['String']['input']>;
  /** Plain text value. */
  text?: InputMaybe<Scalars['String']['input']>;
  /** Multi-line text value. */
  textarea?: InputMaybe<Scalars['String']['input']>;
  /** URL value. */
  url?: InputMaybe<Scalars['String']['input']>;
  /** WordPress user role slug. */
  userRoleSelect?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateItemQuantities mutation. */
export type UpdateItemQuantitiesInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Cart item being updated */
  items?: InputMaybe<Array<InputMaybe<CartItemQuantityInput>>>;
};

/** Input for the updateMediaItem mutation. */
export type UpdateMediaItemInput = {
  /** Alternative text to display when mediaItem is not displayed */
  altText?: InputMaybe<Scalars['String']['input']>;
  /** The userId to assign as the author of the mediaItem */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** The caption for the mediaItem */
  caption?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The comment status for the mediaItem */
  commentStatus?: InputMaybe<Scalars['String']['input']>;
  /** The date of the mediaItem */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The date (in GMT zone) of the mediaItem */
  dateGmt?: InputMaybe<Scalars['String']['input']>;
  /** Description of the mediaItem */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The file name of the mediaItem */
  filePath?: InputMaybe<Scalars['String']['input']>;
  /** The file type of the mediaItem */
  fileType?: InputMaybe<MimeTypeEnum>;
  /** The ID of the mediaItem object */
  id: Scalars['ID']['input'];
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** The ping status for the mediaItem */
  pingStatus?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the mediaItem */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the mediaItem */
  status?: InputMaybe<MediaItemStatusEnum>;
  /** The title of the mediaItem */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateMethodOnShippingZone mutation. */
export type UpdateMethodOnShippingZoneInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the shipping method is enabled or not. */
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Shipping method instance ID */
  instanceId: Scalars['Int']['input'];
  /** The order of the shipping method. */
  order?: InputMaybe<Scalars['Int']['input']>;
  /** The settings for the shipping method. */
  settings?: InputMaybe<Array<InputMaybe<WcSettingInput>>>;
  /** The ID of the shipping zone to delete. */
  zoneId: Scalars['Int']['input'];
};

/** Input for the updateOrder mutation. */
export type UpdateOrderInput = {
  /** Order billing address */
  billing?: InputMaybe<CustomerAddressInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Coupons codes to be applied to order */
  coupons?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Source of the order. Useful when WooCommerce is driven from multiple sources. Defaults to "graphql-api". */
  createdVia?: InputMaybe<Scalars['String']['input']>;
  /** Currency the order was created with, in ISO format. */
  currency?: InputMaybe<CurrencyEnum>;
  /** Database ID or global ID of the customer for the order */
  customerId?: InputMaybe<Scalars['ID']['input']>;
  /** Note left by customer during checkout. */
  customerNote?: InputMaybe<Scalars['String']['input']>;
  /** Order shipping lines */
  feeLines?: InputMaybe<Array<InputMaybe<FeeLineInput>>>;
  /** Database ID or global ID of the order */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** Define if the order is paid. It will set the status to processing and reduce stock items. */
  isPaid?: InputMaybe<Scalars['Boolean']['input']>;
  /** Order line items */
  lineItems?: InputMaybe<Array<InputMaybe<LineItemInput>>>;
  /** Order meta data */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** Parent order ID. */
  parentId?: InputMaybe<Scalars['Int']['input']>;
  /** Payment method ID. */
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  /** Payment method title. */
  paymentMethodTitle?: InputMaybe<Scalars['String']['input']>;
  /** Order shipping address */
  shipping?: InputMaybe<CustomerAddressInput>;
  /** Order shipping lines */
  shippingLines?: InputMaybe<Array<InputMaybe<ShippingLineInput>>>;
  /** Order status */
  status?: InputMaybe<OrderStatusEnum>;
  /** Order transaction ID */
  transactionId?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updatePage mutation. */
export type UpdatePageInput = {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars['String']['input']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the page object */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the parent object */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updatePostFormat mutation. */
export type UpdatePostFormatInput = {
  /** The slug that the post_format will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the post_format object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the postFormat object to update */
  id: Scalars['ID']['input'];
  /** The name of the post_format object to mutate */
  name?: InputMaybe<Scalars['String']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updatePost mutation. */
export type UpdatePostInput = {
  /** The userId to assign as the author of the object */
  authorId?: InputMaybe<Scalars['ID']['input']>;
  /** Set connections between the post and categories */
  categories?: InputMaybe<PostCategoriesInput>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The comment status for the object */
  commentStatus?: InputMaybe<Scalars['String']['input']>;
  /** The content of the object */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day (e.g. 01/31/2017) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The excerpt of the object */
  excerpt?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the post object */
  id: Scalars['ID']['input'];
  /** Override the edit lock when another user is editing the post */
  ignoreEditLock?: InputMaybe<Scalars['Boolean']['input']>;
  /** A field used for ordering posts. This is typically used with nav menu items or for special ordering of hierarchical content types. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The password used to protect the content of the object */
  password?: InputMaybe<Scalars['String']['input']>;
  /** The ping status for the object */
  pingStatus?: InputMaybe<Scalars['String']['input']>;
  /** URLs that have been pinged. */
  pinged?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Set connections between the post and postFormats */
  postFormats?: InputMaybe<PostPostFormatsInput>;
  /** The slug of the object */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** The status of the object */
  status?: InputMaybe<PostStatusEnum>;
  /** Set connections between the post and tags */
  tags?: InputMaybe<PostTagsInput>;
  /** The title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
  /** URLs queued to be pinged. */
  toPing?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Input for the updateProductAttribute mutation. */
export type UpdateProductAttributeInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the attribute has archives. */
  hasArchives?: InputMaybe<Scalars['Boolean']['input']>;
  /** Unique identifier for the product. */
  id: Scalars['ID']['input'];
  /** Name of the attribute. */
  name: Scalars['String']['input'];
  /** Order by which the attribute should be sorted. */
  orderBy?: InputMaybe<Scalars['String']['input']>;
  /** Slug of the attribute. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Type of the attribute. */
  type?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateProductAttributeTerm mutation. */
export type UpdateProductAttributeTermInput = {
  /** The ID of the attribute to which the term belongs. */
  attributeId: Scalars['Int']['input'];
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the term. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the term to update. */
  id: Scalars['Int']['input'];
  /** The order of the term in the menu. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The name of the term. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The slug of the term. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateProductBrand mutation. */
export type UpdateProductBrandInput = {
  /** The slug that the product_brand will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the product_brand object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the productBrand object to update */
  id: Scalars['ID']['input'];
  /** The name of the product_brand object to mutate */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The database ID of the product_brand that should be set as the parent. This field cannot be used in conjunction with parentId */
  parentDatabaseId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the product_brand that should be set as the parent. This field cannot be used in conjunction with parentDatabaseId */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateProductCategory mutation. */
export type UpdateProductCategoryInput = {
  /** The slug that the product_cat will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the product_cat object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Category archive display type. */
  display?: InputMaybe<ProductCategoryDisplay>;
  /** The ID of the productCategory object to update */
  id: Scalars['ID']['input'];
  /** The ID of an image attachment to associate with the category. */
  imageId?: InputMaybe<Scalars['ID']['input']>;
  /** Menu order, used to custom sort the category. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** The name of the product_cat object to mutate */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The database ID of the product_cat that should be set as the parent. This field cannot be used in conjunction with parentId */
  parentDatabaseId?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the product_cat that should be set as the parent. This field cannot be used in conjunction with parentDatabaseId */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateProduct mutation. */
export type UpdateProductInput = {
  /** Product attributes. */
  attributes?: InputMaybe<Array<InputMaybe<ProductAttributesInput>>>;
  /** Backorders. */
  backorders?: InputMaybe<BackordersEnum>;
  /** Product button text. (External products only) */
  buttonText?: InputMaybe<Scalars['String']['input']>;
  /** Catalog visibility. */
  catalogVisibility?: InputMaybe<CatalogVisibilityEnum>;
  /** Product categories. */
  categories?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Cross-sell product IDs. */
  crossSellIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Product sale start date. */
  dateOnSaleFrom?: InputMaybe<Scalars['String']['input']>;
  /** Product sale end date. */
  dateOnSaleTo?: InputMaybe<Scalars['String']['input']>;
  /** Product default attributes. */
  defaultAttributes?: InputMaybe<Array<InputMaybe<ProductAttributeInput>>>;
  /** Product description. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Product dimensions. */
  dimensions?: InputMaybe<ProductDimensionsInput>;
  /** Number of days until download access expires. */
  downloadExpiry?: InputMaybe<Scalars['Int']['input']>;
  /** Product download limit. */
  downloadLimit?: InputMaybe<Scalars['Int']['input']>;
  /** Product downloadable. */
  downloadable?: InputMaybe<Scalars['Boolean']['input']>;
  /** Product downloads. */
  downloads?: InputMaybe<Array<InputMaybe<ProductDownloadInput>>>;
  /** Product external URL. (External products only) */
  externalUrl?: InputMaybe<Scalars['String']['input']>;
  /** Featured product. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Grouped product IDs. */
  groupedProducts?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Unique identifier for the product. */
  id: Scalars['ID']['input'];
  /** Product images. */
  images?: InputMaybe<Array<InputMaybe<ProductImageInput>>>;
  /** Manage stock. */
  manageStock?: InputMaybe<Scalars['Boolean']['input']>;
  /** Menu order. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Meta data. */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** Name of the product. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Parent product ID. */
  parentId?: InputMaybe<Scalars['Int']['input']>;
  /** Purchase note. */
  purchaseNote?: InputMaybe<Scalars['String']['input']>;
  /** Product regular price. */
  regularPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Allow reviews. Default is true */
  reviewsAllowed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Product sale price. */
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  /** Shipping class. */
  shippingClass?: InputMaybe<Scalars['String']['input']>;
  /** Product short description. */
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  /** Product SKU. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Product slug. */
  slug?: InputMaybe<Scalars['String']['input']>;
  /** Sold individually. */
  soldIndividually?: InputMaybe<Scalars['Boolean']['input']>;
  /** Status of the product. */
  status?: InputMaybe<PostStatusEnum>;
  /** Stock quantity. */
  stockQuantity?: InputMaybe<Scalars['Int']['input']>;
  /** Stock status. */
  stockStatus?: InputMaybe<StockStatusEnum>;
  /** Product tags. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Tax class. */
  taxClass?: InputMaybe<TaxClassEnum>;
  /** Tax status. */
  taxStatus?: InputMaybe<TaxStatusEnum>;
  /** Type of the product. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Upsell product IDs. */
  upsellIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Product virtual. */
  virtual?: InputMaybe<Scalars['Boolean']['input']>;
  /** Product weight. */
  weight?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateProductTag mutation. */
export type UpdateProductTagInput = {
  /** The slug that the product_tag will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the product_tag object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the productTag object to update */
  id: Scalars['ID']['input'];
  /** The name of the product_tag object to mutate */
  name?: InputMaybe<Scalars['String']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateProductType mutation. */
export type UpdateProductTypeInput = {
  /** The slug that the product_type will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the product_type object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the productType object to update */
  id: Scalars['ID']['input'];
  /** The name of the product_type object to mutate */
  name?: InputMaybe<Scalars['String']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateProductVariation mutation. */
export type UpdateProductVariationInput = {
  /** Attributes of the product variation. */
  attributes?: InputMaybe<Array<InputMaybe<ProductAttributeInput>>>;
  /** Backorder status. */
  backorders?: InputMaybe<BackordersEnum>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Start date of sale price. */
  dateOnSaleFrom?: InputMaybe<Scalars['String']['input']>;
  /** End date of sale price. */
  dateOnSaleTo?: InputMaybe<Scalars['String']['input']>;
  /** Description of the product variation. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Dimensions of the product variation. */
  dimensions?: InputMaybe<ProductDimensionsInput>;
  /** Number of days until the download expires. */
  downloadExpiry?: InputMaybe<Scalars['Int']['input']>;
  /** Number of times downloadable files can be downloaded. */
  downloadLimit?: InputMaybe<Scalars['Int']['input']>;
  /** Whether the product variation is downloadable. */
  downloadable?: InputMaybe<Scalars['Boolean']['input']>;
  /** Downloadable files. */
  downloads?: InputMaybe<Array<InputMaybe<ProductDownloadInput>>>;
  /** Unique identifier for the product. */
  id: Scalars['ID']['input'];
  /** Image of the product variation. */
  image?: InputMaybe<ProductImageInput>;
  /** Whether to manage stock. Either "yes", "no", or "parent". */
  manageStock?: InputMaybe<Scalars['String']['input']>;
  /** Menu order of the product variation. */
  menuOrder?: InputMaybe<Scalars['Int']['input']>;
  /** Meta data of the product variation. */
  metaData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
  /** Unique identifier for the product. */
  productId: Scalars['ID']['input'];
  /** Regular price of the product variation. */
  regularPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Sale price of the product variation. */
  salePrice?: InputMaybe<Scalars['Float']['input']>;
  /** Shipping class of the product variation. */
  shippingClass?: InputMaybe<Scalars['String']['input']>;
  /** Unique identifier. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Stock quantity. */
  stockQuantity?: InputMaybe<Scalars['Int']['input']>;
  /** Stock status of the product variation. */
  stockStatus?: InputMaybe<StockStatusEnum>;
  /** Tax class of the product variation. */
  taxClass?: InputMaybe<Scalars['String']['input']>;
  /** Tax status of the product variation. */
  taxStatus?: InputMaybe<TaxStatusEnum>;
  /** Whether the product variation is virtual. */
  virtual?: InputMaybe<Scalars['Boolean']['input']>;
  /** Is product variation public? */
  visible?: InputMaybe<Scalars['Boolean']['input']>;
  /** Weight of the product variation. */
  weight?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateReview mutation. */
export type UpdateReviewInput = {
  /** The name of the comment's author. */
  author?: InputMaybe<Scalars['String']['input']>;
  /** The email of the comment's author. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** The url of the comment's author. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The database ID of the post object the comment belongs to. */
  commentOn?: InputMaybe<Scalars['Int']['input']>;
  /** Content of the comment. */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the review being updated. */
  id: Scalars['ID']['input'];
  /** Parent comment ID of current comment. */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Product rating */
  rating: Scalars['Int']['input'];
  /** The approval status of the comment */
  status?: InputMaybe<CommentStatusEnum>;
};

/** Input for the updateSession mutation. */
export type UpdateSessionInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Data to be persisted in the session. */
  sessionData?: InputMaybe<Array<InputMaybe<MetaDataInput>>>;
};

/** Input for the updateSettings mutation. */
export type UpdateSettingsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Allow people to submit comments on new posts. */
  discussionSettingsDefaultCommentStatus?: InputMaybe<Scalars['String']['input']>;
  /** Allow link notifications from other blogs (pingbacks and trackbacks) on new articles. */
  discussionSettingsDefaultPingStatus?: InputMaybe<Scalars['String']['input']>;
  /** A date format for all date strings. */
  generalSettingsDateFormat?: InputMaybe<Scalars['String']['input']>;
  /** Site tagline. */
  generalSettingsDescription?: InputMaybe<Scalars['String']['input']>;
  /** This address is used for admin purposes, like new user notification. */
  generalSettingsEmail?: InputMaybe<Scalars['String']['input']>;
  /** WordPress locale code. */
  generalSettingsLanguage?: InputMaybe<Scalars['String']['input']>;
  /** A day number of the week that the week should start on. */
  generalSettingsStartOfWeek?: InputMaybe<Scalars['Int']['input']>;
  /** A time format for all time strings. */
  generalSettingsTimeFormat?: InputMaybe<Scalars['String']['input']>;
  /** A city in the same timezone as you. */
  generalSettingsTimezone?: InputMaybe<Scalars['String']['input']>;
  /** Site title. */
  generalSettingsTitle?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the page that should display the latest posts */
  readingSettingsPageForPosts?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the page that should be displayed on the front page */
  readingSettingsPageOnFront?: InputMaybe<Scalars['Int']['input']>;
  /** Blog pages show at most. */
  readingSettingsPostsPerPage?: InputMaybe<Scalars['Int']['input']>;
  /** What to show on the front page */
  readingSettingsShowOnFront?: InputMaybe<Scalars['String']['input']>;
  /** Default post category. */
  writingSettingsDefaultCategory?: InputMaybe<Scalars['Int']['input']>;
  /** Default post format. */
  writingSettingsDefaultPostFormat?: InputMaybe<Scalars['String']['input']>;
  /** Convert emoticons like :-) and :-P to graphics on display. */
  writingSettingsUseSmilies?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Input for the updateShippingClass mutation. */
export type UpdateShippingClassInput = {
  /** The slug that the product_shipping_class will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the product_shipping_class object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the shippingClass object to update */
  id: Scalars['ID']['input'];
  /** The name of the product_shipping_class object to mutate */
  name?: InputMaybe<Scalars['String']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateShippingMethod mutation. */
export type UpdateShippingMethodInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  shippingMethods?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Input for the updateShippingZone mutation. */
export type UpdateShippingZoneInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the shipping zone to update. */
  id: Scalars['Int']['input'];
  /** Name of the shipping zone. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Order of the shipping zone. */
  order?: InputMaybe<Scalars['Int']['input']>;
};

/** Input for the updateShippingZoneLocations mutation. */
export type UpdateShippingZoneLocationsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The locations to add to the shipping zone. */
  locations?: InputMaybe<Array<InputMaybe<ShippingLocationInput>>>;
  /** The ID of the shipping zone to delete. */
  zoneId: Scalars['Int']['input'];
};

/** Input for the updateTag mutation. */
export type UpdateTagInput = {
  /** The slug that the post_tag will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the post_tag object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the tag object to update */
  id: Scalars['ID']['input'];
  /** The name of the post_tag object to mutate */
  name?: InputMaybe<Scalars['String']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateTaxRate mutation. */
export type UpdateTaxRateInput = {
  /** Cities for the tax rate. */
  cities?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Tax rate class. */
  class?: InputMaybe<TaxClassEnum>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Whether the tax rate is compound. */
  compound?: InputMaybe<Scalars['Boolean']['input']>;
  /** Country code for the tax rate. */
  country?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the tax rate to update. */
  id: Scalars['Int']['input'];
  /** Tax rate name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Tax rate order. */
  order?: InputMaybe<Scalars['Int']['input']>;
  /** Postcodes for the tax rate. */
  postcodes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Tax rate priority. */
  priority?: InputMaybe<Scalars['Int']['input']>;
  /** Tax rate. */
  rate?: InputMaybe<Scalars['String']['input']>;
  /** Whether the tax rate is applied to shipping. */
  shipping?: InputMaybe<Scalars['Boolean']['input']>;
  /** State code for the tax rate. */
  state?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateUser mutation. */
export type UpdateUserInput = {
  /** User's AOL IM account. */
  aim?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** A string containing content about the user. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: InputMaybe<Scalars['String']['input']>;
  /** A string containing the user's email address. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The user's first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the user */
  id: Scalars['ID']['input'];
  /** User's Jabber account. */
  jabber?: InputMaybe<Scalars['String']['input']>;
  /** The user's last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** User's locale. */
  locale?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: InputMaybe<Scalars['String']['input']>;
  /** The user's nickname, defaults to the user's username. */
  nickname?: InputMaybe<Scalars['String']['input']>;
  /** A string that contains the plain text password for the user. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** If true, this will refresh the users JWT secret. */
  refreshJwtUserSecret?: InputMaybe<Scalars['Boolean']['input']>;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: InputMaybe<Scalars['String']['input']>;
  /** If true, this will revoke the users JWT secret. If false, this will unrevoke the JWT secret AND issue a new one. To revoke, the user must have proper capabilities to edit users JWT secrets. */
  revokeJwtUserSecret?: InputMaybe<Scalars['Boolean']['input']>;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: InputMaybe<Scalars['String']['input']>;
  /** An array of roles to be assigned to the user. */
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: InputMaybe<Scalars['String']['input']>;
  /** User's Yahoo IM account. */
  yim?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateVisibleProduct mutation. */
export type UpdateVisibleProductInput = {
  /** The slug that the product_visibility will be an alias of */
  aliasOf?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The description of the product_visibility object */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the visibleProduct object to update */
  id: Scalars['ID']['input'];
  /** The name of the product_visibility object to mutate */
  name?: InputMaybe<Scalars['String']['input']>;
  /** If this argument exists then the slug will be checked to see if it is not an existing valid term. If that check succeeds (it is not a valid term), then it is added and the term id is given. If it fails, then a check is made to whether the taxonomy is hierarchical and the parent argument is not empty. If the second check succeeds, the term will be inserted and the term id will be given. If the slug argument is empty, then it will be calculated from the term name. */
  slug?: InputMaybe<Scalars['String']['input']>;
};

/** Input for the updateWCSetting mutation. */
export type UpdateWcSettingInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Settings group ID. */
  group: Scalars['String']['input'];
  /** Setting ID. */
  id: Scalars['String']['input'];
  /** Setting value. */
  value: Scalars['String']['input'];
};

/** Input for the updateWCSettings mutation. */
export type UpdateWcSettingsInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** Settings group ID. */
  group: Scalars['String']['input'];
  /** Settings to update. */
  settings: Array<InputMaybe<WcSettingInput>>;
};

/** Identifier types for retrieving a specific user. Determines whether to look up users by ID, email, username, or other unique properties. */
export type UserNodeIdTypeEnum =
  /** The Database ID for the node */
  | 'DATABASE_ID'
  /** The Email of the User */
  | 'EMAIL'
  /** The hashed Global ID */
  | 'ID'
  /** The slug of the User */
  | 'SLUG'
  /** The URI for the node */
  | 'URI'
  /** The username the User uses to login with */
  | 'USERNAME';

/** Permission levels for user accounts. Defines the standard access levels that control what actions users can perform within the system. */
export type UserRoleEnum =
  /** Full system access with ability to manage all aspects of the site. */
  | 'ADMINISTRATOR'
  /** Can publish and manage their own content. */
  | 'AUTHOR'
  /** Can write and manage their own content but cannot publish. */
  | 'CONTRIBUTOR'
  /** User role with specific capabilities */
  | 'CUSTOMER'
  /** Content management access without administrative capabilities. */
  | 'EDITOR'
  /** User role with specific capabilities */
  | 'SHOP_MANAGER'
  /** Can only manage their profile and read content. */
  | 'SUBSCRIBER';

/** Arguments for filtering the UserToCommentConnection connection */
export type UserToCommentConnectionWhereArgs = {
  /** Comment author email address. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** Array of author IDs to include comments for. */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to exclude comments for. */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Comment author URL. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** Array of comment IDs to include. */
  commentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of IDs of users whose unapproved comments will be returned by the query regardless of status. */
  commentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Include comments of a given type. */
  commentType?: InputMaybe<Scalars['String']['input']>;
  /** Include comments from a given array of comment types. */
  commentTypeIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Exclude comments from a given array of comment types. */
  commentTypeNotIn?: InputMaybe<Scalars['String']['input']>;
  /** Content object author ID to limit results by. */
  contentAuthor?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs to retrieve comments for. */
  contentAuthorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of author IDs *not* to retrieve comments for. */
  contentAuthorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit results to those affiliated with a given content object ID. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** Array of content object IDs to include affiliated comments for. */
  contentIdIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of content object IDs to exclude affiliated comments for. */
  contentIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Content object name (i.e. slug ) to retrieve affiliated comments for. */
  contentName?: InputMaybe<Scalars['String']['input']>;
  /** Content Object parent ID to retrieve affiliated comments for. */
  contentParent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of content object statuses to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentStatus?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Content object type or array of types to retrieve affiliated comments for. Pass 'any' to match any value. */
  contentType?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Array of IDs or email addresses of users whose unapproved comments will be returned by the query regardless of $status. Default empty */
  includeUnapproved?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Karma score to retrieve matching comments for. */
  karma?: InputMaybe<Scalars['Int']['input']>;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
  /** Field to order the comments by. */
  orderby?: InputMaybe<CommentsConnectionOrderbyEnum>;
  /** Parent ID of comment to retrieve children of. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Array of parent IDs of comments to retrieve children for. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of parent IDs of comments *not* to retrieve children for. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Search term(s) to retrieve matching comments for. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** One or more Comment Statuses to limit results by */
  statusIn?: InputMaybe<Array<InputMaybe<CommentStatusEnum>>>;
  /** Include comments for a specific user ID. */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

/** Arguments for filtering the UserToMediaItemConnection connection */
export type UserToMediaItemConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the UserToPageConnection connection */
export type UserToPageConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the UserToPostConnection connection */
export type UserToPostConnectionWhereArgs = {
  /** The user that's connected as the author of the object. Use the userId for the author object. */
  author?: InputMaybe<Scalars['Int']['input']>;
  /** Find objects connected to author(s) in the array of author's userIds */
  authorIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Find objects connected to the author by the author's nicename */
  authorName?: InputMaybe<Scalars['String']['input']>;
  /** Find objects NOT connected to author(s) in the array of author's userIds */
  authorNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Category ID */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Use Category Slug */
  categoryName?: InputMaybe<Scalars['String']['input']>;
  /** Array of category IDs, used to display objects from one category OR another */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Tag Slug */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Use Tag ID */
  tagId?: InputMaybe<Scalars['String']['input']>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag IDs, used to display objects from one tag OR another */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Array of tag slugs, used to display objects from one tag AND another */
  tagSlugAnd?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Array of tag slugs, used to include objects in ANY specified tags */
  tagSlugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the UserToRevisionsConnection connection */
export type UserToRevisionsConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypeEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** User attribute sorting options. Determines which property of user accounts is used for ordering user listings. */
export type UsersConnectionOrderbyEnum =
  /** Order by display name */
  | 'DISPLAY_NAME'
  /** Order by email address */
  | 'EMAIL'
  /** Order by login */
  | 'LOGIN'
  /** Preserve the login order given in the LOGIN_IN array */
  | 'LOGIN_IN'
  /** Order by nice name */
  | 'NICE_NAME'
  /** Preserve the nice name order given in the NICE_NAME_IN array */
  | 'NICE_NAME_IN'
  /** Order by registration date */
  | 'REGISTERED'
  /** Order by URL */
  | 'URL';

/** Options for ordering the connection */
export type UsersConnectionOrderbyInput = {
  /** The field name used to sort the results. */
  field: UsersConnectionOrderbyEnum;
  /** The cardinality of the order of the connection */
  order?: InputMaybe<OrderEnum>;
};

/** User properties that can be targeted in search operations. Defines which user attributes can be searched when looking for specific users. */
export type UsersConnectionSearchColumnEnum =
  /** The user's email address. */
  | 'EMAIL'
  /** The globally unique ID. */
  | 'ID'
  /** The username the User uses to login with. */
  | 'LOGIN'
  /** A URL-friendly name for the user. The default is the user's username. */
  | 'NICENAME'
  /** The URL of the user's website. */
  | 'URL';

/** Arguments for filtering the VariableProductToProductUnionConnection connection */
export type VariableProductToProductUnionConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Include variations in the result set. */
  includeVariations?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesWithVariationsEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesWithVariationsEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Identifier types for retrieving a specific VisibleProduct. Determines which unique property (global ID, database ID, slug, etc.) is used to locate the VisibleProduct. */
export type VisibleProductIdType =
  /** The Database ID for the node */
  | 'DATABASE_ID'
  /** The hashed Global ID */
  | 'ID'
  /** The name of the node */
  | 'NAME'
  /** Url friendly name of the node */
  | 'SLUG'
  /** The URI for the node */
  | 'URI';

/** Arguments for filtering the VisibleProductToContentNodeConnection connection */
export type VisibleProductToContentNodeConnectionWhereArgs = {
  /** The Types of content to filter */
  contentTypes?: InputMaybe<Array<InputMaybe<ContentTypesOfVisibleProductEnum>>>;
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Arguments for filtering the VisibleProductToProductConnection connection */
export type VisibleProductToProductConnectionWhereArgs = {
  /** Limit result set to products with selected global attribute queries. */
  attributes?: InputMaybe<ProductAttributeQueryInput>;
  /** Limit result set to products assigned a specific category name. */
  category?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific category name. */
  categoryId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of category IDs. */
  categoryIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of category IDs. */
  categoryIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a group of specific categories by name. */
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a group of specific categories by name. */
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter the connection based on dates. */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** Ensure result set excludes specific IDs. */
  exclude?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to featured products. */
  featured?: InputMaybe<Scalars['Boolean']['input']>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit result set to specific ids. */
  include?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products based on a maximum price. */
  maxPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Limit result set to products based on a minimum price. */
  minPrice?: InputMaybe<Scalars['Float']['input']>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Limit result set to products on sale. */
  onSale?: InputMaybe<Scalars['Boolean']['input']>;
  /** What paramater to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<ProductsOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items. */
  parent?: InputMaybe<Scalars['Int']['input']>;
  /** Specify objects whose parent is in an array. */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Specify objects whose parent is not in an array. */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand name. */
  productBrand?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific brand ID. */
  productBrandId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of brand IDs. */
  productBrandIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brand IDs. */
  productBrandIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of brands by name. */
  productBrandIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of brands by name. */
  productBrandNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products with a specific average rating. Must be between 1 and 5 */
  rating?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products based on a keyword search. */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific shipping class ID. */
  shippingClassId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products with specific SKU(s). Use commas to separate. */
  sku?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products with specific slugs. */
  slugIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Limit result set to products assigned a specific status. */
  status?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products in stock or out of stock. */
  stockStatus?: InputMaybe<Array<InputMaybe<StockStatusEnum>>>;
  /** Limit result types to types supported by WooGraphQL. */
  supportedTypesOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /** Limit result set to products assigned a specific tag name. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific tag ID. */
  tagId?: InputMaybe<Scalars['Int']['input']>;
  /** Limit result set to products assigned to a specific group of tag IDs. */
  tagIdIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tag IDs. */
  tagIdNotIn?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  /** Limit result set to products assigned to a specific group of tags by name. */
  tagIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set to products not assigned to a specific group of tags by name. */
  tagNotIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Limit result set with complex set of taxonomy filters. */
  taxonomyFilter?: InputMaybe<ProductTaxonomyInput>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
  /** Limit result set to products assigned a specific type. */
  type?: InputMaybe<ProductTypesEnum>;
  /** Limit result set to products assigned to a group of specific types. */
  typeIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products not assigned to a group of specific types. */
  typeNotIn?: InputMaybe<Array<InputMaybe<ProductTypesEnum>>>;
  /** Limit result set to products with a specific visibility level. */
  visibility?: InputMaybe<CatalogVisibilityEnum>;
};

/** Arguments for filtering the VisibleProductToProductVariationConnection connection */
export type VisibleProductToProductVariationConnectionWhereArgs = {
  /** Filter the connection based on dates */
  dateQuery?: InputMaybe<DateQueryInput>;
  /** True for objects with passwords; False for objects without passwords; null for all objects with or without passwords */
  hasPassword?: InputMaybe<Scalars['Boolean']['input']>;
  /** Specific database ID of the object */
  id?: InputMaybe<Scalars['Int']['input']>;
  /** Array of IDs for the objects to retrieve */
  in?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** True to limit the results to sticky posts; false to exclude sticky posts. Note: this filters the result set, it does not float sticky posts to the top of the results. */
  isSticky?: InputMaybe<Scalars['Boolean']['input']>;
  /** Get objects with a specific mimeType property */
  mimeType?: InputMaybe<MimeTypeEnum>;
  /** Slug / post_name of the object */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Specify objects to retrieve. Use slugs */
  nameIn?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Specify IDs NOT to retrieve. If this is used in the same query as "in", it will be ignored */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** What parameter to use to order the objects by. */
  orderby?: InputMaybe<Array<InputMaybe<PostObjectsConnectionOrderbyInput>>>;
  /** Use ID to return only children. Use 0 to return only top-level items */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Specify objects whose parent is in an array */
  parentIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Specify posts whose parent is not in an array */
  parentNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Show posts with a specific password. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Show Posts based on a keyword search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Retrieve posts where post status is in an array. */
  stati?: InputMaybe<Array<InputMaybe<PostStatusEnum>>>;
  /** Show posts with a specific status. */
  status?: InputMaybe<PostStatusEnum>;
  /** Filter the connection to content assigned a specific template. */
  template?: InputMaybe<ContentTemplateEnum>;
  /** Title of the object */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** WooCommerce setting input. */
export type WcSettingInput = {
  /** A unique identifier for the setting. */
  id?: InputMaybe<Scalars['String']['input']>;
  /** Setting value. */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** Type of WC setting. */
export type WcSettingTypeEnum =
  | 'CHECKBOX'
  | 'COLOR'
  | 'EMAIL'
  | 'EMAIL_COLOR_PALETTE'
  | 'EMAIL_FONT_FAMILY'
  | 'EMAIL_IMAGE_URL'
  | 'EMAIL_IMPROVEMENTS_BUTTON'
  | 'HIDDEN'
  | 'MULTISELECT'
  | 'MULTI_SELECT_COUNTRIES'
  | 'NUMBER'
  | 'PREVIEWING_NEW_TEMPLATES'
  | 'RADIO'
  | 'RELATIVE_DATE_SELECTOR'
  | 'SECTIONEND'
  | 'SELECT'
  | 'SINGLE_SELECT_COUNTRY'
  | 'SINGLE_SELECT_PAGE'
  | 'SINGLE_SELECT_PAGE_WITH_SEARCH'
  | 'SLOTFILL_PLACEHOLDER'
  | 'TEXT'
  | 'TEXTAREA'
  | 'TITLE';

/** Input for the writeReview mutation. */
export type WriteReviewInput = {
  /** The name of the comment's author. */
  author?: InputMaybe<Scalars['String']['input']>;
  /** The email of the comment's author. */
  authorEmail?: InputMaybe<Scalars['String']['input']>;
  /** The url of the comment's author. */
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The database ID of the post object the comment belongs to. */
  commentOn?: InputMaybe<Scalars['Int']['input']>;
  /** Content of the comment. */
  content?: InputMaybe<Scalars['String']['input']>;
  /** The date of the object. Preferable to enter as year/month/day ( e.g. 01/31/2017 ) as it will rearrange date as fit if it is not specified. Incomplete dates may have unintended results for example, "2017" as the input will use current date with timestamp 20:17  */
  date?: InputMaybe<Scalars['String']['input']>;
  /** Parent comment ID of current comment. */
  parent?: InputMaybe<Scalars['ID']['input']>;
  /** Product rating */
  rating: Scalars['Int']['input'];
  /** The approval status of the comment */
  status?: InputMaybe<CommentStatusEnum>;
};

/** Input for the addToCart mutation. */
export type AddToCartInput = {
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: string | null | undefined;
  /** JSON string representation of extra cart item data */
  extraData?: string | null | undefined;
  /** Cart item product database ID or global ID */
  productId: number;
  /** Cart item quantity */
  quantity?: number | null | undefined;
  /** Cart item product variation attributes */
  variation?: Array<ProductAttributeInput | null | undefined> | null | undefined;
  /** Cart item product variation database ID or global ID */
  variationId?: number | null | undefined;
};

/** Countries enumeration */
export type CountriesEnum =
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AQ'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BV'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CU'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GS'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HM'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PN'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TC'
  | 'TD'
  | 'TF'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'UM'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'XK'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW';

/** Customer account credentials */
export type CreateAccountInput = {
  /** Set the current user to the newly created customer after checkout. */
  authenticate?: boolean | null | undefined;
  /** Customer password */
  password: string;
  /** Customer username */
  username: string;
};

/** Customer address information */
export type CustomerAddressInput = {
  /** Address 1 */
  address1?: string | null | undefined;
  /** Address 2 */
  address2?: string | null | undefined;
  /** City */
  city?: string | null | undefined;
  /** Company */
  company?: string | null | undefined;
  /** Country */
  country?: CountriesEnum | null | undefined;
  /** E-mail */
  email?: string | null | undefined;
  /** First name */
  firstName?: string | null | undefined;
  /** Last name */
  lastName?: string | null | undefined;
  /** Clear old address data */
  overwrite?: boolean | null | undefined;
  /** Phone */
  phone?: string | null | undefined;
  /** Zip Postal Code */
  postcode?: string | null | undefined;
  /** State */
  state?: string | null | undefined;
};

/** Meta data. */
export type MetaDataInput = {
  /** Meta ID. */
  id?: string | null | undefined;
  /** Meta key. */
  key: string;
  /** Meta value. */
  value: string;
};

/** Order status enumeration */
export type OrderStatusEnum =
  /** Cancelled */
  | 'CANCELLED'
  /** Draft */
  | 'CHECKOUT_DRAFT'
  /** Completed */
  | 'COMPLETED'
  /** Failed */
  | 'FAILED'
  /** On hold */
  | 'ON_HOLD'
  /** Pending payment */
  | 'PENDING'
  /** Processing */
  | 'PROCESSING'
  /** Refunded */
  | 'REFUNDED';

/** Options for ordering the connection */
export type ProductAttributeInput = {
  attributeName: string;
  attributeValue?: string | null | undefined;
  id?: number | null | undefined;
};

/** Product attribute type enumeration */
export type ProductAttributeTypesEnum =
  /** A global product attribute */
  | 'GLOBAL'
  /** A local product attribute */
  | 'LOCAL';

/** Product type enumeration */
export type ProductTypesEnum =
  /** An external product */
  | 'EXTERNAL'
  /** A product group */
  | 'GROUPED'
  /** A simple product */
  | 'SIMPLE'
  /** A variable product */
  | 'VARIABLE'
  /** A product variation */
  | 'VARIATION';

/** Fields to order the Products connection by */
export type ProductsOrderByEnum =
  /** Order by publish date */
  | 'DATE'
  /** Preserve the ID order given in the IN array */
  | 'IN'
  /** Order by the menu order value */
  | 'MENU_ORDER'
  /** Order by last modified date */
  | 'MODIFIED'
  /** Order by name */
  | 'NAME'
  /** Preserve slug order given in the NAME_IN array */
  | 'NAME_IN'
  /** Order by date product sale starts */
  | 'ON_SALE_FROM'
  /** Order by date product sale ends */
  | 'ON_SALE_TO'
  /** Order by parent ID */
  | 'PARENT'
  /** Order by product popularity */
  | 'POPULARITY'
  /** Order by product's current price */
  | 'PRICE'
  /** Order by product average rating */
  | 'RATING'
  /** Order by product's regular price */
  | 'REGULAR_PRICE'
  /** Order by number of reviews on product */
  | 'REVIEW_COUNT'
  /** Order by product's sale price */
  | 'SALE_PRICE'
  /** Order by slug */
  | 'SLUG'
  /** Order by total sales of products sold */
  | 'TOTAL_SALES';

/** Input for the registerCustomer mutation. */
export type RegisterCustomerInput = {
  /** User's AOL IM account. */
  aim?: string | null | undefined;
  /** Set the current user to the newly registered customer. Avoid using in GraphiQL or contexts where a nonce is sent, as it will cause nonce verification to fail. */
  authenticate?: boolean | null | undefined;
  /** Customer billing information */
  billing?: CustomerAddressInput | null | undefined;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: string | null | undefined;
  /** A string containing content about the user. */
  description?: string | null | undefined;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: string | null | undefined;
  /** A string containing the user's email address. */
  email?: string | null | undefined;
  /** The user's first name. */
  firstName?: string | null | undefined;
  /** User's Jabber account. */
  jabber?: string | null | undefined;
  /** The user's last name. */
  lastName?: string | null | undefined;
  /** User's locale. */
  locale?: string | null | undefined;
  /** Meta data. */
  metaData?: Array<MetaDataInput | null | undefined> | null | undefined;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: string | null | undefined;
  /** The user's nickname, defaults to the user's username. */
  nickname?: string | null | undefined;
  /** A string that contains the plain text password for the user. */
  password?: string | null | undefined;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: string | null | undefined;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: string | null | undefined;
  /** Customer shipping address */
  shipping?: CustomerAddressInput | null | undefined;
  /** Customer shipping is identical to billing address */
  shippingSameAsBilling?: boolean | null | undefined;
  /** A string that contains the user's username. */
  username?: string | null | undefined;
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: string | null | undefined;
  /** User's Yahoo IM account. */
  yim?: string | null | undefined;
};

/** Product stock status enumeration */
export type StockStatusEnum =
  | 'IN_STOCK'
  | 'ON_BACKORDER'
  | 'OUT_OF_STOCK';

/** Available classification systems for organizing content. Identifies the different taxonomy types that can be used for content categorization. */
export type TaxonomyEnum =
  /** Taxonomy enum category */
  | 'CATEGORY'
  /** Taxonomy enum post_format */
  | 'POSTFORMAT'
  /** Taxonomy enum product_brand */
  | 'PRODUCTBRAND'
  /** Taxonomy enum product_cat */
  | 'PRODUCTCATEGORY'
  /** Taxonomy enum product_tag */
  | 'PRODUCTTAG'
  /** Taxonomy enum product_type */
  | 'PRODUCTTYPE'
  /** Taxonomy enum product_shipping_class */
  | 'SHIPPINGCLASS'
  /** Taxonomy enum post_tag */
  | 'TAG'
  /** Taxonomy enum product_visibility */
  | 'VISIBLEPRODUCT';

/** Input for the updateCustomer mutation. */
export type UpdateCustomerInput = {
  /** User's AOL IM account. */
  aim?: string | null | undefined;
  /** Customer billing information */
  billing?: CustomerAddressInput | null | undefined;
  /** This is an ID that can be passed to a mutation by the client to track the progress of mutations and catch possible duplicate mutation submissions. */
  clientMutationId?: string | null | undefined;
  /** A string containing content about the user. */
  description?: string | null | undefined;
  /** A string that will be shown on the site. Defaults to user's username. It is likely that you will want to change this, for both appearance and security through obscurity (that is if you dont use and delete the default admin user). */
  displayName?: string | null | undefined;
  /** A string containing the user's email address. */
  email?: string | null | undefined;
  /** The user's first name. */
  firstName?: string | null | undefined;
  /** The ID of the user */
  id?: string | number | null | undefined;
  /** Whether to save changes on the session or in the database */
  isSession?: boolean | null | undefined;
  /** User's Jabber account. */
  jabber?: string | null | undefined;
  /** The user's last name. */
  lastName?: string | null | undefined;
  /** User's locale. */
  locale?: string | null | undefined;
  /** Meta data. */
  metaData?: Array<MetaDataInput | null | undefined> | null | undefined;
  /** A string that contains a URL-friendly name for the user. The default is the user's username. */
  nicename?: string | null | undefined;
  /** The user's nickname, defaults to the user's username. */
  nickname?: string | null | undefined;
  /** A string that contains the plain text password for the user. */
  password?: string | null | undefined;
  /** The date the user registered. Format is Y-m-d H:i:s. */
  registered?: string | null | undefined;
  /** A string for whether to enable the rich editor or not. False if not empty. */
  richEditing?: string | null | undefined;
  /** An array of roles to be assigned to the user. */
  roles?: Array<string | null | undefined> | null | undefined;
  /** Customer shipping address */
  shipping?: CustomerAddressInput | null | undefined;
  /** Customer shipping is identical to billing address */
  shippingSameAsBilling?: boolean | null | undefined;
  /** A string containing the user's URL for the user's web site. */
  websiteUrl?: string | null | undefined;
  /** User's Yahoo IM account. */
  yim?: string | null | undefined;
};

export type AddToCartMutationVariables = Exact<{
  input: AddToCartInput;
}>;


export type AddToCartMutation = { addToCart: { cart: { total: string | null, subtotal: string | null, totalTax: string | null, discountTotal: string | null, shippingTotal: string | null, needsShippingAddress: boolean | null, chosenShippingMethods: Array<string | null> | null, isEmpty: boolean | null, rawTotal: string | null, rawDiscountTotal: string | null, availableShippingMethods: Array<{ rates: Array<{ cost: string | null, id: string, label: string | null } | null> | null } | null> | null, appliedCoupons: Array<{ description: string | null, discountTax: string, discountAmount: string, code: string } | null> | null, contents: { itemCount: number | null, productCount: number | null, nodes: Array<{ quantity: number | null, key: string, product: { node:
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
             } | null, variation: { node: { name: string | null, slug: string | null, price: string | null, stockStatus: StockStatusEnum | null, regularPrice: string | null, salePrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null }> } | null } | null } | null };

export type ApplyCouponMutationVariables = Exact<{
  code: string;
}>;


export type ApplyCouponMutation = { applyCoupon: { applied: { code: string, description: string | null, discountTax: string, discountAmount: string } | null, cart: { total: string | null, subtotal: string | null, totalTax: string | null, discountTotal: string | null, shippingTotal: string | null, needsShippingAddress: boolean | null, chosenShippingMethods: Array<string | null> | null, isEmpty: boolean | null, rawTotal: string | null, rawDiscountTotal: string | null, availableShippingMethods: Array<{ rates: Array<{ cost: string | null, id: string, label: string | null } | null> | null } | null> | null, appliedCoupons: Array<{ description: string | null, discountTax: string, discountAmount: string, code: string } | null> | null, contents: { itemCount: number | null, productCount: number | null, nodes: Array<{ quantity: number | null, key: string, product: { node:
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
             } | null, variation: { node: { name: string | null, slug: string | null, price: string | null, stockStatus: StockStatusEnum | null, regularPrice: string | null, salePrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null }> } | null } | null } | null };

export type ChangeShippingCountyMutationVariables = Exact<{
  shippingState?: string | null | undefined;
  shippingCountry: CountriesEnum;
  billingState?: string | null | undefined;
  billingCountry: CountriesEnum;
}>;


export type ChangeShippingCountyMutation = { updateCustomer: { customer: { calculatedShipping: boolean | null, hasCalculatedShipping: boolean | null } | null } | null };

export type ChangeShippingMethodMutationVariables = Exact<{
  shippingMethods?: Array<string | null | undefined> | string | null | undefined;
}>;


export type ChangeShippingMethodMutation = { updateShippingMethod: { cart: { total: string | null, subtotal: string | null, totalTax: string | null, discountTotal: string | null, shippingTotal: string | null, needsShippingAddress: boolean | null, chosenShippingMethods: Array<string | null> | null, isEmpty: boolean | null, rawTotal: string | null, rawDiscountTotal: string | null, availableShippingMethods: Array<{ rates: Array<{ cost: string | null, id: string, label: string | null } | null> | null } | null> | null, appliedCoupons: Array<{ description: string | null, discountTax: string, discountAmount: string, code: string } | null> | null, contents: { itemCount: number | null, productCount: number | null, nodes: Array<{ quantity: number | null, key: string, product: { node:
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
             } | null, variation: { node: { name: string | null, slug: string | null, price: string | null, stockStatus: StockStatusEnum | null, regularPrice: string | null, salePrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null }> } | null } | null } | null };

export type CheckoutMutationVariables = Exact<{
  billing?: CustomerAddressInput | null | undefined;
  metaData?: Array<MetaDataInput | null | undefined> | MetaDataInput | null | undefined;
  paymentMethod?: string | null | undefined;
  shipping?: CustomerAddressInput | null | undefined;
  customerNote?: string | null | undefined;
  shipToDifferentAddress?: boolean | null | undefined;
  account?: CreateAccountInput | null | undefined;
  transactionId?: string | null | undefined;
  isPaid?: boolean | null | undefined;
  shippingMethod?: Array<string | null | undefined> | string | null | undefined;
  createdVia?: string | null | undefined;
}>;


export type CheckoutMutation = { checkout: { result: string | null, redirect: string | null, order: { needsPayment: boolean | null, needsProcessing: boolean | null, status: OrderStatusEnum | null, databaseId: number | null, orderKey: string | null, subtotal: string | null, total: string | null, totalTax: string | null, shippingTotal: string | null, paymentMethodTitle: string | null, paymentMethod: string | null, date: string | null, customer: { email: string | null } | null, lineItems: { nodes: Array<{ quantity: number | null, total: string | null, id: string, product: { node:
              | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
              | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
              | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
              | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
             } | null, variation: { node: { name: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null }> } | null } | null } | null };

export type EmptyCartMutationVariables = Exact<{ [key: string]: never; }>;


export type EmptyCartMutation = { emptyCart: { cart: { total: string | null, subtotal: string | null, totalTax: string | null, discountTotal: string | null, shippingTotal: string | null, needsShippingAddress: boolean | null, chosenShippingMethods: Array<string | null> | null, isEmpty: boolean | null, rawTotal: string | null, rawDiscountTotal: string | null, availableShippingMethods: Array<{ rates: Array<{ cost: string | null, id: string, label: string | null } | null> | null } | null> | null, appliedCoupons: Array<{ description: string | null, discountTax: string, discountAmount: string, code: string } | null> | null, contents: { itemCount: number | null, productCount: number | null, nodes: Array<{ quantity: number | null, key: string, product: { node:
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
             } | null, variation: { node: { name: string | null, slug: string | null, price: string | null, stockStatus: StockStatusEnum | null, regularPrice: string | null, salePrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null }> } | null } | null } | null };

export type CartFragment = { total: string | null, subtotal: string | null, totalTax: string | null, discountTotal: string | null, shippingTotal: string | null, needsShippingAddress: boolean | null, chosenShippingMethods: Array<string | null> | null, isEmpty: boolean | null, rawTotal: string | null, rawDiscountTotal: string | null, availableShippingMethods: Array<{ rates: Array<{ cost: string | null, id: string, label: string | null } | null> | null } | null> | null, appliedCoupons: Array<{ description: string | null, discountTax: string, discountAmount: string, code: string } | null> | null, contents: { itemCount: number | null, productCount: number | null, nodes: Array<{ quantity: number | null, key: string, product: { node:
          | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null }
          | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
         } | null, variation: { node: { name: string | null, slug: string | null, price: string | null, stockStatus: StockStatusEnum | null, regularPrice: string | null, salePrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null }> } | null };

export type CategoryImageFragment = { sourceUrl: string | null, altText: string | null, title: string | null };

export type ProductCategoryFragment = { count: number | null, databaseId: number, id: string, name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null };

export type CommentFragment = { content: string | null, id: string, date: string | null, author: { node:
      | { name: string | null, avatar: { url: string | null } | null }
      | { name: string | null, avatar: { url: string | null } | null }
     } | null };

export type CustomerFragment = { lastName: string | null, email: string | null, firstName: string | null, username: string | null, databaseId: number | null, cartToken: string | null, isPayingCustomer: boolean | null, date: string | null, billing: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null, shipping: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null };

export type AddressFragment = { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null };

export type DownloadableItemFragment = { id: string, name: string | null, url: string | null, accessExpires: string | null, downloadsRemaining: number | null, product:
    | { name: string | null, slug: string | null }
    | { name: string | null, slug: string | null }
    | { name: string | null, slug: string | null }
    | { name: string | null, slug: string | null }
    | { name: string | null, slug: string | null }
   | null };

export type ExternalProductFragment = { externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null };

export type ImageFragment = { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number };

type LineItemProduct_ExternalProduct_Fragment = { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null };

type LineItemProduct_GroupProduct_Fragment = { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null };

type LineItemProduct_SimpleProduct_Fragment = { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null };

type LineItemProduct_VariableProduct_Fragment = { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null };

export type LineItemProductFragment =
  | LineItemProduct_ExternalProduct_Fragment
  | LineItemProduct_GroupProduct_Fragment
  | LineItemProduct_SimpleProduct_Fragment
  | LineItemProduct_VariableProduct_Fragment
;

export type LineItemVariationFragment = { name: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null };

export type LineItemFragment = { quantity: number | null, total: string | null, id: string, product: { node:
      | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
      | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
      | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
      | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
     } | null, variation: { node: { name: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null };

export type OrderFragmentFragment = { orderNumber: string | null, date: string | null, status: OrderStatusEnum | null, needsPayment: boolean | null, needsProcessing: boolean | null, databaseId: number | null, orderKey: string | null, total: string | null, subtotal: string | null, discountTotal: string | null, totalTax: string | null, shippingTotal: string | null, paymentMethodTitle: string | null, paymentMethod: string | null, rawDiscountTotal: string | null, billing: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null, shipping: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null, customer: { lastName: string | null, email: string | null, firstName: string | null, username: string | null, databaseId: number | null, cartToken: string | null, isPayingCustomer: boolean | null, date: string | null, downloadableItems: { nodes: Array<{ id: string, name: string | null, url: string | null, accessExpires: string | null, downloadsRemaining: number | null, product:
          | { name: string | null, slug: string | null }
          | { name: string | null, slug: string | null }
          | { name: string | null, slug: string | null }
          | { name: string | null, slug: string | null }
          | { name: string | null, slug: string | null }
         | null }> } | null, billing: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null, shipping: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null } | null, downloadableItems: { nodes: Array<{ id: string, name: string | null, url: string | null, accessExpires: string | null, downloadsRemaining: number | null, product:
        | { name: string | null, slug: string | null }
        | { name: string | null, slug: string | null }
        | { name: string | null, slug: string | null }
        | { name: string | null, slug: string | null }
        | { name: string | null, slug: string | null }
       | null }> } | null, lineItems: { nodes: Array<{ quantity: number | null, total: string | null, id: string, product: { node:
          | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
          | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
          | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
          | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
         } | null, variation: { node: { name: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null }> } | null };

export type PaymentGatewayFragment = { title: string | null, id: string, description: string | null, icon: string | null };

type ProductCategories_ExternalProduct_Fragment = { productCategories: { nodes: Array<{ databaseId: number, slug: string | null, name: string | null, count: number | null }> } | null };

type ProductCategories_GroupProduct_Fragment = { productCategories: { nodes: Array<{ databaseId: number, slug: string | null, name: string | null, count: number | null }> } | null };

type ProductCategories_SimpleProduct_Fragment = { productCategories: { nodes: Array<{ databaseId: number, slug: string | null, name: string | null, count: number | null }> } | null };

type ProductCategories_VariableProduct_Fragment = { productCategories: { nodes: Array<{ databaseId: number, slug: string | null, name: string | null, count: number | null }> } | null };

export type ProductCategoriesFragment =
  | ProductCategories_ExternalProduct_Fragment
  | ProductCategories_GroupProduct_Fragment
  | ProductCategories_SimpleProduct_Fragment
  | ProductCategories_VariableProduct_Fragment
;

type ProductPricing_ExternalProduct_Fragment = { onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null };

type ProductPricing_GroupProduct_Fragment = { onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null };

type ProductPricing_SimpleProduct_Fragment = { onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null };

type ProductPricing_SimpleProductVariation_Fragment = { onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null };

type ProductPricing_VariableProduct_Fragment = { onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null };

export type ProductPricingFragment =
  | ProductPricing_ExternalProduct_Fragment
  | ProductPricing_GroupProduct_Fragment
  | ProductPricing_SimpleProduct_Fragment
  | ProductPricing_SimpleProductVariation_Fragment
  | ProductPricing_VariableProduct_Fragment
;

type ProductStock_SimpleProduct_Fragment = { stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null };

type ProductStock_SimpleProductVariation_Fragment = { stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null };

type ProductStock_VariableProduct_Fragment = { stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null };

export type ProductStockFragment =
  | ProductStock_SimpleProduct_Fragment
  | ProductStock_SimpleProductVariation_Fragment
  | ProductStock_VariableProduct_Fragment
;

export type ProductVariationFragment = { name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null };

export type SimpleProductFragment = { name: string | null, slug: string | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null };

type Terms_ExternalProduct_Fragment = { terms: { nodes: Array<
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
    > } | null };

type Terms_GroupProduct_Fragment = { terms: { nodes: Array<
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
    > } | null };

type Terms_SimpleProduct_Fragment = { terms: { nodes: Array<
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
    > } | null };

type Terms_VariableProduct_Fragment = { terms: { nodes: Array<
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
      | { taxonomyName: string | null, slug: string | null }
    > } | null };

export type TermsFragment =
  | Terms_ExternalProduct_Fragment
  | Terms_GroupProduct_Fragment
  | Terms_SimpleProduct_Fragment
  | Terms_VariableProduct_Fragment
;

export type VariableProductFragment = { name: string | null, slug: string | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null };

export type VariationAttributeFragment = { name: string | null, attributeId: number | null, value: string | null, label: string | null };

export type ViewerFragment = { lastName: string | null, email: string | null, databaseId: number, id: string, firstName: string | null, username: string | null, nicename: string | null, cartToken: string | null, avatar: { url: string | null } | null };

export type ViewerSummaryFragment = { id: string, databaseId: number, firstName: string | null, lastName: string | null, username: string | null, nicename: string | null, email: string | null, cartToken: string | null, avatar: { url: string | null } | null };

export type GetAllTermsQueryVariables = Exact<{
  hideEmpty?: boolean | null | undefined;
  taxonomies: Array<TaxonomyEnum | null | undefined> | TaxonomyEnum;
  first?: number | null | undefined;
}>;


export type GetAllTermsQuery = { terms: { nodes: Array<
      | { taxonomyName: string | null, name: string | null, slug: string | null, count: number | null }
      | { taxonomyName: string | null, name: string | null, slug: string | null, count: number | null }
      | { taxonomyName: string | null, name: string | null, slug: string | null, count: number | null }
      | { taxonomyName: string | null, name: string | null, slug: string | null, count: number | null }
      | { taxonomyName: string | null, name: string | null, slug: string | null, count: number | null }
      | { taxonomyName: string | null, name: string | null, slug: string | null, count: number | null }
      | { taxonomyName: string | null, name: string | null, slug: string | null, count: number | null }
      | { taxonomyName: string | null, name: string | null, slug: string | null, count: number | null }
      | { taxonomyName: string | null, name: string | null, slug: string | null, count: number | null }
    > } | null };

export type GetAllowedCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllowedCountriesQuery = { allowedCountries: Array<CountriesEnum | null> | null };

export type GetCartQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartQuery = { cart: { total: string | null, subtotal: string | null, totalTax: string | null, discountTotal: string | null, shippingTotal: string | null, needsShippingAddress: boolean | null, chosenShippingMethods: Array<string | null> | null, isEmpty: boolean | null, rawTotal: string | null, rawDiscountTotal: string | null, availableShippingMethods: Array<{ rates: Array<{ cost: string | null, id: string, label: string | null } | null> | null } | null> | null, appliedCoupons: Array<{ description: string | null, discountTax: string, discountAmount: string, code: string } | null> | null, contents: { itemCount: number | null, productCount: number | null, nodes: Array<{ quantity: number | null, key: string, product: { node:
            | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
            | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null }
            | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
            | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
           } | null, variation: { node: { name: string | null, slug: string | null, price: string | null, stockStatus: StockStatusEnum | null, regularPrice: string | null, salePrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null }> } | null } | null, customer: { lastName: string | null, email: string | null, firstName: string | null, username: string | null, databaseId: number | null, cartToken: string | null, isPayingCustomer: boolean | null, date: string | null, billing: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null, shipping: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null } | null, viewer: { lastName: string | null, email: string | null, databaseId: number, id: string, firstName: string | null, username: string | null, nicename: string | null, cartToken: string | null, avatar: { url: string | null } | null } | null, paymentGateways: { nodes: Array<{ title: string | null, id: string, description: string | null, icon: string | null }> } | null };

export type GetCartSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCartSummaryQuery = { cart: { isEmpty: boolean | null, contents: { itemCount: number | null, productCount: number | null } | null } | null, viewer: { lastName: string | null, email: string | null, databaseId: number, id: string, firstName: string | null, username: string | null, nicename: string | null, cartToken: string | null, avatar: { url: string | null } | null } | null };

export type GetOrderQueryVariables = Exact<{
  id: string;
}>;


export type GetOrderQuery = { customer: { orders: { nodes: Array<{ orderNumber: string | null, date: string | null, status: OrderStatusEnum | null, needsPayment: boolean | null, needsProcessing: boolean | null, databaseId: number | null, orderKey: string | null, total: string | null, subtotal: string | null, discountTotal: string | null, totalTax: string | null, shippingTotal: string | null, paymentMethodTitle: string | null, paymentMethod: string | null, rawDiscountTotal: string | null, billing: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null, shipping: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null, customer: { lastName: string | null, email: string | null, firstName: string | null, username: string | null, databaseId: number | null, cartToken: string | null, isPayingCustomer: boolean | null, date: string | null, downloadableItems: { nodes: Array<{ id: string, name: string | null, url: string | null, accessExpires: string | null, downloadsRemaining: number | null, product:
                | { name: string | null, slug: string | null }
                | { name: string | null, slug: string | null }
                | { name: string | null, slug: string | null }
                | { name: string | null, slug: string | null }
                | { name: string | null, slug: string | null }
               | null }> } | null, billing: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null, shipping: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null } | null, downloadableItems: { nodes: Array<{ id: string, name: string | null, url: string | null, accessExpires: string | null, downloadsRemaining: number | null, product:
              | { name: string | null, slug: string | null }
              | { name: string | null, slug: string | null }
              | { name: string | null, slug: string | null }
              | { name: string | null, slug: string | null }
              | { name: string | null, slug: string | null }
             | null }> } | null, lineItems: { nodes: Array<{ quantity: number | null, total: string | null, id: string, product: { node:
                | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
                | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
                | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
                | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
               } | null, variation: { node: { name: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null }> } | null }> } | null } | null };

export type GetOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrdersQuery = { customer: { orders: { nodes: Array<{ orderNumber: string | null, date: string | null, status: OrderStatusEnum | null, needsPayment: boolean | null, needsProcessing: boolean | null, databaseId: number | null, orderKey: string | null, total: string | null, subtotal: string | null, discountTotal: string | null, totalTax: string | null, shippingTotal: string | null, paymentMethodTitle: string | null, paymentMethod: string | null, rawDiscountTotal: string | null, billing: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null, shipping: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null, customer: { lastName: string | null, email: string | null, firstName: string | null, username: string | null, databaseId: number | null, cartToken: string | null, isPayingCustomer: boolean | null, date: string | null, downloadableItems: { nodes: Array<{ id: string, name: string | null, url: string | null, accessExpires: string | null, downloadsRemaining: number | null, product:
                | { name: string | null, slug: string | null }
                | { name: string | null, slug: string | null }
                | { name: string | null, slug: string | null }
                | { name: string | null, slug: string | null }
                | { name: string | null, slug: string | null }
               | null }> } | null, billing: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null, shipping: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null } | null, downloadableItems: { nodes: Array<{ id: string, name: string | null, url: string | null, accessExpires: string | null, downloadsRemaining: number | null, product:
              | { name: string | null, slug: string | null }
              | { name: string | null, slug: string | null }
              | { name: string | null, slug: string | null }
              | { name: string | null, slug: string | null }
              | { name: string | null, slug: string | null }
             | null }> } | null, lineItems: { nodes: Array<{ quantity: number | null, total: string | null, id: string, product: { node:
                | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
                | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
                | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
                | { name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }
               } | null, variation: { node: { name: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null }> } | null }> } | null } | null };

export type GetProductQueryVariables = Exact<{
  slug: string | number;
}>;


export type GetProductQuery = { product:
    | { name: string | null, type: ProductTypesEnum | null, databaseId: number, id: string, slug: string | null, sku: string | null, description: string | null, shortDescription: string | null, externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawDescription: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, metaData: Array<{ id: string | null, key: string, value: string | null } | null> | null, related: { nodes: Array<
          | { externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | { name: string | null, slug: string | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | { name: string | null, slug: string | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | Record<PropertyKey, never>
        > } | null, reviews: { averageRating: number | null, edges: Array<{ rating: number | null, node: { content: string | null, id: string, date: string | null, author: { node:
                | { name: string | null, avatar: { url: string | null } | null }
                | { name: string | null, avatar: { url: string | null } | null }
               } | null } }> } | null, attributes: { nodes: Array<
          | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum, terms: { nodes: Array<
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
              > } | null }
          | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum }
        > } | null, productCategories: { nodes: Array<{ databaseId: number, slug: string | null, name: string | null, count: number | null }> } | null, terms: { nodes: Array<
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
        > } | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
    | { name: string | null, type: ProductTypesEnum | null, databaseId: number, id: string, slug: string | null, sku: string | null, description: string | null, shortDescription: string | null, rawDescription: string | null, metaData: Array<{ id: string | null, key: string, value: string | null } | null> | null, related: { nodes: Array<
          | { externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | { name: string | null, slug: string | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | { name: string | null, slug: string | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | Record<PropertyKey, never>
        > } | null, reviews: { averageRating: number | null, edges: Array<{ rating: number | null, node: { content: string | null, id: string, date: string | null, author: { node:
                | { name: string | null, avatar: { url: string | null } | null }
                | { name: string | null, avatar: { url: string | null } | null }
               } | null } }> } | null, attributes: { nodes: Array<
          | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum, terms: { nodes: Array<
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
              > } | null }
          | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum }
        > } | null, productCategories: { nodes: Array<{ databaseId: number, slug: string | null, name: string | null, count: number | null }> } | null, terms: { nodes: Array<
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
        > } | null }
    | { name: string | null, type: ProductTypesEnum | null, databaseId: number, id: string, slug: string | null, sku: string | null, description: string | null, shortDescription: string | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawDescription: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, metaData: Array<{ id: string | null, key: string, value: string | null } | null> | null, related: { nodes: Array<
          | { externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | { name: string | null, slug: string | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | { name: string | null, slug: string | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | Record<PropertyKey, never>
        > } | null, reviews: { averageRating: number | null, edges: Array<{ rating: number | null, node: { content: string | null, id: string, date: string | null, author: { node:
                | { name: string | null, avatar: { url: string | null } | null }
                | { name: string | null, avatar: { url: string | null } | null }
               } | null } }> } | null, attributes: { nodes: Array<
          | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum, terms: { nodes: Array<
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
              > } | null }
          | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum }
        > } | null, productCategories: { nodes: Array<{ databaseId: number, slug: string | null, name: string | null, count: number | null }> } | null, terms: { nodes: Array<
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
        > } | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
    | { name: string | null, type: ProductTypesEnum | null, databaseId: number, id: string, slug: string | null, sku: string | null, description: string | null, shortDescription: string | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawDescription: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, metaData: Array<{ id: string | null, key: string, value: string | null } | null> | null, related: { nodes: Array<
          | { externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | { name: string | null, slug: string | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | { name: string | null, slug: string | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
          | Record<PropertyKey, never>
        > } | null, reviews: { averageRating: number | null, edges: Array<{ rating: number | null, node: { content: string | null, id: string, date: string | null, author: { node:
                | { name: string | null, avatar: { url: string | null } | null }
                | { name: string | null, avatar: { url: string | null } | null }
               } | null } }> } | null, attributes: { nodes: Array<
          | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum, terms: { nodes: Array<
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
                | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
              > } | null }
          | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum }
        > } | null, productCategories: { nodes: Array<{ databaseId: number, slug: string | null, name: string | null, count: number | null }> } | null, terms: { nodes: Array<
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
          | { taxonomyName: string | null, slug: string | null }
        > } | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
   | null };

type ProductWithAttributes_ExternalProduct_Fragment = { attributes: { nodes: Array<
      | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum, terms: { nodes: Array<
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
          > } | null }
      | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum }
    > } | null };

type ProductWithAttributes_GroupProduct_Fragment = { attributes: { nodes: Array<
      | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum, terms: { nodes: Array<
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
          > } | null }
      | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum }
    > } | null };

type ProductWithAttributes_SimpleProduct_Fragment = { attributes: { nodes: Array<
      | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum, terms: { nodes: Array<
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
          > } | null }
      | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum }
    > } | null };

type ProductWithAttributes_VariableProduct_Fragment = { attributes: { nodes: Array<
      | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum, terms: { nodes: Array<
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
            | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
          > } | null }
      | { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum }
    > } | null };

export type ProductWithAttributesFragment =
  | ProductWithAttributes_ExternalProduct_Fragment
  | ProductWithAttributes_GroupProduct_Fragment
  | ProductWithAttributes_SimpleProduct_Fragment
  | ProductWithAttributes_VariableProduct_Fragment
;

type ProductAttribute_GlobalProductAttribute_Fragment = { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum, terms: { nodes: Array<
      | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
      | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
      | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
      | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
      | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
      | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
      | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
      | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
      | { name: string | null, slug: string | null, taxonomyName: string | null, databaseId: number }
    > } | null };

type ProductAttribute_LocalProductAttribute_Fragment = { variation: boolean | null, name: string | null, id: string, options: Array<string | null> | null, label: string | null, scope: ProductAttributeTypesEnum };

export type ProductAttributeFragment =
  | ProductAttribute_GlobalProductAttribute_Fragment
  | ProductAttribute_LocalProductAttribute_Fragment
;

export type GetProductCategoriesQueryVariables = Exact<{
  first?: number | null | undefined;
}>;


export type GetProductCategoriesQuery = { productCategories: { nodes: Array<{ count: number | null, databaseId: number, id: string, name: string | null, slug: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null }> } | null };

export type GetProductsQueryVariables = Exact<{
  after?: string | null | undefined;
  slug?: Array<string | null | undefined> | string | null | undefined;
  first?: number | null | undefined;
  orderby?: ProductsOrderByEnum | null | undefined;
}>;


export type GetProductsQuery = { products: { pageInfo: { hasNextPage: boolean, endCursor: string | null }, nodes: Array<
      | { name: string | null, slug: string | null, type: ProductTypesEnum | null, databaseId: number, id: string, averageRating: number | null, reviewCount: number | null, externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, terms: { nodes: Array<
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
          > } | null, productCategories: { nodes: Array<{ databaseId: number, slug: string | null, name: string | null, count: number | null }> } | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
      | { name: string | null, slug: string | null, type: ProductTypesEnum | null, databaseId: number, id: string, averageRating: number | null, reviewCount: number | null, terms: { nodes: Array<
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
          > } | null, productCategories: { nodes: Array<{ databaseId: number, slug: string | null, name: string | null, count: number | null }> } | null }
      | { name: string | null, slug: string | null, type: ProductTypesEnum | null, databaseId: number, id: string, averageRating: number | null, reviewCount: number | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, terms: { nodes: Array<
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
          > } | null, productCategories: { nodes: Array<{ databaseId: number, slug: string | null, name: string | null, count: number | null }> } | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
      | { name: string | null, slug: string | null, type: ProductTypesEnum | null, databaseId: number, id: string, averageRating: number | null, reviewCount: number | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, terms: { nodes: Array<
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
            | { taxonomyName: string | null, slug: string | null }
          > } | null, productCategories: { nodes: Array<{ databaseId: number, slug: string | null, name: string | null, count: number | null }> } | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
    > } | null };

export type GetStatesQueryVariables = Exact<{
  country: CountriesEnum;
}>;


export type GetStatesQuery = { countryStates: Array<{ code: string, name: string } | null> | null };

export type GetStockStatusQueryVariables = Exact<{
  slug: string | number;
}>;


export type GetStockStatusQuery = { product:
    | { stockStatus: StockStatusEnum | null }
    | { stockStatus: StockStatusEnum | null, variations: { nodes: Array<{ stockStatus: StockStatusEnum | null }> } | null }
    | Record<PropertyKey, never>
   | null };

export type LoginMutationVariables = Exact<{
  username: string;
  password: string;
}>;


export type LoginMutation = { login: { authToken: string | null, refreshToken: string | null, cartToken: string | null, user: { name: string | null, username: string | null, email: string | null, databaseId: number } | null, customer: { databaseId: number | null, username: string | null, firstName: string | null, lastName: string | null, email: string | null, cartToken: string | null } | null } | null };

export type RefreshJwtAuthTokenMutationVariables = Exact<{
  jwtRefreshToken: string;
}>;


export type RefreshJwtAuthTokenMutation = { refreshJwtAuthToken: { authToken: string | null } | null };

export type RegisterCustomerMutationVariables = Exact<{
  input: RegisterCustomerInput;
}>;


export type RegisterCustomerMutation = { registerCustomer: { customer: { lastName: string | null, email: string | null, firstName: string | null, username: string | null, databaseId: number | null, cartToken: string | null, isPayingCustomer: boolean | null, date: string | null, billing: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null, shipping: { address1: string | null, address2: string | null, city: string | null, country: CountriesEnum | null, email: string | null, firstName: string | null, lastName: string | null, phone: string | null, postcode: string | null, company: string | null, state: string | null } | null } | null } | null };

export type RemoveCouponsMutationVariables = Exact<{
  codes: Array<string | null | undefined> | string;
}>;


export type RemoveCouponsMutation = { removeCoupons: { cart: { total: string | null, subtotal: string | null, totalTax: string | null, discountTotal: string | null, shippingTotal: string | null, needsShippingAddress: boolean | null, chosenShippingMethods: Array<string | null> | null, isEmpty: boolean | null, rawTotal: string | null, rawDiscountTotal: string | null, availableShippingMethods: Array<{ rates: Array<{ cost: string | null, id: string, label: string | null } | null> | null } | null> | null, appliedCoupons: Array<{ description: string | null, discountTax: string, discountAmount: string, code: string } | null> | null, contents: { itemCount: number | null, productCount: number | null, nodes: Array<{ quantity: number | null, key: string, product: { node:
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
             } | null, variation: { node: { name: string | null, slug: string | null, price: string | null, stockStatus: StockStatusEnum | null, regularPrice: string | null, salePrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null }> } | null } | null } | null };

export type ResetPasswordEmailMutationVariables = Exact<{
  username: string;
}>;


export type ResetPasswordEmailMutation = { sendPasswordResetEmail: { success: boolean | null } | null };

export type ResetPasswordKeyMutationVariables = Exact<{
  key: string;
  login: string;
  password: string;
}>;


export type ResetPasswordKeyMutation = { resetUserPassword: { user: { id: string } | null } | null };

export type UpDateCartQuantityMutationVariables = Exact<{
  key: string | number;
  quantity: number;
}>;


export type UpDateCartQuantityMutation = { updateItemQuantities: { cart: { total: string | null, subtotal: string | null, totalTax: string | null, discountTotal: string | null, shippingTotal: string | null, needsShippingAddress: boolean | null, chosenShippingMethods: Array<string | null> | null, isEmpty: boolean | null, rawTotal: string | null, rawDiscountTotal: string | null, availableShippingMethods: Array<{ rates: Array<{ cost: string | null, id: string, label: string | null } | null> | null } | null> | null, appliedCoupons: Array<{ description: string | null, discountTax: string, discountAmount: string, code: string } | null> | null, contents: { itemCount: number | null, productCount: number | null, nodes: Array<{ quantity: number | null, key: string, product: { node:
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, externalUrl: string | null, buttonText: string | null, onSale: boolean | null, price: string | null, regularPrice: string | null, salePrice: string | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, averageRating: number | null, weight: string | null, length: string | null, width: string | null, height: string | null, reviewCount: number | null, virtual: boolean | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
              | { name: string | null, slug: string | null, sku: string | null, databaseId: number, type: ProductTypesEnum | null, price: string | null, date: string | null, regularPrice: string | null, salePrice: string | null, stockStatus: StockStatusEnum | null, stockQuantity: number | null, lowStockAmount: number | null, onSale: boolean | null, weight: string | null, length: string | null, width: string | null, height: string | null, averageRating: number | null, reviewCount: number | null, totalSales: number | null, rawPrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, defaultAttributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null, variations: { nodes: Array<{ name: string | null, databaseId: number, price: string | null, regularPrice: string | null, salePrice: string | null, slug: string | null, stockQuantity: number | null, stockStatus: StockStatusEnum | null, hasAttributes: boolean | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null, databaseId: number, cartSourceUrl: string | null, productCardSourceUrl: string | null } | null, attributes: { nodes: Array<{ name: string | null, attributeId: number | null, value: string | null, label: string | null }> } | null }> } | null, galleryImages: { nodes: Array<{ databaseId: number, sourceUrl: string | null, altText: string | null, title: string | null }> } | null }
             } | null, variation: { node: { name: string | null, slug: string | null, price: string | null, stockStatus: StockStatusEnum | null, regularPrice: string | null, salePrice: string | null, rawRegularPrice: string | null, rawSalePrice: string | null, image: { sourceUrl: string | null, altText: string | null, title: string | null } | null } } | null }> } | null } | null } | null };

export type UpdateCustomerMutationVariables = Exact<{
  input: UpdateCustomerInput;
}>;


export type UpdateCustomerMutation = { updateCustomer: { customer: { downloadableItems: { nodes: Array<{ id: string, name: string | null, url: string | null, accessExpires: string | null, downloadsRemaining: number | null, product:
            | { name: string | null, slug: string | null }
            | { name: string | null, slug: string | null }
            | { name: string | null, slug: string | null }
            | { name: string | null, slug: string | null }
            | { name: string | null, slug: string | null }
           | null }> } | null } | null } | null };

export type UpdatePasswordMutationVariables = Exact<{
  id: string | number;
  password: string;
}>;


export type UpdatePasswordMutation = { updateUser: { user: { id: string } | null } | null };

export const ImageFragmentDoc = gql`
    fragment Image on MediaItem {
  sourceUrl
  altText
  title
  databaseId
}
    `;
export const SimpleProductFragmentDoc = gql`
    fragment SimpleProduct on SimpleProduct {
  name
  slug
  price
  rawPrice: price(format: RAW)
  date
  regularPrice
  rawRegularPrice: regularPrice(format: RAW)
  salePrice
  rawSalePrice: salePrice(format: RAW)
  stockStatus
  stockQuantity
  lowStockAmount
  onSale
  averageRating
  weight
  length
  width
  height
  reviewCount
  virtual
  image {
    sourceUrl
    altText
    title
    databaseId
    cartSourceUrl: sourceUrl(size: THUMBNAIL)
    productCardSourceUrl: sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
  }
  galleryImages(first: 20) {
    nodes {
      ...Image
      databaseId
    }
  }
}
    ${ImageFragmentDoc}`;
export const VariationAttributeFragmentDoc = gql`
    fragment VariationAttribute on VariationAttribute {
  name
  attributeId
  value
  label
}
    `;
export const ProductVariationFragmentDoc = gql`
    fragment ProductVariation on ProductVariation {
  name
  databaseId
  price
  regularPrice
  salePrice
  rawSalePrice: salePrice(format: RAW)
  slug
  stockQuantity
  stockStatus
  hasAttributes
  image {
    sourceUrl
    altText
    title
    databaseId
    cartSourceUrl: sourceUrl(size: THUMBNAIL)
    productCardSourceUrl: sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
  }
  attributes {
    nodes {
      ...VariationAttribute
    }
  }
}
    ${VariationAttributeFragmentDoc}`;
export const VariableProductFragmentDoc = gql`
    fragment VariableProduct on VariableProduct {
  name
  slug
  price
  rawPrice: price(format: RAW)
  date
  regularPrice
  rawRegularPrice: regularPrice(format: RAW)
  salePrice
  rawSalePrice: salePrice(format: RAW)
  stockStatus
  stockQuantity
  lowStockAmount
  onSale
  weight
  length
  width
  height
  image {
    sourceUrl
    altText
    title
    databaseId
    cartSourceUrl: sourceUrl(size: THUMBNAIL)
    productCardSourceUrl: sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
  }
  averageRating
  reviewCount
  totalSales
  defaultAttributes {
    nodes {
      ...VariationAttribute
    }
  }
  variations(first: 100) {
    nodes {
      ...ProductVariation
    }
  }
  galleryImages(first: 20) {
    nodes {
      ...Image
      databaseId
    }
  }
}
    ${VariationAttributeFragmentDoc}
${ProductVariationFragmentDoc}
${ImageFragmentDoc}`;
export const ProductPricingFragmentDoc = gql`
    fragment ProductPricing on ProductWithPricing {
  price
  rawPrice: price(format: RAW)
  regularPrice
  rawRegularPrice: regularPrice(format: RAW)
  salePrice
  rawSalePrice: salePrice(format: RAW)
  ... on SimpleProduct {
    onSale
  }
  ... on VariableProduct {
    onSale
  }
  ... on ExternalProduct {
    onSale
  }
  ... on GroupProduct {
    onSale
  }
  ... on ProductVariation {
    onSale
  }
}
    `;
export const ExternalProductFragmentDoc = gql`
    fragment ExternalProduct on ExternalProduct {
  externalUrl
  buttonText
  ...ProductPricing
  image {
    sourceUrl
    altText
    title
    databaseId
    cartSourceUrl: sourceUrl(size: THUMBNAIL)
    productCardSourceUrl: sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
  }
  galleryImages(first: 20) {
    nodes {
      ...Image
      databaseId
    }
  }
}
    ${ProductPricingFragmentDoc}
${ImageFragmentDoc}`;
export const CartFragmentDoc = gql`
    fragment Cart on Cart {
  total
  rawTotal: total(format: RAW)
  subtotal
  totalTax
  discountTotal
  rawDiscountTotal: discountTotal(format: RAW)
  shippingTotal
  needsShippingAddress
  chosenShippingMethods
  availableShippingMethods {
    rates {
      cost
      id
      label
    }
  }
  appliedCoupons {
    description
    discountTax
    discountAmount
    code
  }
  isEmpty
  contents(first: 100) {
    itemCount
    productCount
    nodes {
      quantity
      key
      product {
        node {
          name
          slug
          sku
          databaseId
          type
          ...SimpleProduct
          ...VariableProduct
          ...ExternalProduct
        }
      }
      variation {
        node {
          name
          slug
          price
          stockStatus
          regularPrice
          rawRegularPrice: regularPrice(format: RAW)
          salePrice
          rawSalePrice: salePrice(format: RAW)
          image {
            sourceUrl(size: THUMBNAIL)
            altText
            title
          }
        }
      }
    }
  }
}
    ${SimpleProductFragmentDoc}
${VariableProductFragmentDoc}
${ExternalProductFragmentDoc}`;
export const CategoryImageFragmentDoc = gql`
    fragment CategoryImage on MediaItem {
  sourceUrl(size: MEDIUM_LARGE)
  altText
  title
}
    `;
export const ProductCategoryFragmentDoc = gql`
    fragment ProductCategory on ProductCategory {
  count
  databaseId
  id
  name
  slug
  image {
    sourceUrl(size: MEDIUM_LARGE)
    altText
    title
  }
}
    `;
export const CommentFragmentDoc = gql`
    fragment Comment on Comment {
  content
  id
  date
  author {
    node {
      name
      avatar {
        url
      }
    }
  }
}
    `;
export const AddressFragmentDoc = gql`
    fragment Address on CustomerAddress {
  address1
  address2
  city
  country
  email
  firstName
  lastName
  phone
  postcode
  company
  state
}
    `;
export const CustomerFragmentDoc = gql`
    fragment Customer on Customer {
  lastName
  email
  firstName
  username
  databaseId
  cartToken
  isPayingCustomer
  date
  billing {
    ...Address
  }
  shipping {
    ...Address
  }
}
    ${AddressFragmentDoc}`;
export const DownloadableItemFragmentDoc = gql`
    fragment DownloadableItem on DownloadableItem {
  id
  name
  product {
    name
    slug
  }
  url
  accessExpires
  downloadsRemaining
}
    `;
export const LineItemProductFragmentDoc = gql`
    fragment LineItemProduct on Product {
  name
  slug
  image {
    sourceUrl(size: THUMBNAIL)
    altText
    title
  }
}
    `;
export const LineItemVariationFragmentDoc = gql`
    fragment LineItemVariation on ProductVariation {
  name
  image {
    sourceUrl(size: THUMBNAIL)
    altText
    title
  }
}
    `;
export const LineItemFragmentDoc = gql`
    fragment LineItem on LineItem {
  quantity
  total
  id
  product {
    node {
      ...LineItemProduct
    }
  }
  variation {
    node {
      ...LineItemVariation
    }
  }
}
    ${LineItemProductFragmentDoc}
${LineItemVariationFragmentDoc}`;
export const OrderFragmentFragmentDoc = gql`
    fragment OrderFragment on Order {
  orderNumber
  date
  status
  needsPayment
  needsProcessing
  databaseId
  orderKey
  total
  subtotal
  discountTotal
  rawDiscountTotal: discountTotal(format: RAW)
  totalTax
  shippingTotal
  paymentMethodTitle
  paymentMethod
  billing {
    ...Address
  }
  shipping {
    ...Address
  }
  customer {
    ...Customer
    downloadableItems(first: 100) {
      nodes {
        ...DownloadableItem
      }
    }
  }
  downloadableItems(first: 100) {
    nodes {
      ...DownloadableItem
    }
  }
  lineItems {
    nodes {
      ...LineItem
    }
  }
}
    ${AddressFragmentDoc}
${CustomerFragmentDoc}
${DownloadableItemFragmentDoc}
${LineItemFragmentDoc}`;
export const PaymentGatewayFragmentDoc = gql`
    fragment PaymentGateway on PaymentGateway {
  title
  id
  description
  icon
}
    `;
export const ProductCategoriesFragmentDoc = gql`
    fragment ProductCategories on Product {
  productCategories {
    nodes {
      databaseId
      slug
      name
      count
    }
  }
}
    `;
export const ProductStockFragmentDoc = gql`
    fragment ProductStock on InventoriedProduct {
  stockStatus
  stockQuantity
  lowStockAmount
}
    `;
export const TermsFragmentDoc = gql`
    fragment Terms on Product {
  terms(first: 100) {
    nodes {
      taxonomyName
      slug
    }
  }
}
    `;
export const ViewerFragmentDoc = gql`
    fragment Viewer on User {
  lastName
  email
  databaseId
  id
  firstName
  username
  nicename
  cartToken
  avatar {
    url
  }
}
    `;
export const ViewerSummaryFragmentDoc = gql`
    fragment ViewerSummary on User {
  id
  databaseId
  firstName
  lastName
  username
  nicename
  email
  cartToken
  avatar {
    url
  }
}
    `;
export const ProductAttributeFragmentDoc = gql`
    fragment ProductAttribute on ProductAttribute {
  variation
  name
  id
  options
  label
  scope
  ... on GlobalProductAttribute {
    terms(where: {orderby: TERM_ORDER, order: ASC}) {
      nodes {
        name
        slug
        taxonomyName
        databaseId
      }
    }
  }
}
    `;
export const ProductWithAttributesFragmentDoc = gql`
    fragment ProductWithAttributes on ProductWithAttributes {
  attributes {
    nodes {
      ...ProductAttribute
    }
  }
}
    ${ProductAttributeFragmentDoc}`;
export const AddToCartDocument = gql`
    mutation addToCart($input: AddToCartInput!) {
  addToCart(input: $input) {
    cart {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export const ApplyCouponDocument = gql`
    mutation applyCoupon($code: String!) {
  applyCoupon(input: {code: $code}) {
    applied {
      code
      description
      discountTax
      discountAmount
    }
    cart {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export const ChangeShippingCountyDocument = gql`
    mutation ChangeShippingCounty($shippingState: String, $shippingCountry: CountriesEnum!, $billingState: String, $billingCountry: CountriesEnum!) {
  updateCustomer(
    input: {shipping: {state: $shippingState, country: $shippingCountry}, billing: {state: $billingState, country: $billingCountry}}
  ) {
    customer {
      calculatedShipping
      hasCalculatedShipping
    }
  }
}
    `;
export const ChangeShippingMethodDocument = gql`
    mutation ChangeShippingMethod($shippingMethods: [String] = []) {
  updateShippingMethod(input: {shippingMethods: $shippingMethods}) {
    cart {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export const CheckoutDocument = gql`
    mutation Checkout($billing: CustomerAddressInput = {}, $metaData: [MetaDataInput] = [], $paymentMethod: String = "stripe", $shipping: CustomerAddressInput = {}, $customerNote: String = "", $shipToDifferentAddress: Boolean = false, $account: CreateAccountInput = {username: "", password: ""}, $transactionId: String = "", $isPaid: Boolean = false, $shippingMethod: [String] = [], $createdVia: String = "WooNuxt") {
  checkout(
    input: {paymentMethod: $paymentMethod, billing: $billing, metaData: $metaData, shipping: $shipping, shippingMethod: $shippingMethod, customerNote: $customerNote, shipToDifferentAddress: $shipToDifferentAddress, account: $account, transactionId: $transactionId, isPaid: $isPaid, createdVia: $createdVia}
  ) {
    result
    redirect
    order {
      needsPayment
      needsProcessing
      status
      databaseId
      orderKey
      subtotal
      total
      subtotal
      totalTax
      shippingTotal
      paymentMethodTitle
      paymentMethod
      date
      subtotal
      customer {
        email
      }
      lineItems {
        nodes {
          ...LineItem
        }
      }
    }
  }
}
    ${LineItemFragmentDoc}`;
export const EmptyCartDocument = gql`
    mutation EmptyCart {
  emptyCart(input: {clearPersistentCart: true}) {
    cart {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export const GetAllTermsDocument = gql`
    query getAllTerms($hideEmpty: Boolean = true, $taxonomies: [TaxonomyEnum]!, $first: Int = 100) {
  terms(where: {taxonomies: $taxonomies, hideEmpty: $hideEmpty}, first: $first) {
    nodes {
      taxonomyName
      name
      slug
      count
    }
  }
}
    `;
export const GetAllowedCountriesDocument = gql`
    query getAllowedCountries {
  allowedCountries
}
    `;
export const GetCartDocument = gql`
    query getCart {
  cart {
    ...Cart
  }
  customer {
    ...Customer
  }
  viewer {
    ...Viewer
  }
  paymentGateways {
    nodes {
      ...PaymentGateway
    }
  }
}
    ${CartFragmentDoc}
${CustomerFragmentDoc}
${ViewerFragmentDoc}
${PaymentGatewayFragmentDoc}`;
export const GetCartSummaryDocument = gql`
    query getCartSummary {
  cart {
    isEmpty
    contents(first: 1) {
      itemCount
      productCount
    }
  }
  viewer {
    ...Viewer
  }
}
    ${ViewerFragmentDoc}`;
export const GetOrderDocument = gql`
    query getOrder($id: String!) {
  customer {
    orders(where: {search: $id}) {
      nodes {
        ...OrderFragment
      }
    }
  }
}
    ${OrderFragmentFragmentDoc}`;
export const GetOrdersDocument = gql`
    query getOrders {
  customer {
    orders(first: 100) {
      nodes {
        ...OrderFragment
      }
    }
  }
}
    ${OrderFragmentFragmentDoc}`;
export const GetProductDocument = gql`
    query getProduct($slug: ID!) {
  product(id: $slug, idType: SLUG) {
    name
    type
    databaseId
    id
    metaData {
      id
      key
      value
    }
    slug
    sku
    description
    rawDescription: description(format: RAW)
    shortDescription
    ...ProductWithAttributes
    ...ProductCategories
    ...Terms
    ...SimpleProduct
    ...VariableProduct
    ...ExternalProduct
    related(first: 5) {
      nodes {
        ...SimpleProduct
        ...VariableProduct
        ...ExternalProduct
      }
    }
    reviews(first: 100) {
      averageRating
      edges {
        rating
        node {
          ...Comment
        }
      }
    }
  }
}
    ${ProductWithAttributesFragmentDoc}
${ProductCategoriesFragmentDoc}
${TermsFragmentDoc}
${SimpleProductFragmentDoc}
${VariableProductFragmentDoc}
${ExternalProductFragmentDoc}
${CommentFragmentDoc}`;
export const GetProductCategoriesDocument = gql`
    query getProductCategories($first: Int = 20) {
  productCategories(
    first: $first
    where: {orderby: COUNT, order: DESC, hideEmpty: true}
  ) {
    nodes {
      ...ProductCategory
    }
  }
}
    ${ProductCategoryFragmentDoc}`;
export const GetProductsDocument = gql`
    query getProducts($after: String, $slug: [String], $first: Int = 9999, $orderby: ProductsOrderByEnum = DATE) {
  products(
    first: $first
    after: $after
    where: {categoryIn: $slug, visibility: VISIBLE, minPrice: 0, orderby: {field: $orderby, order: DESC}, status: "publish"}
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      name
      slug
      type
      databaseId
      id
      averageRating
      reviewCount
      ...Terms
      ...ProductCategories
      ...SimpleProduct
      ...VariableProduct
      ...ExternalProduct
    }
  }
}
    ${TermsFragmentDoc}
${ProductCategoriesFragmentDoc}
${SimpleProductFragmentDoc}
${VariableProductFragmentDoc}
${ExternalProductFragmentDoc}`;
export const GetStatesDocument = gql`
    query getStates($country: CountriesEnum!) {
  countryStates(country: $country) {
    code
    name
  }
}
    `;
export const GetStockStatusDocument = gql`
    query getStockStatus($slug: ID!) {
  product(id: $slug, idType: SLUG) {
    ... on SimpleProduct {
      stockStatus
    }
    ... on VariableProduct {
      stockStatus
      variations {
        nodes {
          stockStatus
        }
      }
    }
  }
}
    `;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(input: {username: $username, password: $password}) {
    authToken
    refreshToken
    cartToken
    user {
      name
      username
      email
      databaseId
    }
    customer {
      databaseId
      username
      firstName
      lastName
      email
      cartToken
    }
  }
}
    `;
export const RefreshJwtAuthTokenDocument = gql`
    mutation refreshJwtAuthToken($jwtRefreshToken: String!) {
  refreshJwtAuthToken(input: {jwtRefreshToken: $jwtRefreshToken}) {
    authToken
  }
}
    `;
export const RegisterCustomerDocument = gql`
    mutation registerCustomer($input: RegisterCustomerInput!) {
  registerCustomer(input: $input) {
    customer {
      ...Customer
    }
  }
}
    ${CustomerFragmentDoc}`;
export const RemoveCouponsDocument = gql`
    mutation removeCoupons($codes: [String]!) {
  removeCoupons(input: {codes: $codes}) {
    cart {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export const ResetPasswordEmailDocument = gql`
    mutation ResetPasswordEmail($username: String!) {
  sendPasswordResetEmail(input: {username: $username}) {
    success
  }
}
    `;
export const ResetPasswordKeyDocument = gql`
    mutation ResetPasswordKey($key: String!, $login: String!, $password: String!) {
  resetUserPassword(input: {key: $key, login: $login, password: $password}) {
    user {
      id
    }
  }
}
    `;
export const UpDateCartQuantityDocument = gql`
    mutation UpDateCartQuantity($key: ID!, $quantity: Int!) {
  updateItemQuantities(input: {items: {key: $key, quantity: $quantity}}) {
    cart {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export const UpdateCustomerDocument = gql`
    mutation UpdateCustomer($input: UpdateCustomerInput!) {
  updateCustomer(input: $input) {
    customer {
      downloadableItems(first: 100) {
        nodes {
          ...DownloadableItem
        }
      }
    }
  }
}
    ${DownloadableItemFragmentDoc}`;
export const UpdatePasswordDocument = gql`
    mutation updatePassword($id: ID!, $password: String!) {
  updateUser(input: {id: $id, password: $password}) {
    user {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    addToCart(variables: AddToCartMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<AddToCartMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddToCartMutation>({ document: AddToCartDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'addToCart', 'mutation', variables);
    },
    applyCoupon(variables: ApplyCouponMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ApplyCouponMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ApplyCouponMutation>({ document: ApplyCouponDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'applyCoupon', 'mutation', variables);
    },
    ChangeShippingCounty(variables: ChangeShippingCountyMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ChangeShippingCountyMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChangeShippingCountyMutation>({ document: ChangeShippingCountyDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ChangeShippingCounty', 'mutation', variables);
    },
    ChangeShippingMethod(variables?: ChangeShippingMethodMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ChangeShippingMethodMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChangeShippingMethodMutation>({ document: ChangeShippingMethodDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ChangeShippingMethod', 'mutation', variables);
    },
    Checkout(variables?: CheckoutMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CheckoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CheckoutMutation>({ document: CheckoutDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'Checkout', 'mutation', variables);
    },
    EmptyCart(variables?: EmptyCartMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<EmptyCartMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<EmptyCartMutation>({ document: EmptyCartDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'EmptyCart', 'mutation', variables);
    },
    getAllTerms(variables: GetAllTermsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetAllTermsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllTermsQuery>({ document: GetAllTermsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getAllTerms', 'query', variables);
    },
    getAllowedCountries(variables?: GetAllowedCountriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetAllowedCountriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAllowedCountriesQuery>({ document: GetAllowedCountriesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getAllowedCountries', 'query', variables);
    },
    getCart(variables?: GetCartQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetCartQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCartQuery>({ document: GetCartDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getCart', 'query', variables);
    },
    getCartSummary(variables?: GetCartSummaryQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetCartSummaryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCartSummaryQuery>({ document: GetCartSummaryDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getCartSummary', 'query', variables);
    },
    getOrder(variables: GetOrderQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetOrderQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrderQuery>({ document: GetOrderDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getOrder', 'query', variables);
    },
    getOrders(variables?: GetOrdersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetOrdersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetOrdersQuery>({ document: GetOrdersDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getOrders', 'query', variables);
    },
    getProduct(variables: GetProductQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetProductQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductQuery>({ document: GetProductDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getProduct', 'query', variables);
    },
    getProductCategories(variables?: GetProductCategoriesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetProductCategoriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductCategoriesQuery>({ document: GetProductCategoriesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getProductCategories', 'query', variables);
    },
    getProducts(variables?: GetProductsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetProductsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProductsQuery>({ document: GetProductsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getProducts', 'query', variables);
    },
    getStates(variables: GetStatesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetStatesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStatesQuery>({ document: GetStatesDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getStates', 'query', variables);
    },
    getStockStatus(variables: GetStockStatusQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetStockStatusQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetStockStatusQuery>({ document: GetStockStatusDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'getStockStatus', 'query', variables);
    },
    login(variables: LoginMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>({ document: LoginDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'login', 'mutation', variables);
    },
    refreshJwtAuthToken(variables: RefreshJwtAuthTokenMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RefreshJwtAuthTokenMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RefreshJwtAuthTokenMutation>({ document: RefreshJwtAuthTokenDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'refreshJwtAuthToken', 'mutation', variables);
    },
    registerCustomer(variables: RegisterCustomerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RegisterCustomerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RegisterCustomerMutation>({ document: RegisterCustomerDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'registerCustomer', 'mutation', variables);
    },
    removeCoupons(variables: RemoveCouponsMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<RemoveCouponsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveCouponsMutation>({ document: RemoveCouponsDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'removeCoupons', 'mutation', variables);
    },
    ResetPasswordEmail(variables: ResetPasswordEmailMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ResetPasswordEmailMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetPasswordEmailMutation>({ document: ResetPasswordEmailDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ResetPasswordEmail', 'mutation', variables);
    },
    ResetPasswordKey(variables: ResetPasswordKeyMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<ResetPasswordKeyMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetPasswordKeyMutation>({ document: ResetPasswordKeyDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'ResetPasswordKey', 'mutation', variables);
    },
    UpDateCartQuantity(variables: UpDateCartQuantityMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpDateCartQuantityMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpDateCartQuantityMutation>({ document: UpDateCartQuantityDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpDateCartQuantity', 'mutation', variables);
    },
    UpdateCustomer(variables: UpdateCustomerMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateCustomerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateCustomerMutation>({ document: UpdateCustomerDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateCustomer', 'mutation', variables);
    },
    updatePassword(variables: UpdatePasswordMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdatePasswordMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePasswordMutation>({ document: UpdatePasswordDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'updatePassword', 'mutation', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;