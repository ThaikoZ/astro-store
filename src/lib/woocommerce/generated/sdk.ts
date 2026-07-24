/* eslint-disable */
// @ts-nocheck
// This file is auto-generated. Do not edit manually - run `npm run graphql:codegen` to regenerate.

/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { type GraphQLClient, type RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
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

export type DeleteOrderMutationVariables = Exact<{
  id: string | number;
  forceDelete?: boolean | null | undefined;
}>;


export type DeleteOrderMutation = { deleteOrder: { order: { databaseId: number | null, id: string, status: OrderStatusEnum | null } | null } | null };

export type DeleteUserMutationVariables = Exact<{
  id: string | number;
}>;


export type DeleteUserMutation = { deleteUser: { deletedId: string | null, user: { databaseId: number, id: string, username: string | null } | null } | null };

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
export const DeleteOrderDocument = gql`
    mutation deleteOrder($id: ID!, $forceDelete: Boolean = true) {
  deleteOrder(input: {id: $id, forceDelete: $forceDelete}) {
    order {
      databaseId
      id
      status
    }
  }
}
    `;
export const DeleteUserDocument = gql`
    mutation deleteUser($id: ID!) {
  deleteUser(input: {id: $id}) {
    user {
      databaseId
      id
      username
    }
    deletedId
  }
}
    `;
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
    deleteOrder(variables: DeleteOrderMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteOrderMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteOrderMutation>({ document: DeleteOrderDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'deleteOrder', 'mutation', variables);
    },
    deleteUser(variables: DeleteUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteUserMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteUserMutation>({ document: DeleteUserDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'deleteUser', 'mutation', variables);
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