import {Component, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import {Input, Output} from "@angular/core/src/metadata/directives";
import {Car} from "../../model/car";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  // Lista samochodów
  @Input() items: Car[];

  // Wartości filtrów ceny od-do
  @Input() filterFrom: Number;
  @Input() filterTo: Number;

  // Nazwa kolumny sortowanej i kolejność
  @Input() sortColumnName: String;
  @Input() sortAsc: boolean;

  // Zdarzenie aktualizacji filtrów
  @Output() filtersUpdated = new EventEmitter();

  // Zdarzenie sortowania kolumny
  @Output() columnsSorted = new EventEmitter();

  // Zdarzenie edycji samochodu
  @Output() editCarEvent = new EventEmitter();
  // Zdarzenie podglądu samochodu
  @Output() viewCarEvent = new EventEmitter();
  // Zdarzenie usunięcia samochodu
  @Output() deleteCarEvent = new EventEmitter();
  // Zdarzenie tworzenia samochodu
  @Output() addCarEvent = new EventEmitter();

  // Zdarzenie aktualizacji filtrów
  private updateFilters(priceFrom: Number, priceTo: Number) {
    this.filtersUpdated.emit({priceFrom, priceTo});
  }

  // Zdarzenie sortowania tabeli
  private sortColumn(columnName: String) {
    this.columnsSorted.emit(columnName);
  }

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

  // Zdarzenie tworzenia samochodu
  private addNewCar() {
    this.addCarEvent.emit();
  }
}
