import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../Common/Avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, getPublicImagePath, DialogTitle, DialogDescription } from "../ui/dialog";
import { Separator } from "../Common/Separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "../../store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../Common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "../../store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  // Mock user and cart
  const user = { id: "mockUser", userName: "Mock User" };
  const [cartItems, setCartItems] = useState([]);
  const [reviews, setReviews] = useState([
    { _id: "1", userName: "Alice", reviewValue: 5, reviewMessage: "Great product!" },
    { _id: "2", userName: "Bob", reviewValue: 4, reviewMessage: "Good value." },
  ]);
  const toast = ({ title }) => window.alert(title);

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    // Simple mock logic
    const alreadyInCart = cartItems.find(item => item.productId === getCurrentProductId);
    if (alreadyInCart) {
      toast({ title: `Already in cart` });
      return;
    }
    setCartItems([...cartItems, { productId: getCurrentProductId, quantity: 1 }]);
    toast({ title: "Product is added to cart" });
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

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="flex flex-col md:flex-row gap-8 sm:p-8 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[60vw]">
        <DialogTitle>{productDetails?.title}</DialogTitle>
        <DialogDescription>{productDetails?.description}</DialogDescription>
        {/* Product Image Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="relative overflow-hidden rounded-lg w-full max-w-xs">
            <img
              src={getPublicImagePath(productDetails?.image)}
              alt={productDetails?.title}
              width={400}
              height={400}
              className="aspect-square w-full object-cover border"
            />
          </div>
        </div>
        {/* Product Details Section */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Title & Description (now handled by DialogTitle/Description) */}
          {/* Price & Sale */}
          <div className="flex items-center gap-4 mb-2">
            <span className={`text-xl font-semibold ${productDetails?.salePrice > 0 ? 'line-through text-muted-foreground' : 'text-primary'}`}>${productDetails?.price}</span>
            {productDetails?.salePrice > 0 && (
              <span className="text-xl font-bold text-primary">${productDetails?.salePrice}</span>
            )}
          </div>
          {/* Star Rating */}
          <div className="flex items-center gap-2 mb-2">
            <StarRatingComponent rating={averageReview} />
            <span className="text-sm text-muted-foreground">({averageReview.toFixed(2)})</span>
          </div>
          {/* Add to Cart Button */}
          <div className="mb-4">
            {productDetails?.totalStock === 0 ? (
              <Button className="w-full opacity-60 cursor-not-allowed">Out of Stock</Button>
            ) : (
              <Button className="w-full" onClick={() => handleAddToCart(productDetails?._id, productDetails?.totalStock)}>Add to Cart</Button>
            )}
          </div>
          <Separator />
          {/* Reviews Section */}
          <div className="max-h-[250px] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-3">Reviews</h2>
            <div className="grid gap-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-3 items-start" key={reviewItem._id}>
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback>{reviewItem?.userName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm">{reviewItem?.userName}</h3>
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-xs text-muted-foreground">{reviewItem.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className="text-sm text-muted-foreground">No Reviews</h1>
              )}
            </div>
            {/* Add Review Form */}
            <div className="mt-6 flex flex-col gap-2">
              <Label className="text-sm">Write a review</Label>
              <div className="flex gap-1">
                <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
                className="text-sm"
              />
              <Button onClick={handleAddReview} disabled={reviewMsg.trim() === ""} size="sm">Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
