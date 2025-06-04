'use client';

import React from 'react';

const Map = () => {
  return (
    <div className="w-full h-[300px] bg-gray-200 rounded-xl overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBVuvZK_WD_Qxxm-OOvqnJkfN1SzDpz8Do&center=39.5,-98.35&zoom=4`}
      ></iframe>
    </div>
  );
};

export default Map;
