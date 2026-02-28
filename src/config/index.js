export const addProductFormElements = [
  {
    label: "Product Name",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "e.g. Classic White T-Shirt",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Describe the product, material, fit, etc.",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "combo", label: "Combo" },
      { id: "trousers/shorts", label: "Shorts/Trousers" },
      { id: "shirts", label: "Shirts" },
      { id: "accessories", label: "Accessories" },
      { id: "shoes", label: "Shoes" },
    ],
  },
  {
    label: "Price (₦)",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price (₦)",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "How many in stock?",
  },
];
