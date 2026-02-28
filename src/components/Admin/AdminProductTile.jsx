import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";


function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  setImageFiles,
  handleDelete,
}) {
  // Use first image from images array if available
  const imageUrl = product?.images?.[0]?.url;
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product?.title}
              className="w-full h-[300px] object-cover rounded-t-lg"
            />
          ) : null}
        </div>
        <CardContent>
          <h2 className="text-xl md:text-2xl font-bold mb-2 mt-2">{product?.name}</h2>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`$
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₦{product?.price.toLocaleString()}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-bold">₦{product?.salePrice.toLocaleString()}</span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            onClick={() => {
              // ...
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData({
                title: product.name || product.title || "",
                description: product.description || "",
                category: product.category || "",
                price: product.price || "",
                salePrice: product.salePrice || "",
                totalStock: product.totalStock || "",
                averageReview: product.averageReview || 0,
                images: product.images || [],
              });
              setImageFiles(product.images || []);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
