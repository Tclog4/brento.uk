/* =========================================
   BRENTO — SHOP SYSTEM
   Product data + filtering
========================================= */

document.addEventListener("DOMContentLoaded", () => {

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
       LOAD PRODUCT DATA
    ========================================= */

    async function loadProducts() {

        try {

            const response =
                await fetch("data/products.json");


            if (!response.ok) {
                throw new Error(
                    "Could not load product data."
                );
            }


            const products =
                await response.json();


            renderProducts(products);

            setupFilters(products);

        } catch (error) {

            console.error(
                "Brento shop error:",
                error
            );


            productGrid.innerHTML = `
                <div class="shop-error">
                    <h3>
                        We couldn't load the PCs.
                    </h3>

                    <p>
                        Please refresh the page and try again.
                    </p>
                </div>
            `;

        }

    }


    /* =========================================
       RENDER PRODUCTS
    ========================================= */

    function renderProducts(products) {

        productGrid.innerHTML =
            products.map(
                createProductCard
            ).join("");


        updateProductCount(
            products.length
        );

    }


    /* =========================================
       CREATE PRODUCT CARD
    ========================================= */

    function createProductCard(product) {

        const featuredBadge =
            product.featured
                ? `
                    <span class="product-featured-badge">
                        Popular
                    </span>
                `
                : "";


        const image =
            product.image
                ? `
                    <img
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                    >
                `
                : `
                    <div class="product-placeholder">
                        BRENTO
                    </div>
                `;


        const tags =
            product.tags
                .map(
                    (tag) => `
                        <span>
                            ${escapeHTML(tag)}
                        </span>
                    `
                )
                .join("");


        return `
            <article
                class="product-card ${product.featured ? "featured-product" : ""}"
                data-category="${escapeHTML(product.category)}"
            >

                <div class="product-image">

                    <span class="stock-badge">
                        ${escapeHTML(product.stock)}
                    </span>

                    ${featuredBadge}

                    ${image}

                </div>


                <div class="product-info">

                    <p class="product-category">
                        ${escapeHTML(
                            product.performance.target
                        )}
                    </p>


                    <h3>
                        ${escapeHTML(product.name)}
                    </h3>


                    <p class="product-description">
                        ${escapeHTML(product.description)}
                    </p>


                    <div class="spec-list">

                        <span>
                            ${escapeHTML(product.ram)}
                        </span>

                        <span>
                            ${escapeHTML(product.storage)}
                        </span>

                        <span>
                            ${escapeHTML(product.gpu)}
                        </span>

                    </div>


                    <div class="product-bottom">

                        <div>

                            <span class="price-label">
                                From
                            </span>

                            <strong class="product-price">
                                £${Number(
                                    product.price
                                ).toLocaleString("en-GB")}
                            </strong>

                        </div>


                        <a
                            href="products/${escapeHTML(product.id)}.html"
                            class="small-button"
                        >
                            View PC
                        </a>

                    </div>

                </div>

            </article>
        `;

    }


    /* =========================================
       FILTER SYSTEM
    ========================================= */

    function setupFilters(products) {

        if (!filterButtons.length) {
            return;
        }


        filterButtons.forEach((button) => {

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
                        ).toLowerCase();


                    filterButtons.forEach(
                        (filterButton) => {

                            const active =
                                filterButton === button;


                            filterButton.classList.toggle(
                                "active",
                                active
                            );


                            filterButton.setAttribute(
                                "aria-pressed",
                                String(active)
                            );

                        }
                    );


                    const filteredProducts =
                        filter === "all"
                            ? products
                            : products.filter(
                                (product) =>
                                    product.tags
                                        .map(
                                            (tag) =>
                                                tag.toLowerCase()
                                        )
                                        .includes(filter)
                            );


                    renderProducts(
                        filteredProducts
                    );

                }
            );

        });


        const allButton =
            document.querySelector(
                ".shop-filter[data-filter='all']"
            );


        if (allButton) {

            allButton.classList.add(
                "active"
            );

            allButton.setAttribute(
                "aria-pressed",
                "true"
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
            count === 1
                ? "1 PC"
                : `${count} PCs`;

    }


    /* =========================================
       HTML ESCAPING
    ========================================= */

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /* =========================================
       START SHOP
    ========================================= */

    loadProducts();

});
