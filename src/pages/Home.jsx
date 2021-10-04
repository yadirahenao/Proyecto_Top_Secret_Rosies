import React from 'react';
import Footer from 'components/Footer';
import Photo_products from 'components/Photo_products';
import Jabones_frutales_unsplash from '../media/Jabones_frutales_unsplash.jpg';
import Jabón_almendras_unsplash from '../media/Jabón_almendras_unsplash.jpg';
import Kit_especial_unsplash from '../media/Kit_especial_unsplash.jpg';
import Jabones_naturales_unsplash from '../media/Jabones_naturales_unsplash.jpg';



function Home() {
  return (
    <div>
    <section >
      <h1 className='t_Inicio'>Top Secret Rosies</h1>
      <h2 className= 't_catalogo'>Nuevos productos </h2>
      <ul className='catalogoContenedor'>   
        <Photo_products nombreProducto= 'Jabones frutales' imagen= {Jabones_frutales_unsplash} /> 
        <Photo_products nombreProducto= 'Jabón Almendras' imagen= {Jabón_almendras_unsplash} /> 
        <Photo_products nombreProducto= 'Kit especial' imagen= {Kit_especial_unsplash} /> 
        <Photo_products nombreProducto= 'Aromáticos' imagen= {Jabones_naturales_unsplash} /> 
      </ul>
     </section>
        <Footer/>
    </div>
  );
}



export default Home;