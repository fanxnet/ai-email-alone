// Allow CSS imports in TypeScript files
declare module '*.css' {
  const content: string;
  export default content;
}
