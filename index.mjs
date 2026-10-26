import { getInput } from "./lib/input.mjs";
import { observer } from "./lib/observer.mjs";
import { writeFileJson, readFileJson } from "./lib/presistenceData.mjs";
import { constant } from "./config/constant.mjs";
import { showMenus } from "./lib/menus.mjs";
let { HISTORY_FILE_PATH, MAX_TEXT_SHOW_LENGTH, MENU_FILE_PATH, history, keranjang, menus } = constant;


observer.register("update-presistence-data", async (history)=> {
    
    const success = await writeFileJson(HISTORY_FILE_PATH, JSON.stringify(history));
    if(!success){
        console.log("[Error] Gagal mengupdate data presistence!");
        return;
    }

    console.log("Data presistence berhasil di update");

});

observer.register("initialize", async ()=>{
    const menuFromFile = await readFileJson(MENU_FILE_PATH);
    if(!(menuFromFile && Array.isArray(menuFromFile))){
        console.log(`[Error] tidak bisa membaca isi file menu: ${MENU_FILE_PATH}`);
        return false;
    }
    
    const historyFromFile = await readFileJson(HISTORY_FILE_PATH);
    if(!(historyFromFile && Array.isArray(historyFromFile))){
        console.log(`[Error] tidak bisa membaca isi file history: ${HISTORY_FILE_PATH}`);
        return false;
    }

    history = historyFromFile;
    menus = menuFromFile;

    return true;
});

observer.register("history", async () => {
    if (history.length === 0) {
        console.log("History kosong, silahkan pesan menu dan lakukan checkout");
        await observer.emit("tampilkan-opsi");
        return;
    }

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
    await observer.emit("tampilkan-opsi");
});

observer.register("checkout", async () => {
    if (keranjang.size <= 0) {
        console.log("Tidak ada menu dikeranjang, silahkan pilih menu untuk dicheckout");
        observer.emit("tampilkan-opsi");
        return;
    }

    const arrayOfKeranjang = [...keranjang.values()];
    const totalSubItems = arrayOfKeranjang.map((d) => {
        d.total = d.jumlah * d.price;
        return d;
    });
    const total = arrayOfKeranjang
        .reduce(
            (accum, item) => accum + item.jumlah * item.price, 0
        );

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

    const input = await getInput("Masukan jumlah dibayar: ");
    const bayar = Number.parseInt(input);
    if (Number.isNaN(bayar) || bayar < 0) {
        console.log(`Mohon masukan input yang sesuai!, input yang anda masukan "${input}"`);
        observer.emit("checkout");
        return;
    }

    if (bayar < total) {
        console.log("Maaf jumlah yang anda bayar kurang dari total yang harus dibayar");
        observer.emit("checkout");
        return;
    }

    const kembalian = bayar - total;
    if (kembalian > 0) {
        console.log(`Kembalian: ${kembalian}`);
    }

    keranjang.clear();
    history.push(
        {
            items: arrayOfKeranjang,
            total,
            bayar,
            kembalian,
            tanggalOrder: (new Date()).toLocaleDateString(),
            jamOrder: (new Date()).toLocaleTimeString()
        }
    );

    await observer.emit("update-presistence-data", history);
    await observer.emit("tampilkan-opsi");

});

observer.register("tambahkan-menu-ke-keranjang", async (menu) => {
    console.log(`\nNama menu : ${menu.name}, harga: ${menu.price}, jumlah ketersediaan: ${menu.totalAvailable}`);
    if (keranjang.has(menu.id)) {
        console.log(`jumlah menu yang sudah ditambahkan kekeranjang: ${keranjang.get(menu.id).jumlah}`);
    }
    console.log(
        `Opsi:
    c. Untuk membatalkan
`
    );
    const input = await getInput("Masukan jumlah menu yang ingin dipesan atau opsi yang ingin dilakukan: ");
    switch (input.trim()) {
        case "c": {
            await observer.emit("tampilkan-menu");
            break;
        }
        default: {
            const jumlahMenu = Number.parseInt(input);
            if (Number.isNaN(jumlahMenu) || jumlahMenu <= 0) {
                console.log(`Mohon masukan input yang sesuai!, input yang anda masukan "${input}"`);
                await observer.emit("tambahkan-menu-ke-keranjang", menu);
                return;
            }

            if (jumlahMenu > menu.totalAvailable) {
                console.log("Maaf jumlah yang anda pesan melebihi jumlah yang tersedia");
                await observer.emit("tambahkan-menu-ke-keranjang", menu);
                return;
            }

            if (keranjang.has(menu.id)) {
                const k = keranjang.get(menu.id);
                const selisihJumlah = k.jumlah - jumlahMenu;
                menu.totalAvailable += selisihJumlah;

                console.log(`mengubah jumlah "${k.name}" di keranjang dari ${k.jumlah} ke ${jumlahMenu}`);
                k.jumlah = jumlahMenu;
                await observer.emit("tampilkan-menu", menu);
                return;
            }

            menu.totalAvailable -= jumlahMenu;
            keranjang.set(
                menu.id,
                {
                    name: menu.name,
                    id: menu.id,
                    jumlah: jumlahMenu,
                    price: menu.price
                }
            );
            console.log(`menambahkan menu "${menu.name}" sebanyak ${jumlahMenu} ke keranjang`);
            await observer.emit("tampilkan-menu");

        }
    }
});

observer.register("ambil-menu", async () => {
    const input = await getInput(`Masukan pilihan dari 0 - ${menus.length + 1}: `);
    const menuIdx = Number.parseInt(input);
    if (Number.isNaN(menuIdx) || menuIdx < 0 || menuIdx > menus.length + 1) {
        console.log(`Mohon masukan input yang sesuai!, input yang anda masukan "${input}"`);
        await observer.emit("tampilkan-menu");
        return;
    }

    if (menuIdx === 0) {
        observer.emit("tampilkan-opsi");
        return;
    }

    if (menuIdx === menus.length + 1) {
        observer.emit("checkout");
        return;
    }

    await observer.emit("tambahkan-menu-ke-keranjang", menus[menuIdx - 1]);

});

observer.register("ambil-opsi", async () => {
    const input = await getInput("Masukan pilihan dari 1 - 4: ");
    switch (input.trim()) {
        case "1": {
            await observer.emit("tampilkan-menu");
            break;
        }
        case "2": {
            await observer.emit("checkout");
            break;
        }
        case "3": {
            await observer.emit("history");
            break;
        }
        case "4": {
            await console.log("Terimakasih sudah berkunjung");
            break;
        }
        default: {
            console.log(`Mohon masukan input yang sesuai!, input yang anda masukan "${input}"`);
            await observer.emit("tampilkan-opsi");
        }
    }
});

observer.register("tampilkan-menu", async () => {
    showMenus();
    await observer.emit("ambil-menu");
});

observer.register("tampilkan-opsi", async () => {
    const init = await observer.emit("initialize");
    if(!init){
        return;
    }

    console.log(
        `MIELEPAR CLI ORDER
Opsi:
    1. Pesan menu
    2. Checkout
    3. History
    4. Keluar`
    );
    await observer.emit("ambil-opsi");
});


await observer.emit("tampilkan-opsi");
