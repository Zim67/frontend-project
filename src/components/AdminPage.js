import { Link } from "react-router-dom";
import AdminAircraftPage from "./admin/AdminAircraftPage"
import AdminAirportPage from "./admin/AdminAirportPage"
import AdminFlightsPage from "./admin/AdminFlightsPage";


const AdminPage = () => {
    return (<div className="admin-page admin-panel">
        <h1>Admin Panel</h1>
        <Link to="/admin/flights"><button>Flights</button></Link>
        <Link to="/admin/aircrafts"><button>Aircrafts</button></Link>
        <Link to="/admin/airports"><button>Airports</button></Link>
    </div>)
}

export default AdminPage;