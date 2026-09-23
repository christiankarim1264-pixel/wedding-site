import Header from "@/components/Header/Header";
import Carousel from "@/components/Carousel/Carousel";

export default function Home() {
  return (
    <div className="mainContent">
      <Header />
      <Carousel />
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
