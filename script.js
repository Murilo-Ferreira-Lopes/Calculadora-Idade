function calcular(event) {
    // Previne o recarregar da página
    event.preventDefault()

    console.log("Foi executada a função calcular")

    // Passo 1
    let usuario = receberValores()

    // Passo 2
    let iddCalculado = calcularIdd(usuario.ano, usuario.mes, usuario.dia)

    // Passo 3
    let classificacaoIdd = classificarIdd(iddCalculado)

    console.log(classificacaoIdd)

    // Passo 4
    usuario = organizarDados(usuario, iddCalculado, classificacaoIdd)

    // Passo 5
    cadastrarUsuario(usuario)
    
    // Esse
    carregarUsuarios()

    // Ou
    // window.location.reload()

}

function receberValores() {
    let nomeRecebido = document.getElementById("nome").value
    let anoRecebido = document.getElementById("ano").value
    let mesRecebido = document.getElementById("mes").value
    let diaRecebido = document.getElementById("dia").value

    let dadosUsuario = {
        nome: nomeRecebido,
        ano: anoRecebido,
        mes: mesRecebido,
        dia: diaRecebido
    }

    console.log(dadosUsuario)

    return dadosUsuario
}

function calcularIdd(ano, mes, dia) {
    //pegar somente o ano atual
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const diaAtual = dataAtual.getDay();
    const mesAtual = dataAtual.getMonth();
    
    let idd = (anoAtual - ano);

    if(mesAtual < mes && diaAtual <= dia){
        idd--;
    }

    console.log(idd);

    return idd;
}

function classificarIdd(idd) {
    /* 
       Resultado            Faixa

    0 à 12                 Criança
    13 à 17                Adolescente
    18 à 65                Adulto
    Acima de 65            Idoso    
    */

    if (idd >= 0 && idd <= 12) {
        return "Criança"
    } else if (idd >= 13 && idd <= 17) {
        return "Adolecente"
    } else if (idd >= 18 && idd <= 65) {
        return "Adulto"
    } else {
        return "Idoso"
    }
}

function organizarDados(dadosUsuario, valorIdd, classificacaoIdd) {
    // Pegar a dataHoraAtual(não utilizado na exibição da tabela)
    let dataHoraAtual = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'long', dateStyle: 'short' }).format(Date.now())

    console.log(dataHoraAtual);

    // Organizando o objeto para salvar
    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        idd: valorIdd,
        situacaoIdd: classificacaoIdd,
        dataCadastro: dataHoraAtual
    }

    return dadosUsuarioAtualizado;
}

function cadastrarUsuario(dadosUsuario) {
    let listaUsuarios = []

    // Se houver uma lista de usuarios no localStorage, carregar isso para a variavel listaUsuarios
    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaUsuarios = JSON.parse( localStorage.getItem("usuariosCadastrados") )
    }

    // Adiciona o usuario na lista de usuarios
    listaUsuarios.push(dadosUsuario)

    // Salva a listaUsuarios no localStorage
    localStorage.setItem("usuariosCadastrados",  JSON.stringify(listaUsuarios) )

}

function carregarUsuarios() {
    let listaCarregada = []

    if ( localStorage.getItem("usuariosCadastrados") != null ) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if(listaCarregada.length == 0) {
        // Se não tiver nenhum usuario cadastrado, mostrar mensagem
        let tabela = document.getElementById("corpo-tabela")

        tabela.innerHTML = `<tr class="linha-mensagem">
            <td colspan="6">Nenhum usuario cadastrado 😭 </td>
        </tr>`

    } else {
        // Montar conteudo da tabela
        montarTabela(listaCarregada)
    }

    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios() )

// Passo 7
function montarTabela(listaUsuarios) {
    let tabela = document.getElementById("corpo-tabela")

    let template = ""

    listaUsuarios.forEach(usuario => {
        template += `<tr>
            <td data-cell="Nome">${usuario.nome}</td>
            <td data-cell="Data de Nascimento">${usuario.dia}/${usuario.mes}/${usuario.ano}</td>
            <td data-cell="Valor da Idade">${usuario.idd.toFixed(0)}</td>
            <td data-cell="classificação da Idade">${usuario.situacaoIdd}</td>
        </tr>`
    })

    tabela.innerHTML = template;
}

function deletarRegistros() {
    // Remove o item do localStorage
    localStorage.removeItem("usuariosCadastrados")

    // Recarrega a página
    window.location.reload()
}