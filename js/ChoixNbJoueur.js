/**
 * définit le nombre de joueurs dans la partie
 */

export class ChoixNbJoueurs{
    constructor(el){
        this._el = el
        this.nbJoueurSelect = this._el.querySelector('[data-set-nbJoueur]')
        this.btn_jouer = this._el.querySelector('[data-set-btnJouer]')
        console.log(this.btn_jouer)

        this.init()
    }

    init = () =>{
        this._el.classList.add("chp-combien-joueur")
        this._el.classList.remove("disparait")
        this.btn_jouer.addEventListener("click",() => {
            this.get_nombre_joueurs()
            this.effacer_combien_joueur()
        }) 
    }

    get_nombre_joueurs = () =>{
        this.btn_jouer.removeEventListener('click',this.get_nombre_joueurs)
        this.nbJoueurs = this.nbJoueurSelect.value
    }


    effacer_combien_joueur = () =>{
        this.btn_jouer.removeEventListener('click',this.get_nombre_joueurs)
        this._el.classList.add('disparait')
    }
}