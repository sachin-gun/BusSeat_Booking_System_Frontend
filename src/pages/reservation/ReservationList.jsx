import { Button } from "flowbite-react"
import { Link } from "react-router-dom"
import routes from "../../constant/routes"

const ReservationList  = () => {
    return   <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Reservation</h1>
        <Link to={routes.reservationCreate}>
            <Button className="mb-4 bg-blue-500">Create Reservation</Button>
        </Link>
        <div className="max-h-screen overflow-y-auto">
        </div>
    </div>
}

export default ReservationList