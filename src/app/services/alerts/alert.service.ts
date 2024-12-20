import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/components/shared/confirm-dialog/confirm-dialog.component';
import { CustomTranslatePipe } from '@app/pipes/translate/customtranslate';
import { IConfirmDialogData } from '@models/alert/confirm-dialog.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private errorList: string[];
  private errorListSubject = new BehaviorSubject<string[]>([]);
  errorList$ = () => this.errorListSubject.asObservable();

  constructor(public dialog: MatDialog) {
    this.errorList = [];
  }

  showAlert(
    title: string,
    message: string
  ): MatDialogRef<ConfirmDialogComponent, boolean> {
    const data: IConfirmDialogData = {
      title,
      message,
      cancelText: undefined,
    };
    return this.sendDialog(data);
  }

  showBasicAlert(
    message: string
  ): MatDialogRef<ConfirmDialogComponent, boolean> {
    const data: IConfirmDialogData = {
      title: '',
      message,
      cancelText: undefined,
    };
    return this.sendDialog(data);
  }

  showSilentAlert(
    translatePipe: CustomTranslatePipe,
    key: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) {
    const text = translatePipe.transform(key, ...args);

    const newError = document.createElement('div');
    newError.classList.add('mr-error-content');
    newError.classList.add('mr-error-msg');
    newError.innerHTML = text;
    document.getElementById('divPageErrors')?.appendChild(newError);
  }

  cleanSilentAlerts() {
    this.errorList = [];
    this.errorListSubject.next([]);
  }

  showConfirmDialog(
    title: string,
    message: string,
    okText = 'OK',
    cancelText = 'Cancel'
  ): Observable<boolean> {
    const data: IConfirmDialogData = {
      title,
      message,
      okText,
      cancelText,
    };

    const dialogRef = this.sendDialog(data);

    return dialogRef.afterClosed().pipe(
      map(result => {
        // console.log('Result: ', result);
        return result === true; // Devuelve true si el usuario confirma, false en caso contrario
      })
    );
  }

  private sendDialog(
    data: IConfirmDialogData
  ): MatDialogRef<ConfirmDialogComponent, boolean> {
    // console.log('Mostrando dialog');
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data,
      disableClose: false,
      autoFocus: true,
      closeOnNavigation: true,
      hasBackdrop: true,
      minWidth: '300px',
    });

    return dialogRef;
  }
}
