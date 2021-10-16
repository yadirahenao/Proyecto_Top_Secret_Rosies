import { obtenerVentas, crearVenta, editarVenta, eliminarVenta } from 'utils/api';
import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast} from 'react-toastify';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';

const Sales = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [venta, setVentas] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nueva Venta');
  const [colorBoton, setColorBoton] = useState('indigo');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerVentas(
        (response) => {
        console.log('la respuesta que se recibio fue', response);
        setVentas(response.data);
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
      setTextoBoton('Crear Nueva Venta');
      setColorBoton('indigo');
    } else {
      setTextoBoton('Mostrar Todas las ventas');
      setColorBoton('green');
    }
  }, [mostrarTabla]);

  return (
    <div className='flex h-full w-full flex-col items-center justify-start'>
    <div className='flex flex-col w-full'>
      <div>
      <h2 className="t_modulo">Gestión de Ventas</h2> 
      </div >
      <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaVentas listaVentas={venta} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionVentas
          setMostrarTabla={setMostrarTabla}
          listaVentas={venta}
          setVentas={venta}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaVentas = ({ listaVentas, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [ventasFiltrados, setVentasFiltrados] = useState(listaVentas);

  useEffect(() => {
    setVentasFiltrados(
      listaVentas.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaVentas]);

  return (
    <div className='flex flex-col items-center justify-center w-full p-8'>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-yellow-900'
      />
      <h2 className='text-2xl font-extrabold text-yellow-900'>Listado de Ventas</h2>
      <div className='hidden md:flex w-full'>
        <table className='tabla w-full'>
          <thead>
            <tr>
              <th className='bg-yellow-700'>Id</th>
              <th className='bg-yellow-700'>Cliente</th>
              <th className='bg-yellow-700'>Identificación</th>
              <th className='bg-yellow-700'>Producto</th>
              <th className='bg-yellow-700'>Cantidad</th>
              <th className='bg-yellow-700'>Precio</th>
              <th className='bg-yellow-700'>Valor Total</th>
              <th className='bg-yellow-700'>Vendedor</th>
              <th className='bg-yellow-700'>Estado de la Venta</th>
              <th className='bg-yellow-700'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventasFiltrados.map((venta) => {
              return (
                <FilaVenta
                  key={nanoid()}
                  venta={venta}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {ventasFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.client}</span>
              <span>{el.identification}</span>
              <span>{el.product}</span>
              <span>{el.quantity}</span>
              <span>{el.unitValue}</span>
              <span>{el.totalValue}</span>
              <span>{el.seller}</span>
              <span>{el.saleStatus}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaVenta = ({ venta, setEjecutarConsulta}) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevaVenta, setInfoNuevaVenta] = useState({
    _id: venta._id,
    client: venta.client,
    identification: venta.identification,
    product: venta.product,
    quantity: venta.quantity,
    unitValue: venta.unitValue,
    totalValue: venta.unitValue,
    seller: venta.seller,
    saleStatus: venta.saleStatus,
  });

  const actualizarVenta = async () => {
   
    await editarVenta(
      venta._id,
      {
        client: infoNuevaVenta.client,
        identification: infoNuevaVenta.identification,
        product: infoNuevaVenta.product,
        quantity: infoNuevaVenta.quantity,
        unitValue: infoNuevaVenta.unitValue,
        totalValue: infoNuevaVenta.totalValue,
        seller: infoNuevaVenta.seller,
        saleStatus: infoNuevaVenta.saleStatus,
      },
      (response) => {
        console.log(response.data);
        toast.success('Venta modificada con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error modificando la Venta');
        console.error(error);
      }
    );
  }; 

  const deleteSale = async () => {
    await eliminarVenta(
      venta._id,
      (response) => {
        console.log(response.data);
        toast.success('Venta eliminada con éxito');
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error eliminando la Venta');
      }
    );
    setOpenDialog(false);
  }; 


   return (
    <tr>
      {edit ? (
        <>
          <td>{infoNuevaVenta._id}</td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.client}
              onChange={(e) => 
                setInfoNuevaVenta({ ...infoNuevaVenta, client: e.target.value })}
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='number'
              value={infoNuevaVenta.identification}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, identification: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.product}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, product: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.quantity}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, quantity: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.unitValue}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, unitValue: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.totalValue}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, totalValue: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.seller}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, seller: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevaVenta.saleStatus}
              onChange={(e) =>
                setInfoNuevaVenta({ ...infoNuevaVenta, saleStatus: e.target.value })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{venta._id.slice(20)}</td>
          <td>{venta.client}</td>
          <td>{venta.identification}</td>
          <td>{venta.product}</td>
          <td>{venta.quantity}</td>
          <td>{venta.unitValue}</td>
          <td>{venta.totalValue}</td>
          <td>{venta.seller}</td>
          <td>{venta.saleStatus}</td>
        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <Tooltip title='Confirmar Edición' arrow>
                <i
                  onClick={() => actualizarVenta()}
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
              <Tooltip title='Editar Venta' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-pencil-alt text-yellow-900 hover:text-yellow-700'
                />
              </Tooltip>
              <Tooltip title='Eliminar Venta' arrow>
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
              ¿Está seguro de querer eliminar la Venta?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button
                onClick={() => deleteSale()}
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

const FormularioCreacionVentas = ({setMostrarTabla, listaVentas, setVentas }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevaVenta = {};
    fd.forEach((value, key) => {
      nuevaVenta[key] = value;
    });

    await crearVenta(
      {
        client: nuevaVenta.client,
        identification: nuevaVenta.identification,
        product: nuevaVenta.product,
        quantity: nuevaVenta.quantity,
        unitValue: nuevaVenta.unitValue,
        totalValue: nuevaVenta.totalValue,
        seller: nuevaVenta.seller,
        saleStatus: nuevaVenta.saleStatus,
      },
      (response) => {
        console.log(response.data);
        toast.success('Venta agregada con éxito');
        listaVentas(true)
        setVentas(true)
      },
      (error) => {
        console.error(error);
        toast.error('Error creando la Venta');
      }
    );
    setMostrarTabla(true);
  };
  
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-yellow-900'>Crear nueva Venta</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
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
        <label className='flex flex-col' htmlFor='marca'>
          Producto
          <input
            name='product'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Jabón de Camomilla'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='marca'>
          Cantidad
          <input
            name='quantity'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='5'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='marca'>
          Precio
          <input
            name='unitValue'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='30000'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='marca'>
          Valor Total
          <input
            name='totalValue'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            placeholder='150000'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='nombre'>
          Vendedor
          <input
            name='seller'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Paula Dominguez'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='modelo'>
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
          Guardar Venta
        </button>
      </form>
    </div>
  );
};

export default Sales;