import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl,
} from '@angular/forms';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, LabelComponent],
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
  @Input() icon = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'number' = 'text';
  @Input() step = 1;
  @Input() min?: number;
  @Input() max?: number;
  @Input() formControl: FormControl = new FormControl();

  @Output() keyDown = new EventEmitter<KeyboardEvent>();

  @ViewChild('input') input!: ElementRef<HTMLInputElement>;

  internalValue = ''; // Valor interno del componente

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Actualizar el valor del componente desde el formulario
  writeValue(value: string): void {
    if (value !== this.internalValue) {
      this.internalValue = value;
    }
  }

  // Registrar cambios en el valor del componente
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Registrar cuando el componente ha sido tocado
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Manejar el estado deshabilitado
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }

  // Emitir eventos de tecla
  onKeyDown(event: KeyboardEvent): void {
    this.keyDown.emit(event);
  }

  // Manejar cambios en la entrada del usuario
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;

    if (this.internalValue !== newValue) {
      this.internalValue = newValue;
      this.onChange(newValue); // Notificar al formulario sobre el cambio
      this.formControl.setValue(newValue, { emitEvent: false }); // Actualizar el control del formulario sin emitir eventos recursivos
    }
  }

  // Manejar el desenfoque del componente
  onBlur(): void {
    this.onTouched();
  }
}
