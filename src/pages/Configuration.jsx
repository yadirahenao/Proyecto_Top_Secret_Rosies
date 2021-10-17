import { obtenerUsuarios, crearUsuario, editarUsuario, eliminarUsuario } from 'utils/api';
import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';

const Users = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Usuario');
  const [colorBoton, setColorBoton] = useState('rosa');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerUsuarios(
        (response) => {
        console.log('la respuesta que se recibio fue', response);
        setUsuarios(response.data);
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
      setTextoBoton('Crear Nuevo Usuario');
      setColorBoton('bg-red-400');
    } else {
      setTextoBoton('Mostrar Todos los Usuarios');
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
        <TablaUsuarios listaUsuarios={usuarios} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionUsuarios
          setMostrarTabla={setMostrarTabla}
          listaUsuarios={usuarios}
          setUsuarios={setUsuarios}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaUsuarios = ({ listaUsuarios, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);

  useEffect(() => {
    setUsuariosFiltrados(
      listaUsuarios.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaUsuarios]);

  return (
    <div className='flex flex-col items-center justify-center w-full p-8'>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-yellow-900'
      />
      <h2 className='text-2xl font-extrabold text-yellow-900 p-8'>Listado de Usuarios</h2>
      <div className='hidden md:flex w-full'>
        <table className='tabla w-full'>
          <thead>
            <tr>
              <th className='bg-yellow-700'>Id</th>
              <th className='bg-yellow-700'>Nombre</th>
              <th className='bg-yellow-700'>Apellido</th>
              <th className='bg-yellow-700'>email</th>
              <th className='bg-yellow-700'>Estado</th>
              <th className='bg-yellow-700'>Rol</th>
              <th className='bg-yellow-700'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((usuario) => {
              return (
                <FilaUsuario
                  key={nanoid()}
                  usuario={usuario}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {usuariosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.name}</span>
              <span>{el.surname}</span>
              <span>{el.email}</span>
              <span>{el.state}</span>
              <span>{el.role}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaUsuario = ({ usuario, setEjecutarConsulta}) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
    _id: usuario._id,
    name: usuario.name,
    surname: usuario.surname,
    email: usuario.email,
    state: usuario.state,
    role: usuario.role,
  });

  const actualizarUsuario = async () => {
   
    await editarUsuario(
      usuario._id,
      {
        name: infoNuevoUsuario.name,
        surname: infoNuevoUsuario.surname,
        email: infoNuevoUsuario.email,
        state: infoNuevoUsuario.state,
        role: infoNuevoUsuario.role,
      },
      (response) => {
        console.log(response.data);
        toast.success('Usuario modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error modificando el Usuario');
        console.error(error);
      }
    );
  }; 

  const deleteUser = async () => {
    await eliminarUsuario(
      usuario._id,
      (response) => {
        console.log(response.data);
        toast.success('Usuario eliminado con éxito');
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error eliminando el Usuario');
      }
    );
    setOpenDialog(false);
  }; 


   return (
    <tr>
      {edit ? (
        <>
          <td>{infoNuevoUsuario._id}</td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.name}
              onChange={(e) => setInfoNuevoUsuario({ ...infoNuevoUsuario, name: e.target.value })}
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.surname}
              onChange={(e) =>
                setInfoNuevoUsuario({ ...infoNuevoUsuario, surname: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='email'
              value={infoNuevoUsuario.email}
              onChange={(e) =>
                setInfoNuevoUsuario({ ...infoNuevoUsuario, email: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.state}
              onChange={(e) =>
                setInfoNuevoUsuario({ ...infoNuevoUsuario, state: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-yellow-900 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoUsuario.role}
              onChange={(e) =>
                setInfoNuevoUsuario({ ...infoNuevoUsuario, role: e.target.value })
              }
            />
          </td>
        </>
      ) : (
        <>
          <td>{usuario._id.slice(20)}</td>
          <td>{usuario.name}</td>
          <td>{usuario.surname}</td>
          <td>{usuario.email}</td>
          <td>{usuario.state}</td>
          <td>{usuario.role}</td>
        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <Tooltip title='Confirmar Edición' arrow>
                <i
                  onClick={() => actualizarUsuario()}
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
              <Tooltip title='Editar Usuario' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-pencil-alt text-yellow-900 hover:text-yellow-700'
                />
              </Tooltip>
              <Tooltip title='Eliminar Usuario' arrow>
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
              ¿Está seguro de querer eliminar el Usuario?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button
                onClick={() => deleteUser()}
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

const FormularioCreacionUsuarios = ({setMostrarTabla}) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoUsuario = {};
    fd.forEach((value, key) => {
      nuevoUsuario[key] = value;
    });

    await crearUsuario(
      {
        name: nuevoUsuario.name,
        surname: nuevoUsuario.surname,
        email: nuevoUsuario.email,
        state: nuevoUsuario.state,
        role: nuevoUsuario.role,
      },
      (response) => {
        console.log(response.data);
        toast.success('Usuario agregado con éxito');
      },
      (error) => {
        console.error(error);
        toast.error('Error creando un Usuario');
      }
    );
    setMostrarTabla(true);
  };
  
  return (
    <div className='flex flex-col items-center justify-center '>
      <h2 className='text-2xl font-extrabold text-yellow-900'>Crear nuevo Usuario</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='nombre'>
          Nombre del Usuario
          <input
            name='name'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='José'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='apellido'>
          Apellido del Usuario
          <input
            name='surname'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Rodríguez'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='correo'>
          Correo
          <input
            name='email'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='email'
            placeholder='joser@gmail.com'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='estado'>
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
            <option>Pendiente</option>
            <option>Autorizado</option> 
            <option>No Autorizado</option>       
            </select>
        </label>
        <label className='flex flex-col' htmlFor='rol'>
         Rol
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='role'
            required
            defaultValue={0}
            >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Administrador</option>
            <option>Vendedor</option>        
            </select>
        </label>

        <button
          type='submit'
          className='col-span-2 bg-yellow-700 p-2 rounded-full shadow-md hover:bg-yellow-900 text-white'
        >
          Guardar Usuario
        </button>
      </form>
    </div>
  );
};

export default Users;