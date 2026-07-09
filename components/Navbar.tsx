import Link from "next/link";

export default function Navbar(){
    return(
        <nav className="mt-4 px-4">
            <div className="flex justify-between items-center mx-auto  w-full p-5 bg-[#8ad2c7]">
                <Link href={"/"} className="text-white font-bold text-[25px]"> Reno Platform</Link>
                <Link href={"/addTopic"} className="text-[#3ab8a6] p-2 font-bold rounded-[10px] bg-white">Add Topic</Link>
            </div>
        </nav>
    )
}