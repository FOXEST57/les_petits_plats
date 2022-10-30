//recuperer les recette
import {recipes}  from '../../data/recipes.js';
console.log(recipes);

// Appel la fonction qui fait la boucle pour afficher les recettes
displayRecipes(recipes)
const ingDropdown = createDropdown('Ingredients');
ingDropdown.displayDropdown()





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
                <div class="cardRecipe">
                    <div class="cardIngredients">${renderIngredients(recipe.ingredients)}</div>    
                </div> 
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

    ingredients.forEach(ingObj => 
        {
            html +=`
            <div class="ingredients">
                <span class="ingredientsName"> ${ingObj.ingredient} :</span>
                <span class="quantite">${ingObj.quantity ?? ''}  ${ingObj.unit ?? ''} </span>
            </div>
            `
        })

        return html
};




function createDropdown (title) {
    function buildDropdown(title){   
        const div = document.createElement('div')
            div.innerHTML = `
            <button class="navShearch${title} navShearchWrapper toggle" data-ref="${title}">
                <div class="navSherchText">${title}</div> 
                <i class="fa far-regular fa-chevron-down"></i> 
            </button>
            <div class="result navShearch${title} hidden" data-ref="${title}">
            abc
            </div>
    `; 
    return div;
}

    //ouvre et ferme le dropdown
    function displayDropdown(){
        // crée le Dropdown vide
        const ingDropdown = buildDropdown(title)
        document.querySelector(".filters").append(ingDropdown)
        document.querySelector(".toggle").addEventListener("click", function (e) {
            const el = e.target;
            const ref = e.target.dataset.ref;
            const result = document.querySelector(`.result[data-ref="${ref}"`);
            if (result.classList.contains("hidden")) {
                result.classList.remove("hidden");
            }else {
                result.classList.add("hidden");
            }
        });
    }
       
    return {
        title: title,
        displayDropdown,
    }

}