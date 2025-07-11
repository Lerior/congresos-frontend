import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function Topics() {
  const [topics, setTopics] = useState([]);
   const { authToken } = useContext(AuthContext);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/topic', {
          //mandar token en authorization
          headers: {
            'Authorization': 'Bearer ' + authToken
          }
        });

        setTopics(response.data);
      } catch (error) {
        console.error(error);
        console.log('Hubo un error al intentar iniciar sesión');
      }
    };
    loadTopics();
  }, [authToken]);

  
  //recordar usar algo para cambiar a '/public'
  if (!token) {
    return (
      <div className='bg-danger'>
        <h1 className='p-5'>Inicio de sesion necesario...</h1>
      </div>
    )
  }
  
  function getTopic(id){
    console.log("id del topic "+id)
  }

  return (


    <div>
      <div className='p-3'>
        <div className=" bg-danger row md-auto">
            {topics.map((topic) => (
          <div className=" containerCard   col p-2  bg-success" key={topic.id}>
              <div className="itemCard card" >
                <div className="card-header">
                  <h3>{topic.id} {topic.topic_title}</h3>
                </div>
                <div className="card-body rounded">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <div className=""></div>
                    </div>
                  </div>
                    <div className="input-group-prepend">
                      <div className=""></div>
                      <h4 className='p-1'>¿De que trata?</h4>
                    </div>
                  <div className="input-group">
                    <br />
                    <h6>
                      {
                        topic.topic_description
                      }
                    </h6>
                  </div>
                </div>
                <div className="card-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => getTopic(topic.id)}
                  >Inscribirse</button>
                </div>
              </div>
            <pre>
            </pre>
          </div>
            ))}
        </div>
      </div>
    </div>
  )
}
