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

  export function toPng(node: HTMLElement, options?: Options): Promise<string>;
  export function toJpeg(node: HTMLElement, options?: Options): Promise<string>;
  export function toSvg(node: HTMLElement, options?: Options): Promise<string>;
  export function toBlob(node: HTMLElement, options?: Options): Promise<Blob>;
  export function toPixelData(node: HTMLElement, options?: Options): Promise<Uint8ClampedArray>;

  const domToImage: {
    toPng: typeof toPng;
    toJpeg: typeof toJpeg;
    toSvg: typeof toSvg;
    toBlob: typeof toBlob;
    toPixelData: typeof toPixelData;
  };

  export default domToImage;
}
