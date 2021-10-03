
import React from 'react'

function Photo_products({nombreProducto, imagen}){
    return(
        <li className='catalogo'>
            <div className='contenedorImagen'>
                <img src={imagen} alt= {nombreProducto} />
            </div>
            <span className='tituloImagen'>{nombreProducto}</span>
        </li>
    );
}

export default Photo_products;