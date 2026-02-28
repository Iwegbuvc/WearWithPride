import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import Card from "./Card";
import CardContent from "./CardContent";
import CardFooter from "./CardFooter";
import Button from "./Button";
import Badge from "./Badge";
import Slider from "react-slick";
import { fetchProducts } from "../../api/products";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewArrivals = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProducts({ limit: 12, sort: "createdAt", order: "desc" })
      .then((res) => {
        setProducts(res.data.products || []);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="h-10 w-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="py-12 bg-white overflow-x-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-1 sm:px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center whitespace-nowrap">
          <span className="text-red-600 drop-shadow-lg tracking-tight">
            New
          </span>{" "}
          <span className="text-black drop-shadow-lg tracking-tight">
            Product
          </span>
        </h2>
        <Slider
            dots={false}
            infinite={true}
            speed={8000}
            slidesToShow={4}
            slidesToScroll={1}
            autoplay={true}
            autoplaySpeed={0}
            cssEase="linear"
            pauseOnHover={false}
            responsive={[
              { breakpoint: 1200, settings: { slidesToShow: 3 } },
              { breakpoint: 900, settings: { slidesToShow: 2 } },
              { breakpoint: 600, settings: { slidesToShow: 1 } },
            ]}
        >
          {products.map((item) => (
            <div key={item._id} className="px-1 sm:px-2 w-full">
              <Card className="flex flex-col items-center p-0 w-full">
                <div className="relative w-full">
                  <img
                    src={item.images && item.images.length > 0 ? item.images[0].url : "/images/placeholder.png"}
                    alt={item.title || item.name}
                    className="w-full h-36 xs:h-40 sm:h-48 md:h-56 object-cover rounded-t-lg"
                    style={{ minHeight: 120, maxHeight: 240 }}
                  />
                  {item.totalStock === 0 ? (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs sm:text-sm">
                      Out Of Stock
                    </Badge>
                  ) : item.totalStock < 10 ? (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs sm:text-sm">
                      Only {item.totalStock} items left
                    </Badge>
                  ) : null}
                </div>
                <CardContent className="p-2 sm:p-4 w-full flex flex-col items-center">
                  <h2 className="text-base sm:text-xl md:text-2xl font-bold mb-2 text-center">
                    {item.title || item.name}
                  </h2>
                  <div className="flex flex-col items-center mb-2">
                    <span className="text-xs sm:text-[16px] text-gray-500">
                      {item.category}
                    </span>
                    <span className="text-xs sm:text-[16px] text-gray-500">
                      {item.brand}
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-2 mb-2">
                    <span
                      className={`${item.salePrice > 0 ? "line-through" : ""} text-base sm:text-lg font-semibold text-red-600`}
                    >
                      ₦{item.price}
                    </span>
                    {item.salePrice > 0 && (
                      <span className="text-base sm:text-lg font-semibold text-green-600">
                        ₦{item.salePrice}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="w-full">
                  {item.totalStock === 0 ? (
                    <Button className="opacity-60 cursor-not-allowed w-full text-xs sm:text-base" disabled>
                      Out Of Stock
                    </Button>
                  ) : (
                    <Button
                      className="w-full text-xs sm:text-base"
                      onClick={() => {
                        addToCart({
                          id: item._id,
                          name: item.title || item.name,
                          price:
                            item.salePrice > 0 ? item.salePrice : item.price,
                          image: item.images && item.images.length > 0 ? item.images[0].url : undefined,
                        });
                        toast.success(`${item.title || item.name} added to cart!`);
                      }}
                    >
                      Add to cart
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default NewArrivals;
