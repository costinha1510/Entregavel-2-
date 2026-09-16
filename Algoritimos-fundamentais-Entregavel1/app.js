const parseValues = (text) => {
  const values = text.trim().split(/[\s,;]+/).filter(Boolean).map(Number);
  if (!values.length || values.some(value => !Number.isFinite(value))) throw new Error('Use apenas números válidos na lista.');
  return values;
};

function quicksort(values, start = 0, end = values.length - 1) {
  if (start < end) {
    const pivot = values[end]; let i = start - 1;
    for (let j = start; j < end; j += 1) if (values[j] <= pivot) [values[++i], values[j]] = [values[j], values[i]];
    [values[i + 1], values[end]] = [values[end], values[i + 1]];
    const position = i + 1;
    quicksort(values, start, position - 1); quicksort(values, position + 1, end);
  }
  return values;
}

const actions = {
  fibonacci: ({ n }) => { n = Number(n); if (!Number.isInteger(n) || n < 0) throw new Error('Informe uma quantidade inteira igual ou maior que zero.'); let a = 0, b = 1; const terms = []; for (let i = 0; i < n; i += 1) { terms.push(a); [a, b] = [b, a + b]; } return `Sequência (${n} termos):\n${terms.join('  ') || '—'}`; },
  mdc: ({ a, b }) => { a = Number(a); b = Number(b); if (!Number.isInteger(a) || !Number.isInteger(b)) throw new Error('Digite apenas números inteiros.'); a = Math.abs(a); b = Math.abs(b); while (b !== 0) [a, b] = [b, a % b]; return `O MDC é: ${a}`; },
  primo: ({ n }) => { n = Number(n); if (!Number.isInteger(n)) throw new Error('Digite um número inteiro.'); if (n < 2) return `${n} não é primo.`; for (let i = 2; i < n; i += 1) if (n % i === 0) return `${n} não é primo.`; return `${n} é primo!`; },
  ordenacao: ({ values }) => `Array ordenado:\n${quicksort(parseValues(values)).join('  ')}`,
  somatorio: ({ values }) => `Somatório: ${parseValues(values).reduce((total, value) => total + value, 0)}`,
  contagem: ({ n, values }) => { n = Number(n); if (!Number.isInteger(n) || n < 1) throw new Error('N deve ser um inteiro maior que zero.'); const amount = parseValues(values).filter(value => value >= 1 && value <= n).length; return `Quantidade de valores entre 1 e ${n}: ${amount}`; }
};

document.querySelectorAll('form[data-algorithm]').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault(); const output = form.parentElement.querySelector('output');
  try { output.textContent = actions[form.dataset.algorithm](Object.fromEntries(new FormData(form))); output.className = 'result'; }
  catch (error) { output.textContent = error.message; output.className = 'error'; }
}));
