import ProductImageUpload from "../components/Admin/image-upload";
import { toast } from "../components/ui/use-toast";
import AdminProductTile from "../components/Admin/AdminProductTile";
import CommonForm from "../components/Common/form";
import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { addProductFormElements } from "../config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "../store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
// Remove Select import, we'll use checkboxes for multi-select
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  images: [],
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [sizesText, setSizesText] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  async function onSubmit(event) {
    event.preventDefault();
    // ...
      setIsUploading(true);

    // Combine sizes from both input methods
    let sizesArr = [];
    if (sizesText) {
      sizesArr = sizesText.split(",").map(s => s.trim()).filter(Boolean);
    }
    if (selectedSizes.length > 0) {
      sizesArr = Array.from(new Set([...sizesArr, ...selectedSizes]));
    }

    // Prepare FormData for backend
    const data = new FormData();
    data.append("name", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("salePrice", formData.salePrice);
    data.append("totalStock", formData.totalStock);
    data.append("averageReview", formData.averageReview);
    sizesArr.forEach(size => data.append("sizes", size));
    imageFiles.forEach(file => data.append("images", file));

    try {
      const API = (await import("../api/api")).default;
      let response;
      if (currentEditedId) {
        // Edit mode: update product
        response = await API.put(`/admin/updateProduct/${currentEditedId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // ...
        if (response?.data) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setImageFiles([]);
          setFormData(initialFormData);
          setSizesText("");
          setSelectedSizes([]);
          setCurrentEditedId(null);
          toast({
            title: "Product updated successfully",
          });
            setIsUploading(false);
        }
      } else {
        // Add mode: create product
        response = await API.post("/admin/createProduct", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // ...
        if (response?.data) {
          dispatch(fetchAllProducts());
          setOpenCreateProductsDialog(false);
          setImageFiles([]);
          setFormData(initialFormData);
          setSizesText("");
          setSelectedSizes([]);
          toast({
            title: "Product add successfully",
          });
            setIsUploading(false);
        }
      }
    } catch (err) {
      // ...
      toast({
        title: "Failed to save product",
        variant: "destructive",
      });
        setIsUploading(false);
    }
  }

  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  }

  function isFormValid() {
    // Only require fields that backend expects and are truly required
    const requiredFields = ["title", "description", "category", "price", "totalStock"];
    const hasAllFields = requiredFields.map((key) => formData[key] !== "").every((item) => item);
    const hasImages = imageFiles.length > 0;
    const valid = hasAllFields && hasImages;
    // ...
    return valid;
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                key={productItem._id || productItem.id}
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                setImageFiles={setImageFiles}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto p-8 w-[550px] max-w-full flex flex-col items-stretch"
          open={openCreateProductsDialog}
        >
          {/* Mobile Close Button */}
          <button
            className="absolute top-3 right-3 z-20 block md:hidden text-2xl font-extrabold text-gray-700 hover:text-red-600 focus:outline-none"
            aria-label="Close"
            onClick={() => {
              setOpenCreateProductsDialog(false);
              setCurrentEditedId(null);
              setFormData(initialFormData);
            }}
          >
            &times;
          </button>
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={isUploading ? "Uploading..." : (currentEditedId !== null ? "Edit" : "Add")}
                formControls={addProductFormElements}
                isBtnDisabled={!isFormValid() || isUploading}
                debugBtnClick={(e) => {
                  // console.log("Button clicked, disabled:", !isFormValid());
                }}
              />
            {/* Sizes Section */}
            <div className="mt-4">
              <Label htmlFor="sizes-text">Sizes (comma-separated or select below)</Label>
              <Input
                id="sizes-text"
                placeholder="e.g. S,M,L,XL,XXL or 38,40,42"
                value={sizesText}
                onChange={e => setSizesText(e.target.value)}
                className="mb-2"
              />
              <Label>Quick Select Sizes</Label>
              <div className="flex flex-wrap gap-3 mb-2">
                {['S','M','L','XL','XXL','38','40','42','44','46'].map(size => (
                  <label key={size} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      value={size}
                      checked={selectedSizes.includes(size)}
                      onChange={e => {
                        if (e.target.checked) {
                          setSelectedSizes(prev => [...prev, size]);
                        } else {
                          setSelectedSizes(prev => prev.filter(s => s !== size));
                        }
                      }}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
