import { withInstall } from '../utils';
import _CheckButton from './CheckButton';

export const CheckButton = withInstall(_CheckButton);
export default CheckButton;
export { checkButtonProps } from './CheckButton';
export type { CheckButtonProps } from './CheckButton';
export type { CheckButtonThemeVars } from './types';

declare module 'vue' {
  export interface GlobalComponents {
    VanCheckButton: typeof CheckButton;
  }
}
