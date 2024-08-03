import { ISaveDrawingRequest } from '@models/requests/save-drawing-request.model';

export interface ISaveDrawingResponse extends ISaveDrawingRequest {
  other: string;
}
