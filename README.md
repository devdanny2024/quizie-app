Quizie - AI-Powered Interview Question Generator
Quizie is a modern web application that leverages the power of generative AI to create tailored interview questions. Users can input a topic, a company name, or both, and receive a custom set of questions to help them prepare for their next job interview with confidence.

✨ Features
AI-Powered Question Generation: Utilizes Google's Gemini Flash model to generate relevant and insightful interview questions.

Customizable Quizzes: Users can specify a topic/skill and a company name to get highly relevant questions.

Variable Length: Choose to generate between 10 and 20 questions per session.

Interview-Focused Content: Questions are designed to cover technical skills, behavioral scenarios, and company-specific knowledge.

Study Aids: Each generated question comes with "Points to Consider" and a "Suggested Approach" to guide the user's preparation.

Sleek, Responsive UI: A clean and modern interface built with Tailwind CSS that works beautifully on all devices.

🚀 Tech Stack
Framework: Next.js (with Pages Router)

Language: TypeScript

Styling: Tailwind CSS

AI Model: Google Gemini API

Deployment: Vercel

🛠️ Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
Node.js (v18.x or later recommended)

npm or yarn

A Google Gemini API Key for local development.

Installation
Clone the repository:

git clone https://github.com/your-username/quizie-app.git
cd quizie-app

Install dependencies:

npm install
# or
# yarn install

Set up environment variables:
Create a file named .env.local in the root of your project and add your Gemini API key:

GEMINI_API_KEY=your_actual_gemini_api_key_here

Run the development server:

npm run dev
# or
# yarn dev

Open http://localhost:3000 with your browser to see the result.

☁️ Deployment
This project is optimized for deployment on Vercel.

Environment Variables on Vercel
To deploy successfully, you must add your Gemini API key to your Vercel project's environment variables:

Go to your project's dashboard on Vercel.

Navigate to Settings > Environment Variables.

Add a new variable with the following details:

Name: GEMINI_API_KEY

Value: your_actual_gemini_api_key_here

Save the variable and redeploy your project for the changes to take effect.
