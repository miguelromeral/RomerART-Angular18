import { TestBed } from '@angular/core/testing';

import { AboutService } from './about.service';
import { Inspiration } from '@models/about/inspiration.model';
import { of } from 'rxjs';

describe('AboutService', () => {
  let service: AboutService;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('AboutService', [
      'getInspirations',
    ]);

    TestBed.configureTestingModule({
      // Proporcionar el servicio falso en lugar del real
      providers: [{ provide: AboutService, useValue: serviceSpy }],
    });

    // Inyectar el servicio falso
    service = TestBed.inject(AboutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return inspirations', (done: DoneFn) => {
    // set the value to return when the `getValue` spy is called.
    const stubValue: Inspiration[] = [
      {
        id: '1',
        instagram: '',
        name: 'Name',
        pinterest: '',
        twitch: '',
        twitter: '',
        bluesky: '',
        type: 1,
        typeName: 'Type',
        youTube: '',
      },
    ];

    // Configurar el spy para devolver un Observable con los valores simulados
    (service as jasmine.SpyObj<AboutService>).getInspirations.and.returnValue(
      of(stubValue)
    );

    service.getInspirations().subscribe(value => {
      expect(value.length)
        .withContext('response length should be the same as spy')
        .toBe(stubValue.length);
      expect(value[0].id)
        .withContext('ID should be the same as spy')
        .toBe(stubValue[0].id);
      done();
    });
  });
});
