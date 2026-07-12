/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module '*.css';

declare module 'html-to-docx' {
  type HtmlToDocxOptions = Record<string, unknown>;

  export default function HTMLtoDOCX(
    html: string,
    headerHTML: string | null,
    documentOptions?: HtmlToDocxOptions,
    footerHTML?: string | null,
  ): Promise<ArrayBuffer | Blob | Buffer>;
}
