import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type FormState = {
    title: string;
    body: string;
    category: string;
    priority: string;
};

export default function EditTopic() {
    const router = useRouter();
    const id = router.query.id;

    const [form, setForm] = useState<FormState>({
        title: "",
        body: "",
        category: "",
        priority: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function loadNotice() {
            if (!router.isReady) return;

            if (!id) {
                setLoading(false);
                setMessage("Notice id missing hai.");
                return;
            }

            try {
                setLoading(true);
                setMessage("");

                const response = await fetch(`/api/notices/${id}`);
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error ?? "Notice load nahi ho paya.");
                }

                setForm({
                    title: result.notice.title,
                    body: result.notice.body,
                    category: result.notice.category,
                    priority: result.notice.priority,
                });
            } catch (error) {
                setMessage(error instanceof Error ? error.message : "Kuch galat ho gaya.");
            } finally {
                setLoading(false);
            }
        }

        loadNotice();
    }, [id, router.isReady]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!id) {
            setMessage("Notice id missing hai.");
            return;
        }

        try {
            setSaving(true);
            setMessage("");

            const response = await fetch(`/api/notices/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error ?? "Update nahi ho paya.");
            }

            setMessage("Topic successfully update ho gaya.");
            router.push("/");
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Kuch galat ho gaya.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <p className="mx-6 mt-8">Loading...</p>;
    }

    return(
        <form className="mx-auto mt-8 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row gap-1 mx-6 p-5 bg-[#eeeee4] justify-between  rounded-2xl">
                <div className="flex flex-col gap-2 mx-auto" >
                    <input
                        className="bg-white px-4 w-75 rounded-lg border border-gray-700"
                        type="text"
                        placeholder="Enter title..."
                        value={form.title}
                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    />
                    <input
                        className="bg-white px-4 w-75 rounded-lg border border-gray-700"
                        type="text"
                        placeholder="Enter topic name..."
                        value={form.body}
                        onChange={(e) => setForm((prev) => ({ ...prev, body: e.target.value }))}
                    />
                </div>
                <div className=" my-2 flex flex-col gap-2 md:flex-row mx-auto">
                    <select
                        className="bg-[#8ad2c7] w-43.75 p-2.5 rounded-lg"
                        value={form.category}
                        onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    >
                       <option value="">Select Category</option>
                        <option value="Exam">Exam</option>
                        <option value="Event">Event</option>
                        <option value="General">General</option>
                    
                    </select>
                    <select
                        className="bg-[#8ad2c7] w-43.75 p-2.5 "
                        value={form.priority}
                        onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value }))}
                    >
                        <option value="">Select Priority</option>
                        <option value="Normal">Normal</option>
                        <option value="Urgent">Urgent</option>
                    </select>
                </div>
            </div>

            {message ? <p className="mx-6 text-center text-sm font-medium text-gray-700">{message}</p> : null}

            <button
                className="w-37.5 mx-auto p-2 bg-blue-400 rounded-2xl text-white text-[22px] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={saving}
                type="submit"
            >
                {saving ? "Updating..." : "Update Topic"}
            </button>
            
        </form>
    )
}
