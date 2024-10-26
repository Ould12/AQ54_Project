import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import logo from '../../assets/logodata354-1f7704b3.jpeg'; // Importez votre logo

// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons'; // Import de l'icône chart-line
import { faGithub } from '@fortawesome/free-brands-svg-icons';  // Import de l'icône GitHub

const Navbar = () => {
    const navigate = useNavigate();
    const { userLoggedIn, currentUser } = useAuth();  // Assurez-vous que currentUser est récupéré ici

    // Fonction de déconnexion
    const handleSignOut = () => {
        doSignOut().then(() => {
            navigate('/login');
        });
    };

    return (
        <header className="text-black bg-white body-font shadow-lg">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                
                {/* Logo et nom du projet */}
                <NavLink to="/" className="flex title-font font-medium items-center text-black mb-4 md:mb-0">
                    <img src={logo} alt="Logo du projet AQ54" className="h-10 w-10" /> {/* Taille du logo ajustée */}
                    <span className="ml-3 text-sm lg:text-xl text-green-800 tracking-wide font-poppins">
                        AQ54
                    </span>
                </NavLink>

                {/* Liens de navigation */}
                <nav className="md:ml-auto flex flex-wrap items-center text-sm lg:text-base justify-center font-poppins">
                    
                    {/* Lien vers le projet */}
                    <Tippy content='Projet AQ54'>
                        <NavLink to="/aboutus">
                            <span className="mr-5 text-green-800 hover:text-green-700 cursor-pointer transition duration-100">
                                Projet AQ54
                            </span>
                        </NavLink>
                    </Tippy>

                    {/* Visualisation de données (visible uniquement si l'utilisateur est connecté) */}
                    {userLoggedIn && (
                        <Tippy content='Visualisation de données'>
                            <NavLink to='/dashboard'>
                                <span className="mr-5 text-green-800 hover:text-green-700 cursor-pointer transition duration-100 flex items-center">
                                    <FontAwesomeIcon icon={faChartLine} className="mr-2" /> {/* Icône visualisation */}
                                    Visualisation de données
                                </span>
                            </NavLink>
                        </Tippy>
                    )}

                    {/* Lien vers GitHub */}
                    <Tippy content='Lien vers GitHub'>
                        <a
                            className="mr-5 text-green-800 hover:text-green-700 cursor-pointer transition duration-100"
                            href="https://github.com/Ould12/AQ54_Project.git"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faGithub} className="text-xl lg:text-3xl" /> {/* Icône GitHub */}
                        </a>
                    </Tippy>

                    {/* Liens d'authentification */}
                    {userLoggedIn ? (
                        <>
                            <span className='text-sm text-green-700'>
                                Hello, {currentUser.displayName ? currentUser.displayName : currentUser.email}
                            </span>
                            <button
                                onClick={handleSignOut}
                                className='ml-4 text-sm text-green-800 underline hover:text-green-700'
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink className='ml-4 text-sm text-green-800 underline hover:text-green-700' to='/login'>
                                Login
                            </NavLink>
                            <NavLink className='ml-4 text-sm text-green-800 underline hover:text-green-700' to='/register'>
                                Register
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
