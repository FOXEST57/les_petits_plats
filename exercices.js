
let values = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa'];

function createDataList(){
    
    
    let dataList = document.createElement('datalist');
    dataList.id = "country_list";
    
    values.forEach(value =>{
        let option = document.createElement('option');
        option.innerHTML = value;
        option.value = value;
        dataList.appendChild(option);
    })
    document.body.appendChild(dataList);
}

createDataList();






// function namess (prenom) {
//     alert("Bonjour " + prenom)
// };

// namess("pascal")

// let nUn = 4, nDeux = 7 ;
// nUn = 10

// function total(nbA, nbB){
//     let result = nbA + nbB
//    return result;
// }

// console.log(total(nUn, nDeux));

// function prevoirAge(){
//     let age = prompt('quel age avez vous? ');
//     age = Number(age)
//     alert('Bonjour vous avez ' + (age + 1) + ' ans')
    
// }
// prevoirAge(30)
// function abracadabra(){
//     let prenom = prompt("quel est votre prenom ?");
//     let nom = prompt("quel est votre nom ?");
//     let age = prompt("quel est votre age ?");

//     alert("sapristi! On ne m'avais prevenu " + prenom + ' ! Euh... je..Monsieur ' + nom + "  cela vous avez " + age + ' ans')
// }

// abracadabra()


// function calculerImc(poids, taille){

//     let tailleCalculee = Math.pow(taille, 2);

//     let resultat = poids / tailleCalculee;

//     return resultat; 
    
    
// }

// let poids = prompt("quel est votre poids");
// let taille = prompt("quel est votre taille en metre");

// console.log(calculerImc(poids, taille))

// condition ternaire

// let x = 1;

// x > 3 ? console.log('x est sup à 3') : console.log('x est inferieur à 3');


// let i = 1;

// while (i < 5){
//     console.log('ligne : ' + i);
//     i++;
// }


// do {
//     var prenom = prompt('Quel est votre prénom ? ');

// } while(prenom == "" || prenom == null);

// alert('bonjour ' + prenom);

// for (let i = 1; i < 5; i++) {
//     console.log('ligne : ' + i);   
// }

// try {

//     let recompense = prompt('choisir une recompense : épée, arc, haches')
//     let degats
//     switch(recompense) {
//         case "épée" : 
//             degats = 40;
//             break;
//         case "arc" :
//             degats = 30;
//             break;
//         case "haches" : 
//             degats = 20;
//             break;  
//         default:  
//             throw new Error('Vous ne pouvez pas tricher');
//     }    

//     alert('vous avez choisi ' + recompense + " et vous gagnez " + degats + " points.")
// } catch (error) {
//     alert(error);
    
// }

// finally {
//     alert('fin du programme')
// }

// function addition(nombreA, nombreB){
//     return nombreA + nombreB;
// }

// function multiplication(nombreA, nombreB){
//     return nombreA * nombreB;
// }

// function soustraction(nombreA, nombreB){
//     return nombreA - nombreB;
// }

// function division(nombreA, nombreB){
//     if(nombreB == 0){
//         throw new Error("imposible de diviser par 0");
//     }
//     return nombreA / nombreB;
// }

// // On rentre dans la boucle principale
// let restart = false; // Cette variable vaut false ce qui veut dire que par défaut, nous ne reproposons par un calcul.
// do {
//     do {
//     var choix = Number(prompt("Que souhaitez-vous faire ?\n\n 1 - Addition\n 2 - Multiplication\n 3 - Soustraction\n 4 - Division\n"));    

// } while(choix != 1 && choix != 2 && choix !=3 && choix != 4)



//     do{
//         var premierNombre = Number(prompt('veuillez entrer un premier nombre'));
//         var deuxiemeNombre = Number(prompt('veuillez entrer un second nombre')); 
     
//     } while(isNaN(premierNombre) || isNaN(deuxiemeNombre));

