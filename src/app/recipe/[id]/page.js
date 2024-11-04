"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function RecipeDetailPage() {
  const router = useRouter();
  const { query } = router; 
  const id = query?.id; 

  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id) {
        console.log("ID is not available yet."); 
        setIsLoading(false);
        return; 
      }

      setIsLoading(true); 
      console.log(`Fetching recipe details for ID: ${id}`); 

      try {
        const response = await fetch(`https://dummyjson.com/recipes/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched recipe data:", data); 
        if (!data || !data.id) {
          throw new Error("Recipe not found");
        }
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Failed to fetch recipe details.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchRecipeDetails();
  }, [id]); 

  console.log("Current ID:", id); 

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!recipe) {
    return <div className="text-center">No recipe found.</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link href="/" className="inline-block mb-4 text-green-500">
        Go Back
      </Link>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">{recipe.name}</h1>
        <Image
          src={recipe.image}
          alt={recipe.name}
          width={400}
          height={400}
          className="object-cover rounded-lg mx-auto"
        />
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2 className="text-xl font-bold mt-6 mb-2">Instructions</h2>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetailPage;