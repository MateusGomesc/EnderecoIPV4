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
        return 8
    }
    else if(Octeto == 127){
        console.log("Ip reservado. Desconsidere o resultado.")
    }
    else if(Octeto >= 128 && Octeto <= 192){ //classe B, 192 se comporta como B
        return 16
    }
    else if(Octeto >= 193 && Octeto <= 223){ //classe C
        return 24
    }
}

function TemSubRede(Index, Mascara){
    if(Mascara[Index] == 1){
        return true
    }
    else{
        return false
    }   
}

function QuantidadeBitsHabilitadosDepoisTrava(Mascara, Index){
    const host = Mascara.slice(Index)
    let BitsHabilitados = 0

    for(let i=0; i<host.length; i++){
        if(host[i] == 1){
            BitsHabilitados++
        }
    }
    
    return BitsHabilitados
}

function QuantidadeSubredes(Mascara, Index){
    let BitsHabilitados = QuantidadeBitsHabilitadosDepoisTrava(Mascara, Index)
    let QuantidadeSubredes = Math.pow(2, BitsHabilitados)

    return QuantidadeSubredes
}

function DescobreIntervaloDeSubredes(NumRedes, Index){
    let espaco = (Math.pow(256, ((32 - Index) / 8))) / NumRedes
    return espaco
}

function CompletaZeros(array){
    if(array.length == 2){
        array.unshift(0)
    }
    else if(array.length == 1){
        array.unshift(0, 0)
    }
}

function DescobreIntervaloIp(VetorRede, VetorBroadcast, Ipv4, espaco, NumRedes, Mascara, Index){
    const BitsHabilitados = QuantidadeBitsHabilitadosDepoisTrava(Mascara, Index)
    const TravaDecimal = (Index * 3) / 8
    
    for(let i=0; i<NumRedes; i++){
        if(i==0){
            if(BitsHabilitados > 8 && BitsHabilitados < 16 && Index == 8 || Index == 16){
                VetorRede = Ipv4.slice(0, (TravaDecimal+3))
                VetorBroadcast = Ipv4.slice(0, (TravaDecimal+3))
            }
            else if(BitsHabilitados > 16 && BitsHabilitados < 24 && Index == 8){
                VetorRede = Ipv4.slice(0, (TravaDecimal+6))
                VetorBroadcast = Ipv4.slice(0, (TravaDecimal+6))
            }
            else{
                VetorRede = Ipv4.slice(0, TravaDecimal)
                VetorBroadcast = Ipv4.slice(0, TravaDecimal)
            }

            let CopiaEspaco = espaco--
            let EspacoArray = Array.from(String(CopiaEspaco), num => Number(num))
            const Paradaloop = VetorRede.length
            let contador = 0

            for(let j=0; j<(12 - Paradaloop); j++){
                VetorRede.push(0)
                
                if(EspacoArray.length == 1){
                    if(j==0 || j==1){
                        VetorBroadcast.push(0)
                    }
                    else{
                        VetorBroadcast.push(EspacoArray[contador])
                        contador++
                    }
                }
                else if(EspacoArray.length == 2){
                    if(j==0){
                        VetorBroadcast.push(0)
                    }
                    else{
                        VetorBroadcast.push(EspacoArray[contador])
                        contador++
                    }
                }
                else if(EspacoArray.length == 3){
                    VetorBroadcast.push(EspacoArray[contador])
                    contador++
                }
            }
        
        }
        else{
            contador = TravaDecimal
            let dentro = 0

            while(dentro != (12-TravaDecimal)){
                if(Ipv4[contador] >= VetorRede[contador] && Ipv4[contador] <= VetorBroadcast[contador]){
                    dentro++
                }
                else{
                    break
                }
            }
            
            if(dentro == 12){
                break
            }
            else{
                let SomaQuartoOctetoRede = parseInt(VetorRede.slice(9).join(""))
                let SomaQuartoOctetoBroadcast = parseInt(VetorBroadcast.slice(9).join(""))
                let SomaTerceiroOctetoRede = parseInt(VetorRede.slice(6, 9).join(""))
                let SomaTerceiroOctetoBroadcast = parseInt(VetorBroadcast.slice(6, 9).join(""))
                let SomaSegundoOctetoRede = parseInt(VetorRede.slice(3, 6).join(""))
                let SomaSegundoOctetoBroadcast = parseInt(VetorRede.slice(3, 6).join(""))

                SomaQuartoOctetoRede += espaco
                SomaQuartoOctetoBroadcast += espaco

                //Quarto octeto passa de 255
                if(SomaQuartoOctetoBroadcast>255 || SomaQuartoOctetoRede>255){
                    SomaTerceiroOctetoRede++
                    SomaTerceiroOctetoBroadcast++

                    SomaQuartoOctetoRede = 255 - SomaQuartoOctetoRede
                    SomaQuartoOctetoBroadcast = 255 - SomaQuartoOctetoBroadcast

                    //Transforma Somas em arrays
                    SomaQuartoOctetoBroadcast = Array.from(String(SomaQuartoOctetoBroadcast), num => Number(num))
                    //Completa com zero a esquerda
                    CompletaZeros(SomaQuartoOctetoBroadcast)

                    SomaQuartoOctetoRede = Array.from(String(SomaQuartoOctetoRede), num => Number(num))
                    CompletaZeros(SomaQuartoOctetoRede)

                    SomaTerceiroOctetoRede = Array.from(String(SomaTerceiroOctetoRede), num => Number(num))
                    CompletaZeros(SomaTerceiroOctetoRede)

                    SomaTerceiroOctetoBroadcast = Array.from(String(SomaTerceiroOctetoBroadcast), num => Number(num))
                    CompletaZeros(SomaTerceiroOctetoBroadcast)

                    //Troca valores dos Ip´s da rede e broadcast para nova verificação
                    let ContadorVetor = 6
                    let ContadorSoma = 0
                    for(let j=0; j<6; j++){
                        //Reinicia Contador do array da soma para o quarto octeto
                        if(j==3){
                            ContadorSoma = 0
                        }

                        //Troca terceiro octeto
                        if(j<3){
                            VetorRede[ContadorVetor] = SomaTerceiroOctetoRede[ContadorSoma]
                            VetorBroadcast[ContadorVetor] = SomaTerceiroOctetoRede[ContadorSoma]
                        }
                        else if(j>=3){ //Troca quarto octeto
                            VetorRede[ContadorVetor] = SomaQuartoOctetoRede[ContadorSoma]
                            VetorBroadcast[ContadorVetor] = SomaQuartoOctetoRede[ContadorSoma]                            
                        }
                        ContadorVetor++
                        ContadorSoma++
                    }
                }
                
                //terceiro octeto passa de 255
                if(SomaTerceiroOctetoRede>255 || SomaTerceiroOctetoBroadcast>255){
                    //zera terceiro octeto
                    SomaTerceiroOctetoRede = 0
                    SomaTerceiroOctetoBroadcast = 0
                    
                    //incrementa no segundo octeto
                    SomaSegundoOctetoRede++
                    SomaSegundoOctetoBroadcast++

                    //transforma somas em arrays
                    SomaSegundoOctetoBroadcast = Array.from(String(SomaSegundoOctetoBroadcast), num => Number(num))
                    //completa com zeros à esquerda
                    CompletaZeros(SomaSegundoOctetoBroadcast)

                    SomaSegundoOctetoRede = Array.from(String(SomaSegundoOctetoRede), num => Number(num))
                    CompletaZeros(SomaSegundoOctetoRede)

                    SomaTerceiroOctetoRede = Array.from(String(SomaTerceiroOctetoRede), num => Number(num))
                    CompletaZeros(SomaTerceiroOctetoRede)

                    SomaTerceiroOctetoRede = Array.from(String(SomaTerceiroOctetoRede), num => Number(num))
                    CompletaZeros(SomaTerceiroOctetoRede)

                    //Troca valores de Ip´s de rede e broadcast para nova verificação
                    let ContadorVetor = 3
                    let ContadorSoma = 0
                    for(let j=0; j<6; j++){
                        if(j==3){ //zera contador para trocar no terceiro octeto
                            ContadorSoma = 0
                        }

                        //Troca segundo octeto
                        if(j<3){
                            VetorRede[ContadorVetor] = SomaSegundoOctetoRede[ContadorSoma]
                            VetorBroadcast[ContadorVetor] = SomaSegundoOctetoRede[ContadorSoma]
                        }
                        else if(j>=3){ //troca terceiro octeto
                            VetorRede[ContadorVetor] = SomaTerceiroOctetoRede[ContadorSoma]
                            VetorBroadcast[ContadorVetor] = SomaTerceiroOctetoRede[ContadorSoma]                            
                        }
                        ContadorVetor++
                        ContadorSoma++
                    }
                }
                else{ //Troca somente quarto octeto
                    //transfroma em array
                    SomaQuartoOctetoBroadcast = Array.from(String(SomaQuartoOctetoBroadcast), num => Number(num))
                    //Completa com zeros
                    CompletaZeros(SomaQuartoOctetoBroadcast)

                    SomaQuartoOctetoRede = Array.from(String(SomaQuartoOctetoRede), num => Number(num))
                    CompletaZeros(SomaQuartoOctetoRede)

                    let Contador = 9
                    for(let j=0; j<3; j++){
                        VetorRede[Contador] = SomaQuartoOctetoRede[j]
                        VetorBroadcast[Contador] = SomaQuartoOctetoRede[j]
                        Contador++
                    }
                }
            }
        }
    }
}

