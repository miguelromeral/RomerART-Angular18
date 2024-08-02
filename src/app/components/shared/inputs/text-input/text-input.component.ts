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
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'number' = 'text';
  @Input() min?: number;
  @Input() max?: number;
  @Output() keyDown = new EventEmitter<KeyboardEvent>();

  value = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Maneja el estado deshabilitado opcionalmente
  }

  onKeyDown(event: KeyboardEvent): void {
    this.keyDown.emit(event);
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.value = newValue;
    this.onChange(newValue);
  }

  onBlur(): void {
    this.onTouched();
  }
}
