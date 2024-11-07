import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filterFormAnimation } from '@app/animations/art/filter-form.animations';
import { AlertService } from '@app/services/alerts/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  animations: [filterFormAnimation],
})
export class LayoutComponent implements OnInit, OnDestroy {
  @Input() padding = true;

  errorListSubscription: Subscription | null = null;
  errorList: string[];

  get showErrors(): boolean {
    return this.errorList.length > 0;
  }

  constructor(public alertService: AlertService) {
    this.errorList = [];
  }

  ngOnInit() {
    this.errorListSubscription = this.alertService.errorList$().subscribe({
      next: list => {
        // console.log('==> Receiving: ', list);
        this.errorList = list;
      },
    });
  }

  hideErrors() {
    this.alertService.cleanSilentAlerts();
  }

  ngOnDestroy(): void {
    this.alertService.cleanSilentAlerts();
    this.errorListSubscription?.unsubscribe();
  }
}
