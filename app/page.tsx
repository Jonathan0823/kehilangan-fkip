import Footer from "./components/Footer";
import Landing from "./components/Landing";

export default function Home() {
  return (
    <div className="min-h-dvh"> 
    <Landing/>
    <Footer className={"fixed"}/>
    </div>
  );
}