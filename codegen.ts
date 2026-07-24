import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as loadEnv } from 'dotenv';

loadEnv();

const endpoint = process.env.WORDPRESS_GRAPHQL_URL;
const origin = process.env.PUBLIC_APP_ORIGIN || (endpoint ? new URL(endpoint).origin : undefined);

if (!endpoint) {
  throw new Error('WORDPRESS_GRAPHQL_URL is required for GraphQL codegen.');
}

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [endpoint]: {
        headers: {
          ...(origin ? { Origin: origin } : {}),
        },
      },
    },
  ],
  documents: ['src/lib/woocommerce/queries/**/*.gql'],
  generates: {
    'src/lib/woocommerce/generated/sdk.ts': {
      plugins: [
        {
          add: {
            content:
              '/* eslint-disable */\n// @ts-nocheck\n// This file is auto-generated. Do not edit manually - run `npm run graphql:codegen` to regenerate.\n',
          },
        },
        // Avoid the `typescript` plugin here: with current codegen versions it
        // duplicates operation input types and breaks Vitest/OXC transforms.
        'typescript-operations',
        'typescript-graphql-request',
      ],
      config: {
        rawRequest: false,
        useTypeImports: true,
        enumsAsTypes: true,
        onlyOperationTypes: true,
        preResolveTypes: true,
        skipTypename: true,
      },
    },
  },
};

export default config;
