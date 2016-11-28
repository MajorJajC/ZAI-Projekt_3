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
export const NEW_PRODUCT = 'NEW_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DEL_PRODUCT = 'DEL_PRODUCT';
;
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const VIEW_PRODUCT = 'VIEW_PRODUCT';
export const FILTER_TABLE = 'FILTER_TABLE';
export const CANCEL = 'CANCEL';

/**
 * Service, that handles all user actions.
 */
@Injectable()
export class TableService {

  constructor(private store: StoreService) {
  }

  /**
   * Car count, used as primary key for all products.
   * @type {number}
   */
  private productCount: number = 0;

  /**
   * Initial car count, used to generate some dummy data.
   * @type {number}
   */
  private initialProductsCount: number = 20;

  /**
   * Load table.
   */
  public loadTable() {
    this.store.dispatch({
      type: LOAD_TABLE,
      payload: this.getSampleProducts()
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
  public viewProduct(car: any) {
    this.store.dispatch({
      type: VIEW_PRODUCT,
      payload: car
    })
  }

  /**
   * Show new car form.
   */
  public newProduct() {
    this.store.dispatch({
      type: NEW_PRODUCT,
      payload: {}
    })
  }

  /**
   * Save new car.
   * @param car
   */
  public addProduct(car: Car) {
    this.productCount++;
    car.id = this.productCount;

    this.store.dispatch({
      type: ADD_PRODUCT,
      payload: car
    })
  }

  /**
   * Show edit car form.
   * @param car
   */
  public editProduct(car: any) {
    this.store.dispatch({
      type: EDIT_PRODUCT,
      payload: car
    })
  }

  /**
   * Save edited car.
   * @param car
   */
  public updateProduct(car: Car) {
    this.store.dispatch({
      type: UPDATE_PRODUCT,
      payload: car
    })
  }

  /**
   * Delete car.
   * @param car
   */
  public deleteProduct(car: any) {
    this.productCount--;
    this.store.dispatch({
      type: DEL_PRODUCT,
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
  private getSampleProducts(): any[] {
    let sampleImgUrl: string = 'http://pixers.pl/image/1/400/n8nLugc1WRUN9cGZCiEM3RmFLVmTNpmQyolUwgHO812UbpkZfRkQ81j1HZVQfNDXw79QhEUNhYVRhYVQh72MhF3Fqz4il5maulmR0ZmaERGaho2F0Rni/96/86/40/0096864037/1/fototapeta-cartoon-czerwony-samochod-transport.jpg';
    let loremIpsum: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget ex eget erat dapibus fermentum in vitae dolor. Maecenas suscipit tempus accumsan. Quisque rhoncus augue vel ligula mollis, in fermentum nulla auctor. Morbi varius libero vitae tristique laoreet. Proin vehicula nunc in dolor lobortis viverra. Curabitur non commodo ex, a sagittis dui. Curabitur consectetur metus pretium nibh consequat efficitur. Maecenas ut vestibulum elit.';
    let cars: Car[] = [];

    for (let i = 0; i < this.initialProductsCount; i++) {
      let car: Car = new Car('Samochód ' + i, 1000 * i, sampleImgUrl, loremIpsum, i * 50, (i+1) % 6, !(i % 3));
      car.id = i;
      cars.push(car);
      this.productCount = i + 1;
    }

    return cars;
  }
}
