import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekapKehadiranPerMkComponent } from './rekap-kehadiran-per-mk.component';

describe('RekapKehadiranPerMkComponent', () => {
  let component: RekapKehadiranPerMkComponent;
  let fixture: ComponentFixture<RekapKehadiranPerMkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RekapKehadiranPerMkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RekapKehadiranPerMkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
