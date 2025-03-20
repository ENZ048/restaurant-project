import { useState } from "react";
import { marked } from "marked";
import "./AIChef.css";
import Navbar from "../components/Navbar/Navbar";

const AIChef = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResponse = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const userMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");

    const prompt = `You are Marco, a friendly AI Chef. Provide personalized, engaging, and slightly humorous cooking advice. Here’s an example:
      - User: "What can I cook with tomatoes and basil?"
      - Marco: "Ah, a classic combo, my friend! How about a Caprese salad or a fresh homemade pizza sauce? You can even throw them into a pasta for a quick Italian dinner!"
      
      Now, answer the following user query: ${userMessage.content}.`;

    const APIKEY = "AIzaSyBptXu7u5CJl41rrAko64Ire4ZVjsAu3FA";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${APIKEY}`;
    const payload = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log(data);

      if (data) {
        const aiMessage = {
          role: "assistant",
          content: marked.parse(
            data.candidates[0].content.parts[0].text.trim()
          ),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        return "Oops! I couldn't process that. Try asking me something else!";
      }
    } catch (error) {
      console.error("Error fetching response from Gemini API:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error fetching response. Please try again.",
        },
      ]);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="w-screen h-[85vh] ai-page">
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg pt-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            AI Food Expert Marco
          </h2>
          <div className="chat-box h-96 overflow-y-auto p-4 border rounded-lg bg-gray-100">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-yellow-400 self-end text-right"
                    : "bg-orange-400 text-white"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.content }}
              ></div>
            ))}
            {loading && <p className="text-gray-600">Marco is thinking...</p>}
          </div>
          <div className="flex gap-4 mt-4">
            <input
              type="text"
              placeholder="Ask Marco anything about food..."
              className="border p-3 flex-grow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="bg-orange-500 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all"
              onClick={fetchResponse}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIChef;
