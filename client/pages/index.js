import React, { useEffect, useState } from 'react';



const PageTitle = () => {
  return(
    <div className='text-3xl sm:text-4xl md:text-5xl text-center m-3.5 mt-30'>Product List</div>
  )
};


const ColorButton = ({ color }) => {
  const [selected, setSelected] = useState(false);

  return (
    <button onClick={() => setSelected(!selected)} className={`w-8 h-8 rounded-full ${color} hover:cursor-pointer mt-2 
    ${selected ? 'border-2 border-black': 'border:none'}`}></button>
  )

}

const ProductCard = ({  image, name, price}) => {
  return (
    <div className='justify-center flex-col flex gap-2.5'>
      <img className='rounded-2xl' src={image}></img>
      <p>{name}</p>
      <p>{price}</p>

      <div className='flex gap-2 justify-start'>
        <ColorButton color='bg-yellowGold'/>
        <ColorButton color='bg-whiteGold'/>
        <ColorButton color='bg-roseGold'/>
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
          <ProductCard name={product.name} image={product.images.yellow} price={index}/>
      ))}
      </div>
      
    </div>
  );
}

export default Index;
