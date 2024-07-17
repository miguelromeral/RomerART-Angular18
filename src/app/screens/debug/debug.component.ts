import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [],
  templateUrl: './debug.component.html',
  styleUrl: './debug.component.scss',
})
export class DebugComponent implements OnInit {
  constructor(private logger: LoggerService) {}

  ngOnInit() {
    this.logger.log('Inicializado!');
    console.log('Environment:', environment);
  }
}
