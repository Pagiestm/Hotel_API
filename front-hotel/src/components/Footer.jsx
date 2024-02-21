import React from 'react';
import { useGetHotelInfoQuery } from "../slices/apiSlice";

const Footer = () => {
    const {
        data: hotelInfo, // Les données récupérées par l'api
        isLoading, // boolean qui sera à true si l'appel est en cours
        isSuccess, // boolean qui sera à true si l'appel à réussi
        isError, // boolean qui sera à true si l'appel à échoué
        error, // erreur renvoyé par l'api
    } = useGetHotelInfoQuery()

    return (
        <footer>
            {isSuccess === true && hotelInfo &&
                <>
                    <div className="footer__info">
                        <p>{hotelInfo.location.address}, {hotelInfo.location.city}, {hotelInfo.location.state}, {hotelInfo.location.zip}, {hotelInfo.location.country}</p>
                        <p>Phone: {hotelInfo.contact.phone}</p>
                        <p>Email: {hotelInfo.contact.email}</p>
                    </div>
                    <div className="footer__facilities">
                        <h3>Facilities</h3>
                        <ul>
                            {hotelInfo.facilities.map((facility, index) => <li key={index}>{facility}</li>)}
                        </ul>
                    </div>
                </>
            }
        </footer>
    );
}

export default Footer;