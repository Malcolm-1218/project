// import react-hook-form and yup
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface IFormInputs {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const createPost = async (data: IFormInputs) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
      userPhoto: user?.photoURL,
    });
    navigate("/");
  };
  return (
    <form onSubmit={handleSubmit(createPost)}>
      <input placeholder="Title..." {...register("title")} />
      <p style={{color:"red"}} >{errors.title?.message} </p>
      <textarea placeholder="Description..." {...register("description")} />
      <p style={{color:"red"}} >{errors.description?.message} </p>
      <input type="submit" className="submit" />
    </form>
  );
};
