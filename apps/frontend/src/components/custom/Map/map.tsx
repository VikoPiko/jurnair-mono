// /*Since the map was loaded on client side,
// we need to make this component client rendered as well*/
// "use client";

// //Map component Component from library
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const MapComponent = ({
  coordinates,
}: {
  coordinates: { lat: number; lng: number };
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
    id: "google-map-script",
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="w-full h-full">
      <GoogleMap
        mapContainerClassName="w-full h-full rounded-[10px]"
        center={coordinates}
        zoom={19}
        options={{
          zoomControl: true,
          tilt: 0,
          gestureHandling: "auto",
          mapTypeId: "roadmap",
        }}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    </div>
  );
};

export { MapComponent };

// //Map's styling
// const defaultMapContainerStyle = {
//   width: "100%",
//   height: "50vh",
//   borderRadius: "15px 15px 15px 15px",
// };

// //K2's coordinates
// const defaultMapCenter = {
//   lat: 39.7341,
//   lng: -104.9871,
// };

// //Default zoom level, can be adjusted
// const defaultMapZoom = 19;

// //Map options
// const defaultMapOptions = {
//   zoomControl: true,
//   tilt: 0,
//   gestureHandling: "auto",
//   mapTypeId: "satellite",
// };

// const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_MAPS_API_KEY!;

// const { isLoaded } = useJsApiLoader({
//   googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
//   id: "google-map-script", // optional but helps avoid duplicates
// });

// const MapComponent = ({
//   coordinates,
// }: {
//   coordinates: { lat: number; lng: number };
// }) =>

//     {
//   return (
//     <div className="w-full h-full">
//       {/* <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}> */}
//       <GoogleMap
//         //   mapContainerStyle={defaultMapContainerStyle}
//         mapContainerClassName="w-full h-full rounded-[10px]"
//         center={coordinates}
//         zoom={defaultMapZoom}
//         options={defaultMapOptions}
//       >
//         <Marker position={coordinates} />
//       </GoogleMap>
//       {/* </LoadScript> */}
//     </div>
//   );
// };

// export { MapComponent };
