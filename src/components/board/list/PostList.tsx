import { Button, Link } from "@mui/material";
import React from "react";
import Responsive from "../common/Responsive";
import SubInfo from "../common/SubInfo";
import Tags from "../common/Tags";
import { styled } from "@mui/material/styles";
import { IUser } from "@/types/user.t";
import { IPost } from "@/types/post.t";

const PostListBlock = styled(Responsive)({
  marginTop: "1rem",
});

const WritePostButtonWrapper = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "3rem",
});

const PostItemBlock = styled("div")({
  paddingTop: "1rem",
  paddingBottom: "1rem",
  "&:first-of-type": {
    paddingTop: 0,
  },
  "&+&": {
    borderTop: "1px solid",
  },
  h2: {
    fontSize: "2rem",
    marginBottom: 0,
  },
  p: {
    marginTop: "2rem",
  },
});
// const Tags = styled("div")({
//   marginTop: ".5rem",
//   ".tag": {
//     display: "inline-block",
//     color: "#111010",
//     textDecoration: "none",
//     marginRight: "0.5rem",
//     "&:hover": {
//       color: "#1e806a",
//     },
//   },
//   "span + span:before": {
//     color: "#101010",
//     paddingLeft: "0.25rem",
//     paddingRight: "0.25rem",
//   },
// });
// const SubInfo = styled("div")({
//   color: "#111010",
//   "span + span:before": {
//     color: "#101010",
//     paddingLeft: "0.25rem",
//     paddingRight: "0.25rem",
//     content: "\\B7",
//   },
// });

const PostList = ({ rows }: { rows: IPost[] }) => {
  return (
    <PostListBlock>
      <WritePostButtonWrapper>
        <Button variant="outlined" href="/board/write">
          글쓰기
        </Button>
      </WritePostButtonWrapper>
      <div>{rows && rows.map(row => <PostItem key={row._id} post={row} />)}</div>
    </PostListBlock>
  );
};

const PostItem = ({ post }: any) => {
  const { publishedDate, user, tags, title, content, _id } = post;
  //console.log(post);
  return (
    <PostItemBlock>
      <Link href={`/board/view/@${user?.username}/${_id}`} underline="none">
        <h2>{title}</h2>
      </Link>

      <SubInfo username={user.username ?? user.email ?? "Unknown"} publishedDate={new Date(publishedDate)} />
      <Tags tags={tags}></Tags>
      <p>{content}</p>
    </PostItemBlock>
  );
};

export default PostList;
