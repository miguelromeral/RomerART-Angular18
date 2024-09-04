import { Drawing } from '@models/art/drawing.model';

export interface TabPanelItem {
  id: string;
  order: number;
  icon: string;
  textCode: string;
  iconSelected: string;
  visible: (drawing: Drawing, visible?: boolean) => boolean;
}
