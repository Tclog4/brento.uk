/* =========================================
   BRENTO — HELP SYSTEM
   Beginner-friendly explanations
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const helpButtons =
        document.querySelectorAll(".help-button");


    if (!helpButtons.length) {
        return;
    }


    /* =========================================
       HELP EXPLANATIONS
    ========================================= */

    const explanations = {

        nvme: {
            title: "What is an NVMe SSD?",
            simple:
                "An NVMe SSD is very fast storage for your games, apps and files. More storage means you can keep more games installed.",
            more:
                "NVMe SSDs connect directly through PCIe and are designed for high-speed data transfer. They are much faster than traditional mechanical hard drives and can also outperform older SATA SSDs."
        },


        ram: {
            title: "What is RAM?",
            simple:
                "RAM is your PC's short-term working memory. 16GB is a great starting point for gaming, while 32GB gives you more room for heavier multitasking.",
            more:
                "RAM temporarily stores information that your CPU needs quickly. More RAM can help when gaming while running other programs, although adding RAM does not automatically increase gaming performance."
        },


        wifi: {
            title: "What is Wi-Fi 6?",
            simple:
                "Wi-Fi 6 is a newer Wi-Fi standard designed to provide faster and more efficient wireless networking.",
            more:
                "Your actual Wi-Fi speed depends on your router, internet connection, distance from the router, interference and the Wi-Fi hardware in your PC."
        },


        "refresh-rate": {
            title: "What is refresh rate?",
            simple:
                "Refresh rate is how many times your monitor can update its image every second. A 144Hz monitor can refresh up to 144 times per second.",
            more:
                "Higher refresh rates can make movement look smoother, especially when your PC produces enough FPS. Common gaming monitor refresh rates include 60Hz, 120Hz, 144Hz, 165Hz and 240Hz."
        },


        "ram-speed": {
            title: "What is RAM speed?",
            simple:
                "RAM speed describes how quickly your memory can transfer data. Faster RAM can improve performance in some situations.",
            more:
                "RAM performance depends on several things, including memory frequency, timings, capacity and the memory controller in your CPU. Your motherboard also needs to support the RAM."
        },


        vram: {
            title: "What is VRAM?",
            simple:
                "VRAM is memory built into your graphics card. Games use it for things such as textures and other graphics data.",
            more:
                "Having enough VRAM becomes increasingly important at higher resolutions and with high-resolution textures. If a game needs more VRAM than your GPU has available, you may experience stuttering or need to lower graphics settings."
        },


        gpu: {
            title: "What is a GPU?",
            simple:
                "The GPU is the part of your PC that does most of the heavy graphics work in games.",
            more:
                "The graphics processing unit renders images, lighting, shadows, effects and other visual information. For gaming, the GPU is usually one of the most important components affecting FPS and graphics quality."
        },


        cpu: {
            title: "What is a CPU?",
            simple:
                "The CPU is the main processor of your PC. It handles instructions and calculations needed by games and other programs.",
            more:
                "CPU performance can affect FPS, especially in CPU-heavy games or when trying to reach very high frame rates. A powerful GPU cannot always make up for a CPU that is limiting performance."
        },


        fps: {
            title: "What is FPS?",
            simple:
                "FPS means frames per second. It describes how many individual images your PC produces each second in a game.",
            more:
                "Higher FPS can make games feel smoother, but the benefit also depends on your monitor's refresh rate. For example, a 144Hz monitor can display up to 144 refreshes per second."
        },


        ddr4: {
            title: "What is DDR4?",
            simple:
                "DDR4 is a type of system memory used by many PCs. Your motherboard determines which RAM generation it supports.",
            more:
                "DDR4 and DDR5 are different memory standards and are not interchangeable. A motherboard designed for DDR4 requires compatible DDR4 memory."
        },


        ddr5: {
            title: "What is DDR5?",
            simple:
                "DDR5 is a newer generation of system memory. It can provide higher memory speeds and newer features than DDR4.",
            more:
                "DDR5 requires a compatible motherboard and CPU. DDR4 and DDR5 are physically and electrically different, so you cannot install DDR5 into a DDR4 motherboard."
        },


        storage: {
            title: "What is storage?",
            simple:
                "Storage is where your games, Windows, apps, photos and other files are kept when your PC is turned off.",
            more:
                "Gaming PCs commonly use SSDs because they are much faster than traditional hard drives. More storage mainly means you can keep more games and files installed."
        },


        ssd: {
            title: "What is an SSD?",
            simple:
                "An SSD is fast storage used for Windows, games, apps and files.",
            more:
                "SSDs have no moving mechanical parts, which makes them much faster and quieter than traditional hard drives. NVMe SSDs are a particularly fast type of SSD."
        },


        "hard-drive": {
            title: "What is a hard drive?",
            simple:
                "A hard drive, or HDD, is a type of storage that uses spinning magnetic disks to store data.",
            more:
                "HDDs are generally much slower than modern SSDs, but they can still be useful for large amounts of inexpensive storage."
        },


        "motherboard": {
            title: "What is a motherboard?",
            simple:
                "The motherboard is the main circuit board that connects the important parts of your PC together.",
            more:
                "Your motherboard connects the CPU, RAM, graphics card, storage, USB devices and other hardware. It also determines which CPUs, RAM and expansion hardware are compatible."
        },


        "power-supply": {
            title: "What is a PSU?",
            simple:
                "The PSU, or power supply, provides electricity to the components inside your PC.",
            more:
                "A PSU needs enough capacity and the correct connectors for your hardware. A good-quality PSU is important because it supplies power to your entire system."
        },


        "power-supply-wattage": {
            title: "What does PSU wattage mean?",
            simple:
                "PSU wattage describes roughly how much electrical power the power supply can provide.",
            more:
                "For example, a 650W PSU can provide up to around 650 watts under its rated conditions. Your actual PC power usage changes depending on the CPU, GPU and workload."
        },


        "graphics-card": {
            title: "What is a graphics card?",
            simple:
                "A graphics card is the hardware containing your GPU. It is responsible for rendering the graphics in games.",
            more:
                "Graphics cards contain a GPU, VRAM and other components. They are one of the most important parts of a gaming PC."
        },


        "resolution": {
            title: "What is resolution?",
            simple:
                "Resolution describes how many pixels are displayed on your screen. Higher resolutions can produce a sharper image.",
            more:
                "Common gaming resolutions include 1920×1080 (1080p), 2560×1440 (1440p) and 3840×2160 (4K). Higher resolutions require more GPU performance."
        },


        "1080p": {
            title: "What is 1080p?",
            simple:
                "1080p is a common gaming resolution with 1920×1080 pixels.",
            more:
                "1080p is relatively easy for modern gaming PCs to run, making it a popular choice for budget gaming systems."
        },


        "1440p": {
            title: "What is 1440p?",
            simple:
                "1440p is a sharper resolution than 1080p and is a popular choice for higher-end gaming.",
            more:
                "1440p uses 2560×1440 pixels. It requires more GPU performance than 1080p but provides a noticeable increase in image detail."
        },


        "4k": {
            title: "What is 4K?",
            simple:
                "4K gaming normally means a resolution of 3840×2160 pixels.",
            more:
                "4K contains four times as many pixels as 1080p. This makes games look very detailed, but it also requires considerably more GPU performance."
        },


        "ray-tracing": {
            title: "What is ray tracing?",
            simple:
                "Ray tracing is a graphics technology that can make lighting, reflections and shadows look more realistic.",
            more:
                "Ray tracing simulates how light behaves in a scene. It can significantly increase GPU workload, so technologies such as DLSS and other upscaling methods can help maintain higher FPS."
        },


        dlss: {
            title: "What is DLSS?",
            simple:
                "DLSS is NVIDIA technology that can increase gaming performance while maintaining good image quality.",
            more:
                "DLSS uses AI-based reconstruction and upscaling to render games at a lower internal resolution and produce a higher-resolution output. Support varies between games and NVIDIA GPU generations."
        },


        "frame-generation": {
            title: "What is Frame Generation?",
            simple:
                "Frame Generation creates additional frames to make supported games appear smoother.",
            more:
                "Frame Generation uses graphics hardware and AI-based techniques to generate additional frames between traditionally rendered frames. It can increase displayed FPS, although it is different from simply rendering more frames normally."
        },


        "bottleneck": {
            title: "What is a bottleneck?",
            simple:
                "A bottleneck happens when one part of your PC limits the performance of another part.",
            more:
                "For example, a CPU may limit a powerful GPU in some games, while a GPU may be the limiting component at high graphics settings and resolutions. Bottlenecks are normal; the goal is to build a balanced PC."
        },


        "upgrade": {
            title: "What does upgradeable mean?",
            simple:
                "An upgradeable PC has components that can potentially be replaced or improved later.",
            more:
                "Common upgrades include adding RAM or storage and replacing the GPU. CPU upgrades depend on your motherboard's socket and BIOS support."
        },


        "windows": {
            title: "What is Windows?",
            simple:
                "Windows is the operating system that lets you use your PC, run games and install applications.",
            more:
                "Windows manages your hardware and provides the environment where games and programs run. A legitimate Windows licence is separate from the physical PC hardware."
        }

    };


    /* =========================================
       BUTTON EVENTS
    ========================================= */

    helpButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const key =
                getHelpKey(button);

            const explanation =
                explanations[key];


            if (!explanation) {
                console.warn(
                    `Brento Help: No explanation found for "${key}".`
                );

                return;
            }


            showHelpPopup(explanation);

        });

    });


    /* =========================================
       FIND HELP KEY
    ========================================= */

    function getHelpKey(button) {

        const dataKey =
            button.getAttribute(
                "data-help"
            );


        if (dataKey) {
            return dataKey.trim().toLowerCase();
        }


        const ariaLabel =
            button.getAttribute(
                "aria-label"
            );


        if (!ariaLabel) {
            return "";
        }


        return convertLegacyLabel(
            ariaLabel
        );

    }


    /* =========================================
       LEGACY LABEL SUPPORT
       Keeps older Brento buttons working.
    ========================================= */

    function convertLegacyLabel(label) {

        const legacyMap = {

            "What is an NVMe SSD?": "nvme",
            "What is RAM?": "ram",
            "What is Wi-Fi 6?": "wifi",
            "What is refresh rate?": "refresh-rate",
            "What is RAM speed?": "ram-speed",
            "What is VRAM?": "vram",
            "What is a GPU?": "gpu",
            "What is a CPU?": "cpu",
            "What is FPS?": "fps",
            "What is DDR4?": "ddr4"

        };


        return legacyMap[label] || "";
    }


    /* =========================================
       CREATE HELP POPUP
    ========================================= */

    function showHelpPopup(explanation) {

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
                tabindex="-1"
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
                    ${escapeHTML(explanation.title)}
                </h3>

                <p class="help-popup-simple">
                    ${escapeHTML(explanation.simple)}
                </p>

                <details class="help-popup-more">

                    <summary>
                        Want to know more?
                    </summary>

                    <p>
                        ${escapeHTML(explanation.more)}
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

        const dialog =
            popup.querySelector(
                ".help-popup-card"
            );


        const previousFocus =
            document.activeElement;


        let isClosing = false;


        /* =========================================
           CLOSE POPUP
        ========================================= */

        const closePopup = () => {

            if (isClosing) {
                return;
            }


            isClosing = true;


            popup.remove();


            document.removeEventListener(
                "keydown",
                escapeHandler
            );


            if (
                previousFocus &&
                typeof previousFocus.focus === "function"
            ) {
                previousFocus.focus();
            }

        };


        /* =========================================
           ESCAPE KEY
        ========================================= */

        const escapeHandler =
            (event) => {

                if (event.key === "Escape") {
                    event.preventDefault();
                    closePopup();
                }

            };


        /* =========================================
           EVENTS
        ========================================= */

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
            escapeHandler
        );


        /* =========================================
           FOCUS
        ========================================= */

        dialog.focus();

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

});
