import {Component, OnInit} from '@angular/core';
import {Car} from "../model/car";
import {ADD_ITEM, EDIT_ITEM, VIEW_ITEM, SHOW_TABLE} from "../model/actions";

/**
 * Main application component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private cars: Car[];
  private initialCarCount: Number = 15;
  private carCount: Number = 15;

  private filterFrom: Number;
  private filterTo: Number;

  private sortColumn: String = 'Name';
  private sortAsc: boolean = true;

  private car = {};

  private action: string = SHOW_TABLE;

  private ADD_ITEM = ADD_ITEM;
  private EDIT_ITEM = EDIT_ITEM;
  private VIEW_ITEM = VIEW_ITEM;
  private SHOW_TABLE = SHOW_TABLE;

  ngOnInit(): void {
    this.cars = this.getSampleCars();
  }

  /**
   * Headers for actions.
   * @type {Array}
   */
  private headers: any[] = [];

  /**
   * Method generates some dummy data for test purposes.
   * @returns {Car[]}
   */
  private getSampleCars(): any[] {
    let sampleImgUrl: string = 'http://pixers.pl/image/1/400/n8nLugc1WRUN9cGZCiEM3RmFLVmTNpmQyolUwgHO812UbpkZfRkQ81j1HZVQfNDXw79QhEUNhYVRhYVQh72MhF3Fqz4il5maulmR0ZmaERGaho2F0Rni/96/86/40/0096864037/1/fototapeta-cartoon-czerwony-samochod-transport.jpg';
    let loremIpsum: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget ex eget erat dapibus fermentum in vitae dolor. Maecenas suscipit tempus accumsan. Quisque rhoncus augue vel ligula mollis, in fermentum nulla auctor. Morbi varius libero vitae tristique laoreet. Proin vehicula nunc in dolor lobortis viverra. Curabitur non commodo ex, a sagittis dui. Curabitur consectetur metus pretium nibh consequat efficitur. Maecenas ut vestibulum elit.';
    let cars: Car[] = [];

    for (let i = 0; i < this.initialCarCount; i++) {
      let car: Car = new Car('Samochód ' + i, 1000 * i, sampleImgUrl, loremIpsum, i * 50, (i + 1) % 6, !(i % 3));
      car.id = i;
      cars.push(car);
      this.carCount = i + 1;
    }

    return cars;
  }

  private filtersUpdated(event) {
    this.filterFrom = event.priceFrom;
    this.filterTo = event.priceTo;
  }

  private columnsSorted(event) {
    let sortAsc: boolean = true;
    let sortProperty: string = event;

    if (sortProperty === this.sortColumn) {
      sortAsc = !this.sortAsc;
    }

    this.sortColumn = sortProperty;
    this.sortAsc = sortAsc;

    if (!sortAsc) {
      sortProperty = '-' + sortProperty;
    }

    this.cars.sort(this.dynamicSort(sortProperty));

  }

  private cancelAction() {
    this.action = SHOW_TABLE;
  }

  private addNewCar() {
    this.action = ADD_ITEM;
  }

  private viewCar(car: Car) {
    this.car = car;
    this.action = VIEW_ITEM;
  }

  private editCar(car: Car) {
    this.car = car;
    this.action = EDIT_ITEM;
  }

  private createCar(car: Car) {
    this.cars.push(car);
    this.car = {};
    this.action = SHOW_TABLE;
  }

  private saveUpdatedCar(car: Car) {
    let cars: Car[] = this.cars;
    let index = cars.indexOf(car);
    console.log('adsd');

    if (index > -1) {
      cars[index] = car;
    }

    this.cars = cars;
    this.action = SHOW_TABLE;
    console.log('adsd');
  }

  private deleteCar(car: Car) {      //noinspection TypeScriptUnresolvedVariable
    let carList: Car[] = this.cars;
    let carIndex = carList.indexOf(car);
    if (carIndex > -1) {
      carList.splice(carIndex, 1);
    }

    this.cars = carList;
  }

  private dynamicSort(property: string) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }
}
