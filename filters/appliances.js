const appliance = {
    collect(recipes)
    {
        const list = new Set()
        recipes.forEach((recipe) => {    
            list.add(recipe.appliance);
        });
        return list;
    },
    
    filter(recipes, selection){
        return recipes.filter(recipe =>
            {
            return recipe.appliance === selection[0]
            })
    }    
}

export default appliance;

