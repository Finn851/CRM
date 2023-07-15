import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'
import { Routes, Route, useNavigate} from 'react-router-dom';
import Dashboard from './content/Dashboard/Dashboard';
import Revenue from './content/Revenue/Revenue';
import Main from './content/Main/Main'
import Notifications from './content/Notifications/Notifications';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './content/Loading/Loading';
import Files from './content/Files/Files'
import avatar from "../images/profile.jpeg";
import StopWatch from './Functions/Timer/StopWatch';

const Navbar = ({ rerender, data, users, handleLogout}) => {
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        handleLogout()
        navigate('/');
    };

    if (users == null || data == null) {
        return(
            <Loading />
        )
    } else {
        const User = users.find(el => el.id === localStorage.getItem('userID'))
        return (
            <div className='navnavbar'>
                <div class="sidebar">
                    <ul>
                        <NavLink className='navlink logo' to="/">
                            <a href="#">
                                <span class='icon'><i class='bx bx-shield'></i></span>
                                <span class="text">Моя оборона</span>
                            </a>
                        </NavLink>
                        <NavLink to={`/dashboard/${localStorage.getItem('selectedOption')}`} className="navlink">
                            <a href="#">
                                <span class='icon'><i class='bx bx-customize'></i></span>
                                <span class="text">Dashboard</span>
                            </a>
                        </NavLink>
                        <NavLink to="/revenue" className="navlink">
                            <a href="#">
                                <span class='icon'><i class='bx bxl-graphql'></i></span>
                                <span class="text">Revenue</span>
                            </a>
                        </NavLink>
                        <NavLink to="/notifications" className="navlink">
                            <a href="#">
                                <span class='icon'><i class='bx bx-bell'></i></span>
                                <span class="text">Notifications</span>
                            </a>
                        </NavLink>
                        <li className="navlink">
                            <a href="#">
                                <span class='icon'><i class='bx bx-chat'></i></span>
                                <span class="text">Chat</span>
                            </a>
                        </li>
                        <NavLink to="/files" className="navlink">
                            <a href="#">
                                <span class='icon'><i class='bx bx-file-blank'></i></span>
                                <span class="text">Files</span>
                            </a>
                        </NavLink>
                        <div className='bottom'>
                            <li className="navlink watch">
                                <a href="#">
                                    <StopWatch rerender={rerender} user={User}/>
                                </a>
                            </li>
                            <li className="navlink">
                                <a href="#">
                                    <span class='icon'><i class='bx bx-cog'></i></span>
                                    <span class="text">Settings</span>
                                </a>
                            </li>
                            <div className='profilelog'>
                                <li className="navlink">
                                    <a href="#">
                                        <span class='icon'>
                                            <div className="imgBx">
                                                <img src={avatar}/>
                                            </div>
                                        </span>
                                        <span class="text">{User.name}</span>
                                    </a>
                                </li>
                                <button className="navlink" onClick={handleLogoutClick}>
                                    <a>
                                        <span class='icon'><i class='bx bx-log-out'></i></span>
                                        <span class="text">Logout</span>
                                    </a>
                                </button>
                            </div>
                        </div>
                    </ul>
                </div>
                <section className="wrapper">
                    <div className="wrapper__inner">
                        <Routes>
                            <Route path='/' element={<Main state={rerender} data={data} users={users} user={User} />} />
                            <Route path={`/dashboard/*`} element={<Dashboard rerender={rerender} data={data} users={users} user={User} selectedOption={localStorage.getItem('selectedOption')}/>} />
                            <Route path='/revenue' element={<Revenue />} />
                            <Route path='/notifications' element={<Notifications rerender={rerender} data={data} users={users} user={User} />} />
                            <Route path='/files' element={<Files />} />
                        </Routes>
                        <ToastContainer className={styles.toast} />
                    </div>
                </section>
            </div>
    );
    }
}

export default Navbar