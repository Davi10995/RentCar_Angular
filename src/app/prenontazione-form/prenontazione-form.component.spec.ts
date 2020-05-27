import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrenontazioneFormComponent } from './prenontazione-form.component';

describe('PrenontazioneFormComponent', () => {
  let component: PrenontazioneFormComponent;
  let fixture: ComponentFixture<PrenontazioneFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrenontazioneFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenontazioneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
