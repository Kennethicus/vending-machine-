export function getChange(bill, owed) {
  if (bill === 0 && owed === 0) {
      return { error: 'No transaction occurred.' };
  }

  if (owed > bill) {
      return { error: 'Owed amount cannot be greater than the bill.' };
  }

  if (bill === owed) {
      return [];
  }

  const denominations = [
      { value: 1000, type: 'bill' },
      { value: 500, type: 'bill' },
      { value: 200, type: 'bill' },
      { value: 100, type: 'bill' },
      { value: 50, type: 'bill' },
      { value: 20, type: 'bill' },
      { value: 10, type: 'coin' },
      { value: 5, type: 'coin' },
      { value: 1, type: 'coin' },
  ];

  let change = bill - owed;
  const result = [];

  for (let denomination of denominations) {
      const count = Math.floor(change / denomination.value);
      if (count > 0) {
          result.push({ 
              denomination: denomination.value, 
              count, 
              type: denomination.type 
          });
          change -= denomination.value * count;
      }
  }

  return result;
}
