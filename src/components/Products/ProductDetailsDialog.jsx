import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../Common/Avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  getPublicImagePath,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Separator } from "../Common/Separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { setProductDetails } from "../../store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../Common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "../../store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  // Always render DialogTitle/DialogDescription for accessibility
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  // Mock user and cart
  const user = { id: "mockUser", userName: "Mock User" };
  const [cartItems, setCartItems] = useState([]);
  const [reviews, setReviews] = useState([
    {
      _id: "1",
      userName: "Alice",
      reviewValue: 5,
      reviewMessage: "Great product!",
    },
    { _id: "2", userName: "Bob", reviewValue: 4, reviewMessage: "Good value." },
  ]);
  // Use the cart context for add to cart
  const { addToCart } = useCart();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  // Size selection state
  const [selectedSize, setSelectedSize] = useState("");

  // Extract available sizes from productDetails (assume array: productDetails.sizes)
  const availableSizes = Array.isArray(productDetails?.sizes) ? productDetails.sizes : [];

  function handleAddToCart() {
    if (!productDetails) return;
    if (availableSizes.length > 0 && !selectedSize) {
      toast.error("Please select a size.");
      return;
    }
    // Use the currently selected main image as selectedImage
    const images = productDetails.images || [];
    const selectedImageUrl = images[mainImageIdx]?.url || productDetails.image;
    addToCart({
      id: productDetails._id,
      name: productDetails.title,
      price:
        productDetails.salePrice > 0
          ? productDetails.salePrice
          : productDetails.price,
      image: productDetails.image,
      selectedImage: selectedImageUrl,
      size: selectedSize,
    });
    toast.success(`${productDetails.title} added to cart!`);
  }

  function handleDialogClose() {
    setOpen(false);
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    setReviews([
      ...reviews,
      {
        _id: (reviews.length + 1).toString(),
        userName: user.userName,
        reviewValue: rating,
        reviewMessage: reviewMsg,
      },
    ]);
    setRating(0);
    setReviewMsg("");
    toast({ title: "Review added successfully!" });
  }

  // Defensive reviews array
  const safeReviews =
    (productDetails && Array.isArray(productDetails.reviews) && productDetails.reviews) ||
    (Array.isArray(reviews) && reviews) ||
    [];
  const averageReview =
    safeReviews.length > 0
      ? safeReviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / safeReviews.length
      : 0;

  // Fallback image logic
  const fallbackImage = "placeholder.png"; // Place a placeholder.png in public/images
  const images =
    productDetails && Array.isArray(productDetails.images) && productDetails.images.length > 0
      ? productDetails.images
      : [{ url: getPublicImagePath(fallbackImage) }];
  const [mainImageIdx, setMainImageIdx] = useState(0);
  // Reset main image when product changes
  useEffect(() => {
    setMainImageIdx(0);
  }, [productDetails]);
  const imageSrc = images[mainImageIdx]?.url || getPublicImagePath(fallbackImage);

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className={productDetails ? "max-w-xl w-full rounded-2xl shadow-2xl p-0 overflow-hidden bg-white" : undefined}>
        <DialogTitle>
          {productDetails?.title || productDetails?.name || "Product Details"}
        </DialogTitle>
        <DialogDescription>
          {productDetails?.description?.slice(0, 80) || "Product information and reviews."}
        </DialogDescription>
        {productDetails ? (
          <>
            {/* Product Image and Thumbnails */}
            <div className="flex flex-col items-center justify-center pt-8 pb-4 px-6">
              <div className="flex flex-row gap-4 items-start">
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex flex-col gap-2 mr-2 max-h-[320px] overflow-y-auto">
                    {images.map((img, idx) => (
                      <img
                        key={img.url + idx}
                        src={img.url}
                        alt={`Thumbnail ${idx + 1}`}
                        className={`w-14 h-14 object-cover rounded-lg border-2 cursor-pointer ${mainImageIdx === idx ? 'border-red-500' : 'border-gray-200'}`}
                        style={{ background: '#f3f3f3' }}
                        onClick={() => setMainImageIdx(idx)}
                        onError={e => { e.target.onerror = null; e.target.src = getPublicImagePath(fallbackImage); }}
                      />
                    ))}
                  </div>
                )}
                {/* Main Image */}
                <div
                  className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 flex items-center justify-center mb-4"
                  style={{ width: "320px", height: "320px" }}
                >
                  {imageSrc && (
                    <img
                      src={imageSrc}
                      alt={productDetails?.title || productDetails?.name || "Product Image"}
                      className="object-cover w-[320px] h-[320px] rounded-xl border-2 border-gray-300 bg-gray-100"
                      style={{ maxWidth: "100%", maxHeight: "100%" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getPublicImagePath(fallbackImage);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Product Details Below Image, not scrollable */}
            <div className="flex flex-col gap-4 px-2 sm:px-4 md:px-8 pb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-1 text-gray-900 text-center">
                {productDetails?.title}
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-2 text-center">
                {productDetails?.description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mb-2">
                <span className="inline-block px-2 py-1 text-xs bg-gray-200 rounded-full font-medium text-gray-700">
                  {productDetails?.category}
                </span>
                {productDetails?.totalStock !== undefined && (
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 rounded-full font-medium text-blue-700">
                    Stock: {productDetails?.totalStock}
                  </span>
                )}
              </div>
              <div className="flex flex-col xs:flex-row items-center justify-center gap-1 sm:gap-3 mb-2 text-center">
                <span
                  className={`text-xl font-semibold ${productDetails?.salePrice > 0 ? "line-through text-gray-400" : "text-primary"}`}
                >
                  ₦{productDetails?.price}
                </span>
                {productDetails?.salePrice > 0 && (
                  <span className="text-2xl font-bold text-primary">
                    ₦{productDetails?.salePrice}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 mb-2">
                <div className="flex gap-1 px-2 sm:px-3 py-2 rounded-lg">
                  <StarRatingComponent
                    rating={averageReview}
                    size={18}
                    starClassName="text-red-500"
                  />
                </div>
                <span className="text-xs text-gray-500">
                  ({averageReview.toFixed(2)})
                </span>
              </div>
              {/* Size selection UI */}
              {availableSizes.length > 0 && (
                <div className="mb-2 flex flex-wrap gap-2 justify-center">
                  <span className="font-medium text-sm">Select Size:</span>
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`px-3 py-1 rounded border text-sm font-semibold ${selectedSize === size ? "bg-red-600 text-white border-red-600" : "bg-white text-gray-800 border-gray-300"}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg text-lg shadow"
                onClick={handleAddToCart}
                disabled={productDetails?.totalStock === 0}
              >
                {productDetails?.totalStock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Separator className="my-2" />
              {/* Reviews Section */}
              <div className="max-h-[220px] overflow-y-auto pr-1 sm:pr-2">
                <h3 className="text-base font-semibold mb-2">Reviews</h3>
                <div className="space-y-2">
                  {safeReviews && safeReviews.length > 0 ? (
                    safeReviews.map((reviewItem, idx) => (
                      <div className="flex flex-col xs:flex-row gap-2 items-start" key={reviewItem._id || idx}>
                        <Avatar className="w-7 h-7 border">
                          <AvatarFallback>
                            {reviewItem?.userName && reviewItem.userName[0] ? reviewItem.userName[0].toUpperCase() : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-0.5">
                          <div className="flex flex-wrap items-center gap-1 px-2 sm:px-3 py-2 rounded-lg">
                            <span className="font-medium text-xs text-gray-800">
                              {reviewItem?.userName}
                            </span>
                            <StarRatingComponent
                              key={(reviewItem._id || idx) + "-stars"}
                              rating={reviewItem?.reviewValue}
                              size={14}
                              starClassName="text-red-500"
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            {reviewItem.reviewMessage}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">No Reviews</span>
                  )}
                </div>
                {/* Add Review Form */}
                <div className="mt-4 flex flex-col gap-1">
                  <Label className="text-xs font-medium">Write a review</Label>
                  <div className="flex flex-wrap gap-1 px-2 sm:px-3 py-2 rounded-lg">
                    <StarRatingComponent
                      rating={rating}
                      handleRatingChange={handleRatingChange}
                      size={16}
                      starClassName="text-red-500"
                    />
                  </div>
                  <Input
                    name="reviewMsg"
                    value={reviewMsg}
                    onChange={(event) => setReviewMsg(event.target.value)}
                    placeholder="Write a review..."
                    className="text-xs"
                  />
                  <Button
                    onClick={handleAddReview}
                    disabled={reviewMsg.trim() === ""}
                    size="sm"
                    className="mt-1 bg-gray-800 hover:bg-gray-900 text-white"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ padding: 32, textAlign: "center" }}>Loading...</div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
