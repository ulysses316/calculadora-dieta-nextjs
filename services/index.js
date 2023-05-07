const calcIMC = (weight, size) => {
    return (weight / ((size / 100) * (size / 100))).toFixed(2);
}

const calcBenedict = (weight, size, age, gender) => {
    if (gender === "Masculino"){
        return Math.round(66.5+(13.75*weight)+(5*size)-(6.78*age));
    }
    else{
        return Math.round(655+(9.6*weight)+(1.85*size)-(4.68*age));
    }
}
const calcMifflin = (weight, size, age, gender) => {
    if (gender === "Masculino"){
        return Math.round((10*weight) + (6.25*size) - (5*age) + 5);
    }
    else{
        return Math.round((10*weight) + (6.25*size) - (5*age) - 161);
    }
}
const calcETA = (tmb) => { return Math.round(tmb*0.1) }

const calcFAF = (tmb,faf) => {
    if (faf === "1"){return Math.round(tmb*0.15)}
    else if (faf === "2"){return Math.round((tmb*1.3)-tmb)}
    else if (faf === "3"){return Math.round(tmb*0.45)}
    else{return Math.round(tmb*0.60)}
}

const calcWeight = (weight, size) =>{
    return {
        pesoIdeal: Math.round(size-100),
        pesoAjustado: Math.round(((weight-(size-100))*0.25)+(size-100))
    }
}

export {calcIMC, calcBenedict, calcMifflin, calcETA, calcFAF, calcWeight}