declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { 
      scale: number;
      useCORS?: boolean;
      logging?: boolean;
      letterRendering?: boolean;
    };
    jsPDF?: { unit: string; format: string; orientation: string };
    pagebreak?: { mode: string[] };
  }

  interface Html2PdfInstance {
    from: (element: HTMLElement) => Html2PdfInstance;
    save: () => void;
  }

  const html2pdf: {
    (): {
      set: (options: Html2PdfOptions) => Html2PdfInstance;
      from: (element: HTMLElement) => Html2PdfInstance;
      save: () => void;
    };
  };

  export default html2pdf;
} 