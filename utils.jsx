/* ES6 JSON/MAP utils --
	inspired by http://www.2ality.com/2015/08/es6-map-json.html */

export function mapToJson(map) {
    return JSON.stringify([...map]);
}
export function jsonToMap(jsonStr) {
	console.log(jsonStr);
    return new Map(JSON.parse(jsonStr));
}
export function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        // We don’t escape the key '__proto__'
        // which can cause problems on older engines
        obj[k] = v;
    }
    return obj;
}
export function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
export function strMapToJson(strMap) {
    return JSON.stringify(this.strMapToObj(strMap));
}
export function jsonToStrMap(jsonStr) {
    return this.objToStrMap(JSON.parse(jsonStr));
}