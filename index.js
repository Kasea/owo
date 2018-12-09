const mapOwOify = { 'r':'w',
                    'R':'W',
                    'l':'w',
                    'L':'W',
                    'n':'nya',
                    'N':'NYA'
                };

module.exports = function OwO(mod){
    let enabled = false;

    mod.command.add("sp", {
        state() {
            enabled = !enabled;
            mod.command.message(`State: ${enabled}`);
        },
    }, this);
    
    function Owoify(event) {
        if(!enabled) return;
        event.message = event.message.replace(/[rlnRLN](?![^<&]*[\>;])/ig, (str) => str = mapOwOify[str]);
        return true;
    };

    mod.hook('S_CHAT',2,Owoify);
    mod.hook('S_WHISPER',2,Owoify);
}