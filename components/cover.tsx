import { useEdgeStore } from "@/lib/edgestore";
import { useParams } from "next/navigation";
import React from "react";

type Props = {
  url?: string;
  preview?: boolean;
};

const Cover = ({ url, preview }: Props) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  return <div>C</div>;
};

export default Cover;
