//recuperer les recette
import {recipes}  from '../../data/recipes.js';
import dropdown from './dropdown.js';
import { shorten} from './tool.js';

// Appel la fonction qui fait la boucle pour afficher les recettes
displayRecipes(recipes)
const filters = [
    { title: 'Ingredients', collect: collectIngredients},
    { title: 'Appareils', collect: collectAppliances},
    { title: 'Ustensiles', collect: collectUstensils},
]

filters.forEach(filter =>
    {
        const drop = dropdown(filter.title);
        drop.displayDropdown();
        const items = filter.collect(recipes);
        drop.hydrate(items);
        drop.listenForInput();
        
    })
    listenForSelection();

    function listenForSelection()
    {
        document.querySelectorAll('.item').forEach(button =>
            {
                button.addEventListener('click', (e) => 
                {
                    e.preventDefault();
                    const category = e.target.dataset.filter
                    console.log(e.target, category)
                    // afficher l'element selectionne dans la zone selection
                    //filtre les recettes
                    //cacher les autres recettes
                    

                })
            })
    }



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
                            <p class="libelle"> ${shorten(recipe.description, 300)} </p>
                        </div> 
                    </div>
                </div>
            </div>
        `
    })
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




function collectIngredients(recipes){
    const list = new Set()
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingObj) => 
        {
            list.add(ingObj.ingredient);
        });
    });
    return list;
};

function collectAppliances (recipes){
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

