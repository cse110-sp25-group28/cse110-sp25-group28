// workoutCard.js

class WorkoutCard extends HTMLElement {
  // Called once when document.createElement('workout-card') is called, or
  // the element is written into the DOM directly as <workout-card>
  constructor() {
    super(); // Inherit everything from HTMLElement
    let shadowEl = this.attachShadow({ mode: "open" });
    let articleEl = document.createElement("article");
    let styleEl = document.createElement("style");

    styleEl.textContent = `
            * {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            article {
                background-color: transparent;
                border-radius: 12px;
                width: 250px;
                height: 320px;
                perspective: 1000px;
                margin: 1rem;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                position: relative;
            }

            article:hover {
                transform: translateY(-4px);
            }

            .card-inner {
              position: relative;
              width: 100%;
              height: 100%;
              transition: transform 0.6s;
              transform-style: preserve-3d;
            }
            .flipped .card-inner {
              transform: rotateY(180deg);
            }
            .card-front, .card-back {
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              border-radius: 12px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background: #fff;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .card-front img {
              width: 100%;
              height: 200px;
              object-fit: cover;
              border-top-left-radius: 12px;
              border-top-right-radius: 12px;
            }
            .card-front h2.name {
              font-size: 1.1rem;
              margin: 1rem 0 0.5rem;
              color: #333;
            }
            .card-front h2.name a {
              text-decoration: none;
              color: inherit;
            }
            .card-front p {
              font-size: 0.9rem;
              margin: 0.3rem 0;
              color: #555;
              text-align: center;
              padding: 0 1rem;
            }
            .card-front .muscle {
              color: #888;
            }
            .card-back {
              background: #e5e7eb;
              color: #333;
              transform: rotateY(180deg);
              font-size: 1.2rem;
              font-weight: bold;
              justify-content: center;
              align-items: center;
              display: flex;
            }
            .card-back .muscle-label {
              font-size: 1.5rem;
              color: #444;
              text-align: center;
              padding: 1rem;
            }
    `;

    articleEl.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back"></div>
      </div>
    `;

     // Add click listener to article
    articleEl.addEventListener("click", () => {
      // Tell the outside world "I was clicked"
      if (this._disableFlip) return;
      articleEl.classList.toggle("flipped");
      this.dispatchEvent(new CustomEvent("workout-card-clicked", {
        bubbles: true,     // allow the event to bubble up
        composed: true,    // allow it to escape the Shadow DOM
        detail: { card: this } // include a reference to this card
      }));
    });

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
    this.dataset.muscle = data.muscle?.toLowerCase() || '';
    const front = this.shadowRoot.querySelector(".card-front");
    const back = this.shadowRoot.querySelector(".card-back");
    front.innerHTML = `
      <img src="${data.image}" alt="${data.name}">
      <h2 class="name"><a>${data.name}</a></h2>
      <p class="muscle">${data.muscle}</p>
      <p class="description">${data.description}</p>
    `;
    back.innerHTML = `
      <div class="muscle-label">${data.muscle}</div>
    `;
  }

  // Set this property to true to keep the card face up (for selection page)
  set disableFlip(val) {
    this._disableFlip = val;
    if (val) {
      this._articleEl.classList.remove("flipped");
      this._articleEl.style.cursor = "default";
    } else {
      this._articleEl.classList.add("flipped");
      this._articleEl.style.cursor = "pointer";
    }
  }
}

customElements.define("workout-card", WorkoutCard);
