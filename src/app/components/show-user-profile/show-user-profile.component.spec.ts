import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserProfileComponent } from './show-user-profile.component';

describe('ShowUserProfileComponent', () => {
  let component: ShowUserProfileComponent;
  let fixture: ComponentFixture<ShowUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowUserProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
