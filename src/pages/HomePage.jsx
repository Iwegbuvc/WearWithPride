import HeroSlider from "../components/Common/HeroSlider";
import WhatsAppFixed from "../components/Common/WhatsAppFixed";
import BrowseCategories from "../components/Common/BrowseCategories";
import NewArrivals from "../components/Common/NewArrivals";
import ShoppingProductTile from "../components/Products/ShoppingProductTile";
// import ShoppingProductTile from "../components/Products/ShoppingProductTile";

// Demo data and handlers for development
const demoProducts = [
  {
    _id: "1",
    image: "https://via.placeholder.com/300x300.png?text=Product+1",
    title: "Demo Product 1",
    category: "T-shirts",
    brand: "Brand A",
    price: 29.99,
    salePrice: 19.99,
    totalStock: 5,
  },
  {
    _id: "2",
    image: "https://via.placeholder.com/300x300.png?text=Product+2",
    title: "Demo Product 2",
    category: "Shoes",
    brand: "Brand B",
    price: 49.99,
    salePrice: 0,
    totalStock: 0,
  },
];

const HomePage = () => {
  const productList = demoProducts;
  const handleGetProductDetails = (id) =>
    alert(`Show details for product ${id}`);
  const handleAddtoCart = (id, stock) =>
    alert(`Add product ${id} to cart (stock: ${stock})`);
  return (
    <>
      <div className="overflow-x-hidden">
        <section className="flex flex-col items-center justify-center min-h-[60vh] relative">
          <div className="w-full max-w-4xl flex flex-col items-center mx-auto lg:w-4/5">
            <div className="w-full flex justify-center sm:mb-8">
              <HeroSlider />
            </div>
            <div className="w-full flex flex-col items-center text-center px-4 py-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-red-600 drop-shadow-lg tracking-tight">
                Welcome to <span className="text-black">WearWithPride</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-2xl mb-6">
                Discover the latest trends in fashion and shop your favorite
                styles. Elevate your wardrobe with our exclusive collections,
                curated just for you.
              </p>
              <a
                href="/products"
                className="inline-block mt-2 px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow hover:bg-red-700 transition"
              >
                Shop Now
              </a>
            </div>
          </div>
        </section>

        <div className="mt-16">
          <BrowseCategories />
        </div>

        <div className="mt-16">
          <NewArrivals />
        </div>

        {/* <div className="mt-16">
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8">
                New <span className="text-red-600">Arrivals</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productList && productList.length > 0
                  ? productList.map((productItem) => (
                      <ShoppingProductTile
                        key={productItem._id}
                        handleGetProductDetails={handleGetProductDetails}
                        product={productItem}
                        handleAddtoCart={handleAddtoCart}
                      />
                    ))
                  : null}
              </div>
            </div>
          </section>
        </div> */}
        <WhatsAppFixed />
      </div>
    </>
  );
};

export default HomePage;
