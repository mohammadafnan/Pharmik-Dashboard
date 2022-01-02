import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebinfoComponent } from './webinfo.component';

describe('WebinfoComponent', () => {
  let component: WebinfoComponent;
  let fixture: ComponentFixture<WebinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
