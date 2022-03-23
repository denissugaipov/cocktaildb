const importIngredients = (drink: any) => {
    const ingredients: string[] = [];
    const measures: string[] = [];
    for(let i = 0; i < 15; i++) {
        let keyIngredients = `strIngredient${i+1}`
        let keyMeasures = `strMeasure${i+1}`
        if(drink[keyIngredients]) {
            ingredients.push(drink[keyIngredients])
        }
        if(drink[keyMeasures]) {
            measures.push(drink[keyMeasures])
        }
    }
    return {
        ingredients: ingredients,
        measures: measures
    }
}

export default importIngredients