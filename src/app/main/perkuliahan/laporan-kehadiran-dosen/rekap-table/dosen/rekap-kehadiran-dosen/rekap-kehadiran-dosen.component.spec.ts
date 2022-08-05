import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RekapKehadiranDosenComponent } from './rekap-kehadiran-dosen.component';

describe('RekapKehadiranDosenComponent', () => {
  let component: RekapKehadiranDosenComponent;
  let fixture: ComponentFixture<RekapKehadiranDosenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RekapKehadiranDosenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RekapKehadiranDosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
