import Header from "@/components/Header/Header";
import Carousel from "@/components/Carousel/Carousel";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import Banner from "@/components/Banner/Banner";

export default function Home() {
  return (
    <div className="mainContent">
      <Banner/>
      <Header />
      <Carousel />
      {/* <Link id='rsvpBtn' className='text-background rounded-4xl px-[100px] py-[30px] mt-[24px] mb-[24px] bg-foreground font-main text-[24px] max-[600px]:px-[60px] max-[600px]:py-[18px] max-[600px]:text-[18px] hover:bg-background hover:text-foreground hover:border-foreground hover:border-2 transition-colors duration-300' href= '/RSVP'>RSVP</Link> */}
    </div>
  );
}

// <Routes>
      //   <Route path="/" element={<App />} />
      //   <Route path="/jsxtext" element={<JsxText />} />
      //   <Route path="/form" element={<Form />} />
      //   <Route path="/header" element={<Header />} />
      //   <Route path="/display" element={<CssDisplay />} />
      //   <Route path="/displayexamples" element={<DisplayExamples />} />
      //   <Route path="/mdn-header" element={<MdnHeader />} />
      //   <Route path="/grid" element={<DisplayGrid />} />
      // </Routes>
