import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { createCongress, fetchCongresses } from '../api/api';

export default function Congress() {
  const [congresos, setCongresos] = useState([]);
  const { authToken, currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    congresoName: '',
    congresoDescription: '',
    congresoDate: '',
    usuarioApp: currentUser,
  });

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  useEffect(() => {
    fetchCongresses(authToken, pagination.current_page)
      .then((response) => {
        console.log("Respuesta de la API:", response); 
        setCongresos(response.data.data); // Datos de la página actual
        setPagination({
          current_page: response.data.current_page,
          last_page: response.data.last_page,
        });
      })
      .catch((error) => console.error(error));
  }, [authToken, pagination.current_page]); // Dependencia de la página actual

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { congresoName, congresoDescription, congresoDate } = formData;
    if (!congresoName || !congresoDescription || !congresoDate) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    try {
      const data = {
        congress_title: congresoName,
        congress_description: congresoDescription,
        congress_date: congresoDate,
        user_id: currentUser,
      };
      const response = await createCongress(data, authToken);
      console.log(response.data);

      setFormData({
        congresoName: '',
        congresoDescription: '',
        congresoDate: '',
        usuarioApp: currentUser,
      });

      // Recargar los congresos después de crear uno nuevo
      const updatedCongresses = await fetchCongresses(authToken, pagination.current_page);
      setCongresos(updatedCongresses.data.data);
      setPagination({
        current_page: updatedCongresses.data.current_page,
        last_page: updatedCongresses.data.last_page,
      });
    } catch (error) {
      console.error('Error al crear el congreso:', error.response || error.message);
    }
  };

  function getCongreso(id) {
    console.log("id del congreso " + id)
  }


  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, current_page: page }));
  };
  return (
    <div>
      <div className="col-12 col-md-auto d-flex flex-column flex-md-row gap-2 p-2 align-items-center justify-content-center">
        <button className="btn btn-dark" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i className="bi bi-plus-square"></i> Crear congreso
        </button>
        <input
          className="form-control w-auto"
          type="search"
          placeholder="Congreso"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="button">
          Buscar
        </button>
      </div>

      <div className='p-3'>
        <div className="row row-cols-1 row-cols-md-3">
          {congresos.map((congreso) => (
            <div className=" containerCard  col p-2" key={congreso.id}>
              <div className="itemCard card w-75 mb-3" >
                <div className="card-header bg-header-card">
                  <h5 className='card-title'> {congreso.congress_title}</h5>
                </div>
                <div className="card-body rounded bg-body-card">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className=""></div>
                    </div>
                  </div>
                  <div className="">
                    <p className='card-text'>
                      {
                        congreso.congress_description
                      }
                    </p>
                  </div>
                </div>
                <div className="card-footer d-flex bg-footer-card">
                  <div className='ms-auto d-flex gap-3'>
                    <button type="button" className="btn btn-dark" onClick={() => getCongreso(congreso.id)}>Ver <i className="bi bi-eye"></i></button>
                    <button type="button" className="btn btn-secondary" onClick={() => getCongreso(congreso.id)}>Asistir <i className="bi bi-file-plus"></i></button>
                  </div>
                </div>
              </div>
              <pre>
              </pre>
            </div>
          ))}
        </div>
      <div className="d-flex justify-content-center mt-4">
            <button
                className="btn btn-dark me-2"
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
            >
                Anterior
            </button>
            <span className="align-self-center mx-3">
                Página {pagination.current_page} de {pagination.last_page}
            </span>
            <button
                className="btn btn-dark ms-2"
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
            >
                Siguiente
            </button>
        </div>
      </div>


      <div className="modal fade modal-dialog-scrollable" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
        <div className="modal-dialog">
          <form action="" onSubmit={handleSubmit}>

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
  )
}
