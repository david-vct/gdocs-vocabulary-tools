/**
 * Gets the matchs of @groupeIndex in @text
 * @param {RegExp} regex
 * @param {string} text
 * @param {number} groupeIndex
 */
function matchGroupe(regex, text, groupeIndex) {
	let matchs = [...text.matchAll(regex)]

	if (!matchs || matchs.length === 0) {
		throw new Error("No matchs found " + matchs + text)
	}

	// Reduce matchs to the groupe index desired
	return matchs.map((match) => match[groupeIndex])
}
