import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Drawing } from '@models/art/drawing.model';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from '@models/components/LanguageComponent';

@Component({
  selector: 'app-collection-drawing-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, CustomTranslatePipe, TranslateModule],
  templateUrl: './collection-drawing-list.component.html',
  styleUrl: './collection-drawing-list.component.scss',
})
export class CollectionDrawingListComponent extends LanguageComponent {
  @Input() title!: string;
  @Input() drawings!: Drawing[];
  @Input() connectedTo: string[] = [];
  @Output() requestDrop = new EventEmitter<CdkDragDrop<Drawing[]>>();

  constructor() {
    super('SCREENS.COLLECTION-FORM');
  }

  dropItem(event: CdkDragDrop<Drawing[]>) {
    this.requestDrop.emit(event);
  }
}
