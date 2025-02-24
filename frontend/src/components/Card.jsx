import axios from "axios";
import React, { useState } from "react";
import url from "../service/url";
import toast from "react-hot-toast";

export default function Card({ card, setCards, cards }) {
  const [ans, setAns] = useState(false);
  const today = new Date();
  const dayIndex = today.getDay();
  console.log(dayIndex);

  const cardNumberHandler = async (newBoxNumber) => {
    try {
      console.log(card._id, "Updating box number to:", newBoxNumber);

      const response = await axios.put(`${url}/card/cardnumberchange`, {
        id: card._id,
        boxNumber: newBoxNumber,
      });

      console.log(response);

      setCards((prevCards) =>
        prevCards.map((c) =>
          c._id === card._id ? { ...c, boxNumber: String(newBoxNumber) } : c
        )
      );
      console.log("checking", cards);
      setAns(false);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteCard = async (id) => {
    console.log(id);
    // console.log(`${url}/card/delete`);
    try {
      const response = await axios.delete(`${url}/card/delete/${id}`);
      console.log(response);

      toast.success("Deleted Successfully");
      setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting");
    }
  };

  return (
    <div className="bg-white p-2 mb-4 mt-2 rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-105">
      <p className="text-lg font-medium text-gray-800 mb-4">
        <span className="font-semibold">Question:</span> {card.question}
      </p>

      {!ans ? (
        <div className="flex justify-between">
          <button
            onClick={() => setAns(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            See Answer
          </button>
          <button
            onClick={() => deleteCard(card._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-lg font-medium text-gray-700">
            <span className="text-green-600 font-semibold">Answer:</span>{" "}
            {card.answer}
          </p>

          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-700 font-medium mb-2">
              Do you remember its meaning?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  Number(card.boxNumber) === 5
                    ? cardNumberHandler(Number(card.boxNumber))
                    : cardNumberHandler(Number(card.boxNumber) + 1);
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  Number(card.boxNumber) === 1
                    ? cardNumberHandler(Number(card.boxNumber))
                    : cardNumberHandler(1);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
