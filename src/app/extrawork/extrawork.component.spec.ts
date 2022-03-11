import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraworkComponent } from './extrawork.component';

describe('ExtraworkComponent', () => {
  let component: ExtraworkComponent;
  let fixture: ComponentFixture<ExtraworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
