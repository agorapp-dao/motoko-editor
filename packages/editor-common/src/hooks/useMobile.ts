import { useWindowWidth } from '@react-hook/window-size';
import { MOBILE_TRIGGER_WIDTH } from '../constants';

export const useMobile = () => {
  const width = useWindowWidth();

  const mobile = width < MOBILE_TRIGGER_WIDTH;

  return { mobile };
};
