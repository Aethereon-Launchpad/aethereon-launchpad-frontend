import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Preloader, ThreeDots } from 'react-preloader-icon';


export default function AdminAuthScreen() {
    const { authenticated, login, user, logout } = usePrivy();
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate();
    const ADMIN_WALLET: `0x${string}` = "0x426DcF053185c099cbE05dcb23775544bbEe16d6"


    useEffect(() => {
        setLoading(true)
        if (!user?.wallet?.address) {
            setLoading(false)
            return;
        }

        if (user.wallet.address && user.wallet.address.toLowerCase() === ADMIN_WALLET.toLowerCase()) {
            toast("Successfully Verified Admin")
            logout();
            navigate('/admin/dashboard');
        } else {
            toast("Access Denied ❌")
            logout();
        }


        setLoading(false)
    }, [authenticated])


    return (
        <div className="text-white flex flex-col justify-center items-center min-h-screen gap-3 bg-black text-center">
            <h3 className="font-space text-3xl font-semibold uppercase">
                Welcome User
            </h3>
            <p>Sign in provide access to manage Launchpad Systems</p>
            <button onClick={login} className="bg-primary text-white px-5 py-3 rounded-md">
                {loading ? <Preloader
                    use={ThreeDots}
                    size={60}
                    strokeWidth={6}
                    strokeColor="#5325A9"
                    duration={2000}
                /> : "Connect Wallet"}
            </button>
        </div>
    )
}

