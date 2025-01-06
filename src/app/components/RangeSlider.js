
    import React, { useContext, useEffect, useRef, useState } from 'react';
    import './util/RangeSlider.css'; // Path to your slider's CSS file
    import { set } from 'react-hook-form';
    import { range } from '@mantine/hooks';
    const RangeSlider = ({rangeRef}) => {
        useEffect(() => {
            // Load the custom slider script only on the client side
            const script = document.createElement('script');
            script.src = '/range-slider.js'; // Path to your custom element JS file in the public folder
            script.async = true;
            document.body.appendChild(script);
                
            // Clean up script when the component is removed
            return () => {
                document.body.removeChild(script);
            };
        }, []);

    
        
        return (
            <div className="slider-container w-full">
                    {/* <range-slider></range-slider> */}
                    {/* <range-slider value="20-80" step="20"></range-slider> */}
                    
        
                
            <range-slider ref={rangeRef} id="rangeSlider" className="w-full"
                        min="100000"
                        max="2000000"
                        value="100000-2000000"
                        step="1000"
                        style={{
                            '--thumb-width': '18px',
                            '--thumb-height': '18px',
                            '--thumb-mobile-width': '30px',
                            '--thumb-border-radius': '100%',
                            '--thumb-bg': '0 0 0',
                            '--track-height': '3px',
                            '--track-color':'0 0 0',
                            '--track-bg': '128 128 128',
                            '--value-bg': '',
                            '--value-color': '0 0 0',
                            '--value-font-size': '0px'
                        }}
                    ></range-slider>
                    
                </div>
        )
    };

    export default RangeSlider;
