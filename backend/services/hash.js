function customHash(input) {
    const prime1 = 1e9 + 19;
    const prime2 = 179426549;
    const hashLength = 50;
    let hash = new Array(hashLength).fill(0);

    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);
        
        // Mix the current character into the hash
        for (let j = 0; j < hashLength; j++) {
            hash[j] = (hash[j] * prime1 + charCode) % 256;
            hash[j] ^= (charCode * prime2 + j) % 256; // XOR operation for diffusion
        }
        // console.log(hash)
    }

    // Convert each byte to a 2-character hexadecimal string
    return hash.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

module.exports = {customHash};
