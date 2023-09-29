declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    CORS_URL: string;
    PORT: string;
    TEST_MODE: string;
    GQL_SECRET: string;
    SHOPIFY_API_SECRET: string;
    MIN_OFFSET_WEIGHT: string;
  }
}