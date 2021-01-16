import { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";

const App = () => {
    /**
     * This chunk of code (down to the useEffect)
     * makes the map show up
     * and auto resize itself when the
     * window size changes
     */

    const [viewport, setViewport] = useState({
        width: 400,
        height: 400,
        // This is the center of the United States
        latitude: 39,
        longitude: -98,
        zoom: 4
    });

    // Resize the map to the current window size
    const resize = () => {
        setViewport({
            ...viewport,
            height: window.innerHeight,
            width: window.innerWidth
        });
    };

    // Update the state
    const updateViewport = (newViewport) => {
        setViewport({
            ...viewport,
            ...newViewport
        });
    };

    useEffect(() => {
        // When the window is resized, resize the map
        window.addEventListener("resize", resize);
        resize();

        // Before the component unmounts, remove the event listener
        return () => {
            window.removeEventListener("resize", resize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Render the Map
    return (
        <ReactMapGL
            {...viewport}
            mapStyle="mapbox://styles/thecjreynolds/ck117fnjy0ff61cnsclwimyay"
            onViewportChange={(v) => updateViewport(v)}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        />
    );
};

export default App;
