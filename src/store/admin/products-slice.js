// Mock Redux slice for admin products (UI only)
export const addNewProduct = (data) => async (dispatch) => ({
  payload: { success: true },
});
export const deleteProduct = (id) => async (dispatch) => ({
  payload: { success: true },
});
export const editProduct = (data) => async (dispatch) => ({
  payload: { success: true },
});
export const fetchAllProducts = () => async (dispatch) => ({
  type: "FETCH_ALL_PRODUCTS",
  payload: [],
});

// Optionally, you can add a mock reducer and initial state if needed for selectors
const demoProducts = [
  {
    _id: "1",
    image: "/images/product_1.png",
    title: "Demo Product 1",
    price: 29000,
    salePrice: 19000,
  },
  {
    _id: "2",
    image: "/images/product_2.png",
    title: "Demo Product 2",
    price: 49999,
    salePrice: 0,
  },
  {
    _id: "3",
    image: "/images/product_3.png",
    title: "Demo Product 3",
    price: 15000,
    salePrice: 12000,
  },
  {
    _id: "4",
    image: "/images/product_4.png",
    title: "Demo Product 4",
    price: 35000,
    salePrice: 0,
  },
  {
    _id: "5",
    image: "/images/product_5.png",
    title: "Demo Product 5",
    price: 22000,
    salePrice: 18000,
  },
];

export const adminProductsReducer = (
  state = { productList: demoProducts },
  action,
) => state;
