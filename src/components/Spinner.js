// rce
import React, { Component } from 'react';
import styled from 'styled-components';

const MyComponent = styled.div`
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid black;
  border-color: black transparent black transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

`;
export class Spinner extends Component {
    render() {
        return (
            <MyComponent className='mt-3'>
                <div className="lds-dual-ring"></div>
            </MyComponent>
        )
    }
}

export default Spinner
