import { FadeIn, StaggerContainer, StaggerItem } from "../components/Animations";
import { ArrowRight, CheckCircle2, Circle, CircleX, HelpCircle, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getQuizQuestions, getTopics, submitQuizAnswer } from "../services/content";
import type { QuizQuestion, QuizSubmission, Topic } from "../types/content";

export const QuizPage = () => {
  const { token } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicId, setTopicId] = useState<number>();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number>();
  const [result, setResult] = useState<QuizSubmission>();
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let active = true;
    void getTopics()
      .then((availableTopics) => {
        if (!active) return;
        setTopics(availableTopics);
        const defaultTopic = availableTopics.find((topic) => topic.slug === "searching") ?? availableTopics[0];
        setTopicId(defaultTopic?.id);
      })
      .catch(() => { if (active) setError("Quiz lessons are unavailable until the API is running."); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!topicId) return;
    let active = true;
    setIsLoading(true);
    setQuestions([]);
    setCurrentIndex(0);
    setResult(undefined);
    setSelectedOption(undefined);
    setScore(0);
    void getQuizQuestions(topicId)
      .then((quizQuestions) => { if (active) setQuestions(quizQuestions); })
      .catch(() => { if (active) setError("We could not load this quiz. Please try again."); })
      .finally(() => { if (active) setIsLoading(false); });
    return () => { active = false; };
  }, [topicId]);

  const question = questions[currentIndex];
  const submit = async () => {
    if (!token || !question || selectedOption === undefined) return;
    setIsSubmitting(true);
    setError(undefined);
    try {
      const submission = await submitQuizAnswer(token, question.id, selectedOption);
      setResult(submission);
      if (submission.correct) setScore((value) => value + 1);
    } catch {
      setError("We could not record that answer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = () => {
    setCurrentIndex((index) => index + 1);
    setSelectedOption(undefined);
    setResult(undefined);
  };

  const selectedTopic = topics.find((topic) => topic.id === topicId);
  const isComplete = questions.length > 0 && currentIndex >= questions.length;

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 bg-black">
      <FadeIn>
        <p className="eyebrow">Topic Knowledge Check</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-white">Test what you can explain.</h1>
        <p className="mt-3 text-lg text-zinc-400">Short quizzes give immediate feedback and add to your saved learning record.</p>
      </FadeIn>

      <div className="panel mt-8 p-6 sm:p-7 border-emerald-950/80 bg-black">
        <label className="grid max-w-sm gap-1.5 text-xs font-bold text-zinc-300">
          Choose a topic
          <select
            value={topicId ?? ""}
            onChange={(event) => setTopicId(Number(event.target.value))}
            className="rounded-xl border border-emerald-950 bg-zinc-950 px-3.5 py-2.5 font-semibold text-sm text-white focus:border-emerald-500 focus:outline-none"
          >
            {topics.map((topic) => (
              <option value={topic.id} key={topic.id}>
                {topic.name}
              </option>
            ))}
          </select>
        </label>

        {isLoading ? (
          <div className="grid min-h-72 place-items-center text-emerald-400">
            <LoaderCircle className="animate-spin" size={28} />
            <span className="text-sm font-semibold text-zinc-400 mt-2">Loading quiz...</span>
          </div>
        ) : error ? (
          <p role="alert" className="mt-6 rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-sm text-rose-200">
            {error}
          </p>
        ) : isComplete ? (
          <div className="py-14 text-center">
            <CheckCircle2 className="mx-auto text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" size={48} />
            <h2 className="mt-4 text-2xl font-black text-white">Quiz Complete!</h2>
            <p className="mt-2 text-zinc-400">
              You answered <strong className="text-emerald-400 font-mono text-lg">{score}</strong> of <strong className="text-white font-mono text-lg">{questions.length}</strong> correctly.
            </p>
            <Link to="/dashboard" className="button-primary mt-6 inline-flex">
              View Dashboard <ArrowRight size={17} />
            </Link>
          </div>
        ) : question ? (
          <FadeIn className="mt-8">
            <div className="flex items-center justify-between text-xs">
              <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-bold text-emerald-400">
                {selectedTopic?.name ?? "Quiz"}
              </span>
              <span className="font-mono font-bold text-zinc-400">
                Question {currentIndex + 1} / {questions.length}
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-bold leading-9 text-white">{question.questionText}</h2>

            <StaggerContainer className="mt-6 grid gap-3">
              {question.options.map((option) => {
                const isSelected = selectedOption === option.id;
                const isCorrect = result?.correctOptionId === option.id;
                const isWrongSelected = result && isSelected && !result.correct;
                return (
                  <StaggerItem key={option.id}>
                    <button
                      type="button"
                    disabled={Boolean(result)}
                    onClick={() => setSelectedOption(option.id)}
                    className={`flex items-center gap-3.5 rounded-xl border p-4 text-left font-medium transition-all duration-300 hover:scale-[1.02] ${
                      isCorrect
                        ? "border-emerald-500 bg-emerald-500/20 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        : isWrongSelected
                        ? "border-rose-500 bg-rose-500/20 text-rose-100"
                        : isSelected
                        ? "border-emerald-400 bg-emerald-950/60 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : "border-emerald-950 bg-zinc-950 text-zinc-300 hover:border-emerald-800 hover:bg-black"
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="shrink-0 text-emerald-400" />
                    ) : isWrongSelected ? (
                      <CircleX className="shrink-0 text-rose-400" />
                    ) : (
                      <Circle className={`shrink-0 ${isSelected ? "text-emerald-400" : "text-zinc-600"}`} />
                    )}
                    <span>{option.text}</span>
                    </button>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {result && (
              <FadeIn>
                <div
                  className={`mt-6 rounded-xl border p-4.5 ${
                  result.correct
                    ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-100"
                    : "border-amber-500/40 bg-amber-950/40 text-amber-100"
                }`}
              >
                <p className="font-bold text-base">{result.correct ? "Correct — nice work!" : "Not quite — here is the key idea."}</p>
                <p className="mt-2 text-sm leading-7 text-zinc-300">{result.explanation}</p>
                </div>
              </FadeIn>
            )}

            <div className="mt-6 flex justify-end">
              {result ? (
                <button type="button" onClick={next} className="button-primary">
                  {currentIndex === questions.length - 1 ? "See Result" : "Next Question"} <ArrowRight size={17} />
                </button>
              ) : (
                <button type="button" onClick={submit} disabled={selectedOption === undefined || isSubmitting} className="button-primary">
                  {isSubmitting ? "Checking…" : "Check Answer"} <HelpCircle size={17} />
                </button>
              )}
            </div>
          </FadeIn>
        ) : (
          <div className="py-12 text-center text-zinc-500">There are no questions for this topic yet.</div>
        )}
      </div>
    </section>
  );
};

