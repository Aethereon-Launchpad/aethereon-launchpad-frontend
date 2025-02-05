import {cookieStorage, createStorage} from "wagmi";
import {WagmiAdapter} from "@reown/appkit-adapter-wagmi";
import { mainnet, etherlink} from "@reown/appkit/networks";

export const projectId = import.meta.env.VITE_PROJECT_ID;

if(!projectId) {
  throw new Error('Project ID is required');
}
export const networks = [mainnet, etherlink];

export const wagmiAdapter = new WagmiAdapter({
    projectId,
    networks,
    storage: createStorage({
        storage: cookieStorage,
        key: 'wagmi'
    })
})

export const config = wagmiAdapter.wagmiConfig;

