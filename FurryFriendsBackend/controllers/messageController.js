// src/controllers/messageController.js
import Message from "../model/message.js";

export const sendMessage = async (req, res) => {
  try {
    const { receiver, content } = req.body;
    const sender = req.user.id;

    if (!receiver || !content) {
      return res
        .status(400)
        .json({ error: "Receiver and content are required." });
    }

    const newMessage = new Message({ sender, receiver, content });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessagesBetween = async (req, res) => {
  try {
    const { userId } = req.params; // the other user's id in the conversation
    const currentUserId = req.user.id;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId },
      ],
    }).sort({ createdAt: 1 }); // sorted in ascending order

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
