//recuperer les recette
import {recipes}  from '../../data/recipes.js';
import dropdown from './dropdown.js';
import { shorten} from './tool.js';

// Appel la fonction qui fait la boucle pour afficher les recettes
displayRecipes(recipes)
const filters = [
    { title: 'Ingredients', collect: collectIngredients, selection: []},
    { title: 'Appareils', collect: collectAppliances, selection: []},
    { title: 'Ustensiles', collect: collectUstensils, selection: []},
]

filters.forEach(filter =>
{
    const drop = dropdown(filter.title);
    drop.displayDropdown();
    const items = filter.collect(recipes);
    drop.hydrate(items);
    drop.listenForInput();
    listenForSelection(drop, filter);
})


function listenForSelection(drop, filter)
{   
    document.querySelectorAll(`${drop.wrapper} .item`).forEach(button =>
        {
            button.addEventListener('click', (e) => 
            {
                e.preventDefault();
                const category = e.target.dataset.filter
                const needle = e.target.innerText
                
                
                // afficher l'element selectionne dans la zone selection
                showTagInSelection(needle, category)
                
                //ajouter a la selection du filtre le tag selectionné
                filter.selection.push(needle)

                // fermer le dropdown
                drop.close()

                //filtre les recettes
                const filteredRecipes = filterUstensils(recipes, filter)

                //cacher toutes les recettes
                hideAllRecipes()

                //afficher les bonnes recettes
                filteredRecipes.forEach(recipe =>
                    {
                        document.querySelectorAll(`.card[data-id="${recipe.id}"]`).classList.remove('hidden')
                    })
                

            })
        })
}



// Boucle pour afficher les recettes
function displayRecipes(recipes){
    recipes.forEach((recipe) => {
        document.querySelector(".galerie").innerHTML +=`
            <div class="card" data-id="${recipe.id}">
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

function filterUstensils(recipes, filter)
{
    
    return recipes.filter(recipe =>
        {
            let count = 0;
            filter.selection.forEach()(tag =>
            {
                if(recipe.ustensils.includes(needle))
                {
                    count++;
                }
    
            }) 
            
            if (count === filter.selection.lenght){
                return true;
            }
            
            
            return false;
        })
};

function collectUstensils (recipes){
    const list = new Set()
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
            list.add(ustensil);
        });
    });
    return list;
};

function hideAllRecipes()
{
    document.querySelectorAll('.card').forEach(card =>
        {
            card.classList.add('hidden')
        })
};

function showTagInSelection(needle, category)
{
    const cssColor = 'navShearch' + category;
    document.querySelector('.taglist').innerHTML += `
    <div class="tagcard ${cssColor}">
        <p class="tagname">${needle}</p>
        <span class="tagclose">
            <i class="far fa-thin fa-circle-xmark"></i>
        </span>
    </div>`
}
