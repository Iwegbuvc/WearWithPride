import React from "react";
import AdminProductTile from "./AdminProductTile";

const demoProducts = [
  {
    _id: "1",
    image: "/images/product_1.png",
    title: "Demo Product 1",
    price: 29000,
    salePrice: 19000,
  },
  {
    _id: "2",
    image: "/images/product_2.png",
    title: "Demo Product 2",
    price: 49999,
    salePrice: 0,
  },
  {
    _id: "3",
    image: "/images/product_3.png",
    title: "Demo Product 3",
    price: 15000,
    salePrice: 12000,
  },
  {
    _id: "4",
    image: "/images/product_4.png",
    title: "Demo Product 4",
    price: 35000,
    salePrice: 0,
  },
  {
    _id: "5",
    image: "/images/product_5.png",
    title: "Demo Product 5",
    price: 22000,
    salePrice: 18000,
  },
];

function AdminProductsPage() {
  // Dummy handlers for demo
  const setFormData = () => {};
  const setOpenCreateProductsDialog = () => {};
  const setCurrentEditedId = () => {};
  const handleDelete = () => {};

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {demoProducts.map((product) => (
          <AdminProductTile
            key={product._id}
            product={product}
            setFormData={setFormData}
            setOpenCreateProductsDialog={setOpenCreateProductsDialog}
            setCurrentEditedId={setCurrentEditedId}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default AdminProductsPage;
