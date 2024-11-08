// import React from 'react'

function Footer() {
  return (
    <div className="flex flex-col w-full p-[20px] lg:p-[40px]">
        <div className="bg-[#000508] text-white lg:p-[20px] grid lg:grid-cols-2 gap-[40px]">
            <div>
                <img src="/derhex-logo.svg" className="h-[38px]" alt="" />
                <p className="w-full lg:w-[50%] mt-[20px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, doloremque beatae. Dolorem rerum blanditiis qui quisquam saepe sed, neque asperiores eius tempora dolores suscipit quo possimus earum expedita sequi ducimus?</p>
                </div>
            <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, doloremque beatae. Dolorem rerum blanditiis qui quisquam saepe sed, neque asperiores eius tempora dolores suscipit quo possimus earum expedita sequi ducimus?</div>
        </div>
        <div className="border-t border-t-[#797979] mt-[20px] pt-[20px]">
            <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between text-white">
                <div>loll</div>
                <div>loll</div>
            </div>
        </div>
    </div>
  )
}

export default Footer