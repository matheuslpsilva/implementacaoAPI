const campoCep = document.getElementById("campoCep");
const botaoBuscar = document.getElementById("botaoBuscar");
const resultado = document.getElementById("resultado");

campoCep.addEventListener("input", () => {
  let digitos = campoCep.value.replace(/\D/g, "").slice(0, 8);

  if (digitos.length > 5) {
    digitos = digitos.slice(0, 5) + "-" + digitos.slice(5);
  }

  campoCep.value = digitos;
});

botaoBuscar.addEventListener("click", buscarCep);

campoCep.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    buscarCep();
  }
});

async function buscarCep() {
  const cep = campoCep.value.replace(/\D/g, "");

  if (cep.length !== 8) {
    mostrarAviso("O CEP precisa ter 8 números. Exemplo: 89201-000.");
    return;
  }

  resultado.innerHTML = '<p class="carregando">Buscando...</p>';
  botaoBuscar.disabled = true;

  try {
    const resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/");

    if (!resposta.ok) {
      mostrarAviso("O ViaCEP não respondeu como esperado. Tente de novo em instantes.");
      return;
    }

    const dados = await resposta.json();

    if (dados.erro) {
      mostrarAviso("Nenhum endereço encontrado para o CEP " + campoCep.value + ".");
      return;
    }

    mostrarEndereco(dados);

  } catch (erro) {
    console.error(erro);
    mostrarAviso("Não foi possível falar com a API. Verifique sua conexão com a internet.");

  } finally {
    botaoBuscar.disabled = false;
  }
}

function mostrarEndereco(dados) {
  const logradouro = dados.logradouro || "Logradouro não informado";
  const bairro = dados.bairro ? " — " + dados.bairro : "";

  resultado.innerHTML = `
    <article class="cartao">
      <p class="endereco">${logradouro}${bairro}</p>
      <p class="cidade">${dados.localidade} / ${dados.uf}</p>
      <dl>
        <dt>CEP</dt>         <dd>${dados.cep}</dd>
        <dt>Estado</dt>      <dd>${dados.estado || dados.uf}</dd>
        <dt>Região</dt>      <dd>${dados.regiao || "—"}</dd>
        <dt>DDD</dt>         <dd>${dados.ddd || "—"}</dd>
        <dt>Código IBGE</dt> <dd>${dados.ibge || "—"}</dd>
      </dl>
    </article>
  `;
}

function mostrarAviso(mensagem) {
  resultado.innerHTML = '<p class="aviso">' + mensagem + "</p>";
}
