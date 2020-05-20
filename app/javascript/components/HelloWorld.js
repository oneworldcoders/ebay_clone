import React from 'react';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Datastore from '../datastore';
import RequestApi from '../requestApi';


const datastore = new Datastore()
const request = new RequestApi('/products', 'GET')

const GET_THINGS_SUCCESS = 'GET_THINGS_SUCCESS';

function getThings() {
  return dispatch => {
    const json = request.authenticatedRequest(datastore.get('token'))
    if (json.errors) {
      // dispatch error
    } else {
      dispatch(getThingsSuccess(json))
    }
  }
};

export function getThingsSuccess(json) {
  return {
    type: GET_THINGS_SUCCESS,
    json
  }
}

const HelloWorld = (props) => {
  const things = useSelector(state => state.thingsReducer.things)
  const thingsList = things.map((thing) => {
    return <li key={thing.name}>{thing.name} {thing.guid}</li>
  });

  const dispatch = useDispatch()

  return (
    <React.Fragment>
      Greeting : {props.greeting}
      <button className='getThingsBtn' onClick={() => dispatch(getThings())}>getThings</button>
      <ul>{thingsList}</ul>
    </React.Fragment>
  )
}

export default HelloWorld;
