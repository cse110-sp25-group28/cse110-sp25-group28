// workoutCard.js

class WorkoutCard extends HTMLElement {
  // Called once when document.createElement('workout-card') is called, or
  // the element is written into the DOM directly as <workout-card>
  constructor() {
    super(); // Inherit everything from HTMLElement
    let shadowEl = this.attachShadow({ mode: 'open' });
    let articleEl = document.createElement('article');
    let styleEl = document.createElement('style');

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
                transition: transform 0.2s ease-in-out;
            }

            article:hover {
                transform: translateY(-4px);
            }

            article > img {
                width: 100%;
                height: 160px;
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
                font-style: italic;
                color: #888;
            }
    `;
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
   * @param {Object} data - The data to pass into the <recipe-card> must be of the
   *                        following format:
   *                        {
   *                          "imgSrc": "string",
   *                          "imgAlt": "string",
   *                          "titleLnk": "string",
   *                          "titleTxt": "string",
   *                          "organization": "string",
   *                          "rating": number,
   *                          "numRatings": number,
   *                          "lengthTime": "string",
   *                          "ingredients": "string"
   *                        }
   */
  set data(data) {
    if (!data) return;

    const cardEl = this.shadowRoot.querySelector('article');
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
}

customElements.define("workout-card", WorkoutCard);