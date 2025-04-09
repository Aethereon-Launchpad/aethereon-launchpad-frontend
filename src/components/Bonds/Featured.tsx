import React from 'react'

function FeaturedBonds() {
  return (
    <div className='text-white p-[40px_20px] lg:p-[40px] flex items-center justify-center font-space shadow'>
        <div className='border flex flex-col lg:flex-row items-center rounded-[10px] overflow-hidden  w-full lg:w-[75%] h-full lg:h-[360px]'>
            <div className='w-full lg:w-[65%] border min-h-full p-[10px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, esse inventore! Veritatis porro a odio dolor distinctio odit dolore. Alias, natus nostrum voluptatem est repellendus quos amet rerum facere. Quam.
            </div>
            <div className='w-full lg:w-[35%]  h-full p-[10px]'>
                <p className='font-[600] text-[25px]'>FEATURED BOND</p>
                <p>Script Network is a layer 1 open source live tv platform, protocol and storage network.</p>
                <div className='mt-[5px]'>
                    <p className='font-[500] text-[20px]'>Discount Rate</p>
                    <p>20% to 10%</p>
                </div>
                <div className='mt-[5px]'>
                    <p className='font-[500] text-[20px]'>Vesting Duration</p>
                    <p>10 days to 5 days</p>
                </div>
                <div className='mt-[5px]'>
                    <p className='font-[500] text-[20px]'>Start-End Time</p>
                    <p>25 Mar - 09 Apr</p>
                </div>
                <button className='h-[40px] font-[600] border-primary w-full mt-[20px]  border-[2px]'>
                    Bond Page
                </button>
            </div>
           
        </div>
    </div>
  )
}

export default FeaturedBonds