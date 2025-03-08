import React from 'react'

function IdoComponent() {
    return (
        <div className='p-[40px_20px] flex flex-col gap-[40px] lg:flex-row items-start lg:p-[40px] font-grotesk text-white '>
            <div className='w-full lg:w-[60%]  p-[10px]'>
                <p className='font-[700] text-[50px]'>SUI DEPIN</p>
                <p className='text-primary text-[18px]'>About SUI DEPIN</p>

                <div className='text-[15px] lg:text-[18px] mt-[20px]'>
                   <p> 1.4 million active users/nodes are powering the SUIDEPIN Ecosystem by sharing their unused internet bandwidth, which SUI DEPIN utilizes to scrape internet data, train AI Agents, and more!</p>
                    <ul className='list-disc px-[20px] mt-[10px]'>
                        <li>⚡  Grant received from Aethir ($3B FDV) for computing power to support our AI infrastructure and ecosystem.</li>
                        <li> ⚡️ Available on the Google Play Store with a 5.0 rating from over 5,000 reviews. The Apple Store and Chrome extensions are under review and are expected to go live this week. The app has been trending for over 2 weeks now in most European countries in the Finance category.</li>
                        <li>⚡️ Revenue Model: SUIDEPIN receives payments from clients in USDT, ensuring a deflationary model. Revenue distribution: 33% is allocated to users, 33% goes to the foundation, 33% is used to buy back and burn $SUIDEPIN tokens, creating a deflationary effect.</li>
                    </ul>



                    <p className='mt-[20px]'> Product</p>
                    <p> SUIDEPIN Ecosystem</p>
                    <p>Modular Data Network</p>
                    <p> A revolutionary network transforming billions of devices into a decentralized powerhouse for AI. It empowers data providers to own, control, and monetize their data, delivering quadrillions of reliable and sourced data points to fuel AI advancements.</p>
                    <ul className='list-disc px-[20px]'>
                        <li>Intensive and Versatile Data</li>
                        <li> Advanced Data Aggregation Algorithms</li>
                        <li>  Data Provenance and Transparency</li>
                        <li> Non-custodial and Portable Data</li>
                    </ul>



                    <p className='mt-[10px]'> Nodes Data Market</p>
                    <p>A scalable ecosystem of nodes allowing individual users to contribute to the evolution of AI. Offers bespoke solutions for enhanced safety and privacy, redefining the web browsing experience with unmatched anonymity and protection.</p>
                    <ul className='list-disc px-[20px]'>
                        <li> Unsurpassed Privacy & Anonymity</li>
                    </ul>
                </div>
                       
            </div>


            <div className='w-full lg:w-[40%] border p-[10px]'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora earum ipsa molestias amet pariatur perferendis assumenda porro eos et omnis illum libero praesentium nemo quae ut voluptas, eius enim dignissimos!
            </div>
        </div>
    );
}

export default IdoComponent
