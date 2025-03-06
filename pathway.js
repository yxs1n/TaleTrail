class Pathway {
    constructor(bookLogs) {
        this.bookLogs = bookLogs;
        this.processedData = this.processData();
    }

    // Process book logs to get cumulative data for plotting
    processData() {
        let cumulativePages = 0;
        let cumulativeTime = 0;
        let labels = [];
        let pagesReadData = [];
        let timeSpentData = [];

        this.bookLogs.forEach(log => {
            cumulativePages += log.pagesRead;
            cumulativeTime += log.totalPagesRead; // Assuming totalPagesRead tracks time spent

            labels.push(log.dateAdded.toISOString().split('T')[0]); // Format date as YYYY-MM-DD
            pagesReadData.push(cumulativePages);
            timeSpentData.push(cumulativeTime);
        });

        return { labels, pagesReadData, timeSpentData };
    }

    // Render charts using Chart.js
    renderCharts() {
        const { labels, pagesReadData, timeSpentData } = this.processedData;

        const pagesReadCtx = document.getElementById('pagesReadChart').getContext('2d');
        new Chart(pagesReadCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Pages Read',
                    data: pagesReadData,
                    borderColor: 'rgba(39, 164, 217, 1)',
                    backgroundColor: 'rgba(39, 164, 217, 0.2)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Pages Read'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                }
            }
        });

        const timeSpentCtx = document.getElementById('timeSpentChart').getContext('2d');
        new Chart(timeSpentCtx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Time Spent (minutes)',
                    data: timeSpentData,
                    borderColor: 'rgba(198, 0, 0, 1)',
                    backgroundColor: 'rgba(198, 0, 0, 0.2)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Time Spent (minutes)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                }
            }
        });
    }
}

// Example Usage
document.addEventListener('DOMContentLoaded', () => {
    // Sample bookLogs array (Replace with actual data)
    const bookLogs = [
        new BookLog(1, "Book A", 30, 30, new Date("2024-02-25")),
        new BookLog(2, "Book B", 25, 55, new Date("2024-02-26")),
        new BookLog(3, "Book C", 40, 95, new Date("2024-02-27")),
        new BookLog(4, "Book D", 15, 110, new Date("2024-02-28")),
        new BookLog(5, "Book E", 35, 145, new Date("2024-02-29")),
        new BookLog(6, "Book F", 20, 165, new Date("2024-03-01")),
    ];

    const pathway = new Pathway(bookLogs);
    pathway.renderCharts();
});
