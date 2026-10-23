import { getInput } from "./lib/input.mjs";
import { observer } from "./lib/observer.mjs";

const MAX_TEXT_SHOW_LENGTH = 20;
const menus = [
    {
        id: 0,
        name: "Mie Nampol",
        price: 10000,
        total_available: 10
    },
    {
        id: 1,
        name: "Mie Dower",
        price: 12000,
        total_available: 10
    },
    {
        id: 2,
        name: "Mie Mercon",
        price: 10000,
        total_available: 10
    },
    {
        id: 3,
        name: "Mie Jebew",
        price: 12000,
        total_available: 10
    },
    {
        id: 4,
        name: "Dimsum Ayam",
        price: 12000,
        total_available: 10
    },
    {
        id: 5,
        name: "Ayam Keju",
        price: 13000,
        total_available: 10
    },
    {
        id: 6,
        name: "Pangsit Besar",
        price: 6000,
        total_available: 10
    },
    {
        id: 7,
        name: "Pangsit Kecil",
        price: 6000,
        total_available: 10
    },
    {
        id: 8,
        name: "Ayam kribo",
        price: 12000,
        total_available: 10
    }
];
const keranjang = new Map();
const history = [];

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
    for (let { items, total, bayar, kembalian, tanggal_order, jam_order } of history) {

        const first_item = items.at(0);
        console.log(
            `|${i.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${`"${first_item.name}" ${first_item.jumlah} ${first_item.price} ${first_item.total}`.padEnd(30)}`
            + `|${total.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${bayar.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${kembalian.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${tanggal_order.padEnd(MAX_TEXT_SHOW_LENGTH)}`
            + `|${jam_order.padEnd(MAX_TEXT_SHOW_LENGTH)}|`
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

    const array_of_keranjang = [...keranjang.values()];
    const total_sub_items = array_of_keranjang.map((d) => {
        d.total = d.jumlah * d.price;
        return d;
    });
    const total = array_of_keranjang
        .reduce(
            (accum, item) => accum + item.jumlah * item.price, 0
        );

    console.log("");
    console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));
    console.log(`${"Menu".padStart(MAX_TEXT_SHOW_LENGTH)} ${"Jumlah".padStart(MAX_TEXT_SHOW_LENGTH)} ${"Harga Satuan".padStart(MAX_TEXT_SHOW_LENGTH)} ${"Total".padStart(MAX_TEXT_SHOW_LENGTH)}`);
    console.log("-".repeat(MAX_TEXT_SHOW_LENGTH * 4 + 5));
    for (let { name, jumlah, price, total } of total_sub_items) {
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
            items: array_of_keranjang,
            total,
            bayar,
            kembalian,
            tanggal_order: (new Date()).toLocaleDateString(),
            jam_order: (new Date()).toLocaleTimeString()
        }
    );

    await observer.emit("tampilkan-opsi");

});

observer.register("tambahkan-menu-ke-keranjang", async (menu) => {
    console.log(`\nNama menu : ${menu.name}, harga: ${menu.price}, jumlah ketersediaan: ${menu.total_available}`);
    if (keranjang.has(menu.id)) {
        console.log(`jumlah menu yang sudah ditambahkan kekeranjang: ${keranjang.get(menu.id).jumlah}`);
    }
    console.log(
        `Opsi:
    c. Untuk membatalkan
`
    );
    const input = await getInput(`Masukan jumlah menu yang ingin dipesan atau opsi yang ingin dilakukan: `);
    switch (input.trim()) {
        case "c": {
            await observer.emit("tampilkan-menu");
            break;
        }
        default: {
            const jumlah_menu = Number.parseInt(input);
            if (Number.isNaN(jumlah_menu) || jumlah_menu <= 0) {
                console.log(`Mohon masukan input yang sesuai!, input yang anda masukan "${input}"`);
                await observer.emit("tambahkan-menu-ke-keranjang", menu);
                return;
            }

            if (jumlah_menu > menu.total_available) {
                console.log("Maaf jumlah yang anda pesan melebihi jumlah yang tersedia");
                await observer.emit("tambahkan-menu-ke-keranjang", menu);
                return;
            }

            if (keranjang.has(menu.id)) {
                const k = keranjang.get(menu.id);
                const selisih_jumlah = k.jumlah - jumlah_menu;
                menu.total_available += selisih_jumlah;

                console.log(`mengubah jumlah "${k.name}" di keranjang dari ${k.jumlah} ke ${jumlah_menu}`);
                k.jumlah = jumlah_menu;
                await observer.emit("tampilkan-menu", menu);
                return;
            }

            menu.total_available -= jumlah_menu;
            keranjang.set(
                menu.id,
                {
                    name: menu.name,
                    id: menu.id,
                    jumlah: jumlah_menu,
                    price: menu.price
                }
            );
            console.log(`menambahkan menu "${menu.name}" sebanyak ${jumlah_menu} ke keranjang`);
            await observer.emit("tampilkan-menu");

        }
    }
});

observer.register("ambil-menu", async () => {
    const input = await getInput(`Masukan pilihan dari 0 - ${menus.length + 1}: `);
    const menu_idx = Number.parseInt(input);
    if (Number.isNaN(menu_idx) || menu_idx < 0 || menu_idx > menus.length + 1) {
        console.log(`Mohon masukan input yang sesuai!, input yang anda masukan "${input}"`);
        await observer.emit("tampilkan-menu");
        return;
    }

    if (menu_idx === 0) {
        observer.emit("tampilkan-opsi");
        return;
    }

    if (menu_idx === menus.length + 1) {
        observer.emit("checkout");
        return;
    }

    await observer.emit("tambahkan-menu-ke-keranjang", menus[menu_idx - 1]);

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
            + `|${data.total_available.toString().padEnd(MAX_TEXT_SHOW_LENGTH)}|`
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

    await observer.emit("ambil-menu");

});

observer.register("tampilkan-opsi", async () => {
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
