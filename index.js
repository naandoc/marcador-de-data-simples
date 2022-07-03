const calendario1 = document.querySelector("#data1")
const calendario2 = document.querySelector("#data2")

// Evento para a primeira data escolhida
calendario1.addEventListener("input", () => {
    // Retira a cor do dia que foi selecionado anteriormente,
    // caso o usuário escolha um dia novo
    if (firstDay) {
        pintaDiaSelecionado(diasDoMes[firstDay + 2], "")
    }

    firstDay = new Date(calendario1.value).getUTCDate()

    data1 = new Date(calendario1.value)
    exibeDiaSelecionado(data1)

    calendario2.disabled = false
})

// Evento para a segunda data escolhida
calendario2.addEventListener("input", () => {

    if (calendario2.value > calendario1.value) {
        // Limpa a primeira cor escolhida pelo input assim que o mesmo é aberto
        if (secondDay) {
            pintaDiaSelecionado(diasDoMes[secondDay + 2], "")
        }

        secondDay = new Date(calendario2.value).getUTCDate()

        data2 = new Date(calendario2.value)
        exibeDiaSelecionado(data2)

        // Seleciona os dias no calendário do primeiro dia escolhido para o segundo
        if (secondDay > firstDay) {
            for (let i = firstDay; i < secondDay - 1; i++) {
                pintaDiaSelecionado(diasDoMes[i + 3], "#000080")
            }
        }

        // Seleciona os dias no calendário do segundo dia escolhido para o primeiro
        if (firstDay > secondDay) {
            for (let n = firstDay + 3; n < 34; n++) {
                pintaDiaSelecionado(diasDoMes[n], "#000080")
                for (let m = 3; m < secondDay + 2; m++) {
                    pintaDiaSelecionado(diasDoMes[m], "#000080")
                }
            }
        }
        // Desabilita os inputs para não haver alterações depois de ter escolhidos os dias
        calendario1.disabled = true
        calendario2.disabled = true

        mostraOsDiasEntreDatas()
    }
})

let data1
let data2
let firstDay
let secondDay
calendario2.disabled = true
const diasDoMes = document.querySelectorAll("tbody>tr>td")

// Mostra no calendário o dia escolhido pelas duas datas
const exibeDiaSelecionado = (data) => {
    const dia = new Date(data).getUTCDate()

    for (let i = 3; i < diasDoMes.length - 6; i++) {
        let diaAlvo = Number(diasDoMes[i].textContent)

        if (dia === diaAlvo) {
            pintaDiaSelecionado(diasDoMes[i], "#D2691E")
        }
    }
}

const pintaDiaSelecionado = (dia, cor) => {
    dia.style.backgroundColor = cor
}

// Cálculo entre as datas escolhidas
const mostraOsDiasEntreDatas = () => {
    const divNovaData = document.querySelector(".resultado-dias")
    const tituloNovaData = document.querySelector(".title")

    let diasEntreDatas = new Date(calendario1.value) - new Date(calendario2.value)

    diasEntreDatas = Math.abs(diasEntreDatas / (1000 * 60 * 60 * 24))

    tituloNovaData.innerText = `Existem ${diasEntreDatas} dias entre ${calendario1.value} e ${calendario2.value}`

    divNovaData.style.visibility = "visible"

    escolheNovaData()
}

const escolheNovaData = () => {
    const btnNovaData = document.querySelector("button")

    btnNovaData.addEventListener("click", () => {
        document.location.reload(true)
    })
}