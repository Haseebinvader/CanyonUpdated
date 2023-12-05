import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, DetailPage, AddToCart, RequestQuote, CheckOut } from './Pages'
import { UserContext } from './UserContext/UserContext'
import axios from 'axios'
import { Login } from '@mui/icons-material'

function App() {
  const [pageSize, setPageSize] = useState(25)
  const [url, setUrl] = useState(`http://127.0.0.1:8000/api/products/?Block=False&Online=Online&limit=${pageSize}&ordering=-qnty`)
  const [data, setData] = useState([])
  const [sizeToggle, setSizeToggle] = useState(true)
  const [tempToggle, setTempToggle] = useState(true)
  const [row, setRow] = useState({})
  const [nextPage, setNextPage] = useState('')
  const [previousPage, setPreviousPage] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [clearFiler, setClearFilter] = useState(false)
  
  const [itemLineCount, setItemLineCount] = useState(0);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedcompliance, setSelectedcompliance] = useState([]);
  const [selectedhardness, setSelectedhardness] = useState([]);
  const [selectedbrand, setSelectedbrand] = useState([]);
  const [selectedcolor, setSelectedcolor] = useState([]);
  const [selectedsubtype, setSelectedsubtype] = useState([]);
  const [temperature, setTemperature] = useState([0, 80]);
  const [itemCart, setItemCart] = useState([]);
  const [count, setCount] = useState(0)
  const [blurMaterial, setBlurMaterial] = useState([])
  const [blurSubMaterial, setBlurSubMaterial] = useState([])
  const [blurHardness, setBlurHardness] = useState([])
  const [blurCompliance, setBlurCompliance] = useState([])
  const [blurColor, setBlurColor] = useState([])
  const [blurBrand, setBlurBrand] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('')
  const [showStandard, setShowStandard] = useState('')
  const [showCompliance, setShowCompliance] = useState(false);
  const [selectedJSSize, setselectedJSSize] = useState([])
  const [selectedJSCS, setselectedJSCS] = useState([])
  const [selectedJSID, setselectedJSID] = useState([])
  const [selectedUSASize, setselectedUSASize] = useState([])
  const [selectedUSACS, setselectedUSACS] = useState([])
  const [selectedUSAID, setselectedUSAID] = useState([])

  const [selectedSize, setSelectedSize] = useState([]); // Array to store selected Size values
  const [selectedCS, setSelectedCS] = useState([]);     // Array to store selected CS values
  const [selectedID, setSelectedID] = useState([]);     // Array to store selected ID values


  useEffect(() => {

    let localStorageItemCart = localStorage.getItem('itemCart');
    if (!localStorageItemCart) {

      localStorageItemCart = [];

      localStorage.setItem('itemCart', JSON.stringify(localStorageItemCart));

    } else {

      localStorageItemCart = JSON.parse(localStorageItemCart);

    }
    setItemCart(localStorageItemCart);

  }, []);
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('itemCart')) || [];
    const itemCount = storedItems.length;
    setItemLineCount(itemCount);
  }, [itemLineCount]);

  useEffect(() => {
    axios.get(url).then((res) => {
      console.log(res.data);
      setBlurColor(res.data.distinct_colors);
      setBlurMaterial(res.data.distinct_Material)
      setBlurSubMaterial(res.data.distinct_MaterialSubtype)
      setBlurHardness(res.data.distinct_DurometerRange)
      setBlurBrand(res.data.distinct_Brand)
      setData(res.data.results.results)
      setNextPage(res.data.results.next);
      setPreviousPage(res.data.results.previous);
      setCount(res.data.results.count)
    })
    axios.get('http://127.0.0.1:8000/api/get_access_token/').then((res) => {
      setAccessToken(res.data.access_token)
    })
  }, [url, pageSize, setAccessToken, setData]);
  return (
    <div className="App">
      <UserContext.Provider value={{
        selectedSize, setSelectedSize, selectedCS, setSelectedCS, selectedID, setSelectedID,
        itemCart, setItemCart, temperature, setTemperature, selectedbrand, setSelectedbrand, selectedsubtype, setSelectedsubtype, selectedcolor, setSelectedcolor, selectedhardness, setSelectedhardness, selectedcompliance, setSelectedcompliance, selectedMaterials, setSelectedMaterials, url, setUrl, setPageSize, data, pageSize, sizeToggle, setSizeToggle, tempToggle, setTempToggle, row, setRow, nextPage, setNextPage, previousPage, setPreviousPage, accessToken, setAccessToken, clearFiler, setClearFilter, count, blurMaterial, setBlurMaterial
        , blurSubMaterial, setBlurSubMaterial
        , blurHardness, setBlurHardness
        , blurCompliance, setBlurCompliance
        , blurColor, setBlurColor
        , blurBrand, setBlurBrand,
        selectedUSASize,
        selectedJSSize,
        selectedUSACS,
        selectedUSAID,
        selectedJSCS,
        selectedJSID,
        selectedCountry, setSelectedCountry,
        showStandard, setShowStandard,
        showCompliance, setShowCompliance,
        setselectedJSSize,
        setselectedJSCS,
        setselectedJSID,
        setselectedUSASize,
        setselectedUSACS,
        setselectedUSAID,
        itemLineCount, setItemLineCount
      }} >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/addtocart" element={<AddToCart />} />
            <Route path="/requestquote/:id" element={<RequestQuote />} />
            <Route path="/CheckOut" element={<CheckOut />} />
            <Route path="/login" element={<Login/> } />
          </Routes>
        </Router>
      </UserContext.Provider>
    </div>
  )
}

export default App
