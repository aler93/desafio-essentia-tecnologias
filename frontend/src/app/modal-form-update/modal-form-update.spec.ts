import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormUpdate } from './modal-form-update';

describe('ModalFormUpdate', () => {
  let component: ModalFormUpdate;
  let fixture: ComponentFixture<ModalFormUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFormUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFormUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
