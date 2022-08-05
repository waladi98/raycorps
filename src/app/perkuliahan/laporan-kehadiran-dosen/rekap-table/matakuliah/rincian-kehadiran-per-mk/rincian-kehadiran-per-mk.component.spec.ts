import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RincianKehadiranPerMkComponent } from './rincian-kehadiran-per-mk.component';

describe('RincianKehadiranPerMkComponent', () => {
  let component: RincianKehadiranPerMkComponent;
  let fixture: ComponentFixture<RincianKehadiranPerMkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RincianKehadiranPerMkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RincianKehadiranPerMkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
