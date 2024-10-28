"use client";

import React, { useEffect, useState }  from 'react';

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
  
    const getData = async () => {
      let response = await fetch("https://dummyjson.com/recipes");
      let res = await response.json();
      console.log(res.recipes);
      setRecipes(res.recipes);
    };

    getData();
  }, [])

  return (
    <div>
      {recipes.map( (item) => {
        return <h2 key = {item.id}> {item.name} </h2>;
      })}
    </div>
  )
}

export default HomePage