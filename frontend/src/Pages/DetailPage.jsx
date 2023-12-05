import React, { Fragment, useContext, useEffect, useState } from 'react'

import { Header, Footer } from '../Components'

import DetailPageContent from '../Components/DetailPageContent/DetailPageContent'

import { useParams } from 'react-router-dom'

import axios from 'axios'

import { UserContext } from '../UserContext/UserContext'

 

const DetailPage = () => {

  const { id } = useParams();

  const { setRow } = useContext(UserContext)

  useEffect(() => {

    return () => {

      axios.get(`http://127.0.0.1:8000/api/products/?ItemNo=${id}`).then((res) => {
        console.log(res.data.results[0].Color);
        setRow(res.data.results[0])
      })

    }

  }, [setRow])

 

  return (

    <Fragment>

      <Header />

      <DetailPageContent />

      <Footer />

    </Fragment>

  )

}

 

export default DetailPage