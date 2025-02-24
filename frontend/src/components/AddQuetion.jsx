import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import url from "../service/url";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddQuestion() {
  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = async (data) => {
    const newData = { ...data, id: id };
    // console.log(newData);
    try {
      const response = await axios.post(`${url}/card/addcard`, newData);
      //   console.log(response);

      // Reset form after successful submission
      reset();
      toast.success("Question added successfully");
    } catch (err) {
      console.error("Error adding question:", err);
    }
  };

  return (
    <div className="bg-white p-6 m-10 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between mb-6 relative">
        {/* Go Back Button Fixed to Left */}
        <button
          className="absolute left-0 bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 transition"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>

        {/* Centered Heading */}
        <h3 className="text-2xl font-semibold text-gray-800 w-full text-center">
          Add Question
        </h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Box Number */}
        <div>
          <label className="block text-gray-700 font-medium">Box Number</label>
          <input
            type="number"
            {...register("boxNumber", { required: "Box Number is required" })}
            placeholder="Enter Box Number"
            className="w-full p-2 border rounded cursor-not-allowed"
            defaultValue={1}
            disabled
          />
          {errors.boxNumber && (
            <p className="text-red-500 text-sm">{errors.boxNumber.message}</p>
          )}
        </div>

        {/* Question */}
        <div>
          <label className="block text-gray-700 font-medium">Question</label>
          <input
            type="text"
            {...register("question", { required: "Question is required" })}
            placeholder="Enter Question"
            className="w-full p-2 border rounded"
          />
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question.message}</p>
          )}
        </div>

        {/* Answer */}
        <div>
          <label className="block text-gray-700 font-medium">Answer</label>
          <input
            type="text"
            {...register("answer", { required: "Answer is required" })}
            placeholder="Enter Answer"
            className="w-full p-2 border rounded"
          />
          {errors.answer && (
            <p className="text-red-500 text-sm">{errors.answer.message}</p>
          )}
        </div>

        {/* Review Date */}
        <div>
          <label className="block text-gray-700 font-medium">Review Date</label>
          <input
            type="date"
            {...register("reviewDate", { required: "Review Date is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.reviewDate && (
            <p className="text-red-500 text-sm">{errors.reviewDate.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Question"}
        </button>
      </form>
    </div>
  );
}
