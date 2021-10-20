import { nanoid } from 'nanoid';
import React, { useState, useEffect, useRef } from 'react';
import { crearProducto } from 'utils/api';
import { obtenerProductos } from 'utils/api';
import { obtenerUsuarios } from 'utils/api';

const Ventas = () => {
  const form = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosTabla, setProductosTabla] = useState([]);

  useEffect(() => {
    const fetchVendores = async () => {
      await obtenerUsuarios(
        (response) => {
          setVendedores(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    const fetchProductos = async () => {
      await obtenerProductos(
        (response) => {
          setProductos(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    fetchVendores();
    fetchProductos();
    }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    console.log('form data', formData);

    const listaProductos = Object.keys(formData)
      .map((k) => {
        if (k.includes('producto')) {
          return productosTabla.filter((v) => v._id === formData[k])[0];
        }
        return null;
      })
      .filter((v) => v);

    const datosProducto = {
      vendedor: vendedores.filter((v) => v._id === formData.vendedor)[0],
      quantity: formData.unitValue,
      productos: listaProductos,
    };
    
    await crearProducto(
      datosProducto,
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <form ref={form} onSubmit={submitForm} className='flex flex-col h-full w-min'>
        <h1 className='flex flex-col text-3xl font-extrabold text-gray-900 my-3 '>Crear Nueva Venta</h1>
        <label className='flex flex-col' htmlFor='nombre'>
          Cliente
          <input
            name='client'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Carla Azturias'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='marca'>
          Identificación
          <input
            name='identification'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='123456789'
            required
          />
          </label>
        <label className='flex flex-col' htmlFor='vendedor'>
          <span className='text-2xl font-gray-900'>Vendedor</span>
          <select name='vendedor' className='p-2' defaultValue='' required>
            <option disabled value=''>
              Seleccione un Vendedor
            </option>
            {vendedores.map((el) => {
              return <option key={nanoid()} value={el._id}>{`${el.name} ${el.surname}`}</option>;
            })}
          </select>
        </label>

        <TablaProductos
          productos={productos}
          setProductos={setProductos}
          setProductosTabla={setProductosTabla}
        />

        <label className='flex flex-col'>
          <span className='text-2xl font-gray-900'>Valor Total Venta</span>
          <input
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            name='valor'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='estado'>
          Estado de la Venta
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='saleStatus'
            required
            defaultValue={0}
            >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>En proceso</option>
            <option>Entregada</option>  
            <option>Cancelada</option>       
            </select>
        </label>
        <button
          type='submit'
          className='col-span-2 bg-yellow-700 p-2 rounded-full shadow-md hover:bg-yellow-900 text-white'
        >
          Crear Venta
        </button>
      </form>
    </div>
  );
};

const TablaProductos = ({ productos, setProductos, setProductosTabla }) => {
  const [productoAAgregar, setProductoAAgregar] = useState({});
  const [filasTabla, setFilasTabla] = useState([]);
 
  useEffect(() => {
    setProductosTabla(filasTabla);
  }, [filasTabla, setProductosTabla]);

  const agregarNuevoProducto = () => {
    setFilasTabla([...filasTabla, productoAAgregar]);
    setProductos(productos.filter((v) => v._id !== productoAAgregar._id));
    setProductoAAgregar({});
  };

  const eliminarProducto = (productoAEliminar) => {
    setFilasTabla(filasTabla.filter((v) => v._id !== productoAEliminar._id));
    setProductos([...productos, productoAEliminar]);
  };

  const modificarProducto = (producto, quantity) => {
    setFilasTabla(
      filasTabla.map((ft) => {
        if (ft._id === producto.id) {
          ft.quantity = quantity;
          ft.total = producto.unitValue * quantity;
        }
        return ft;
      })
    );
  };

  return (
    <div>
      <div className='flex '>
        <label className='flex flex-col' htmlFor='producto'>
          <select
            className='p-2'
            value={productoAAgregar._id ?? ''}
            onChange={(e) =>
              setProductoAAgregar(productos.filter((v) => v._id === e.target.value)[0])
            }
          >
            <option disabled value=''>
              Seleccione un Producto
            </option>
            {productos.map((el) => {
              return (
                <option
                  key={nanoid()}
                  value={el._id}
                >{`${el.description} ${el.unitValue} ${el.state}`}</option>
              );
            })}
          </select>
        </label>
        <button
          type='button'
          onClick={() => agregarNuevoProducto()}
          className='col-span-2 bg-yellow-700 p-2 rounded-full shadow-md hover:bg-yellow-900 text-white'
        >
          Agregar Producto
        </button>
      </div>
      <table className='tabla w-min'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Descripcion</th>
            <th>Estado</th>
            <th>Cantidad</th>
            <th>Valor Unitario</th>
            <th>Total</th>
            <th>Eliminar</th>
            <th className='hidden'>Input</th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.map((el, index) => {
            return (
            <FilaProducto
              key={el._id}
              pro={el}
              index={index}
              eliminarProducto={eliminarProducto}
              modificarProducto={modificarProducto}
            />
          );
        })}
      </tbody>
    </table>
  </div>
);
};

const FilaProducto = ({ pro, index, eliminarProducto, modificarProducto }) => {
const [producto, setProducto] = useState(pro);
useEffect(() => {
  console.log('pro', producto);
}, [producto]);
return (
  <tr>
    <td>{producto._id}</td>
    <td>{producto.description}</td>
    <td>{producto.state}</td>
    <td>
      <label htmlFor={`quantity_${index}`}>
        <input
          type='number'
          name={`quantity_${index}`}
          value={producto.quantity}
          onChange={(e) => {
            modificarProducto(producto, e.target.value === '' ? '0' : e.target.value);
            setProducto({
              ...producto,
              quantity: e.target.value === '' ? '0' : e.target.value,
              total:
                parseFloat(producto.unitValue) *
                parseFloat(e.target.value === '' ? '0' : e.target.value),
            });
          }}
        />
      </label>
    </td>
    <td>{producto.unitValue}</td>
    <td>{parseFloat(producto.total ?? 0)}</td>
    <td>
      <i
        onClick={() => eliminarProducto(producto)}
        className='fas fa-minus text-red-900 cursor-pointer'
      />
    </td>
    <td className='hidden'>
      <input hidden defaultValue={producto._id} name={`producto_${index}`} />
    </td>
  </tr>
);
};
export default Ventas;