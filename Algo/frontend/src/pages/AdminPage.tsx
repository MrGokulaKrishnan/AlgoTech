import { BarChart3, BookPlus, CirclePlus, ClipboardPlus, Save } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createAlgorithm, createQuizQuestion, createTopic, getAdminStats, getAlgorithms, getTopics, updateAlgorithm } from "../services/content";
import type { AlgorithmInput, AlgorithmRecord, QuizQuestionInput, Topic, TopicInput, UserStats } from "../types/content";

type AdminPanel = "topic" | "algorithm" | "quiz";

const emptyTopic = (order = 0): TopicInput => ({ slug: "", name: "", description: "", difficulty: "Beginner", estimatedMinutes: 120, sortOrder: order });
const emptyAlgorithm = (topicId = 0): AlgorithmInput => ({ slug: "", name: "", category: "Searching", difficulty: "Beginner", description: "", bestComplexity: "O(1)", averageComplexity: "O(n)", worstComplexity: "O(n)", spaceComplexity: "O(1)", language: "Java", sourceCode: "", topicId });
const emptyQuestion = (topicId = 0): QuizQuestionInput => ({ topicId, type: "MULTIPLE_CHOICE", questionText: "", explanation: "", options: [{ text: "", correct: true }, { text: "", correct: false }, { text: "", correct: false }, { text: "", correct: false }] });

