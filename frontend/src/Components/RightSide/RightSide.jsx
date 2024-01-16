import React, { useContext, useState } from 'react'
import { TableData } from '../../Data/TableApiData.js'
import { AiFillDownSquare } from 'react-icons/ai'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { Divider, Typography, Button, Stack } from '@mui/material'
import '../Styles.css'
import { UserContext } from '../../UserContext/UserContext.jsx'
import TemToggleBtn from '../TemToggleBtn.jsx'
import SizeToggleBtn from '../SizeToggleBtn.jsx'
import { Link, useNavigate } from 'react-router-dom'

const RightSide = () => {
    const { count, data, url, setUrl, pageSize, sizeToggle, tempToggle, setPageSize, nextPage, previousPage } = useContext(UserContext)
    const [partNumber, setpartPartNumber] = useState(false);
    const [price, setPrice] = useState(false);
    const [stock, setStock] = useState(false);
    const [material, setMaterial] = useState(false);
    const [color, setColor] = useState(false);
    const [hardness, setHardness] = useState(false);
    const [scale, setScale] = useState(false);
    const [type, setType] = useState(false);
    const [size, setSize] = useState(false);
    const [cs, setCS] = useState(false);
    const [id, setID] = useState(false);
    const [materialDescription, setMaterialDescription] = useState(false);
    const [highTmp, setHighTmp] = useState(false);
    const [lowTmp, setLowTmp] = useState(false);
    const navigate = useNavigate()

    const valueChangeHandler = (e) => {
        let newUrl = url.replace(/(\?|&)limit=[^&]*/g, "");
        newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, "");
        setUrl(newUrl + `&limit=${parseInt(e.target.value)}`)
    }
    const Nextpagination = () => {
        setUrl(nextPage)
    }

    return (
        <>
            {
                count && count >= 0 ?
                    <div >
                        {/* Toggle Button  */}
                        < div style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', gap: 6, marginTop: '-26px', marginBottom: "4px" }}>
                            <div style={{ display: "flex", justifyContent: 'space-between', gap: 6, margin: "4px" }}><Typography sx={{ marginLeft: "0px" }} >{count ? count : 0}</Typography>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6, marginTop: '', marginBottom: "4px" }}>
                                    <TemToggleBtn />
                                    <SizeToggleBtn />
                                </div>
                            </div>
                            {/* Table  */}
                            <div className='tableOuterStyle' style={{ position: "relative", overflowX: "hidden", overflowY: 'scroll', maxHeight: "80vh" }} >
                                <table className="custom-table" style={{ width: "90vw" }}>
                                    <thead style={{ zIndex: "1000" }} className='custom_header'>
                                        <tr>
                                            <th style={{ minWidth: "120px" }}>Part Number <AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(!partNumber); setPrice(false); setStock(false); setMaterial(false); setColor(false); setHardness(false); setScale(false); setType(false); setSize(false); setCS(false); setID(false); setMaterialDescription(false); setHighTmp(false); setLowTmp(false); }} />
                                                {partNumber && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=CompoundNumber`), setpartPartNumber(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-CompoundNumber`), setpartPartNumber(false) }}> Descending</p></div>)}
                                            </th>
                                            <th style={{ minWidth: "80px" }}>Starting Price<AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(!price); setStock(false); setMaterial(false); setColor(false); setHardness(false); setScale(false); setType(false); setSize(false); setCS(false); setID(false); setMaterialDescription(false); setHighTmp(false); setLowTmp(false); }} />
                                                {price && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=price`), setPrice(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-price`), setPrice(false) }}> Descending</p></div>)}
                                            </th>
                                            <th style={{ minWidth: "60px" }}>Stock<AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(false); setStock(!stock); setMaterial(false); setColor(false); setHardness(false); setScale(false); setType(false); setSize(false); setCS(false); setID(false); setMaterialDescription(false); setHighTmp(false); setLowTmp(false); }} />
                                                {stock && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=qnty`), setStock(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-qnty`), setStock(false) }}> Descending</p></div>)}
                                            </th>
                                            <th style={{ minWidth: "120px" }} >Material<AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(false); setStock(false); setMaterial(!material); setColor(false); setHardness(false); setScale(false); setType(false); setSize(false); setCS(false); setID(false); setMaterialDescription(false); setHighTmp(false); setLowTmp(false); }} />
                                                {material && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=Material`), setMaterial(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-Material`), setMaterial(false) }}> Descending</p></div>)}
                                            </th>
                                            <th style={{ minWidth: "40px" }}>Color<AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(false); setStock(false); setMaterial(false); setColor(!color); setHardness(false); setScale(false); setType(false); setSize(false); setCS(false); setID(false); setMaterialDescription(false); setHighTmp(false); setLowTmp(false); }} />
                                                {color && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=Color`), setColor(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-Color`), setColor(false) }}> Descending</p></div>)}
                                            </th>
                                            <th style={{ minWidth: "80px" }}>Hardness <AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(false); setStock(false); setMaterial(false); setColor(false); setHardness(!hardness); setScale(false); setType(false); setSize(false); setCS(false); setID(false); setMaterialDescription(false); setHighTmp(false); setLowTmp(false); }} />
                                                {hardness && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=DurometerRange`), setHardness(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-DurometerRange`), setHardness(false) }}> Descending</p></div>)}
                                            </th>
                                            <th style={{ minWidth: "60px" }}>Scale <AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(false); setStock(false); setMaterial(false); setColor(false); setHardness(false); setScale(!scale); setType(false); setSize(false); setCS(false); setID(false); setMaterialDescription(false); setHighTmp(false); setLowTmp(false); }} />
                                                {scale && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=DurometerScale`), setScale(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-DurometerScale`), setScale(false) }}> Descending</p></div>)}
                                            </th>
                                            <th>Type<AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(false); setStock(false); setMaterial(false); setColor(false); setHardness(false); setScale(false); setType(!type); setSize(false); setCS(false); setID(false); setMaterialDescription(false); setHighTmp(false); setLowTmp(false); }} />
                                                {type && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=CrossSectionalGeometry`), setType(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-CrossSectionalGeometry`), setType(false) }}> Descending</p></div>)}
                                            </th>
                                            <th>Size <AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(false); setStock(false); setMaterial(false); setColor(false); setHardness(false); setScale(false); setType(false); setSize(!size); setCS(false); setID(false); setMaterialDescription(false); setHighTmp(false); setLowTmp(false); }} />
                                                {size && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=SizeJIS`), setSize(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-SizeJIS`), setSize(false) }}> Descending</p></div>)}
                                            </th>
                                            <th>CS<span>{sizeToggle ? "(mm)" : "(in)"}</span><AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(false); setStock(false); setMaterial(false); setColor(false); setHardness(false); setScale(false); setType(false); setSize(false); setCS(!cs); setID(false); setMaterialDescription(false); setHighTmp(false); setLowTmp(false); }} />
                                                {cs && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=CrossSectionalDiameter`), setCS(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-CrossSectionalDiameter`), setCS(false) }}> Descending</p></div>)}
                                            </th>
                                            <th>ID<span>{sizeToggle ? "(mm)" : "(in)"}</span><AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(false); setStock(false); setMaterial(false); setColor(false); setHardness(false); setScale(false); setType(false); setSize(false); setCS(false); setID(!id); setMaterialDescription(false); setHighTmp(false); setLowTmp(false); }} />
                                                {id && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=InsideDiameter`), setID(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-InsideDiameter`), setID(false) }}> Descending</p></div>)}
                                            </th>
                                            <th>Material Description <AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(false); setStock(false); setMaterial(false); setColor(false); setHardness(false); setScale(false); setType(false); setSize(false); setCS(false); setID(false); setMaterialDescription(!materialDescription); setHighTmp(false); setLowTmp(false); }} />
                                                {materialDescription && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=Description`), setMaterialDescription(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-Description`), setMaterialDescription(false) }}> Descending</p></div>)}
                                            </th>
                                            <th style={{ minWidth: "60px" }}>High Tmp <span>{tempToggle ? "(°C)" : "(°F)"}</span> <AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(false); setStock(false); setMaterial(false); setColor(false); setHardness(false); setScale(false); setType(false); setSize(false); setCS(false); setID(false); setMaterialDescription(false); setHighTmp(!highTmp); setLowTmp(false); }} />
                                                {highTmp && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=HighTemperature`), setHighTmp(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-HighTemperature`), setHighTmp(false) }}> Descending</p></div>)}
                                            </th  >
                                            <th style={{ minWidth: "60px" }}>Low Tmp <span>{tempToggle ? "(°C)" : "(°F)"}</span>  <AiFillDownSquare className='icon' onClick={() => { setpartPartNumber(false); setPrice(false); setStock(false); setMaterial(false); setColor(false); setHardness(false); setScale(false); setType(false); setSize(false); setCS(false); setID(false); setMaterialDescription(false); setHighTmp(false); setLowTmp(!lowTmp); }} />
                                                {lowTmp && (<div className="dropdown"> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=LowTemperature`), setLowTmp(false) }}> Ascending</p> <Divider /> <p onClick={() => { let newUrl = url.replace(/(\?|&)ordering=[^&]*/g, ''); newUrl = newUrl.replace(/(\?|&)offset=[^&]*/g, ""); setUrl(newUrl + `&ordering=-LowTemperature`), setLowTmp(false) }}> Descending</p></div>)}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ maxHeight: "70vh", overflow: "scroll" }}>
                                        {data.map((item, index) => (

                                            <React.Fragment key={item.id}>

                                                <tr className={index % 2 === 1 ? 'gray-row' : ''} style={{ cursor: "pointer", height: "30px" }} onClick={(e) => { navigate(`/detail/${item.ItemNo}`) }} >
                                                    <td style={{ color: '#000', border: 'none', textAlign: "center", minWidth: "120px" }}><p style={{ marginTop: item.qnty === 0 ? '8px' : '', fontWeight: 800 }}>{item.SearchDescription}</p>
                                                    </td>
                                                    <td>{
                                                        item.price === 0 ? <p style={{ fontWeight: 600, minWidth: "80px", textAlign: "center", }}>Check pricing</p> : <p style={{ fontWeight: 600, minWidth: "80px", textAlign: "center" }}>${item.price}</p>
                                                    }</td>
                                                    <td className={item.qnty === 0 ? 'qnty-col' : 'O-qnty'}>
                                                        {
                                                            item.qnty === 0 ? <p style={{ fontWeight: 600, minWidth: "40px", textAlign: 'center' }}>CHECK STOCK</p> : <p style={{ fontWeight: 600, minWidth: "40px", textAlign: 'center', padding: "0 5px" }}> IN STOCK</p>
                                                        }
                                                    </td>
                                                    <td style={{ borderLeft: "3px solid gray", fontSize: "9.5px" }}>{item.Material}</td>
                                                    <td style={{ width: "60px" }}>{item.Color}</td>

                                                    <td style={{ width: "100px" }}>{item.DurometerRange}</td>

                                                    <td style={{ width: "60px" }}>{item.DurometerScale}</td>

                                                    <td style={{ borderLeft: "3px solid gray", width: "60px" }}>{item.CrossSectionalGeometry}</td>

                                                    <td style={{ width: "80px" }}>{item.SizeStandard} {item.SizeAS568 ? item.SizeAS568 : item.SizeJIS}</td>

                                                    <td style={{ width: "60px" }}>{sizeToggle ? item.CrossSectionalDiameter : (item.CrossSectionalDiameter / 25.4).toFixed(2)}</td>

                                                    <td style={{ width: "60px" }}>{sizeToggle ? item.InsideDiameter : (item.InsideDiameter / 25.4).toFixed(2)}</td>

                                                    <td style={{ borderLeft: "3px solid gray", width: "250px", fontSize: "9.5px" }}>{item.Description}</td>

                                                    <td style={{ width: "55px" }}>{tempToggle ? item.HighTemperature : (((9 / 5) * item.HighTemperature) + 32).toFixed(0)}</td>

                                                    <td style={{ width: "50px" }}>{tempToggle ? item.LowTemperature : (((9 / 5) * item.LowTemperature) + 32).toFixed(0)}</td>

                                                </tr>

                                                {index < TableData.length - 1 && (

                                                    <tr className="horizontal-row">


                                                        <td colSpan="19"></td>

                                                    </tr>

                                                )}

                                            </React.Fragment>

                                        ))}
                                    </tbody>

                                </table>
                            </div>
                            <div style={{ width: "100%", display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 8, paddingRight: "20px", marginTop: "10px" }}>
                                <select defaultValue={pageSize} className='section' onChange={valueChangeHandler} >
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>

                                <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', gap: 4 }}>
                                    <button className='paginationBtn' onClick={() => setUrl(previousPage)} ><GrPrevious /></button>
                                    <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', mx: 2 }}>
                                    </div>
                                    <button className='paginationBtn' onClick={Nextpagination} ><GrNext /></button>
                                </div>

                            </div>
                        </div >
                    </div> : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", top: '40%' }}>
                        <h1 style={{}}>Don’t see what you need? </h1>
                        <Button variant='contained' sx={{
                            width: "250px", fontSize: "20px", height: '62px', backgroundColor: '#F4976C',
                            '&:hover': { backgroundColor: '#F4976C' },
                        }} onClick={() => window.location.href = 'https://www.canyoncomponents.com/request-a-quote'}>
                            Get In Touch!
                        </Button>
                    </div>

            }
        </>

    );
}
export default RightSide