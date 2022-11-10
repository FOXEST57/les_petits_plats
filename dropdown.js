function dropdown (title) 
{
    const wrapper = `.filter-wrapper[data-ref="${title}"]`;
    function buildDropdown(title)
    {   
        const div = document.createElement('div')
            div.innerHTML = `
            <div class="filter-wrapper" data-ref="${title}">
                <button class="navShearch${title} navShearchWrapper toggle">
                    <div class="navSherchText">${title}</div> 
                    <i class="fa far-regular fa-chevron-down"></i> 
                </button>
                <div class="result navShearch${title} hidden">
                    <div class="reglage close">
                        <input type="text" placeholder = "Rechercher des ${title}" class="search-input"> </input>
                        <i class="fa far-regular fa-chevron-up close-button"></i> 
                    </div>
                    <div class="list"> </div>
                    <div class="no-result hidden">Désolé rien ne corresponds a votre recherche</div>   
                </div>
            </div>
       `; 
        return div;
    }

    //ferme le dropdown après selection 
    function close()
    {
        const result = document.querySelector(` ${wrapper} .result`);
        result.classList.add("hidden");
        document.querySelector(`${wrapper} .toggle`).classList.remove("hidden");
    }

    //ouvre et ferme le dropdown
    function displayDropdown()
    {

        // crée le Dropdown vide
        const ingDropdown = buildDropdown(title)
        document.querySelector(".filters").append(ingDropdown)
        listenForOpening()
        listenForClosing()
    }

    // cache tout les elements du dropdown après selection
    function hideAll()
    {
        document.querySelectorAll(`${wrapper} .result .list .item`).forEach(item =>
        {
            item.classList.add('hidden')
        }) 
    }

    // cache le message il ni a pas de resultat quand la recherche abouti
    function hideNoResult() 
    {
        document.querySelector(`${wrapper} .no-result`).classList.add('hidden');
    }

    // alimente les données dans les dropdowns
    function hydrate(items)
    {
        items.forEach((item) => {
            document.querySelector(`${wrapper} .result .list`).innerHTML += `
            <a href="#" class="item select-button" data-filter="${title}" data-id="${item}" >
                ${item}
            </a>` ;
        });    
    }

    // ecoute pour fermer le dropdown
    function listenForClosing()
    {
        document.querySelector(`${wrapper} .close-button `).addEventListener("click", function () {
            close()    
        });
    }

    // ecoute les infos entrées dans l'input
    function listenForInput()
    {
        document.querySelector(`${wrapper} .result .search-input`).addEventListener('input', (e) =>
        {
            const needle = e.target.value.toLowerCase();
          
            let elements = document.querySelectorAll(`${wrapper} .list .item`);
            hideNoResult();
            
            elements.forEach(el =>
            {
                el.classList.remove('hidden')
            })

            elements = [...elements].filter(el =>
            {
                const text = el.innerText.toLowerCase()
                return !(text.indexOf(needle) > -1)
            })
            elements.forEach(el =>
            {
                el.classList.add('hidden')
            })

            const visibleItems = document.querySelectorAll(`${wrapper} .list .item:not(.hidden)`).length;
            if (visibleItems == 0)
            {
                showNoResult();
            }
        })
    }

    // ecoute pour ouvrir le dropdown
    function listenForOpening()
    {
        document.querySelector(`${wrapper} .toggle`).addEventListener("click", function () {
            const result = document.querySelector(` ${wrapper} .result`);
            result.classList.remove("hidden");
            document.querySelector(`${wrapper} .toggle`).classList.add("hidden");    
        });
    }

    // affiche le message erreur dans le dropdown quand la recherche est infructueuse
    function showNoResult() 
    {
        document.querySelector(`${wrapper} .no-result`).classList.remove('hidden');
    }

    //affiche les
    function show(items)
    {
        items.forEach(item =>
            {
                const el = document.querySelector(`${wrapper} .result .list .item[data-id="${item}"]`);
                el. classList.remove('hidden');
            })
    }
   
    
    return {
        close,
        displayDropdown,
        hideAll,
        hydrate,
        listenForInput,
        show,
        wrapper
    }
};

export default dropdown;