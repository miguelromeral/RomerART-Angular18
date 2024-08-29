import { IExperienceTecnology } from '@models/about/cv.model';
import { Collection } from '@models/art/collection.model';
import { DrawingCharacter } from '@models/art/drawing-character.model';
import { DrawingProduct } from '@models/art/drawing-product.model';

export function sortProductsByName(
  a: DrawingProduct,
  b: DrawingProduct
): number {
  // return b.productName.toLowerCase().localeCompare(a.productName.toLowerCase());
  const prod = a.productTypeId - b.productTypeId;
  if (prod !== 0) {
    return prod;
  }
  return a.productName
    .toLocaleLowerCase()
    .localeCompare(b.productName.toLocaleLowerCase());
}

export function sortCharactersByName(
  a: DrawingCharacter,
  b: DrawingCharacter
): number {
  return sortByTextAscending(a.characterName, b.characterName);
}

export function sortByTextAscending(a: string, b: string): number {
  return a.toLowerCase().localeCompare(b.toLowerCase());
}

export function sortCollectionsByOrder(a: Collection, b: Collection): number {
  return b.order - a.order;
}

export function sortTechnologyByLevel(
  a: IExperienceTecnology,
  b: IExperienceTecnology
) {
  return (b.level ?? 0) - (a.level ?? 0);
}
