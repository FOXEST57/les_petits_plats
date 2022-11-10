//recuperer les recette
import {recipes}  from '../../data/recipes.js';
import dropdown from './dropdown.js';
import { shorten} from './tool.js';

// Appel la fonction qui fait la boucle pour afficher les recettes
displayRecipes(recipes)
const filters = [
    { 
        title: 'Ingredients', 
        collect: collectIngredients, 
        filter: filterIngredients, 
        selection: [],
        dropdown: null,
    },
    { 
        title: 'Appareils', 
        collect: collectAppliances, 
        filter: filterAppliances,
        selection: [],
        dropdown: null,
    },
    { 
        title: 'Ustensiles', 
        collect: collectUstensils,
        filter: filterUstensils, 
        selection: [],
        dropdown: null,
    },
]

filters.forEach(filter =>
{
    filter.dropdown = dropdown(filter.title);
    filter.dropdown.displayDropdown();
    const items = filter.collect(recipes);
    filter.dropdown.hydrate(items);
    filter.dropdown.listenForInput();
    listenForSelection(filter);
})

function listenUnSelect(filter)
{
    document.querySelectorAll('.tagclose').forEach(tag =>
    {
        tag.addEventListener('click', (e) =>
        {
            e.preventDefault(); 
            const parent = e.target.closest('.tagcard')
            const item = parent.dataset.id
            console.log(parent, item)

            //enlever le tag 
            parent.remove();

            //enlever l'element de la selection du filtre
            const index = filter.selection.findIndex(a => a === item)
            filter.selection.splice(index, 1)

            filterRecipes()

        })
    })
}

function listenForSelection(filter)
{   
    document.querySelectorAll(`${filter.dropdown.wrapper} .item`).forEach(button =>{
            button.addEventListener('click', (e) => 
            {
                e.preventDefault();
                const isSelectable = !button.classList.contains('frozen')
                const category = button.dataset.filter
                const needle = button.innerText
                
                if(!isSelectable)
                {
                    return;
                }
                
                // afficher l'element selectionne dans la zone selection
                showTagInSelection(needle, category)
                
                //ajouter a la selection du filtre le tag selectionné
                filter.selection.push(needle)
                listenUnSelect(filter)

                // fermer le dropdown
                filter.dropdown.close()

                filterRecipes()

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

function filterUstensils(recipes, selection){ 
    
    return recipes.filter(recipe =>
    {
        let count = 0;
        selection.forEach(needle =>
        {
            if(recipe.ustensils.includes(needle))
            {
                count++;
            }
        }) 
        
        if (count === selection.length){
            return true;
        }
        
        return false;
    })
};

function filterIngredients(recipes, selection){
    return recipes.filter(recipe =>
        {
            let count = 0;
            const ingredients = recipe.ingredients.map(ingObj => ingObj.ingredient)
            selection.forEach(needle =>
            {
                if(ingredients.includes(needle))
                {
                    count++;
                }
    
            }) 
            
            if (count === selection.length){
                return true;
            }
            
            
            return false;
        })
}

function filterAppliances(recipes, selection){
    return recipes.filter(recipe =>
        {
        return recipe.appliance === selection[0]
        })
}

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
    <div class="tagcard ${cssColor}" data-id="${needle}">
        <p class="tagname">${needle}</p>
        <span class="tagclose">
            <i class="far fa-thin fa-circle-xmark"></i>
        </span>
    </div>`
}

function filterRecipes(){
    let filteredRecipes = recipes

    filters.forEach(filterItem => 
    {
        if(filterItem.selection.length > 0)
        {
            filteredRecipes = filterItem.filter(filteredRecipes, filterItem.selection)
        }    
    });


    //cacher toutes les recettes
    hideAllRecipes()

    //afficher les bonnes recettes
    filteredRecipes.forEach(recipe =>
    {
        document.querySelector(`.card[data-id="${recipe.id}"]`).classList.remove('hidden');
    })

    filters.forEach(async(filterItem) =>
    {   
        const tagFiltered = filterItem.collect(filteredRecipes);
        console.log(tagFiltered)
        await filterItem.dropdown.hideAll()
        filterItem.dropdown.freezeSelection(filterItem.selection)
        filterItem.dropdown.show(tagFiltered)

    })
}