import {Component, EventEmitter} from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";
import {ADD_ITEM, EDIT_ITEM, VIEW_ITEM} from "../../model/actions";
import {Car} from "../../model/car";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {

  // Aktualnie tworzony/edytowany/podglądany samochód
  @Input() item: any;

  // Nazwa aktualnie wykonywanej akcji
  @Input() action: any;

  // Zdarzenie anulowania podglądu/edycji/tworzenia
  @Output() cancelAction = new EventEmitter();

  // Zdarzenie zapisu utworzonego samochodu
  @Output() addCar = new EventEmitter();

  // Zdarzenie zapisu edytowanego auta
  @Output() saveUpdatedCar = new EventEmitter();

  // Nazwy dostępnych akcji
  private ADD_ITEM = ADD_ITEM;
  private EDIT_ITEM = EDIT_ITEM;
  private VIEW_ITEM = VIEW_ITEM;

  // Zdarzenie anulowania podglądu/edycji/tworzenia samochodu
  private cancel() {
    this.cancelAction.emit();
  }

  // Zdarzenie tworzenia nowego samochodu
  private saveCar(car: Car) {
    this.addCar.emit(car);
  }

  // Zdarzenie zapisu edytowanego samochodu
  private updateCar(car: Car) {
    this.saveUpdatedCar.emit(car);
  }

}
