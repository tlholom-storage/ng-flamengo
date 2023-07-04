/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrowserStorageService } from './browser-storage.service';

describe('Service: BrowserStorage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserStorageService]
    });
  });

  it('should ...', inject([BrowserStorageService], (service: BrowserStorageService) => {
    expect(service).toBeTruthy();
  }));
});
