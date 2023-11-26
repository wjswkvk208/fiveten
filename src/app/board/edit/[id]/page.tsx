"use client";
import Loading from "@/components/Loading";
import Responsive from "@/components/board/common/Responsive";
import Editor from "@/components/board/write/Editor";
import TagBox from "@/components/board/write/TagBox";
import WriteActionButtons from "@/components/board/write/WriteActionButtons";
import { useEdit, useView, useWrite } from "@/hooks/Board";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { arrayBuffer } from "node:stream/consumers";
import { useCallback, useState } from "react";

export default function Edit({ params }: { params: { id: string } }) {
  //console.log(params);
  const router = useRouter();
  const { id } = params;
  const { data: session } = useSession();
  const { trigger } = useEdit(id);
  const { data, mutate, isLoading } = useView({ id });
  const [tags, setTags] = useState<string[]>([]);
  const [field, setField] = useState({ ...data });
  const onchangeField = useCallback(
    (p: any) => {
      mutate({ ...data, [p.key]: p.value }, false); // 뮤테이션 재검증 생략
      setField({ ...data, [p.key]: p.value });
    },
    [data, mutate]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    //<Responsive>
    <>
      <Editor title={data.title} content={data.content} onChangeField={onchangeField} />
      <WriteActionButtons
        onPublish={() => {
          trigger(
            { ...field, tags },
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
