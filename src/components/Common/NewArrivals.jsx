import React from "react";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import Card from "./Card";
import CardContent from "./CardContent";
import CardFooter from "./CardFooter";
import Button from "./Button";
import Badge from "./Badge";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const newArrivals = [
  {
    label: "Demo Product 1",
    image: "/images/mens-collection.webp",
    category: "T-shirts",
    brand: "Brand A",
    price: 29.99,
    salePrice: 19.99,
    totalStock: 5,
  },
  {
    label: "Demo Product 2",
    image: "/images/Shoes.jpeg",
    category: "Shoes",
    brand: "Brand B",
    price: 49.99,
    salePrice: 0,
    totalStock: 0,
  },
  {
    label: "Demo Product 3",
    image: "/images/featured.webp",
    category: "Jeans",
    brand: "Brand C",
    price: 39.99,
    salePrice: 29.99,
    totalStock: 3,
  },
  {
    label: "Demo Product 4",
    image: "/images/Jeans.jpeg",
    category: "Jeans",
    brand: "Brand D",
    price: 59.99,
    salePrice: 0,
    totalStock: 12,
  },
  {
    label: "Demo Product 5",
    image: "/images/accessories2.jpeg",
    category: "Accessories",
    brand: "Brand E",
    price: 19.99,
    salePrice: 14.99,
    totalStock: 2,
  },
  {
    label: "Demo Product 6",
    image: "/images/accessories3.jpeg",
    category: "Accessories",
    brand: "Brand F",
    price: 24.99,
    salePrice: 0,
    totalStock: 0,
  },
];

const NewArrivals = () => {
  const { addToCart } = useCart();
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-center whitespace-nowrap">
          <span className="text-red-600 drop-shadow-lg tracking-tight">
            New{" "}
          </span>
          <span className="text-black drop-shadow-lg tracking-tight">
            Products
          </span>
        </h2>
        <Slider
          dots={false}
          infinite={true}
          speed={3000}
          slidesToShow={4}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={0}
          cssEase="linear"
          pauseOnHover={false}
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
          ]}
        >
          {newArrivals.map((item, idx) => (
            <div key={item.label} className="px-2">
              <Card className="flex flex-col items-center p-0">
                <div className="relative w-full">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  {item.totalStock === 0 ? (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      Out Of Stock
                    </Badge>
                  ) : item.totalStock < 10 ? (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      Only {item.totalStock} items left
                    </Badge>
                  ) : null}
                </div>
                <CardContent className="p-4 w-full flex flex-col items-center">
                  <h2 className="text-xl font-bold mb-2 text-center">
                    {item.label}
                  </h2>
                  <div className="flex flex-col items-center mb-2">
                    <span className="text-[16px] text-gray-500">
                      {item.category}
                    </span>
                    <span className="text-[16px] text-gray-500">
                      {item.brand}
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-2 mb-2">
                    <span
                      className={`${item.salePrice > 0 ? "line-through" : ""} text-lg font-semibold text-red-600`}
                    >
                      ₦{item.price}
                    </span>
                    {item.salePrice > 0 && (
                      <span className="text-lg font-semibold text-green-600">
                        ₦{item.salePrice}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="w-full">
                  {item.totalStock === 0 ? (
                    <Button className="opacity-60 cursor-not-allowed" disabled>
                      Out Of Stock
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        addToCart({
                          id: item.label,
                          name: item.label,
                          price: item.salePrice > 0 ? item.salePrice : item.price,
                          image: item.image,
                        });
                        toast.success(`${item.label} added to cart!`);
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
