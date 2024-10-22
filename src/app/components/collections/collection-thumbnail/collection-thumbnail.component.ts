import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DrawingThumbnailComponent } from '@app/components/art/drawing-thumbnail/drawing-thumbnail.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { AuthService } from '@app/services/api/auth/auth.service';
import { Collection } from '@models/art/collection.model';
import { LanguageComponent } from '@models/components/LanguageComponent';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-collection-thumbnail',
  standalone: true,
  imports: [
    CommonModule,
    DrawingThumbnailComponent,
    CustomTranslatePipe,
    TranslateModule,
  ],
  templateUrl: './collection-thumbnail.component.html',
  styleUrl: './collection-thumbnail.component.scss',
})
export class CollectionThumbnailComponent
  extends LanguageComponent
  implements OnInit
{
  @Input() collection!: Collection;
  @Input() selectedStyle = false;
  @Output() cardClicked = new EventEmitter<string>();

  admin = false;

  get hasDrawings() {
    return this.collection.drawings?.length > 0;
  }
  get drawings() {
    return this.collection.drawings;
  }

  constructor(private authService: AuthService) {
    super('SCREENS.COLLECTIONS');
  }

  ngOnInit() {
    this.authService.isAdmin().subscribe(isAdmin => {
      this.admin = isAdmin;
    });
  }

  click() {
    this.cardClicked.emit(this.collection.id);
  }

  // goToEdit() {
  //   this.router.navigate([`/admin/collections/edit/${this.collection.id}`]);
  // }
}
