"use client";
import { useEffect, useState } from "react";
import ProductCard from "./Components/ProductCard";

export default function Home() {

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('data.json')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <>
      <header className="w-full text-center my-10">
        <h2 className="text-2xl md:text-3xl font-semibold">Celestial Fabrics</h2>
        <p className="mt-2 md:mt-4 md:text-lg">Elevating Comfort, Redefining Luxury.</p>
      </header>
      <main>
        <section className="w-full md:w-[90%] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 justify-between items-center">
            {
              products.map((product, index) => <ProductCard key={index} product={product} />)
            }
          </div>
        </section>
      </main>
    </>
  );
}