/**
 * affiche la fenetre d'info contenu dans le sessionStorage
 * apparait lorsque l'on clique le titre (le 21)
 */

export class Fenetre{
    constructor(el){
        this._el = el
        this.btn_close = this._el.querySelector('[data-set-close]')
        this.paragraphe = this._el.querySelector('p')
        
        this.init()
    }

    init = () =>{
        this._el.classList.remove('disparait')
        this.btn_close.addEventListener('click',this.fermerFenetre)
        this.creer_texte_info()
        this.paragraphe.innerHTML = this.texte
    }
    
    creer_texte_info = () =>{
        this.info_joueurs = JSON.parse(sessionStorage.joueurs)
        this.texte = `<h4>Nombre de Partie : ${sessionStorage.nbPartie}</h4>`
        this.texte += `Points des Joueurs:<ul>`
        for(let joueur of this.info_joueurs){
            this.texte += `<li>${joueur.nom} : ${joueur.total_points}</li>`
        }
        this.texte += `</ul>`
    }

    fermerFenetre = () =>{
        this.btn_close.removeEventListener('click',this.fermerFenetre)
        this._el.classList.add('disparait')
    }
}