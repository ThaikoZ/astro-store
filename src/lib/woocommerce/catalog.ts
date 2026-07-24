import type {
  GetAllTermsQueryVariables,
  GetProductCategoriesQueryVariables,
  GetProductQueryVariables,
  GetProductsQueryVariables,
  GetStockStatusQueryVariables,
} from './generated/sdk';
import type { WooClientInternals } from './types';

export type CatalogApi = ReturnType<typeof createCatalogApi>;

export function createCatalogApi(internals: WooClientInternals) {
  const { request } = internals;

  return {
    getProducts(variables?: GetProductsQueryVariables) {
      return request((sdk) => sdk.getProducts(variables));
    },
    getProduct(slug: string, variables?: Omit<GetProductQueryVariables, 'slug'>) {
      return request((sdk) => sdk.getProduct({ slug, ...variables }));
    },
    getCategories(variables?: GetProductCategoriesQueryVariables) {
      return request((sdk) => sdk.getProductCategories(variables));
    },
    getTerms(variables: GetAllTermsQueryVariables) {
      return request((sdk) => sdk.getAllTerms(variables));
    },
    getStockStatus(variables: GetStockStatusQueryVariables) {
      return request((sdk) => sdk.getStockStatus(variables));
    },
  };
}
