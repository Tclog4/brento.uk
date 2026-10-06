/* =========================================
   BRENTO — SHOP SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons =
        document.querySelectorAll(".shop-filter");

    const productCards =
        document.querySelectorAll(".shop-product-card");

    const productCount =
        document.querySelector(".shop-product-count");


    /* =========================================
       STOP IF THIS IS NOT THE SHOP PAGE
    ========================================= */

    if (
        !filterButtons.length ||
        !productCards.length
    ) {
        return;
    }


    /* =========================================
       FILTER PRODUCTS
    ========================================= */

    function filterProducts(selectedFilter) {

        let visibleCount = 0;


        productCards.forEach((card) => {

            const categories =
                (
                    card.dataset.category || ""
                )
                .toLowerCase()
                .split(",")
                .map((category) => category.trim());


            const shouldShow =
                selectedFilter === "all" ||
                categories.includes(
                    selectedFilter
                );


            card.hidden = !shouldShow;


            if (shouldShow) {
                visibleCount++;
            }

        });


        updateProductCount(
            visibleCount
        );

    }


    /* =========================================
       UPDATE PRODUCT COUNT
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
       UPDATE ACTIVE FILTER
    ========================================= */

    function setActiveFilter(activeButton) {

        filterButtons.forEach(
            (button) => {

                const isActive =
                    button === activeButton;


                button.classList.toggle(
                    "active",
                    isActive
                );


                button.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );

            }
        );

    }


    /* =========================================
       FILTER BUTTON EVENTS
    ========================================= */

    filterButtons.forEach((button) => {

        button.setAttribute(
            "aria-pressed",
            "false"
        );


        button.addEventListener(
            "click",
            () => {

                const selectedFilter =
                    (
                        button.dataset.filter ||
                        "all"
                    ).toLowerCase();


                setActiveFilter(
                    button
                );


                filterProducts(
                    selectedFilter
                );

            }
        );

    });


    /* =========================================
       INITIAL STATE
    ========================================= */

    const allButton =
        document.querySelector(
            ".shop-filter[data-filter='all']"
        );


    if (allButton) {

        setActiveFilter(
            allButton
        );

        filterProducts("all");

    } else {

        filterProducts("all");

    }

});
