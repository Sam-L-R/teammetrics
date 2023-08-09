document.getElementById("dataForm").onsubmit = function (event) {
  event.preventDefault(); // Evita que o formulário seja enviado automaticamente

  // Obtém a data e hora atuais do sistema
  const dataAtual = new Date();

  // Formata a data para o formato esperado pelo input datetime-local (AAAA-MM-DDTHH:MM)
  const dataFormatada = `${dataAtual.getDate().toString().padStart(2, '0')}/${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}/${dataAtual.getFullYear().toString().padStart(4, '0')}`;

  // Atribui a data formatada ao campo "day"
  const day = document.getElementById("day").value = dataFormatada;

  // Obtém apenas a hora e os minutos da data atual
  const horaAtual = dataAtual.getHours();
  const minutosAtuais = dataAtual.getMinutes();

  // Cria uma string no formato HH:MM para a hora e os minutos atuais
  const horaMinutosFormatados = `${horaAtual.toString().padStart(2, '0')}:${minutosAtuais.toString().padStart(2, '0')}`;

  // Atribui a string da hora e minutos ao campo "day" para preenchimento automático
  const hora = document.getElementById("hora").value = horaMinutosFormatados;

  // Obtém os valores dos outros campos do formulário
  // const protocol = document.getElementById("protocol").value;
  // const cliente = document.getElementById("cliente").value;
  // const descricao = document.getElementById("descricao").value;
  // const ikatecker = document.getElementById("ikatecker").value;
  const protocol = document.getElementById("protocol").value || "-";
  const cliente = document.getElementById("cliente").value || "-";
  const descricao = document.getElementById("descricao").value;
  const ikatecker = document.getElementById("ikatecker").value || "-";

  // Captura o elemento select e o campo de entrada de departamento
  const userSelect = document.getElementById('user').value;
  let deptoInput = document.getElementById('depto').value;

  // Define a variável depto com base na opção selecionada
  switch (userSelect) {
    case 'Alexia':
      deptoInput = 'Hublx';
      break;
    case 'Alex':
    case 'Samuel':
      deptoInput = 'Integração/API';
      break;
    case 'Gisele':
    case 'Gabriela':
      deptoInput = 'Waba';
      break;
    case 'Renan':
      deptoInput = 'N3';
      break;
    default:
      deptoInput = 'Não selecionado';
      break;
  }
  // const userSelectValue = userSelect;
  // const deptoInputValue = deptoInput;
  console.log(userSelect, deptoInput)


  // Obtém o valor selecionado do seletor de usuário e do campo de entrada de departamento


  // const userSelectValue = document.getElementById('user').value;
  // const deptoInputValue = document.getElementById('deptoInput').value;


  // Cria um objeto com os dados coletados
  const data = {
    USUARIO: userSelect,
    DEPTO: deptoInput,
    DATA: day,
    HORARIO: hora,
    PROTOCOLO: protocol,
    IKATECKER: ikatecker,
    CLIENTE: cliente,
    DESCRICAO: descricao
  };

  // Envia os dados para o servidor (substitua "seu_endpoint" pelo endpoint adequado)
  fetch("https://api.sheetmonkey.io/form/pN3zc8DNARWpffx51ZVnC4", {
    method: "POST",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
    //{ USUARIO: userSelect, DEPTO: deptoInput, DATA: day, HORARIO: hora, PROTOCOLO: protocol, IKATECKER: ikatecker, CLIENTE: cliente, DESCRICAO: descricao }
  })
    // .then((response) => response.json())
    .then((result) => {
      console.log(data)
      alert("Dados enviados com sucesso!");
      // Você pode fazer outras ações aqui, como limpar o formulário
      document.getElementById("dataForm").reset(); // Clear the form fields
    })
    .catch((error) => {
      alert("Erro ao enviar os dados: " + error);
    })
};