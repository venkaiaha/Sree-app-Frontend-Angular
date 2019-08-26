import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookkeeperComponent } from './bookkeeper.component';

describe('BookkeeperComponent', () => {
  let component: BookkeeperComponent;
  let fixture: ComponentFixture<BookkeeperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookkeeperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookkeeperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
