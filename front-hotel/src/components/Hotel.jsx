import { useGetHotelInfoQuery } from "../slices/apiSlice";

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
                        <p>{todos.location.address}, {todos.location.city}, {todos.location.state}, {todos.location.zip}, {todos.location.country}</p>
                        <p>Phone: {todos.contact.phone}</p>
                        <p>Email: {todos.contact.email}</p>
                        <div className="hotel__facilities">
                            <h3>Facilities</h3>
                            <ul>
                                {todos.facilities.map((facility, index) => <li key={index}>{facility}</li>)}
                            </ul>
                        </div>
                        <div className="hotel__rooms">
                            <h3>Rooms</h3>
                            <ul>
                                {todos.rooms.map(room =>
                                    <li key={room.id}>
                                        <h4>{room.name}</h4>
                                        <img src={room.imageUrl} alt={room.name} />
                                        <p>{room.description}</p>
                                        <p>Capacity: {room.capacity}</p>
                                        <p>Price: {room.price}</p>
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