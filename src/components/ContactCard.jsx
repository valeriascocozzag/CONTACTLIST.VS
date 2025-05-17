import React from "react";
import { useNavigate } from "react-router-dom";

function ContactCard(props) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        console.log('Eliminando contacto con id:', props.contactId);
        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/scocozzav_/contacts/${props.contactId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Error al eliminar el contacto: ${response.status}`);
            }

            console.log("Delete OK: " + response.ok);
            console.log("Delete Status: " + response.status);


            props.onDeleteContact(props.contactId);

        } catch (error) {
            console.error("Hubo un problema al eliminar el contacto:", error);
        }
    };

    return (
        <div className="card mt-3">

            <img src="https://d235h7drfdi019.cloudfront.net/wp-content/uploads/2023/01/que-tan-obediente-es-un-husky-siberiano-1024x614.jpg" className="card-img-top" alt="Contact" />

            <ul className="list-group list-group-flush ">
                <div className="card-body bg-white">
                    <h5 className="card-title">
                        {props.contactName}
                    </h5>
                </div>
                <li className="list-group-item ">
                    Correo electrónico: {props.contactMail}
                </li>
                <li className="list-group-item ">
                    Teléfono: {props.contactPhone}
                </li>
                <li className="list-group-item ">
                    Domicilio: {props.contactAddress}
                </li>
            </ul>

            <div className="card-body">

                <button
                    className="btn btn-primary m-3"
                    onClick={() => navigate(`/viewcontact/${props.contactId}`)}
                >
                    Ver Contacto
                </button>

                <button
                    className="btn btn-success m-3"
                    onClick={() => navigate(`/editcontact/${props.contactId}`)}
                >
                    Editar Contacto
                </button>

                <button
                    className="btn btn-danger m-3"
                    onClick={handleDelete}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default ContactCard;