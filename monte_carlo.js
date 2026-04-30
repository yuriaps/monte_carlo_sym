/* Simulacao Monte Carlo 
   date: 30/04/26
*/

// Simplificando, assumindo o premio sempre em A
const data = [
    {id: "A", prize: true},
    {id: "B", prize: false},
    {id: "C", prize: false}
]

const ITER = 10;
const ROUNDS = 1000000;

console.log(`## ROUNDS: ${ROUNDS}`);

for (let k = 0; k < ITER; k++){
    count1 = 0;
    count2 = 0;
    // ## caso sem mudar a porta
    for (let idx = 0; idx< ROUNDS; idx++){
        // Escolher uma porta aleatoria dentre as 3
        // Math.floor arredonda pra baixo
        // Math.random() * 3 -> numero nao inteiro de 1 a 3 (na verdade de 0 a 2, pq computacao usa indice 0)
        const randomItem = data[Math.floor(Math.random() * 3)];
        if (randomItem.prize === true) count1++;

    }
    // ## caso mudando sempre de porta
    for (let idx = 0; idx < ROUNDS; idx++){
        // Porta aleatoria entre as 3
        const randomItem = data[Math.floor(Math.random() * 3)];
        // Filtrar sempre deixando "A"
        const data_after_open = filter_data(randomItem);
        // Trocar
        const final_door = change(randomItem, data_after_open); 
        if (final_door.prize === true) count2++;
        
    }
    console.log(`ITER: ${k+1}/${ITER}, p_sem_mudar: ${count1/ROUNDS}, p_mudando_sempre: ${count2/ROUNDS}`);
}

function filter_data(door){
    // ------
    // truque de javascript pra nao estragar o input
    const _data = JSON.parse(JSON.stringify(data));
    //-------


    if(door.id === "B"){
        // pegar tudo que nao eh C
        return _data.filter(t => t.id !== "C");
    }
    else if (door.id === "A"){
        // pegar tudo que nao eh B (poderia ser C aqui no lugar de B)
        return _data.filter(t => t.id !== "B");
    }
    else {
        // pegar tudo que nao eh B
        return _data.filter(t => t.id !== "B");
    } 
}

function change(door, data_input){
    // Se a porta escolhida eh A, so pegar o que eh diferente de A
    if (door.id === "A"){
        return data_input.filter(t => t.id !== "A")[0];
    }
    // Se nao for A, pegar A
    else {
       return data_input.filter(t => t.id === "A")[0];
    }
}


