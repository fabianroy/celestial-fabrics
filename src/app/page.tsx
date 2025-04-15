"use client";
import ProductCard from "@/components/productCard";
import { useEffect, useState } from "react";

export interface Product {
  id: number;
  product_name: string;
  price: number;
  type: string;
  collection: string;
  image: string;
  description: string;
  size: string[];
  color: string[];
  stock: string;
  gender: string;
  
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("https://celestial-server.vercel.app/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
        setFilteredProducts([]);
      });
  }, []);

  useEffect(() => {
    let updated = [...products];

    // Search
    if (searchTerm) {
      updated = updated.filter(
        (product) =>
          product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.collection.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by Type
    if (typeFilter) {
      updated = updated.filter((product) => product.type === typeFilter);
    }

    // Sort
    if (sortOrder === "asc") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
  }, [searchTerm, typeFilter, sortOrder, products]);

  return (
    <>
      <header className="w-full text-center my-10">
        <h2 className="text-2xl md:text-3xl font-semibold">Celestial Fabrics</h2>
        <p className="mt-2 md:mt-4 md:text-lg">Elevating Comfort, Redefining Luxury.</p>

        <nav>
          <div className="mt-4 w-full max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name or collection"
              className="p-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Filter by Type */}
            <select
              className="p-2 border rounded-md"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All Products</option>
              <option value="printed-tshirt">Printed Tees</option>
              <option value="solid-tshirt">Solid Tees</option>
              <option value="shirt">Polo T-Shirts</option>
              <option value="hoodie">Hoodies</option>
            </select>

            {/* Sort */}
            <select
              className="p-2 border rounded-md"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by Price (Default)</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
            {filteredProducts.length < products.length && <p>{filteredProducts.length} Products Found.</p>}
          </div>
          
        </nav>
      </header>

      <main>
        <section className="w-full md:w-[90%] mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </section>
      </main>

      <footer className="w-full text-center my-10 border-t border-neutral-200 pt-8">
        <p className="text-md text-gray-500">© 2025 Celestial Fabrics. All rights reserved.</p>
        <p className="text-sm text-gray-500 mt-2">Developed by Celestial Development Unit</p>
      <div className="w-full text-center my-6">
        <p className="text-sm text-gray-500">Follow us on <a href="https://www.facebook.com/celestialfabrics" target="_blank" className="text-blue-800" rel="noopener noreferrer">Facebook</a> and <a href="https://www.instagram.com/celestial.fabrics" className="text-blue-800" target="_blank" rel="noopener noreferrer">Instagram</a>.</p>
        <p className="text-sm text-gray-500 mt-2">For any queries, contact us at celestialfabrics.bd@gmail.com.</p>
      </div>
      </footer>
    </>
  );
}
