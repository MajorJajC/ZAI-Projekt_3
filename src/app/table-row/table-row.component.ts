import {Component, OnInit} from '@angular/core';
import {Input} from "@angular/core/src/metadata/directives";
import {TableService} from "../../service/table.service";

/**
 * Component renders singe table row.
 */
@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css'],

})
export class TableRowComponent {

  constructor(tableService: TableService) {
    this.tableService = tableService;
  }

  /**
   * Rendered item.
   */
  @Input() item: any;

  /**
   * Table service, which holds actions.
   */
  private tableService: TableService;

}
