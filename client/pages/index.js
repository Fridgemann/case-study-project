import React, { useEffect, useState } from 'react';



const PageTitle = () => {
  return(
    <div className='text-3xl sm:text-4xl md:text-5xl text-center m-3.5 mt-30'>Product List</div>
  )
};



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
      <PageTitle style={{ fontFamily: 'Avenir' }}/>
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
