import React, { useEffect, useState } from 'react';


const PageTitle = () => {
  return(
    <div className=' text-6xl flex justify-center m-3.5'>Product List</div>
  )
}

const Index = () => {

  // const [message, setMessage] = useState("Loading");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products").then(
      response => response.json()
    ).then(
      data => {
        // console.log(data.products);
        // setMessage(data.message);
        setProducts(data.products);
      }
    )
  }, []);

  return (
    <>
      <PageTitle />
      <div>
        {
        products.map((product, index) => (
          <div key={index}>
            {product.name}
            {/* <img src={product.images.yellow}></img> */}
          </div>
        ))
        }
      </div>
    </>
  );
}

export default Index;
