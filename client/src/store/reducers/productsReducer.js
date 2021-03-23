/* eslint-disable default-case */
import * as actionTypes from '../actions/actionTypes';

// JS object, which reflects initial state for reducer.
const initialState = {
    products: [],

    createProductData: {
        name: '',
        price: '',
    },

    editProductData: {
        id: '',
        name: '',
        price: '',
    },

    createProductModal: false,
    editProductModal: false,
};

// Reducer.
const productsReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.GET_PRODUCTS:
            return {
                ...initialState,
                products: action.payload,
            };

        /////////////////////////////////////////////////////////
        
        // VARIANT 1.
        // case actionTypes.ADD_PRODUCT_HANDLER:
        //     return {
        //         ...state,
        //         products: [...state.products, action.payload],
        //         createProductData: state.createProductData,
        //     };

        case actionTypes.UPDATE_CREATE_PRODUCT_DATA:
            return {
                ...state,
                createProductData: action.payload,
            };

        //////////////////////////////////////////////////////////

        case actionTypes.UPDATE_EDIT_PRODUCT_DATA:
            return {
                ...state,
                editProductData: action.payload,
            };

        //////////////////////////////////////////////////////////

        case actionTypes.DELETE_PRODUCT_HANDLER:
            return {
                ...state,
                products: state.products.filter((el) => el.id !== action.payload),
            };

        //////////////////////////////////////////////////////////

        case actionTypes.TOGGLE_CREATE_PRODUCT_MODAL:
            return {
                ...state,
                createProductModal: !state.createProductModal,
            };

        case actionTypes.TOGGLE_EDIT_PRODUCT_MODAL:
            return {
                ...state,
                editProductModal: !state.editProductModal,
            };
    };

    return state;
};

export default productsReducer;