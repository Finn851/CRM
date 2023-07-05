import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css'
import { Routes, Route} from 'react-router-dom';
import Dashboard from './content/Dashboard/Dashboard';
import Revenue from './content/Revenue/Revenue';
import Main from './content/Main/Main'
import Login from './content/Login/Login';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"

const Navbar = ({ rerender, data, users, handleLogout}) => {

    const navigate = useNavigate();

    const choiseCross = () =>{
        document.querySelector("#nav").classList.toggle(styles.open);
    }

    const handleLogoutClick = () => {
        handleLogout()
        navigate('/');
    };

    if (users === null) {
        return(
            <div>Loading...</div>
        )
    } else {
        const User = users.find(el => el.id === localStorage.getItem('userID'))
        return (
        <div>
            <nav id="nav">
                <div className={styles.logo}>
                    <i class="bx bx-menu menu-icon" onClick={choiseCross}></i>
                    <NavLink to="/" className="list">
                        <span className={styles.logo__name}>Моя оборона</span>
                    </NavLink>
                </div>
                <h1 className={styles.auth__name}>{User.name}</h1>
                <div className={styles.sidebar}>
                    <div className={styles.logo}>
                        <i class="bx bx-menu menu-icon"></i>
                        <span className={styles.logo__name}>Моя оборона</span>
                    </div>
                    <div className={styles.sidebar__content}>
                        <ul className={styles.lists}>
                            <NavLink to="/dashboard" className={styles.list}>
                                <a href="#" className={styles.nav__link}>
                                    <i className="bx bx-home-alt icon"></i>
                                    <span className={styles.link}>Dashboard</span>
                                </a>
                            </NavLink>
                            <NavLink to="/revenue" className={styles.list}>
                                <a href="#" className={styles.nav__link}>
                                    <i className="bx bx-bar-chart-alt-2 icon"></i>
                                    <span className={styles.link}>Revenue</span>
                                </a>
                            </NavLink>
                            <li className={styles.list}>
                                <a href="#" className={styles.nav__link}>
                                    <i className="bx bx-bell icon"></i>
                                    <span className={styles.link}>Notifications</span>
                                </a>
                            </li>
                            <li className={styles.list}>
                                <a href="#" className={styles.nav__link}>
                                    <i className="bx bx-message-rounded icon"></i>
                                    <span className={styles.link}>Messages</span>
                                </a>
                            </li>
                            <li className={styles.list}>
                                <a href="#" className={styles.nav__link}>
                                    <i className="bx bx-pie-chart-alt-2 icon"></i>
                                    <span className={styles.link}>Analytics</span>
                                </a>
                            </li>
                            <li className={styles.list}>
                                <a href="#" className={styles.nav__link}>
                                    <i className="bx bx-heart icon"></i>
                                    <span className={styles.link}>Likes</span>
                                </a>
                            </li>
                            <li className={styles.list}>
                                <a href="#" className={styles.nav__link}>
                                    <i className="bx bx-folder-open icon"></i>
                                    <span className={styles.link}>Files</span>
                                </a>
                            </li>
                        </ul>

                        <div className={styles.bottom__content}>
                            <li className={styles.list}>
                                <a href="#" className={styles.nav__link}>
                                    <i className="bx bx-cog icon"></i>
                                    <span className={styles.link}>Settings</span>
                                </a>
                            </li>
                            <li className={styles.list}>
                                <button onClick={handleLogoutClick} className={styles.nav__link}>
                                    <i className="bx bx-log-out icon"></i>
                                    <span className={styles.link}>Logout</span>
                                </button>
                            </li>
                        </div>
                    </div>
                </div>
            </nav>
            <section className={styles.overlay} onClick={choiseCross}></section>
            <section className="wrapper">
                <div className="wrapper__inner">
                    <Routes>
                        <Route path='/' element={<Main state={rerender} data={data} users={users} user={User}/>} />
                        <Route path='/dashboard' element={<Dashboard rerender={rerender} data={data} users={users} user={User}/>} />
                        <Route path='/revenue' element={<Revenue />} />
                    </Routes>
                </div>
            </section>
        </div>
    );
        }
}

export default Navbar