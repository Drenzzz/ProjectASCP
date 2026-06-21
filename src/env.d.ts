/// <reference types="astro/client" />

declare module "*.astro" {
    const Component: astroHTML.JSX.HTMLAttributes;
    export default Component;
}

declare module "*.png" {
    const src: string;
    export default src;
}

declare module "*.jpg" {
    const src: string;
    export default src;
}

declare module "*.webp" {
    const src: string;
    export default src;
}

declare module "*.svg" {
    const src: string;
    export default src;
}
