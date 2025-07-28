import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase";

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

    // // Upload da foto
    // const imageRef = ref(storage, `profileImages/${user.uid}.jpg`);
    // const img = await fetch(photoLocal);
    // const blob = await img.blob();
    // await uploadBytes(imageRef, blob);
    // const fotoURL = await getDownloadURL(imageRef);

    // Atualizar nome e foto no perfil do Firebase Auth
    await updateProfile(user, {
      displayName: name,
    });

    // Salvar dados no Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      dateOfBirth,
      email,
      createdAt: new Date(),
    });

    console.log("Usuário cadastrado com sucesso!");
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
  }
}
