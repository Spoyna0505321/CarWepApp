import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userService } from "../services/userService";

export default function QrScannerPage() {

    const navigate = useNavigate();

    const [status, setStatus] =
        useState("Place the QR code inside the frame.");

    async function handleScan(results: any[]) {

        if (!results.length) return;

        const qr = results[0].rawValue;

        setStatus("Vehicle Found");

        console.log(qr);

        
        await userService.setCarModelName({
            carModelName: qr
        });
        

        setTimeout(() => {
            navigate("/home");
        }, 1500);

    }

    return (

        <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

            <div className="w-full max-w-md">

                <button
                    onClick={() => navigate(-1)}
                    className="text-gray-400 hover:text-white transition uppercase tracking-widest text-xs mb-8"
                >
                    ← Back
                </button>

                <div className="text-center">

                    <h1 className="text-2xl font-bold tracking-[0.35em] uppercase font-mono">
                        NEXUS
                    </h1>

                    <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mt-2">
                        Connect Vehicle
                    </p>

                </div>

                <div className="mt-10 rounded-3xl bg-white/[0.03] border border-white/10 p-6">

                    <div className="rounded-2xl overflow-hidden">

                        <Scanner

                            constraints={{
                                facingMode: "environment"
                            }}

                            onScan={handleScan}

                            onError={(e) => console.log(e)}

                        />

                    </div>

                    <div className="mt-6 flex items-center justify-center gap-2">

                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

                        <p className="text-xs uppercase tracking-widest text-gray-400">
                            {status}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}