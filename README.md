# ChatSupportAI — AI-Powered Customer Chat Support Platform

ChatSupportAI is a web-based customer support platform that helps businesses provide automated, AI-powered responses to their customers through a customizable chatbot. Businesses can manage their chatbot settings and review conversations from a central dashboard, while visitors can interact with the chatbot directly on the business website.

**Live Demo:** [Open ChatSupportAI](https://chat-support-ai-beige.vercel.app/)

---

## ✨ Features

- **User Authentication** — Sign up, log in, and log out securely.
- **Password Recovery** — Forgot-password and password-reset flow using email.
- **Business Profile Management** — Manage business information used by the chatbot.
- **Chatbot Configuration** — Configure chatbot details and customization options.
- **Embeddable Chat Widget** — Add the chatbot to a business website using the provided embed integration.
- **AI-Powered Responses** — Generate responses using the Google Gemini API.
- **Business Context** — Use configured business information to make chatbot answers more relevant.
- **Conversation Management** — Store and review customer conversations.
- **Dashboard and Settings** — Manage chatbot-related information from a responsive dashboard.
- **Responsive Interface** — Designed to work across desktop and mobile screen sizes.

## 🧰 Tech Stack

| Area | Technologies |
| --- | --- |
| Frontend | Next.js, React, JavaScript, Tailwind CSS |
| Backend | Next.js API Routes, Node.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcryptjs, HTTP-only cookies |
| AI Integration | Google Gemini API |
| Email | Resend |
| Deployment | Vercel |
| Development Tools | Visual Studio Code, Git, GitHub, Thunder Client |

## 🏗️ How It Works

1. A business owner creates an account and signs in.
2. The owner configures business details and chatbot settings.
3. ChatSupportAI stores the required information in MongoDB.
4. The chatbot can be embedded into a website using its integration script.
5. A visitor opens the widget and sends a message.
6. The application uses the Google Gemini API along with the configured business context to generate a response.
7. Conversation data is stored so the business can review customer interactions.

## 🔐 Security Notes

- Passwords are hashed with `bcryptjs`.
- Authentication uses JSON Web Tokens (JWT) stored in an HTTP-only cookie.
- Keep all API keys and credentials on the server.
- Never commit `.env` files or secrets to a public repository.

## ⚙️ Environment Variables

Create a `.env.local` file in the project root and add the environment variables required by your implementation. Typical variable names for this stack may look like the following; **check your source code and use the exact names your application expects**.

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
```

Do not share real credentials in the README or commit them to GitHub.

## 🚀 Run Locally

### Prerequisites

- Node.js version compatible with your Next.js project
- npm
- MongoDB Atlas account or another MongoDB connection configured for the application
- API credentials required by the enabled Gemini and email features

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/9598Naimshaikh/ChatSupportAI.git
   ```

2. Move into the project folder:

   ```bash
   cd ChatSupportAI
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create `.env.local` in the project root and configure the variables your code requires.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To check a production build locally:

```bash
npm run build
npm run start
```

## 📁 Project Structure

This is a high-level overview of a typical Next.js App Router structure. Your exact folders and filenames may differ.

```text
ChatSupportAI/
├── app/
│   ├── api/              # Backend API routes
│   ├── dashboard/        # Dashboard pages
│   ├── ...               # Other pages and route groups
│   ├── layout.jsx        # Root layout and metadata
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
├── lib/                  # Shared utilities and configuration
├── models/               # Mongoose models (if organized separately)
├── public/                # Static assets and chatbot embed resources
├── .env.local             # Local environment variables (do not commit)
├── package.json
└── README.md
```

## 🧪 Testing

API endpoints can be tested during development with Thunder Client or another API client. Also verify the main user flows in the browser, including:

- Account registration and login
- Logout and authenticated dashboard access
- Password recovery and reset
- Business profile and chatbot configuration
- Public chatbot messages and AI responses
- Conversation storage and dashboard review

Record test results based on tests you actually run.

## 🌱 Future Improvements

Potential enhancements include:

- Voice-based customer support
- Knowledge-base file uploads
- More chatbot appearance and behavior controls
- Live handoff from the AI chatbot to a human support agent
- Additional team roles and access controls

## 👨‍💻 Author

**Naeem Shaikh**  
- GitHub: [@9598Naimshaikh](https://github.com/9598Naimshaikh)

## 📄 License

No license has been specified yet. If you want others to reuse, modify, or distribute this project, add a suitable `LICENSE` file and update this section accordingly.
