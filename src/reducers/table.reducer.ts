import {
  LOAD_TABLE, ADD_CAR, DEL_CAR, EDIT_CAR, UPDATE_CAR,
  NEW_CAR, CANCEL, VIEW_CAR, FILTER_TABLE, SORT_TABLE
} from "../service/table.service";

/**
 * New car form state.
 * @type {string}
 */
export const NEW = 'NEW';

/**
 * Edit car form state.
 * @type {string}
 */
export const EDITING = 'EDITING';

/**
 * View car state.
 * @type {string}
 */
export const VIEWING = 'VIEWING';

/**
 * Idle state, show table.
 * @type {string}
 */
export const IDLE = 'IDLE';

/**
 * Initial state.
 *
 * @type {{list: Array; car: {name: string; price: string; image: string}; filters: {}; sortColumn: string; sortAsc: boolean}}
 */
const defaultState = {
  list: [],
  car: {
    name: '',
    price: '',
    image: ''
  },
  action: IDLE,
  filters: {},
  sortColumn: 'name',
  sortAsc: true
};

/**
 * Function user as Redux reducer.
 *
 * @param state
 * @param action
 * @returns newState
 */
export function tableReducer(state, action) {

  if (!state) {
    state = defaultState;
  }

  switch (action.type) {

    /**
     * Load table event.
     */
    case LOAD_TABLE:
      return {
        list: action.payload,
        car: {},
        action: IDLE,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Filter table event.
     */
    case FILTER_TABLE:
      return {
        list: state.list,
        car: {},
        action: IDLE,
        filters: {
          from: action.payload.priceFrom,
          to: action.payload.priceTo
        },
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Sort table event
     */
    case SORT_TABLE:
      let sortAsc: boolean = true;
      let sortProperty: string = action.payload;

      if (sortProperty === state.sortColumn) {
        sortAsc = !state.sortAsc;
      }

      if (!sortAsc) {
        sortProperty = '-' + sortProperty;
      }

      return {
        list: state.list.sort(dynamicSort(sortProperty)),
        car: {},
        action: IDLE,
        filters: state.filters,
        sortColumn: action.payload,
        sortAsc: sortAsc
      };

    /**
     * View car event.
     */
    case VIEW_CAR:
      return {
        list: state.list,
        car: action.payload,
        action: VIEWING,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * New car form event.
     */
    case NEW_CAR:
      //noinspection TypeScriptUnresolvedVariable
      return {
        list: state.list,
        car: action.payload,
        action: NEW,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Save new car event.
     */
    case ADD_CAR:
      //noinspection TypeScriptUnresolvedVariable
      return {
        list: [...state.list, action.payload],
        car: {},
        action: IDLE,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Delete car event.
     *
     */
    case DEL_CAR:
      //noinspection TypeScriptUnresolvedVariable
      let carList: any[] = state.list;
      let carIndex = carList.indexOf(action.payload);
      if (carIndex > -1) {
        carList.splice(carIndex, 1);
      }
      return {
        list: carList,
        car: {},
        action: IDLE,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Edit car form event.
     */
    case EDIT_CAR:
      //noinspection TypeScriptUnresolvedVariable
      return {
        list: state.list,
        car: action.payload,
        action: EDITING,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Save edited car event.
     */
    case UPDATE_CAR:
      //noinspection TypeScriptUnresolvedVariable
      let cars: any[] = state.list;
      let index = cars.indexOf(action.payload);
      console.log(index);
      if (index > -1) {
        cars[index] = action.payload;
      }
      return {
        list: cars,
        car: {},
        action: IDLE,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Cancel event (back to table).
     */
    case CANCEL:
      return {
        list: state.list,
        car: action.payload,
        action: IDLE,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Default state.
     */
    default:
      return state;
  }

  /**
   * Comparator for two objects by given property.
   *
   * If property starts with '-', compare will be reversed.
   *
   * @param property
   * @returns {(a:any, b:any)=>number}
   */
  function dynamicSort(property: string) {
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
