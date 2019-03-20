import {
  FILTER_PRODUCTS,
  FILTER_ACCESSORIES,
  FILTER_SHOES,
  FILTER_ACCESSORIES_SELECTIONS,
  FILTER_SHOES_SELECTIONS
} from '../constants';

const INITIAL_STATE = {
  shoesFilter: Object.values(FILTER_SHOES_SELECTIONS),
  accessoriesFilter: Object.values(FILTER_ACCESSORIES_SELECTIONS),
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FILTER_PRODUCTS:
      let newFilter;

      if (action.payload.type === FILTER_SHOES) {
        newFilter = action.payload.selectedFilter === "all" ? INITIAL_STATE.shoesFilter : action.payload.selectedFilter;

        return { ...state, shoesFilter: newFilter };
      } else if (action.payload.type === FILTER_ACCESSORIES) {
        newFilter = action.payload.selectedFilter === "all" ? INITIAL_STATE.accessoriesFilter : action.payload.selectedFilter;

        return { ...state, accessoriesFilter: newFilter };
      } else {
        return { ...state };
      }
    default:
      return { ...state };
  }
}