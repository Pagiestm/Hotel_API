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
        <div>
            {isSuccess === true && room &&
                <>
                    <h1>{room.name}</h1>
                    <img src={room.imageUrl} alt={room.name} />
                    <p>{room.description}</p>
                    <p>Capacity: {room.capacity}</p>
                    <p>Price: {room.price}</p>
                </>
            }
            <button onClick={handleBack}>Retour</button>
        </div>
    );
}

export default DetailsRooms;