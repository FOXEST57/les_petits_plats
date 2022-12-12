//recuperer les recette
import { recipes } from '../../data/recipes.js';
import { shorten } from './tool.js';
import dropdown from './dropdown.js';
import appliance from './filters/appliances.js';
import ingredient from './filters/ingredients.js';
import ustensil from './filters/ustensils.js';

// Appel la fonction qui fait la boucle pour afficher les recettes
displayRecipes(recipes)

const filters = [{
        title: 'Ingredients', //titre du filtre qui servira de reference
        collect: ingredient.collect, // fonction qui permet de récupérer les ingrdients des recettes
        filter: ingredient.filter, // fonction qui permet de filtrer les recette en fonction des ingedrients selectionnés
        selection: [], // ingredient selectionné par l'utilisateur
        dropdown: null, // objet dropdown avec toute les fonctionnalité lié au DOM
    },
    {
        title: 'Appareils',
        collect: appliance.collect,
        filter: appliance.filter,
        selection: [],
        dropdown: null,
    },
    {
        title: 'Ustensiles',
        collect: ustensil.collect,
        filter: ustensil.filter,
        selection: [],
        dropdown: null,
    },
]

filters.forEach(filter => {
    filter.dropdown = dropdown(filter.title); //crée un dropdown
    filter.dropdown.displayDropdown(); // affiche dropdown
    const items = filter.collect(recipes); //récupère tous les éléments a afficher dans le DD
    filter.dropdown.hydrate(items); // on affiche les elements dans  le dropdown 
    filter.dropdown.listenForInput(); // on ecoute l'input du DD
    listenForSelection(filter); // on ecoute quand l'utilisateur selectionne un evenement
});

// ecoute les entrées de l'input 
listenForSearch();

// Boucle pour afficher les recettes
function displayRecipes(recipes) {
    recipes.forEach((recipe) => {
        document.querySelector(".galerie").innerHTML += `
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

// Filtrage et mis a jour de l'affichage des recettes 
function filterRecipes(recipes) {
    let filteredRecipes = recipes
        // Boucle qui filtre les recettes suivant les 3 filtres
    filters.forEach(filterItem => {
        if (filterItem.selection.length > 0) {
            filteredRecipes = filterItem.filter(filteredRecipes, filterItem.selection)
        }
    });


    //cacher toutes les recettes
    hideAllRecipes()

    //afficher les bonnes recettes
    filteredRecipes.forEach(recipe => {
            document.querySelector(`.card[data-id="${recipe.id}"]`).classList.remove('hidden');
        })
        //mise a jour des elements du dropdown
    filters.forEach(async(filterItem) => {
        const tagFiltered = filterItem.collect(filteredRecipes);
        await filterItem.dropdown.hideAll()
        freezeSelection(filterItem)
        filterItem.dropdown.show(tagFiltered)

    })
};
// empeche de reselectionner un produit déjà selectionné
function freezeSelection(filter) {
    filter.selection.forEach(item => {
        const el = document.querySelector(`${filter.dropdown.wrapper} .result .list .item[data-id="${item}"]`);
        el.classList.add('frozen');
    })

};

function hideAllRecipes() {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('hidden')
    })
};

function hideGallery() {
    document.querySelector('.galerie').classList.add('hidden')
};

function hideNotice() {
    const notice = document.querySelector('#shearch-too-short')

    if (!notice.classList.contains('hidden')) {
        document.querySelector('#shearch-too-short').classList.add('hidden');
    }
};

function listenForSelection(filter) {
    //on ecoute chaque element du dropdown
    document.querySelectorAll(`${filter.dropdown.wrapper} .item`).forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const isSelectable = !button.classList.contains('frozen')
            const category = button.dataset.filter
                //texte du bouton cliqué
            const needle = button.innerText

            if (!isSelectable) {
                return;
            }

            // afficher l'element selectionne dans la zone selection
            showTagInSelection(needle, category)

            //ajouter a la selection du filtre le tag selectionné
            filter.selection.push(needle)
                //on ecoute la déselection du filtre selectionnés
            listenUnSelect(filter, needle)

            // fermer le dropdown
            filter.dropdown.close()

            filterRecipes(recipes)

        })
    })
};

function listenForSearch() {

    document.querySelector('#recipe').addEventListener('input', (e) => {
        showGallery()
        hideNotice()

        const needle = e.target.value;
        if (needle.length > 0 && needle.length < 3) {
            document.querySelector('#shearch-too-short').classList.remove('hidden');
            hideGallery();
            showNotice();
            return;
        }
        //on filtre les recette selon le champs de recherche principale (algo)
        const filteredRecipes = search(needle)
            // on filtre a nouveau les recettes suivant les petits filtres
        filterRecipes(filteredRecipes)
    })
};

function listenUnSelect(filter, needle) {
    const tag = document.querySelector(`.tagcard[data-id="${needle}"]`);
    tag.querySelector(`.tagclose`).addEventListener('click', (e) => {
        e.preventDefault();
        tag.remove();

        //enlever l'element de la selection du filtre
        const index = filter.selection.findIndex(a => a === needle)
        filter.selection.splice(index, 1)
        unfreeze(filter, needle)
        filterRecipes(recipes)

    })
};

//recupère les ingredients est utilisé dans la fonction displayRecipes
function renderIngredients(ingredients) {
    let html = ''
    ingredients.forEach(ingObj => {
        html += `
            <div class="ingredients">
                <span class="ingredientsName"> ${ingObj.ingredient} :</span>
                <span class="quantite">${ingObj.quantity ?? ''}  ${ingObj.unit ?? ''} </span>
            </div>
            `
    })
    return html
};

//algo fonctionnel (high Order Function)
function search(needle) {
    console.time(needle)

    needle = needle.toLowerCase();

    let filteredRecipes = recipes.filter(recipe => {
        if (recipe.name.toLowerCase().indexOf(needle) > -1) {
            return true;
        }

        if (recipe.description.toLowerCase().indexOf(needle) > -1) {
            return true;
        }
        //on transform un tableau d'objet en tableau de string
        const ingredients = recipe.ingredients.map(ingObj => ingObj.ingredient)

        return ingredients.some(ing => {
            return ing.toLowerCase().indexOf(needle) > -1
        })
    })

    console.timeEnd(needle)

    return filteredRecipes;
};

function showGallery() {
    document.querySelector('.galerie').classList.remove('hidden');
};

function showNotice() {
    document.querySelector('#shearch-too-short').classList.remove('hidden');
};

function showTagInSelection(needle, category) {
    const cssColor = 'navShearch' + category;
    const tag = document.createElement('div');
    tag.classList.add('tagcard', cssColor)
    tag.dataset.id = needle
    tag.dataset.category = category
    tag.innerHTML = `
        <p class="tagname">${needle}</p>
        <span class="tagclose">
            <i class="far fa-thin fa-circle-xmark"></i>
        </span>`
    document.querySelector('.taglist').appendChild(tag)
};

function unfreeze(filter, needle) {
    const el = document.querySelector(`${filter.dropdown.wrapper} .result .list .item[data-id="${needle}"]`);
    el.classList.remove('frozen');
};