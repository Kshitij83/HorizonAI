import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, SparkleIcon } from "lucide-react";
import axios from "axios";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";

function RoadmapGeneratorDialog({ openDialog, setOpenDialog }: any) {
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const GenerateRoadmap = async () => {
    const roadmapId = v4();
    console.log("Roadmap ID: " + roadmapId);
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-roadmap-agent", {
        roadmapId: roadmapId,
        userInput: userInput,
      });
      console.log("Result: "+result.data);
      router.push("/ai-tools/ai-roadmap-agent/" + roadmapId);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Position/Skills to Generate Roadmap</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-2">
                <Input
                  placeholder="Enter your desired position or skills"
                  onChange={(e) => setUserInput(e?.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant={"outline"}>Cancel</Button>
            <Button onClick={GenerateRoadmap} disabled={loading || !userInput}>
              {loading ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                <SparkleIcon />
              )}
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RoadmapGeneratorDialog;
