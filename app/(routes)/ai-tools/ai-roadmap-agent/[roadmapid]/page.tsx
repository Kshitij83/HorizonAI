"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import RoadmapCanvas from "./_components/RoadmapCanvas";

function RoadmapGeneratorAgent() {
  const { roadmapid } = useParams();
  console.log("Roadmap ID: " + roadmapid);
  const [roadmapDetails, setRoadmapDetails] = useState<any>();
  useEffect(() => {
    roadmapid && GetRoadmapDetails();
  }, [roadmapid]);
  const GetRoadmapDetails = async () => {
    const result = await axios.get("/api/history?recordId=" + roadmapid);
    console.log("Result2: "+result.data);
    setRoadmapDetails(result.data?.content);
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="border rounded-xl p-5">
          <h2 className="font-bold text-2xl">{roadmapDetails?.roadmapTitle}</h2>
          <p className="mt-3 text-gray-500">
            <strong>Description:</strong>:<br></br>{roadmapDetails?.description}
          </p>
          <h2 className="mt-5 font-medium text-blue-600">Duration: {roadmapDetails?.duration}</h2>
          <Button className="mt-5 w-full">Create Another Roadmap</Button>
        </div>
        <div className="md:grid-cols-2 w-full h-[80vh]"><RoadmapCanvas /></div>
      </div>
    </>
  );
}

export default RoadmapGeneratorAgent;
