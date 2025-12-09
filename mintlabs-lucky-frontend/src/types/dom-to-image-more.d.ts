// Type declaration for dom-to-image-more
declare module 'dom-to-image-more' {
  export interface Options {
    bgcolor?: string | null;
    width?: number;
    height?: number;
    quality?: number;
    cacheBust?: boolean;
    imagePlaceholder?: string;
    style?: Partial<CSSStyleDeclaration>;
    filter?: (node: Node) => boolean;
  }

  export default {
    toPng: (node: HTMLElement, options?: Options) => Promise<string>;
    toJpeg: (node: HTMLElement, options?: Options) => Promise<string>;
    toSvg: (node: HTMLElement, options?: Options) => Promise<string>;
    toBlob: (node: HTMLElement, options?: Options) => Promise<Blob>;
    toPixelData: (node: HTMLElement, options?: Options) => Promise<Uint8ClampedArray>;
  };
}
