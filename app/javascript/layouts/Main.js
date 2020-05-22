import React from 'react'
import Header from "../components/Header/Header";

export default function Main({children}) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
