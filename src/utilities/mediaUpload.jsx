import { createClient } from "@supabase/supabase-js";
const annonkey = "sb_publishable_xzmEbE1WTlbcOr97Xi1Bow_ONuPOKpc";
const supabaseUrl = "https://mjcnuxxxpomastvyvogi.supabase.co";

const supabase = createClient(supabaseUrl, annonkey)

//    function uploadImage(){
//         supabase.storage.from('images').upload(file.name, file, {
//             upsert: false,
//             cacheControl: '3600',
//         }).then(
//             ()=>{
//                 const publicUrl = supabase.storage.from('images').getPublicUrl(file.name);
//                 console.log(publicUrl);
//             }
//         )
//     }

    export default function mediaUpload(file){
        return new Promise(
            (resolve, reject)=>{
                if(file == null){
                    reject("No file selected");
                }else{
                    const timestamp = new Date().getTime();
                    const fileName = timestamp + file.name
                    supabase.storage.from('images').upload(fileName, file, {
                        upsert: false,
                        cacheControl: '3600',
                    }).then(
                        ()=>{
                            const publicUrl = supabase.storage.from('images').getPublicUrl(fileName);
                            resolve(publicUrl);
                        }
                    ).catch(
                        (error)=>{
                            reject(error);
                        }
                    )
                }
            }
        )
    }