export const AdminPage = () => {
  const { user, token } = useAuth();
  const [panel, setPanel] = useState<AdminPanel>("topic");
  const [topics, setTopics] = useState<Topic[]>([]);
  const [algorithms, setAlgorithms] = useState<AlgorithmRecord[]>([]);
  const [stats, setStats] = useState<UserStats>();
  const [topicForm, setTopicForm] = useState<TopicInput>(emptyTopic());
  const [algorithmForm, setAlgorithmForm] = useState<AlgorithmInput>(emptyAlgorithm());
  const [questionForm, setQuestionForm] = useState<QuizQuestionInput>(emptyQuestion());
  const [editingAlgorithmId, setEditingAlgorithmId] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();

  const load = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const [availableTopics, availableAlgorithms, adminStats] = await Promise.all([getTopics(), getAlgorithms(), getAdminStats(token)]);
      setTopics(availableTopics);
      setAlgorithms(availableAlgorithms);
      setStats(adminStats);
      setAlgorithmForm((form) => form.topicId ? form : emptyAlgorithm(availableTopics[0]?.id ?? 0));
      setQuestionForm((form) => form.topicId ? form : emptyQuestion(availableTopics[0]?.id ?? 0));
    } catch {
      setError("The admin API is unavailable. Start the backend and sign in with an ADMIN account.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { void load(); }, [token]);

  if (user?.role !== "ADMIN") return <section className="mx-auto max-w-3xl px-4 py-20 text-center"><h1 className="text-3xl font-black">Admin access required</h1><p className="mt-3 text-muted">This area is limited to accounts with the ADMIN role.</p></section>;

  const saveTopic = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) return;
    setIsSaving(true); setError(undefined); setMessage(undefined);
    try {
      await createTopic(token, topicForm);
      setMessage("Topic created.");
      setTopicForm(emptyTopic(topics.length + 1));
      await load();
    } catch { setError("The topic could not be saved. Check the fields and try again."); }
    finally { setIsSaving(false); }
  };

  const selectAlgorithm = (id: number) => {
    const selected = algorithms.find((algorithm) => algorithm.id === id);
    if (!selected) {
      setEditingAlgorithmId(undefined);
      setAlgorithmForm(emptyAlgorithm(topics[0]?.id ?? 0));
      return;
    }
    const { id: ignored, ...form } = selected;
    setEditingAlgorithmId(ignored);
    setAlgorithmForm(form);
  };

  const saveAlgorithm = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) return;
    setIsSaving(true); setError(undefined); setMessage(undefined);
    try {
      if (editingAlgorithmId) await updateAlgorithm(token, editingAlgorithmId, algorithmForm);
      else await createAlgorithm(token, algorithmForm);
      setMessage(editingAlgorithmId ? "Algorithm updated." : "Algorithm created.");
      setEditingAlgorithmId(undefined);
      setAlgorithmForm(emptyAlgorithm(topics[0]?.id ?? 0));
      await load();
    } catch { setError("The algorithm could not be saved. Check the fields and try again."); }
    finally { setIsSaving(false); }
  };

  const saveQuestion = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) return;
    setIsSaving(true); setError(undefined); setMessage(undefined);
    try {
      await createQuizQuestion(token, questionForm);
      setMessage("Quiz question created.");
      setQuestionForm(emptyQuestion(topics[0]?.id ?? 0));
      await load();
    } catch { setError("The quiz question could not be saved. Mark one correct option and complete every field."); }
    finally { setIsSaving(false); }
  };

  const updateOption = (index: number, patch: Partial<QuizQuestionInput["options"][number]>) => setQuestionForm((form) => ({ ...form, options: form.options.map((option, optionIndex) => optionIndex === index ? { ...option, ...patch } : patch.correct ? { ...option, correct: false } : option) }));
  const fieldClass = "rounded-xl border border-emerald-950 bg-black px-3.5 py-2.5 text-white placeholder-zinc-600 focus:border-emerald-500 focus:outline-none";

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 bg-black">
      <p className="eyebrow">Content Management</p>
      <h1 className="mt-3 text-4xl font-black text-white">Admin Dashboard</h1>
      <p className="mt-2 text-zinc-400">Add learning content, edit algorithm details, and create quiz questions.</p>

      {isLoading ? (
        <p className="mt-8 text-zinc-500">Loading dashboard…</p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <article className="panel p-6 border-emerald-950/80 bg-black">
              <BarChart3 className="text-emerald-400" size={22} />
              <p className="mt-4 text-xs font-semibold text-zinc-400">Registered Users</p>
              <p className="mt-1 text-3xl font-black text-white">{stats?.totalUsers ?? 0}</p>
            </article>
            <article className="panel p-6 border-emerald-950/80 bg-black">
              <BookPlus className="text-teal-400" size={22} />
              <p className="mt-4 text-xs font-semibold text-zinc-400">Saved Progress Records</p>
              <p className="mt-1 text-3xl font-black text-white">{stats?.totalProgressRecords ?? 0}</p>
            </article>
            <article className="panel p-6 border-emerald-950/80 bg-black">
              <ClipboardPlus className="text-amber-400" size={22} />
              <p className="mt-4 text-xs font-semibold text-zinc-400">Quiz Attempts</p>
              <p className="mt-1 text-3xl font-black text-white">{stats?.totalQuizAttempts ?? 0}</p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap gap-2 border-b border-emerald-950 pb-4">
            {(["topic", "algorithm", "quiz"] as AdminPanel[]).map((item) => (
              <button
                type="button"
                onClick={() => setPanel(item)}
                key={item}
                className={`rounded-xl px-4 py-2 text-xs font-bold capitalize transition-all ${
                  panel === item
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : "bg-black text-zinc-400 border border-emerald-950 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {message && (
            <p className="mt-5 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-sm text-emerald-200">
              {message}
            </p>
          )}
          {error && (
            <p role="alert" className="mt-5 rounded-xl border border-rose-500/30 bg-rose-950/40 p-4 text-sm text-rose-200">
              {error}
            </p>
          )}

          {panel === "topic" && (
            <form onSubmit={saveTopic} className="panel mt-5 grid gap-4 p-6 sm:grid-cols-2 border-emerald-950/80 bg-black">
              <h2 className="sm:col-span-2 text-xl font-bold text-white">Add a Topic</h2>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                Name
                <input
                  required
                  value={topicForm.name}
                  onChange={(event) =>
                    setTopicForm({
                      ...topicForm,
                      name: event.target.value,
                      slug: topicForm.slug || event.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
                    })
                  }
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                Slug
                <input
                  required
                  value={topicForm.slug}
                  onChange={(event) => setTopicForm({ ...topicForm, slug: event.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300 sm:col-span-2">
                Description
                <textarea
                  required
                  value={topicForm.description}
                  onChange={(event) => setTopicForm({ ...topicForm, description: event.target.value })}
                  className={`${fieldClass} min-h-28`}
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                Difficulty
                <select
                  value={topicForm.difficulty}
                  onChange={(event) => setTopicForm({ ...topicForm, difficulty: event.target.value })}
                  className={fieldClass}
                >
                  <option>Foundations</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                Estimated Minutes
                <input
                  required
                  min="0"
                  type="number"
                  value={topicForm.estimatedMinutes}
                  onChange={(event) => setTopicForm({ ...topicForm, estimatedMinutes: Number(event.target.value) })}
                  className={fieldClass}
                />
              </label>
              <button disabled={isSaving} className="button-primary w-fit sm:col-span-2 mt-2">
                <CirclePlus size={17} />
                {isSaving ? "Saving…" : "Create Topic"}
              </button>
            </form>
          )}

          {panel === "algorithm" && (
            <form onSubmit={saveAlgorithm} className="panel mt-5 grid gap-4 p-6 sm:grid-cols-2 border-emerald-950/80 bg-black">
              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-white">{editingAlgorithmId ? "Edit Algorithm" : "Add an Algorithm"}</h2>
                <select
                  value={editingAlgorithmId ?? ""}
                  onChange={(event) => selectAlgorithm(Number(event.target.value))}
                  className={fieldClass}
                >
                  <option value="">New Algorithm</option>
                  {algorithms.map((algorithm) => (
                    <option key={algorithm.id} value={algorithm.id}>
                      {algorithm.name}
                    </option>
                  ))}
                </select>
              </div>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                Name
                <input
                  required
                  value={algorithmForm.name}
                  onChange={(event) => setAlgorithmForm({ ...algorithmForm, name: event.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                Slug
                <input
                  required
                  value={algorithmForm.slug}
                  onChange={(event) => setAlgorithmForm({ ...algorithmForm, slug: event.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                Topic
                <select
                  required
                  value={algorithmForm.topicId}
                  onChange={(event) => setAlgorithmForm({ ...algorithmForm, topicId: Number(event.target.value) })}
                  className={fieldClass}
                >
                  {topics.map((topic) => (
                    <option value={topic.id} key={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                Category
                <input
                  required
                  value={algorithmForm.category}
                  onChange={(event) => setAlgorithmForm({ ...algorithmForm, category: event.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                Difficulty
                <select
                  value={algorithmForm.difficulty}
                  onChange={(event) => setAlgorithmForm({ ...algorithmForm, difficulty: event.target.value })}
                  className={fieldClass}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                Language
                <input
                  required
                  value={algorithmForm.language}
                  onChange={(event) => setAlgorithmForm({ ...algorithmForm, language: event.target.value })}
                  className={fieldClass}
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300 sm:col-span-2">
                Description
                <textarea
                  required
                  value={algorithmForm.description}
                  onChange={(event) => setAlgorithmForm({ ...algorithmForm, description: event.target.value })}
                  className={`${fieldClass} min-h-24`}
                />
              </label>
              <div className="grid grid-cols-2 gap-4 sm:col-span-2 lg:grid-cols-4">
                <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                  Best
                  <input
                    required
                    value={algorithmForm.bestComplexity}
                    onChange={(event) => setAlgorithmForm({ ...algorithmForm, bestComplexity: event.target.value })}
                    className={fieldClass}
                  />
                </label>
                <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                  Average
                  <input
                    required
                    value={algorithmForm.averageComplexity}
                    onChange={(event) => setAlgorithmForm({ ...algorithmForm, averageComplexity: event.target.value })}
                    className={fieldClass}
                  />
                </label>
                <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                  Worst
                  <input
                    required
                    value={algorithmForm.worstComplexity}
                    onChange={(event) => setAlgorithmForm({ ...algorithmForm, worstComplexity: event.target.value })}
                    className={fieldClass}
                  />
                </label>
                <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                  Space
                  <input
                    required
                    value={algorithmForm.spaceComplexity}
                    onChange={(event) => setAlgorithmForm({ ...algorithmForm, spaceComplexity: event.target.value })}
                    className={fieldClass}
                  />
                </label>
              </div>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300 sm:col-span-2">
                Source Code
                <textarea
                  required
                  value={algorithmForm.sourceCode}
                  onChange={(event) => setAlgorithmForm({ ...algorithmForm, sourceCode: event.target.value })}
                  className={`${fieldClass} min-h-44 font-mono text-sm`}
                />
              </label>
              <button disabled={isSaving} className="button-primary w-fit sm:col-span-2 mt-2">
                <Save size={17} />
                {isSaving ? "Saving…" : editingAlgorithmId ? "Save Changes" : "Create Algorithm"}
              </button>
            </form>
          )}

          {panel === "quiz" && (
            <form onSubmit={saveQuestion} className="panel mt-5 grid gap-4 p-6 border-emerald-950/80 bg-black">
              <h2 className="text-xl font-bold text-white">Add a Quiz Question</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                  Topic
                  <select
                    required
                    value={questionForm.topicId}
                    onChange={(event) => setQuestionForm({ ...questionForm, topicId: Number(event.target.value) })}
                    className={fieldClass}
                  >
                    {topics.map((topic) => (
                      <option value={topic.id} key={topic.id}>
                        {topic.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                  Question Type
                  <select
                    value={questionForm.type}
                    onChange={(event) => setQuestionForm({ ...questionForm, type: event.target.value as QuizQuestionInput["type"] })}
                    className={fieldClass}
                  >
                    <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                    <option value="TRUE_FALSE">True / False</option>
                    <option value="OUTPUT_PREDICTION">Output Prediction</option>
                    <option value="COMPLEXITY">Complexity</option>
                  </select>
                </label>
              </div>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                Question Text
                <textarea
                  required
                  value={questionForm.questionText}
                  onChange={(event) => setQuestionForm({ ...questionForm, questionText: event.target.value })}
                  className={`${fieldClass} min-h-24`}
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-zinc-300">
                Explanation After Answer
                <textarea
                  required
                  value={questionForm.explanation}
                  onChange={(event) => setQuestionForm({ ...questionForm, explanation: event.target.value })}
                  className={`${fieldClass} min-h-24`}
                />
              </label>
              <fieldset className="grid gap-3">
                <legend className="text-xs font-bold text-emerald-400">Options — Select exactly one correct answer</legend>
                {questionForm.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      aria-label={`Mark option ${index + 1} correct`}
                      type="radio"
                      checked={option.correct}
                      onChange={() => updateOption(index, { correct: true })}
                      className="accent-emerald-500 h-4 w-4"
                    />
                    <input
                      required
                      value={option.text}
                      onChange={(event) => updateOption(index, { text: event.target.value })}
                      placeholder={`Option ${index + 1}`}
                      className={`${fieldClass} flex-1`}
                    />
                  </div>
                ))}
              </fieldset>
              <button disabled={isSaving} className="button-primary w-fit mt-2">
                <ClipboardPlus size={17} />
                {isSaving ? "Saving…" : "Create Quiz Question"}
              </button>
            </form>
          )}
        </>
      )}
    </section>
  );
};

