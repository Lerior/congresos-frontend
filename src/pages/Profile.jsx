import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { deleteCongress, fetchCongresses, fetchUserById } from '../api/api';

export default function Profile() {
  const { authToken, currentUser } = useContext(AuthContext);
  const [congresos, setCongresos] = useState([]);
  const [datos, setUser] = useState([]);


  useEffect(() => {
    fetchUserById(currentUser, authToken)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => console.error(error));

    fetchCongresses(authToken)
      .then((response) => {
        setCongresos(response.data);
      })
      .catch((error) => console.error(error));
  }, [currentUser, authToken]);

  const handleDelete = async (id) => {
    try {
      await deleteCongress(id, authToken);
      const updatedCongresses = await fetchCongresses(authToken);
      setCongresos(updatedCongresses.data);
    } catch (error) {
      console.error('Error al eliminar el congreso:', error);
      alert('Hubo un error al eliminar el congreso');
    }
  };
  
  return (
    <div className="p-3">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            <div className="card p-3 h-100 itemProfile ">
              <h3>Datos del usuario</h3>
              <label className='form-control text-start' htmlFor="">Usuario: {datos.user_app}</label>
              <label className='form-control text-start' htmlFor="">Nombre: {datos.user_name}</label>
              <label className='form-control text-start' htmlFor="">Correo eléctronico: {datos.user_email}</label>
              <label className='form-control text-start' htmlFor="">Número de telefono: {datos.user_phone}</label>
            </div>
          </div>
          <div className="col">
            <div className="card p-3 h-100 itemProfile">
              <h3>Historial de asistencias</h3>
            </div>
          </div>
          <div className="col">
            <div className="card p-3 h-100 itemProfile">
              <h3>Asistencias próximas</h3>
            </div>
          </div>
          <div className="col">
            <div className="card p-3 h-100 itemProfile">
              <h3>Mis congresos</h3>
              <div className="row gy-3">
                <div>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col'>Congreso</th>
                        <th scope='col'>Fecha</th>
                        <th scope='col'>Modify</th>
                      </tr>
                    </thead>
                    <tbody>
                      {congresos.map((congreso) => (
                        <tr key={congreso.id}>
                          <td>{congreso.congress_title}</td>
                          <td>{congreso.congress_date}</td>
                          <td><button onClick={() => handleDelete(congreso.id)} className="btn btn-danger"><i className="bi bi-trash"></i></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
