import { Link, useLocation } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { BiHome } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import './index.css';

function TopNavigation() {
    const links = ["Home", "Search", "Profile"];
    const linkToIconMap = {
        Profile: <ImProfile className="m-auto d-inline me-1 text-white"/>,
        Home: <BiHome  className="m-auto d-inline me-1 text-white"/>,
        Search: <AiOutlineSearch  className="m-auto d-inline me-1 text-white"/>
    }
    const { pathname } = useLocation();
    
    return (
        <div className="gray1">
            <Link to="/Moviehub/login" className="list-group-item border border-0 right ft-small fw-bold">
                <BiLogIn className="text-white me-1"/>
                    Login
            </Link>

            <div className="list-group list-group-horizontal list-group-flush list-special ft-small fw-bold">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        to={`/Moviehub/${link}`}
                        className={`list-group-item text-white ${pathname.includes(link) && "selected"}`}
                        style={{backgroundColor: "#808080"}}>
                        {linkToIconMap[link]}
                        {link}
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default TopNavigation;