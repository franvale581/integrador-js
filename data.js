const productsData = [
    {
        id:1,
        name:"Cuento de Hadas",
        autor:"Stephen King",
        category:"king",
        precio: 7500,
        bookImg:"./assets/books/stephen-king/cuento-de-hadas.webp",   
    },
    {
        id:2,
        name:"The Bazaar of Bad Dreams",
        autor:"Stephen King",
        category:"king",
        precio: 5500,
        bookImg:"./assets/books/stephen-king/el-bazar-de-los-malos-sueños.webp",
    },
    {
        id:3,
        name:"El Instituto",
        autor:"Stephen King",
        category:"king",
        precio: 8500,
        bookImg:"./assets/books/stephen-king/el-instituto.webp",
    },
    {
        id:4,
        name:"It I",
        autor:"Stephen King",
        category:"king",
        precio: 4500,
        bookImg:"./assets/books/stephen-king/it-1.webp",
    },
    {
        id:5,
        name:"It II",
        autor:"Stephen King",
        category:"king",
        precio: 4800,
        bookImg:"./assets/books/stephen-king/it-2.webp",
    },
    {
        id:6,
        name:"Misery",
        autor:"Stephen King",
        category:"king",
        precio: 6000,
        bookImg:"./assets/books/stephen-king/misery.webp",
    },
    {
        id:7,
        name:"La Torre Oscura V",
        autor:"Stephen King",
        category:"king",
        precio: 8000,
        bookImg:"./assets/books/stephen-king/torre-oscura-v.webp",
    },
    {
        id:8,
        name:"Coleccion de Mitos Clasicos y Nuevos",
        autor:"P.H. Lovecraft",
        category:"lovecraft",
        precio: 12000,
        bookImg:"./assets/books/lovecraft/ft-mythos-new-and-classic-collection.webp",
    },
    {
        id:9,
        name:"En las Montañas de la Locura y otras obras",
        autor:"P.H. Lovecraft",
        category:"lovecraft",
        precio: 10000,
        bookImg:"./assets/books/lovecraft/h-p-lovecraft-vol-iv.webp",
    },
    {
        id:10,
        name:"Tales of Horror",
        autor:"P.H. Lovecraft",
        category:"lovecraft",
        precio: 8000,
        bookImg:"./assets/books/lovecraft/tales-of-horror.webp",
    },
    {
        id:11,
        name:"The Raven",
        autor:"Edgar Allan Poe",
        category: "poe",
        precio: 4500,
        bookImg:"./assets/books/edgar-allan-poe/the-raven.webp",
    },
    {
        id:12,
        name:"Cuentos y Relato I",
        autor:"Edgar Allan Poe",
        category: "poe",
        precio: 6700,
        bookImg:"./assets/books/edgar-allan-poe/cuentos-y-relatos-I.webp",
    },
    {
        id:13,
        name:"Cuentos y Relatos II",
        autor:"Edgar Allan Poe",
        category: "poe",
        precio: 6700,
        bookImg:"./assets/books/edgar-allan-poe/cuentos-y-relatos-II.webp",
    },
    {
        id:14,
        name:"Cuentos y Relatos III",
        autor:"Edgar Allan Poe",
        category: "poe",
        precio: 6700,
        bookImg:"./assets/books/edgar-allan-poe/cuentos-y-relatos-III.webp",
    },
];


const divideProductsInParts = (size) => {
    let productsList = [];
    for (let i = 0; i < productsData.length; i+= size)
    productsList.push(productsData.slice(i, i + size))
return productsList;
};

const appState = {
    products: divideProductsInParts(6), 
    currentProductsIndex: 0, 
    productsLimit: divideProductsInParts(6).length,
    activeFilter: null
  };

