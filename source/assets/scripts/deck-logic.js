export async function getWorkoutsFromStorage() {
  try {
    const dataURL = "./workouts/workouts.json";
    const response = await fetch(dataURL);
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function getCardData(card) {
  const front = card.shadowRoot.querySelector(".card-front");
  const img = front.querySelector("img");
  const name = front.querySelector(".name").textContent.trim();
  const muscle = front.querySelector(".muscle").textContent.trim();
  const description = front.querySelector(".description").textContent.trim();

  return {
    name,
    muscle,
    description,
    image: img?.getAttribute("src") || "",
  };
}

export default {
  getWorkoutsFromStorage,
  getCardData
};