export default function AnimatedImageCarousel() {
  const images = [
    "/smart-farm-dashboard-iot-technology-monitoring-sys.jpg",
    "/rice-paddy-field-with-farmers-working.jpg",
    "/farmer-using-smartphone-with-iot-sensors-in-green-.jpg",
    "/soil-moisture-sensor-iot-agriculture.jpg",
    "/weather-forecast-agriculture-climate.jpg",
    "/crop-health-analysis-ai-imaging.jpg",
    "/analytics-dashboard-farm-data-visualization.jpg",
    "/farmers-community-agriculture.jpg",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden opacity-45">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-amber-500/20 z-10"></div>
      <div className="flex animate-scroll-left h-full">
        {/* First set of images */}
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-96 h-full">
            <img
              src={image || "/placeholder.svg"}
              alt={`Farm image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {images.map((image, index) => (
          <div key={`duplicate-${index}`} className="flex-shrink-0 w-96 h-full">
            <img
              src={image || "/placeholder.svg"}
              alt={`Farm image duplicate ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
