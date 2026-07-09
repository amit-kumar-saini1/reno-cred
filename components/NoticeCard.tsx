import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";


export default function NoticeCard(){
    return(
        <div className="mx-auto mt-8">
            <div className="flex justify-between items-center mx-6 p-5 bg-[#eeeee4]   ">
                <div >
                    <div className="flex gap-5 items-center"> 
                        <div className="px-2 text-[18px] bg-white rounded-lg">Exam</div>
                        <div className="px-2 text-[18px] bg-[#ec3f3f] rounded-lg text-[#ffffff]">Urgent</div>
                    </div>
                    <div className="mt-2">
                        <h1 className="text-[22px] font-bold  ">Title</h1>
                        <p className="text-[18px] ">Body content goes here.</p>
                    </div>
                    <div className="mt-2"> 
                        <p className="text-[16px]">Date: 2023-06-15</p>
                    </div>
                </div>
                <div>
                    <div className="flex gap-2">
                        <button className="px-2  py-2  text-[15px] border-2 rounded-lg flex items-center gap-1"> <MdOutlineEdit className="text-[20px]" /> Edit</button>
                        <button className="px-2  py-2 text-red-500 text-[15px] border-2 rounded-lg flex items-center gap-1 "> <RiDeleteBinLine /> Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}