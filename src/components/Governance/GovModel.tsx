// import React from 'react'

function GovModel() {
  return (
    <div className="font-space p-[40px_20px]  lg:p-[40px] text-white flex justify-center items-center">
      <div className="border border-primary flex flex-col lg:flex-row items-center w-full lg:w-[90%] lg:p-[30px] rounded-[10px]">
        <div className="w-ful lg:w-[40%] flex items-center justify-center">
          <img src="./govmodel.svg" alt="" />
        </div>
        <div className="mt-[20px] flex flex-col items-start lg:mt-0 w-full lg:w-[60%] p-[20px] lg:p-0">
          <p className="text-[25px] lg:text-[40px] font-[700]">
            DAO Governance Model
          </p>
          <hr className="text-white mt-[10px] h-[5px] w-[30%] lg:w-[10%]" />
          <p className="my-[10px]">
            {" "}
            Introduce DerHex’s decentralized governance, where users holding
            $HEX tokens can vote on decisions such as upcoming token launches,
            platform upgrades, or key partnerships.
          </p>
          <div>
            <p className="font-[600]">Benefits for Users</p>
            <p>
              Influence over platform direction and opportunity for community
              engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GovModel;
