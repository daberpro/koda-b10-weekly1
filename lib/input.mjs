import { createInterface } from "node:readline/promises";

export async function getInput(question) {
    const inter = createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const result = await inter.question(question);
    inter.close();
    return result;
}