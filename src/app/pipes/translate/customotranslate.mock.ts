/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'mrTranslate', standalone: true, pure: false })
export class MockCustomTranslatePipe implements PipeTransform {
  transform(query: string, ...args: any[]): any {
    return query;
  }
}
