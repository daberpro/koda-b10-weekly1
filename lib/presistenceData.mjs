import * as fs from "node:fs/promises";
import { existsSync } from "node:fs";


export async function readFileJson(filePath){
    if(!existsSync(filePath)){
        console.log("[Error] file tidak ditemukan");
        return false;
    }
    try{
        const file = await fs.readFile(filePath, { encoding: "UTF-8" });
        const convert = JSON.parse(file.toString());
        return convert;
    }
catch(err){
        console.log(`[Error] gagal membaca menu: ${err.message}`);
        return false;
    }
}

export async function writeFileJson(filePath, data){
    if(!existsSync(filePath)){
        console.log("[Error] file tidak ditemukan");
        return false;
    }
    await fs.writeFile(filePath, data);
    return true;
}
