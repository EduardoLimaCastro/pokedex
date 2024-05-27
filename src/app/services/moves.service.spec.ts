import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovesService } from './moves.service';

describe('MovesService', () => {
  let service: MovesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovesService]
    });
    service = TestBed.inject(MovesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
