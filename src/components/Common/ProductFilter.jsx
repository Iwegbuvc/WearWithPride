import React, { Fragment } from "react";
import Label from "./Label";
import Badge from "./Badge";

function ProductFilter({ filters, handleFilter, categories }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <h2 className="text-lg font-extrabold mb-4 text-red-600">Categories</h2>
      <div className="grid gap-3">
        {categories && categories.length > 0 && categories.map((cat) => (
          <Fragment key={cat.value}>
            <Label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category && filters.category.includes(cat.value)}
                onChange={() => handleFilter("category", cat.value)}
                className="accent-red-600"
              />
              <span>{cat.label}</span>
              <Badge className="bg-red-100 text-red-600 ml-2">{cat.value}</Badge>
            </Label>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
