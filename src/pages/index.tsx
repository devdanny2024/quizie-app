"use client"; // This directive is necessary for using hooks like useState in the App Router

import React, { useState } from 'react';

// Define the structure for a quiz question
interface QuizQuestion {
    question: string;
    options: string[];
    answer: string;
}

// Reusable Icon components
const SparklesIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L13 12l-1.293-1.293a1 1 0 010-1.414L14 7m5 5l2.293 2.293a1 1 0 010 1.414L19 16l-1.293-1.293a1 1 0 010-1.414L20 11m-9.707 9.707a1 1 0 01-1.414 0L7 19l1.293-1.293a1 1 0 011.414 0L11 19m-2-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
);

const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
);

const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
);

const LightbulbIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
);

const CogIcon = () => (
     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 16v-2m8-8h-2M4 12H2m15.364-6.364l-1.414 1.414M6.05 19.95l-1.414-1.414M19.95 19.95l-1.414-1.414M6.05 6.05L4.636 4.636M12 18a6 6 0 100-12 6 6 0 000 12z"></path></svg>
);

const CheckCircleIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);


export default function LandingPage() {
    // State for the mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // State management for the quiz generator
    const [topic, setTopic] = useState('');
    const [company, setCompany] = useState('');
    const [numQuestions, setNumQuestions] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Form submission handler for quiz generation
    const handleGenerateQuiz = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim() && !company.trim()) {
            setError('Please enter a topic or a company name.');
            return;
        }
        if (numQuestions < 10 || numQuestions > 20) {
            setError('Please select a number of questions between 10 and 20.');
            return;
        }

        setIsLoading(true);
        setQuiz(null);
        setError(null);

        try {
            const response = await fetch('/api/generateQuiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic, company, numQuestions }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to generate quiz. Please try again.');
            }

            const data: QuizQuestion[] = await response.json();
            setQuiz(data);

        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white text-gray-800 font-sans">
            <header className="bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#" className="text-2xl font-bold text-gray-900">Quizie</a>
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-600 hover:text-blue-500 transition-colors">Features</a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-blue-500 transition-colors">How It Works</a>
                    </nav>
                    <div className="hidden md:flex items-center space-x-4">
                        <a href="#" className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">Sign Up</a>
                    </div>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
                        <MenuIcon />
                    </button>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden px-6 pb-4">
                        <a href="#features" className="block py-2 text-gray-600 hover:text-blue-500">Features</a>
                        <a href="#how-it-works" className="block py-2 text-gray-600 hover:text-blue-500">How It Works</a>
                        <div className="mt-4 border-t pt-4">
                            <a href="#" className="block text-center mt-2 w-full bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">Sign Up</a>
                        </div>
                    </div>
                )}
            </header>

            <main>
                <section className="pt-32 pb-20 md:pt-40 md:pb-28" style={{background: 'linear-gradient(120deg, #f0f9ff 0%, #e0f2fe 100%)'}}>
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                                Ace Your Next Interview with AI
                            </h1>
                            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                                Enter a topic, a company name, or both to generate tailored questions for your interview prep.
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
                            <form onSubmit={handleGenerateQuiz}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                    <div className="flex flex-col">
                                        <label htmlFor="topic" className="mb-2 font-semibold text-gray-700">Topic / Skill</label>
                                        <input id="topic" type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., 'React Hooks'" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="company" className="mb-2 font-semibold text-gray-700">Company Name</label>
                                        <input id="company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., 'Google'" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label htmlFor="num-questions" className="mb-2 font-semibold text-gray-700 block text-center">Number of Questions</label>
                                    <input id="num-questions" type="number" min="10" max="20" value={numQuestions} onChange={(e) => setNumQuestions(parseInt(e.target.value))} className="w-full max-w-xs mx-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-center" />
                                </div>
                                {error && <p className="text-red-500 text-sm mt-4 text-center h-5">{error}</p>}
                                <button type="submit" disabled={isLoading} className="w-full mt-6 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" style={{background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)'}}>
                                    {isLoading ? <LoadingSpinner /> : <><SparklesIcon />Generate Questions</>}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {quiz && (
                    <section className="py-20 bg-white">
                        <div className="container mx-auto px-6 max-w-3xl">
                            <h2 className="text-3xl font-bold text-center mb-12">Your {numQuestions} Interview Questions</h2>
                            <div className="space-y-6">
                                {quiz.map((item, index) => (
                                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                        <p className="font-semibold text-lg mb-4">{index + 1}. {item.question}</p>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p className="font-semibold text-gray-800">Points to Consider:</p>
                                            <ul className="list-disc list-inside pl-2">
                                                {item.options.map((option, i) => ( <li key={i}>{option}</li> ))}
                                            </ul>
                                        </div>
                                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                                            <p className="text-sm text-green-800 font-semibold">💡 Suggested Approach:</p>
                                            <p className="text-sm text-green-700">{item.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section id="features" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Quizie?</h2>
                            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Everything you need to be fully prepared for any interview question.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-xl border border-gray-200 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
                                <div className="bg-blue-100 text-blue-600 rounded-full h-12 w-12 flex items-center justify-center mb-5"><LightbulbIcon /></div>
                                <h3 className="text-xl font-semibold mb-3">AI-Powered Generation</h3>
                                <p className="text-gray-600">Enter any topic and our AI will create a relevant quiz in seconds.</p>
                            </div>
                            <div className="bg-white p-8 rounded-xl border border-gray-200 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
                                <div className="bg-blue-100 text-blue-600 rounded-full h-12 w-12 flex items-center justify-center mb-5"><CogIcon /></div>
                                <h3 className="text-xl font-semibold mb-3">Customizable Questions</h3>
                                <p className="text-gray-600">Tailor the number of questions to perfectly match your study needs.</p>
                            </div>
                            <div className="bg-white p-8 rounded-xl border border-gray-200 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg">
                                <div className="bg-blue-100 text-blue-600 rounded-full h-12 w-12 flex items-center justify-center mb-5"><CheckCircleIcon /></div>
                                <h3 className="text-xl font-semibold mb-3">Instant Study Material</h3>
                                <p className="text-gray-600">Get instant questions and suggested approaches to accelerate your learning.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="bg-white mt-20">
                    <div className="container mx-auto px-6 py-8 text-center text-gray-500">
                        &copy; 2024 Quizie. All Rights Reserved.
                    </div>
                </footer>
            </main>
        </div>
    );
}
