/* ----- CONJUGATION FUNCTIONS -----*/

// Returns object with a message error and the expression's synonyms array
function getConjugation(expression) {
	var url = "https://la-conjugaison.nouvelobs.com/du/verbe/" + expression.toLowerCase() + ".php"
	var html = getHtml(url)
	var data = searchConjugation(expression, html)
	//ui.alert("End searchConjugation");
	return data
}

/* Search conjugation of @expression on @html nouvelobs.com
 * Retrun [{mode,temps:[{nom,personne:[]},...]},...]
 **/
function searchConjugation(expression, html) {
	var message = "Voici les conjugaisons."
	var modes = []
	var container = html.toString().match(/class="mode">[\s\S]*?<div class="tempstab">[\s\S]*?<h2/g)
	if (container) {
		for (var i = 0; i < container.length; i++) {
			var mode = new Object()
			mode.nom = container[i].toString().match(/(?<=<span>)[\s\S]*?(?= <)/)
			mode.temps = []
			var temps = container[i].toString().match(/<div class="tempstab">[\s\S]*?<\/div><\/div>/g)
			for (var j = 0; j < temps.length; j++) {
				var nomTemps = temps[j].toString().match(/(?<=<h3 class="tempsheader">)[\s\S]*?(?=<)/)
				var personne = temps[j].toString().match(/(?<=<div class="tempscorps">)[\s\S]*?(?=<\/div>)/g) // Get the temps container
				var personneArr = personne
					.toString()
					.replace(/<b>|<\/b>/g, "")
					.split("<br />")
				personneArr.pop()
				//if (i==0 && j==0) ui.alert(personne + "\r\n" + personneArr);
				mode.temps.push({ nom: nomTemps, personne: personneArr })
			}
			modes.push(mode)
		}
	} else message = "Nous n'avons pas trouvé le verbe " + expression + " :/"
	return { message: message, modes: modes }
}
