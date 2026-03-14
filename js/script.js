// Funções dos Botões
function converterDecimal() {
    let decimal = Number(ipt_decimal.value);

    decimal1.innerHTML = converterDecimalParaBinario(decimal);
    decimal2.innerHTML = converterDecimalParaOctal(decimal);
    decimal3.innerHTML = converterDecimalParaHexaDecimal(decimal)
}

function converterBinario() {
    let binario = ipt_binario.value;

    binario1.innerHTML = converterBinarioParaDecimal(binario);
    binario2.innerHTML = converterBinarioParaOctal(binario);
    binario3.innerHTML = converterBinarioParaHexaDecimal(binario);
}

function converterOctal() {
    let octal = ipt_octal.value;

    octal1.innerHTML = converterOctalParaDecimal(octal);
    octal2.innerHTML = converterOctalParaBinario(octal);
    octal3.innerHTML = converterOctalParaHexaDecimal(octal);
}

function converterHexaDecimal() {
    let hex = ipt_hex.value;

    hex1.innerHTML = converterHexaDecimalParaDecimal(hex);
    hex2.innerHTML = converterHexaDecimalParaBinario(hex);
    hex3.innerHTML = converterHexaDecimalParaOctal(hex);
}

// Converter Binários
function converterBinarioParaDecimal(binario) {
    binario = inverterLista(binario);

    let decimal = 0;
    binario.forEach((bit, index) => {
        if (bit == '1') {
            decimal += 2 ** index;
        }
    });

    return decimal;
};

function converterBinarioParaOctal(binario) {

    let digitosDecimal = separarBinarioEmConjuntoDeBits(binario, 3);

    let octal = "";
    digitosDecimal.forEach(digito => {
        octal += digito;
    })

    return octal;
}

function converterBinarioParaHexaDecimal(binario) {
    const letrasHex = ['A', 'B', 'C', 'D', 'E', 'F'];

    let digitosDecimal = separarBinarioEmConjuntoDeBits(binario, 4);

    let hex = ""
    digitosDecimal.forEach(digito => {
        if (digito >= 10) {
            hex += letrasHex[digito - 10];
        } else {
            hex += digito;
        }
    })

    return hex;
}


//Converter Decimais
function converterDecimalParaBinario(decimal) {
    let numero = 0;
    let listaExpoentes = [];

    let i = 0;
    while (numero <= decimal) {
        numero = 2 ** i;

        if (numero > decimal) break;

        listaExpoentes.push(numero);
        i++;
    }

    listaExpoentes = inverterLista(listaExpoentes);

    let binario = "";
    let soma = 0;
    listaExpoentes.forEach(numero => {
        if (soma != decimal) {
            soma += numero;

            if (soma > decimal) {
                binario += "0";
                soma -= numero;
                return;
            }

            binario += "1";
        } else {
            binario += "0";
        }
    });

    return binario;
};

function converterDecimalParaOctal(decimal) {
    return converterBinarioParaOctal(converterDecimalParaBinario(decimal));
}

function converterDecimalParaHexaDecimal(decimal) {
    return converterBinarioParaHexaDecimal(converterDecimalParaBinario(decimal));
}


//Converter Octais
function converterOctalParaDecimal(octal) {
    let decimal = 0;

    octal = inverterLista(octal)

    for (i = 0; i < octal.length; i++) {
        decimal += octal[i] * 8 ** i;
    }

    return decimal;
}

function converterOctalParaBinario(octal) {
    return converterDecimalParaBinario(converterOctalParaDecimal(octal));
}

function converterOctalParaHexaDecimal(octal) {
    return converterBinarioParaHexaDecimal(converterOctalParaBinario(octal));
}

//Converter HexaDecimais
function converterHexaDecimalParaDecimal(hex) {
    const valoresHex = [
        ['A', 'B', 'C', 'D', 'E', 'F'],
        ['10', '11', '12', '13', '14', '15']
    ];

    let decimal = 0;

    hex = inverterLista(hex);

    for (i = 0; i < hex.length; i++) {
        if (valoresHex[0].includes(hex[i])) {
            decimal += valoresHex[1][valoresHex[0].indexOf(hex[i])] * 16 ** i;
        } else {
            decimal += hex[i] * 16 ** i;
        }
    }

    return decimal;
}

function converterHexaDecimalParaBinario(hex) {
    return converterDecimalParaBinario(converterHexaDecimalParaDecimal(hex));
}

function converterHexaDecimalParaOctal(hex) {
    return converterBinarioParaOctal(converterHexaDecimalParaBinario(hex));
}

// Funções Auxiliares
function inverterLista(lista) {
    let inverte_lista = [];

    for (let i = lista.length - 1; i >= 0; i--) {
        inverte_lista.push(lista[i]);
    }

    return inverte_lista;
}

function separarBinarioEmConjuntoDeBits(binario, qtdBits) {
    let listaBits = [];
    let digitos = [];

    for (i = binario.length - 1; i >= 0; i--) {
        listaBits.push(binario[i]);

        while (i == 0 && listaBits.length != qtdBits) {
            listaBits.push("0");
        }

        if (listaBits.length == qtdBits) {
            let tempBinario = "";

            listaBits = inverterLista(listaBits);

            listaBits.forEach(bit => {
                tempBinario += bit;
            })

            digitos.push(converterBinarioParaDecimal(tempBinario));

            listaBits = [];
        }
    }

    return inverterLista(digitos);
}
