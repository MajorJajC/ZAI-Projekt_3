import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TableComponent} from './table/table.component';
import {StoreService} from "../store.service";
import {TableService} from "../service/table.service";
import {ProductComponent} from './product/product.component';
import {TableRowComponent} from './table-row/table-row.component';
import {MaterialModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ProductComponent,
    TableRowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [
    {provide: StoreService, useValue: new StoreService()},
    {
      provide: TableService,
      useFactory: (store) => new TableService(store),
      deps: [StoreService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
