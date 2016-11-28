import {Injectable} from "@angular/core";
import {StoreService} from "../store.service";
import {Car} from "../model/car";
/*import {ABOUT} from "../reducers/table.reducer";*/

/**
 * Events names as magic strings.
 * @type {string}
 */
export const LOAD_TABLE = 'LOAD_TABLE';
export const SORT_TABLE = 'SORT_TABLE';
export const NEW_CAR = 'NEW_CAR';
export const ADD_CAR = 'ADD_CAR';
export const DEL_CAR = 'DEL_CAR';
export const EDIT_CAR = 'EDIT_CAR';
export const UPDATE_CAR = 'UPDATE_CAR';
export const VIEW_CAR = 'VIEW_CAR';
export const FILTER_TABLE = 'FILTER_TABLE';
export const CANCEL = 'CANCEL';

/**
 * Service that handles all user actions.
 */
@Injectable()
export class TableService {

  constructor(private store: StoreService) {
  }

  /**
   * Car count, used as primary key for all products.
   * @type {number}
   */
  private carCount: number = 0;

  /**
   * Initial car count, used to generate some dummy data.
   * @type {number}
   */
  private initialCarCount: number = 20;

  /**
   * Load table.
   */
  public loadTable() {
    this.store.dispatch({
      type: LOAD_TABLE,
      payload: this.getSampleCars()
    })
  }

  /**
   * Sort table by given property.
   * @param property
   */
  public sortTable(property: string) {
    this.store.dispatch({
      type: SORT_TABLE,
      payload: property
    })
  }

  /**
   * Filter table by given price (beetwen priceFrom and priceTo).
   * @param priceFrom
   * @param priceTo
   */
  public applyFilters(priceFrom: number, priceTo: number) {
    this.store.dispatch({
      type: FILTER_TABLE,
      payload: {priceFrom, priceTo}
    })
  }

  /**
   * Clear price filter.
   */
  public clearFilters() {
    this.store.dispatch({
      type: FILTER_TABLE,
      payload: {}
    })
  }

  /**
   * Show car's details.
   * @param car
   */
  public viewCar(car: any) {
    this.store.dispatch({
      type: VIEW_CAR,
      payload: car
    })
  }

  /**
   * Show new car form.
   */
  public newCar() {
    this.store.dispatch({
      type: NEW_CAR,
      payload: {}
    })
  }

  /**
   * Save new car.
   * @param car
   */
  public addCar(car: Car) {
    this.carCount++;
    car.id = this.carCount;

    this.store.dispatch({
      type: ADD_CAR,
      payload: car
    })
  }

  /**
   * Show edit car form.
   * @param car
   */
  public editCar(car: any) {
    this.store.dispatch({
      type: EDIT_CAR,
      payload: car
    })
  }

  /**
   * Save edited car.
   * @param car
   */
  public updateCar(car: Car) {
    this.store.dispatch({
      type: UPDATE_CAR,
      payload: car
    })
  }

  /**
   * Delete car.
   * @param car
   */
  public deleteCar(car: any) {
    this.carCount--;
    this.store.dispatch({
      type: DEL_CAR,
      payload: car
    })
  }

  /**
   * Cancel actions and back to table.
   */
  public cancel() {
    this.store.dispatch({
      type: CANCEL,
      payload: {}
    })
  }

  /**
   * Method generates some dummy data for test purposes.
   * @returns {Car[]}
   */
  private getSampleCars(): any[] {
    let sampleImgUrl: string = 'http://pixers.pl/image/1/400/n8nLugc1WRUN9cGZCiEM3RmFLVmTNpmQyolUwgHO812UbpkZfRkQ81j1HZVQfNDXw79QhEUNhYVRhYVQh72MhF3Fqz4il5maulmR0ZmaERGaho2F0Rni/96/86/40/0096864037/1/fototapeta-cartoon-czerwony-samochod-transport.jpg';
    let loremIpsum: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget ex eget erat dapibus fermentum in vitae dolor. Maecenas suscipit tempus accumsan. Quisque rhoncus augue vel ligula mollis, in fermentum nulla auctor. Morbi varius libero vitae tristique laoreet. Proin vehicula nunc in dolor lobortis viverra. Curabitur non commodo ex, a sagittis dui. Curabitur consectetur metus pretium nibh consequat efficitur. Maecenas ut vestibulum elit.';
    let cars: Car[] = [];

    for (let i = 0; i < this.initialCarCount; i++) {
      let car: Car = new Car('Samochód ' + i, 1000 * i, sampleImgUrl, loremIpsum, i * 50, (i+1) % 6, !(i % 3));
      car.id = i;
      cars.push(car);
      this.carCount = i + 1;
    }

    return cars;
  }
}
