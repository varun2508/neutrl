import { NextApiRequest } from "next";

export default function ({
    req,
    shop,
}: {
    req: NextApiRequest;
    shop: any;
}): String {
    return `
  var css = \`.neutrl-cart-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 16px;
      padding-bottom: 15px;
      width: 100%;
  }

  .neutrl-cart-container.neutrl--inactive {
      display: none;
  }

  .neutrl-cart-container .neutrl__cta-wrapper .neutrl__cta {
      display: flex;
      justify-content: center;
      align-items: center;
      max-height: 20px;
      cursor: pointer;
  }

  .neutrl-cart-container .neutrl__cta-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  }

  .neutrl-cart-container .neutrl-powered-by {
    cursor: pointer;
    font-size: 14px;
    padding: 4px 0;
    display: flex;
  }

  .neutrl-cart-container .neutrl-powered-by span {
    display: flex;
    padding-left: 4px;
  }

  .neutrl-cart-container .neutrl-powered-by svg {
    vertical-align: text-bottom;
  }

  .neutrl-cart-container .neutrl__cta-wrapper .neutrl__cta .neutrl__label {
      display: flex;
      align-items: center;
      justify-content: start;
      cursor: pointer;
  }

  .neutrl-cart-container .neutrl__cta-wrapper .neutrl__cta .neutrl__label span {
      display: inline;
  }
  span.neutrl-logo svg {
      width: 58px;
      height: 21px;
  }

  .neutrl-info svg {
    width: 16px;
    height: 16px;
  }

  .neutrl-body-overlay {
    position: fixed;
    z-index: 2147483645;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
    display: block;
    opacity: 0;
    transition: opacity 100ms ease-in-out;
    pointer-events: none;
  }
  .neutrl-body-overlay.neutrl-is-enabled {
    opacity: 1;
    pointer-events: all;
  }

  body.neutrl-is-enabled {
    overflow: hidden;
  }
  
  .neutrl-modal {
    opacity: 0;
    position: fixed;
    left: 50%;
    top: 25%;
    transform: translate(-50%, -20%);
    min-height: 0px;
    min-width: 0px;
    width: 520px;
    border-radius: 16px;
    text-align: center;
    z-index: 2147483647;
    background-color: #fff;
    color: #01110c;
    font-family: sans-serif;
    transition: all 250ms ease-in-out;
    pointer-events: none;
  }
  .neutrl-modal-body-wrapper {
    padding: 16px;
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .neutrl-modal-body {
    max-width: 665px;
  }
  .neutrl-modal hr {
    width: 85%;
    margin: 25px auto;
    border: 0;
    border-bottom: 1px solid #c7d0ce;
  }
  .neutrl-modal p {
    color: #3e5f72;
  }
  .neutrl-modal p.neutrl-modal-subtitle {
    font-size: 20px;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 45px;
  }
  .neutrl-modal h3.neutrl-modal-title {
    font-size: 30px;
    margin-bottom: 15px;
    font-weight: 700;
  }
  .neutrl-modal.neutrl-is-enabled {
    align-items: center;
    display: flex;
    flex-direction: column;
    z-index: 2147483647;
    opacity: 1;
    transform: translate(-50%, -25%);
    pointer-events: all;
  }
  .neutrl-modal-close {
    align-self: flex-end;
  }
  .neutrl-modal-close button {
    appearance: none;
    -webkit-appearance: none;
    background: none;
    background-color: none;
    border: none;
    cursor: pointer;
    width: 40px;
    height: 40px;
    color: #ccc;
    padding: unset;
  }
  .neutrl-modal-close button svg {
    width: 32px;
    height: 32px;
  }
  .neutrl-modal-process {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    margin-bottom: 25px;
  }
  .neutrl-modal-process span {
    max-width: 30%;
  }
  .neutrl-modal-process img.neutrl-modal-icon {
    max-width: 62px;
    width: auto;
    margin-bottom: 15px;
    margin-left: auto;
    margin-right: auto;
  }
  .neutrl-modal-process .neutrl-modal-arrow {
    width: auto;
    height: auto;
    align-self: start;
    padding-top: 20px;
  }
  .neutrl-modal-footer {
    border-radius: 16px;
    background-color: #e5e5e5;
    width: 100%;
    padding: 32px 16px;
    margin-bottom: -16px;
  }
  .neutrl-modal-footer button {
    appearance: none;
    -webkit-appearance: none;
    background: none;
    background-color: none;
    border: none;
    cursor: pointer;
    background-color: #00e992;
    font-weight: 600;
    color: #000;
    border-radius: 64px;
    padding: 20px;
    width: 100%;
    max-width: 665px;
    font-size: 20px;
    transition: background-color 200ms ease-in-out;
    transition-delay: 20ms;
  }
  .neutrl-modal-footer button:hover {
    background-color: #00c77d;
  }

  .neutrl-modal-subtitle span {
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
  }

  .neutrl-modal-subtitle svg {
    width: auto;
    height: 20px;
  }
  @media screen and (max-width: 640px) {
    .neutrl-modal {
      width: 100vw;
      height: 100%;
      overflow: hidden;
      top: 0;
      left: 0;
      border-radius: 0;
      transform: translate(0,0) !important;
      position: fixed;
    }
    .neutrl-modal-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 32px 16px;
      margin-bottom: unset;
    }
    .neutrl-modal-body {
      max-height: 70.3vh;
      padding-bottom: 15px;
      overflow: hidden scroll;
    }
    .neutrl-modal-process {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .neutrl-modal-process span {
      max-width: 50%;
    }
    .neutrl-modal-process span {
      margin-bottom: 25px;
    }
    .neutrl-modal-process .neutrl-modal-arrow {
      display: none;
    }
  }

  .neutrl__checkbox {
    position: absolute;
    opacity: 0;
  }

  .neutrl__label {
    position: relative;
  }

  .neutrl__label:before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: white;
    border: 1px solid black;
    border-radius: 2px;
  }
  
  
  .neutrl__label:before {
    content: '';
    margin-right: 10px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: white;
    border: 1px solid black;
    border-radius: 2px;
  }
  .neutrl__cta:hover .neutrl__label:before {
    background-color: #ccc;
  }

  .neutrl__checkbox:checked + .neutrl__label:before {
    background: #216bce;
  }

  .neutrl__checkbox:checked + .neutrl__label:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 10px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 
      2px 0 0 white,
      4px 0 0 white,
      4px -2px 0 white,
      4px -4px 0 white,
      4px -6px 0 white,
      4px -8px 0 white;
    transform: rotate(45deg);
  }

  .neutrl__accent {
      color: #45b357;
      font-weight: bold;
  }\`;
  var head = document.head || document.getElementsByTagName('head')[0]
  var body = document.body || document.getElementByTagName('body')[0]
  var shop = ${JSON.stringify(shop)}

  function gramsToPounds(grams) {
    return grams * 0.00220462;
  }

  function initialize() {
      var style = document.createElement('style');
      head.appendChild(style)
      style.type = 'text/css'
      if(style.styleSheet) {
          // Requried for IE8 and lower
          style.styleSheet.cssText = css;
      } else {
          style.appendChild(document.createTextNode(css))
      }
      var modalBackground = document.createElement('div');
      modalBackground.classList.add('neutrl-body-overlay');
      var modalContainer = document.createElement('div');
      modalContainer.classList.add('neutrl-modal', 'neutrl-modal-cart');
      modalContainer.innerHTML = \`

      <div class="neutrl-modal-body-wrapper">
      <div class="neutrl-modal-close">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <div class="neutrl-modal-body">
      <h3 class="neutrl-modal-title">Make your order carbon neutral</h3>
      <hr style="width: 85%;" />
      <p class="neutrl-modal-subtitle">
        In the pursuit of carbon neutrality, we partnered with
        <span
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 145.27">
            <defs>
              <clipPath id="clip-path">
                <path d="M0 0h575v145.27H0z" class="cls-1"></path>
              </clipPath>
              <pattern
                id="Unnamed_Pattern_2"
                width="40.8"
                height="40.8"
                data-name="Unnamed Pattern 2"
                patternTransform="matrix(1.83 0 0 -1.83 -6030.93 23297.76)"
                patternUnits="userSpaceOnUse"
              >
                <path d="M0 0h40.8v40.8H0z" class="cls-1"></path>
                <path d="M0 0h40.8v40.8H0z" class="cls-2"></path>
              </pattern>
              <style>
                .cls-1 {
                  fill: none;
                }
                .cls-2 {
                  fill: #00ea93;
                }
                .cls-3 {
                  clip-path: url(#clip-path);
                }
                .cls-5 {
                  fill: #002217;
                }
              </style>
            </defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" class="cls-3" data-name="Layer 1">
                <g class="cls-3">
                  <path
                    d="M155.59.92h-35.1l7.94 23.9H146a14.34 14.34 0 0114.35 14.34v81.29h-18.84l-20.69-62.09A84 84 0 0041.14.92H29.6A28.68 28.68 0 00.92 29.6v49.29a65.46 65.46 0 0065.46 65.46H100L77.35 76.44a28.69 28.69 0 00-27.21-19.61H47l21.22 63.62a43.35 43.35 0 01-43.4-43.36V24.82h15a63.81 63.81 0 0160.52 43.61l22.06 66.12a14.34 14.34 0 0013.6 9.8h19.62a28.68 28.68 0 0028.68-28.69V29.6A28.68 28.68 0 00155.59.92"
                    class="cls-2"
                  ></path>
                  <path
                    fill="none"
                    stroke="url(#Unnamed_Pattern_2)"
                    stroke-miterlimit="10"
                    stroke-width="1.83"
                    d="M155.59.92h-35.1l7.94 23.9H146a14.34 14.34 0 0114.35 14.34v81.29h-18.84l-20.69-62.09A84 84 0 0041.14.92H29.6A28.68 28.68 0 00.92 29.6v49.29a65.46 65.46 0 0065.46 65.46H100L77.35 76.44a28.69 28.69 0 00-27.21-19.61H47l21.22 63.62a43.35 43.35 0 01-43.4-43.36V24.82h15a63.81 63.81 0 0160.52 43.61l22.06 66.12a14.34 14.34 0 0013.6 9.8h19.62a28.68 28.68 0 0028.68-28.69V29.6A28.68 28.68 0 00155.59.92z"
                  ></path>
                  <path
                    d="M226.35 24.86h19.88l43.12 71.13h.77l-1.03-27.63v-43.5h16.78v94.11h-20.01L243 48.1h-.77l.9 26.72v44.15h-16.78V24.86zM349.5 49.26c18.84 0 31.5 11.62 31.5 31.37a51.62 51.62 0 01-.52 7.74H333v3.75c0 9.42 6.72 15.62 16.66 15.62 8.13 0 14.07-4 15.88-9.81h15.88c-2.72 13.42-15.11 22.33-31.76 22.33-20.79 0-33.05-13.94-33.05-35.63 0-22.33 12.91-35.37 32.92-35.37M365 77.4v-1.81c0-8.39-6.33-13.94-15.75-13.94-9.68 0-16.27 5.81-16.27 14.46v1.29zM452 119h-13.95L436 106.45h-1.16c-3.87 8.38-11.75 13.81-22.59 13.81-14.84 0-22.85-10.07-22.85-26.6V50.55h16.14v40.79c0 10.59 4.77 15.75 13.29 15.75 10.59 0 17.17-8.52 17.17-20.52v-36h16zM502.2 63.59v-13h-13.95v-22l-15.85 5.27v16.7h-12.29v13h12.27v42.6c0 7.62 3.23 12.78 13 12.78h16.82v-12.75h-13.95v-42.6zM551 50.55v13h-21.3V119h-16V64.23c0-6.06 1.42-13.68 13.81-13.68zM559.12 23.57H575v95.4h-15.88z"
                    class="cls-5"
                  ></path>
                </g>
              </g>
            </g></svg
        ></span>
        to offset the emissions of your order.
      </p>
      <div class="neutrl-modal-process">
        <span>
          <img
            src="${process.env.HOST}/images/cart.png"
            alt="Add items you love to your cart"
            class="neutrl-modal-icon"
          />
          <p>Add items you love to your cart</p>
        </span>
        <span class="neutrl-modal-arrow">
          <img
            src="${process.env.HOST}/images/arrow-icon.png"
            alt=""
          />
        </span>
        <span>
          <img
            src="${process.env.HOST}/images/neutrl.png"
            alt="Add Neutrl to your cart"
            class="neutrl-modal-icon"
          />
          <p>Add Neutrl to your cart</p>
        </span>

        <span class="neutrl-modal-arrow">
          <img
            src="${process.env.HOST}/images/arrow-icon.png"
            alt=""
          />
        </span>
        <span>
          <img
            src="${process.env.HOST}/images/planet.png"
            alt="We remove CO2 from the atmosphere with your purchase"
            class="neutrl-modal-icon"
          />
          <p>We remove CO2 from the atmosphere with your purchase</p></span
        >
      </div>
    </div>
      </div>

    <div class="neutrl-modal-footer">
      <button>Save the planet</button>
    </div>\`
      body.appendChild(modalBackground)
      body.appendChild(modalContainer)
      
      var neutrlCartPage = document.querySelector('.neutrl-cart-container.neutrl--inactive');
      // Get cart data and start rest of functionality
      fetch('/cart.js').then(response => response.json()).then(data => {
          var cart = data;
          var weight = gramsToPounds(cart.total_weight)
          var API_URL='${process.env.API_URL}'
          var htmlTemplate1 = \`<!-- Checkbox -->
<div class="neutrl__cta-wrapper">
          <div class="neutrl__cta">
<input type="checkbox" name="neutrl_order" class="neutrl__checkbox" id="neutrl_order">
<label for="neutrl_order" class="neutrl__label"><span>Make your order Carbon Neutral
<span class="neutrl__price_estimate"></span></span>
</label>
</div>

<div class="neutrl-powered-by neutrl-info-btn">
With <span aria-label="neutrl" class="neutrl-logo">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 145.27">
  <defs>
    <clipPath id="clip-path">
      <path d="M0 0h575v145.27H0z" class="cls-1"/>
    </clipPath>
    <pattern id="Unnamed_Pattern_2" width="40.8" height="40.8" data-name="Unnamed Pattern 2" patternTransform="matrix(1.83 0 0 -1.83 -6030.93 23297.76)" patternUnits="userSpaceOnUse">
      <path d="M0 0h40.8v40.8H0z" class="cls-1"/>
      <path d="M0 0h40.8v40.8H0z" class="cls-2"/>
    </pattern>
    <style>
      .cls-1{fill:none}.cls-2{fill:#00ea93}.cls-3{clip-path:url(#clip-path)}.cls-5{fill:#002217}
    </style>
  </defs>
  <g id="Layer_2" data-name="Layer 2">
    <g id="Layer_1-2" class="cls-3" data-name="Layer 1">
      <g class="cls-3">
        <path d="M155.59.92h-35.1l7.94 23.9H146a14.34 14.34 0 0114.35 14.34v81.29h-18.84l-20.69-62.09A84 84 0 0041.14.92H29.6A28.68 28.68 0 00.92 29.6v49.29a65.46 65.46 0 0065.46 65.46H100L77.35 76.44a28.69 28.69 0 00-27.21-19.61H47l21.22 63.62a43.35 43.35 0 01-43.4-43.36V24.82h15a63.81 63.81 0 0160.52 43.61l22.06 66.12a14.34 14.34 0 0013.6 9.8h19.62a28.68 28.68 0 0028.68-28.69V29.6A28.68 28.68 0 00155.59.92" class="cls-2"/>
        <path fill="none" stroke="url(#Unnamed_Pattern_2)" stroke-miterlimit="10" stroke-width="1.83" d="M155.59.92h-35.1l7.94 23.9H146a14.34 14.34 0 0114.35 14.34v81.29h-18.84l-20.69-62.09A84 84 0 0041.14.92H29.6A28.68 28.68 0 00.92 29.6v49.29a65.46 65.46 0 0065.46 65.46H100L77.35 76.44a28.69 28.69 0 00-27.21-19.61H47l21.22 63.62a43.35 43.35 0 01-43.4-43.36V24.82h15a63.81 63.81 0 0160.52 43.61l22.06 66.12a14.34 14.34 0 0013.6 9.8h19.62a28.68 28.68 0 0028.68-28.69V29.6A28.68 28.68 0 00155.59.92z"/>
        <path d="M226.35 24.86h19.88l43.12 71.13h.77l-1.03-27.63v-43.5h16.78v94.11h-20.01L243 48.1h-.77l.9 26.72v44.15h-16.78V24.86zM349.5 49.26c18.84 0 31.5 11.62 31.5 31.37a51.62 51.62 0 01-.52 7.74H333v3.75c0 9.42 6.72 15.62 16.66 15.62 8.13 0 14.07-4 15.88-9.81h15.88c-2.72 13.42-15.11 22.33-31.76 22.33-20.79 0-33.05-13.94-33.05-35.63 0-22.33 12.91-35.37 32.92-35.37M365 77.4v-1.81c0-8.39-6.33-13.94-15.75-13.94-9.68 0-16.27 5.81-16.27 14.46v1.29zM452 119h-13.95L436 106.45h-1.16c-3.87 8.38-11.75 13.81-22.59 13.81-14.84 0-22.85-10.07-22.85-26.6V50.55h16.14v40.79c0 10.59 4.77 15.75 13.29 15.75 10.59 0 17.17-8.52 17.17-20.52v-36h16zM502.2 63.59v-13h-13.95v-22l-15.85 5.27v16.7h-12.29v13h12.27v42.6c0 7.62 3.23 12.78 13 12.78h16.82v-12.75h-13.95v-42.6zM551 50.55v13h-21.3V119h-16V64.23c0-6.06 1.42-13.68 13.81-13.68zM559.12 23.57H575v95.4h-15.88z" class="cls-5"/>
      </g>
    </g>
  </svg>
</span>
<span class="neutrl-info">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</span></div>
</div>

\`
var htmlTemplate2 = \`<!-- Checkbox -->
<div class="neutrl__cta">
<span for="neutrl_order" class="neutrl__label">Your order is <span aria-label="neutrl" 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 575 145.27">
    <defs>
      <clipPath id="clip-path">
        <path d="M0 0h575v145.27H0z" class="cls-1"/>
      </clipPath>
      <pattern id="Unnamed_Pattern_2" width="40.8" height="40.8" data-name="Unnamed Pattern 2" patternTransform="matrix(1.83 0 0 -1.83 -6030.93 23297.76)" patternUnits="userSpaceOnUse">
        <path d="M0 0h40.8v40.8H0z" class="cls-1"/>
        <path d="M0 0h40.8v40.8H0z" class="cls-2"/>
      </pattern>
      <style>
        .cls-1{fill:none}.cls-2{fill:#00ea93}.cls-3{clip-path:url(#clip-path)}.cls-5{fill:#002217}
      </style>
    </defs>
    <g id="Layer_2" data-name="Layer 2">
      <g id="Layer_1-2" class="cls-3" data-name="Layer 1">
        <g class="cls-3">
          <path d="M155.59.92h-35.1l7.94 23.9H146a14.34 14.34 0 0114.35 14.34v81.29h-18.84l-20.69-62.09A84 84 0 0041.14.92H29.6A28.68 28.68 0 00.92 29.6v49.29a65.46 65.46 0 0065.46 65.46H100L77.35 76.44a28.69 28.69 0 00-27.21-19.61H47l21.22 63.62a43.35 43.35 0 01-43.4-43.36V24.82h15a63.81 63.81 0 0160.52 43.61l22.06 66.12a14.34 14.34 0 0013.6 9.8h19.62a28.68 28.68 0 0028.68-28.69V29.6A28.68 28.68 0 00155.59.92" class="cls-2"/>
          <path fill="none" stroke="url(#Unnamed_Pattern_2)" stroke-miterlimit="10" stroke-width="1.83" d="M155.59.92h-35.1l7.94 23.9H146a14.34 14.34 0 0114.35 14.34v81.29h-18.84l-20.69-62.09A84 84 0 0041.14.92H29.6A28.68 28.68 0 00.92 29.6v49.29a65.46 65.46 0 0065.46 65.46H100L77.35 76.44a28.69 28.69 0 00-27.21-19.61H47l21.22 63.62a43.35 43.35 0 01-43.4-43.36V24.82h15a63.81 63.81 0 0160.52 43.61l22.06 66.12a14.34 14.34 0 0013.6 9.8h19.62a28.68 28.68 0 0028.68-28.69V29.6A28.68 28.68 0 00155.59.92z"/>
          <path d="M226.35 24.86h19.88l43.12 71.13h.77l-1.03-27.63v-43.5h16.78v94.11h-20.01L243 48.1h-.77l.9 26.72v44.15h-16.78V24.86zM349.5 49.26c18.84 0 31.5 11.62 31.5 31.37a51.62 51.62 0 01-.52 7.74H333v3.75c0 9.42 6.72 15.62 16.66 15.62 8.13 0 14.07-4 15.88-9.81h15.88c-2.72 13.42-15.11 22.33-31.76 22.33-20.79 0-33.05-13.94-33.05-35.63 0-22.33 12.91-35.37 32.92-35.37M365 77.4v-1.81c0-8.39-6.33-13.94-15.75-13.94-9.68 0-16.27 5.81-16.27 14.46v1.29zM452 119h-13.95L436 106.45h-1.16c-3.87 8.38-11.75 13.81-22.59 13.81-14.84 0-22.85-10.07-22.85-26.6V50.55h16.14v40.79c0 10.59 4.77 15.75 13.29 15.75 10.59 0 17.17-8.52 17.17-20.52v-36h16zM502.2 63.59v-13h-13.95v-22l-15.85 5.27v16.7h-12.29v13h12.27v42.6c0 7.62 3.23 12.78 13 12.78h16.82v-12.75h-13.95v-42.6zM551 50.55v13h-21.3V119h-16V64.23c0-6.06 1.42-13.68 13.81-13.68zM559.12 23.57H575v95.4h-15.88z" class="cls-5"/>
        </g>
      </g>
    </g>
  </svg>
</span>
</span>
</div>\`
var offsetQuery = \`query CalculateOffsetQuery($shop: String!,$weight: String!, $distance: String!, $quantity: String!) {
  calculateOffset(options: {shop: $shop, weight: $weight, distance: $distance, quantity: $quantity}) {
    value
    variantId
    offsetWeight
  }
}\`
var shopQuery = \`query Shop($shop: String!) {
  getShop(options: { shop: $shop }) {
    shop {
      id
      shop
      merchantPaysOffset
      calculateOffset
      flatRateOffsetAmount
      appEnabledOnStorefront
    }
  }
}
\`
function calculateOffset(updatedWeightLbs = null, updatedQuantity = null) {
  fetch(API_URL, {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Content-Security-Policy": "connect-src 'self' *.shopifycloud.com *.shopifysvc.com *.amazon.com *.paypal.com *.facebook.com sessions.bugsnag.com analytics.tiktok.com bat.bing.com www.google-analytics.com ct.pinterest.com stats.g.doubleclick.net"
    },
    "body": JSON.stringify({
      query: offsetQuery,
      variables: {
        shop: "${req.query.shop}",
        weight: updatedWeightLbs ? updatedWeightLbs.toString() : weight.toString(),
        distance: "1250",
        quantity: updatedQuantity ? updatedQuantity.toString() : cart.item_count.toString()
      }
    })
  }).then(response => response.json()).then(data => {
    var priceEstimate = data.data.calculateOffset.value
    var neutrlCtas = document.querySelectorAll('.neutrl-cart-container .neutrl__cta-wrapper .neutrl__cta')
    var neutrlInfoBtns = document.querySelectorAll('.neutrl-info-btn');
    var neutrlCheckboxes = document.querySelectorAll('.neutrl-cart-container .neutrl__checkbox')
    var neutrlPriceEstimateLabels = document.querySelectorAll('.neutrl-cart-container .neutrl__price_estimate')
    for(var i = 0; i < neutrlPriceEstimateLabels.length; i++) {
      var neutrlPriceEstimateLabel = neutrlPriceEstimateLabels[i]
      if (priceEstimate && neutrlPriceEstimateLabel) {
        var formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        var formattedPrice = formatter.format(priceEstimate)
        neutrlPriceEstimateLabel.innerHTML = \`for <span style="font-weight: bold;">\` + formattedPrice + \`</span>\`
      }
    }

    var isSubmitting = false;
    for(var i = 0; i < neutrlCtas.length; i++) {
      var neutrlCta = neutrlCtas[i]
      var neutrlCheckbox = neutrlCheckboxes[i]
      var infoBtn = neutrlInfoBtns[i]
      // console.log(infoBtn)
      neutrlCta.setAttribute('data-neutrl-variant', data.data.calculateOffset.variantId)
      neutrlCta.addEventListener('click', function(e) {
        // var neutrlCheckbox = document.querySelector('.neutrl-cart-container .neutrl__checkbox')
        var variantId = neutrlCta.getAttribute('data-neutrl-variant')
        neutrlCheckbox.checked = true;
        e.preventDefault();
        e.stopPropagation();
        var atcData = {
          items: [
            {
              quantity: 1,
              id: variantId
            }
          ]
        }
        if(!isSubmitting) {
              isSubmitting = true;
           fetch('/cart/add.js', {
            method: "POST",
            credentials: 'same-origin',
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify(atcData)
          }).then(() => window.location.reload())
          }
      })
    }

    for (var i = 0; i < neutrlInfoBtns.length; i++) {
      var infoBtn = neutrlInfoBtns[i]
      infoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var popupBackground = document.querySelector('.neutrl-body-overlay')
        var modalContainer = document.querySelector('.neutrl-modal');
        popupBackground.classList.add('neutrl-is-enabled');
        modalContainer.classList.add('neutrl-is-enabled');
        document.body.classList.add('neutrl-is-enabled');
      })
    }

    function hidePopup() {
      var popupBackground = document.querySelector('.neutrl-body-overlay.neutrl-is-enabled');
      var modalContainer = document.querySelector('.neutrl-modal');
      popupBackground.classList.remove('neutrl-is-enabled');
      modalContainer.classList.remove('neutrl-is-enabled');
      document.body.classList.remove('neutrl-is-enabled');
    }
    
    var popupBackground = document.querySelector('.neutrl-body-overlay');
    popupBackground.addEventListener('click', hidePopup)
    var neutrlModalBtns = document.querySelectorAll('.neutrl-modal button');
    for(var i = 0; i < neutrlModalBtns.length; i++) {
      var btn = neutrlModalBtns[i];
      btn.addEventListener('click', hidePopup);
    }
  }).catch(error => {
    console.error(error)
  })
}

// So that every time something changes in the cart, we reload
// the offset amount, this ensures were showing an accurate dollar estimate
// At a later point, we may want to reuse this concept for updating the
// Variant in the cart based on new things adding/removing from cart
(function(ns, fetch) {
    if (typeof fetch !== 'function') return;

    ns.fetch = function() {
        const response = fetch.apply(this, arguments);

        response.then(res => {
          const url = res.url
          if (url.endsWith('/cart/change.js')) {
            res.clone().json().then((data) => {
              if (data && data.total_weight) {
                const newTotalWeight = gramsToPounds(data.total_weight)
                calculateOffset(newTotalWeight, data.item_count)
              }
            });
          };
        });

        return response;
    }

}(window, window.fetch))

// Intercept jquery ajax requests for cart changes
if(typeof window.jQuery !== 'undefined') {
  jQuery( document ).ajaxComplete(function( event, xhr, settings ) {
    if ( settings.url === "/cart/change.js" ) {
      const data = JSON.parse(xhr.responseText)
      const newTotalWeight = gramsToPounds(data.totaWeight)
      calculateOffset(newTotalWeight, data.item_count)
    }
  });
}

  if(shop.getShop.shop == null || typeof shop.getShop.shop === 'undefined') {
    return;
  }
  const shopData = shop.getShop.shop
  const shouldDisplay = (shopData.appEnabledOnStorefront && !shopData.previewMode) || (shopData.appEnabledOnStorefront && shopData.previewMode && window.location.search.toLowerCase().includes('neutrl_preview=true')) 
  if(shouldDisplay) {
    var neutrlParent = document.querySelectorAll('.neutrl-cart-container')
    if(!neutrlParent) {
      return;
    }
    if(!shopData.merchantPaysOffset) {
      for(var i = 0; i < neutrlParent.length; i++) {
        var neutrlContainer = neutrlParent[i];
        neutrlContainer.innerHTML = htmlTemplate1;
      }
    } else {
      for(var i = 0; i < neutrlParent.length; i++) {
        var neutrlContainer = neutrlParent[i];
        neutrlContainer.innerHTML = htmlTemplate2;
      }
    }
  } else {
    var containerInstances1 = document.querySelectorAll('.neutrl-cart-container');
    var modalBg = document.querySelector('.neutrl-body-overlay');
    var modalContainer = document.querySelector('.neutrl-modal');
    for(i = 0; i < containerInstances1.length; i++) {
      var el = containerInstances1[i];
      el.remove()
    }
    modalBg.remove()
    modalContainer.remove()
  }

  var hasOffsetItem = false;
  var carbonNeutralItem = null;
  for(i = 0; i < cart.items.length; i++) {
      var item = cart.items[i]
      if(item.title.toLowerCase().includes('carbon neutral')) {
          hasOffsetItem = true;
          carbonNeutralItem = item.id
      }
  }

  if(!hasOffsetItem) {
    calculateOffset()
  } else {
    var neutrlCheckboxes = document.querySelectorAll('.neutrl-cart-container .neutrl__checkbox')
    var neutrlCtas = document.querySelectorAll('.neutrl-cart-container .neutrl__cta-wrapper .neutrl__cta')
    var neutrlLabels  = document.querySelectorAll('.neutrl-cart-container .neutrl__cta-wrapper .neutrl__label')
    var neutrlInfoBtns = document.querySelectorAll('.neutrl-info-btn');

    for(i = 0; i < neutrlCheckboxes.length; i++) {
      var neutrlCheckbox = neutrlCheckboxes[i];
      var neutrlCta = neutrlCtas[i]
      var neutrlLabel = neutrlLabels[i]
      neutrlCheckbox.checked = true;
      neutrlLabel.innerText = "Your order is Carbon Neutral"
      neutrlCta.addEventListener('click', function(e) {
        e.preventDefault()
        e.stopPropagation()
        var cartUpdateData = {
          updates: {
            [carbonNeutralItem]: 0
          }
        }
        fetch('/cart/update.js', {
          method: "POSt",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(cartUpdateData)
        }).then(() => {
          window.location.reload();
          return;
        })
      })
    }

    for (var i = 0; i < neutrlInfoBtns.length; i++) {
      var infoBtn = neutrlInfoBtns[i]
      infoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var popupBackground = document.querySelector('.neutrl-body-overlay')
        var modalContainer = document.querySelector('.neutrl-modal');
        popupBackground.classList.add('neutrl-is-enabled')
        modalContainer.classList.add('neutrl-is-enabled');
      })
    }

    function hidePopup() {
      var popupBackground = document.querySelector('.neutrl-body-overlay.neutrl-is-enabled');
      var modalContainer = document.querySelector('.neutrl-modal');
      popupBackground.classList.remove('neutrl-is-enabled');
      modalContainer.classList.remove('neutrl-is-enabled');
    }
    
    var popupBackground = document.querySelector('.neutrl-body-overlay');
    popupBackground.addEventListener('click', hidePopup)
    var neutrlModalBtns = document.querySelectorAll('.neutrl-modal button');
    for(var i = 0; i < neutrlModalBtns.length; i++) {
      var btn = neutrlModalBtns[i];
      btn.addEventListener('click', hidePopup);
    }
  }
  })
  }

  document.addEventListener('DOMContentLoaded', initialize())`;
}
