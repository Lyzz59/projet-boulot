import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsProjectComponent } from './ins-project.component';

describe('InsProjectComponent', () => {
  let component: InsProjectComponent;
  let fixture: ComponentFixture<InsProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
