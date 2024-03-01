import React from "react";
import ServiceSelect from "./ServiceSelect";
import { PriceSliderSelect } from "./PriceSlider";

const ServiceSearchBar = ({
  searchText,
  setSearchText,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedSort,
  setSelectedSort,
  handleSearch,
}) => {
  return (
    <div className="w-full h-[84px] border-gray-300 border-2 flex flex-row justify-center">
      {/* Search input */}
      <div>
        <label htmlFor="search text">
          <input
            type="text"
            id="search text"
            placeholder="ค้นหาหมวดหมู่..."
            className="w-[350px] h-11 px-4 py-2.5 rounded-lg border border-gray-300 text-black m-4 mr-20"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </label>
      </div>
      {/* Category, Price Range, Sort */}
      <div className="flex items-center space-x-4 mt-2 gap-3">
        <ServiceSelect
          name="หมวดหมู่บริการ"
          firstSelect="บริการทั้งหมด"
          secondSelect="บริการทั่วไป"
          thirdSelect="บริการห้องครัว"
          fourthSelect="บริการห้องน้ำ"
          label="Category"
          width="150px"
          value={selectedCategory}
          onSelectOption={(value) => {
            setSelectedCategory(value === "บริการทั้งหมด" ? "" : value);
          }}
        />
        <hr className="w-px h-11 bg-gray-300" />
        <PriceSliderSelect
          priceRange={priceRange || [0, 0]}
          onPriceChange={setPriceRange || (() => {})}
        />
        <hr className="w-px h-11 bg-gray-300" />
        <ServiceSelect
          name="เรียงตาม"
          firstSelect="บริการแนะนำ"
          secondSelect="บริการยอดนิยม"
          thirdSelect="ตามตัวอักษร (Ascending)"
          fourthSelect="ตามตัวอักษร (Descending)"
          label="Sorted"
          width="215px"
          value={selectedSort}
          onSelectOption={setSelectedSort}
        />
      </div>
      {/* Search button */}
      <div className="m-4">
        <button
          className="bg-blue-600 w-[86px] h-[44px] rounded-lg text-white"
          onClick={handleSearch}
        >
          ค้นหา
        </button>
      </div>
    </div>
  );
};

export default ServiceSearchBar;
