import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { UserDTO } from "./types";

export const userLogin = async (
  email: string,
  password: string
): Promise<{ user: Partial<UserDTO> } | { error: FirebaseError }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return { user };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { error };
    }
    throw error;
  }
};
