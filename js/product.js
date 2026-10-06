 /* =========================================
    BRENTO — PRODUCT SYSTEM
    Product configurator + pricing
 ========================================= */

 document.addEventListener("DOMContentLoaded", () => {

     const options =
         document.querySelectorAll(
             ".product-option"
         );

     const totalPrice =
         document.querySelector(
             "#product-total-price"
         );

     if (!options.length || !totalPrice) {
         return;
     }


     const basePrice = 399;


     function updatePrice() {

         let total = basePrice;


         options.forEach((option) => {

             const selected =
                 option.options[
                     option.selectedIndex
                 ];

             if (!selected) {
                 return;
             }


             const additionalPrice =
                 Number(
                     selected.dataset.price || 0
                 );


             total += additionalPrice;

         });


         totalPrice.textContent =
             `£${total.toLocaleString("en-GB")}`;


         totalPrice.animate(
             [
                 {
                     transform:
                         "scale(1)",
                     opacity: 0.65
                 },
                 {
                     transform:
                         "scale(1.06)",
                     opacity: 1
                 },
                 {
                     transform:
                         "scale(1)",
                     opacity: 1
                 }
             ],
             {
                 duration: 220,
                 easing: "ease-out"
             }
         );

     }


     options.forEach((option) => {

         option.addEventListener(
             "change",
             updatePrice
         );

     });


     updatePrice();


     const enquiryButton =
         document.querySelector(
             ".product-buy-button"
         );


     if (enquiryButton) {

         enquiryButton.addEventListener(
             "click",
             () => {

                 const selectedOptions = [];


                 options.forEach((option) => {

                     const selected =
                         option.options[
                             option.selectedIndex
                         ];


                     if (!selected) {
                         return;
                     }


                     selectedOptions.push({
                         name:
                             option.dataset.option ||
                             "Option",

                         value:
                             selected.textContent.trim(),

                         price:
                             Number(
                                 selected.dataset.price || 0
                             )
                     });

                 });


                 const enquiryData = {
                     product:
                         "Brento Starter",

                     basePrice,

                     total:
                         calculateTotal(
                             selectedOptions
                         ),

                     options:
                         selectedOptions
                 };


                 console.log(
                     "Brento enquiry:",
                     enquiryData
                 );


                 showEnquiryMessage(
                     enquiryData
                 );

             }
         );

     }


     function calculateTotal(
         selectedOptions
     ) {

         return basePrice +
             selectedOptions.reduce(
                 (
                     total,
                     option
                 ) => {

                     return total +
                         option.price;

                 },
                 0
             );

     }


     function showEnquiryMessage(
         enquiryData
     ) {

         const existing =
             document.querySelector(
                 ".product-enquiry-message"
             );


         if (existing) {
             existing.remove();
         }


         const message =
             document.createElement(
                 "div"
             );


         message.className =
             "product-enquiry-message";


         message.innerHTML = `
             <div>
                 <strong>
                     Enquiry ready
                 </strong>

                 <p>
                     Your Brento Starter is configured
                     at £${enquiryData.total.toLocaleString("en-GB")}.
                     A real enquiry form will be connected
                     here later.
                 </p>
             </div>

             <button
                 type="button"
                 aria-label="Close enquiry message"
             >
                 ×
             </button>
         `;


         document.body.appendChild(
             message
         );


         const closeButton =
             message.querySelector(
                 "button"
             );


         closeButton.addEventListener(
             "click",
             () => {
                 message.remove();
             }
         );


         setTimeout(
             () => {

                 if (
                     document.body.contains(
                         message
                     )
                 ) {
                     message.remove();
                 }

             },
             6000
         );

     }

 });
