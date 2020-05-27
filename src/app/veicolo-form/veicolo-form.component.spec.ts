import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeicoloFormComponent } from './veicolo-form.component';

describe('VeicoloFormComponent', () => {
  let component: VeicoloFormComponent;
  let fixture: ComponentFixture<VeicoloFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeicoloFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeicoloFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
