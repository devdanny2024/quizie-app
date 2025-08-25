# Quizie - AI-Powered Interview Question Generator

Quizie is a modern web application that leverages the power of generative AI to create tailored interview questions.  
Users can input a topic, a company name, or both, and receive a custom set of questions to prepare for their next job interview with confidence.

---

## ✨ Features

- AI-Powered Question Generation – Generates relevant and insightful interview questions using Google's Gemini Flash model.  
- Customizable Quizzes – Specify a topic/skill and a company name for tailored results.  
- Variable Length – Choose between 10 and 20 questions per session.  
- Interview-Focused Content – Covers technical skills, behavioral scenarios, and company-specific knowledge.  
- Study Aids – Each question includes "Points to Consider" and a "Suggested Approach" to guide preparation.  
- Sleek, Responsive UI – Built with Tailwind CSS for a clean, modern interface that works seamlessly on all devices.  

---

## 🚀 Tech Stack

- Framework: Next.js (Pages Router)  
- Language: TypeScript  
- Styling: Tailwind CSS  
- AI Model: Google Gemini API  
- Deployment: Vercel  

---

## 🛠️ Getting Started

Follow these steps to run Quizie locally for development and testing.

### Prerequisites
- Node.js (v18.x or later recommended)  
- npm or yarn  
- A Google Gemini API Key  

### Installation

# Clone the repository
git clone https://github.com/your-username/quizie-app.git
cd quizie-app

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
# Create a file named .env.local in the root of your project and add:
echo "GEMINI_API_KEY=your_actual_gemini_api_key_here" >> .env.local

# Run the development server
npm run dev
# or
yarn dev

# Open your browser at:
# http://localhost:3000

---

## ☁️ Deployment (Vercel)

This project is optimized for deployment on Vercel.  

# Steps:
# 1. Go to your project’s dashboard on Vercel.
# 2. Navigate to Settings > Environment Variables.
# 3. Add the variable:
#    Name: GEMINI_API_KEY
#    Value: your_actual_gemini_api_key_here
# 4. Save and redeploy your project.

---

## 📄 License
Licensed under the MIT License – feel free to use and modify.  

---

## 👨‍💻 Contributing
Contributions are welcome! Please open issues or submit pull requests to improve Quizie.  
