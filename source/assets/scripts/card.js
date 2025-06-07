/**
 * Custom element representing a workout card.
 * Displays workout details on the front and the muscle group on the back.
 * Can be flipped unless flipping is disabled (e.g., in selection mode).
 * @class
 * @extends HTMLElement
 */
class WorkoutCard extends HTMLElement {
  // Called once when document.createElement('workout-card') is called, or
  // the element is written into the DOM directly as <workout-card>
  constructor() {
    super(); // Inherit everything from HTMLElement
    let shadowEl = this.attachShadow({ mode: "open" });
    let articleEl = document.createElement("article");
    let styleEl = document.createElement("style");
    let linkEl = document.createElement("link");
    linkEl.setAttribute("rel", "stylesheet");
    linkEl.setAttribute("href", "./assets/styles/create-deck-styles.css");

    articleEl.innerHTML = `
      <div class="card-inner">
        <div class="card-back"></div>
        <div class="card-front"></div>
      </div>
    `;

    /**
     * Handles click events on the card.
     * Flips the card unless flipping is disabled, and always dispatches a custom event.
     * @event workout-card-clicked
     */
    articleEl.addEventListener("click", () => {
      if (!this._disableFlip) {
        articleEl.classList.toggle("flipped");
      }
      articleEl.classList.toggle("active");
      // Always dispatch the event so selection works!
      this.dispatchEvent(new CustomEvent("workout-card-clicked", {
        bubbles: true,
        composed: true,
        detail: { card: this }
      }));
    });

    shadowEl.append(linkEl);
    shadowEl.append(articleEl);
    shadowEl.append(styleEl);
    this._articleEl = articleEl;
  }

  /**
   * Called when the .data property is set on this element.
   *
   * For example:
   * let workoutCard = document.createElement('workout-card'); // Calls constructor()
   * workoutCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
   *
   * @param {Object} data - The data to pass into the <workout-card> must be of the
   *                        following format:
   *                            {
                                    "name": "string",
                                    "muscle": "string",
                                    "description": "string",
                                    "image": "string"
                                },
   */
    set data(data) {
    if (!data) return;
    this._data = data;

    this.dataset.muscle = data.muscle?.toLowerCase() || '';
    const front = this.shadowRoot.querySelector(".card-front");
    const back = this.shadowRoot.querySelector(".card-back");
    front.innerHTML = `
      <div class="image-wrapper">
        <img src="${data.image}" alt="${data.name}">
      </div>
      <div class="text-content">
        <h2 class="name"><a>${data.name}</a></h2>
        <p class="muscle">${data.muscle}</p>
        <p class="description">${data.description}</p>
      </div>
    `;
    back.innerHTML = `
      <div class="muscle-label">${data.name}</div>
    `;
  }

  get data(){
    return this._data;
  }

  /**
   * Enables or disables flipping for the card.
   * When set to true, the card cannot be flipped and always shows the workout (face up).
   * When set to false, the card can be flipped.
   * @param {boolean} val - Whether to disable flipping.
   */
  set disableFlip(val) {
    this._disableFlip = val;
    if (val) {
      // Selection mode: flipping is disabled, show default cursor
      this._articleEl.style.cursor = "default";
    } else {
      // Flipping is enabled, show pointer cursor
      this._articleEl.style.cursor = "pointer";
    }
  }
}

customElements.define("workout-card", WorkoutCard);
