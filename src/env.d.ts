/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ONCLICK_DOMAIN: string;
  readonly PUBLIC_IPP_DOMAIN: string;
  readonly PUBLIC_DOMAIN_REVERSE: string;
  readonly PUBLIC_MARKER_DOMAIN: string;
  readonly PUBLIC_MARKER_DOMAIN_ROTATION: string;
  readonly PUBLIC_FORMATS_DOMAIN_DATA: string;
  readonly PUBLIC_ONCLICK_CODE: string;
  readonly DATABASE_HOST: string;
  readonly DATABASE_USERNAME: string;
  readonly DATABASE_PASSWORD: string;
  readonly PUBLIC_API_ROUTE_SECRET: string;
  readonly PUBLIC_SENTRY: string;
  readonly PUBLIC_CONVERSION_URL: string;
  readonly PUBLIC_REWARDIS_URL: string;
  readonly PUBLIC_PREFETCHER_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
