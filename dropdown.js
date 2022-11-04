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
                        <input type="text" placeholder = "Rechercher des ${title} " class="search-input"> </input>
                        <i class="fa far-regular fa-chevron-up close-button"></i> 
                    </div>
                    <div class="list"> </div>
                    <div class="no-result hidden">Désolé rien ne corresponds a votre recherche</div>   
                </div>
            </div>
       `; 
        return div;
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

    function listenForOpening()
    {
        document.querySelector(`${wrapper} .toggle`).addEventListener("click", function () {
            const result = document.querySelector(` ${wrapper} .result`);
            result.classList.remove("hidden");
            document.querySelector(`${wrapper} .toggle`).classList.add("hidden");    
        });
    }
    
    function listenForClosing()
    {
        document.querySelector(`${wrapper} .close-button `).addEventListener("click", function () {
            const result = document.querySelector(` ${wrapper} .result`);
            result.classList.add("hidden");
            document.querySelector(`${wrapper} .toggle`).classList.remove("hidden");    
        });
    }

    function close()
    {
        document.querySelector(`${wrapper} .close-button `).addEventListener("click", function () {
           close()    
        });
    }
    function hydrate(items){
        items.forEach((item) => {
             document.querySelector(`${wrapper} .result .list`).innerHTML += `<a href="#" class="item select-button" data-filter="${title}">${item}</a>` ;
        });    
    }

    function hideNoResult() 
    {
        document.querySelector(`${wrapper} .no-result`).classList.add('hidden');
    }

    function showNoResult() 
    {
        document.querySelector(`${wrapper} .no-result`).classList.remove('hidden');
    }

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
    
    return {
        displayDropdown,
        hydrate,
        listenForInput,
        close,
        wrapper
    }
};

export default dropdown;