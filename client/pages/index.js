import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'



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
      <span className="text-[14px] text-gray-700 ml-2">{rating.toFixed(1)} / 5</span>
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
      <p className='text-[15px] font-medium font-montserratMedium'>{name}</p>
      <p className='text-[15px] font-montserrat'>{`${price}`}</p>

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
      <PopularityStars score={popularityScore} />
    </div>
  );
};


const Index = () => {
  const [products, setProducts] = useState([])
  const [sortBy, setSortBy] = useState('');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start' })

  useEffect(() => {
    const fetchData = async () => {
      const productRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?sortBy=${sortBy}`);
      console.log('API:', process.env.NEXT_PUBLIC_API_URL);
      const productData = await productRes.json();
      setProducts(productData.products || []);
    };

    fetchData();
  }, [sortBy]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div>
      <PageTitle />

      <div className="flex flex-wrap gap-2 px-6 py-4">
        <button
          onClick={() => setSortBy('price_asc')}
          className={`px-4 py-2 border rounded ${sortBy === 'price_asc' ? 'bg-gray-800 text-white' : 'bg-white'}`}
        >
          Price ↑
        </button>
        <button
          onClick={() => setSortBy('price_desc')}
          className={`px-4 py-2 border rounded ${sortBy === 'price_desc' ? 'bg-gray-800 text-white' : 'bg-white'}`}
        >
          Price ↓
        </button>
        <button
          onClick={() => setSortBy('popularity_asc')}
          className={`px-4 py-2 border rounded ${sortBy === 'popularity_asc' ? 'bg-gray-800 text-white' : 'bg-white'}`}
        >
          Popularity ↑
        </button>
        <button
          onClick={() => setSortBy('popularity_desc')}
          className={`px-4 py-2 border rounded ${sortBy === 'popularity_desc' ? 'bg-gray-800 text-white' : 'bg-white'}`}
        >
          Popularity ↓
        </button>
      </div>

      <div className="relative select-none">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5 px-6 py-10">
            {products.map((product, index) => (
              <div key={index} className="min-w-[280px] sm:min-w-[320px] md:min-w-[360px]">
                <ProductCard
                  product={product}
                  price={
                    product
                      ? `$${product.price}`
                      : 'Loading...'
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white text-black p-2 shadow-md rounded-full hover:bg-gray-100 transition"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white text-black p-2 shadow-md rounded-full hover:bg-gray-100 transition"
        >
          <ChevronRight size={20} />
        </button>

      </div>
    </div>
  )
}

export default Index;
