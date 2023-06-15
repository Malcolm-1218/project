import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Posts } from "./post";

export interface IPost {
  title: string;
  description: string;
  id: string;
  username: string;
  userId: string;
  userPhoto: string;
}

export const Main = () => {
  const [postList, setPostList] = useState<IPost[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostList(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as IPost[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {postList?.map((post) => (
        <>
          <Posts post={post} />
          <hr />
        </>
      ))}
    </div>
  );
};
