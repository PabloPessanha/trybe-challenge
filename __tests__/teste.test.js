function soma(a, b) {
  return a + b;
}

describe('testa se a função soma funciona', () => {
  it('verifica se 1 + 1 da 2', () => {
    const somaCerta = soma(1, 1);
    const somaErrada = soma(1, 2);
    const somaStrings = soma(1, '2');

    expect(somaErrada).not.toBe(2);
    expect(somaStrings).not.toBe(2);
    expect(somaCerta).toBe(2);
  });
});
