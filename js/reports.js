const reportList = document.getElementById('report-list');
const sales = JSON.parse(localStorage.getItem('sales')) || [];

sales.forEach(sale => {
    reportList.innerHTML += `<tr>
        <td>${sale.date}</td>
        <td>${sale.items.map(i => i.name + ' x' + i.qty).join(', ')}</td>
        <td>${sale.total.toFixed(2)}</td>
    </tr>`;
});