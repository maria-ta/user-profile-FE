import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMainPartComponent } from './profile-main-part.component';

describe('ProfileMainPartComponent', () => {
  let component: ProfileMainPartComponent;
  let fixture: ComponentFixture<ProfileMainPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMainPartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMainPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
