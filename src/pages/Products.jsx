import { obtenerProductos, crearProducto, editarProducto, eliminarProducto } from 'utils/api';
import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';

const Products = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setProductos] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Producto');
  const [colorBoton, setColorBoton] = useState('indigo');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerProductos(
        (response) => {
        console.log('la respuesta que se recibio fue', response);
        setProductos(response.data);
        setEjecutarConsulta(false);
      },
      (error) => {
        console.error('Salio un error:', error);
      }
    );
    
  }
}, [ejecutarConsulta]);

  useEffect(() => {
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo Producto');
      setColorBoton('bg-red-400');
    } else {
      setTextoBoton('Mostrar Todos los productos');
      setColorBoton('bg-red-900');
    }
  }, [mostrarTabla]);

  return (
    <div className='flex h-full w-full flex-col items-center justify-start'>
    <div className='flex flex-col w-full'>
      <div>
      <h2 className="t_modulo">Gestión de Productos</h2> 
      </div >
      <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white ${colorBoton} p-5 rounded-full m-6 w-28 self-end`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaProductos listaProductos={productos} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionProductos
          setMostrarTabla={setMostrarTabla}
          listaProductos={productos}
          setProductos={setProductos}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaProductos = ({ listaProductos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState(listaProductos);

  useEffect(() => {
    setProductosFiltrados(
      listaProductos.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaProductos]);

  return (
    <div className='flex flex-col items-center justify-center w-full p-8'>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-yellow-900'
      />
      <h2 className='text-2xl font-extrabold text-yellow-900'>Listado de Productos</h2>
      <div className='hidden md:flex w-full'>
        <table className='tabla w-full'>
          <thead>
            <tr>
              <th className='bg-yellow-700'>Id</th>
              <th className='bg-yellow-700'>Descripcion</th>
              <th className='bg-yellow-700'>Valor Unitario</th>
              <th className='bg-yellow-700'>Estado</th>
              <th className='bg-yellow-700'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => {
              return (
                <FilaProducto
                  key={nanoid()}
                  producto={producto}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {productosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.description}</span>
              <span>{el.unitValue}</span>
              <span>{el.state}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaProducto = ({ producto, setEjecutarConsulta}) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoProducto, setInfoNuevoProducto] = useState({
    _id: producto._id,
    description: producto.description,
    unitValue: producto.unitValue,
    state: producto.state,
  });

  const actualizarProducto = async () => {
   
    await editarProducto(
      producto._id,
      {
        description: infoNuevoProducto.description,
        unitValue: infoNuevoProducto.unitValue,
        state: infoNuevoProducto.state,
      },
      (response) => {
        console.log(response.data);
        toast.success('Producto modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error modificando el Producto');
        console.error(error);
      }
    );
  }; 

  const deleteProduct = async () => {
    await eliminarProducto(
      producto._id,
      (response) => {
        console.log(response.data);
        toast.success('Producto eliminado con éxito');
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error eliminando el Producto');
      }
    );
    setOpenDialog(false);
  }; 


   return (
    <tr>
      {edit ? (
        <>
          <td>{infoNuevoProducto._id}</td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoProducto.description}
              onChange={(e) => setInfoNuevoProducto({ ...infoNuevoProducto, description: e.target.value })}
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='number'
              value={infoNuevoProducto.unitValue}
              onChange={(e) =>
                setInfoNuevoProducto({ ...infoNuevoProducto, unitValue: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoProducto.state}
              onChange={(e) =>
                setInfoNuevoProducto({ ...infoNuevoProducto, state: e.target.value })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{producto._id.slice(20)}</td>
          <td>{producto.description}</td>
          <td>{producto.unitValue}</td>
          <td>{producto.state}</td>
        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <Tooltip title='Confirmar Edición' arrow>
                <i
                  onClick={() => actualizarProducto()}
                  className='fas fa-check text-yellow-900 hover:text-yellow-700'
                />
              </Tooltip>
              <Tooltip title='Cancelar edición' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-ban text-yellow-900 hover:text-yellow-700'
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title='Editar Producto' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-pencil-alt text-yellow-900 hover:text-yellow-700'
                />
              </Tooltip>
              <Tooltip title='Eliminar Producto' arrow>
                <i
                  onClick={() => setOpenDialog(true)}
                  className='fas fa-trash text-red-900 hover:text-red-700'
                />
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className='p-8 flex flex-col'>
            <h1 className='text-gray-900 text-2xl font-bold'>
              ¿Está seguro de querer eliminar el Producto?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button
                onClick={() => deleteProduct()}
                className='mx-2 px-4 py-2 bg-yellow-700 text-white hover:bg-yellow-900 rounded-md shadow-md'
              >
                Sí
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className='mx-2 px-4 py-2 bg-red-700 text-white hover:bg-red-900 rounded-md shadow-md'
              >
                No
              </button>
            </div>
          </div>
        </Dialog>
      </td>
    </tr>
  );
};

const FormularioCreacionProductos = ({setMostrarTabla, listaProductos, setProductos }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoProducto = {};
    fd.forEach((value, key) => {
      nuevoProducto[key] = value;
    });

    await crearProducto(
      {
        description: nuevoProducto.description,
        unitValue: nuevoProducto.unitValue,
        state: nuevoProducto.state,
      },
      (response) => {
        console.log(response.data);
        toast.success('Producto agregado con éxito');
        
      },
      (error) => {
        console.error(error);
        toast.error('Error creando un Producto');
      }
    );
    setMostrarTabla(true);
  };
  
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-yellow-900'>Crear nuevo Producto</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='nombre'>
          Descripcion del Producto
          <input
            name='description'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Jabón de Menta'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='marca'>
          Valor Unitario
          <input
            name='unitValue'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='29000'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='modelo'>
          Estado
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='state'
            required
            defaultValue={0}
            >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Disponible</option>
            <option>No disponible</option>        
            </select>
        </label>

        <button
          type='submit'
          className='col-span-2 bg-yellow-700 p-2 rounded-full shadow-md hover:bg-yellow-900 text-white'
        >
          Guardar Producto
        </button>
      </form>
    </div>
  );
};

export default Products;