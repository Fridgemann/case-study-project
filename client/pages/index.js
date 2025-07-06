import React, { useEffect, useState } from 'react';



const PageTitle = () => {
  return(
    <div className='font-avenir text-[45px] text-center m-3.5 mt-30'>Product List</div>
  )
};


const ColorButton = ({ color, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-9 h-9 rounded-full border flex items-center justify-center mt-2
        ${isSelected ? 'border-black' : 'border-transparent'}
        hover:cursor-pointer`}
    >
      <div className={`w-6.5 h-6.5 rounded-full ${color}`}></div>
    </button>
  )
}


const ProductCard = ({ product }) => {
  const { name, price, images } = product;
  const colors = ['bg-yellowGold', 'bg-whiteGold', 'bg-roseGold'];
  const colorNames = ['Yellow Gold', 'White Gold', 'Rose Gold'];
  const imgColorNames = ['yellow', 'white', 'rose'];

  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div className='min-w-[280px] sm:min-w-[320px] md:min-w-[360px] p-4 rounded-xl  flex flex-col gap-2.5'>
      <img
        className='rounded-2xl'
        src={selectedColor ? images[selectedColor] : images.yellow}
      />
      <p className='text-[15px] font-medium font-montserrat'>{name}</p>
      <p className='text-[15px] font-montserrat'>{'$500'}</p>

      <div className='flex gap-2 justify-start'>
        {colors.map((color, index) => (
          <ColorButton
            key={index}
            color={color}
            isSelected={selectedColorIndex === index}
            onClick={() => {
              setSelectedColorIndex(
                selectedColorIndex === index ? null : index
              );
              setSelectedColor(
                selectedColorIndex === index ? null : imgColorNames[index]
              );
            }}
          />
        ))}
      </div>

      {selectedColorIndex !== null && (
        <p className='font-avenir font-normal text-[14px]'>{colorNames[selectedColorIndex]}</p>
      )}
    </div>
  );
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
    <div>
      <PageTitle />
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
          <ProductCard key={index} product={product}/>
      ))}
      </div>
      
    </div>
  );
}

export default Index;
