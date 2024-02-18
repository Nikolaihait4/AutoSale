const SET_SELECTED_BRAND = 'filters/SET_SELECTED_BRAND';

export const setSelectedBrand = brand => ({
  type: SET_SELECTED_BRAND,
  payload: brand,
});

const initialState = {
  selectedBrand: '',
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_BRAND:
      return {
        ...state,
        selectedBrand: action.payload,
      };
    default:
      return state;
  }
};

export default filtersReducer;
