const slides = [
	{
		"image": "slide1.jpg",
		"tagLine": "Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image": "slide2.jpg",
		"tagLine": "Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image": "slide3.jpg",
		"tagLine": "Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image": "slide4.png",
		"tagLine": "Autocollants <span>avec découpe laser sur mesure</span>"
	}
]
//je créer une variable constante avec le chemin d'accés a mes images
const slidesDir = "./assets/images/slideshow/"

//je met un eventListener sur ma flèche de gauche (précedente) lorsque je clique dessus
let arrowLeft = document.getElementById("arrowLeft");
arrowLeft.addEventListener("click", () => {
	console.log("Précédent")
	let selectedIndex = updateDots("previous")
	updateSlideAndTagline(selectedIndex)
})
//je met un eventListener sur ma flèche de droite (suivante) lorsque je clique dessus
let arrowRight = document.getElementById("arrowRight");
arrowRight.addEventListener("click", () => {
	console.log("Suivant")
	let selectedIndex = updateDots("next")
	updateSlideAndTagline(selectedIndex)
})
//fonction pour changer la class des dots quand on clique sur la flèche suivante ou précédente. On parcours tout les dots pour trouver où "dot_selected" est actif pour le désactivé et le re activé au suivant ou au précedent.
function updateDots(direction) {
	let selectedIndex = 0
	let dotList = document.getElementById("dots").getElementsByClassName("dot")
	console.log(dotList)
	for (let i = 0; i < dotList.length; i++) {
		const element = dotList[i];
		console.log(element)
		//si dans mon élément il y a la class dot_selected supprime la et remplace la par la class dot
		if (element.classList.contains("dot_selected")) {
			//enlève la class selectionné, ici "dot_selected" et remplace la par la class de l'élément ci dessous, ici "dot"
			element.className = "dot"

			//définir le dot qui est sélectionné
			if (direction === "next") {
				//son vérifie si on est sur le dernier dot
				if (i === dotList.length - 1) {
					//si oui on met la class dot dot_selected
					dotList[0].className = "dot dot_selected"
					selectedIndex = 0
				} else {
					//sinon on passe le dot suivant en dot_selected
					dotList[i + 1].className = "dot dot_selected"
					selectedIndex = i + 1
				}
			} else {
				//sinon, si on clique sur la fléche précédent
				if (i === 0) {
					//si je suis sur le premier dot et que je reviens en arrière je veux que le dernier dot prenne la class "dot_selected"
					dotList[dotList.length - 1].className = "dot dot_selected"
					selectedIndex = dotList.length - 1
				} else {
					//si je ne suis pas sur le premier dot mais sur un des autres et que je reviens en arrière alors affiche le moi avec la class "dot_selected"
					dotList[i - 1].className = "dot dot_selected"
					selectedIndex = i - 1
				}
			}
			//affiche moi le résultat
			return selectedIndex
		}
	}
}
//fonction pour changer l'image et le texte
function updateSlideAndTagline(selectedIndex) {
	console.log(selectedIndex)
	// variable pour aller chercher l'image avec la class "banner-img", le [0] sert à indiquer que l'on récupère la 1ère image dans le HTML avec la class "banner-img"
	let img = document.getElementsByClassName("banner-img")[0]

	//on met a jour l'image, le setAttribute cherche a changer un attribut, ici "src", on remplace donc le chemin de l'image selon le selectedIndex
	img.setAttribute("src", slidesDir + slides[selectedIndex].image)

	//cherche moi dans le document l'id "tagLine"
	let p = document.getElementById("tagLine")

	//avec innerHTML on change le contenu de la balise <p>, on utilise innerHTML et non innerText car le texte remplaçant contient des balises HTML <span>
	p.innerHTML = slides[selectedIndex].tagLine
}
//je créer une fonction pour mettre en route le timer
function timerEvent() {
	let selectedIndex = updateDots("next")
	updateSlideAndTagline(selectedIndex)
}

//je créer un timer de 3sec pour le défilement automatique des images et des dots
window.setInterval(timerEvent, 3000)
