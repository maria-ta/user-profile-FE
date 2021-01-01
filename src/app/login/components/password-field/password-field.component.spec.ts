import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordFieldComponent } from './password-field.component';

describe('PasswordFieldComponent', () => {
  let component: PasswordFieldComponent;
  let fixture: ComponentFixture<PasswordFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('value', () => {
    const value = 'value';

    describe('set', () => {
      it('should set _value', () => {
        component.value = value;

        expect(component._value).toEqual(value);
      });

      it('should call propagateChange', () => {
        const propagateChangeSpy = spyOn(component, 'propagateChange');

        component.value = value;

        expect(propagateChangeSpy).toHaveBeenCalled();
      });
    });

    describe('get', () => {
      it('should return _value', () => {
        component._value = value;

        expect(component.value).toEqual(value);
      });
    });
  });

  describe('togglePassword', () => {
    it('should set password flag to true if the flag was false', () => {
      component.hidePassword = false;

      component.togglePassword();

      expect(component.hidePassword).toBe(true);
    });

    it('should set password flag to false if the flag was true', () => {
      component.hidePassword = true;

      component.togglePassword();

      expect(component.hidePassword).toBe(false);
    });
  });

  describe('input', () => {
    const value = 'value';
    const event = {
      target: {
        value
      }
    };

    it('should set _value', () => {
      component.input(event);

      expect(component._value).toEqual(value);
    });

    it('should call propagateChange', () => {
      const propagateChangeSpy = spyOn(component, 'propagateChange');

      component.input(event);

      expect(propagateChangeSpy).toHaveBeenCalled();
    });
  });

  describe('registerOnChange', () => {
    const onChange = () => {};

    it('should set onPropagateChange', () => {
      component.registerOnChange(onChange);

      expect(component.propagateChange).toBe(onChange);
    });
  });
});
