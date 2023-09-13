import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function DeliveryMap() {
  const centerPosition = [40.7128, -74.006]; // Center of the map (New York City)

  const markers = [
    { position: [40.7128, -74.006], content: "New York City" }, // Replace with your desired locations
    { position: [34.0522, -118.2437], content: "Los Angeles" }, // Replace with your desired locations
  ];

  const MY_ACCESS_TOKEN =
    "pk.eyJ1IjoiZ2FydHVyIiwiYSI6ImNsa3piOW80bTFvZ20zcXJ6ZTd1ZzBwb24ifQ.hA7NRqW1ZRwVVmXQ1sTcLg";

  return (
    <MapContainer
      center={[40.8054, -74.0241]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        // url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${MY_ACCESS_TOKEN}`}
        url={`https://api.mapbox.com/directions/v5/mapbox/driving/6.574211%2C47.617273%3B20.504612%2C50.035974?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${MY_ACCESS_TOKEN}`}
      />
      <Marker position={[40.8054, -74.0241]} draggable={true} animate={true}>
        <Popup>Hey ! you found me</Popup>
      </Marker>
    </MapContainer>
  );
}
