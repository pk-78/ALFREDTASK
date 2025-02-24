import React, { useState, useEffect } from "react";
import axios from "axios";
import url from "../service/url";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";

export default function FlashCard() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(id);
  const boxNumbers = ["1", "2", "3"];

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${url}/card/getcards/${id}`); // Adjust URL as needed
        setCards(response.data.cards.cards);
        // console.log(response.data.cards.cards);
      } catch (err) {
        setError("Failed to fetch cards");
        console.error(err);
      }
    };

    fetchCards();
  }, []);

  const cardCounts = cards.reduce((acc, card) => {
    acc[card.boxNumber] = (acc[card.boxNumber] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-4 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center">
      <div className="flex items-center justify-between mb-4 relative w-full max-w-6xl">
        {/* Add Questions Button Fixed to Left */}
        <button
          className="absolute right-0 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => navigate(`/addQuestion/${id}`)}
        >
          + Add Questions
        </button>

        {/* Centered Heading */}
        <h2 className="text-3xl font-extrabold text-white w-full text-center">
          FlashCards
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full max-w-6xl h-96">
        {boxNumbers.map((box) => (
          <div
            key={box}
            className="bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform relative"
          >
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
              Box {box}
            </h3>
            {box === "1" ? (
              <div>Today</div>
            ) : box === "2" ? (
              <div>Open on Tuesday</div>
            ) : (
              <div>Open on Friday</div>
            )}

            {cardCounts[box] !== 0 ? (
              cards
                .filter((card) => card.boxNumber === box)
                .slice(0, 1)
                .map((card) => (
                  <h4 key={card.id}>
                    <Card card={card} setCards={setCards} cards={cards} />
                  </h4>
                ))
            ) : (
              <div>No flashcard left</div>
            )}

            {
              <p className="text-gray-600 text-center pt-3 absolute bottom-3">
                You have {cardCounts[box] || 0} flashcards left .
              </p>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
