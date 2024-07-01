import { TestBed } from '@angular/core/testing';

import { MakePostsService } from './make-posts.service';

describe('MakePostsService', () => {
  let service: MakePostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakePostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
