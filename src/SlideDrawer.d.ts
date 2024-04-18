import type { ViewStyle } from 'react-native';
import type { StyleProp } from 'react-native';

export type SlideDrawerContainerStyle = Omit<
  ViewStyle,
  'width' | 'height' | 'maxWidth' | 'minWidth | minHeight' | 'maxHeight'
>;

export interface SlideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /**
   * The side of the screen to render the drawer on.
   */
  side?: 'left' | 'right';
  /**
   * Styles for the drawer container.
   */
  containerStyle?: SlideDrawerContainerStyle;
  /**
   * Opacity for the drawer backdrop.
   */
  backdropOpacity?: number;
}
