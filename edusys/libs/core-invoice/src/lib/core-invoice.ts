import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';
import { IInvoice, IInvoiceItem, InvoiceMeasurementUnit, InvoiceStatus } from './model';
import * as moment from 'moment';

export const createTestInvoice = async (assetsFolder: string, pathToSave?: string): Promise<string> => {
  try {
    const name = `./test-invoice-${v4()}.pdf`;
    const invoice: IInvoice = {
      id: v4(),
      VATRate: 20,
      constantSymbol: '308',
      variableSymbol: '6501032021',
      invoiceNumber: '1324564',
      createdBy: 'Michal Falat',
      note: 'Faktura podlieha standardnej dobe splatnosti 30 dni.',
      organization: null,
      logoUrl: `${assetsFolder}/images/default-invoice-logo.png`,
      status: InvoiceStatus.UNPAID,
      VAT: {
        amount: 100,
        currency: 'EUR',
      },
      discount: {
        amount: 0,
        currency: 'EUR',
      },
      customer: {
        name: 'ZS Rakova',
        businessId: '4674643434',
        registeredVAT: false,
        IBAN: 'SK0210000054844646',
        SWIFT: 'MBANK a.s. ',
        bankName: 'mBank',
        contactEmail: 'riaditel@zsrakova.net',
        contactPhone: '0916874646',
        address: {
          city: 'Rakova',
          country: 'Slovensko',
          name: 'ZS rakova',
          postalCode: '55674',
          street: 'Rakova',
          streetNumber: '25',
        },
      },
      supplier: {
        name: 'Edusys s.r.o',
        businessId: '463438476746',
        registeredVAT: false,
        IBAN: 'SK0210000067434646',
        SWIFT: 'MBANK a.s. ',
        bankName: 'mBank',
        contactEmail: 'system@edusys.sk',
        contactPhone: '0916874646',
        address: {
          city: 'Cadca',
          country: 'Slovensko',
          name: 'Cadca adresa',
          postalCode: '31268',
          street: 'pod jednotou',
          streetNumber: '18',
        },
      },
      items: [
        {
          name: 'Balicek 1 - rocne predplatne',
          description: 'dochadzkovy system',
          unitPrice: {
            amount: 189,
            currency: 'EUR',
          },
          measurementUnit: InvoiceMeasurementUnit.QUANTITY,
          priceWithoutVAT: {
            amount: 189,
            currency: 'EUR',
          },
          quantity: 1,
          VAT: 20,
        },
        {
          name: 'Balicek 1 - instalacia ',
          description: 'dochadzkovy system',
          measurementUnit: InvoiceMeasurementUnit.HOUR,
          priceWithoutVAT: {
            amount: 150,
            currency: 'EUR',
          },
          unitPrice: {
            amount: 30,
            currency: 'EUR',
          },
          quantity: 5,
          VAT: 20,
        },
      ],
      subTotal: {
        amount: 13485,
        currency: 'EUR',
      },
      totalWithoutVAT: {
        amount: 10000,
        currency: 'EUR',
      },
      totalWithVAT: {
        amount: 12000,
        currency: 'EUR',
      },
    };
    buildInvoice(invoice, name, assetsFolder, pathToSave || assetsFolder);
    return path.join(pathToSave || assetsFolder, name);
  } catch (error) {
    return null;
  }
};

const buildInvoice = async (invoice: IInvoice, name: string, assetsFolder: string, pathToSave: string): Promise<any> => {
  let doc = new PDFDocument({ margin: 40 });
  doc.pipe(fs.createWriteStream(path.join(pathToSave, name)));
  doc.registerFont('Regular', path.join(assetsFolder, 'fonts/Roboto-Regular.ttf')).registerFont('Bold', path.join(assetsFolder, 'fonts/Roboto-Bold.ttf'));
  doc.font('Regular');

  generateHeader(doc, invoice);
  generateSupplierInformation(doc, invoice);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc, invoice);

  doc.end();
};

//HEADER
const generateHeader = (doc: PDFKit.PDFDocument, invoice: IInvoice): void => {
  doc
    .image(invoice.logoUrl, 40, 25, { width: 45 })
    .font('Bold')
    .text(`FAKTÚRA č. ${invoice.invoiceNumber}`, 400, 25)
    .font('Regular')
    .fontSize(10)
    .text(`Stav faktúry: ${getInvoiceStatusTranslation(invoice.status)}`)
    .text(`Dátum vystavenia faktúry: ${moment().format('D.M. YYYY')}`)
    .text(`Dátum splatnosti faktúry: ${moment().format('D.M. YYYY')}`)
    .moveDown();
};

