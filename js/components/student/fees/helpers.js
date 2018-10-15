

export function numberWithCommas(x) {
  return Math.abs(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getNumberStyle(amount) {
  return {
    color: amount < 0  ? '#a94442' : '#009e0f',
  }
}
export function getSummaryStyle(amount) {
  return {
    backgroundColor: amount < 0 ? '#f2dede' : amount > 0 ? '#dff0d8' : '#eee',
  }
}
export function getSummaryNumberStyle(amount) {
  return {
    color: amount < 0  ? '#a94442' : amount > 0 ? '#009e0f' : '#555',
  }
}
export function getBalanceText(balance) {
  return balance < 0 ? 'Due' : balance > 0 ? 'Credit' : '';
}

export function zeroPad (x,y) {
  y = Math.max(y-1,0);
  var n = (x / Math.pow(10,y)).toFixed(y);
  return n.replace('.','');
}
