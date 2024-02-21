import { useGetHotelInfoQuery } from "../slices/apiSlice";
import { Link } from 'react-router-dom';

const Hotel = () => {

    const {
        data: todos, // Les données récupérées par l'api
        isLoading, // boolean qui sera à true si l'appel est en cours
        isSuccess, // boolean qui sera à true si l'appel à réussi
        isError, // boolean qui sera à true si l'appel à échoué
        error, // erreur renvoyé par l'api
    } = useGetHotelInfoQuery()

    return (
        <>
            <div className="hotel__info">
                {isSuccess === true && todos &&
                    <div>
                        <h1>{todos.name}</h1>
                        <div className="hotel__rooms">
                            <h3>Rooms</h3>
                            <ul>
                                {todos.rooms.map(room =>
                                    <li key={room.id}>
                                        <h4>{room.name}</h4>
                                        <img src={room.imageUrl} alt={room.name} />
                                        <Link to={`/room/${room.id}`}>En savoir plus</Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Hotel;