import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSortieComponent } from './detail-sortie.component';

describe('DetailSortieComponent', () => {
  let component: DetailSortieComponent;
  let fixture: ComponentFixture<DetailSortieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSortieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSortieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
