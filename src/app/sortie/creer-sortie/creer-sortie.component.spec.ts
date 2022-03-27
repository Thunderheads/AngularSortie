import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerSortieComponent } from './creer-sortie.component';

describe('CreerSortieComponent', () => {
  let component: CreerSortieComponent;
  let fixture: ComponentFixture<CreerSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
