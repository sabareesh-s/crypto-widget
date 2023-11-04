(function () {
    const styleElement = document.createElement("style");

    let isDarkMode = "auto"
  
    const script = document.currentScript;
    if (script) {
        const colorSchemeAttr = script.getAttribute("color-scheme");
        if (colorSchemeAttr === 'dark') {
            isDarkMode = true;
        } else if (colorSchemeAttr === 'light') {
            isDarkMode = false;
        } else if(isDarkMode === 'auto') {
            isDarkMode === window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    }

    styleElement.innerHTML = `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap');
          .coingecko-token-widget {
            font-family: 'Inter', sans-serif;
            background-color: ${isDarkMode ? '#1A1E22' : '#FFFFFF'};
            border-radius: 0.7rem; 
            color: ${isDarkMode ? '#FFFFFF' : '#1F2937'};
          }
          .widget-container {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 10px 12px;
            border-style: solid;
            border-radius: 0.7rem; 
            border-width: 0.07rem; 
            border-color: ${isDarkMode ? '#4B5563' : '#D1D5DB'};
            box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          }
          .widget-title {
            display: flex;
            justify-content: space-between;
            gap: 0.5rem;
            padding-bottom: 1rem;
            align-items: center;
            border-bottom: 1px solid ${isDarkMode ? '#4B5563' : '#D1D5DB'};
          }
          .title-section {
            display: flex;
            gap: 0.5rem;
            align-items: center;
          }
          .coin-name {
            display: inline-flex;
            flex-direction: column;
          }
          .coin-name h1 {
            margin: 0;
            font-size: 1.4rem;
            font-weight: 500;
            color: ${isDarkMode ? '#FFFFFF' : '#1F2937'};
          }
          .coin-name h1 span {
            font-weight: 500;
          }
          .coin-name span {
            margin: 0;
            font-size: 0.875rem;
            color: ${isDarkMode ? '#A0AEC0' : '#6B7280'};
          }
          .widget-title img {
            height: 3rem;
          }
          .widget-info {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 0.3125rem 0;
            justify-content: space-between;
          }
          .widget-info p {
            margin: 0.1525rem 0;
            font-size: 0.875rem;
            font-weight: 500;
            color: ${isDarkMode ? '#FFFFFF' : '#1F2937'};
          }
          .widget-info span {
            margin: 0.1525rem 0;
            font-size: 0.875rem;
            color: ${isDarkMode ? '#A0AEC0' : '#6B7280'};
          }
          .widget-price {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 0.3125rem 0;
            justify-content: space-between;
          }
          .widget-price p {
            margin: 0.1525rem 0;
            font-size: 0.875rem;
            font-weight: 500;
            color: ${isDarkMode ? '#FFFFFF' : '#1F2937'};
          }
          .widget-price span {
            margin: 0.1525rem 0;
            font-size: 0.875rem;
            color: ${isDarkMode ? '#A0AEC0' : '#6B7280'};
          }
          .data {
            display: flex;
            width: 100%;
            align-items: center;
            flex-direction: column;
            border-right: 1px solid ${isDarkMode ? '#4B5563' : '#D1D5DB'};
          }
          .data:last-child {
            border-right: none;
          }
          .price-change {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
          }
          .icon-link {
            height: 0.8rem;
            color: ${isDarkMode ? '#FFFFFF' : '#1F2937'};
            transition: color 0.3s;
          }
          .icon-link:hover {
            color: "blue";
          }
          .icon-button {
            background: none;
            border: none;
            cursor: pointer;
          }
          .icon-arrow {
            height: 1.7rem;
            margin-right: 0.8rem;
          }
        `;

    document.head.appendChild(styleElement);

    function formatNumberWithLabel(number) {
        if (number >= 10000000) {
          const inCrores = (number / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 });
          return `${inCrores} Cr`;
        } else if (number >= 100000) {
          const inLakhs = (number / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 });
          return `${inLakhs} L`;
        } else {
          return `${number}`;
        }
      }

    function createCoinGeckoWidget(tokenName, theme) {
      const apiUrl = `https://api.coingecko.com/api/v3/coins/${tokenName}`;

      const widgetContainer = document.createElement("div");
      widgetContainer.className = "coingecko-token-widget";
      document.body.appendChild(widgetContainer);

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          const name = data.name;
          const symbol = data.symbol;
          const marketCap = formatNumberWithLabel(data.market_data.market_cap.inr);
          const currentPrice = data.market_data.current_price.inr.toLocaleString('en-IN');
          const tradingVolume = formatNumberWithLabel(data.market_data.total_volume.inr);
          const high24h = formatNumberWithLabel(data.market_data.high_24h.inr);
          const coinImg = data.image.small;
          const link = data.links.homepage[0];
          const priceChange = data.market_data.price_change_percentage_1h_in_currency.inr;

          widgetContainer.innerHTML = `
                <div class="widget-container">
                  <div class="widget-title">
                    <div class="title-section">
                        <img src=${coinImg} alt="coin icon"/>
                        <div class="coin-name">
                            <h1>${name}<span> (${symbol.toUpperCase()})</span>
                            <a class="icon-button" href=${link}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  class="icon-link">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                </svg>
                            </a>
                            </h1>
                            <span>₹${currentPrice}</span>
                        </div>
                    </div>

                    <div class="widget-price">
                        <svg style="moz-transform:  ${priceChange < 0 ? 'scaleY(-1)' : ''};
                                    -o-transform: ${priceChange < 0 ? 'scaleY(-1)' : ''};
                                    -webkit-transform: ${priceChange < 0 ? 'scaleY(-1)' : ''};
                                    transform: ${priceChange < 0 ? 'scaleY(-1)' : ''};
                                    " 

                        class="icon-arrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="${priceChange < 0 ? '#ef4444' : '#65a30d'}">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                        </svg>
                  

                        <div class="price-change">
                            <p>PRICE</p>
                            <span style="color: ${priceChange < 0 ? '#ef4444' : '#65a30d'}">₹${priceChange}</span>
                        </div>
                    </div>

                    
                  </div>
                  <div class="widget-info">
                    <div class="data">
                        <p>MARKET CAP</p>
                        <span>₹${marketCap}</span>
                    </div>
                    <div class="data">
                        <p>24H</p>
                        <span>₹${high24h}</span>
                    </div>
                    <div class="data">
                        <p>VOL</p>
                        <span>₹${tradingVolume}</span>
                    </div>
                  </div>
                </div>
              `;
        })
        .catch((error) => {
          console.error("Error fetching data from CoinGecko API:", error);
          widgetContainer.innerHTML = "Token data not available.";
        });
    }

    const tokenName = script.getAttribute("data-token");
    const theme = script.getAttribute("color-scheme");

    if (tokenName) {
      createCoinGeckoWidget(tokenName, theme);
    } else {
      console.error("Token name not provided in the script tag.");
    }
  })();
