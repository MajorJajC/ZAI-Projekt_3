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

  // Aktualna ilość samochodów
  private carCount: number = 10;

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
    let image: string = 'http://pixers.pl/image/1/400/n8nLugc1WRUN9cGZCiEM3RmFLVmTNpmQyolUwgHO812UbpkZfRkQ81j1HZVQfNDXw79QhEUNhYVRhYVQh72MhF3Fqz4il5maulmR0ZmaERGaho2F0Rni/96/86/40/0096864037/1/fototapeta-cartoon-czerwony-samochod-transport.jpg';
    let desc: string = 'Drogi Marszałku, Wysoka Izbo. PKB rośnie. Nie chcę państwu niczego sugerować, ale skoordynowanie pracy obu urzędów pociąga za sobą proces wdrożenia i miejsce ostatnimi czasy, dobitnie świadczy o nowe rekordy powoduje docenianie wag modelu rozwoju. Często niezauważanym szczegółem jest ważne zadanie w restrukturyzacji przedsiębiorstwa. Tylko spokojnie. Nie zapominajmy jednak, że zakup nowego sprzętu zmusza nas do tej sprawy spełnia ważne zadanie w kształtowaniu kierunków rozwoju. Jednakże, zakres i miejsce szkolenia kadry odpowiadającego potrzebom. Z pełną odpowiedzialnością mogę stwierdzić iż dalszy rozwój różnych form oddziaływania. Pomijając fakt, że wdrożenie nowych, lepszych rozwiązań wymaga niezwykłej precyzji w większym stopniu tworzenie obecnej sytuacji. Z drugiej strony, rozszerzenie bazy o nowe rekordy zabezpiecza udział szerokiej grupie w restrukturyzacji przedsiębiorstwa. Natomiast rozszerzenie naszej działalności koliduje z powodu postaw uczestników wobec zadań programowych pomaga w przyszłościowe rozwiązania pomaga w większym stopniu tworzenie nowych propozycji. Już nie zaś teorię, okazuje się iż zakup nowego sprzętu pociąga za sobą proces wdrożenia i unowocześniania kierunków rozwoju. Obywatelu, dokończenie aktualnych projektów pociąga za najważniejszy punkt naszych działań obierzemy praktykę, nie zaś teorię, okazuje się iż zakup nowego sprzętu zmusza nas.';
    let cars: Car[] = [];

    let car1: Car = new Car('Audi 80', 1500, image, desc, 50, 1.8, false);
    let car2: Car = new Car('Lancia Kappa', 5000, image, desc, 175, 2.4, true);
    let car3: Car = new Car('BMW M5', 150000, image, desc, 250, 3.8, true);
    let car4: Car = new Car('Audi S3', 120000, image, desc, 300, 2.0, true);
    let car5: Car = new Car('Peugeot 206 SW', 7500, image, desc, 75, 1.4, false);
    let car6: Car = new Car('VW Passat', 11500, image, desc, 150, 1.9, true);
    let car7: Car = new Car('Fiat 126', 100, image, desc, 45, 0.6, false);
    let car8: Car = new Car('Mazda 6', 105000, image, desc, 125, 1.7, true);
    let car9: Car = new Car('Honda Civic', 15000, image, desc, 170, 1.8, true);
    let car10: Car = new Car('UAZ', 3500, image, desc, 55, 3.5, false);

    cars.push(car1, car2, car3, car4, car5, car6, car7, car8, car9, car10);

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
      if (carIterator.id === id) {
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
