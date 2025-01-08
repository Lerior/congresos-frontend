import React, { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

export default function Profile() {
  const [congresos, setCongresos] = useState([]);
  const { authToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    congresoName: '',
    congresoDescription: '',
    congresoDate: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  
  const loadCongresos = useCallback (async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/congreso', {
        headers: {
          'Authorization': 'Bearer ' + authToken,
        },
      });
      console.log(response.data);
      setCongresos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [authToken]);

  useEffect(() => {
    loadCongresos();
  }, [authToken, loadCongresos]);



  const postCongreso = async () => {
    
    try {
      const { congresoName, congresoDescription, congresoDate } = formData;
      console.log(formData);
      if (!congresoName || !congresoDescription || !congresoDate) {
        alert('Por favor, completa todos los campos.');
        return;
      }
      const response = await axios.post(
        'http://localhost:8000/api/congreso',
        {
          congress_title: congresoName,
          congress_description: congresoDescription,
          congress_date: congresoDate,
        },
        {
          headers: {
            'Authorization': 'Bearer ' + authToken,
          }
        }
      );
      loadCongresos();
      console.log('Congreso creado exitosamente:', response.data);
    } catch (error) {
      console.error('Error al crear el congreso:', error.response || error.message);
    }
  };
  

  return (
    <div className="p-3">
      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          <div className="col">
            <div className="card p-3 h-100 itemProfile">
              <h3>Datos del usuario</h3>
              <label htmlFor="">UserName</label>
            </div>
          </div>
          <div className="col">
            <div className="card p-3 h-100 itemProfile">
              <h3>Asistencias pasadas</h3>
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
                <div className="col-12 col-md-6 d-grid gap-2">
                  <button className="btn btn-dark" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="bi bi-plus-square"></i> Crear congreso
                  </button>
                </div>
                <div className="col-12 col-md-6 d-flex flex-column flex-md-row gap-2">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Congreso"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-success" type="button">
                    Buscar
                  </button>
                </div>
                <div>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Congreso</th>
                        <th scope='col'>Fecha</th>
                      </tr>
                    </thead>
                    <tbody>
                      {congresos.map((congreso) => (
                        <tr key={congreso.id}>
                          <th scope='row'>{congreso.id}</th>
                          <td>{congreso.congress_title}</td>
                          <td>{congreso.congress_date}</td>
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


      <div className="modal fade modal-dialog-scrollable" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form action="" onSubmit={(e) => {
          e.preventDefault();
          postCongreso();
        }}>

          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Crear congreso</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body container-flex">
              <div className='p-2'>
                <label htmlFor="">Nombre del congreso</label>
              </div>
              <div className='p-2'>
                <input id='congresoName' value={formData.congresoName} onChange={handleInputChange} className='form-control text-center' placeholder="Ingrese un nombre para el congreso" type="text" />
              </div>
              <div className='p-2'>
                <label htmlFor="">Descripcion</label>
              </div>
              <div className='p-2'>
                <textarea name="" id='congresoDescription' value={formData.congresoDescription} onChange={handleInputChange} className='form-control text-center' placeholder="Ingrese una descripcion sobre el congreso"></textarea>
              </div>
              <div>
                <label htmlFor="">Fecha</label>
              </div>
              <div className='col-auto text-center'>
                <input id='congresoDate' value={formData.congresoDate} onChange={handleInputChange} type="date" className='form-control text-center' />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn btn-success">Guardar <i className="bi bi-floppy"></i></button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}
