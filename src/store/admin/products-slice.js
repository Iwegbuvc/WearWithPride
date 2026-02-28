
import {
  createProduct,
  updateProduct,
  deleteProductApi,
  fetchProducts,
} from "../../api/products";

// Add new product (with image upload)
export const addNewProduct = (formData) => async (dispatch) => {
  try {
    // Convert plain object to FormData
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value) {
        // Single image or array
        if (Array.isArray(value)) {
          value.forEach((file) => data.append("images", file));
        } else {
          data.append("images", value);
        }
      } else if (value !== undefined && value !== null) {
        data.append(key, value);
      }
    });
    const res = await createProduct(data);
    return { payload: { success: true, product: res.data } };
  } catch (error) {
    return { payload: { success: false, error: error?.response?.data?.message || error.message } };
  }
};

// Edit product (with image upload)
export const editProduct = ({ id, formData }) => async (dispatch) => {
  try {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && value) {
        if (Array.isArray(value)) {
          value.forEach((file) => data.append("images", file));
        } else {
          data.append("images", value);
        }
      } else if (value !== undefined && value !== null) {
        data.append(key, value);
      }
    });
    const res = await updateProduct(id, data);
    return { payload: { success: true, product: res.data } };
  } catch (error) {
    return { payload: { success: false, error: error?.response?.data?.message || error.message } };
  }
};

// Delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await deleteProductApi(id);
    return { payload: { success: true } };
  } catch (error) {
    return { payload: { success: false, error: error?.response?.data?.message || error.message } };
  }
};

// Fetch all products
export const fetchAllProducts = (params) => async (dispatch) => {
  try {
    const res = await fetchProducts(params);
    dispatch({ type: "FETCH_ALL_PRODUCTS", payload: res.data.products });
    return { payload: res.data.products };
  } catch (error) {
    dispatch({ type: "FETCH_ALL_PRODUCTS", payload: [] });
    return { payload: [] };
  }
};


export const adminProductsReducer = (
  state = { productList: [] },
  action,
) => {
  switch (action.type) {
    case "FETCH_ALL_PRODUCTS":
      return { ...state, productList: action.payload };
    default:
      return state;
  }
};
