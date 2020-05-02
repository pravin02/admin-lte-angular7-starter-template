import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';

describe('AppService', () => {

  let service : AppService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  // it('should be created', () => {
  //   service = TestBed.get(AppService);
  //   expect(service).toBeFalsy();
  // });

  // it('Url must be matched', () => {    
  //   expect(service.getUrl()).toBeFalsy();
  // });

});
