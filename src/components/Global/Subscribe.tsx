// import React from 'react'

function Subscribe() {
  return (
    <div className="flex items-center justify-center p-[20px]">
      <div className="relative w-full lg:w-[70%] p-[20px] grid lg:grid-cols-2 gap-[40px] overflow-hidden group">
        {/* Background angled effect */}
        <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute inset-[2px] bg-[#17043B] clip-path-polygon transition-all duration-300"></span>

        <div className="relative">
          <img src="/sub.svg" alt="" />
        </div>
        <div className="relative">
          <p className="text-[24px] lg:text-[36px] leading-[48px] font-space text-white">Stay Updated with <br className="hidden lg:block" /> DerHex</p>
          <p className="text-[#9E9E9E] font-space text-[14px] lg:text-[18px] mt-[5px] lg:mt-[10px]">Subscribe to stay informed about upcoming token sales, exclusive staking opportunities, and key governance updates.</p>
          <div className="w-full font-space flex items-center mt-[20px] border border-[#9E9E9E66] h-[50px] overflow-hidden">
            <input
              placeholder="Your Email address..."
              className="h-full min-w-[70%] lg:min-w-[75%] px-[10px] outline-none bg-transparent text-white"
              type="text"
            />
            <button className="relative w-full h-full text-white overflow-hidden group-button">
             
              <span className="relative">Join Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscribe