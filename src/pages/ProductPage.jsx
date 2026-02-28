import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { fetchProducts } from "../api/products";
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
    setLoading(true);
    const fetchData = async () => {
      try {
        // Build params for API
        const apiParams = {};
        let mappedCategory = category;
        if (category === "trousers-shorts") mappedCategory = "trousers/shorts";
        if (mappedCategory) apiParams.category = mappedCategory;
        if (searchQuery) apiParams.search = searchQuery;
        // You can add pagination, sizes, price, etc. here if needed
        const res = await fetchProducts(apiParams);
        setProducts(res.data.products || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params, category, searchQuery]);

  // No need to filter here, backend handles filtering
  const filteredProducts = products;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1600px] mx-auto" id="ProductPage-animate">
        {filteredProducts.map((p) => (
          <ShoppingProductTile
            key={p._id}
            product={{
              ...p,
              title: p.name || p.title,
              image: p.images && p.images.length > 0 ? p.images[0].url : undefined,
            }}
            handleGetProductDetails={() => {
              setSelectedProduct({
                ...p,
                title: p.name || p.title,
                image: p.images && p.images.length > 0 ? p.images[0].url : undefined,
              });
              setOpenDialog(true);
            }}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDialog}
        setOpen={setOpenDialog}
        productDetails={selectedProduct}
      />
      {!openDialog && <ScrollToTopButton />}
    </div>
  );
};

export default ProductsPage;
