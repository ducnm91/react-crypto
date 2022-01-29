export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCash(n) {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return numberWithCommas(+(n / 1e3).toFixed(1)) + "K";
    if (n >= 1e6 && n < 1e9) return numberWithCommas(+(n / 1e6).toFixed(1)) + "M";
    if (n >= 1e9 && n < 1e12) return numberWithCommas(+(n / 1e9).toFixed(1)) + "B";
    if (n >= 1e12) return numberWithCommas(+(n / 1e12).toFixed(1)) + "T";
  };

export function getZeroDecimal(number) {
    const n = Number(number).toString()
    let zeroDecimal = ''
    let decimalNumber = 0
    if (n.includes('.')) {
        const indexOfDot = n.indexOf('.')
        decimalNumber = n.length - indexOfDot - 1
    }
    for (let index = 0; index < decimalNumber; index++) {
        zeroDecimal += '0'
    }
    return zeroDecimal
}