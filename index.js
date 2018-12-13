const faces = ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^"];

const phrases = {
    // replace "worse" with "wose"
    "worse": "wose",

    // replace (r || l) -> w
    "(?:r|l)": "w",
    "(?:R|L)": "W",

    // replace n[a,e,i,o,u]y%
    "n([aeiou])": "ny$1",
    "N([aeiou])": "Ny$1",
    "N([AEIOU])": "Ny$1",

    // replace k[a,e,i,o,u]y%
    "k([aeiou])": "ky$1",
    "K([aeiou])": "Ky$1",
    "K([AEIOU])": "Ky$1",

    // replace "ove" with "uv"
    "ove": "uv",

    // replace "boy" with "boi"
    "boy": "boi",

    // replace "nya" with "nya~"
    "nya([< ])": "nya~$1",
    "Nya([< ])": "Nya~$1",
    "NYA([< ])": "NYA~$1",

    // replace "kya" with "kya~"
    "kya([< ])": "kya~$1",
    "Kya([< ])": "Kya~$1",
    "KYA([< ])": "KYA~$1",
};

module.exports = function OwO(mod) {
    const DEBUG = false;

    function OwOify(msg) {
        for(let rgx in phrases) msg = msg.replace(new RegExp(rgx, 'g'), phrases[rgx]);

        // add a random face on "!"
        msg = msg.replace(/\!+/g, " " + faces[Math.floor(Math.random() * faces.length)] + " ");

        return msg;
    }

    function foo(type, e) {
        if(e.message.includes("ChatLinkAction")) return;
        if(DEBUG) console.log(e);

        e.message = OwOify(e.message);
        switch(type) {
            case "S_CHAT": {
                e.authorName = OwOify(e.authorName)
                break;
            }

            case "S_WHISPER": {
                if(mod.game.me.name == e.authorName) e.recipient = OwOify(e.recipient)
                else e.authorName = OwOify(e.authorName)
                break;
            }
        }
        
        if(DEBUG) console.log(e);
        return true;
    }

    mod.hook('S_CHAT', 2, foo.bind(null, "S_CHAT"));
    mod.hook('S_WHISPER', 2, foo.bind(null, "S_WHISPER"));
    mod.hook('C_CHAT', 1, foo.bind(null, "C_CHAT"));
}