import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// Créer un nouvel utilisateur avec email et mot de passe
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error; // Propager l'erreur pour la gérer dans l'UI
  }
};

// Connexion avec email et mot de passe
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};

// Connexion avec Google
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Ajout de l'utilisateur à Firestore si nécessaire
    // await addUserToFirestore(user); // Fonction Firestore à implémenter

    return user;
  } catch (error) {
    console.error("Erreur lors de la connexion avec Google :", error);
    throw error;
  }
};

// Déconnexion de l'utilisateur
export const doSignOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
};

// Réinitialisation du mot de passe via email
export const doPasswordReset = async (email) => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe :", error);
    throw error;
  }
};

// Changer le mot de passe de l'utilisateur connecté
export const doPasswordChange = async (password) => {
  try {
    return await updatePassword(auth.currentUser, password);
  } catch (error) {
    console.error("Erreur lors du changement de mot de passe :", error);
    throw error;
  }
};

// Envoi d'un email de vérification
export const doSendEmailVerification = async () => {
  try {
    return await sendEmailVerification(auth.currentUser, {
      url: `${window.location.origin}/home`, // Redirige après vérification
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de vérification :", error);
    throw error;
  }
};
