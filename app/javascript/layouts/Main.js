import React from 'react'
import Header from "../components/Header/Header";

export default function Main(props) {
  console.log('layout gets rerendered: ' + props);
  
  return (
    <>
      <Header />
      {props.child}
    </>
  )
}
