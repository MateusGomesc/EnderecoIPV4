function TransformaDecimalBinario(array){
    const Multiplos = [128, 64, 32, 16, 8, 4, 2, 1]
    let Octetos = []
    let ContadorReuni = 0

    //reuni octetos
    for(let i=0; i<array.length; i+=3){
        Octetos[ContadorReuni] = array.slice(i, i+3).join("")
        ContadorReuni++
    }

    //converte para binario
    let ContadorConverte = 0
    for(let i=0; i<4; i++){
        for(let j=0; j<8; j++){
            if(Octetos[i] >= Multiplos[j]){
                Octetos[i] -= Multiplos[j]
                array[ContadorConverte] = 1
            }
            else{
                array[ContadorConverte] = 0
            }
            ContadorConverte++
        }
    }
}

function RetornaMascaraBinario(array){
    let Tamanho = array.length
    let Contador = 0

    if(Tamanho == 1 || Tamanho == 2){ //CDIR
        const CDIR = array.join("")
        for(let i=0; i<CDIR; i++){
            array[Contador] = 1
            Contador++
        }
        for(let i=0; i<(32 - CDIR); i++){
            array[Contador] = 0
            Contador++
        }
    }
    else if(Tamanho == 12){ //Decimal
        TransformaDecimalBinario(array)
    }
    else if(Tamanho == 32){ //Binario
        return array
    }
    else{
        console.log("Mascara de rede invalida. Desconsidere resultado.")
    }
}

function VerificaClasse(array){
    //Pega o primeiro octeto do ip
    Octeto = array.slice(0, 3).join("")

    //descobre classe
    if(Octeto >= 1 && Octeto <= 126){ //classe A
        return 9
    }
    else if(Octeto == 127){
        console.log("Ip reservado. Desconsidere o resultado.")
    }
    else if(Octeto >= 128 && Octeto <= 192){ //classe B, 192 se comporta como B
        return 17
    }
    else if(Octeto >= 193 && Octeto <= 223){ //classe C
        return 25
    }
}

//recebe IPV4 e Macara de rede
let IpNum = prompt("Digite o endereco IPV4")
let MascaraNum = prompt("Digite a mascara de rede")

//transforma Inteiro em Array
let IpArray = Array.from(String(IpNum), num => Number(num))
let MascaraArray = Array.from(String(MascaraNum), num => Number(num))

//Verifica se Ip é válido
if(IpArray.length != 12){console.log("Ip Invalido, desconsidere resultado.")}

let Trava = VerificaClasse(IpArray)
RetornaMascaraBinario(MascaraArray)