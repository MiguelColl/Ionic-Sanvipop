import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSalePage } from './product-sale.page';

describe('ProductSalePage', () => {
  let component: ProductSalePage;
  let fixture: ComponentFixture<ProductSalePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
