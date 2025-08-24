"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import jsPDF from "jspdf";              // ✅ Added
import "jspdf-autotable";               // ✅ Added

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };

  // 📄 Download as PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Placifiy-AI - Interview Feedback Report", 14, 20);

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
      startY: 30,
      styles: { fontSize: 9, cellWidth: "wrap" },
      columnStyles: {
        1: { cellWidth: 50 },
        2: { cellWidth: 40 },
        3: { cellWidth: 40 },
        4: { cellWidth: 50 },
      },
    });

    doc.save("interview-feedback.pdf");
  };

  return (
    <>
      <div className="p-10">
        {feedbackList?.length == 0 ? (
          <h2 className="font-bold text-xl text-gray-500">
            No Interview Feedback Record Found
          </h2>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-green-600">
              Congratulations!
            </h2>
            <h2 className="font-bold text-2xl">
              Here is your interview feedback
            </h2>
            <h2 className="text-sm text-gray-500">
              Find below interview question with correct answer, Your answer and
              feedback for improvement.
            </h2>

            {/* ✅ New Download PDF Button */}
            <Button
              onClick={downloadPDF}
              className="my-4 bg-purple-600 hover:bg-purple-800 text-white"
            >
              Download Feedback as PDF
            </Button>

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
    </>
  );
}

export default Feedback;
