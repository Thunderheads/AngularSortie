import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnulerSortieComponent } from './annuler-sortie.component';

describe('AnnulerSortieComponent', () => {
  let component: AnnulerSortieComponent;
  let fixture: ComponentFixture<AnnulerSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnulerSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnulerSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
