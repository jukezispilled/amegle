import Big from "./Big";
import Small from "./Small";

function App() {
  return (
    <div>
      {/* Big component visible on md and up */}
      <div className="hidden md:block">
        <Big />
      </div>
      
      {/* Small component visible on mobile */}
      <div className="block md:hidden">
        <Small />
      </div>
    </div>
  );
}

export default App;