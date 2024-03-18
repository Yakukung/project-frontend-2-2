import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPostGraphComponent } from './about-post-graph.component';

describe('AboutPostGraphComponent', () => {
  let component: AboutPostGraphComponent;
  let fixture: ComponentFixture<AboutPostGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPostGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutPostGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
