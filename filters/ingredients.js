const ingredient = {
    collect(recipes)
    {
        const list = new Set()
        recipes.forEach((recipe) => {
            recipe.ingredients.forEach((ingObj) => 
            {
                list.add(ingObj.ingredient);
            });
        });
        return list;
    },

    filter(recipes, selection)
    {
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
};

export default ingredient;