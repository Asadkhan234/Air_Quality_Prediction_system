import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

const cityCoordinates = {
  Karachi: [24.8607, 67.0011],
  Lahore: [31.5204, 74.3587],
  Islamabad: [33.6844, 73.0479],
  Rawalpindi: [33.5651, 73.0169],
  Faisalabad: [31.4504, 73.1350],
  Multan: [30.1575, 71.5249],
  Peshawar: [34.0151, 71.5249],
  Quetta: [30.1798, 66.9750],
  "Rahim Yar Khan": [28.4212, 70.2989],
  Sialkot: [32.4945, 74.5229],
};

export default function PakistanPollutionMap({ data }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-lg shadow-sm">
          📍
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Pakistan Pollution Map
          </h2>
          <p className="text-sm text-slate-400">PM10 levels by city</p>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-slate-100">
        <MapContainer
          center={[30.5, 69]}
          zoom={5}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data.map((city) => (
            <CircleMarker
              key={city.city}
              center={cityCoordinates[city.city]}
              radius={city.average_pm10 / 10}
              color="#ef4444"
              weight={2}
              fillColor="#f87171"
              fillOpacity={0.5}
            >
              <Popup>
                <div className="min-w-[140px]">
                  <h3 className="font-bold text-slate-800 text-sm mb-1">
                    {city.city}
                  </h3>
                  <p className="text-xs text-slate-500">
                    PM10:{" "}
                    <span className="font-semibold text-slate-700">
                      {city.average_pm10}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">
                    PM2.5:{" "}
                    <span className="font-semibold text-slate-700">
                      {city.average_pm25}
                    </span>
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}