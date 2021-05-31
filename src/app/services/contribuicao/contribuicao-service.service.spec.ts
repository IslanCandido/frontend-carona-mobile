import { TestBed } from '@angular/core/testing';

import { ContribuicaoServiceService } from './contribuicao-service.service';

describe('ContribuicaoServiceService', () => {
  let service: ContribuicaoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContribuicaoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
