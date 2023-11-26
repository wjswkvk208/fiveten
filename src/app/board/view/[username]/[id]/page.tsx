"use client";
import PostActionButtons from "@/components/board/view/PostActionButtons";
import Viewer from "@/components/board/view/Viewer";
import { useRemove, useView } from "@/hooks/Board";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const View = ({ params }: { params: { id: string; username: string } }) => {
  const { data: session } = useSession();
  const { data: post, error, isLoading } = useView({ ...params });
  const { trigger } = useRemove(params.id);
  const router = useRouter();

  const isOwnPost = (post && post.user._id) === session?.user._id;

  return (
    <Viewer
      post={post}
      error={error}
      isLoading={isLoading}
      actionButtons={
        isOwnPost && (
          <PostActionButtons
            onEdit={() => router.push(`/board/edit/${post._id}`)}
            onRemove={() => {
              trigger();
              router.push(`/board/list`);
            }}
          />
        )
      }
    />
  );
};

export default View;
