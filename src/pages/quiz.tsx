import React, { useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

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

const QuizPage: NextPage = () => {
    // State management for form inputs and UI
    const [topic, setTopic] = useState('');
    const [company, setCompany] = useState('');
    const [numQuestions, setNumQuestions] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Form submission handler
    const handleGenerateQuiz = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation logic
        if (!topic.trim() && !company.trim()) {
            setError('Please enter a topic or a company name.');
            return;
        }
        if (numQuestions < 10 || numQuestions > 20) {
            setError('Please select a number of questions between 10 and 20.');
            return;
        }

        // Reset UI for generation
        setIsLoading(true);
        setQuiz(null);
        setError(null);

        // Simulate an API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock data generation based on user input
        const mockQuizData: QuizQuestion[] = [];
        const questionTemplates = [
             {
                question: `What is a behavioral question ${company || 'a tech company'} might ask regarding teamwork?`,
                options: ['Hint: Use the STAR method.', 'Talk about a specific project.', 'Focus on conflict resolution.'],
                answer: 'Provide a specific example of a time you successfully collaborated on a challenging project.',
            },
            {
                question: `How would you explain ${topic || 'your main skill'} to a non-technical interviewer at ${company || 'the company'}?`,
                options: ['Hint: Use analogies.', 'Avoid jargon.', 'Focus on business value.'],
                answer: 'Focus on simplifying the concept and highlighting its benefits.',
            },
            {
                question: `Describe a project where you used ${topic || 'a relevant technology'}. What was the outcome?`,
                options: ['Hint: Quantify the outcome if possible.', 'Show self-reflection.', 'What would you do differently?'],
                answer: 'Clearly describe the project, the positive result, and a point about future improvement.',
            },
             {
                question: `Why are you interested in working for ${company || 'our company'}?`,
                options: ['Hint: Mention company values.', 'Relate to their products.', 'Show genuine enthusiasm.'],
                answer: 'Connect your personal career goals and values with the company\'s mission and recent achievements.',
            },
            {
                question: `Where do you see yourself in 5 years, in relation to ${topic || 'your field'}?`,
                options: ['Hint: Show ambition.', 'Be realistic.', 'Align with potential growth at the company.'],
                answer: 'Describe a path of growth that shows you are committed to the field and see a future with the company.',
            }
        ];

        for (let i = 0; i < numQuestions; i++) {
            const template = questionTemplates[i % questionTemplates.length];
            mockQuizData.push({
                ...template,
                question: `${template.question} (Question ${i + 1})`
            });
        }

        setQuiz(mockQuizData);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" legacyBehavior>
                        <a className="text-2xl font-bold text-gray-900">Quizie</a>
                    </Link>
                    <a href="#" className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
                        My Quizzes
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-12 md:py-20">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Generate Interview Questions</h1>
                    <p className="mt-4 text-gray-600">
                        Enter a topic, a company name, or both to generate tailored questions for your interview prep.
                    </p>
                </div>

                {/* Quiz Generation Form */}
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
                    <form onSubmit={handleGenerateQuiz}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                            <div className="flex flex-col">
                                <label htmlFor="topic" className="mb-2 font-semibold text-gray-700">
                                    Topic / Skill
                                </label>
                                <input
                                    id="topic"
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g., 'React Hooks'"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>
                             <div className="flex flex-col">
                                <label htmlFor="company" className="mb-2 font-semibold text-gray-700">
                                    Company Name
                                </label>
                                <input
                                    id="company"
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="e.g., 'Google'"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                />
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            <label htmlFor="num-questions" className="mb-2 font-semibold text-gray-700 block text-center">Number of Questions</label>
                            <input 
                                id="num-questions"
                                type="number"
                                min="10"
                                max="20"
                                value={numQuestions}
                                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                                className="w-full max-w-xs mx-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-center"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm mt-4 text-center h-5">{error}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-6 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)'}}
                        >
                            {isLoading ? <LoadingSpinner /> : <><SparklesIcon />Generate Questions</>}
                        </button>
                    </form>
                </div>

                {/* Display Generated Quiz */}
                {quiz && (
                    <div className="max-w-3xl mx-auto mt-12">
                        <h2 className="text-2xl font-bold text-center mb-8">
                            Your {numQuestions} Interview Questions
                        </h2>
                        <div className="space-y-6">
                            {quiz.map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                    <p className="font-semibold text-lg mb-4">{index + 1}. {item.question}</p>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <p className="font-semibold text-gray-800">Points to Consider:</p>
                                        <ul className="list-disc list-inside pl-2">
                                            {item.options.map((option, i) => (
                                                <li key={i}>{option}</li>
                                            ))}
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
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white mt-20">
                <div className="container mx-auto px-6 py-8 text-center text-gray-500">
                    &copy; 2024 Quizie. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

export default QuizPage;
