import React, { useContext, useEffect, useState } from "react";
import { Divider, Grid } from "@mui/material";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import "../Styles.css"
import axios from "axios";
import { UserContext } from "../../UserContext/UserContext";

const Standard = () => {

  const { setData, setUrl, pageSize, url, selectedCountry, setSelectedCountry,
    selectedSize, setSelectedSize,selectedCS, setSelectedCS,selectedID, setSelectedID,
    selectedUSASize,
    selectedJSSize,
    selectedUSACS,
    selectedUSAID,
    selectedJSCS,
    selectedJSID,
    setselectedJSSize,
    setselectedJSCS,
    setselectedJSID,
    setselectedUSASize,
    setselectedUSACS,
    setselectedUSAID, } = useContext(UserContext)
  const [showTable, setShowTable] = useState(false);
  const countries = ["USA", "Japan"];
  const [isopen, setisopen] = useState(false);
  const [sizedata, setSizedata] = useState([]);
  const [size, setsize] = useState(0);
  const [cs, setCs] = useState(0);
  const [id, setid] = useState(0);
  const [sizeBool, setSizeBool] = useState(true)
  const [filterData, setFilterData] = useState(true)

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const showTableHandler = () => {
    setShowTable(!showTable)
  }
  useEffect(() => {
    if (selectedCountry === "USA") {
      axios.get(`http://127.0.0.1:8000/api/get_usa_Size/`).then((res) => {
        setSizedata(res?.data?.data);
      });
    }
    if (selectedCountry === "Japan") {
      axios.get(`http://127.0.0.1:8000/api/get_js_Size/`).then((res) => {
        setSizedata(res?.data?.data);
      });
    }
  }, [selectedCountry, setSizedata]);
  const handlesizechange = (e) => {
    const isJapan = selectedCountry === "Japan";
    const isUsa = selectedCountry === "USA";
    if (e.target.value !== "") {
      setSizeBool(false)
      if (isUsa) {
        let result = sizedata.filter((i) => i[0] === '-' + e.target.value)
        setFilterData(result)
      } else if (isJapan) {
        let result = sizedata.filter((i) => i[0] === e.target.value)
        setFilterData(result)
      }
    }
    else {
      setSizeBool(true)

      if (selectedCountry === "USA") {

        axios.get(`http://127.0.0.1:8000/api/get_usa_Size/`).then((res) => {
          setSizedata(res?.data?.data);
        });
      }
      if (selectedCountry === "Japan") {
        axios.get(`http://127.0.0.1:8000/api/get_js_Size/`).then((res) => {
          setSizedata(res?.data?.data);
        });
      }
    }
  }
  const handlecschange = (e) => {
    const isJapan = selectedCountry === "Japan";
    const isUsa = selectedCountry === "USA";
    if (e.target.value !== "") {
      setSizeBool(false)
      if (isUsa) {
        console.log(sizedata);
        let result = sizedata.filter((i) => i[1] === e.target.value)
        console.log(result);
        setFilterData(result)
      } else if (isJapan) {
        let result = sizedata.filter((i) => i[1] === e.target.value)
        setFilterData(result)
      }
    }
    else {
      setSizeBool(true)

      if (selectedCountry === "USA") {

        axios.get(`http://127.0.0.1:8000/api/get_usa_Size/`).then((res) => {
          setSizedata(res?.data?.data);
        });
      }
      if (selectedCountry === "Japan") {

        axios.get(`http://127.0.0.1:8000/api/get_js_Size/`).then((res) => {
          setSizedata(res?.data?.data);
        });
      }
    }
  }
  const handleidchange = (e) => {
    const isJapan = selectedCountry === "Japan";
    const isUsa = selectedCountry === "USA";
    if (e.target.value !== "") {
      setSizeBool(false)
      if (isUsa) {
        let result = sizedata.filter((i) => i[2] === e.target.value)
        setFilterData(result)
      } else if (isJapan) {
        let result = sizedata.filter((i) => i[2] === e.target.value)
        setFilterData(result)
      }
    }
    else {
      setSizeBool(true)

      if (selectedCountry === "USA") {

        axios.get(`http://127.0.0.1:8000/api/get_usa_Size/`).then((res) => {
          setSizedata(res?.data?.data);
        });
      }
      if (selectedCountry === "Japan") {

        axios.get(`http://127.0.0.1:8000/api/get_js_Size/`).then((res) => {
          setSizedata(res?.data?.data);
        });
      }
    }
  }
  const handleCheckboxChange = (e, size, cs, id) => {
    const isChecked = e.target.checked;
  
    if (isChecked) {
      setSelectedSize((prevSelectedSize) => [...prevSelectedSize, size]);
      setSelectedCS((prevSelectedCS) => [...prevSelectedCS, cs]);
      setSelectedID((prevSelectedID) => [...prevSelectedID, id]);
    } else {
      setSelectedSize((prevSelectedSize) => prevSelectedSize.filter((item) => item !== size));
      setSelectedCS((prevSelectedCS) => {
        let removed = false;
        return prevSelectedCS.filter((item) => {
          if (!removed && item === cs) {
            removed = true;
            return false; // Remove the first occurrence of 'cs'
          }
          return true;
        });
      });
      
      setSelectedID((prevSelectedID) => {
        let removed = false;
        return prevSelectedID.filter((item) => {
          if (!removed && item === id) {
            removed = true;
            return false; // Remove the first occurrence of 'id'
          }
          return true;
        });
      });
    }
  };
  
  useEffect(() => {
    if (selectedCountry === "USA") {

      const selectedSizeString = selectedSize.join('$');
      const selectedCSString = selectedCS.join('$');
      const selectedIDString = selectedID.join('$');
  
      // Build the URL with selected values
      const apiUrl = `&SizeAS568=${selectedSizeString}&CrossSectionalDiameter=${selectedCSString}&InsideDiameter=${selectedIDString}`;
    if(selectedSize.length === 0 && selectedCS.length === 0 && selectedID.length === 0){
      let newUrl = url.replace(/(\?|&)SizeAS568=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)SizeJIS=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)CrossSectionalDiameter=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)InsideDiameter=[^&]*/g, "");
      setUrl(newUrl)
    }
    else{
      let newUrl = url.replace(/(\?|&)SizeAS568=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)SizeJIS=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)CrossSectionalDiameter=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)InsideDiameter=[^&]*/g, "");
      setUrl(newUrl+apiUrl)
    }
    }
    else  if (selectedCountry === "Japan") {

      const selectedSizeString = selectedSize.join('$');
      const selectedCSString = selectedCS.join('$');
      const selectedIDString = selectedID.join('$');
  
      // Build the URL with selected values
      const apiUrl = `&SizeJIS=${selectedSizeString}&CrossSectionalDiameter=${selectedCSString}&InsideDiameter=${selectedIDString}`;
    if(selectedSize.length === 0 && selectedCS.length === 0 && selectedID.length === 0){
      let newUrl = url.replace(/(\?|&)SizeAS568=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)SizeJIS=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)CrossSectionalDiameter=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)InsideDiameter=[^&]*/g, "");
      setUrl(newUrl)
    }
    else{
      let newUrl = url.replace(/(\?|&)SizeAS568=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)SizeJIS=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)CrossSectionalDiameter=[^&]*/g, "");
      newUrl = newUrl.replace(/(\?|&)InsideDiameter=[^&]*/g, "");
      setUrl(newUrl+apiUrl)
    }
    }
    // Similar logic for "Japan" country...
  }, [selectedCountry, selectedSize, selectedCS, selectedID]);
  

  return (
    <section className="sideBarMenuData">
      <select value={selectedCountry} className="country"
        style={{ backgroundColor: "#fff", height: "2rem", width: "100%", border: "1px solid #c4c4c4", borderRadius: "4px", cursor: 'pointer' }} onChange={handleCountryChange} >
        <option value="" >Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>
      <Grid container spacing={0.3} sx={{ mt: 0.4 }}>
        <Grid item xs={1.5} sx={{ mt: 0.5, cursor: "pointer" }}>
          {showTable && !selectedCountry ? <AiFillCaretDown onClick={showTableHandler} /> : <AiFillCaretUp onClick={showTableHandler} />}
        </Grid>
        <Grid item xs={3}><input type="text" placeholder="Size" className="borderInput" onChange={handlesizechange} /></Grid>
        <Grid item xs={3}><input type="number" placeholder="CS" className="borderInput" onChange={handlecschange} /></Grid>
        <Grid item xs={3}><input type="number" placeholder="ID" className="borderInput" onChange={handleidchange} /></Grid>
      </Grid>
      <div style={{ maxHeight: "150px", overflowY: 'scroll', }}>
        {
          showTable ? null : <div>
            <table style={{ width: "100%", border: '1px solid #858585', padding: "3px", borderRadius: "6px" }}>
              <thead style={{ backgroundColor: "gray" }}>
              </thead>
              <tbody style={{}}>
                {sizedata && sizeBool ? (
                  sizedata.map((i, index) => (
                    <React.Fragment key={index}>
                      {
                        i[0] && i[1] && i[2] ?
                          <tr tabIndex={index} style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', paddingRight: "5px", alignItems: 'center' }}>
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedSize.includes(i[0])} 
                                style={{ width: '100%', transform: 'scale(1.3)', cursor: 'pointer' }}
                                onChange={(e) => {
                                  handleCheckboxChange(e, i[0], i[1], i[2]);
                                }}
                              />

                            </td>

                            <td style={{ fontSize: "11px" }}>{selectedCountry === "USA" ? i[0].replace('-', '') : i[0]}</td>
                            <td style={{ fontSize: "11px" }}>{i[1]}</td>
                            <td style={{ fontSize: "11px" }}>{i[2]}</td>
                          </tr> : <></>
                      }
                    </React.Fragment>
                  ))
                ) : (
                  <></>
                )}
                {sizedata && !sizeBool ? (
                  filterData.map((i, index) => (
                    <React.Fragment key={index}>
                      {
                        i[0] && i[1] && i[2] ?
                          <tr tabIndex={index} style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', paddingRight: "5px" }}>
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedSize.includes(i[0])} 
                                style={{ width: '100%', transform: 'scale(1.3)', cursor: 'pointer' }}
                                onChange={(e) => {
                                  handleCheckboxChange(e, i[0], i[1], i[2]);
                                }
                                
                                }
                              />
                            </td>

                            <td style={{ fontSize: "11px" }}>{selectedCountry === "USA" ? i[0].replace('-', '') : i[0]}</td>
                            <td style={{ fontSize: "11px" }}>{i[1]}</td>
                            <td style={{ fontSize: "11px" }}>{i[2]}</td>

                          </tr> : <></>
                      }

                    </React.Fragment>
                  ))
                ) : (
                  <></>
                )}
              </tbody>

            </table>
          </div>
        }
      </div>
    </section>
  );
};

export default Standard;