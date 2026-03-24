const puppeteer = require("puppeteer");
const Contract = require("../Models/BaseContract");

const generateCultivationContractPDF = async (req, res) => {
  try {
    const { contractId } = req.params;

    // Optional: validate contract exists
    const contract = await Contract.findById(contractId);
    if (!contract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // IMPORTANT: this URL must render ContractPreview ONLY
    const previewUrl = `${process.env.FRONTEND_URL}/contracts/preview/${contractId}?pdf=true`;

    await page.goto(previewUrl, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "15mm",
        right: "15mm",
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size:9px;width:100%;text-align:center;">
          <span>Farmlink • Assured Contract Farming Platform</span>
        </div>
      `,
      footerTemplate: `
        <div style="font-size:9px;width:100%;text-align:center;">
          <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
        </div>
      `,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=Farmlink_Cultivation_Contract_${contractId}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF generation failed:", error);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};
module.exports = {
  generateCultivationContractPDF,
};
