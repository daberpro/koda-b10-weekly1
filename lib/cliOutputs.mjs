import { constant } from "../config/constant.mjs";
const { maxTextShowLength } = constant;

export function showMenus({ menus, keranjang}){
    console.log("-".repeat(maxTextShowLength * 4 + 5));
    console.log(
        `|${"No".padEnd(maxTextShowLength)}`
        + `|${"Name".padEnd(maxTextShowLength)}`
        + `|${"Price".toString().padEnd(maxTextShowLength)}`
        + `|${"Total Available".toString().padEnd(maxTextShowLength)}|`
    );
    console.log("-".repeat(maxTextShowLength * 4 + 5));
    menus.forEach((data, i) => {
        console.log(
            `|${(i + 1).toString().padEnd(maxTextShowLength)}`
            + `|${data.name.padEnd(maxTextShowLength)}`
            + `|${data.price.toString().padEnd(maxTextShowLength)}`
            + `|${data.totalAvailable.toString().padEnd(maxTextShowLength)}|`
        );
    });
    console.log("-".repeat(maxTextShowLength * 4 + 5));
    console.log(
        `|${(menus.length + 1).toString().padEnd(maxTextShowLength)}`
        + `|${"Checkout".padEnd(maxTextShowLength * 3 + 2)}|`
    );
    console.log(
        `|${(0).toString().padEnd(maxTextShowLength)}`
        + `|${"Kembali ke opsi utama".padEnd(maxTextShowLength * 3 + 2)}|`
    );
    console.log("-".repeat(maxTextShowLength * 4 + 5));

    if (keranjang.size > 0) {
        console.log("\n Menu yang ada dikeranjang");
        console.log("-".repeat(maxTextShowLength * 4 + 5));
        console.log(
            `|${"No".padEnd(maxTextShowLength)}`
            + `|${"Name".padEnd(maxTextShowLength)}`
            + `|${"Price".toString().padEnd(maxTextShowLength)}`
            + `|${"Jumlah".toString().padEnd(maxTextShowLength)}|`
        );
        console.log("-".repeat(maxTextShowLength * 4 + 5));
        keranjang.forEach((data, i) => {
            console.log(
                `|${(i + 1).toString().padEnd(maxTextShowLength)}`
                + `|${data.name.padEnd(maxTextShowLength)}`
                + `|${data.price.toString().padEnd(maxTextShowLength)}`
                + `|${data.jumlah.toString().padEnd(maxTextShowLength)}|`
            );
        });
        console.log("-".repeat(maxTextShowLength * 4 + 5));
    }
}

export function showHistory({ history }){
    console.log("-".repeat(maxTextShowLength * 6 + 38 + 7));
    console.log(
        `|${"No".padEnd(maxTextShowLength + 7)}`
        + `|${"items".padEnd(30)}`
        + `|${"total".padEnd(maxTextShowLength)}`
        + `|${"bayar".padEnd(maxTextShowLength)}`
        + `|${"kembalian".padEnd(maxTextShowLength)}`
        + `|${"tanggal order".padEnd(maxTextShowLength)}`
        + `|${"jam order".padEnd(maxTextShowLength)}|`
    );
    console.log("-".repeat(maxTextShowLength * 6 + 38 + 7));
    for (let { items, total, bayar, kembalian, tanggalOrder, jamOrder, id } of history) {

        const firstItem = items.at(0);
        console.log(
            `|${id.toString().padEnd(maxTextShowLength + 7)}`
            + `|${`"${firstItem.name}" ${firstItem.jumlah} ${firstItem.price} ${firstItem.total}`.padEnd(30)}`
            + `|${total.toString().padEnd(maxTextShowLength)}`
            + `|${bayar.toString().padEnd(maxTextShowLength)}`
            + `|${kembalian.toString().padEnd(maxTextShowLength)}`
            + `|${tanggalOrder.padEnd(maxTextShowLength)}`
            + `|${jamOrder.padEnd(maxTextShowLength)}|`
        );
        if (items.length > 1) {
            items.forEach((item, index) => {
                if (index === 0) {
                    return;
                }
                console.log(
                    `|${"".toString().padEnd(maxTextShowLength + 7)}`
                    + `|${`"${item.name}" ${item.jumlah} ${item.price} ${item.total}`.padEnd(30)}`
                    + `|${"".padEnd(maxTextShowLength)}`
                    + `|${"".padEnd(maxTextShowLength)}`
                    + `|${"".padEnd(maxTextShowLength)}`
                    + `|${"".padEnd(maxTextShowLength)}`
                    + `|${"".padEnd(maxTextShowLength)}|`
                );
            });
        }
        console.log("-".repeat(maxTextShowLength * 6 + 38 + 7));
    }
}


export function showCheckoutItems({ totalSubItems, total }){
    console.log("");
    console.log("-".repeat(maxTextShowLength * 4 + 5));
    console.log(`${"Menu".padStart(maxTextShowLength)} ${"Jumlah".padStart(maxTextShowLength)} ${"Harga Satuan".padStart(maxTextShowLength)} ${"Total".padStart(maxTextShowLength)}`);
    console.log("-".repeat(maxTextShowLength * 4 + 5));
    for (let { name, jumlah, price, total } of totalSubItems) {
        console.log(`${name.toString().padStart(maxTextShowLength)} ${jumlah.toString().padStart(maxTextShowLength)} ${price.toString().padStart(maxTextShowLength)} ${total.toString().padStart(maxTextShowLength)}`);
    }
    console.log("-".repeat(maxTextShowLength * 4 + 5));
    console.log(`total harga yang harus dibayar: ${total}`);
    console.log("-".repeat(maxTextShowLength * 4 + 5));
}

