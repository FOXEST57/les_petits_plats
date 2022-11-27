//permet de limité la longeur de l'affichage de descriptif dans la recette et de mettre les 3 petits points

function shorten(value, max)
{
    if (value.length > max)
    {
        return value.slice(0, max) + ' ...'
    }
    return value
}

export { shorten}