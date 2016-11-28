import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {TableService} from "../../service/table.service";
import {Input} from "@angular/core/src/metadata/directives";
import {NEW, EDITING, VIEWING} from "../../reducers/table.reducer";

/**
 * Component, that renders car form (for edit or create) or car details view.
 */
@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarComponent {

  constructor(tableService: TableService) {
    this.tableService = tableService;
  }

  /**
   * Item to show, null if NEW action.
   */
  @Input() item: any;

  /**
   * Action from state.
   */
  @Input() action: any;

  /**
   * Some magic strings.
   * @type {string}
   */
  NEW: string = NEW;
  EDITING: string = EDITING;
  VIEWING: string = VIEWING;

  /**
   * Table service, which holds actions.
   */
  private tableService: TableService;

}
