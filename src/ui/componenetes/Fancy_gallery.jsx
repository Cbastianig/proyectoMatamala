import React, { useRef, useEffect, PropsWithChildren } from 'react';

import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

function Fancybox(props) {
    const containerRef = useRef(null);
   

    useEffect(() => {
        const container = containerRef.current;

        const delegate = props.delegate || '[data-fancybox]';
        const options = props.options || {};
        if (props.data) {
            NativeFancybox.show([
                {
                    src: props.data[0].path_foto,
                    thumb: props.data[0].path_foto,
                },{
                    src: props.data[1].path_foto,
                    thumb: props.data[1].path_foto,
                },
            ], options);
        } else {
            NativeFancybox.bind(container, delegate, options);
        }




        return () => {
            NativeFancybox.unbind(container);
            NativeFancybox.close();
        };
    });

    return <div ref={containerRef}>{props.children}</div>;
}

export default Fancybox;
