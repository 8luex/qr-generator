import axios from "axios";
import { createContext, useState } from "react";
import InputForm from "./components/InputForm";
import QrCode from "./components/QrCode";

// Create context
export const InputContext = createContext();

function App() {
  const [inputValue, setInputValue] = useState({
    url: '',
    color: ''
  });
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //2b33d750-ce1b-11ed-b720-e9c54d9851f8

  const config = {
    headers: { Authorization: 'Bearer 2b33d750-ce1b-11ed-b720-e9c54d9851f8' }
  }
  const bodyParameters = {
    "colorDark": inputValue.color,
    "logo": "https://cdn.shopify.com/s/files/1/1061/1924/products/Nerd_Emoji_Icon_4ab932f8-9ec9-4180-8420-c74b84546f57_large.png?v=1571606091",
    "qrCategory": "url",
    "qrData": "pattern4",
    "eye_outer": "eyeOuter2",
    "eye_inner": "eyeInner2",
    "text": inputValue.url
  }
  const getQrCode = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        'https://qrtiger.com/api/qr/static',
        bodyParameters,
        config
      );
      setResponse(res.data.url);
    } catch(err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const value = {
    inputValue,
    setInputValue,
    getQrCode,
    response,
    loading,
    error
  }

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-teal-400 h-screen pt-24 md:pt-50 px-2">
      <div className="container mx-auto max-w-4xl bg-white rounded-md shadow">
        <div className="md:grid md:grid-cols-3">
          <InputContext.Provider value={value}>
            <InputForm />
            <QrCode />
          </InputContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;