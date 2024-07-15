/**
 * Create the vocabulary button with the style based on accuracy
 * @param {string} word
 * @param {number} accuracy
 * @returns {string} html input
 */
function createVocabularyElement(word, accuracy) {
	let saturation = 0.3 + accuracy * 0.7
	let brightness = 1 + accuracy * 0.2
	return `
		<input
			type="submit"
			class="action"
			value="${word}"
			onclick="replaceSelection('${word}')"
			style="filter: saturate(${saturation}) brightness(${brightness});"
		/>
	`
}
