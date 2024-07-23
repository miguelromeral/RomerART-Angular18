import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger/logger.service';
import $ from 'jquery';

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
    $('#debug').text('desde TS!');
  }
}
