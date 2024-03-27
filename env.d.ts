/// <reference types="vite/client" />
/// <reference types="@types/google.maps" />

declare module 'vue-material-design-icons/*.vue';
declare module 'google.maps';
import 'vue-router';

declare module 'rollup-plugin-typescript' {
  export default function (): any;
}

declare module 'vue-router' {
  interface RouteMeta extends Record<string, any> {
    middlewares?: NavigationGuard[];
    ignoreAddressValidationMiddleware?: boolean;
    showMenu?: boolean;
    showBagButton?: boolean;
  }
}

// declare module '*.vue' {
//     import Vue from 'vue';
//     export default Vue;
// }
