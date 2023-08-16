    const BitsHabilitados = 2
    let VetorRede = []
    let VetorBroadcast = []
    let Ipv4 = [1, 9, 3, 1, 6, 8, 1, 5, 8, 0, 5, 5]
    let Index = 24
    let NumRedes = 4
    const TravaDecimal = (Index * 3) / 8
    let espaco = 24
    
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

            espaco--
            let EspacoArray = [2, 3]
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
            print("Deu certp")
            if(dentro == 12){
                break
            }
        }
    }
    
    print(VetorBroadcast)
    print(VetorRede)