import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  forwardRef,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { ICustomSelectOption } from '@models/inputs/select-option.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    CustomTranslatePipe,
  ],
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true,
    },
  ],
})
export class SelectInputComponent
  extends LanguageComponent
  implements ControlValueAccessor
{
  @Input() firstOption: ICustomSelectOption | undefined;
  @Input() options: ICustomSelectOption[] = [];
  @Output() valueChange = new EventEmitter<string>();

  value = '';

  constructor() {
    super('');
  }

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    // Maneja el estado deshabilitado opcionalmente
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onSelectChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newValue = select.value;
    this.value = newValue;
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }

  onBlur(): void {
    this.onTouched();
  }
}
