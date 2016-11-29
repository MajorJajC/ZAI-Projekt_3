import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";
import {Car} from "../../model/car";

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],

})
export class TableRowComponent {
  @Input() item: any;

  @Output() editCarEvent = new EventEmitter();
  @Output() viewCarEvent = new EventEmitter();
  @Output() deleteCarEvent = new EventEmitter();

  private editCar(car: Car) {
    this.editCarEvent.emit(car);
  }

  private viewCar(car: Car) {
    this.viewCarEvent.emit(car);
  }

  private deleteCar(car: Car) {
    this.deleteCarEvent.emit(car);
  }
}
