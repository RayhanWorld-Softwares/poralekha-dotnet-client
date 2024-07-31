import { useState } from "react";
import { Document, Page } from "react-pdf";

const PdfDocumentViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="">
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <div
            key={index}
            style={{
              marginBottom: "8px",
              padding: "0",
              overflow: "hidden",
              // width: "round(var(--scale-factor) * 770.08px, 1px)",
              height: "round(var(--scale-factor) * 841.68px, 1px)",
            }}
          >
            <Page pageNumber={index + 1} />
          </div>
        ))}
      </Document>
    </div>
  );
};

export default PdfDocumentViewer;
