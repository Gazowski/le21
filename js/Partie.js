/**
*      -   Classe Partie : table de jeu et maitre du jeu
*              >   associe les évènements aux boutons de la page
*              >   affiche les messages pour l'utilisateur 
*              >   instancie le groupe de joueur en fonction du choix du nombre de joueur de l'utilisateur
*/

import { ChoixNbJoueurs } from "./ChoixNbJoueur.js"
import { LesJoueurs } from "./LesJoueurs.js"
import { Fenetre } from "./Fenetre.js"

export class Partie {
    constructor(){
        let d = document
        this.btn_rejouer = d.querySelector('[data-set-btnRejouer')
        this.btn_commencer = d.querySelector("[data-set-btnCommencer]")
        this.champ_combien_joueur = d.querySelector("[data-set-chpCombienJoueur]")
        this.message = d.querySelector('[data-set-message]')
        this.zone_joueurs = d.querySelector('[data-set-zoneJoueurs]')
        this.titre = d.querySelector('[data-set-titre]')
        this.fenetre = d.querySelector('[data-set-fenetre]')

        this.init()
    }
    
    init = () =>{
        this.btn_commencer.addEventListener('click',this.combien_joueur)
        this.btn_rejouer.addEventListener('click',this.rejouer)
        this.titre.addEventListener('click',this.afficher_info)
        sessionStorage.joueurs = ''
        sessionStorage.nbPartie = 1     
    }
    
    combien_joueur = () =>{    
        this.choix_nb_joueurs = new ChoixNbJoueurs(this.champ_combien_joueur)
        this.btn_commencer.removeEventListener('click',this.combien_joueur)
        this.btn_commencer.classList.add('disparait')
        this.init_partie()
    }

    init_partie = () =>{
        this.choix_nb_joueurs.btn_jouer.addEventListener('click',()=>{
            this.debuter_partie()
        })
    }

    // debuter_partie est détachée de init_partie pour pouvoir 'rejouer' la partie sans passer par le choix du nombre de joueur
    debuter_partie = () =>{
        this.lesJoueurs = new LesJoueurs(this.choix_nb_joueurs.nbJoueurs)
        this.lesJoueurs.init_info_joueurs() 
    }    
    
    rejouer = () =>{
        this.btn_rejouer.classList.add('disparait')
        while(this.zone_joueurs.hasChildNodes()){
            this.zone_joueurs.removeChild(this.zone_joueurs.firstChild)
        }
        this.lesJoueurs.vider_pool()        
        this.message.innerHTML = ""
        this.lesJoueurs.init()       
        sessionStorage.nbPartie = parseInt(sessionStorage.nbPartie) + 1
    }
    
    // on affiche les info de session storage par un clic sur le titre
    afficher_info = () =>{
        new Fenetre(this.fenetre)
    }
}
