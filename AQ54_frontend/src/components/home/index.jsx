import { Typewriter } from 'react-simple-typewriter';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import WelcomePageImg from './../../assets/welcomepageimg.svg';

const Home = () => {
    const { currentUser } = useAuth();

    return (
        <section className="text-gray-400 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center w-10/12">
                {/* Texte de bienvenue */}
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-green-700 tracking-wide font-poppins">
                        Bienvenue{' '}
                        {currentUser?.displayName ? currentUser.displayName : currentUser?.email}
                        <br className="hidden lg:inline-block tracking-wide text-green-700" />{' '}
                        sur AQ54
                    </h1>
                    <p className="mb-8 leading-relaxed text-lg tracking-wide text-green-600 font-poppins">
                        <Typewriter
                            words={[
                                "La mauvaise qualité de l'air est liée à une série d'effets néfastes sur la santé, notamment les maladies respiratoires.",
                                "Des données précises sur la qualité de l'air permettent de sensibiliser le public à la gravité de la pollution atmosphérique et à ses conséquences potentielles sur la santé.",
                                "Une mauvaise qualité de l'air n'affecte pas seulement la santé humaine, mais a également des répercussions négatives sur l'environnement.",
                            ]}
                            loop={false}
                            cursor={true}
                        />
                    </p>
                    {/* Bouton Get Started */}
                    <div className="flex justify-center">
                        <NavLink to="/dashboard">
                            <button
                                className="ml-4 inline-flex text-green-800 border-4 border-green-500 bg-white py-4 px-8 focus:outline-none hover:scale-105 hover:border-green-800 hover:text-green-700 text-center rounded-lg text-xl tracking-wide transition duration-300"
                                aria-label="Commencer"
                            >
                                Get Started
                            </button>
                        </NavLink>
                    </div>
                </div>

                {/* Image de bienvenue */}
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img
                        className="object-cover object-center rounded animate-bounce"
                        alt="Welcome to AQ54"
                        src={WelcomePageImg}
                    />
                </div>
            </div>
        </section>
    );
};

export default Home;
