import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";
type NoticeCardProps = {
    notice: {
        id: number;
        title: string;
        body: string;
        category: string;
        priority: string;
        publishDate: Date;
    };
    onDeleted?: (id: number) => void;
};

export default function NoticeCard({ notice, onDeleted }: NoticeCardProps){
    const [deleting, setDeleting] = useState(false);
    const formattedDate = new Date(notice.publishDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    async function handleDelete() {
        const confirmDelete = window.confirm("Are you sure you want to delete this notice?");

        if (!confirmDelete) {
            return;
        }

        try {
            setDeleting(true);

            const response = await fetch(`/api/notices/${notice.id}`, {
                method: "DELETE",
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error ?? "Notice delete nahi ho paya.");
            }

            onDeleted?.(notice.id);
        } catch (error) {
            window.alert(error instanceof Error ? error.message : "Kuch galat ho gaya.");
        } finally {
            setDeleting(false);
        }
    }

    return(
        <div className="mx-auto mt-8">
            <div className="flex justify-between items-center mx-6 p-5 bg-[#eeeee4]   ">
                <div >
                    <div className="flex gap-5 items-center"> 
                        <div className="px-2 text-[18px] bg-white rounded-lg">{notice.category}</div>
                        <div className="px-2 text-[18px] bg-[#ec3f3f] rounded-lg text-[#ffffff]">{notice.priority}</div>
                    </div>
                    <div className="mt-2">
                        <h1 className="text-[22px] font-bold  ">{notice.title}</h1>
                        <p className="text-[18px] ">{notice.body}</p>
                    </div>
                    <div className="mt-2"> 
                        <p className="text-[16px]">Date: {formattedDate}</p>
                    </div>
                </div>
                <div>
                    <div className="flex gap-2">
                        <Link href={`/editTopic?id=${notice.id}`} className="px-2  py-2  text-[15px] border-2 rounded-lg flex items-center gap-1"> <MdOutlineEdit className="text-[20px]" /> Edit</Link>
                        <button
                            className="px-2  py-2 text-red-500 text-[15px] border-2 rounded-lg flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-60"
                            onClick={handleDelete}
                            disabled={deleting}
                            type="button"
                        >
                            <RiDeleteBinLine /> {deleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}