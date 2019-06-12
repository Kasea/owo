const faces = ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^"];

const phrases = {
    // replace "worse" with "wose"
    "worse": "wose",

    // replace (l) -> w
    "([^&])(l)": "$1w",
    "([^&])(L)": "$1W",

    // replace r -> r
    "([^&])(r)": "$1w",
    "([^&])(R)": "$1W",

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
    "nya([< ]|$)": "nya~$1",
    "Nya([< ]|$)": "Nya~$1",
    "NYA([< ]|$)": "NYA~$1",

    // replace "kya" with "kya~"
    "kya([< ]|$)": "kya~$1",
    "Kya([< ]|$)": "Kya~$1",
    "KYA([< ]|$)": "KYA~$1",
};

module.exports = function OwO(mod) {
    const DEBUG = false;
    let name_map = new Map();

    function OwOify(msg) {
        for(let rgx in phrases) {
            msg = msg.replace(new RegExp(rgx, 'g'), phrases[rgx]);
            if(DEBUG) console.log(rgx, ":", msg);
        }

        // add a random face on "!"
        msg = msg.replace(/\!/g, ()=> " " + faces[Math.floor(Math.random() * faces.length)]);

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
                else {
                    name_map.set(OwOify(e.authorName), e.authorName);
                    e.authorName = OwOify(e.authorName)
                }
                break;
            }

            case "C_WHISPER": {
                if(name_map.has(e.target)) e.target = name_map.get(e.target);
                break;
            }
        }
        
        if(DEBUG) console.log(e);
        return true;
    }

    mod.hook('S_CHAT', 2, {filter: {fake: null}}, foo.bind(null, "S_CHAT"));
    mod.hook('S_WHISPER', 2, {filter: {fake: null}}, foo.bind(null, "S_WHISPER"));
    mod.hook('C_CHAT', 1, {filter: {fake: null}}, foo.bind(null, "C_CHAT"));
    mod.hook('C_WHISPER', 1, {filter: {fake: null}}, foo.bind(null, "C_WHISPER"));
}