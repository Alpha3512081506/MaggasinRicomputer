import { resolve } from "core-js/fn/promise";


const cache = {};
// Set Cache attend la clè est les data={data:data="utile a get" et la moment que ses data ont ètès cachè}
function set(key, data) {
    return cache[key] = {
        data: data,
        cachedAt: new Date().getTime()
    };
}

//Permet de recuperer une cache nommèes
function get(key) {
    //si une cache existe renvoyè ses donnèes sinon null
    //etant dans une request axios on renvoie une promise
    //verifier que le cache est valide avant de le renvoye
    return new Promise(resolve => {
        cache[key] &&
            cache[key].cachedAt + 15 + 600 + 1000 > new Date().getTime() ?
            cache[key].data : null
    });

}