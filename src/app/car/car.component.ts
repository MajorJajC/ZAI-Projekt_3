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

  @Input() item: any;
  @Input() action: any;

  @Output() cancelAction = new EventEmitter();
  @Output() addCar = new EventEmitter();
  @Output() saveUpdatedCar = new EventEmitter();

  private ADD_ITEM = ADD_ITEM;
  private EDIT_ITEM = EDIT_ITEM;
  private VIEW_ITEM = VIEW_ITEM;

  private cancel() {
    this.cancelAction.emit();
  }

  private addProduct(car: Car) {
    this.addCar.emit(car);
  }

  private updateProduct(car: Car) {
    this.saveUpdatedCar.emit(car);
  }

}
