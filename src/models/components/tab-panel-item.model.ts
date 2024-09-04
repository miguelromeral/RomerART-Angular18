import { Drawing } from '@models/art/drawing.model';

export interface TabPanelItem {
  id: string;
  icon: string;
  textCode: string;
  iconSelected: string;
  visible: (drawing: Drawing, visible?: boolean) => boolean;
}
