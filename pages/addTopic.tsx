import { useState, type FormEvent } from "react";

export default function AddTopic() {
    const [title, setTitle] = useState("");
    const [topicName, setTopicName] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [message, setMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setMessage("");
        setIsSaving(true);

        try {
            const response = await fetch("/api/addTopic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, topicName, category, priority }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error ?? "Topic save nahi ho saka.");
            }

            setMessage("Topic successfully Supabase me save ho gaya.");
            setTitle("");
            setTopicName("");
            setCategory("");
            setPriority("");
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Kuch galat ho gaya.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <form className="mx-auto mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-1 mx-6 p-5 bg-[#eeeee4] justify-between rounded-2xl">
                <div className="flex flex-col gap-2 mx-auto">
                    <input
                        className="bg-white px-4 w-75 rounded-lg border border-gray-700"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title..."
                        required
                    />
                    <input
                        className="bg-white px-4 w-75 rounded-lg border border-gray-700"
                        type="text"
                        value={topicName}
                        onChange={(e) => setTopicName(e.target.value)}
                        placeholder="Enter topic name..."
                        required
                    />
                </div>
                <div className="my-2 flex flex-col gap-2 md:flex-row mx-auto">
                    <select
                        className="bg-[#8ad2c7] w-43.75 p-2.5 rounded-lg"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Exam">Exam</option>
                        <option value="Event">Event</option>
                        <option value="General">General</option>
                    </select>
                    <select
                        className="bg-[#8ad2c7] w-43.75 p-2.5"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        <option value="">Select Priority</option>
                        <option value="Normal">Normal</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                </div>
            </div>

            {message ? <p className="mx-6 text-center text-sm font-medium text-gray-700">{message}</p> : null}

            <button
                type="submit"
                disabled={isSaving}
                className="w-37.5 mx-auto p-2 bg-blue-400 rounded-2xl text-white text-[22px] disabled:cursor-not-allowed disabled:opacity-70"
            >
                {isSaving ? "Saving..." : "Save"}
            </button>
        </form>
    );
}