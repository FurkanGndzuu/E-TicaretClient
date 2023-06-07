import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBasketItemdialogComponent } from './delete-basket-itemdialog.component';

describe('DeleteBasketItemdialogComponent', () => {
  let component: DeleteBasketItemdialogComponent;
  let fixture: ComponentFixture<DeleteBasketItemdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBasketItemdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBasketItemdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
