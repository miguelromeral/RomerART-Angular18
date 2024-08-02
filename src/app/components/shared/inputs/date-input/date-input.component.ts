import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-date-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() formControl: FormControl = new FormControl();
  @Output() keyDown = new EventEmitter<KeyboardEvent>();

  value = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
    this.formControl.setValue(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
    this.formControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    this.keyDown.emit(event);
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.value = newValue;
    this.onChange(newValue);
    this.formControl.setValue(newValue);
  }

  onBlur(): void {
    this.onTouched();
  }
}
