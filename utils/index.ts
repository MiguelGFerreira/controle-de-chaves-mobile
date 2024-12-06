export function convertDataURIToBinary(dataURI: string) {
	var base64Index = dataURI.indexOf(';base64,') + ';base64,'.length;
	var base64 = dataURI.substring(base64Index);
	var raw = window.atob(base64)
	var rawLength = raw.length;
	var array = new Uint8Array(new ArrayBuffer(rawLength));

	for(let i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}
	return array;
}