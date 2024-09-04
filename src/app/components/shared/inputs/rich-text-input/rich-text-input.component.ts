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
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-rich-text-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    QuillModule,
    TranslateModule,
    CustomTranslatePipe,
  ],
  templateUrl: './rich-text-input.component.html',
  styleUrls: ['./rich-text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextInputComponent),
      multi: true,
    },
  ],
})
export class RichTextInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() formControl: FormControl = new FormControl();

  @Output() keyDown = new EventEmitter<KeyboardEvent>();

  internalValue = ''; // Valor interno del componente
  showHtml = false; // Control para mostrar o esconder el HTML

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // Negrita, itálica, subrayado
      ['blockquote', 'code-block'], // Citas y bloques de código

      [{ list: 'ordered' }, { list: 'bullet' }], // Listas ordenadas y no ordenadas
      [{ script: 'sub' }, { script: 'super' }], // Subíndice y superíndice

      // [{ color: [] }, { background: [] }], // Color de texto y de fondo

      ['clean'], // Botón para limpiar el formato
      [{ showHtml: 'Show HTML' }], // Botón personalizado para mostrar HTML
    ],
  };

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  length(): number {
    if (!this.internalValue) return 0;

    return this.internalValue.length;
  }

  toggleHtml() {
    this.showHtml = !this.showHtml;
  }

  onContentChange(event: any) {
    this.internalValue = event.html; // Guardar el HTML generado
  }

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
  onInputChange(content: string): void {
    if (this.internalValue !== content) {
      this.internalValue = content;
      this.onChange(content); // Notificar al formulario sobre el cambio
      this.formControl.setValue(content, { emitEvent: false }); // Actualizar el control del formulario sin emitir eventos recursivos
    }
  }

  // Manejar el desenfoque del componente
  onBlur(): void {
    this.onTouched();
  }
}
