import React, { useEffect, useState } from 'react';



const PageTitle = () => {
  return(
    <div className='text-3xl sm:text-4xl md:text-5xl text-center m-3.5 mt-30'>Product List</div>
  )
};

const ProductCard = ({  image, name, price}) => {
  return (
    <div className='justify-center flex-col '>
      <img className='rounded' src={image}></img>
      <p>{name}</p>
      <p>{price}</p>

      <button className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600"></button>
      <button className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600"></button>
      <button className="w-12 h-12 rounded-full bg-blue-500 hover:bg-blue-600"></button>
    </div>
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
    <div>
      <PageTitle style={{ fontFamily: 'Avenir' }}/>
      <div>
        {
        // products.map((product, index) => (
        //   <div key={index}>
        //     {product.name}
        //     {/* <img src={product.images.yellow}></img> */}
        //   </div>
        // ))
        }
      </div>
      <div className='flex overflow-x-auto space-x-4 p-4 gap-4 mt-50'>
        {products.map((product, index) => (
          <ProductCard name={product.name} image={product.images.yellow} price={index}/>
      ))}
      </div>
      
    </div>
  );
}

export default Index;
