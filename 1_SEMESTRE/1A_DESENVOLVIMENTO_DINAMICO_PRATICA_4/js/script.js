//Classe Funcionário
class Funcionario {
    constructor(nome, idade, cargo){
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
    }

    seApresentar() {
        return(`Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e sou ${this.cargo}.`)
    }
    
    trabalhar() {
        return(`Trabalhando no cargo de ${this.cargo}...`)
    }
}

//Classe Gerente
class Gerente extends Funcionario{
    constructor(nome, idade, cargo, departamento) {
        super(nome, idade, cargo);
        this.departamento = departamento;
    }

    gerenciar() {
        return(`Gerenciando departamento ${this.departamento}...`)
    }
}

//Classe Desenvolvedor
class Desenvolvedor extends Funcionario {
    constructor(nome, idade, cargo, linguagem){
        super(nome, idade, cargo);
        this.linguagem = linguagem;
    }

    programar() {
        return(`Programando em ${this.linguagem}...`);
    }
}

const gerente = new Gerente("João da Silva e Souza", "46", "Gerente de Projeto", "Desenvolvimento");
const desenvolvedor = new Desenvolvedor("Antonio Carlos de Oliveira", "41", "Desenvolvedor Sênior", "JavaScript");


//Alterar Label Select Funcionário
function alterarLabelSelectFuncionario(){
    let cargo = document.getElementById("cargo").value;
    let devLabel = "Linguagem";
    let gerenteLabel = "Setor";
    
    const label = document.getElementById("labelSelectFuncionario");
    label.innerText = (cargo === 'desenvolvedor' ? devLabel : gerenteLabel);
    alterarOpcoesSelectFuncionario(cargo);
}

//Alterar Opções Select Funcionário
function alterarOpcoesSelectFuncionario(cargo){
    let elemento = document.getElementById("opcoesSelectFuncionario");
    elemento.innerHTML = '';
    
    const cargoOptions = new Map();
    cargoOptions.set('desenvolvedor', ['Java', 'JavaScript', 'PHP', 'Python', 'C', 'C++', 'C#', 'outra']);
    cargoOptions.set('gerente', ['Comercial', 'Compras', 'Marketing', 'Projetos', 'outro']);
    
    const options = cargoOptions.get(cargo);
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        elemento.appendChild(opt);
    })
}

// Adicionar Funcionário
function adicionarFuncionario(e){
    e.preventDefault();

    try {
        let nome = document.getElementById("nome").value;
        let idade = document.getElementById("idade").value;
        let cargo = document.getElementById("cargo").value;
        let departamentoOuLinguagem = document.getElementById("opcoesSelectFuncionario").value;
        
        if ( !(nome && idade && cargo && departamentoOuLinguagem) ) {
            throw Error('Todos os campos são obrigatórios.')
        }

        idade = Number.parseInt(idade);
        if(Number.isNaN(idade)){
            throw new Error('Idade inválida. Utilize apenas números.')
        }

        const elemento = document.getElementById("erroFormulario");
        elemento.innerText = "";
        
        atualizarArrayFuncionarios(nome, idade, cargo, departamentoOuLinguagem);
        adicionarFuncionarioNaTabela(funcionarios);

    } catch(erro) {
        const elemento = document.getElementById("erroFormulario");
        elemento.innerText = erro.message;
    }
}

// Atualizar Array de Funcionários
const funcionarios = new Array();
function atualizarArrayFuncionarios(nome, idade, cargo, departamentoOuLinguagem){
    if(cargo === 'desenvolvedor'){
        const funcionario = new Desenvolvedor(nome, idade, cargo, departamentoOuLinguagem);
        funcionarios.push(funcionario);
    } else {
        const gerente = new Gerente(nome, idade, cargo, departamentoOuLinguagem);
        funcionarios.push(gerente);
    }
}

// Adicionar Funcionário na tabela
function adicionarFuncionarioNaTabela(funcionarios) {
    const tabela = document.getElementById("corpoTabelaFuncionarios");
    tabela.innerHTML = '';

    funcionarios.forEach((fun, index) => {
        const tRow = tabela.appendChild(document.createElement("tr"));

        const tdIndex = document.createElement("td");
        tdIndex.textContent = (index+1);

        const tdNome = document.createElement("td");
        tdNome.textContent = fun.nome;

        const tdFuncao = document.createElement("td");
        tdFuncao.textContent = fun.cargo;

        const tdAcoes = document.createElement("td");
        tdAcoes.innerHTML = 
        `
            <button class="btn btn-success" value="apresentar" onclick="interagirFuncionario(value, ${index})">Apresentar</button>
            <button class="btn btn-warning" value="trabalhar" onclick="interagirFuncionario(value, ${index})">Trabalhar</button>

            ${fun.cargo === 'desenvolvedor'
                ? 
                `<button class="btn btn-danger" value="programar" onclick="interagirFuncionario(value, ${index})">Programar</button>`
                :
                `<button class="btn btn-danger" value="gerenciar" onclick="interagirFuncionario(value, ${index})">Gerenciar</button>`
            }
        `
        const tdRemover = document.createElement("td");
        tdRemover.innerHTML = 
        `
            <button class="btn btn-dark" onclick="removerFuncionario(${index})">Remover</button>
        `
        
        tRow.appendChild(tdIndex);
        tRow.appendChild(tdNome);
        tRow.appendChild(tdFuncao);
        tRow.appendChild(tdAcoes);
        tRow.appendChild(tdRemover);
    })
}

// Interagir com Painel
function interagirFuncionario(acao, index){
    const funcionario = funcionarios[index]

    const elementoImg = document.getElementById("imgInteracao");
    const imagem = `${funcionario.cargo}-${acao}.svg`
    elementoImg.innerHTML = `<img width="400em" src="./img/${imagem}"></img>`

    const elementoP = document.getElementById("fraseInteracao");
    
    let apresentacao = "";
    switch(acao){
        case "apresentar":
            apresentacao = funcionario.seApresentar(); break;
        case "trabalhar":
            apresentacao = funcionario.trabalhar(); break;
        case "programar":
            apresentacao = funcionario.programar(); break;
        case "gerenciar":
            apresentacao = funcionario.gerenciar(); break;
    }

    elementoP.innerHTML = `<p>${apresentacao}</p>`
}

// Remover Funcionario
function removerFuncionario(index) {
    funcionarios.splice(index, 1);
    adicionarFuncionarioNaTabela(funcionarios)
}