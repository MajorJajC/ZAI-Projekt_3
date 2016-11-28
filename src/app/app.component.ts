import {Component} from '@angular/core';
import {StoreService} from "../store.service";
import {TableService} from "../service/table.service";
import {NEW, EDITING, VIEWING, IDLE} from "../reducers/table.reducer";

/**
 * Main application component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(store: StoreService, tableService: TableService) {
    this.store = store;
    this.tableService = tableService;

    this.headers[NEW] = 'Dodaj samochód';
    this.headers[EDITING] = 'Edycja samochodu';
    this.headers[VIEWING] = 'Podgląd samochodu';
    this.headers[IDLE] = 'Lista samochodów';

    this.tableService.loadTable();

  }


  /**
   * Store, that hold redux state.
   */
  private store: StoreService;

  /**
   * Table service, which holds actions.
   */
  private tableService: TableService;

  /**
   * Headers for actions.
   * @type {Array}
   */
  private headers: any[] = [];
}
