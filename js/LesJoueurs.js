/**
 *  - instancie les joueurs
 *  - instancie le jeu
 *  - gère le déroulement du jeu
 * 
 *  * @param {nombre_joueurs} int nombre de joueurs a instancier.
 */

import { Joueur } from "./Joueur.js"
import { Jeu } from "./Jeu.js"

export class LesJoueurs{
    constructor(nombre_joueurs){
        this.nb_joueurs = nombre_joueurs
        this.lesJoueurs = []
        this.lesJoueurs_passifs = []
        this.info_joueurs = []
        this.zone_joueurs = document.querySelector('[data-set-zoneJoueurs]')
        this.message = document.querySelector('[data-set-message]')
        this.btn_rejouer = document.querySelector('[data-set-btnRejouer]')

        this.init()
    }

    init = () =>{
        for(let i=0; i < this.nb_joueurs;i++){
            let joueur =  new Joueur(i)
            this.lesJoueurs.push(joueur)
        }
        this.premier_joueur = this.lesJoueurs[0]
        this.jeu = new Jeu()
        this.jeu.melanger_jeu()
        this.afficher_joueurs()
        this.attribuer_evt_boutons_joueurs()
        this.premier_joueur.activer()
    }

    init_info_joueurs = () =>{
        for(let joueur in this.lesJoueurs){
            joueur = {}
            joueur.nom = ''
            joueur.total_points = 0
            this.info_joueurs.push(joueur)
        }
    }

    afficher_joueurs = () =>{
        this.zone_joueurs.classList.remove('disparait')
        this.zone_joueurs.classList.add("zone-joueurs")
        for(let joueur of this.lesJoueurs){
            this.zone_joueurs.appendChild(joueur.leJoueur)
        }
    }

    attribuer_evt_boutons_joueurs = () =>{
        // des événements supplémentaires sont ajoutés dans la classe Joueur
        for(let joueur of this.lesJoueurs){
            joueur.btn_continuer.addEventListener('click', () =>{
                let carte = this.jeu.tirer_une_carte()
                joueur.ajouter_une_carte(carte)
                joueur.verifier_depassement_21(this.lesJoueurs_passifs)
                this.definir_prochain_joueur(joueur)
                this.prochain_joueur.activer()
            })
            joueur.btn_stop.addEventListener('click', () => {
                this.lesJoueurs_passifs.push(joueur)
                this.definir_prochain_joueur(joueur)
                this.prochain_joueur.activer()
            })
        }
    }

    definir_prochain_joueur = (joueur) => {
        // le prochain joueur est le joueur suivant dans le tableau
        let prochain_joueur = this.lesJoueurs[joueur.index + 1]
        // si il reste des joueurs actifs , on cherche le prochain joueur actif
        if(this.lesJoueurs_passifs.length < this.lesJoueurs.length){
            if(prochain_joueur && prochain_joueur.actif)
                // il y a un joueur suivant et il est actif
                this.prochain_joueur = this.lesJoueurs[joueur.index + 1]
            else if(prochain_joueur)
                // le joueur existe mais il n'est plus actif, on verifie le prochain joueur
                this.definir_prochain_joueur(prochain_joueur)
            else if(this.premier_joueur.actif)
                // il n'y a pas de joueur suivant donc on revient au premier joueur du tableau et on verifie si il est actif
                this.prochain_joueur = this.premier_joueur
            else
                // le premier joueur n'est plus actif, on verifie le joueur suivant
                this.definir_prochain_joueur(this.premier_joueur)
        }
        else
            // plus de joueur actif, la partie est finie
            this.finir_partie()
    }

    finir_partie = () => {
        // pour gérer plus de 1 vainqueur (si égalité entre les joueurs), le ou les vainqueurs sont stockés dans un tableau
        this.champions = []
        let meilleurScore = 0
        for(let joueur of this.lesJoueurs){
            if(joueur.points > 0){
                if(joueur.points > meilleurScore ){
                    this.champions = []
                    meilleurScore = joueur.points
                    this.champions.push(joueur)
                }else if(joueur.points == meilleurScore){
                    meilleurScore = joueur.points
                    this.champions.push(joueur)                  
                }
            }
        }
        this.afficher_champions()
        this.memoriser_partie()
    }

    afficher_champions = () =>{
        this.message.innerHTML += `<p>Partie #${sessionStorage.nbPartie}</p>`
        if(this.champions.length>0){
            if(this.champions.length > 1){
                this.message.innerHTML += "les vainqueurs sont :<br>"
                for(let c of this.champions){
                    this.message.innerHTML += `${c.nom.value}<br>` 
                }
                this.message.innerHTML += `avec ${this.champions[0].points} points`
                this.btn_rejouer.classList.remove('disparait')
            }
            else{
                this.message.innerHTML += `${this.champions[0].nom.value} remporte la partie avec ${this.champions[0].points} points`
                this.btn_rejouer.classList.remove('disparait')
            }
        }
        else{
            this.message.innerHTML += "aucun vainqueur !"
            this.btn_rejouer.classList.remove('disparait')
        }
    }

    memoriser_partie = () =>{
        // mémorisation des infos des joueurs dans le session storage
        for(let joueur in this.info_joueurs){
            this.info_joueurs[joueur].total_points += this.lesJoueurs[joueur].points
            this.info_joueurs[joueur].nom = this.lesJoueurs[joueur].nom.value
            
        }
        sessionStorage.joueurs = JSON.stringify(this.info_joueurs)
    }

    // on vide les tableaux joueurs dans le cas ou on rejoue une partie
    vider_pool = () =>{
        this.lesJoueurs = []
        this.lesJoueurs_passifs = []
    }
}