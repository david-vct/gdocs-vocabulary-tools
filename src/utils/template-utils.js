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
