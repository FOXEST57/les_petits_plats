export default dropdown;

function dropdown (title) 
{
    const wrapper = `.filter-wrapper[data-ref="${title}"]`;
    function buildDropdown(title){   
        const div = document.createElement('div')
            div.innerHTML = `
            <div class="filter-wrapper" data-ref="${title}">
                <button class="navShearch${title} navShearchWrapper toggle">
                    <div class="navSherchText">${title}</div> 
                    <i class="fa far-regular fa-chevron-down"></i> 
                </button>
                <div class="result navShearch${title} hidden">
                    <div class="reglage close">
                        <input type="text" placeholder = "${title} " class="search-input"> </input>
                        <i class="fa far-regular fa-chevron-up close-button"></i> 
                    </div>
                    <div class="list"> </div>
                    <div id="no-result" class="hidden">Désolé rien ne corresponds a votre recherche</div>   
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
    function hydrate(items){
        items.forEach((item) => {
             document.querySelector(`${wrapper} .result .list`).innerHTML += `<div class="item">${item}<div>` ;
        });    
    }

    function listenForInput()
    {
        document.querySelector(`${wrapper} .result .search-input`).addEventListener('input', (e) =>
        {
            const needle = e.target.value.toLowerCase();
          
            let elements = document.querySelectorAll(`${wrapper} .result .list .item`);
            
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

            const visibleItems = document.querySelectorAll(`${wrapper} .result.list .item:not(.hidden)`).length;
            if (visibleItems == 0)
            {
                document.querySelector('#no-result').classList.remove('hidden');
                console.log(visibleItems)
            }
        })
    }
    return {
        displayDropdown,
        hydrate,
        listenForInput,
    }
};