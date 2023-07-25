/// <reference types="vite/client" />
/// <reference types="@types/google.maps" />

declare module 'vue-material-design-icons/*.vue';
declare module 'google.maps';

declare module 'rollup-plugin-typescript' {
  export default function (): any;
}

// declare module '*.vue' {
//     import Vue from 'vue';
//     export default Vue;
// }
