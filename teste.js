let array = [1, 9, 2, 1, 6, 8, 0, 0, 0, 0, 0, 1]
let rede = [1, 9, 2, 1, 6, 8, 0, 0, 0, 0, 0, 0]
let broadcast =[1, 9, 2, 1, 6, 8, 0, 0, 0, 1, 2, 7]

//Se necessario realizar operações em outros octetos
let SomaTerceiroOcteto = 0
let SomaSegundoOcteto = 0
let SomaQuartoOcteto = [] // [1]: rede [2]: broadcast

for(let i=0; i<3; i++){
    //Limpa array de soma, ==function
    if(i!=0){
        while(SomaQuartoOcteto.length){
            SomaQuartoOcteto.pop()
        }
    }

    //Recebe ultimo octeto e soma
    SomaQuartoOcteto.push(parseInt(rede.slice(-3).join('')) + 128)
    SomaQuartoOcteto.push(parseInt(broadcast.slice(-3).join('')) + 128)

    //Retorna para array
    SomaQuartoOcteto[0] = Array.from(String(SomaQuartoOcteto[0]), num => Number(num))
    SomaQuartoOcteto[1] = Array.from(String(SomaQuartoOcteto[1]), num => Number(num))

    //Acrescenta zeros a esquerda se necessario, ==function
    if(SomaQuartoOcteto[0].length == 2){
        SomaQuartoOcteto[0].unshift(0)
    }
    else if(SomaQuartoOcteto[0].length == 1){
        SomaQuartoOcteto[0].unshift(0, 0)
    }
    
    if(SomaQuartoOcteto[1].length == 2){
        SomaQuartoOcteto[1].unshift(0)
    }
    else if(SomaQuartoOcteto[1].length == 1){
        SomaQuartoOcteto[1].unshift(0, 0)
    }

    console.log(SomaQuartoOcteto)

    for(let j=0; j<2; j++){
        //Verifca se ultrapassou 255 no Quarto oceteto
        if(SomaQuartoOcteto[j].join('') <= 255){
            //Muda array original
            if(j==0){ //modifica array da rede
                let Contador = 9
                for(let l=0; l<3; l++){
                    //modifica último octeto
                    rede.splice(Contador, 1, SomaQuartoOcteto[0][l])
                    Contador++
                }
            }
            else{ //modifica array de broadcast
                let Contador = 9
                for(let l=0; l<3; l++){
                    broadcast.splice(Contador, 1, SomaQuartoOcteto[1][l])
                    Contador++
                }
            }
        }
        else{
            console.log("Ultrapassou")
        }
    }

    console.log(rede)
    console.log(broadcast)
}