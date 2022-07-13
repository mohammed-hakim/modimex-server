"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsDD = void 0;
let images = [
    [
        'http://drive.google.com/uc?export=view&id=1OXFv7qmqIPwVQi-hHu4g2NKDRyfL8jFP',
    ],
    [
        'http://drive.google.com/uc?export=view&id=1Rc1uOJqZ-TsBs0VJTbu4Syk7e3yyfhel',
    ],
    [
        'http://drive.google.com/uc?export=view&id=1NwLmnu1a6kT-VRmPWNzu__OtH8aBaVRe',
    ],
    [
        'http://drive.google.com/uc?export=view&id=13VTJiYZ45_rzMFJvwY6a7pDL9ctjW0HR',
    ],
    [
        'http://drive.google.com/uc?export=view&id=1G84hAZq6HQkM-IuVZPmIHAhA6mtz_VjR',
    ],
    [
        'http://drive.google.com/uc?export=view&id=1J_JIvI2aafaiLHxX_uQzUAu0cff6ptRi',
    ],
];
let blured = [
    [
        'http://drive.google.com/uc?export=view&id=10e_fjdujaqh3ge38Xc_lyw5bgLaNvcoQ',
    ],
    [
        'http://drive.google.com/uc?export=view&id=1iUVJOAAet_P8vlWbi5puPMojv2xT31sd',
    ],
    [
        'http://drive.google.com/uc?export=view&id=1zKtN3eGO23iPKXA5q7kCr_P6VBNIHLKO',
    ],
    [
        'http://drive.google.com/uc?export=view&id=1Q-wm3vN-iixJI0Y1e22jYypdDmW5rtZ1',
    ],
    [
        'http://drive.google.com/uc?export=view&id=17VK3zPxmpY0kDRzFl1_VsMltzYxM04V8',
    ],
    [
        'http://drive.google.com/uc?export=view&id=1Sn2BF03KnA7aKoM9aCye6n-VmZ1rR0o3',
    ],
];
let titles = [
    'nike offer 25',
    'nike offer 4',
    'modern offer',
    'new offer test',
    'nike offer 78',
    'adidas offer 2',
];
let features = [
    'modern and looks awesome and stylish',
    'comfortable for sport',
    'budget friendly price',
    'the best in the market',
];
let marks = ['shoes', 'nike', 'adidas', 'rebook', 'puma'];
let categories = ['shoes', 'jackets', 'pants', 'shirts'];
let quantity = 10;
let user_id = 'a13ad179-57bd-4a32-90f0-1460a95e426a';
let description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo voluptatum mollitia vero. Provident maiores voluptas dicta, dolorem ullam architecto at itaque neque, cumque perspiciatis natus enim sequi quam atque aut?';
let products_idsS = [
    '7e77b4ad-d2bc-4f5d-9fd1-2c2555630ec5',
    'f43468b3-ef49-4fa7-adff-3fc4728757e1',
    '8f8569dd-2eca-498c-a265-64b17dc5c0a4',
    'd7cf6184-2a9a-400d-bbc5-b294dc37513c',
    'b50cc8f7-c49b-4b1d-a254-974ba04fb2d7',
    'a7620975-9fba-472c-a0e6-2488bb0c2396',
    '87b23907-4870-420f-bda5-92a9f6a4ef50',
    '7e120b79-3b6b-4b36-8965-643b653e0e56',
    'dd9da05f-072f-4050-97fa-708723c2e3e9',
    'dc49e6f4-e1a2-4237-904a-d83e1f42835a',
    'de18c555-87c5-493f-a54e-edc28bed3d1a',
    '77499635-cd4f-4a41-a03c-affb494a920c',
    '49b68a4e-c16c-4eed-8ad5-c5f055d24c75',
    '0384509a-b924-4414-bf78-0953210e78c4',
    'a68ac6dc-85c3-4d20-ad39-577e9c28a038',
    '07e25d9d-0370-4a97-af87-4a73d83c47ed',
    'f7efab56-1074-4362-be33-0d1ba908dcd5',
    '0a1d8266-acf6-40ee-a9b5-59c12f3b5b48',
    'b13493c2-64af-4a4c-8530-3681c959d3e8',
    '36a4c322-7386-4e4e-b65e-ff38e4a874df',
    'bead3a1f-e2de-4949-aa76-1ac922f7ce9d',
];
let productsS = [];
images.forEach((x, i) => {
    let original_price = Math.round(Math.random() * 1000);
    if (original_price < 400) {
        original_price = 488;
    }
    let price = original_price - 100;
    let products_ids = [];
    for (let i = 0; i < 3; i++) {
        products_ids.push(products_idsS[Math.floor(Math.random() * products_idsS.length)]);
    }
    let data = {
        original_price,
        title: titles[i],
        price,
        products_ids,
        images: images[i],
        blured_images: blured[i],
        mark: marks[i],
        quantity,
        user_id,
        description,
        features,
        category: categories[i],
    };
    productsS.push(data);
});
exports.productsDD = productsS;
//# sourceMappingURL=o.js.map