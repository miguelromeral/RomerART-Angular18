import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LayoutComponent } from '@app/components/shared/layout/layout.component';
import { DrawingService } from '@app/services/api/drawing/drawing.service';
import { Collection } from '@models/art/collection.model';
import { MetadataService } from '@app/services/metadata/metadata.service';
import { CollectionFormComponent } from '@app/components/collections/collection-form/collection-form.component';

@Component({
  selector: 'app-edit-collection',
  standalone: true,
  imports: [LayoutComponent, CommonModule, CollectionFormComponent],
  templateUrl: './edit-collection.component.html',
  styleUrl: './edit-collection.component.scss',
})
export class EditCollectionComponent implements OnInit {
  @Input() id: string | null = null;
  collection: Collection = new Collection();
  notFound: boolean | undefined;
  loading = true;

  constructor(
    private drawingService: DrawingService,
    private metadataService: MetadataService
  ) {}

  ngOnInit() {
    this.loadCollection();
  }

  loadCollection() {
    if (this.id) {
      this.drawingService.getCollectionDetails(this.id).subscribe(data => {
        if (data) {
          this.collection = new Collection(data);
          this.metadataService.updateMetadata(
            this.collection.name,
            this.collection.name,
            ''
          );
        } else {
          this.notFound = true;
        }
        this.loading = false;
      });
    }
  }
}