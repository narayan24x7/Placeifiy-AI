"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq, asc } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import jsPDF from "jspdf";   // ✅ added
import "jspdf-autotable";    // ✅ added

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(asc(UserAnswer.id));

    setFeedbackList(result);

    if (result.length > 0) {
      const total = result.reduce(
        (acc, item) => acc + (parseInt(item.rating) || 0),
        0
      );
      setAvgRating((total / result.length).toFixed(1));
    }
  };

  // ⭐ Helper to render stars
  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    return Array.from({ length: 10 }, (_, i) => (
      <FaStar
        key={i}
        className={`h-5 w-5 ${
          i < fullStars ? "text-yellow-500" : "text-gray-300"
        }`}
      />
    ));
  };

  // 📄 Generate PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Placifiy-AI - Interview Feedback Report", 14, 20);

    doc.setFontSize(12);
    doc.text(`Average Rating: ${avgRating}/10`, 14, 30);
    doc.text(`Total Questions: ${feedbackList.length}`, 14, 38);

    const tableData = feedbackList.map((item, idx) => [
      idx + 1,
      item.question,
      item.userAns,
      item.correctAns,
      item.feedback,
      item.rating,
    ]);

    doc.autoTable({
      head: [["#", "Question", "Your Answer", "Correct Answer", "Feedback", "Rating"]],
      body: tableData,
      startY: 50,
      styles: { fontSize: 9, cellWidth: "wrap" },
      columnStyles: {
        1: { cellWidth: 60 }, // Question
        2: { cellWidth: 40 }, // Your Ans
        3: { cellWidth: 40 }, // Correct Ans
        4: { cellWidth: 50 }, // Feedback
      },
    });

    doc.save("interview-feedback.pdf");
  };

  return (
    <div className="p-10">
      {feedbackList?.length === 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          {/* ✅ Summary Section */}
          <div className="mb-6 p-5 border rounded-lg bg-green-50 shadow">
            <h2 className="text-2xl font-bold text-green-700">
              Overall Performance Summary
            </h2>
            <p className="text-gray-700 mt-2">
              <strong>Total Questions:</strong> {feedbackList.length}
            </p>
            <div className="mt-3">
              <p className="text-gray-700">
                <strong>Average Rating:</strong> {avgRating} / 10
              </p>
              <div className="flex mt-2">{renderStars(avgRating)}</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${(avgRating / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 🆕 Download Button */}
          <Button
            onClick={downloadPDF}
            className="my-4 bg-purple-600 hover:bg-purple-800 text-white"
          >
            Download Feedback as PDF
          </Button>

          {/* Existing Feedback UI */}
          <h2 className="text-3xl font-bold text-green-600">Congratulations!</h2>
          <h2 className="font-bold text-2xl">Here is your interview feedback</h2>
          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, Your answer and
            feedback for improvement.
          </h2>

          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 flex justify-between text-left gap-7 w-full">
                  {item.question}
                  <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2 w-full">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating: </strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-yellow-50 text-sm text-yellow-900">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button
        onClick={() => router.replace("/dashboard")}
        className="flex gap-1 my-4 bg-blue-500 hover:bg-blue-700"
      >
        Return to Dashboard
        <MdOutlineDashboardCustomize className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default Feedback;
