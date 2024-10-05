import Footer from "./components/Footer";
import Laporan from "./components/Laporan";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="m">
    <Navbar/>
    <Laporan/>
    <Footer/>
    </div>
  );
}
