/* =========================================
   BRENTO — MAIN JAVASCRIPT
   Shared site-wide functionality
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       BRENTO READY EVENT
    ========================================= */

    document.documentElement.classList.add(
        "js-ready"
    );


    /* =========================================
       CURRENT YEAR
       Automatically updates footer years
    ========================================= */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach((element) => {

        element.textContent =
            new Date().getFullYear();

    });

});
