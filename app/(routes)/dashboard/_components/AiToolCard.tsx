"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
export interface TOOL {
  name: string;
  desc: string;
  icon: string;
  button: string;
  path: string;
}

type AiToolProps = {
  tool: TOOL;
};

function AiToolCard({ tool }: AiToolProps) {
  const id = uuidv4();
  const { user } = useUser();
  const router = useRouter();
  const onClickButton = async () => {
    const result = await axios.post("/api/history", {
      recordId: id,
      content: [],
    });
    console.log(result);
    router.push(tool.path + "/" + id);
  };
  return (
    <div className="p-3 border rounded-lg ">
      <Image src={tool.icon} alt={tool.name} width={40} height={40} />
      <h2 className="font-bold mt-2">{tool.name}</h2>
      <p className="text-gray-400">{tool.desc}</p>
      <Button
        variant={"secondary"}
        className="w-full mt-3"
        onClick={onClickButton}
      >
        {tool.button}
      </Button>
    </div>
  );
}

export default AiToolCard;
