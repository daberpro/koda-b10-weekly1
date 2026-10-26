import { constant } from "../config/constant.mjs";
const { MAX_TEXT_SHOW_LENGTH } = constant;

export function showMenus({ menus, keranjang}){
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

export function showHistory({ history }){
    console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 6 + 38));
    console.log(
        `|${"No".padEnd(MAX_TEXT_SHOW_LENGTH)}`
        + `|${"items".padEnd(30)}`
        + `|${"total".padEnd(MAX_TEXT_SHOW_LENGTH)}`
        + `|${"bayar".padEnd(MAX_TEXT_SHOW_LENGTH)}`
        + `|${"kembalian".padEnd(MAX_TEXT_SHOW_LENGTH)}`
        + `|${"tanggal order".padEnd(MAX_TEXT_SHOW_LENGTH)}`
        + `|${"jam order".padEnd(MAX_TEXT_SHOW_LENGTH)}|`
    );
    console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 6 + 38));
    let i = 1;
    for (let { items, total, bayar, kembalian, tanggalOrder, jamOrder } of history) {

        const firstItem = items.at(0);
        console.log(
            `|${i.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${`"${firstItem.name}" ${firstItem.jumlah} ${firstItem.price} ${firstItem.total}`.padEnd(30)}`
            + `|${total.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${bayar.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${kembalian.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${tanggalOrder.padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${jamOrder.padEnd(MAX_TEXT_SHOW_LENGTH)}|`
        );
        if (items.length > 1) {
            items.forEach((item, index) => {
                if (index === 0) {
                    return;
                }
                console.log(
                    `|${"".toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
                    + `|${`"${item.name}" ${item.jumlah} ${item.price} ${item.total}`.padEnd(30)}`
                    + `|${"".padEnd(MAX_TEXT_SHOW_LENGTH)}`
                    + `|${"".padEnd(MAX_TEXT_SHOW_LENGTH)}`
                    + `|${"".padEnd(MAX_TEXT_SHOW_LENGTH)}`
                    + `|${"".padEnd(MAX_TEXT_SHOW_LENGTH)}`
                    + `|${"".padEnd(MAX_TEXT_SHOW_LENGTH)}|`
                );
            });
        }
        console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 6 + 38));
        i++;
    }
}


export function showCheckoutItems({ totalSubItems, total }){
    console.log("");
    console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));
    console.log(`${"Menu".padStart(MAX_TEXT_SHOW_LENGTH)} ${"Jumlah".padStart(MAX_TEXT_SHOW_LENGTH)} ${"Harga Satuan".padStart(MAX_TEXT_SHOW_LENGTH)} ${"Total".padStart(MAX_TEXT_SHOW_LENGTH)}`);
    console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));
    for (let { name, jumlah, price, total } of totalSubItems) {
        console.log(`${name.toString().padStart(MAX_TEXT_SHOW_LENGTH)} ${jumlah.toString().padStart(MAX_TEXT_SHOW_LENGTH)} ${price.toString().padStart(MAX_TEXT_SHOW_LENGTH)} ${total.toString().padStart(MAX_TEXT_SHOW_LENGTH)}`);
    }
    console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));
    console.log(`total harga yang harus dibayar: ${total}`);
    console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));
}

