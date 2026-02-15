import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import API from "../api/api";
import ScrollToTopButton from "../components/Common/ScrollToTopButton";
import ShoppingProductTile from "../components/Products/ShoppingProductTile";
import ProductDetailsDialog from "../components/Products/ProductDetailsDialog";
import { getPublicImagePath } from "../components/ui/dialog";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const { category } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Get search query param
  const searchQuery = params.get("q")?.toLowerCase() || "";

  useEffect(() => {
    // Categories: Combo, Shorts/Trousers, T-shirts, Accessories, Shoes
    setProducts([
      // Combo
      { _id: "1", name: "Couple Combo Set", price: 25000, category: "Combo", image: "Accessories 1.jpeg", totalStock: 10 },
      { _id: "2", name: "Family Combo", price: 40000, category: "Combo", image: "accessories2.jpeg", totalStock: 5 },
      // Shorts/Trousers
      { _id: "3", name: "Denim Shorts", price: 8000, category: "Shorts/Trousers", image: "product_1.png", totalStock: 12 },
      { _id: "4", name: "Slim Trousers", price: 12000, category: "Shorts/Trousers", image: "product_2.png", totalStock: 8 },
      // T-shirts
      { _id: "5", name: "Classic T-shirt", price: 6000, category: "T-shirts", image: "product_3.png", totalStock: 15 },
      { _id: "6", name: "Graphic Tee", price: 7000, category: "T-shirts", image: "product_4.png", totalStock: 20 },
      // Accessories
      { _id: "7", name: "Classic Watch", price: 15000, category: "Accessories", image: "product_5.png", totalStock: 7 },
      { _id: "8", name: "Elegant Bracelet", price: 8000, category: "Accessories", image: "product_6.png", totalStock: 18 },
      { _id: "9", name: "Wristband", price: 1500, category: "Accessories", image: "product_17.png", totalStock: 40 },
      { _id: "10", name: "Bow Tie", price: 3500, category: "Accessories", image: "product_19.png", totalStock: 16 },
      { _id: "11", name: "Leather Wallet", price: 11000, category: "Accessories", image: "product_20.png", totalStock: 8 },
      { _id: "12", name: "Classic Tie", price: 4000, category: "Accessories", image: "product_21.png", totalStock: 22 },
      // Shoes
      { _id: "13", name: "Sneakers", price: 25000, category: "Shoes", image: "product_7.png", totalStock: 18 },
      { _id: "14", name: "Formal Shoes", price: 27000, category: "Shoes", image: "product_14.png", totalStock: 10 },
    ]);
    setLoading(false);
  }, [params]);

  // Get category from route param if present
  const categoryParam = category?.toLowerCase();
  // Filter products by search query or category if present
  let filteredProducts = products;
  if (categoryParam) {
    filteredProducts = filteredProducts.filter((p) =>
      p.category.toLowerCase().replace(/\s|\//g, "-") === categoryParam
    );
  } else if (searchQuery) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(searchQuery)
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 max-w-[1600px] mx-auto">
        {filteredProducts.map((p, idx) => {
          // List of real images from public/images
          const realImages = [
            "Accessories 1.jpeg", "accessories2.jpeg", "p1_product_i1.png", "product_1.png", "product_2.png", "product_3.png", "product_4.png", "product_5.png", "product_6.png", "product_7.png", "product_8.png", "product_9.png", "product_10.png", "product_11.png", "product_12.png", "product_13.png", "product_14.png", "product_15.png", "product_16.png", "product_17.png", "product_18.png", "product_19.png", "product_20.png", "product_21.png", "product_22.png", "product_23.png"
          ];
          // Cycle through real images if there are more products than images
          const realImage = realImages[idx % realImages.length];
          return (
            <ShoppingProductTile
              key={p._id}
              product={{
                ...p,
                image: realImage,
                title: p.name,
              }}
              handleGetProductDetails={() => {
                setSelectedProduct({
                  ...p,
                  image: realImage,
                  title: p.name,
                });
                setOpenDialog(true);
              }}
            />
          );
        })}
      </div>
      <ProductDetailsDialog
        open={openDialog}
        setOpen={setOpenDialog}
        productDetails={selectedProduct}
      />
      <ScrollToTopButton />
    </div>
  );
};

export default ProductsPage;
