/**
 *      -   Joueur
 *              >   nom
 *              >   premiere carte
 *              >   bouton continuer (une carte)
 *              >   bouton stop
 *              >   points
 *              >   recevoir une carte()
 *              >   arreter de jouer() / dépasser 21()
 */

 export class Joueur {
     constructor(index){
        let d = document
        this.message = d.querySelector('[data-set-message]')
        this.leJoueur = d.createElement('div')
        // champ nom
        this.index = index
        this.nom = d.createElement('input')
        this.nom.type = "text"
        this.nom.value = `Joueur ${index + 1}`
        this.nom.classList.add('nom_joueur')
        this.leJoueur.appendChild(this.nom)
        
        // cartes du joueur
        this.cartes = d.createElement('div')
        this.leJoueur.appendChild(this.cartes)
        // Premiere carte
        this.carte1 = d.createElement('div')
        this.cartes.appendChild(this.carte1)

        // bouton continuer
        this.btn_continuer = d.createElement('button')
        this.btn_continuer.innerHTML = "continuer"
        this.btn_continuer.disabled = true
        this.btn_continuer.classList.add('btn_joueur')
        this.btn_continuer.addEventListener('click',this.desactiver)
        this.leJoueur.appendChild(this.btn_continuer)
        
        // bouton stop
        this.btn_stop = d.createElement('button')
        this.btn_stop.innerHTML = "arrêter"
        this.btn_stop.disabled = true
        this.btn_stop.classList.add('btn_joueur')
        this.btn_stop.addEventListener('click', () => {
            this.desactiver()
            this.arreter()
        })
        this.leJoueur.appendChild(this.btn_stop)

        // points du joueur
        this.divPoints = d.createElement('div')
        this.leJoueur.appendChild(this.divPoints)
        this.points = 0
        this.totalPoints = 0

        // état du joueur
        this.actif = true
     }

     ajouter_une_carte = (carte) =>{
        this.carte_supp = document.createElement('div')
        this.carte_supp.classList.add("carte")
        let valeur_carte = document.createElement("div")
        valeur_carte.classList.add("valeur-carte")
        valeur_carte.innerHTML = carte.valeur
        valeur_carte.classList.add(carte.couleur)
        valeur_carte.classList.add("couleur")
        this.carte_supp.appendChild(valeur_carte)
        this.cartes.appendChild(this.carte_supp)
        this.calculer_points(carte)
    }

    calculer_points = (carte) =>{
        this.points += carte.point
        this.afficher_points()
    }

    afficher_points = () =>{
        this.divPoints.innerHTML = this.points
    }

    activer = () =>{
        // active les boutons du joueur si le joueur est toujours actif sinon on passe au joueur suivant
        if(this.actif){
            this.btn_continuer.disabled = false
            this.btn_stop.disabled = false
        }
    }

    verifier_depassement_21 = (joueurs_passifs) =>{
        if(this.points > 21){
            joueurs_passifs.push(this)
            this.arreter()
            this.points = 0
            this.message.innerHTML = `${this.nom.value} à dépasser 21 ! Il est éliminé !`
        }
    }

    desactiver = () =>{
        this.btn_continuer.disabled = true
        this.btn_stop.disabled = true 
    }
    
    arreter = () =>{
         this.actif = false
         this.btn_continuer.classList.add('disparait')
         this.btn_stop.classList.add('disparait')
    }

 }