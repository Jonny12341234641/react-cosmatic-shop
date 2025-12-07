import { useState } from "react";
const annonkey = "sb_publishable_xzmEbE1WTlbcOr97Xi1Bow_ONuPOKpc";
const supabaseUrl = "https://mjcnuxxxpomastvyvogi.supabase.co";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(supabaseUrl, annonkey); 


export default function TestPage() {

    // const[count, setCount] = useState(150); 
    // const[status, setStatus] = useState("Online");
    
    const[file, setFile] = useState(null);

    function uploadImage(){
        supabase.storage.from('images').upload(file.name, file, {
            upsert: false,
            cacheControl: '3600',
        }).then(
            ()=>{
                const publicUrl = supabase.storage.from('images').getPublicUrl(file.name);
                console.log(publicUrl);
            }
        )
    }

    return (
        // <div className="w-full h-full flex justify-center items-center">
        //     <div className="w-[500px] h-[500px] bg-amber-100 text-white flex flex-col justify-center items-center gap-[25px]">
        //         <div className="flex justify-center items-center gap-[25px]">
        //         <button onClick={
        //             ()=>{
        //                 console.log("Decreasing it...")
        //                 setCount(count - 1);
        //             }
        //         } className="w-[100px] bg-accent h-[40px] rounded-lg">-</button>
        //         <span className="text-accent text-5xl">{count}</span>
        //         <button onClick={
        //             ()=>{
        //                 console.log("Increasing...")
        //                 setCount(count + 1);
        //             }
        //         } className="w-[100px] bg-accent h-[40px] rounded-lg">+</button>
        //         </div>

        //         <div className="flex flex-col justify-center items-center gap-[20px]">
        //             <span className="text-accent text-5xl">{status}</span>
        //             <div className="flex flex-row justify-center items-center gap-[25px]">
        //                 <button onClick={
        //                     ()=>{
        //                         setStatus("Online");
        //                     }
        //                 } className="w-[100px] bg-accent h-[40px] rounded-lg">Online</button>
                        
        //                 <button onClick={
        //                     ()=>{
        //                         setStatus("Offline");
        //                     }
        //                 } className="w-[100px] bg-accent h-[40px] rounded-lg">Offline</button>

        //                 <button onClick={
        //                     ()=>{
        //                         setStatus("Deactivated");
        //                     }
        //                 } className="w-[100px] bg-accent h-[40px] rounded-lg">Deactivated</button>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="w-full h-full flex justify-center items-center">
            <input type="file" onChange={
                (e)=>{
                    setFile(e.target.files[0])
                }
            }/>
            <button className="bg-blue-500  w-[100px] h-[40px]" onClick={uploadImage}>Upload</button>
        </div>
    );
}