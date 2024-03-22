import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewRankingComponent } from './admin-view-ranking.component';

describe('AdminViewRankingComponent', () => {
  let component: AdminViewRankingComponent;
  let fixture: ComponentFixture<AdminViewRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewRankingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminViewRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
