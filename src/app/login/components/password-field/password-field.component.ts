import {
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PasswordFieldComponent),
    multi: true,
  }],
})
export class PasswordFieldComponent implements ControlValueAccessor {
  // tslint:disable-next-line:variable-name
  _value = null;
  hidePassword = true;

  @Input() required = false;
  @Input() label = 'Password';
  @Input() disabled = false;

  @Input() set value(val: string) {
    this.writeValue(val);
    this.propagateChange(val);
  }

  get value(): string {
    return this._value;
  }

  propagateChange = (_: any) => {};

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  input(event): void {
    this.value = event.target.value;
  }

  writeValue(value: string): void {
    this._value = value;
  }

  registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): any {}

}
