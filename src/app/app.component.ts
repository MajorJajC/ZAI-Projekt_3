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

  // Lista samochodów
  private cars: Car[];

  // Ilość inicjalnie wygenerowanych rekordów
  private initialCarCount: Number = 15;

  // Aktualna ilość samochodów
  private carCount: number = 15;

  // Wartości filtrów ceny od-do
  private filterFrom: Number;
  private filterTo: Number;

  // Nazwa sortowanej kolumny i kierunek sortowania
  private sortColumn: String = 'name';
  private sortAsc: boolean = true;

  // Aktualnie tworzone/edytowane/podglądane auto
  private car = {};

  // Aktualnie wykonywana akcja, inicjalnie tabelka
  private action: string = SHOW_TABLE;

  // Możliwe wartości akcji
  private ADD_ITEM = ADD_ITEM;
  private EDIT_ITEM = EDIT_ITEM;
  private VIEW_ITEM = VIEW_ITEM;
  private SHOW_TABLE = SHOW_TABLE;

  // Metoda wywoływana po inicjacji komponentu
  ngOnInit(): void {
    this.cars = this.getSampleCars();
  }

  // Metoda generujące przykładowe dane
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

  // Zdarzenie aktualizacji filtrów
  private filtersUpdated(event) {
    this.filterFrom = event.priceFrom;
    this.filterTo = event.priceTo;
  }

  // Zdarzenie sortowania tabeli
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

  // Zdarzenie anulowania ostatniej akcji
  private cancelAction() {
    this.car = {};
    this.action = SHOW_TABLE;
  }

  // Akcja wyświetlenia formularza tworzenia samochodu
  private addNewCar() {
    this.action = ADD_ITEM;
  }

  // Akcja podglądu samochodu
  private viewCar(car: Car) {
    this.car = car;
    this.action = VIEW_ITEM;
  }

  // Akcja wyświetlenia formularza edycji samochodu
  private editCar(car: Car) {
    this.car = this.clone(car);
    this.action = EDIT_ITEM;
  }

  // Akcja tworzenia samochodu
  private createCar(car: Car) {
    car.id = this.carCount;
    this.carCount++;

    this.cars.push(car);
    this.car = {};
    this.action = SHOW_TABLE;
  }

  // Akcja aktualizowania danych samochodu
  private saveUpdatedCar(car: Car) {
    let id: number = car.id;
    let cars: Car[] = this.cars;

    for (let carIterator of cars) {
      if(carIterator.id === id) {
        this.deleteCar(carIterator);
        this.createCar(car);
        this.columnsSorted(this.sortColumn);
        this.columnsSorted(this.sortColumn);
      }
    }

    this.car = {};
    this.cars = cars;
    this.action = SHOW_TABLE;
  }

  // Akcja usuwania samochodu
  private deleteCar(car: Car) {      //noinspection TypeScriptUnresolvedVariable
    let carList: Car[] = this.cars;
    let carIndex = carList.indexOf(car);
    if (carIndex > -1) {
      carList.splice(carIndex, 1);
    }

    this.cars = carList;
  }

  // Metoda do porównywania samochodów po danym parametrze
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

  // Metoda tworzy kopię obiektu
  private clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = {};
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

}
