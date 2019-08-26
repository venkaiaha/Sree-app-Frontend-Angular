import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantPopupComponent } from './accountant-popup.component';

describe('AccountantPopupComponent', () => {
  let component: AccountantPopupComponent;
  let fixture: ComponentFixture<AccountantPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountantPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountantPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
