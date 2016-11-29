import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TableComponent} from './table/table.component';
import {CarComponent} from './car/car.component';
import {TableRowComponent} from './table-row/table-row.component';
import {MaterialModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CarComponent,
    TableRowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
