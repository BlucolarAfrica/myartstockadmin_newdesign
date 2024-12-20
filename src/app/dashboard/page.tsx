import Image from "next/image";
import icon1 from '../../../public/assets/410.png'
import icon2 from '../../../public/assets/Mask group.png'
import icon3 from '../../../public/assets/icon...png'
import icon4 from '../../../public/assets/wallet-02.png'
import { TbCurrencyNaira } from "react-icons/tb";
import { FaNairaSign } from "react-icons/fa6";

export default function Dashboard() {

    return (
    <div className="px-5">
        <div className="grid grid-cols-6 gap-4">
            <div className="col-span-4">
                <div className="flex justify-between pt-10">
                    <div className="grid grid-cols-3 gap-4">
                        <ul className="flex gap-8 justify-between bg-[#F9FCFF] border w-[217px] h-[84px] p-2 rounded-lg  items-center">
                            <li className="flex flex-col text-[#2F4858] text-2xl">
                                <span className="text-[#656565] text-sm">Pending Order</span>
                                {0}
                                <span className="flex item-center text-xs"> <b className="text-green-500">+ 8</b> minutes ago</span>
                            </li>
                            <li>
                                <Image src={icon1} alt="icon1" width={40} quality={100}/>
                            </li>
                        </ul>
                        <ul className="flex gap-8 justify-between bg-[#92FF8840] text-[#1F7617] border w-[217px] h-[84px] p-2 rounded-lg">
                            <li className="flex flex-col text-[#2F4858] text-2xl">
                                <span className="text-[#656565] text-sm">Processed Order</span>
                                {0}
                                <span className="flex item-center text-xs"> <b className="text-green-500">+ 8</b>processed</span>
                            </li>
                            <li>
                                <Image src={icon1} alt="icon1" width={40} quality={100}/>
                            </li>
                        </ul>
                        <ul className="flex gap-8 justify-between bg-[#F9FCFF] border w-[217px] h-[84px] p-2 rounded-lg">
                            <li className="flex flex-col text-[#2F4858] text-2xl">
                                <span className="text-[#656565] text-sm">Sold Assets</span>
                                {0}
                                <span className="flex item-center text-xs"> <b className="text-green-500">+ 8</b>since last month</span>
                            </li>
                            <li>
                                <Image src={icon1} alt="icon1" width={40} quality={100}/>
                            </li>
                        </ul>
                        <ul className="flex gap-8 justify-between bg-[#92FF8840] text-[#1F7617] border w-[217px] h-[84px] p-2 rounded-lg">
                            <li className="flex flex-col text-[#2F4858] text-2xl">
                                <span className="text-[#656565] text-sm">Revenue</span>
                                <span className="flex items-center">
                                    <FaNairaSign size={20} />
                                    22,500
                                    <span className="flex item-center text-xs text-[#E5BF23] bg-[#FCFFAB] rounded ml-1 p-1 px-2">18%</span>
                                </span>
                            </li>
                            <li>
                                <Image src={icon4} alt="icon1" width={40} quality={100}/>
                            </li>
                        </ul>
                        <ul className="flex gap-8 justify-between bg-[#92FF8840] text-[#1F7617] border w-[217px] h-[84px] p-2 rounded-lg">
                            <li className="flex flex-col text-[#2F4858] text-2xl">
                                <span className="text-[#656565] text-sm">Profit</span>
                                <span className="flex items-center">
                                    <FaNairaSign size={20} />
                                    22,500
                                    <span className="flex item-center text-xs text-green-500 bg-green-200 rounded ml-1 p-1 px-2">18%</span>
                                </span>
                            </li>
                            <li>
                                <Image src={icon3} alt="icon1" width={40} quality={100}/>
                            </li>
                        </ul>
                        <ul className="flex gap-4 justify-between bg-[#FD9F9F40] text-[#F42727] border w-[217px] h-[84px] p-2 rounded-lg">
                            <li className="flex flex-col text-[#2F4858] text-2xl">
                                <span className="text-[#656565] text-sm">Withdrawal Request</span>
                                <span className="flex items-center">
                                    0
                                </span>
                                <span className="flex item-center text-xs"> <b className="text-[#A91087]">+ 2 new request</b></span>
                            </li>
                            <li>
                                <Image src={icon2} alt="icon1" width={40} quality={100}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-span-2 border">right</div>
        </div>
    </div>
    );
  }
  