import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/components/shared/confirm-dialog/confirm-dialog.component';
import { IConfirmDialogData } from '@models/alert/confirm-dialog.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public dialog: MatDialog) {}

  showAlert(
    title: string,
    message: string
  ): MatDialogRef<ConfirmDialogComponent, IConfirmDialogData> {
    const data: IConfirmDialogData = {
      title,
      message,
    };
    return this.sendDialog(data);
  }

  showConfirmDialog(
    title: string,
    message: string,
    okText: string,
    okCallback: () => void
  ): MatDialogRef<ConfirmDialogComponent, IConfirmDialogData> {
    const data: IConfirmDialogData = {
      title,
      message,
      okText,
      okCallback,
    };

    return this.sendDialog(data);
  }

  sendDialog(
    data: IConfirmDialogData
  ): MatDialogRef<ConfirmDialogComponent, IConfirmDialogData> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data,
      disableClose: false,
      autoFocus: true,
      closeOnNavigation: true,
      hasBackdrop: true,
      minWidth: '300px',
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('El diálogo se cerró');
    //   console.log(`Resultado: ${result}`);
    // });

    return dialogRef;
  }
}
