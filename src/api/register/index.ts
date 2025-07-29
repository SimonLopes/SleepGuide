import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

type UserRegisterProps = {
  name: string;
  dateOfBirth: string;
  email: string;
  password: string;
  photoLocal?: string;
};

export async function userRegister({
  name,
  dateOfBirth,
  email,
  password,
  photoLocal,
}: UserRegisterProps) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // const imageRef = ref(storage, `profileImages/${user.uid}.jpg`);
    // const img = await fetch(photoLocal);
    // const blob = await img.blob();
    // await uploadBytes(imageRef, blob);
    // const fotoURL = await getDownloadURL(imageRef);

    await updateProfile(user, {
      displayName: name,
    });

    await setDoc(doc(db, "users", user.uid), {
      name,
      dateOfBirth,
      email,
      createdAt: new Date(),
    });

  } catch (error) {
    console.error("Erro ao cadastrar:", error);
  }
}
