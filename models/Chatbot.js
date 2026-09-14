import mongoose from "mongoose";

const chatbotSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    publicId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    botName: {
      type: String,
      required: true,
      trim: true,
    },

    welcomeMessage: {
      type: String,
      required: true,
      trim: true,
    },

    tone: {
      type: String,
      enum: ["Professional", "Friendly", "Casual", "Helpful"],
      default: "Professional",
    },

    primaryColor: {
      type: String,
      default: "#111827",
    },

    position: {
      type: String,
      enum: ["bottom-right", "bottom-left"],
      default: "bottom-right",
    },
  },
  {
    timestamps: true,
  },
);

const Chatbot =
  mongoose.models.Chatbot || mongoose.model("Chatbot", chatbotSchema);

export default Chatbot;
