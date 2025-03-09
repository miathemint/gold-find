import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
const App = () => {
  // Define clickable areas for coins in interesting spots
  const coinAreas = [
    { x: 150, y: 600, radius: 30 },  // Behind flowers in foreground
    { x: 450, y: 350, radius: 30 },  // Near rainbow
    { x: 750, y: 500, radius: 30 },  // Behind bunny
    { x: 250, y: 450, radius: 30 },  // In flower patch
    { x: 650, y: 200, radius: 30 }   // On hilltop
  ];
  const [foundCoins, setFoundCoins] = useState(new Set());
  const [clickMarkers, setClickMarkers] = useState([]);
  const imageRef = useRef(null);
  const handleImageClick = (e) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Add click marker
    setClickMarkers(prev => [...prev, { x, y }]);
    // Check if click is within any coin area
    const foundCoin = coinAreas.findIndex(coin => 
      Math.sqrt(Math.pow(coin.x - x, 2) + Math.pow(coin.y - y, 2)) <= coin.radius
    );
    if (foundCoin !== -1 && !foundCoins.has(foundCoin)) {
      setFoundCoins(prev => new Set([...prev, foundCoin]));
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <h1>Find the Hidden Coins!</h1>
      <div style={{
        marginBottom: '20px'
      }}>
        Found: {foundCoins.size} / {coinAreas.length} coins
      </div>
      
      <div style={{ position: 'relative' }}>
        {/* Replace src with your actual image */}
        <img
          ref={imageRef}
          src="https://play.rosebud.ai/assets/A pixel background image. landscape of green hiils, lots of flowers, bunnies running around, and a rainbow in the sky.png?eTf9"
          style={{ 
            maxWidth: '800px', 
            cursor: 'pointer',
            border: '3px solid #333',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
          onClick={handleImageClick}
          alt="Pixel landscape with hidden coins to find"
        />
        
        {/* Click markers */}
        {clickMarkers.map((marker, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: marker.x - 10,
              top: marker.y - 10,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '2px solid red',
              pointerEvents: 'none'
            }}
          />
        ))}
        {/* Show found coins */}
        {Array.from(foundCoins).map(coinIndex => {
          const coin = coinAreas[coinIndex];
          return (
            <img
              key={`coin-${coinIndex}`}
              src="https://play.rosebud.ai/assets/Pixel gold coin.png?brsw"
              style={{
                position: 'absolute',
                left: coin.x - 20,
                top: coin.y - 20,
                width: '40px',
                height: '40px',
                pointerEvents: 'none',
                animation: 'pulse 1s infinite',
                filter: 'drop-shadow(0 0 5px gold)'
              }}
              alt="Found coin"
            />
          );
        })}
      </div>
      
      {foundCoins.size === coinAreas.length && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <img 
            src="https://play.rosebud.ai/assets/Pixel game win screen with a black pot of gold, four leaf clovers, and a rainbow..png?RHIp"
            style={{
              maxWidth: '80%',
              maxHeight: '80vh',
              borderRadius: '12px',
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
            }}
            alt="Victory screen with pot of gold and rainbow"
          />
          <div style={{
            marginTop: '20px',
            color: 'gold',
            fontSize: '32px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontWeight: 'bold'
          }}>
            Congratulations! You found all the coins!
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              fontSize: '18px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Play Again
          </button>
        </div>
      )}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

const container = document.getElementById('renderDiv');
const root = ReactDOM.createRoot(container);
root.render(<App />);
