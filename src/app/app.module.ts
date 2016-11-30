import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {TableComponent} from './table/table.component';
import {CarComponent} from './car/car.component';
import {RowComponent} from './row/row.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    TableComponent,
    RowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
