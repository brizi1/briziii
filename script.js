// Keep for future use (no UI changes needed now)
function changeMarket() {
  // placeholder
}

// Main calculation
function calculate() {
  const entry = parseFloat(document.getElementById('entry').value);
  const takeProfit = parseFloat(document.getElementById('takeProfit').value);
  const stopLoss = parseFloat(document.getElementById('stopLoss').value);
  const size = parseFloat(document.getElementById('size').value);
  const market = document.getElementById('market').value;
  const direction = document.getElementById('direction').value;
  const resultDiv = document.getElementById('result');

  // Validation
  if (!entry || !takeProfit || !stopLoss || !size) {
    resultDiv.innerHTML = `
      <div class="result-card">
        <div class="result-header"><h2>Trading Results</h2></div>
        <div class="result-body"><p style="color:#fca5a5;">Please fill in all fields before calculating.</p></div>
      </div>`;
    return;
  }

  // Point value by market
  let pointValue = 1;
  switch (market) {
    case 'es-mini': pointValue = 50; break;
    case 'mes-micro': pointValue = 5; break;
    case 'qspx': pointValue = 250; break;
    case 'nq-mini': pointValue = 20; break;
    case 'mnq-micro': pointValue = 2; break;
    case 'qndx': pointValue = 100; break;
    default: pointValue = 1;
  }

  // Calculate TP/SL P&L
  let tpProfit = 0;
  let slLoss = 0;
  if (direction === 'long') {
    tpProfit = (takeProfit - entry) * pointValue * size;
    slLoss   = (entry - stopLoss)   * pointValue * size;
  } else {
    tpProfit = (entry - takeProfit) * pointValue * size;
    slLoss   = (stopLoss - entry)   * pointValue * size;
  }

  const riskReward = slLoss !== 0 ? Math.abs(tpProfit) / Math.abs(slLoss) : 0;
  const marketLabel = document.getElementById('market').selectedOptions[0].text;
  const directionLabel = direction === 'long' ? '📈 Bullish (Long)' : '📉 Bearish (Short)';

  resultDiv.innerHTML = `
    <div class="result-card">
      <div class="result-header">
        <h2>Trading Results</h2>
        <span class="result-subtitle">${marketLabel}</span>
      </div>

      <div class="result-body">
        <div class="result-section">
          <div class="result-section-title">Trade Setup</div>
          <div class="result-grid">
            <div class="result-row"><div class="result-label">Direction</div><div class="result-value">${directionLabel}</div></div>
            <div class="result-row"><div class="result-label">Entry Price</div><div class="result-value">$${entry.toFixed(2)}</div></div>
            <div class="result-row"><div class="result-label">Take Profit</div><div class="result-value">$${takeProfit.toFixed(2)}</div></div>
            <div class="result-row"><div class="result-label">Stop Loss</div><div class="result-value">$${stopLoss.toFixed(2)}</div></div>
            <div class="result-row"><div class="result-label">Contracts</div><div class="result-value">${size}</div></div>
            <div class="result-row"><div class="result-label">Point Value</div><div class="result-value">$${pointValue.toFixed(2)}</div></div>
          </div>
        </div>

        <div class="result-section">
          <div class="result-section-title">P&amp;L Summary</div>
          <div class="result-summary-grid">
            <div class="summary-box summary-profit"><span class="summary-label">Max Profit</span><span class="summary-value">+$${Math.abs(tpProfit).toFixed(2)}</span></div>
            <div class="summary-box summary-loss"><span class="summary-label">Max Loss</span><span class="summary-value">-$${Math.abs(slLoss).toFixed(2)}</span></div>
            <div class="summary-box summary-rr"><span class="summary-label">Risk / Reward</span><span class="summary-value">1 : ${riskReward.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Auto-recalculate when switching direction if fields are filled
document.addEventListener('DOMContentLoaded', () => {
  const directionSelect = document.getElementById('direction');
  if (directionSelect) {
    directionSelect.addEventListener('change', () => {
      const entry = document.getElementById('entry').value;
      const takeProfit = document.getElementById('takeProfit').value;
      const stopLoss = document.getElementById('stopLoss').value;
      const size = document.getElementById('size').value;
      if (entry && takeProfit && stopLoss && size) calculate();
    });
  }
});
