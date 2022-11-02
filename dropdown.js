export default dropdown;

function dropdown (title) {
    function buildDropdown(title){   
        const div = document.createElement('div')
            div.innerHTML = `
            <button class="navShearch${title} navShearchWrapper toggle" data-ref="${title}">
                <div class="navSherchText">${title}</div> 
                <i class="fa far-regular fa-chevron-down"></i> 
            </button>
            <div class="result navShearch${title} hidden" data-ref="${title}">
            <div class="reglage">
                <input type="text" value = "${title} " class="search-input"/>
                <i class="fa far-regular fa-chevron-up"></i> 
            <div/> 
                <div class="list"> <div/> 
                <div id="no-result" class="hidden">Désolé rien ne corresponds a votre recherche<div/>   

            </div>
    `; 
    return div;
}

    //ouvre et ferme le dropdown
    function displayDropdown(){
        // crée le Dropdown vide
        const ingDropdown = buildDropdown(title)
        document.querySelector(".filters").append(ingDropdown)
        document.querySelector(`.toggle[data-ref="${title}"]`).addEventListener("click", function (e) {
            const result = document.querySelector(`.result[data-ref="${title}"]`);
            if (result.classList.contains("hidden")) {
                result.classList.remove("hidden");
                document.querySelector(`.toggle[data-ref="${title}"]`).classList.add("hidden");
            }else {
                result.classList.add("hidden");
                // document.querySelector(`.toggle[data-ref="${title}"]`).classList.remove("hidden")
            }
        });
    }
    
    function hydrate(items){
        items.forEach((item) => {
             document.querySelector(`.result[data-ref="${title}"] .list`).innerHTML += `<div class="item">${item}<div>` ;
        });    
    }

    function listenForInput()
    {
        document.querySelector(`.result[data-ref="${title}"] .search-input`).addEventListener('input', (e) =>
        {
            const needle = e.target.value.toLowerCase();
          
            let elements = document.querySelectorAll(`.result[data-ref="${title}"] .list .item`);
            
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

            const visibleItems = document.querySelectorAll(`.result[data-ref="${title}"] .list .item:not(.hidden)`).length;
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