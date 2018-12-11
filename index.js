const faces = ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^"];

const phrases = {
    // replace "worse" with "wose"
    "worse": "wose",

    // replace (r || l) -> w
    "(?:r|l)": "w",
    "(?:R|L)": "W",

    // replace [a,e,i,o,u]y%
    "n([aeiou])": "ny$1",
    "N([aeiou])": "Ny$1",
    "N([AEIOU])": "Ny$1",

    // replace "ove" with "uv"
    "ove": "uv",

    // replace "boy" with "boi"
    "boy": "boi",
};

module.exports = function OwO(mod){
    function OwOify(event) {
        let msg = event.message;

        for(let rgx in phrases) msg = msg.replace(new RegExp(rgx), phrases[rgx]);

        // add a random face on "!"
        msg = msg.replace(/\!+/g, " " + faces[Math.floor(Math.random() * faces.length)] + " ");

        event.message = v;
        return true;
    }

    mod.hook('S_CHAT', 2, OwOify);
    mod.hook('S_WHISPER', 2, OwOify);
    mod.hook('C_CHAT', 1, OwOify);
}