import { useGetDetailsRoomsQuery } from "../slices/apiSlice";
import { useParams, useNavigate } from 'react-router-dom';

const DetailsRooms = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data: room,
        isLoading, // boolean qui sera à true si l'appel est en cours
        isSuccess, // boolean qui sera à true si l'appel à réussi
        isError, // boolean qui sera à true si l'appel à échoué
        error, // erreur renvoyé par l'api
    } = useGetDetailsRoomsQuery(id);

    const handleBack = () => {
        navigate('/');
    }

    return (
        <div className="details-room">
            {isSuccess === true && room &&
                <>
                    <img className="details-room__image" src={room.imageUrl} alt={room.name} />
                    <div className="details-room__content">
                        <h1 className="details-room__content__title">{room.name}</h1>
                        <p className="details-room__content__description">{room.description}</p>
                        <p className="details-room__content__capacity">Capacity: {room.capacity}</p>
                        <p className="details-room__content__price">Price: {room.price}</p>
                        <button className="details-room__button" onClick={handleBack}>Retour</button>
                    </div>
                </>
            }
        </div>
    );
}

export default DetailsRooms;