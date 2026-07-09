export default function EditTopic() {
    return(
        <div className="mx-auto mt-8 flex flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-1 mx-6 p-5 bg-[#eeeee4] justify-between  rounded-2xl">
                <div className="flex flex-col gap-2 mx-auto" >
                    <input className="bg-white px-4 w-[300px] rounded-lg border border-gray-700" type="text" placeholder="Enter title..." />
                    <input className="bg-white px-4 w-[300px] rounded-lg border border-gray-700" type="text" placeholder="Enter topic name..." />
                </div>
                <div className=" my-2 flex flex-col gap-2 md:flex-row mx-auto">
                    <select className="bg-[#8ad2c7] w-[175px] p-2.5 rounded-lg">
                       <option value="">Select Category</option>
                        <option value="">Exam </option>
                        <option value="">Event</option>
                        <option value="">General</option>
                    
                    </select>
                    <select className="bg-[#8ad2c7] w-[175px] p-2.5 ">
                        <option value="">Select Priority</option>
                        <option value="">Normal</option>
                        <option value="">Urgent</option>
                    </select>
                </div>
            </div>
            <button className="w-[150px] mx-auto p-2 bg-blue-400 rounded-2xl text-white text-[22px]">
                Update Topic
            </button>
            
        </div>
    )
}
