import { DrawingCharacter } from '@models/art/drawing-character.model';
import { DrawingProduct } from '@models/art/drawing-product.model';

export function sortProductsByName(
  a: DrawingProduct,
  b: DrawingProduct
): number {
  // return b.productName.toLowerCase().localeCompare(a.productName.toLowerCase());
  return a.productTypeId - b.productTypeId;
}

export function sortCharactersByName(
  a: DrawingCharacter,
  b: DrawingCharacter
): number {
  return a.characterName
    .toLowerCase()
    .localeCompare(b.characterName.toLowerCase());
}
