import {
  LOAD_TABLE, ADD_PRODUCT, DEL_PRODUCT, EDIT_PRODUCT, UPDATE_PRODUCT,
  NEW_PRODUCT, CANCEL, VIEW_PRODUCT, FILTER_TABLE, SORT_TABLE
} from "../service/table.service";

/**
 * New product form state.
 * @type {string}
 */
export const NEW = 'NEW';

/**
 * Edit product form state.
 * @type {string}
 */
export const EDITING = 'EDITING';

/**
 * View product state.
 * @type {string}
 */
export const VIEWING = 'VIEWING';

/**
 * About state.
 * @type {string}
 export const ABOUT = 'ABOUT';
 */


/**
 * Idle state, show table.
 * @type {string}
 */
export const IDLE = 'IDLE';

/**
 * Initial state.
 *
 * @type {{list: Array; product: {name: string; price: string; image: string}; filters: {}; sortColumn: string; sortAsc: boolean}}
 */
const defaultState = {
  list: [],
  product: {
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
        product: {},
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
        product: {},
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
        product: {},
        action: IDLE,
        filters: state.filters,
        sortColumn: action.payload,
        sortAsc: sortAsc
      };

    /**
     * View product event.
     */
    case VIEW_PRODUCT:
      return {
        list: state.list,
        product: action.payload,
        action: VIEWING,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * New product form event.
     */
    case NEW_PRODUCT:
      //noinspection TypeScriptUnresolvedVariable
      return {
        list: state.list,
        product: action.payload,
        action: NEW,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Save new product event.
     */
    case ADD_PRODUCT:
      //noinspection TypeScriptUnresolvedVariable
      return {
        list: [...state.list, action.payload],
        product: {},
        action: IDLE,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Delete product event.
     *
     */
    case DEL_PRODUCT:
      //noinspection TypeScriptUnresolvedVariable
      let productList: any[] = state.list;
      let productIndex = productList.indexOf(action.payload);
      if (productIndex > -1) {
        productList.splice(productIndex, 1);
      }
      return {
        list: productList,
        product: {},
        action: IDLE,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Edit product form event.
     */
    case EDIT_PRODUCT:
      //noinspection TypeScriptUnresolvedVariable
      return {
        list: state.list,
        product: action.payload,
        action: EDITING,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Save edited product event.
     */
    case UPDATE_PRODUCT:
      //noinspection TypeScriptUnresolvedVariable
      let products: any[] = state.list;
      let index = products.indexOf(action.payload);
      console.log(index);
      if (index > -1) {
        products[index] = action.payload;
      }
      return {
        list: products,
        product: {},
        action: IDLE,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };

    /**
     * Show about site page.

    case ABOUT:
      return {
        list: state.list,
        product: action.payload,
        action: ABOUT,
        filters: state.filters,
        sortColumn: state.sortColumn,
        sortAsc: state.sortAsc
      };
     */

    /**
     * Cancel event (back to table).
     */
    case CANCEL:
      return {
        list: state.list,
        product: action.payload,
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