// SUPPLIER
const generateSupplierInformation = (doc: PDFKit.PDFDocument, invoice: IInvoice) => {
  const xPos = 40;
  const yPos = 90;
  const { country, postalCode, city, street, streetNumber } = invoice.supplier.address;

  doc
    .fontSize(15)
    .text(invoice.supplier.name, xPos, yPos)
    .fontSize(10)
    .text(`${street} ${streetNumber}`)
    .text(`${postalCode} ${city}`)
    .text(`${country}`)
    .moveDown();

  const { x, y } = doc;
  doc.text(`IČO:`).text(`DIČ:`).text(`Platca DPH:`).moveDown().text(`IBAN:`).text(`SWIFT:`).text(`Banka:`);
  // .moveTo(x + 100, yPos + 100);
  doc
    .text(invoice.supplier.businessId, x + 60, y)
    .text(invoice.supplier.registrationNumberVAT || '-')
    .text(`${invoice.supplier.registeredVAT ? 'áno' : 'nie'}`)
    .moveDown()
    .text(`${invoice.supplier.IBAN || '-'}`)
    .text(`${invoice.supplier.SWIFT || '-'}`)
    .text(`${invoice.supplier.bankName || '-'}`);
};

// CUSTOMER
const generateCustomerInformation = (doc: PDFKit.PDFDocument, invoice: IInvoice) => {
  const xPos = 400;
  const yPos = 90;
  const { country, postalCode, city, street, streetNumber } = invoice.customer.address;

  doc
    .fontSize(15)
    .text(invoice.customer.name, xPos, yPos)
    .fontSize(10)
    .text(`${street} ${streetNumber}`)
    .text(`${postalCode} ${city}`)
    .text(`${country}`)
    .moveDown()
    .text(`IČO: ${invoice.customer.businessId}`)
    .text(`DIČ: ${invoice.customer.registrationNumberVAT || ''}`)
    .text(`Platca DPH: ${invoice.customer.registeredVAT ? 'áno' : ''}`)
    .moveDown()
    .text(`IBAN: ${invoice.customer.IBAN}`)
    .text(`SWIFT: ${invoice.customer.SWIFT}`)
    .text(`Banka: ${invoice.customer.bankName}`)
    .moveDown();
};

// ITEMS
function generateInvoiceTable(doc: PDFKit.PDFDocument, invoice: IInvoice) {
  let i,
    invoiceTableTop = 280;
  generateTableHeader(doc, invoiceTableTop);
  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 20;
    generateTableRow(doc, item, position);
  }
  generateTableSummary(doc, invoice);
}

const generateTableHeader = (doc: PDFKit.PDFDocument, pos: number) => {
  doc
    .font('Bold')
    .text('Nazov', 40, pos, { width: 200 })
    .text('Množstvo', 210, pos)
    .text('MJ', 270, pos)
    .text('Cena za MJ', 300, pos)
    .text(`Celkom bez DPH`, doc.page.width - 240, pos)
    .text(`DPH`, doc.page.width - 145, pos)
    .text(`Celkom s DPH`, doc.page.width - 140, pos, { align: 'right' })
    .moveTo(40, pos + 15)
    .lineTo(doc.page.width - 40, pos + 15)
    .stroke('#bdbdbd')
    .fillColor('#444444')
    .font('Regular');
};
const generateTableSummary = (doc: PDFKit.PDFDocument, invoice: IInvoice) => {
  const posY = doc.y + 10;
  doc
    .moveDown()
    .font('Bold')
    .text('Spolu:', 300, posY)
    .text(`${invoice.totalWithoutVAT?.amount.toFixed(2)}`, doc.page.width - 240, posY)
    .text(`${invoice.VAT?.amount.toFixed(2)}`, doc.page.width - 145, posY)
    .text(`${invoice.totalWithVAT?.amount.toFixed(2)}`, doc.page.width - 140, posY, { align: 'right' })
    .font('Regular');
};

const generateTableRow = (doc: PDFKit.PDFDocument, item: IInvoiceItem, pos: number) => {
  doc
    .text(item.name, 40, pos)
    .text(`${item.quantity.toFixed(2)}`, 210, pos)
    .text(`${item.measurementUnit === InvoiceMeasurementUnit.QUANTITY ? 'ks' : 'hod'}`, 270, pos)
    .text(item.unitPrice.amount.toFixed(2), 300, pos)
    .text(`${item.priceWithoutVAT.amount.toFixed(2)}`, doc.page.width - 240, pos)
    .text(`${item.VAT}%`, doc.page.width - 145, pos)
    .text(`${item.priceWithoutVAT.amount + (item.priceWithoutVAT.amount * item.VAT) / 100}`, doc.page.width - 140, pos, { align: 'right' });
};

// FOOTER
const generateFooter = (doc: PDFKit.PDFDocument, invoice: IInvoice): void => {
  doc
    .text(`Vyhotovil: ${invoice.createdBy || ''}`, 40, doc.page.height - 120, { align: 'left' })
    .text(`Prevzal: `, 240, doc.page.height - 120, { align: 'left' })
    .text('Poznamka:', 40, doc.page.height - 70, { align: 'left', width: 500 })
    .fontSize(8)
    .text(invoice.note, null, null, { align: 'left', width: 500 });
};

const getInvoiceStatusTranslation = (status: InvoiceStatus): string => {
  switch (status) {
    case InvoiceStatus.UNPAID:
      return 'Nezaplatená';
    case InvoiceStatus.PAID:
      return 'Zaplatená';
    case InvoiceStatus.CANCELED:
      return 'Zrušená';
    case InvoiceStatus.OLD_VERSION:
      return 'Stará verzia';

    default:
      break;
  }
};
