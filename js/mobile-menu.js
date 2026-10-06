/* =========================================
   BRENTO — MOBILE MENU
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton =
        document.querySelector(".mobile-menu-button");

    const navigation =
        document.querySelector(".main-nav");


    if (!menuButton || !navigation) {
        return;
    }


    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    menuButton.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle(
                "mobile-open"
            );


        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close menu"
                : "Open menu"
        );

    });


    const navigationLinks =
        navigation.querySelectorAll("a");


    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove(
                "mobile-open"
            );


            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            menuButton.setAttribute(
                "aria-label",
                "Open menu"
            );

        });

    });


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                navigation.classList.contains(
                    "mobile-open"
                )
            ) {

                navigation.classList.remove(
                    "mobile-open"
                );


                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuButton.setAttribute(
                    "aria-label",
                    "Open menu"
                );


                menuButton.focus();

            }

        }
    );

});
