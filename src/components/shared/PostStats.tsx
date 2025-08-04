import { useUserContext } from "@/context/AuthContext";
import type { deleteSavedPost } from "@/lib/appwrite/api";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavedPost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { LikedPosts } from "@/root/Pages";
import type { Models } from "appwrite";
import { useState, useEffect } from "react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost } = useSavedPost();
  const { mutate: deleteSavePost } = useDeleteSavedPost();
  useDeleteSavedPost();
  useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: any) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);
  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post.$id, likesArray: newLikes });
  };
  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    setIsSaved(true);
    savePost({ userId: userId, postId: post.$id });
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={25}
          height={25}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer mt-5"
        />
        <p className="small-medium lg:base-medium mt-5">{likes.length}</p>
      </div>
      <div className="flex gap-2 mr-5">
        <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="like"
          width={25}
          height={25}
          onClick={(e) => handleSavePost(e)}
          className="cursor-pointer mt-5"
        />
      </div>
    </div>
  );
};

export default PostStats;
