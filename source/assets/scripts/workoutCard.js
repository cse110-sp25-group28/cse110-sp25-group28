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
                background-color: #fff;
                border-radius: 12px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                width: 250px;
                height: auto;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-bottom: 1rem;
                // transition: transform 0.2s ease-in-out;
                transition:
                    transform 0.4s ease,
                    top 0.4s ease,
                    left 0.4s ease,
                    cursor: pointer;
                    position: relative;
            }

            article:hover {
                transform: translateY(-4px);
            }

            /* Enlarged state styling */
            article.enlarged {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(1.5);
                z-index: 1000;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
                transition:
                    transform 0.4s ease,
                    top 0.4s ease,
                    left 0.4s ease,
            }

            article > img {
                width: 100%;
                height: 200px;
                object-fit: cover;
            }

            h2.name {
                font-size: 1.1rem;
                margin: 1rem 0 0.5rem;
                color: #333;
            }

            h2.name a {
                text-decoration: none;
                color: inherit;
            }

            p {
                font-size: 0.9rem;
                margin: 0.3rem 0;
                color: #555;
                text-align: center;
                padding: 0 1rem;
            }

            .category {
                font-weight: bold;
            }

            .muscle {
                font-style: sans-serif;
                color: #888;
            }
    `;

     // Add click listener to article
    articleEl.addEventListener("click", () => {
      // Tell the outside world "I was clicked"
      this.dispatchEvent(new CustomEvent("workout-card-clicked", {
        bubbles: true,     // allow the event to bubble up
        composed: true,    // allow it to escape the Shadow DOM
        detail: { card: this } // include a reference to this card
      }));
    });

    shadowEl.append(articleEl);
    shadowEl.append(styleEl);
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
                                    "category": "string",
                                    "muscle": "string",
                                    "description": "string",
                                    "image": "string"
                                },
   */
  set data(data) {
    if (!data) return;

    if (typeof data.muscle === 'string' && data.muscle.trim() !== '') {
      // Normal case: store muscle name
      this.dataset.muscle = data.muscle.toLowerCase();
    } else {
      // Fallback: no valid muscle
      this.dataset.muscle = '';
    }

    if (typeof data.category === 'string' && data.category.trim() !== '') {
      this.dataset.category = data.category.toLowerCase();
    } else {
      this.dataset.category = '';
    }

    const cardEl = this.shadowRoot.querySelector("article");
    cardEl.innerHTML = `
        <img src="${data.image}" alt="${data.name}">
        <h2 class="name">
          <a>${data.name}</a>
        </h2>
        <p class="category">${data.category}</p>
        <p class="muscle">${data.muscle}</p>
        <p class="description">${data.description}</p>
      `;
  }


  // Utility methods for outside code to use

  enlargeCard() {
    const article = this.shadowRoot.querySelector("article");
    article.classList.add("enlarged");
  }

  shrinkCard() {
    const article = this.shadowRoot.querySelector("article");
    article.classList.remove("enlarged");
  }

  toggleCard() {
    const article = this.shadowRoot.querySelector("article");
    article.classList.toggle("enlarged");
  }

  isEnlarged() {
    const article = this.shadowRoot.querySelector("article");
    return article.classList.contains("enlarged");
  }

}

customElements.define("workout-card", WorkoutCard);
