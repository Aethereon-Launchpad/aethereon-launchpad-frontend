import { getContractAddress as getWebContractAddress, setCurrentChainId as setWebCurrentChainId } from "../../utils/source";

export function getContractAddress(contractName: "stakingPoolFactory" | "drxToken" | "usdToken" | "stakeLock" | "presaleFactory" | "airdropFactory" | "bondFactory" | "owner") {
  return getWebContractAddress(contractName);
}

export function setCurrentChainId(chainId: "84532" | "57054" | "11155931") {
  return setWebCurrentChainId(chainId);
}
