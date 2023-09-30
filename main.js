// Função para calcular a rede e o broadcast
function intervalo(ip, mascaraDecimal) {
    // transformar decimal em binario
    function decimalBinario(mascaraDecimal) {
        return (1 << 32) - (1 << (32 - mascaraDecimal))
    }

    const mascaraBinaria = decimalBinario(mascaraDecimal) //transforma CDIR para Binario
    const ipNumerico = ip.split('.').reduce((acc, octeto) => (acc << 8) + parseInt(octeto), 0) //retira pontos e transforma ip em numero

    const enderecoRedeNumerico = ipNumerico & mascaraBinaria //compara bit a bit, se os dois 1 retorna 1
    const enderecoFinalNumerico = enderecoRedeNumerico | (mascaraBinaria ^ 0xFFFFFFFF) // compara mascara com 1 e depois com rede

    // retornar numero para ip
    function numeroParaIP(numero) {
        return [
            (numero >>> 24) & 255,
            (numero >>> 16) & 255,
            (numero >>> 8) & 255,
            numero & 255,
        ].join('.')
    }

    const enderecoRede = numeroParaIP(enderecoRedeNumerico)
    const enderecoFinal = numeroParaIP(enderecoFinalNumerico)

    return { inicio: enderecoRede, fim: enderecoFinal } //retorna objeto
}

//Recebe tags do documento
const btn = document.getElementById('botao')
const inputIp = document.getElementById('ip')
const inputMascara = document.getElementById('mascara')
const pRede = document.getElementById('rede')
const pBroadcast = document.getElementById('broadcast')

//Cilque do botao
btn.addEventListener('click', () => {
    const ip = inputIp.value // IP de entrada
    const mascaraDecimal = inputMascara.value // Máscara de rede em decimal

    const { inicio, fim } = intervalo(ip, mascaraDecimal)

    pRede.innerHTML = `Rede: ${inicio}`
    pBroadcast.innerHTML = `Broadcast: ${fim}`
})
