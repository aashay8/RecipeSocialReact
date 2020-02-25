
module.exports = function (){
    let args = Array.from(arguments)
    let toReturn = args.filter(v=> v);
    return toReturn.join('_');
}
