import  { useState } from 'react';

interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

function App(): JSX.Element {

  const [callConfirmed, setCallConfirmed] = useState<boolean>(false);
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);
  const [locationData, setLocationData] = useState<{ latitude: number; longitude: number } | null>(null);

  const handleGrantLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          console.log('Location:', position.coords);
          setLocationData({ latitude: position.coords.latitude, longitude: position.coords.longitude });          
          setCallConfirmed(true);
        },
        (error: GeolocationPositionError) => {
          console.error('Error obtaining location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleConfirmCall = (): void => {
    if (checkboxChecked) {
      handleGrantLocation();
    } else {
      alert('Debe marcar la casilla antes de continuar.');
    }
  };

  const handleCancel = (): void => {
    alert('Process cancelled.');
  };

  const generateGoogleMapsUrl = (): string => {
    if (locationData) {
      return `https://www.google.com/maps?q=${locationData.latitude},${locationData.longitude}`;
    }
    return '#';
  };

  return (
    <div className="app-container">
      {!callConfirmed ? (
        <div className="welcome-screen">
          <h1 className="title">Bienvenido</h1>
          <p className="message">
            Para continuar con el proceso de autorización de crédito, se iniciará una video llamada. 
            Se solicita permiso para acceder a su ubicación física, la cual será tomada del dispositivo desde el cual se realice la llamada.
          </p>

          <div className="permissions-section">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                className="custom-checkbox"
                checked={checkboxChecked} 
                onChange={() => setCheckboxChecked(!checkboxChecked)} 
              />
              <span className="checkbox-text">Autorizo a dar mis datos de ubicación y ser contactado para una video llamada.</span>
            </label>
          </div>

          <div className="button-group">
            <button 
              className="btn confirm-btn" 
              onClick={handleConfirmCall} 
            >
              Continuar
            </button>
            <button 
              className="btn cancel-btn" 
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="call-screen">
          <h1 className="title">Datos de Ubicación</h1>
          {locationData ? (
            <div className="location-info">
              <p className="location-text"><strong>Latitud:</strong> {locationData.latitude}</p>
              <p className="location-text"><strong>Longitud:</strong> {locationData.longitude}</p>
              <a 
                href={generateGoogleMapsUrl()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="map-link"
              >
                <button className="btn location-btn">Ver en Google Maps</button>
              </a>
            </div>
          ) : (
            <p className="message">Obteniendo los datos de ubicación...</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

/* CSS (mobile-first, responsive design) */
const styles = `
  .app-container {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #f4f4f9;
    text-align: center;
  }
  
  .welcome-screen, .call-screen {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  .title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333333;
  }
  
  .message {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    color: #333333;
  }
  
  .permissions-section {
    margin-bottom: 1.5rem;
    text-align: left;
  }
  
  .checkbox-label {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
  }
  
  .checkbox-label input.custom-checkbox {
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border: 2px solid #333333;
    border-radius: 4px;
    appearance: none;
    display: inline-block;
    position: relative;
  }

  .checkbox-label input.custom-checkbox:checked::before {
    content: "\u2713";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: #000000;
  }

  .checkbox-text {
    color: #000000;
  }

  .location-text {
    font-size: 1rem;
    color: #333333;
    margin: 0.5rem 0;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }

  .btn {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
  }
  
  .confirm-btn {
    background-color: #28a745;
    color: #ffffff;
  }
  
  .confirm-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .cancel-btn {
    background-color: #dc3545;
    color: #ffffff;
  }

  .location-btn {
    background-color: #007bff;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
  }

  .map-link {
    text-decoration: none;
  }
`;

const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);