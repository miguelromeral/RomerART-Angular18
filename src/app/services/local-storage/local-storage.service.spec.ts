import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { StorageService } from '@ng-web-apis/storage';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let storageSpy: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('StorageService', ['setItem', 'getItem']);

    TestBed.configureTestingModule({
      providers: [{ provide: StorageService, useValue: spy }],
    });
    service = TestBed.inject(LocalStorageService);

    storageSpy = TestBed.inject(
      StorageService
    ) as jasmine.SpyObj<StorageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set item and retrieve correctly', () => {
    const key = 'test-key';
    const value = 'test-value';
    storageSpy.getItem.and.returnValue(value);

    service.setItem(key, value);

    const retrieved = service.getItem(key);

    expect(retrieved).toBe(value);
  });

  it('should trigger an error when setting an item', () => {
    const customError = 'CustomError';
    const key = 'key';
    storageSpy.setItem.and.throwError(customError);
    storageSpy.getItem.and.returnValue(null);

    service.setItem(key, 'value');

    expect(service.getItem(key)).toBeNull();

    storageSpy.getItem.and.throwError(customError);
    expect(service.getItem(key)).toBeNull();
  });

  it('should remove an item', () => {
    const customError = 'CustomError';
    const key = 'key';
    const value = 'value';

    service.setItem(key, value);
    storageSpy.getItem.and.returnValue(value);
    expect(service.getItem(key)).toBe(value);

    service.removeItem(key);
    storageSpy.getItem.and.returnValue(null);
    expect(service.getItem(key)).toBeNull();
  });

  it('should clear every item', () => {
    const customError = 'CustomError';
    const key = 'key';
    const value = 'value';

    service.setItem(key, value);
    storageSpy.getItem.and.returnValue(value);
    expect(service.getItem(key)).toBe(value);

    service.clear();
    storageSpy.getItem.and.returnValue(null);
    expect(service.getItem(key)).toBeNull();
  });
});
