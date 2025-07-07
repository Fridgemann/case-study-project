import React, { useEffect, useState } from 'react';


const FullStar = () => (
  <svg className="w-5 h-5 text-[#EACB9E]" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455
             1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966
             -3.38-2.455c-.783-.57-.38-1.81.588-1.81h4.174l1.287-3.966z" />
  </svg>
)

const HalfStar = () => (
  <svg className="w-5 h-5" viewBox="0 0 20 20">
    <defs>
      <linearGradient id="half-grad">
        <stop offset="50%" stopColor="#EACB9E" />
        <stop offset="50%" stopColor="#eee" />
      </linearGradient>
    </defs>
    <path fill="url(#half-grad)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966h4.174c.969 0 1.371 1.24.588 1.81
             l-3.38 2.455 1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455-3.38 2.455c-.784.57-1.838-.197-1.539-1.118
             l1.286-3.966-3.38-2.455c-.783-.57-.38-1.81.588-1.81h4.174l1.287-3.966z" />
  </svg>
)

const EmptyStar = () => (
  <svg className="w-5 h-5 text-[#eee]" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966h4.174c.969 0 1.371 1.24.588 1.81l-3.38 2.455
             1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.286-3.966
             -3.38-2.455c-.783-.57-.38-1.81.588-1.81h4.174l1.287-3.966z" />
  </svg>
)



const PopularityStars = ({ score }) => {
  const totalStars = 5;
  const rating = score * totalStars;

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, i) => {
        if (rating >= i + 1) return <FullStar key={i} />
        if (rating >= i + 0.25 && rating < i + 0.75) return <HalfStar key={i} />
        return <EmptyStar key={i} />
      })}
      <span className="text-sm text-gray-700 ml-2">{rating.toFixed(1)} / 5</span>
    </div>
  )
}




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


const ProductCard = ({ product, price }) => {
  const { name, images, popularityScore } = product;
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
      <p className='text-[15px] font-montserrat'>{`$${price}`}</p>

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
      <PopularityStars score={popularityScore}/>
    </div>
  );
};


const Index = () => {

  // const [message, setMessage] = useState("Loading");
  const [products, setProducts] = useState([]);
  const [goldPrice, setGoldPrice] = useState(null);

  
  useEffect(() => {
    // fetch product data
    fetch("http://localhost:5000/api/products").then(
      response => response.json()
    ).then(
      data => {
        // console.log(data.products);
        // setMessage(data.message);
        setProducts(data.products);
      }
    )
    // fetch gold price
    fetch("http://localhost:5000/api/gold-price")
      .then(res => res.json())
      .then(data => setGoldPrice(data.price_per_gram))

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
          <ProductCard key={index} product={product} price={((product.popularityScore + 1) * product.weight * goldPrice).toFixed(2)} />
      ))}
      </div>
      
    </div>
  );
}

export default Index;
