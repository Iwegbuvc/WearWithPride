import React from "react";
import { useNavigate } from "react-router-dom";
import { categoriesWithIcon } from "./categoriesData";
import Card from "./Card";
import CardContent from "./CardContent";

const BrowseCategories = () => {
  const navigate = useNavigate();
  const handleNavigateToListingPage = (categoryItem) => {
    navigate(`/category/${categoryItem.value}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-8 text-center">
          <span className="text-red-600 drop-shadow-lg tracking-tight">
            Shop by{" "}
          </span>
          <span className="text-black drop-shadow-lg tracking-tight">
            category
          </span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoriesWithIcon.map((categoryItem) => (
            <Card
              key={categoryItem.value}
              onClick={() => handleNavigateToListingPage(categoryItem)}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                <span className="font-bold">{categoryItem.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;
