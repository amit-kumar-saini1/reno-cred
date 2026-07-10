import NoticeCard from "@/components/NoticeCard";
import { useEffect, useState } from "react";

type NoticeItem = {
  id: number;
  title: string;
  body: string;
  category: string;
  priority: string;
  publishDate: string;
};

export default function Home() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNotices() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/notices");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error ?? "Notices load nahi ho paye.");
        }

        setNotices(result.notices ?? []);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Kuch galat ho gaya.");
      } finally {
        setLoading(false);
      }
    }

    loadNotices();
  }, []);

  return (
    <div>
      {loading ? <p className="mx-6 mt-8">Loading...</p> : null}
      {error ? <p className="mx-6 mt-8 text-red-500">{error}</p> : null}
      {notices.map((notice) => (
        <NoticeCard
          key={notice.id}
          notice={{
            ...notice,
            publishDate: new Date(notice.publishDate),
          }}
          onDeleted={(deletedId) => {
            setNotices((current) => current.filter((noticeItem) => noticeItem.id !== deletedId));
          }}
        />
      ))}
    </div>
  );
}
