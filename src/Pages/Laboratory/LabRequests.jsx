import React from "react";

export default function LabRequests (){
    return(
        <div className="p-4 text-slate-100">
            <h1 className="text-2xl font-bold mb-2">
                System Audit
            </h1>
            <p className="text-slate-400 text-sm">This Screem monitors all database transaction ,user actions ,and  security changes.</p>
            <div className="mt-6 p-4 bg-slate-950/40 border border-slate-800 rounded-xl text-center text-slate-500 text-sm ">
            No logs recorded
            </div>
        </div>
    )
}