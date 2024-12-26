// import React from 'react'

function Powering() {
  return (
    <div className="p-[40px_20px] font-space flex flex-col items-center justify-center lg:p-[40px]">
      <div className="flex flex-col items-center justify-center py-[40px]">
        <p className="uppercase text-primary text-center">
          Powering tools and integrations from companies all around the world
        </p>
        <div className="flex flex-col lg:flex-row items-center space-y-[30px] lg:space-y-0 lg:space-x-[50px] mt-[20px]">
          <img src="/brave.svg" alt="" />
          <img src="/brave.svg" alt="" />
          <img src="/brave.svg" alt="" />
          <img src="/brave.svg" alt="" />
        </div>
      </div>
      <div className="w-full lg:w-[80%] grid lg:grid-cols-2 text-white gap-[20px] lg:gap-0 mt-[50px] rounded-[10px] overflow-hidden">
        <div className="w-full ">
          <img src="/eye.svg" className="rounded-[10px] lg:rounded-none min-h-full h-full object-cover  " alt="" />
        </div>
        <div className="bg-[#17043B] rounded-[10px] lg:rounded-r-[10px] p-[20px] lg:p-[40px]">
          <img src="/derhex-logo-sm.svg" className="h-[50px]" alt="" />
          <p className="text-[32px] text-[#FAFAFA] leading-[35px] mt-[20px]">
            How to Participate in <br className="hidden lg:block" /> Derhex IDO
          </p>
          <p className="text-[#C4C4C4] mt-[20px]">
            A good place to start is: what is Derhexr? (We’ll give you the brief
            version).Derhex is a platform that connects young projects with
            early community members through initial decentralized offerings or
            IDOs.…
          </p>
          <p className="mt-[20px] text-primary font-[500]">Learn more about</p>
        </div>
      </div>
    </div>
  );
}

export default Powering;
