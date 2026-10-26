import { constant } from "../config/constant.mjs";
const { MAX_TEXT_SHOW_LENGTH, keranjang, menus } = constant;

export function showMenus(){
    console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));
    console.log(
        `|${"No".padEnd(MAX_TEXT_SHOW_LENGTH)}`
        + `|${"Name".padEnd(MAX_TEXT_SHOW_LENGTH)}`
        + `|${"Price".toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
        + `|${"Total Available".toString().padEnd(MAX_TEXT_SHOW_LENGTH)}|`
    );
    console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));
    menus.forEach((data, i) => {
        console.log(
            `|${(i + 1).toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${data.name.padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${data.price.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${data.totalAvailable.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}|`
        );
    });
    console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));
    console.log(
        `|${(menus.length + 1).toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
        + `|${"Checkout".padEnd(MAX_TEXT_SHOW_LENGTH * 3 + 2)}|`
    );
    console.log(
        `|${(0).toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
        + `|${"Kembali ke opsi utama".padEnd(MAX_TEXT_SHOW_LENGTH * 3 + 2)}|`
    );
    console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));

    if (keranjang.size > 0) {
        console.log("\n Menu yang ada dikeranjang");
        console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));
        console.log(
            `|${"No".padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${"Name".padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${"Price".toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${"Jumlah".toString().padEnd(MAX_TEXT_SHOW_LENGTH)}|`
        );
        console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));
        keranjang.forEach((data, i) => {
            console.log(
                `|${(i + 1).toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
                + `|${data.name.padEnd(MAX_TEXT_SHOW_LENGTH)}`
                + `|${data.price.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
                + `|${data.jumlah.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}|`
            );
        });
        console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));
    }
}
