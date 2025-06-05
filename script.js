
let movimentacoes = JSON.parse(localStorage.getItem('movimentacoes')) || [];

function atualizarSaldo() {
  let saldo = movimentacoes.reduce((acc, mov) => {
    return acc + (mov.tipo === 'entrada' ? parseFloat(mov.valor) : -parseFloat(mov.valor));
  }, 0);
  document.getElementById('saldo').innerText = 'R$ ' + saldo.toFixed(2).replace('.', ',');
}

function renderizarMovimentacoes() {
  const lista = document.getElementById('lista-movimentacoes');
  lista.innerHTML = '';
  movimentacoes.slice().reverse().forEach(mov => {
    const li = document.createElement('li');
    li.textContent = `${mov.data} - ${mov.descricao}: R$ ${parseFloat(mov.valor).toFixed(2).replace('.', ',')} (${mov.tipo})`;
    lista.appendChild(li);
  });
}

function mostrarFormulario() {
  const form = document.getElementById('formulario');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function adicionarMovimentacao() {
  const data = document.getElementById('data').value;
  const descricao = document.getElementById('descricao').value;
  const valor = document.getElementById('valor').value;
  const tipo = document.getElementById('tipo').value;

  if (!data || !descricao || !valor || !tipo) {
    alert('Preencha todos os campos.');
    return;
  }

  movimentacoes.push({ data, descricao, valor, tipo });
  localStorage.setItem('movimentacoes', JSON.stringify(movimentacoes));

  atualizarSaldo();
  renderizarMovimentacoes();

  document.getElementById('formulario').reset();
  document.getElementById('formulario').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  atualizarSaldo();
  renderizarMovimentacoes();
});
