/* Simulacao Monte Carlo 
   date: 30/04/26
   Tres portas, A, B, C. Apos o convidado escolher uma, o apresentador abre uma sem premio
   e o convidado pode escolher trocar ou nao
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

for (let _k = 0; _k < ITER; _k++){
    count_no_change = 0;
    count_w_change = 0;
    // ## caso sem mudar a porta
    for (let _i = 0; _i< ROUNDS; _i++){
        // Escolher uma porta aleatoria dentre as 3
        // Math.floor arredonda pra baixo
        // Math.random() * 3 -> numero nao inteiro de 1 a 3 (na verdade de 0 a 2, pq computacao usa indice 0)
        const random_door = data[Math.floor(Math.random() * 3)];
        if (random_door.prize === true) count_no_change++;

    }
    // ## caso mudando sempre de porta
    for (let _i = 0; _i < ROUNDS; _i++){
        // Porta aleatoria entre as 3
        const random_door = data[Math.floor(Math.random() * 3)];
        // Filtrar data sempre deixando "A" e "B" ou "A" e "C", dependendo do item 
        const data_after_open = filter_data(random_door);
        // Trocar
        const final_door = change(random_door, data_after_open); 
        if (final_door.prize === true) count_w_change++;
        
    }
    console.log(`ITER: ${_k+1}/${ITER}, p_sem_mudar: ${count_no_change/ROUNDS}, p_mudando_sempre: ${count_w_change/ROUNDS}`);
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

/*
resultado:
-----------------------------------------------------------
## ROUNDS: 1000000
ITER: 1/10, p_sem_mudar: 0.333113, p_mudando_sempre: 0.666247
ITER: 2/10, p_sem_mudar: 0.333953, p_mudando_sempre: 0.667407
ITER: 3/10, p_sem_mudar: 0.332743, p_mudando_sempre: 0.666661
ITER: 4/10, p_sem_mudar: 0.333571, p_mudando_sempre: 0.666665
ITER: 5/10, p_sem_mudar: 0.333143, p_mudando_sempre: 0.667262
ITER: 6/10, p_sem_mudar: 0.333449, p_mudando_sempre: 0.6673
ITER: 7/10, p_sem_mudar: 0.333406, p_mudando_sempre: 0.667371
ITER: 8/10, p_sem_mudar: 0.333466, p_mudando_sempre: 0.666218
ITER: 9/10, p_sem_mudar: 0.333601, p_mudando_sempre: 0.666049
ITER: 10/10, p_sem_mudar: 0.334013, p_mudando_sempre: 0.667082
*/
