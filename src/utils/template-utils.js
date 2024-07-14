function getStyleByAccuracy(word, accuracy) {
	//		background: -webkit-linear-gradient(top, #4d90fe, #4787ed);
	elementId = getVocabularyElementId(word)
	return `
		<style>
			#${elementId} {
				border: 1px solid rgba(48, 121, 237, ${accuracy});
			}
		</style>
	`
}

function getVocabularyElementId(word) {
	return getElementId("vocabulary", word)
}

function getElementId(type, name) {
	return `${type}-${name}`
}
