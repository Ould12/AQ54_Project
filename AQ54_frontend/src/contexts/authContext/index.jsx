import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
// import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

// Création du contexte d'authentification
const AuthContext = React.createContext();

// Hook pour utiliser le contexte d'authentification
export function useAuth() {
  return useContext(AuthContext);
}

// Composant fournisseur d'authentification
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);// eslint-disable-next-line
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  // Effet de suivi de l'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    
    // Désinscription propre du listener lorsqu'il n'est plus nécessaire
    return () => unsubscribe();
  }, []);

  // Fonction d'initialisation de l'utilisateur
  async function initializeUser(user) {
    if (user) {
      // Extraction des informations de l'utilisateur nécessaires
      setCurrentUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });

      // Vérification si l'utilisateur est connecté via email et mot de passe
      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // Vérification si l'utilisateur est connecté via Google
      // const isGoogle = user.providerData.some(
      //   (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
      // );
      // setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
    } else {
      // Réinitialisation des informations utilisateur en cas de déconnexion
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false); // Arrêt de l'état de chargement une fois l'utilisateur initialisé
  }

  // Valeurs du contexte à transmettre aux enfants
  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser,
  };

  // Retourne le fournisseur du contexte avec les enfants
  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Affiche les enfants uniquement lorsque le chargement est terminé */}
    </AuthContext.Provider>
  );
}
