import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSideBoardComponent } from './profile-side-board.component';

describe('ProfileSideBoardComponent', () => {
  let component: ProfileSideBoardComponent;
  let fixture: ComponentFixture<ProfileSideBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSideBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSideBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
