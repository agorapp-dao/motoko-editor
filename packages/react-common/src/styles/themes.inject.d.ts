import { IThemeBrands, IThemeButtons } from './themes.types';

/** Inject custom properties into the theme */
declare module '@mui/material/styles' {
  interface TThemeCustomProperties {
    brands?: IThemeBrands;
    buttons?: IThemeButtons;
  }
  // make accessible properties from components
  interface Theme extends TThemeCustomProperties {}
  // allow configuration using `createTheme`
  interface ThemeOptions extends TThemeCustomProperties {}
}
