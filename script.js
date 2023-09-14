document.getElementById("dataForm").onsubmit = function (event) {
  // Prevents the forms being sent automatically
  event.preventDefault();

  // Get the current date and time
  const dataAtual = new Date();

  // Format the date as "YYYY-MM-DDTHH:MM"
  const dataFormatada = `${dataAtual.getDate().toString().padStart(2, '0')}/${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}/${dataAtual.getFullYear().toString().padStart(4, '0')}`;

  // Formatted date to variable "day"
  const day = document.getElementById("day").value = dataFormatada;

  // Get the current hours and minutes
  const horaAtual = dataAtual.getHours();
  const minutosAtuais = dataAtual.getMinutes();

  /// Creates a string in HH:MM format for the current time and minutes
  const horaMinutosFormatados = `${horaAtual.toString().padStart(2, '0')}:${minutosAtuais.toString().padStart(2, '0')}`;

  // Assign the string of the time and minutes to the "day" field for autofill
  const hora = document.getElementById("hora").value = horaMinutosFormatados;

  // Get the values of the other form fields
  const protocol = document.getElementById("protocol").value || "-";
  const cliente = document.getElementById("cliente").value || "-";
  const descricao = document.getElementById("descricao").value;
  const ikatecker = document.getElementById("ikatecker").value || "-";

  // Captures the Element and select the Department input field
  const userSelect = document.getElementById('user').value;
  let deptoInput = document.getElementById('depto').value;

  // Sets the depto variable based on the selected option
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

  // console log to show request
  console.log(userSelect, deptoInput)

  // Creates an object with the collected data
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

  // Sends data to the server
  fetch("https://api.sheetmonkey.io/form/pN3zc8DNARWpffx51ZVnC4", {
    method: "POST",
    // mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)

  })

    .then((result) => {
      console.log(data)
      alert("Dados enviados com sucesso!");
      // Clear the form fields
      document.getElementById("dataForm").reset();
    })
    .catch((error) => {
      alert("Erro ao enviar os dados: " + error);
    })
};