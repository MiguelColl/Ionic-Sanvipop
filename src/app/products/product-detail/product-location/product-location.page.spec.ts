import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductLocationPage } from './product-location.page';

describe('ProductLocationPage', () => {
  let component: ProductLocationPage;
  let fixture: ComponentFixture<ProductLocationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
