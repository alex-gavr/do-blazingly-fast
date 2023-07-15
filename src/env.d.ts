/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ONCLICK_DOMAIN: string;
  readonly PUBLIC_IPP_DOMAIN: string;
  readonly PUBLIC_DOMAIN_REVERSE: string;
  readonly PUBLIC_MARKER_DOMAIN: string;
  readonly PUBLIC_MARKER_DOMAIN_ROTATION: string;
  readonly PUBLIC_FORMATS_DOMAIN_DATA: string;
  readonly PUBLIC_ONCLICK_CODE: string;
  readonly PUBLIC_DATABASE_HOST: string;
  readonly PUBLIC_DATABASE_USERNAME: string;
  readonly PUBLIC_DATABASE_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
