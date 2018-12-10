const mapOwOify = { 'r':'w',
                    'R':'W',
                    'l':'w',
                    'L':'W',
                    'n':'nya',
                    'N':'NYA'
                };

module.exports = function OwO(mod){
    function OwOify(event) {
        event.message = event.message.replace(/[rlnRLN](?![^<&]*[\>;])/ig, (str) => str = mapOwOify[str]);
        return true;
    };

    mod.hook('S_CHAT', 2, OwOify);
    mod.hook('S_WHISPER', 2, OwOify);
    mod.hook('C_CHAT', 1, OwOify);
}