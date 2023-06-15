import { IPost } from "./Main";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface PostProps {
  post: IPost;
}
interface ILikes {
  userIdLike: string;
  id: string;
}

export const Posts = (props: PostProps) => {
  const { post } = props;
  const [user] = useAuthState(auth);
  const [likes, setLikes] = useState<ILikes[] | null>(null);

  const likesRef = collection(db, "likes");

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userIdLike: user?.uid,
        postId: post.id,
      });

      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userIdLike: user.uid, id: newDoc.id }]
            : [{ userIdLike: user.uid, id: newDoc.id }]
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  const removeLike = async () => {
    try {
      const deleteLikeQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userIdLike", "==", user?.uid)
      );
      const deleteLikeDocs = await getDocs(deleteLikeQuery);
      const likeId = deleteLikeDocs.docs[0].id;
      const deleteLike = await doc(db, "likes", likeId);
      await deleteDoc(deleteLike);
      setLikes((prev) => prev && prev.filter((like) => likeId !== like.id));
    } catch (e) {
      console.log(e);
    }
  };
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({
        userIdLike: doc.data().userIdLike,
        id: doc.id,
      }))
    );
  };

  const checkIfLiked = likes?.find((like) => like.userIdLike === user?.uid);

  // getLikes();
  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="title">
        <img
          src={post.userPhoto || ""}
          alt="post owner"
          width="30"
          height="30"
          style={{
            borderRadius: "50%",
            border: "solid",
            borderWidth: "1px",
            marginRight: "10px",
          }}
        />
        <h1 style={{marginTop:"8px",marginBottom:"2px"}}>{post.title}</h1>
      </div>
      <div className="username" >
        <p style={{marginTop:"0px"}}>@{post.username}</p>
      </div>
      <div className="description">
        <p>{post.description}</p>
      </div>
      <div className="likes">
        <button onClick={checkIfLiked ? removeLike : addLike}>
          {" "}
          {checkIfLiked ? <>&#128078;</> : <>&#128077;</>}{" "}
        </button>
        {likes && <p>Likes: {likes?.length}</p>}
      </div>
    </div>
  );
};
