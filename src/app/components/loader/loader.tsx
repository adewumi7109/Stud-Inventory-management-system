import React from 'react';

function RealtimeLoader() {
  return (
 
        <svg
          width="100%"
          height="50"
          viewBox="0 0 100 50"
          preserveAspectRatio="xMidYMid"
          className="lds-ellipsis"
          style={{ background: 'transparent' }}
        >
          <circle cx="10" cy="25" r="7" fill="#008080">
            <animate
              attributeName="r"
              values="7;24"
              dur="1s"
              repeatCount="indefinite"
              begin="0s"
            ></animate>
            <animate
              attributeName="fill-opacity"
              values="1;0"
              dur="1s"
              repeatCount="indefinite"
              begin="0s"
            ></animate>
          </circle>
          <circle cx="35" cy="25" r="7" fill="#008080">
            <animate
              attributeName="r"
              values="7;24"
              dur="1s"
              repeatCount="indefinite"
              begin="-0.25s"
            ></animate>
            <animate
              attributeName="fill-opacity"
              values="1;0"
              dur="1s"
              repeatCount="indefinite"
              begin="-0.25s"
            ></animate>
          </circle>
          <circle cx="60" cy="25" r="7" fill="#008080">
            <animate
              attributeName="r"
              values="7;24"
              dur="1s"
              repeatCount="indefinite"
              begin="-0.5s"
            ></animate>
            <animate
              attributeName="fill-opacity"
              values="1;0"
              dur="1s"
              repeatCount="indefinite"
              begin="-0.5s"
            ></animate>
          </circle>
          <circle cx="85" cy="25" r="7" fill="#008080">
            <animate
              attributeName="r"
              values="7;24"
              dur="1s"
              repeatCount="indefinite"
              begin="-0.75s"
            ></animate>
            <animate
              attributeName="fill-opacity"
              values="1;0"
              dur="1s"
              repeatCount="indefinite"
              begin="-0.75s"
            ></animate>
          </circle>
        </svg>
     
  );
}

export default RealtimeLoader;
