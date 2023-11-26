"use client";
import Responsive from "@/components/board/common/Responsive";
import Editor from "@/components/board/write/Editor";
import TagBox from "@/components/board/write/TagBox";
import WriteActionButtons from "@/components/board/write/WriteActionButtons";
import { useView, useWrite } from "@/hooks/Board";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { arrayBuffer } from "node:stream/consumers";
import { useCallback, useState } from "react";

export default function Write() {
  //console.log(params);
  const router = useRouter();

  const { data: session } = useSession();
  const { trigger } = useWrite();
  //const { data, mutate, isLoading } = useView({ id: id ? id[0] : "" });

  //const [field, setField] = useState({});
  const [tags, setTags] = useState<string[]>([]);
  const [data, setData] = useState({
    title: "",
    content: "",
  });
  const onchangeField = useCallback(
    (p: any) => {
      setData({ ...data, [p.key]: p.value }); // 뮤테이션 재검증 생략
    },
    [data]
  );

  return (
    //<Responsive>
    <>
      <Editor title={data.title} content={data.content} onChangeField={onchangeField} />
      <WriteActionButtons
        onPublish={() => {
          trigger(
            { ...data, tags },
            {
              onSuccess: () => router.push("/board/list"),
            }
          );
        }}
        onCancel={() => {
          router.back();
        }}
      />
      <TagBox
        tags={tags}
        onChangeTags={(nextTags: any) => {
          setTags(nextTags);
        }}
      />
    </>
    //</Responsive>
  );
}
