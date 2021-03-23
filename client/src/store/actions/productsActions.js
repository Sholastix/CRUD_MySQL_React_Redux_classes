import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getProducts = () => {
    return async (dispatch) => {
        try {
            const productsList = await axios.get('http://localhost:5000/api/products/');

            dispatch({
                type: actionTypes.GET_PRODUCTS,
                payload: productsList.data,
            });
        } catch (err) {
            console.error(err);
        };
    };
};

////////////////////////////////////////////////////////////////////////////////////////////

export const addProductHandler = () => {
    return async (dispatch, getState) => {
        try {
            // VARIANT 1 - not so good.
            // const newProduct = await axios.post('http://localhost:5000/api/products/', getState().productsReducer.createProductData);
            // dispatch({
                //     type: actionTypes.ADD_PRODUCT_HANDLER,
                //     payload: newProduct.data,
                // });
            // await dispatch(getProducts());
            
            await axios.post('http://localhost:5000/api/products/', getState().productsReducer.createProductData);
            await dispatch(getProducts());
        } catch (err) {
            console.error(err);
        };
    };
};

export const updateCreateProductData = (data) => {
    return (dispatch, getState) => {
        try {
            const prevData = getState().productsReducer.createProductData;

            const newData = {
                ...prevData,
                [data.key]: data.value,
            };

            dispatch({
                type: actionTypes.UPDATE_CREATE_PRODUCT_DATA,
                payload: newData,
            })
        } catch (err) {
            console.error(err);
        }
    };
};

//////////////////////////////////////////////////////////////////////////////////////////////

export const updateProductHandler = () => {
    return async (dispatch, getState) => {
        try {
            const product = getState().productsReducer.editProductData;

            await axios.put('http://localhost:5000/api/products/' + product.id, {
                name: product.name,
                price: product.price,
            });

            await dispatch(getProducts());
        } catch (err) {
            console.error(err);
            dispatch(toggleEditProductModal());
        };
    };
};

export const updateEditProductData = (data) => {
    return (dispatch, getState) => {
        try {
            const prevData = getState().productsReducer.editProductData;

            const newData = {
                ...prevData,
                [data.key]: data.value,
            };

            dispatch({
                type: actionTypes.UPDATE_EDIT_PRODUCT_DATA,
                payload: newData,
            });
        } catch (err) {
            console.error(err);
        };
    };
};

///////////////////////////////////////////////////////////////////////////////////////////////

export const deleteProductHandler = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete('http://localhost:5000/api/products/' + id);
            dispatch({
                type: actionTypes.DELETE_PRODUCT_HANDLER,
                payload: id,
            });
        } catch (err) {
            console.error(err);
        };
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////

export const toggleCreateProductModal = () => {
    return (dispatch) => dispatch({
        type: actionTypes.TOGGLE_CREATE_PRODUCT_MODAL,
    });
};

export const toggleEditProductModal = (id) => {
    return (dispatch, getState) => {
        try {
            if (typeof id === 'number') {
                const product = getState().productsReducer.products.find((el) => el.id === id);

                for (const [key, value] of Object.entries(product)) {
                    dispatch(updateEditProductData({ key, value }));
                };
            };

            dispatch({
                type: actionTypes.TOGGLE_EDIT_PRODUCT_MODAL,
            });
        } catch (err) {
            console.error(err);
        }
    };
};