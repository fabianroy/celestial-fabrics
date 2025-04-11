'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Star, Menu, X } from 'lucide-react';

const FilterSidebar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Extract search params
  const query = new URLSearchParams(searchParams?.toString());
  const searchTerm = query.get('searchTerm') || '';
  const category = query.get('category') || '';
  const brand = query.get('brand') || '';
  const minPrice = query.get('minPrice') || '';
  const maxPrice = query.get('maxPrice') || '';
  const sortBy = query.get('sortBy') || '';
  const sortOrder = query.get('sortOrder') || 'asc';
  const minRating = query.get('minRating') || '';

  const updateSearchParam = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());

    if (value && value !== 'null') {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    updateSearchParam(e.target.name, e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchParam('searchTerm', e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value === '' || !isNaN(Number(value))) {
      updateSearchParam(name, value);
    }
  };

  const resetFilters = () => {
    router.push(pathname); // Resets by removing all query params
  };

  return (
    <div className="relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="lg:hidden text-gray-700 absolute top-0 right-0 z-30"
      >
        {isDrawerOpen ? (
          <X size={24} />
        ) : (
          <div className="flex items-center gap-2">
            <Menu size={24} />
            <span>Filter Products</span>
          </div>
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-white p-6 shadow-md transition-transform z-20
          fixed inset-0 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:transform-none lg:inset-auto lg:block lg:w-64`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsDrawerOpen(false)}
          className="lg:hidden p-3 text-gray-700 absolute top-4 right-4 z-30"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Filters{' '}
          <span
            className="text-sm cursor-pointer underline"
            onClick={resetFilters}
          >
            Clear Filters X
          </span>
        </h2>

        {/* Search */}
        <div className="mb-6">
          <label
            htmlFor="searchTerm"
            className="block text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <input
            type="text"
            id="searchTerm"
            name="searchTerm"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mt-1 p-2 border bg-primary-foreground w-full"
            placeholder="Search products"
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleFilterChange}
            className="mt-1 p-2 border bg-primary-foreground w-full"
          >
            <option value="">All</option>
            {/* Replace with dynamic categories */}
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>

        {/* Brand */}
        <div className="mb-6">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Brand
          </label>
          <select
            id="brand"
            name="brand"
            value={brand}
            onChange={handleFilterChange}
            className="mt-1 p-2 border bg-primary-foreground w-full"
          >
            <option value="">All</option>
            {/* Replace with dynamic brands */}
            <option value="apple">Apple</option>
            <option value="samsung">Samsung</option>
          </select>
        </div>

        {/* Price */}
        <div className="mb-6">
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={minPrice}
            onChange={handlePriceChange}
            className="mt-1 p-2 border bg-primary-foreground w-full"
            placeholder="Min"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={maxPrice}
            onChange={handlePriceChange}
            className="mt-1 p-2 border bg-primary-foreground w-full"
            placeholder="Max"
          />
        </div>

        {/* Rating */}
        <div className="flex items-center mb-6">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            const parsedMinRating = minRating ? Number(minRating) : 0;

            return (
              <button
                key={ratingValue}
                type="button"
                className={`p-1 ${
                  ratingValue <= parsedMinRating
                    ? 'text-yellow-500'
                    : 'text-gray-400'
                }`}
                onClick={() =>
                  updateSearchParam('minRating', ratingValue.toString())
                }
              >
                <Star size={20} />
              </button>
            );
          })}
        </div>

        {/* Sorting */}
        <div className="mb-6">
          <label
            htmlFor="sortBy"
            className="block text-sm font-medium text-gray-700"
          >
            Sort By
          </label>
          <select
            id="sortBy"
            name="sortBy"
            value={sortBy}
            onChange={handleFilterChange}
            className="mt-1 p-2 border bg-primary-foreground w-full"
          >
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="mb-6">
          <label
            htmlFor="sortOrder"
            className="block text-sm font-medium text-gray-700"
          >
            Sort Order
          </label>
          <select
            id="sortOrder"
            name="sortOrder"
            value={sortOrder}
            onChange={handleFilterChange}
            className="mt-1 p-2 border bg-primary-foreground w-full"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
