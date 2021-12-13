// String normalization function.
export function normalize(str) {
    if (str) {
        // Normalize string (i.e., separate character from diacritic).
        let result = str.normalize("NFD")
        // Delete normalized diacritics.
        result = result.replace(/\p{Diacritic}/gu, "")
        // Convert string to lower case.
        result = result.toLowerCase()
        // Return proccessed string.
        return replace(result)
    } else {
        return str
    }
}

// Proccess characters to support multiple orthograpic variations (diacritics and ligatures).
// Supports most common diacritics and letters that are not part of the classic latin system.
// Should cover germanic and slavik languages, and some alphabetic romanizations good enough.
function replace(str) {
    // aeiouy-clnrsz » ´ (acute accent-kreska)
    // aeiouy » ` (grave accent)
    // aeiou » ˘ (breve)
    // aeiou-r » ˘ (inverted breve)
    // aeiou-cdlnrstz » ˇ|ʼ (caron-háček)
    // aeiouy » ˆ (circumflex)
    // aeiouy » ¨ (diaeresis-umlaut)
    // aeiouy » ¯ (macron)
    // aeiou » ˛ (ogonek)
    // aiou » ¯ (tilde)
    // au » ° (ring-kroužek)
    // z » ż (overdot-kropka)

    // Vowels.
    const a = 'aáàăȃâǎäāąãåæ'
    const e = 'eéèĕȇêěëēę'
    const i = 'iíìĭȋîǐïīįĩ'
    const o = 'oóòŏȏôǒöōǫõø'
    const u = 'uúùŭȗûǔüūųũů'
    const y = 'yýỳŷÿȳ'
    // Consonants.
    const b = 'bß'
    const c = 'cćčç'
    const d = 'dďð'
    const l = 'lĺľł'
    const n = 'nńňñ'
    const p = 'pþ'
    const r = 'rŕȓř'
    const s = 'sśš'
    const t = 'tť'
    const z = 'zźžż'

    // Replace characters.
    str = str.replaceAll('a', `[${a}]`) // a » æ (ash)
    str = str.replaceAll('b', `[${b}]`) // b » ß (eszett)
    str = str.replaceAll('e', `[${e}]`) // e
    str = str.replaceAll('i', `[${i}]`) // i » ł (stroked L)
    str = str.replaceAll('o', `[${o}]`) // o » ø (Ø)
    str = str.replaceAll('u', `[${u}]`) // u
    str = str.replaceAll('y', `[${y}]`) // y
    str = str.replaceAll('c', `[${c}]`) // c » ç (cedilla)
    str = str.replaceAll('d', `[${d}]`) // d » ð (eth)
    str = str.replaceAll('l', `[${l}]`) // l
    str = str.replaceAll('n', `[${n}]`) // n » ñ (eñe)
    str = str.replaceAll('p', `[${p}]`) // p » þ (thorn)
    str = str.replaceAll('r', `[${r}]`) // r
    str = str.replaceAll('s', `[${s}]`) // s
    str = str.replaceAll('t', `[${t}]`) // t
    str = str.replaceAll('z', `[${z}]`) // z » ż (overdotted Z)
    str = str.replaceAll(`[${a}][${e}]`, `([${a}][${e}]|æ)`) // ae » æ (ash)
    str = str.replaceAll(`[${o}][${u}]`, `([${o}][${u}]|[${o}])`) // ou » ō
    str = str.replaceAll(`[${s}][${s}]`, `([${s}][${s}]|ß)`) // ss » ß (eszett)
    str = str.replaceAll(`[${t}]h`, `([${t}]h|þ)`) // th » þ (thorn)

    // Return proccessed string.
    return str
}