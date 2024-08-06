import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ff-materia',
  standalone: true,
  imports: [NgClass],
  templateUrl: './ff-materia.component.html',
  styleUrl: './ff-materia.component.scss',
})
export class FfMateriaComponent {
  @Input() type!: number;

  getMateriaClass() {
    let materia = '';
    switch (this.type) {
      case 1:
        materia = 'summon';
        break;
      case 2:
        materia = 'support';
        break;
      case 3:
        materia = 'magic';
        break;
      default:
        break;
    }
    return materia;
  }
}
