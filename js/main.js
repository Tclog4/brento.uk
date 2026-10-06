/* =========================================
   BRENTO — MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MOBILE MENU
    ========================================= */

    const menuButton = document.querySelector(".mobile-menu-button");
    const navigation = document.querySelector(".main-nav");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("mobile-open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

    }


    /* =========================================
       HELP BUTTONS
    ========================================= */

    const helpButtons = document.querySelectorAll(".help-button");

    const explanations = {
        "What is an NVMe SSD?":
            "An NVMe SSD is very fast storage for your games, apps and files. More storage means you can keep more games installed.",

        "What is RAM?":
            "RAM is your PC's short-term working memory. 16GB is a great starting point for gaming, while 32GB gives you more room for heavier multitasking.",

        "What is Wi-Fi 6?":
            "Wi-Fi 6 is a newer Wi-Fi standard that can provide faster and more efficient wireless networking when your router also supports it.",

        "What is refresh rate?":
            "Refresh rate is how many times your monitor can update its image every second. A 144Hz monitor can refresh up to 144 times per second."
    };


    helpButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const question =
                button.getAttribute("aria-label");

            const explanation =
                explanations[question];

            if (!explanation) {
                return;
            }

            showHelpPopup(
                question,
                explanation
            );

        });

    });


    /* =========================================
       HELP POPUP
    ========================================= */

    function showHelpPopup(title, message) {

        const existingPopup =
            document.querySelector(".help-popup");

        if (existingPopup) {
            existingPopup.remove();
        }


        const popup =
            document.createElement("div");

        popup.className = "help-popup";

        popup.innerHTML = `
            <div class="help-popup-backdrop"></div>

            <div
                class="help-popup-card"
                role="dialog"
                aria-modal="true"
                aria-label="${escapeHTML(title)}"
            >

                <button
                    class="help-popup-close"
                    type="button"
                    aria-label="Close explanation"
                >
                    ×
                </button>

                <div class="help-popup-icon">
                    ?
                </div>

                <p class="eyebrow">
                    BRENTO EXPLAINS
                </p>

                <h3>
                    ${escapeHTML(title)}
                </h3>

                <p>
                    ${escapeHTML(message)}
                </p>

                <button
                    class="button button-primary help-popup-done"
                    type="button"
                >
                    Got it
                </button>

            </div>
        `;


        document.body.appendChild(popup);


        const closeButton =
            popup.querySelector(
                ".help-popup-close"
            );

        const doneButton =
            popup.querySelector(
                ".help-popup-done"
            );

        const backdrop =
            popup.querySelector(
                ".help-popup-backdrop"
            );


        const closePopup = () => {
            popup.remove();
        };


        closeButton.addEventListener(
            "click",
            closePopup
        );

        doneButton.addEventListener(
            "click",
            closePopup
        );

        backdrop.addEventListener(
            "click",
            closePopup
        );


        document.addEventListener(
            "keydown",
            function escapeHandler(event) {

                if (event.key === "Escape") {

                    closePopup();

                    document.removeEventListener(
                        "keydown",
                        escapeHandler
                    );

                }

            }
        );

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

});
