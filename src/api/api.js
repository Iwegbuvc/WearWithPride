// Mock API for frontend-only development
const demoProducts = [
  {
    _id: "1",
    name: "Demo Product 1",
    image: "https://via.placeholder.com/300x300.png?text=Product+1",
    price: 2999,
    images: [{ url: "https://via.placeholder.com/300x300.png?text=Product+1" }],
  },
  {
    _id: "2",
    name: "Demo Product 2",
    image: "https://via.placeholder.com/300x300.png?text=Product+2",
    price: 4999,
    images: [{ url: "https://via.placeholder.com/300x300.png?text=Product+2" }],
  },
  {
    _id: "3",
    name: "Demo Product 3",
    image: "https://via.placeholder.com/300x300.png?text=Product+3",
    price: 3999,
    images: [{ url: "https://via.placeholder.com/300x300.png?text=Product+3" }],
  },
];

const API = {
  get: async (url, { params } = {}) => {
    if (url === "/products/getProducts") {
      // Simulate filtering by search query if present
      let products = demoProducts;
      if (params && params.q) {
        const q = params.q.toLowerCase();
        products = products.filter((p) => p.name.toLowerCase().includes(q));
      }
      return Promise.resolve({ data: { products } });
    }
    return Promise.reject(new Error("Unknown endpoint: " + url));
  },
};

export default API;
