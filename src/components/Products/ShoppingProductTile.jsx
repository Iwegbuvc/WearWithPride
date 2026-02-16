import { toast } from "react-toastify";
import Card from "../Common/Card";
import CardContent from "../Common/CardContent";
import CardFooter from "../Common/CardFooter";
import Button from "../Common/Button";
import Badge from "../Common/Badge";
import { useCart } from "../../context/CartContext";
import { getPublicImagePath } from "../ui/dialog";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
}) {
  const { addToCart } = useCart();
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={getPublicImagePath(product?.image)}
            alt={product?.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out Of Stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl md:text-2xl font-bold mb-2">{product?.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[16px] text-gray-500">
              {product?.category}
            </span>
            <span className="text-lg font-bold text-red-600">
              ₦{product?.salePrice > 0 ? product?.salePrice : product?.price}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <Button
            onClick={() => {
              addToCart({
                id: product._id,
                name: product.title,
                price: product.salePrice > 0 ? product.salePrice : product.price,
                image: product.image,
              });
              toast.success(`${product.title} added to cart!`);
            }}
            disabled={product?.totalStock === 0}
          >
            Add to Cart
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;

