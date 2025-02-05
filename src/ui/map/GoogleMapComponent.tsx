import React, { useEffect, useRef, useState } from 'react'
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
  Polygon,
} from '@react-google-maps/api'

const testRegions = [
  {
    id: '1',
    name: 'Mahalle A',
    coordinates: [
      { lat: 41.008, lng: 28.978 },
      { lat: 41.009, lng: 28.979 },
      { lat: 41.01, lng: 28.977 },
      { lat: 41.008, lng: 28.976 },
    ],
  },
  {
    id: '2',
    name: 'Mahalle B',
    coordinates: [
      { lat: 41.011, lng: 28.982 },
      { lat: 41.013, lng: 28.983 },
      { lat: 41.012, lng: 28.98 },
      { lat: 41.011, lng: 28.981 },
    ],
  },
]

interface GoogleMapComponentProps {
  centerAddress: string
  markers: MarkerData[]
  regions: RegionData[] // Yeni props: İl, ilçe, mahalle sınırları
  zoom?: number
}

interface MarkerData {
  id: string
  customerId?: string
  title: string
  address: string
  lat?: number
  lng?: number
}

interface RegionData {
  id: string
  name: string
  coordinates: { lat: number; lng: number }[] // Bölgenin sınırları (çokgen)
}

const containerStyle = {
  width: '100%',
  height: '500px',
}

const defaultCenter = {
  lat: 38.9637,
  lng: 35.2433, // Center of Turkey
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  centerAddress,
  markers,
  regions,
  zoom = 5.5,
}) => {
  const mapRef = useRef<google.maps.Map | null>(null)
  const [markerData, setMarkerData] = useState<MarkerData[]>([])
  const [center, setCenter] = useState(defaultCenter)
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null)

  const fetchGeocodeData = async (
    address: string,
  ): Promise<{ lat: number; lng: number } | null> => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address,
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
      )
      const data = await response.json()

      if (data.results?.length) {
        const { lat, lng } = data.results[0].geometry.location
        return { lat, lng }
      }
      console.warn(`No geocode results for address: ${address}`)
      return null
    } catch (error) {
      console.error(`Failed to fetch geocode for address: ${address}`, error)
      return null
    }
  }

  useEffect(() => {
    const updateMarkers = async () => {
      const updatedMarkers = await Promise.all(
        markers.map(async (marker) => {
          if (marker.lat && marker.lng) return marker
          const coordinates = await fetchGeocodeData(marker.address)
          return coordinates
            ? { ...marker, lat: coordinates.lat, lng: coordinates.lng }
            : marker
        }),
      )
      setMarkerData(updatedMarkers)
    }
    updateMarkers()
  }, [markers])

  useEffect(() => {
    const updateCenter = async () => {
      const coordinates = await fetchGeocodeData(centerAddress)
      if (coordinates) setCenter(coordinates)
    }
    updateCenter()
  }, [centerAddress])

  const handleMarkerClick = (marker: MarkerData) => {
    if (mapRef.current && marker.lat && marker.lng) {
      mapRef.current.setCenter({ lat: marker.lat, lng: marker.lng })
      mapRef.current.setZoom(12)
    }
    setSelectedMarker(marker)
  }

  const handlePolygonClick = (region: RegionData) => {
    if (mapRef.current) {
      const bounds = new google.maps.LatLngBounds()
      region.coordinates.forEach((coord) => bounds.extend(coord))
      mapRef.current.fitBounds(bounds)
    }
    setSelectedRegion(region)
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={(map) => {
          mapRef.current = map
        }}
      >
        {markerData.map(
          (marker) =>
            marker.lat &&
            marker.lng && (
              <Marker
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => handleMarkerClick(marker)}
              />
            ),
        )}
        {selectedMarker && selectedMarker.lat && selectedMarker.lng && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div>
              <h1>Müşteri ID: {selectedMarker.customerId}</h1>
              <h4>Ünvan: {selectedMarker.title}</h4>
              <p>Adres: {selectedMarker.address}</p>
            </div>
          </InfoWindow>
        )}
        {regions &&
          regions.map((region) => (
            <Polygon
              key={region.id}
              paths={region.coordinates}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
              }}
              onClick={() => handlePolygonClick(region)}
            />
          ))}
        {selectedRegion && (
          <InfoWindow
            position={selectedRegion.coordinates[0]}
            onCloseClick={() => setSelectedRegion(null)}
          >
            <div>
              <h1>Bölge: {selectedRegion.name}</h1>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(GoogleMapComponent)
