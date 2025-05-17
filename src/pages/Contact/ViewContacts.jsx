import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

export const ViewContacts = () => {
    const { id } = useParams();
    const [contact, setContact] = useState(null);
    const { store } = useGlobalReducer();

    useEffect(() => {
        const fetchContact = () => {
            if (store.contactList) {
                let currentContact = store.contactList.find(contact => contact.id === Number(id));
                setContact(currentContact);
            }
        };
        fetchContact();
    }, [store.contactList, id]);

    const navigate = useNavigate();

    if (!contact) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="contact-details">
            <h2>Detalles del Contacto</h2>
            <div className="contact-list">
                <div className="card bg-secondary text-center">
                    <img 
                        src={contact.photo || "https://d235h7drfdi019.cloudfront.net/wp-content/uploads/2023/01/que-tan-obediente-es-un-husky-siberiano-1024x614.jpg"} 
                        className="card-img-top" 
                        alt="Contact" 
                    />
                    <div className="card-body bg-light">
                        <h5 className="card-title">{contact.name}</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Correo: {contact.email}</li>
                            <li className="list-group-item">Teléfono: {contact.phone}</li>
                            <li className="list-group-item">Dirección: {contact.address}</li>
                        </ul>
                        <div className="mt-3">
                            <button
                                className="btn btn-success mx-2"
                                onClick={() => navigate(`/editcontact/${contact.id}`)}
                            >
                                Editar
                            </button>
                            <button
                                className="btn btn-primary mx-2"
                                onClick={() => navigate(`/contacts/`)}
                            >
                                Volver a Contact List
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Link to="/">
                <button className="btn btn-primary mt-3">Volver</button>
            </Link>
        </div>
    );
}
