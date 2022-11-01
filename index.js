//recuperer les recette
import {recipes}  from '../../data/recipes.js';
import dropdown from './dropdown.js';

// Appel la fonction qui fait la boucle pour afficher les recettes
displayRecipes(recipes)

const ingDropdown = dropdown('Ingredients');
ingDropdown.displayDropdown();
const ingredients = collectIngredient(recipes);
ingDropdown.hydrate(ingredients);
ingDropdown.listenForInput()


const devDropdown = dropdown('Appareils');
devDropdown.displayDropdown()
const appliance = collectAppliance(recipes)
devDropdown.hydrate(appliance)
devDropdown.listenForInput()

const ustDropdown = dropdown('Ustensiles');
ustDropdown.displayDropdown()
const ustensils = collectUstensils(recipes)
ustDropdown.hydrate(ustensils)
ustDropdown.listenForInput()

// Boucle pour afficher les recettes
function displayRecipes(recipes){
recipes.forEach((recipe) => {
    document.querySelector(".galerie").innerHTML +=`
    <div class="card">
        <div class="cardPicture"></div>
        <div class="cardAllText">
            <div class="cardInfo">
                <div class="cardRecipeName"> ${recipe.name} </div>
                <div class="cardRecipeTime">
                    <div class="timeIcon"><i class="far fa-light fa-clock"></i></div>
                    <div class="timeRecipe"> ${recipe.time} </div>
                </div>
            </div>
            <div class="carteRecette">
                <div class="cardIngredients">${renderIngredients(recipe.ingredients)}</div>    
                <div class="recipe">
                    <p class="libelle"> ${recipe.description} </p>
                </div> 
            </div>
        </div>
    </div>
    `})
};

//recupère les ingredients est utilisé dans la fonction displayRecipes
function renderIngredients(ingredients){
    let html = ''
    ingredients.forEach(ingObj => {
            html +=`
            <div class="ingredients">
                <span class="ingredientsName"> ${ingObj.ingredient} :</span>
                <span class="quantite">${ingObj.quantity ?? ''}  ${ingObj.unit ?? ''} </span>
            </div>
            `
        })
        return html
};




function collectIngredient(recipes){
    const list = new Set()
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingObj) => 
        {
            list.add(ingObj.ingredient);
        });
    });
    return list;
};

function collectAppliance (recipes){
    const list = new Set()
    recipes.forEach((recipe) => {    
        list.add(recipe.appliance);
    });
    return list;
};


function collectUstensils (recipes){
    const list = new Set()
    recipes.forEach((recipe) => {
        list.add(recipe.ustensils);
    });
    return list;
};
