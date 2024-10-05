import {Ripple} from 'react-css-spinners';
import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Ripple color="#4F46E5" size={100} thickness={5}/>
    </div>
  );
};

export default Loading;