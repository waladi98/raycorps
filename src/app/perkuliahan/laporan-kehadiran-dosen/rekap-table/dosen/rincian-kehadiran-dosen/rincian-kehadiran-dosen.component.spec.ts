import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RincianKehadiranDosenComponent } from './rincian-kehadiran-dosen.component';

describe('RincianKehadiranDosenComponent', () => {
  let component: RincianKehadiranDosenComponent;
  let fixture: ComponentFixture<RincianKehadiranDosenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RincianKehadiranDosenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RincianKehadiranDosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
