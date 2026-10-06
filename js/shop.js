/* =========================================
   BRENTO — SHOP SYSTEM
   Product data + filtering + rendering
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const productGrid =
        document.querySelector(".product-grid");

    const filterButtons =
        document.querySelectorAll(".shop-filter");

    const productCount =
        document.querySelector(".shop-product-count");


    /*
        Stop if this is not the shop page.
    */

    if (!productGrid) {
        return;
    }


    /* =========================================
       SHOP STATE
    ========================================= */

    const shopState = {

        products: [],

        activeFilter: "all",

        searchTerm: ""

    };


    /* =========================================
       LOAD PRODUCT DATA
    ========================================= */

    async function loadProducts() {

        showLoading();


        try {

            const response =
                await fetch(
                    "data/products.json",
                    {
                        cache: "no-cache"
                    }
                );


            if (!response.ok) {
                throw new Error(
                    `Product data returned ${response.status}.`
                );
            }


            const products =
                await response.json();


            if (!Array.isArray(products)) {
                throw new Error(
                    "Product data is not an array."
                );
            }


            shopState.products =
                products.filter(
                    isValidProduct
                );


            renderProducts();


            setupFilters();


        } catch (error) {

            console.error(
                "Brento shop error:",
                error
            );


            showError();

        }

    }


    /* =========================================
       PRODUCT VALIDATION
    ========================================= */

    function isValidProduct(product) {

        if (!product || typeof product !== "object") {
            return false;
        }


        if (!product.id || !product.name) {
            return false;
        }


        return true;

    }


    /* =========================================
       RENDER PRODUCTS
    ========================================= */

    function renderProducts() {

        const visibleProducts =
            getVisibleProducts();


        if (!visibleProducts.length) {

            showEmptyState();

            updateProductCount(0);

            return;

        }


        productGrid.innerHTML =
            visibleProducts
                .map(createProductCard)
                .join("");


        updateProductCount(
            visibleProducts.length
        );

    }


    /* =========================================
       GET VISIBLE PRODUCTS
    ========================================= */

    function getVisibleProducts() {

        let products =
            [...shopState.products];


        /* -----------------------------------------
           FILTER
        ----------------------------------------- */

        if (
            shopState.activeFilter !==
            "all"
        ) {

            products =
                products.filter(
                    (product) =>
                        getProductTags(
                            product
                        ).includes(
                            shopState.activeFilter
                        )
                );

        }


        /* -----------------------------------------
           SEARCH
        ----------------------------------------- */

        if (shopState.searchTerm) {

            const search =
                shopState.searchTerm
                    .toLowerCase()
                    .trim();


            products =
                products.filter(
                    (product) =>
                        getSearchText(
                            product
                        ).includes(search)
                );

        }


        return products;

    }


    /* =========================================
       SEARCH TEXT
    ========================================= */

    function getSearchText(product) {

        return [

            product.name,

            product.description,

            product.category,

            product.cpu,

            product.gpu,

            product.ram,

            product.storage,

            product.condition,

            ...getProductTags(product)

        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

    }


    /* =========================================
       CREATE PRODUCT CARD
    ========================================= */

    function createProductCard(product) {

        const featuredBadge =
            product.featured
                ? `
                    <span
                        class="product-featured-badge"
                    >
                        Popular
                    </span>
                `
                : "";


        const image =
            createProductImage(
                product
            );


        const stock =
            getStockLabel(
                product.stock
            );


        const performanceTarget =
            product.performance?.target ||
            product.category ||
            "Gaming PC";


        const description =
            product.description ||
            "A gaming PC built with performance and value in mind.";


        const ram =
            product.ram ||
            "RAM information unavailable";


        const storage =
            product.storage ||
            "Storage information unavailable";


        const gpu =
            product.gpu ||
            "GPU information unavailable";


        const price =
            formatPrice(
                product.price
            );


        const productLink =
            createProductLink(
                product.id
            );


        return `
            <article
                class="product-card ${product.featured ? "featured-product" : ""}"
                data-product-id="${escapeHTML(product.id)}"
                data-category="${escapeHTML(
                    product.category || ""
                )}"
            >

                <div class="product-image">

                    <span
                        class="stock-badge"
                        data-stock="${escapeHTML(stock.className)}"
                    >
                        ${escapeHTML(stock.label)}
                    </span>

                    ${featuredBadge}

                    ${image}

                </div>


                <div class="product-info">

                    <p class="product-category">
                        ${escapeHTML(
                            performanceTarget
                        )}
                    </p>


                    <h3>
                        ${escapeHTML(
                            product.name
                        )}
                    </h3>


                    <p class="product-description">
                        ${escapeHTML(
                            description
                        )}
                    </p>


                    <div
                        class="spec-list"
                        aria-label="Key specifications"
                    >

                        <span>
                            ${escapeHTML(ram)}
                        </span>

                        <span>
                            ${escapeHTML(storage)}
                        </span>

                        <span>
                            ${escapeHTML(gpu)}
                        </span>

                    </div>


                    <div class="product-bottom">

                        <div>

                            <span class="price-label">
                                From
                            </span>

                            <strong class="product-price">
                                ${price}
                            </strong>

                        </div>


                        <a
                            href="${productLink}"
                            class="small-button"
                            aria-label="View ${escapeHTML(
                                product.name
                            )}"
                        >
                            View PC
                        </a>

                    </div>

                </div>

            </article>
        `;

    }


    /* =========================================
       PRODUCT IMAGE
    ========================================= */

    function createProductImage(product) {

        if (!product.image) {

            return `
                <div
                    class="product-placeholder"
                    aria-hidden="true"
                >
                    BRENTO
                </div>
            `;

        }


        return `
            <img
                src="${escapeHTML(
                    product.image
                )}"
                alt="${escapeHTML(
                    product.name
                )}"
                loading="lazy"
                decoding="async"
            >
        `;

    }


    /* =========================================
       PRODUCT LINK
    ========================================= */

    function createProductLink(id) {

        const safeId =
            String(id || "")
                .trim()
                .replace(
                    /[^a-zA-Z0-9_-]/g,
                    ""
                );


        if (!safeId) {
            return "#";
        }


        return `products/${safeId}.html`;

    }


    /* =========================================
       STOCK LABEL
    ========================================= */

    function getStockLabel(stock) {

        const value =
            String(
                stock || "Availability unknown"
            )
                .trim()
                .toLowerCase();


        if (
            value.includes("out") ||
            value.includes("sold")
        ) {

            return {
                label: "Out of stock",
                className: "out-of-stock"
            };

        }


        if (
            value.includes("low") ||
            value.includes("few")
        ) {

            return {
                label: "Low stock",
                className: "low-stock"
            };

        }


        if (
            value.includes("pre") ||
            value.includes("soon")
        ) {

            return {
                label: stock,
                className: "coming-soon"
            };

        }


        return {
            label: stock || "Availability unknown",
            className: "in-stock"
        };

    }


    /* =========================================
       PRODUCT TAGS
    ========================================= */

    function getProductTags(product) {

        if (!Array.isArray(product.tags)) {
            return [];
        }


        return product.tags
            .map(
                (tag) =>
                    String(tag)
                        .trim()
                        .toLowerCase()
            )
            .filter(Boolean);

    }


    /* =========================================
       FILTER SYSTEM
    ========================================= */

    function setupFilters() {

        if (!filterButtons.length) {
            return;
        }


        filterButtons.forEach(
            (button) => {

                button.setAttribute(
                    "aria-pressed",
                    "false"
                );


                button.addEventListener(
                    "click",
                    () => {

                        const filter =
                            (
                                button.dataset.filter ||
                                "all"
                            )
                                .trim()
                                .toLowerCase();


                        setActiveFilter(
                            filter
                        );

                    }
                );

            }
        );


        setActiveFilter(
            "all"
        );

    }


    /* =========================================
       SET ACTIVE FILTER
    ========================================= */

    function setActiveFilter(filter) {

        shopState.activeFilter =
            filter;


        filterButtons.forEach(
            (button) => {

                const buttonFilter =
                    (
                        button.dataset.filter ||
                        "all"
                    )
                        .trim()
                        .toLowerCase();


                const active =
                    buttonFilter === filter;


                button.classList.toggle(
                    "active",
                    active
                );


                button.setAttribute(
                    "aria-pressed",
                    String(active)
                );

            }
        );


        renderProducts();

    }


    /* =========================================
       SEARCH SUPPORT
       Automatically activates if a future
       search input is added to shop.html.
    ========================================= */

    const searchInput =
        document.querySelector(
            ".shop-search"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                shopState.searchTerm =
                    searchInput.value;


                renderProducts();

            }
        );

    }


    /* =========================================
       LOADING STATE
    ========================================= */

    function showLoading() {

        productGrid.innerHTML = `
            <div
                class="shop-loading"
                role="status"
                aria-live="polite"
            >

                <span
                    class="shop-loading-spinner"
                    aria-hidden="true"
                ></span>

                <p>
                    Loading Brento PCs...
                </p>

            </div>
        `;

    }


    /* =========================================
       EMPTY STATE
    ========================================= */

    function showEmptyState() {

        productGrid.innerHTML = `
            <div
                class="shop-empty"
                role="status"
            >

                <div
                    class="shop-empty-icon"
                    aria-hidden="true"
                >
                    ?
                </div>

                <h3>
                    No PCs found
                </h3>

                <p>
                    Try another category or search.
                </p>

                <button
                    type="button"
                    class="button button-secondary shop-reset-button"
                >
                    Show all PCs
                </button>

            </div>
        `;


        const resetButton =
            productGrid.querySelector(
                ".shop-reset-button"
            );


        if (resetButton) {

            resetButton.addEventListener(
                "click",
                () => {

                    if (searchInput) {
                        searchInput.value = "";
                    }


                    shopState.searchTerm =
                        "";


                    setActiveFilter(
                        "all"
                    );

                }
            );

        }

    }


    /* =========================================
       ERROR STATE
    ========================================= */

    function showError() {

        updateProductCount(0);


        productGrid.innerHTML = `
            <div
                class="shop-error"
                role="alert"
            >

                <div
                    class="shop-error-icon"
                    aria-hidden="true"
                >
                    !
                </div>

                <h3>
                    We couldn't load the PCs.
                </h3>

                <p>
                    There was a problem loading the Brento product catalogue.
                </p>

                <button
                    type="button"
                    class="button button-primary shop-retry-button"
                >
                    Try again
                </button>

            </div>
        `;


        const retryButton =
            productGrid.querySelector(
                ".shop-retry-button"
            );


        if (retryButton) {

            retryButton.addEventListener(
                "click",
                loadProducts
            );

        }

    }


    /* =========================================
       PRODUCT COUNT
    ========================================= */

    function updateProductCount(count) {

        if (!productCount) {
            return;
        }


        productCount.textContent =
            count === 0
                ? "No PCs"
                : count === 1
                    ? "1 PC"
                    : `${count} PCs`;

    }


    /* =========================================
       PRICE FORMATTING
    ========================================= */

    function formatPrice(price) {

        const numericPrice =
            Number(price);


        if (
            !Number.isFinite(
                numericPrice
            )
        ) {

            return "Price unavailable";

        }


        return `£${numericPrice.toLocaleString(
            "en-GB",
            {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }
        )}`;

    }


    /* =========================================
       HTML ESCAPING
    ========================================= */

    function escapeHTML(value) {

        return String(value)
            .replaceAll(
                "&",
                "&amp;"
            )
            .replaceAll(
                "<",
                "&lt;"
            )
            .replaceAll(
                ">",
                "&gt;"
            )
            .replaceAll(
                '"',
                "&quot;"
            )
            .replaceAll(
                "'",
                "&#039;"
            );

    }


    /* =========================================
       START SHOP
    ========================================= */

    loadProducts();

});
