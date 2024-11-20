import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ErrorType = '' | 'select';

@Component({
  selector: 'app-partial-error',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './partial-error.component.html',
  styleUrl: './partial-error.component.scss',
})
export class PartialErrorComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() showIcons = true;
  @Input() canRefresh = false;
  @Output() refreshContent = new EventEmitter<void>();

  _type: ErrorType = '';
  @Input()
  public get type() {
    return this._type;
  }
  public set type(value: ErrorType) {
    this._type = value;
    switch (value) {
      case 'select':
        this.showIcons = false;
        break;
      default:
        break;
    }
  }

  onRefreshContent() {
    this.refreshContent.emit();
  }
}
