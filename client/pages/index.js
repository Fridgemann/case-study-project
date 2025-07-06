import React, { useEffect, useState } from 'react';



const PageTitle = () => {
  return(
    <div className='text-3xl sm:text-4xl md:text-5xl text-center m-3.5 mt-30'>Product List</div>
  )
};


const ColorButton = ({ color, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-full ${color} hover:cursor-pointer mt-2 
        ${isSelected ? 'border-2 border-black' : 'border-none'}`}
    ></button>
  )
}


const ProductCard = ({ image, name, price }) => {
  const colors = ['bg-yellowGold', 'bg-whiteGold', 'bg-roseGold']
  const [selectedColorIndex, setSelectedColorIndex] = useState(null)

  return (
    <div className='justify-center flex-col flex gap-2.5'>
      <img className='rounded-2xl' src={image} />
      <p>{name}</p>
      <p>{price}</p>

      <div className='flex gap-2 justify-start'>
        {colors.map((color, index) => (
          <ColorButton
            key={index}
            color={color}
            isSelected={selectedColorIndex === index}
            onClick={() => setSelectedColorIndex(index)}
          />
        ))}
      </div>
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
      <div className='flex overflow-x-auto space-x-4 p-10 gap-20 mt-50'>
        {products.map((product, index) => (
          <ProductCard key={index} name={product.name} image={product.images.yellow} price={index}/>
      ))}
      </div>
      
    </div>
  );
}

export default Index;
