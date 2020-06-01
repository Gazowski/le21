/**
 *      -   créer le jeu de cartes
 *              >   tableau de cartes
 *              >   mélanger cartes()
 *              >   distribuer une carte()
 */

import { shuffle } from "./shuffle.js"

export class Jeu{
    constructor(){
        let couleur = [
            "coeur",
            "carreau",
            "pique",
            "trefle"
        ],
        
        valeur = {
            2 : 2,
            3 : 3,
            4 : 4,
            5 : 5,
            6 : 6,
            7 : 7,
            8 : 8,
            9 : 9,
            10 : 10,
            valet : 10,
            dame : 10,
            roi : 10,
            as : 11,
        }

        this.leJeu = []

        for(let c of couleur){
            for(let v in valeur){
                let carte = {
                    couleur:c,
                    valeur:v,
                    point:valeur[v]
                }
                this.leJeu.push(carte)
            }
        }
    }

    melanger_jeu(){
        this.jeu_melange = shuffle(this.leJeu)
    }

    tirer_une_carte(){
        this.carte = this.jeu_melange[0]
        this.jeu_melange.shift() // supprime le premier élément du tableau
        return this.carte
    }

    creer_carte(carte){
        let la_carte = document.createElement("div")
        la_carte.classList.add("carte")
        let valeur_carte = document.createElement("div")
        valeur_carte.classList.add("valeur-carte")
        valeur_carte.innerHTML = carte.valeur
        la_carte.appendChild(valeur_carte)

        return la_carte
    }
}

