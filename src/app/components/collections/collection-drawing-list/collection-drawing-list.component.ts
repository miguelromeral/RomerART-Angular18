import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { Drawing } from '@models/art/drawing.model';

@Component({
  selector: 'app-collection-drawing-list',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './collection-drawing-list.component.html',
  styleUrl: './collection-drawing-list.component.scss',
})
export class CollectionDrawingListComponent {
  @Input() title!: string;
  @Input() drawings!: Drawing[];
  @Input() connectedTo: string[] = [];
  @Output() requestDrop = new EventEmitter<CdkDragDrop<Drawing[]>>();

  dropItem(event: CdkDragDrop<Drawing[]>) {
    this.requestDrop.emit(event);
  }
}