// try{
//     switch(choix){
//         case 1 :
//             var resultat = addition(premierNombre, deuxiemeNombre);
//             break;
//         case 2 :
//             var resultat = multiplication(premierNombre, deuxiemeNombre);
//             break;
//         case 3 :
//             var resultat = soustraction(premierNombre, deuxiemeNombre);
//             break;
//         case 4 : 
//             var resultat = division(premierNombre, deuxiemeNombre);
//             break;
//             default:
//                 throw new Error (" une erreur est survenues")
//     }
//     alert('voici le resultat de votre opération ' + resultat);
// }
// catch(error) {
//     alert(error);
// }
    
// restart = confirm("Souhaitez-vous recommencer un calcul ?"); // On demande grâce à la boîte de dialogue confirm() si l'utilisateur veut recommencer
  
// } while(restart)

// function timer(secondes) {

//     if(secondes > 0) {
//         console.log(secondes);
//         timer(secondes -1)
//     }
//     else{
//         console.log(secondes);

//     }
// }

// timer(5);

// function somme (nombre) {

//     if(nombre == 1 ) {
//         return 1;
//     }

//         return nombre + somme(nombre - 1);
// }

// console.log(somme(3))

//tableau simple

// let monTableau = ['un', 'deux', 'trois'];
// monTableau.splice(1, 0, 'test', 'test2'); 
// monTableau.push('quatre'); 
// monTableau.pop(); pour suprimer le dernier element du tableau
// monTableau.shift(); pour suprimer le premier element du tableau
// monTableau.unshift('zero');
// console.log(monTableau[0]);
// console.log(monTableau.indexOf('deux'));
// console.log(monTableau.join(' /  ' exemple pour changer les separateurs)); affiche tous les elements du tableau - transforme le tableau en chaine de caractere

// console.log(monTableau[monTableau.length - 1]);

//tableau 2 dimensions

// let monTableau2D = [
//     ['Mark', 'jeff', 'Bill'],
//     ['zzzzz','xxxx', 'yyyyy']
// ];

// monTableau2D.splice(2, 0, ['test0', 'test1' ])

// console.log(monTableau2D)

// monTableau2D.push[1]('test');
// console.log(monTableau2D[1] [0]);

// tableau assiociatif

// let monTableauAssociatif = {
//     'prenom' : 'Mark',
//     'nom'    : 'zuc',
//     'poste'  : 'pdg',
// };



// function exercice (tableau) {

//     let chaine = '';

// for (const valeur in tableau) {

//     chaine += (valeur + ' : ' +tableau[valeur] + '\n');

// }
// console.log(chaine)

// }

// exercice(monTableauAssociatif)



// monTableauAssociatif['nationalité'] = 'Américaine';
// delete(monTableauAssociatif.poste); pour suprimer
// console.log(monTableauAssociatif['poste']);

// let panier = [ 'fraise', 'banane', 'poire'];

//boucle for in

// for (const fruit in panier) {
//     console.log(panier[fruit]);
//     console.log(fruit)
//     panier[fruit] = 'pomme'
    
// }

//boucle for off

// for (const fruit of panier) {
  
//     console.log(fruit)
//     console.log(panier.indexOf(fruit));   
// }

//boucle forEach

// let listeDePays = ['france', 'belg', 'jap', 'mar'];

// for(const liste of listeDePays) {
//     console.log(liste)
// }

// listeDePays.forEach(function(pascal){
//     console.log(pascal);
// });

// listeDePays.forEach(pays => console.log(pays));

// fonction fleche

// let maFonction1 = () => {
//     console.log('test');
// }

// maFonction1()


// let maFonction = () => console.log('test2');
// maFonction()

// les object 

// let chien = {
//     race : 'staff',
//     poil : 'court',
//     nom : 'nesta',
//     type : 'gentil',
//     // aboyer : function(){
//     //     console.log('ouaf ouaf')
//     // }
//     aboyer: () => console.log('ouaf ouaf')
// }

// console.log(chien.nom)

// chien.aboyer();

// let magicien = {
    
//     attaquer : function(){
//         console.log('le magicien lance un sort')
//     }
// }

// let guerrier = {
    
//     attaquer : function(){
//         console.log('le guerrier sort son épée')
//     }
// }
// magicien.attaquer();
// guerrier.attaquer();


import test from "./data/recipes.js";

test()














  




