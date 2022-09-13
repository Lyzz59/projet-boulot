import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsClientComponent } from './ins-client.component';

describe('InsClientComponent', () => {
  let component: InsClientComponent;
  let fixture: ComponentFixture<InsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
