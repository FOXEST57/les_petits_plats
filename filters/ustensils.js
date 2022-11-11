const ustensil = {
    collect(recipes)
    {
        const list = new Set()
        recipes.forEach((recipe) => 
        {
            recipe.ustensils.forEach((ustensil) => 
            {
                list.add(ustensil);
            });
        });
        return list;
    },

    filter(recipes, selection)
    {   
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
            
            if (count === selection.length)
            {
                return true;
            }
            return false;
        })
    }
};

export default ustensil;