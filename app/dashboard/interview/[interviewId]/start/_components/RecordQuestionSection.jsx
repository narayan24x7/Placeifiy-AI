"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../../../../../components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "../../../../../../utils/GeminiAIModal";
import { db } from "../../../../../../utils/db";
import { UserAnswer } from "../../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

function RecordQuestionSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAnswer) => prevAnswer + result?.transcript);
    });
  }, [results]);

  useEffect(() => {
    //  Ensure trimmed answer has length
    if (!isRecording && userAnswer.trim().length > 10) {
      UpdateUserAnswer();
    }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      console.log(userAnswer);
    } else {
      setUserAnswer(""); //  reset before new recording
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    const finalAnswer = userAnswer.trim(); //  trim spaces
    if (!finalAnswer) {
      toast("Answer cannot be empty.");
      return;
    }

    console.log(finalAnswer);
    setLoading(true);

    const feedbackPrompt =
      "Question:" +
      mockInterviewQuestion[activeQuestionIndex]?.question +
      ", User Answer: " +
      finalAnswer +
      " ,Depends on question and user answer for give interview question" +
      " please give us rating for answer and feedback as area of improvement" +
      " in just 3 to 5 lines to improve it in JSON format with rating field and feedback field ";

    try {
      const result = await chatSession.sendMessage(feedbackPrompt);
      let mockJsonResp = await result.response.text();

      //  Clean extra formatting from AI
      mockJsonResp = mockJsonResp
        .replace("```json", "")
        .replace("```", "")
        .trim();

      console.log("AI JSON Response:", mockJsonResp);

      let JsonFeedbackResp;
      try {
        JsonFeedbackResp = JSON.parse(mockJsonResp);
      } catch (err) {
        console.error("JSON Parse Error:", err, mockJsonResp);
        toast("AI response parsing failed.");
        setLoading(false);
        return;
      }

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: finalAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress || "unknown", //  safety check
        createdAt: moment().format("DD-MM-yyyy"),
      });

      if (resp) {
        toast("User Answer Recorded successfully.");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.error("Error saving answer:", error);
      toast("Something went wrong while saving answer.");
    }

    setResults([]);
    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <div className="flex flex-col justify-center items-center rounded-lg p-5 mt-20 bg-black">
          <Image
            src="/webcam3.png"
            alt="WebCAM"
            width={140}
            height={140}
            className="absolute"
          />
          <Webcam
            mirrored={true}
            style={{
              height: 300,
              width: "100%",
              zIndex: 100,
            }}
          />
        </div>
        <Button
          disabled={loading}
          variant="outline"
          className="my-10"
          onClick={StartStopRecording}
        >
          {isRecording ? (
            <h2 className="text-red-1 flex animate-pulse items-center gap-2">
              <StopCircle />
              Stop Recording...
            </h2>
          ) : (
            <h2 className="flex gap-2 items-center">
              <Mic /> Record Answer
            </h2>
          )}
        </Button>
      </div>
    </>
  );
}

export default RecordQuestionSection;
