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
  @Input() items: Car[];

  @Input() filterFrom: Number;
  @Input() filterTo: Number;

  @Input() sortColumnName: String;
  @Input() sortAsc: boolean;

  @Output() filtersUpdated = new EventEmitter();
  @Output() columnsSorted = new EventEmitter();

  @Output() editCarEvent = new EventEmitter();
  @Output() viewCarEvent = new EventEmitter();
  @Output() deleteCarEvent = new EventEmitter();

  private columns: any[] = [
    {name: 'name', 'header': 'Model samochodu', sortable: true},
    {name: 'price', 'header': 'Cena', sortable: true},
    {name: 'horsepower', 'header': 'Moc silnika', sortable: true},
    {name: 'engcap', 'header': 'Pojemność silnika', sortable: true},
  ];

  private updateFilters(priceFrom: Number, priceTo: Number) {
    this.filtersUpdated.emit({priceFrom, priceTo});
  }

  private sortColumn(columnName: String) {
    this.columnsSorted.emit(columnName);
  }

  private viewCar(car: Car) {
    this.viewCarEvent.emit(car);
  }

  private editCar(car: Car) {
    this.editCarEvent.emit(car);
  }

  private deleteCar(car: Car) {
    this.deleteCarEvent.emit(car);
  }
}
