import {Component, OnInit, EventEmitter} from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";
import {Car} from "../../model/car";

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent {
  // Wyświetlany samochód
  @Input() item: any;

  // Zdarzenie podglądu samochodu
  @Output() viewCarEvent = new EventEmitter();

  // Zdarzenie edycji samochodu
  @Output() editCarEvent = new EventEmitter();

  // Zdarzenie usunięcia samochodu
  @Output() deleteCarEvent = new EventEmitter();

  // Zdarzenie podglądu samochodu
  private viewCar(car: Car) {
    this.viewCarEvent.emit(car);
  }

  // Zdarzenie edycji samochodu
  private editCar(car: Car) {
    this.editCarEvent.emit(car);
  }

  // Zdarzenie usunięcia samochodu
  private deleteCar(car: Car) {
    this.deleteCarEvent.emit(car);
  }

}
