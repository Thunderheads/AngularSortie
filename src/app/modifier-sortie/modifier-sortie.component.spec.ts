import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierSortieComponent } from './modifier-sortie.component';

describe('ModifierSortieComponent', () => {
  let component: ModifierSortieComponent;
  let fixture: ComponentFixture<ModifierSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
