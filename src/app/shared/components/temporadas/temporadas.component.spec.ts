import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporadasComponent } from './temporadas.component';

describe('TemporadasComponent', () => {
  let component: TemporadasComponent;
  let fixture: ComponentFixture<TemporadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemporadasComponent]
    });
    fixture = TestBed.createComponent(TemporadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
