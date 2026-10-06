 /* =========================================
    BRENTO — MOBILE MENU
    Accessible responsive navigation
 ========================================= */

 document.addEventListener("DOMContentLoaded", () => {

     const menuButton =
         document.querySelector(".mobile-menu-button");

     const navigation =
         document.querySelector(".main-nav");


     if (!menuButton || !navigation) {
         return;
     }


     /* =========================================
        STATE
     ========================================= */

     let isOpen = false;


     /* =========================================
        INITIAL SETUP
     ========================================= */

     menuButton.setAttribute(
         "aria-expanded",
         "false"
     );

     menuButton.setAttribute(
         "aria-label",
         "Open menu"
     );


     navigation.setAttribute(
         "aria-hidden",
         "true"
     );


     /* =========================================
        OPEN MENU
     ========================================= */

     function openMenu() {

         if (isOpen) {
             return;
         }


         isOpen = true;


         navigation.classList.add(
             "mobile-open"
         );


         menuButton.setAttribute(
             "aria-expanded",
             "true"
         );


         menuButton.setAttribute(
             "aria-label",
             "Close menu"
         );


         navigation.setAttribute(
             "aria-hidden",
             "false"
         );


         document.body.classList.add(
             "mobile-menu-open"
         );


         const firstLink =
             navigation.querySelector("a");


         if (firstLink) {
             requestAnimationFrame(() => {
                 firstLink.focus();
             });
         }

     }


     /* =========================================
        CLOSE MENU
     ========================================= */

     function closeMenu(
         returnFocus = false
     ) {

         if (!isOpen) {
             return;
         }


         isOpen = false;


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


         navigation.setAttribute(
             "aria-hidden",
             "true"
         );


         document.body.classList.remove(
             "mobile-menu-open"
         );


         if (returnFocus) {
             menuButton.focus();
         }

     }


     /* =========================================
        TOGGLE MENU
     ========================================= */

     menuButton.addEventListener(
         "click",
         () => {

             if (isOpen) {
                 closeMenu(true);
             } else {
                 openMenu();
             }

         }
     );


     /* =========================================
        NAVIGATION LINKS
     ========================================= */

     const navigationLinks =
         navigation.querySelectorAll("a");


     navigationLinks.forEach((link) => {

         link.addEventListener(
             "click",
             () => {

                 closeMenu(false);

             }
         );

     });


     /* =========================================
        ESCAPE KEY
     ========================================= */

     document.addEventListener(
         "keydown",
         (event) => {

             if (
                 event.key === "Escape" &&
                 isOpen
             ) {

                 event.preventDefault();

                 closeMenu(true);

             }

         }
     );


     /* =========================================
        CLICK OUTSIDE MENU
     ========================================= */

     document.addEventListener(
         "click",
         (event) => {

             if (!isOpen) {
                 return;
             }


             const clickedInsideNavigation =
                 navigation.contains(
                     event.target
                 );

             const clickedMenuButton =
                 menuButton.contains(
                     event.target
                 );


             if (
                 !clickedInsideNavigation &&
                 !clickedMenuButton
             ) {

                 closeMenu(false);

             }

         }
     );


     /* =========================================
        ESCAPE WHEN FOCUS LEAVES
     ========================================= */

     navigation.addEventListener(
         "keydown",
         (event) => {

             if (
                 event.key !== "Tab" ||
                 !isOpen
             ) {
                 return;
             }


             const focusableElements =
                 navigation.querySelectorAll(
                     "a[href], button:not([disabled])"
                 );


             if (!focusableElements.length) {
                 return;
             }


             const firstElement =
                 focusableElements[0];

             const lastElement =
                 focusableElements[
                     focusableElements.length - 1
                 ];


             if (
                 event.shiftKey &&
                 document.activeElement === firstElement
             ) {

                 event.preventDefault();

                 lastElement.focus();

             } else if (
                 !event.shiftKey &&
                 document.activeElement === lastElement
             ) {

                 event.preventDefault();

                 firstElement.focus();

             }

         }
     );


     /* =========================================
        DESKTOP RESET
        Prevents the mobile state surviving
        when resizing back to desktop.
     ========================================= */

     const desktopBreakpoint =
         window.matchMedia(
             "(min-width: 769px)"
         );


     function handleDesktopChange(event) {

         if (event.matches) {
             closeMenu(false);
         }

     }


     if (
         typeof desktopBreakpoint.addEventListener ===
         "function"
     ) {

         desktopBreakpoint.addEventListener(
             "change",
             handleDesktopChange
         );

     } else {

         desktopBreakpoint.addListener(
             handleDesktopChange
         );

     }


     /* =========================================
        PAGE VISIBILITY
        Reset the menu if the browser/tab
        becomes hidden.
     ========================================= */

     document.addEventListener(
         "visibilitychange",
         () => {

             if (
                 document.visibilityState ===
                 "hidden"
             ) {

                 closeMenu(false);

             }

         }
     );

 });
