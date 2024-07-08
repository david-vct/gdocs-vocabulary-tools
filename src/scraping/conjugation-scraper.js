/**
 * Get conjugations of @expression
 * @param {string} expression
 * @returns {Array} [{mode,temps:[{nom,personne:[]},...]},...]
 */
function getConjugation(expression) {
	let url = "https://la-conjugaison.nouvelobs.com/du/verbe/" + expression.toLowerCase() + ".php"
	let html = getHtml(url)
	return searchConjugation(expression, html)
}

/**
 * Search conjugations of @expression on @html
 * @param {string} expression
 * @param {string} html
 * @returns {Array} [{mode,temps:[{nom,personne:[]},...]},...]
 */
function searchConjugation(expression, html) {
	// Get the main container of the conjugations
	let container = html.toString().match(/class="mode">[\s\S]*?<div class="tempstab">[\s\S]*?<h2/g)
	if (!container) {
		return { message: `Une erreur est survenue avec l'expression : ${expression}`, modes: [] }
	}

	let modes = []

	for (let i = 0; i < container.length; i++) {
		let mode = new Object()
		mode.nom = container[i].toString().match(/(?<=<span>)[\s\S]*?(?= <)/)
		mode.temps = []

		let temps = container[i].toString().match(/<div class="tempstab">[\s\S]*?(?:<\/div><\/div>|<\/a><\/div)/g)
		if (!temps) {
			return { message: `Une erreur est survenue avec l'expression : ${container[i]}`, modes: [] }
		}

		for (let j = 0; j < temps.length; j++) {
			let nomTemps = temps[j].toString().match(/(?<=<h3 class="tempsheader">)[\s\S]*?(?=<)/)
			let personne = temps[j].toString().match(/(?<=<div class="tempscorps">)[\s\S]*?(?=<\/div>)/g) // Get the temps container
			let personneArr = personne
				.toString()
				.replace(/<b>|<\/b>/g, "")
				.split("<br />")
			personneArr.pop()

			// Add the temps
			mode.temps.push({ nom: nomTemps, personne: personneArr })
		}
		modes.push(mode)
	}

	return { message: "Voici les conjugaisons", modes: modes }
}
