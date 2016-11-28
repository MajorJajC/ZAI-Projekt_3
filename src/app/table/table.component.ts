import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {TableService} from "../../service/table.service";
import {Car} from "../../model/car";
import {IDLE} from "../../reducers/table.reducer";

/**
 * Components renders table.
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {

  constructor(tableService: TableService) {
    this.tableService = tableService;
  }

  /**
   * Items to render.
   */
  @Input() items: Car[];

  /**
   * Current action.
   */
  @Input() action: string;

  /**
   * Applied filters for price.
   */
  @Input() filters: any;

  /**
   * Sort column name.
   */
  @Input() sortColumn: string;

  /**
   * Sort direction.
   */
  @Input() sortAsc: boolean;

  /**
   * Table service, which holds actions.
   */
  private tableService: TableService;

  /**
   * Magic string, that hold IDLE action identifier.
   * @type {string}
   */
  private IDLE: string = IDLE;

  /**
   * Colums in table to show and headers.
   * @type {{name: string; header: string; sortable: boolean}[]}
   */
  private columns: any[] = [
    {name: 'name', 'header': 'Model samochodu', sortable: true},
    {name: 'price', 'header': 'Cena', sortable: true},
    {name: 'horsepower', 'header': 'Moc silnika', sortable: true},
    {name: 'engcap', 'header': 'Pojemność silnika', sortable: true},
  ];

}
