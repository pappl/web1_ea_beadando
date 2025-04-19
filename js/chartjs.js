const table = document.getElementById('data-table');
    const ctx = document.getElementById('lineChart').getContext('2d');
    let chart = null;

    table.addEventListener('click', function(e) {
      const cell = e.target;
      if (cell.tagName === 'TD') {
        const row = cell.parentElement;
        const values = Array.from(row.children).map(td => Number(td.textContent));

        if (chart) {
          chart.destroy();
        }

        chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: values.map((_, i) => `Pont ${i + 1}`),
            datasets: [{
              label: 'Kiválasztott sor adatai',
              data: values,
              borderColor: 'rgba(47, 99, 63, 1)',
              backgroundColor: 'rgba(47, 99, 63, 0.2)',
              fill: true,
              tension: 0.2
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true }
            }
          }
        });
      }
    });