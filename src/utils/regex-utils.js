/**
 * Gets the matchs of @groupeIndex in @text
 * @param {RegExp} regex
 * @param {string} text
 * @param {number} groupeIndex
 */
function matchGroupe(regex, text, groupeIndex) {
	let matchs = [...text.matchAll(regex)]

	// Reduce matchs to the groupe index desired
	return matchs.map((match) => match[groupeIndex])
}
