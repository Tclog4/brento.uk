/* =========================================
   BRENTO — HELP SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const helpButtons =
        document.querySelectorAll(".help-button");


    if (!helpButtons.length) {
        return;
    }


    /* =========================================
       EXPLANATIONS
    ========================================= */

    const explanations = {

        "What is an NVMe SSD?": {
            simple:
                "An NVMe SSD is very fast storage for your games, apps and files. More storage means you can keep more games installed.",

            more:
                "NVMe is a type of SSD connection designed for high-speed storage. It is much faster than an old mechanical hard drive and can also be faster than older SATA SSDs."
        },


        "What is RAM?": {
            simple:
                "RAM is your PC's short-term working memory. 16GB is a great starting point for gaming, while 32GB gives you more room for heavier multitasking.",

            more:
                "RAM temporarily stores information that your CPU needs quickly. More RAM can help when gaming while running other programs, although adding RAM does not automatically increase gaming performance."
        },


        "What is Wi-Fi 6?": {
            simple:
                "Wi-Fi 6 is a newer Wi-Fi standard that can provide faster and more efficient wireless networking when your router also supports it.",

            more:
                "Wi-Fi 6 is designed to handle multiple devices more efficiently than older Wi-Fi standards. Your actual speed still depends on your router, internet connection, distance and other factors."
        },


        "What is refresh rate?": {
            simple:
                "Refresh rate is how many times your monitor can update its image every second. A 144Hz monitor can refresh up to 144 times per second.",

            more:
                "Higher refresh rates can make movement look smoother, especially when your PC can produce enough FPS. A 144Hz monitor is capable of displaying up to 144 refreshes each second."
        },


        "What is RAM speed?": {
            simple:
                "RAM speed describes how quickly your memory can transfer data. Faster RAM can help performance in some situations.",

            more:
                "RAM performance depends on several things, including frequency and timings. Compatibility with your motherboard and CPU matters too."
        },


        "What is VRAM?": {
            simple:
                "VRAM is memory built into your graphics card. It stores things such as textures and other graphics data used by games.",

            more:
                "Having enough VRAM can be important when using high-resolution textures or higher resolutions. Running out of VRAM can cause stuttering or require lower graphics settings."
        },


        "What is a GPU?": {
            simple:
                "The GPU is the part of the PC that does most of the heavy graphics work in games.",

            more:
                "The graphics processing unit renders images, effects, lighting and other visual information. For gaming, the GPU is often one of the most important components."
        },


        "What is a CPU?": {
            simple:
                "The CPU is the main processor of your PC. It handles instructions and calculations needed by games and other programs.",

            more:
                "CPU performance can affect game FPS, especially in games that perform lots of calculations or when trying to reach very high frame rates."
        },


        "What is FPS?": {
            simple:
                "FPS means frames per second. It describes how many individual images your PC is producing each second in a game.",

            more:
                "Higher FPS can make games feel smoother, but the benefit also depends on your monitor's refresh rate and the type of game you're playing."
        },


        "What is DDR4?": {
            simple:
                "DDR4 is a type of system memory used by many PCs. Your motherboard determines which RAM generation it supports.",

            more:
                "DDR4 and DDR5 are different memory standards and are not interchangeable. A motherboard designed for DDR4 needs compatible DDR4 memory."
        }

    };


    /* =========================================
       HELP BUTTON EVENTS
    ========================================= */

    helpButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const question =
                button.getAttribute(
                    "aria-label"
                );


            const explanation =
                explanations[question];


            if (!explanation) {
                return;
            }


            showHelpPopup(
                question,
                explanation.simple,
                explanation.more
            );

        });

    });


    /* =========================================
       CREATE HELP POPUP
    ========================================= */

    function showHelpPopup(
        title,
        simpleMessage,
        moreMessage
    ) {

        const existingPopup =
            document.querySelector(
                ".help-popup"
            );


        if (existingPopup) {
            existingPopup.remove();
        }


        const popup =
            document.createElement("div");


        popup.className =
            "help-popup";


        popup.innerHTML = `
            <div
                class="help-popup-backdrop"
                aria-hidden="true"
            ></div>

            <div
                class="help-popup-card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="help-popup-title"
            >

                <button
                    class="help-popup-close"
                    type="button"
                    aria-label="Close explanation"
                >
                    ×
                </button>

                <div
                    class="help-popup-icon"
                    aria-hidden="true"
                >
                    ?
                </div>

                <p class="eyebrow">
                    BRENTO EXPLAINS
                </p>

                <h3 id="help-popup-title">
                    ${escapeHTML(title)}
                </h3>

                <p>
                    ${escapeHTML(simpleMessage)}
                </p>

                <details class="help-popup-more">

                    <summary>
                        Want to know more?
                    </summary>

                    <p>
                        ${escapeHTML(moreMessage)}
                    </p>

                </details>

                <button
                    class="button button-primary help-popup-done"
                    type="button"
                >
                    Got it
                </button>

            </div>
        `;


        document.body.appendChild(
            popup
        );


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

            document.removeEventListener(
                "keydown",
                escapeHandler
            );

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


        closeButton.focus();


        const escapeHandler =
            (event) => {

                if (event.key === "Escape") {
                    closePopup();
                }

            };


        document.addEventListener(
            "keydown",
            escapeHandler
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
