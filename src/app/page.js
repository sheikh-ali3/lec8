"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getData() {
      let response = await fetch("https://dummyjson.com/recipes");
      let res = await response.json();
      // console.log(res.recipes);
      setRecipes(res.recipes);
    }

    getData();
  }, []);

  console.log(recipes);
  return (
    <div className="grid grid-cols-3">
      {recipes.map((i) => {
        return (
          <div key={i.id}>
            <Image src={i.image} height={150} width={150} />

            <Link href={"/recipe/" + i.id}>{i.name}</Link>
          </div>
        );
      })}
    </div>
  );
}

export default HomePage;