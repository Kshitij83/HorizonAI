"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import EmptyState from "../_components/EmptyState";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useParams, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
type messages = {
  content: string;
  role: string;
  type: string;
};

function AiChat() {
  const router = useRouter();
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<messages[]>([]);
  const { chatid }: any = useParams();
  
  useEffect(() => {
    chatid && GetMessageList();
  }, [chatid]);
  const GetMessageList = async () => {
    const result = await axios.get("/api/history?recordId=" + chatid);
    console.log(result.data);
    setMessageList(result?.data?.content);
  };

  const onSend = async () => {
    console.log("User Input:", userInput);
    setLoading(true);
    setMessageList((prev) => [
      ...prev,
      { content: userInput, role: "user", type: "text" },
    ]);
    setUserInput("");
    try {
      const result = await axios.post("/api/ai-career-chat-agent", {
        userInput: userInput,
      });
      console.log(result.data);
      // Optionally, add AI response to messageList here
      setMessageList((prev) => [...prev, result.data]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("Message List:", messageList);
  useEffect(() => {
    messageList.length > 0 && updateMessageList();
  }, [messageList]);
  const updateMessageList = async () => {
    const result = await axios.put("/api/history", {
      content: messageList,
      recordId: chatid,
    });
    console.log(result);
  };
  const onNewChat = async () => {
    const id = uuidv4();
    const result = await axios.post("/api/history", {
      recordId: id,
      content: [],
    });
    console.log(result);
    router.replace("/ai-tools/ai-chat/" + id);
  };
  return (
    <div className="px-10 md:px-24 lg:px-36 xl:px-48 h-[75vh] overflow-auto">
      <div className="flex items-center justify-between mb-5 gap-8">
        <div>
          <h2>AI Career Q/A Chat</h2>
          <p>Ask career-related questions and get AI-generated answers.</p>
        </div>
        <Button onClick={onNewChat}>+ New Chat</Button>
      </div>
      <div className="flex flex-col h-[75vh]">
        {messageList?.length <= 0 && (
          <div className="mt-5">
            <EmptyState
              selectedQuestion={(question: string) => setUserInput(question)}
            />
          </div>
        )}

        <div className="flex-1">
          {messageList?.map((message, index) => (
            <div>
              <div
                key={index}
                className={`flex mb-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 gap-2 ${
                    message.role === "user"
                      ? "bg-gray-200 text-black rounded-lg"
                      : "bg-gray-50 text-black"
                  }`}
                >
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              </div>
              <div className="flex justify-start p-3 rounded-lg gap-2">
                {loading && messageList?.length - 1 == index && (
                  <LoaderCircle className="animate-spin" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center gap-6 absolute bottom-5 w-[50%]">
          <Input
            placeholder="Type your question here..."
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <Button className="mt-2" onClick={onSend} disabled={loading}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AiChat;
