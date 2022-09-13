import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsTimetrackingComponent } from './ins-timetracking.component';

describe('InsTimetrackingComponent', () => {
  let component: InsTimetrackingComponent;
  let fixture: ComponentFixture<InsTimetrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsTimetrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsTimetrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
