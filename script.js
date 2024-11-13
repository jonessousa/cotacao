document.getElementById('convert').addEventListener('click', async () => {
    const amount = parseFloat(document.getElementById('amount').value);
    const currency = document.querySelector('input[name="currency"]:checked').value;  // Obtém o valor do botão de rádio selecionado
    const resultElement = document.getElementById('result');

    if (isNaN(amount) || amount <= 0) {
        resultElement.textContent = "Por favor, insira um valor válido.";
        return;
    }

    // URL para pegar a taxa de câmbio USD-BRL
    const url = 'https://economia.awesomeapi.com.br/last/USD-BRL';

    try {
        const response = await fetch(url);
        const data = await response.json();

        //Aqui estamos pegando a taxa de USD para BRL.
        const rateUSDToBRL = parseFloat(data.USDBRL.ask); // 'ask' é o valor de compra do dólar.

        if (currency === 'USD') {
            // Convertendo de USD para BRL
            const convertedValue = (amount * rateUSDToBRL).toFixed(2);
            resultElement.textContent = `${amount} Dólares equivalem a ${convertedValue} Reais.`;
        } else if (currency === 'BRL') {
            // Convertendo de BRL para USD
            const convertedValue = (amount / rateUSDToBRL).toFixed(2);
            resultElement.textContent = `${amount} Reais equivalem a ${convertedValue} Dólares.`;
        }
    } catch (error) {
        resultElement.textContent = "Erro ao obter a cotação. Tente novamente.";
    }
});
