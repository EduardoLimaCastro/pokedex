import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TypesService } from './types.service';

describe('TypesService', () => {
  let service: TypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TypesService]
    });
    service = TestBed.inject(TypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