function DescobreRedeBroadcast(Ip, ArrayRede, ArrayBroadcast, Index, Mascara){
    const TravaDecimal = (Index * 3) / 8

    if(TemSubRede(Index, Mascara) == false){
        for(let i=0; i<TravaDecimal; i++){
            ArrayRede.push(Ip[i])
            ArrayBroadcast.push(Ip[i])
        }

        let Contador = 0
        for(let i=0; i<(12 - TravaDecimal); i++){
            ArrayRede.push(0)

            if(Contador == 0 || Contador == 3 || Contador == 6){
                ArrayBroadcast.push(2)
            }
            else{
                ArrayBroadcast.push(5)
            }
            Contador++
        }
    }
    else{
        let Subredes = QuantidadeSubredes(Mascara, Index)
        let Intervalo = DescobreIntervaloDeSubredes(Subredes, Index)
        DescobreIntervaloIp(ArrayRede, ArrayBroadcast, Ip, Intervalo, Subredes, Mascara, Index)
    }
}

//recebe IPV4 e Macara de rede
let IpNum = prompt("Digite o endereco IPV4")
let MascaraNum = prompt("Digite a mascara de rede")
let Rede = []
let Broadcast = []

//transforma Inteiro em Array
let IpArray = Array.from(String(IpNum), num => Number(num))
let MascaraArray = Array.from(String(MascaraNum), num => Number(num))

//Verifica se Ip é válido
if(IpArray.length != 12){console.log("Ip Invalido, desconsidere resultado.")}

//Recebe marco para verificar subrede
let Index = VerificaClasse(IpArray)

//Recebe mascara em binario
RetornaMascaraBinario(MascaraArray)

//Recebe endereço de rede e broadcast do endereço ip apresentado
DescobreRedeBroadcast(IpArray, Rede, Broadcast, Index, MascaraArray)