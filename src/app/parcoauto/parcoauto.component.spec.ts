import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcoautoComponent } from './parcoauto.component';

describe('ParcoautoComponent', () => {
  let component: ParcoautoComponent;
  let fixture: ComponentFixture<ParcoautoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParcoautoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcoautoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
