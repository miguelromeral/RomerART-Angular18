import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IConfirmDialogData } from '@models/alert/confirm-dialog.model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { LanguageComponent } from '@models/components/LanguageComponent';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    TranslateModule,
    CustomTranslatePipe,
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
})
export class ConfirmDialogComponent extends LanguageComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData
  ) {
    super('COMPONENTS.ALERTS');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  okAndclose(): void {
    if (this.data.okCallback) {
      this.data.okCallback();
    }
    this.dialogRef.close();
  }
}
