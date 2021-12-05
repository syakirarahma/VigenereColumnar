// Columnar Transposition

var chars = "abcdefghijklmnopqrstuvwxyz";

function handleEncryptCol() {
    var plaintext = (getById("m-columnar").value);
    if (validate(plaintext, 'Please enter some plaintext.')) return;
    var key = (getById("key-columnar").value);
    var pc = (getById("pc-columnar").value);
    getById("r-columnar").value = encryptCol(plaintext, key, pc);
}
function handleDecryptCol() {
    var ciphertext = (getById("m-columnar").value);
    if (validate(ciphertext, 'Please enter some ciphertext (letters only).')) return;
    var key = (getById("key-columnar").value);
    getById("r-columnar").value = decryptCol(ciphertext, key);
}

function encryptCol(plaintext, key, pc) {
    var klen = key.length;
    if (pc == "") pc = "x";
    if (klen <= 1) {
      alert("keyword should be at least 2 characters long");
      return;
    }
    while (plaintext.length % klen != 0) {
        plaintext += pc.charAt(0);
    }
    var colLength = plaintext.length / klen;
    var ciphertext = "";
    k = 0;
    for (i = 0; i < klen; i++) {
        while (k < 26) {
            t = key.indexOf(chars.charAt(k));
            arrkw = key.split("");
            arrkw[t] = "_";
            key = arrkw.join("");
            if (t >= 0) break;
            else k++;
        }
        for (j = 0; j < colLength; j++) {
            ciphertext += plaintext.charAt(j * klen + t);
        }
    }
    return ciphertext;
}

function decryptCol(ciphertext, keyword) {
    var klen = keyword.length;
    if (klen <= 1) {
        alert("keyword should be at least 2 characters long");
        return;
    }
    if (ciphertext.length % klen != 0) {
        alert("ciphertext has not been padded, the result may be incorrect (incorrect keyword?).");
    }
    // first we put the text into columns based on keyword length
    var cols = new Array(klen);
    var colLength = ciphertext.length / klen;
    for (i = 0; i < klen; i++) cols[i] = ciphertext.substr(i * colLength, colLength);
    // now we rearrange the columns so that they are in their unscrambled state
    var newcols = new Array(klen);
    j = 0;
    i = 0;
    while (j < klen) {
        t = keyword.indexOf(chars.charAt(i));
        if (t >= 0) {
            newcols[t] = cols[j++];
            arrkw = keyword.split("");
            arrkw[t] = "_";
            keyword = arrkw.join("");
        } else i++;
    }
    // now read off the columns row-wise
    var plaintext = "";
    for (i = 0; i < colLength; i++) {
        for (j = 0; j < klen; j++) {
            plaintext += newcols[j].charAt(i);
        }
    }
    return plaintext;
}

function validate(text, message) {
    if (text.length < 1) {
        alert(message);
    }
}

function getById(id) {
    return document.getElementById(id);
}

// function normalize(value) {
//     return value.toLowerCase().replace(/[^a-z]/g, "");
// }



// Vigenere Cipher

/**
 * Check if the Character is letter or not
 * @param {String} str - character to check
 * @return {object} An array with the character or null if isn't a letter
 */


 function handleEncryptVig() {
    var plaintext = getById("m-vig").value;
    if (validate(plaintext, 'Please enter some plaintext.')) return;
    var key = getById("key-vig").value;
    getById("r-vig").value = encryptVig(plaintext, key);
}

function handleDecryptVig() {
    var ciphertext = getById("m-vig").value;
    if (validate(ciphertext, 'Please enter some ciphertext.')) return;
    var key = getById("key-vig").value;
    getById("r-vig").value = decryptVig(ciphertext, key);
}


function validate(text, message) {
  if (text.length < 1) {
      alert(message);
  }
}

// function handleEncrypt(){
// 	var plaintext = getById("p").value;
// 	var key = getById("key").value;
// 	getById("c").value = encrypt(plaintext, key);
// }

// function handleDecrypt(){
// 	var ciphertext = getById("c").value;
// 	var key = getById("key").value;
// 	getById("p").value = decrypt(ciphertext, key);
// }

 function isLetter (str) {
	return str.length === 1 && str.match(/[a-zA-Z]/i)
  }
   
  /**
   * Check if is Uppercase or Lowercase
   * @param {String} character - character to check
   * @return {Boolean} result of the checking
   */
  function isUpperCase (character) {
	if (character === character.toUpperCase()) {
	  return true
	}
	if (character === character.toLowerCase()) {
	  return false
	}
  }
   
  /**
   * Encrypt a Vigenere cipher
   * @param {String} message - string to be encrypted
   * @param {String} key - key for encrypt
   * @return {String} result - encrypted string
   */
  function encryptVig (message, key) {
	let result = ''
   
	for (let i = 0, j = 0; i < message.length; i++) {
	  const c = message.charAt(i)
	  if (isLetter(c)) {
		if (isUpperCase(c)) {
		  result += String.fromCharCode((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 2 * 65) % 26 + 65) // A: 65
		} else {
		  result += String.fromCharCode((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 2 * 97) % 26 + 97) // a: 97
		}
	  } else {
		result += c
	  }
	  j = ++j % key.length
	}
	return result
  }
   
  /**
   * Decrypt a Vigenere cipher
   * @param {String} message - string to be decrypted
   * @param {String} key - key for decrypt
   * @return {String} result - decrypted string
   */
  function decryptVig (message, key) {
	let result = ''
   
	for (let i = 0, j = 0; i < message.length; i++) {
	  const c = message.charAt(i)
	  if (isLetter(c)) {
		if (isUpperCase(c)) {
		  result += String.fromCharCode(90 - (25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26)
		} else {
		  result += String.fromCharCode(122 - (25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26)
		}
	  } else {
		result += c
	  }
	  j = ++j % key.length
	}
	return result
  }

  