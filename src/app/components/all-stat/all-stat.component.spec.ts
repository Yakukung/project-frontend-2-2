import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllStatComponent } from './all-stat.component';

describe('AllStatComponent', () => {
  let component: AllStatComponent;
  let fixture: ComponentFixture<AllStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllStatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
