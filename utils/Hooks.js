import { useWindowDimensions } from 'react-native';

export function useWidth(percent, minValue = 1) {
  const { width } = useWindowDimensions();
  const RelativeValue = width * (percent / 100);
  return RelativeValue > minValue ? RelativeValue : minValue;
}
export function useHeight(percent, minValue = 1) {
  const { height } = useWindowDimensions();
  const RelativeValue = height * (percent / 100);
  return RelativeValue > minValue ? RelativeValue : minValue;
}
export function useIsPortrait() {
  const { width, height } = useWindowDimensions();
  const value = width < height ? true : false;
  return value;
}
