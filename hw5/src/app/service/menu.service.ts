export async function getSets() {
    let data = await fetch('http://localhost:3000/api/sets');
    let sets = await data.json()
    return sets;
}