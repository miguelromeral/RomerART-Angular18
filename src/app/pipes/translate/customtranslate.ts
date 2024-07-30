/* eslint-disable @typescript-eslint/no-explicit-any */
// custom-translate.pipe.ts
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { environment } from 'environments/environment';

@Pipe({
  name: 'mrTranslate',
  standalone: true,
  pure: false, // Necesario si quieres que el pipe se reactive cuando cambie el idioma
})
export class CustomTranslatePipe
  extends TranslatePipe
  implements PipeTransform
{
  constructor(translate: TranslateService, changes: ChangeDetectorRef) {
    super(translate, changes);
  }

  override transform(query: string, ...args: any[]): any {
    const translation = super.transform(query, ...args);
    if (environment.production) {
      if (translation === query) {
        const parts = query.split('.');
        if (parts.length > 0) {
          return parts[parts.length - 1];
        }
        return '';
      }
      return translation;
    }
    return translation;
  }
}
