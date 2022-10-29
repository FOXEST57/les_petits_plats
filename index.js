//recuperer les recette
import {recipes}  from '../../data/recipes.js';
console.log(recipes);

// faire une boucle pour les afficher

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
    
    `

});

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
}