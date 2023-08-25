import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotItemComponent } from './slot-item.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('SlotItemComponent', () => {
  let component: SlotItemComponent;
  let fixture: ComponentFixture<SlotItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SlotItemComponent]
    });
    fixture = TestBed.createComponent(SlotItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
