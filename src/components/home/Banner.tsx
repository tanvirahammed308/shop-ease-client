import React from "react";
import { AiOutlineSafety } from "react-icons/ai";

import { RiCustomerService2Line, RiRefund2Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";

const Banner = () => {
  return (
    <div className="mt-10">
      <div className="bg-[#0f3460] py-10 px-5 rounded flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0">
        {/* 1st */}
        <div className="flex text-white gap-5 md:border-r ">
          <div>
            <TbTruckDelivery className="text-5xl" />
          </div>
          <div className="pr-2">
            <h1 className="text-2xl">Free Delivery</h1>
            <p>Orders Over $120</p>
          </div>
        </div>
        {/* 2nd */}
        <div className="flex text-white gap-5 md:border-r">
          <div>
            <RiRefund2Line  className="text-5xl" />
          </div>
          <div className="pr-2">
            <h1 className="text-2xl">Get Refund</h1>
            <p>Within 30 Days Returns</p>
          </div>
        </div>
        {/* 3rd */}
        <div className="flex text-white gap-5 md:border-r">
          <div>
            <AiOutlineSafety  className="text-5xl" />
          </div>
          <div className="pr-2">
            <h1 className="text-2xl">Safe Payment</h1>
            <p>100% Secure Payment</p>
          </div>
        </div>
        {/* 4th */}
        <div className="flex text-white gap-5 md:border-r">
          <div>
            <RiCustomerService2Line  className="text-5xl" />
          </div>
          <div className="pr-2">
            <h1 className="text-2xl">24/7 Support</h1>
            <p>Feel Free To Call Us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
