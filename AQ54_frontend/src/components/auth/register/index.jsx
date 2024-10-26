import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();

    // Fonction pour gérer la soumission du formulaire d'inscription
    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Réinitialisation des erreurs
        if (password !== confirmPassword) {
            setErrorMessage('Les mots de passe ne correspondent pas.');
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/home'); // Redirection après succès
            } catch (error) {
                setErrorMessage('Erreur lors de la création du compte.');
                setIsRegistering(false); // Réinitialise l'état d'inscription en cas d'erreur
            }
        }
    };

    // Redirection si l'utilisateur est déjà connecté
    if (userLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    return (
        <main className="w-full h-screen flex justify-center items-center">
            <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                <div className="text-center mb-6">
                    <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Créer un compte</h3>
                </div>

                {/* Formulaire d'inscription */}
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="text-sm text-gray-600 font-bold">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm text-gray-600 font-bold">
                            Mot de passe
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isRegistering}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="text-sm text-gray-600 font-bold">
                            Confirmer le mot de passe
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            autoComplete="off"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isRegistering}
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                        />
                    </div>

                    {/* Message d'erreur si nécessaire */}
                    {errorMessage && (
                        <span className="text-red-600 font-bold">{errorMessage}</span>
                    )}

                    <button
                        type="submit"
                        disabled={isRegistering}
                        className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                    >
                        {isRegistering ? 'Inscription...' : 'S\'inscrire'}
                    </button>

                    <div className="text-sm text-center">
                        Déjà un compte ?{' '}
                        <Link to="/login" className="text-center text-sm hover:underline font-bold">
                            Se connecter
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Register;
