/// <reference types="react-scripts" />

declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'framer-motion/dist/framer-motion' {
  export * from 'framer-motion';
}
