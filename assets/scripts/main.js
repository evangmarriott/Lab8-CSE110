// main.js

// CONSTANTS
const RECIPE_URLS = [
    'https://adarsh249.github.io/Lab8-Starter/recipes/1_50-thanksgiving-side-dishes.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/2_roasting-turkey-breast-with-stuffing.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/3_moms-cornbread-stuffing.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
    'https://adarsh249.github.io/Lab8-Starter/recipes/6_one-pot-thanksgiving-dinner.json',
];

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
async function init() {
  // initialize ServiceWorker
  initializeServiceWorker();
  // Get the recipes from localStorage
  let recipes;
  try {
    recipes = await getRecipes();
  } catch (err) {
    console.error(err);
  }
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
}

/**
 * Detects if there's a service worker, then loads it and begins the process
 * of installing it and getting it running
 */
function initializeServiceWorker() {
  // EXPLORE - START (All explore numbers start with B)
  /*******************/
  // ServiceWorkers have many uses, the most common of which is to manage
  // local caches, intercept network requests, and conditionally serve from
  // those local caches. This increases performance since users aren't
  // re-downloading the same resources every single page visit. This also allows
  // websites to have some (if not all) functionality offline! I highly
  // recommend reading up on ServiceWorkers on MDN before continuing.
  /*******************/
  // We first must register our ServiceWorker here before any of the code in
  // sw.js is executed.

  // B1. check if serviceWorker is supported
  if ('serviceWorker' in navigator) {
    // B2. listen for load event
    window.addEventListener('load', function() {
      // B3. register sw.js as the service worker
      navigator.serviceWorker.register('./sw.js')
        .then(function(registration) {
          // B4. log success
          console.log('ServiceWorker registered! Scope:', registration.scope);
        })
        .catch(function(err) {
          // B5. log failure
          console.log('ServiceWorker registration failed:', err);
        });
    });
  }
  // STEPS B6 ONWARDS WILL BE IN /sw.js
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage, network requests are made to all
 * of the URLs in RECIPE_URLs, an array is made from those recipes, that
 * array is saved to localStorage, and then the array is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
async function getRecipes() {
  // EXPOSE - START (All expose numbers start with A)

  // A1. check if recipes are already in local storage
  const stored = localStorage.getItem('recipes');
  if (stored) {
    return JSON.parse(stored);
  }

  // A2. empty array to store fetched recipes
  const recipes = [];

  // A3. return a new Promise
  return new Promise(function(resolve, reject) {
    // A4. loop through each recipe URL
    RECIPE_URLS.forEach(async function(url) {
      // A5. try/catch for async fetching
      try {
        // A6. fetch the url
        const response = await fetch(url);
        // A7. get the json from the response
        const recipe = await response.json();
        // A8. add recipe to array
        recipes.push(recipe);
        // A9. if we have all the recipes, save and resolve
        if (recipes.length === RECIPE_URLS.length) {
          saveRecipesToStorage(recipes);
          resolve(recipes);
        }
      } catch(err) {
        // A10. log the error
        console.error(err);
        // A11. reject the promise
        reject(err);
      }
    });
  });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  if (!recipes) return;
  let main = document.querySelector('main');
  recipes.forEach((recipe) => {
    let recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipe;
    main.append(recipeCard);
  });
}
