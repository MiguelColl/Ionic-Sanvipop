import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingItemPage } from './rating-item.page';

describe('RatingItemPage', () => {
  let component: RatingItemPage;
  let fixture: ComponentFixture<RatingItemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
