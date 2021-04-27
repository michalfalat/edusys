import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import { v4 } from 'uuid';
import { IInvoiceCore, IInvoiceItem, InvoiceMeasurementUnit, InvoicePaymentType, InvoiceStatus } from './model';
import * as moment from 'moment';

const fontLargeSize = 14;
const fontRegularSize = 10;
const fontSmallSize = 8;

const fontRegular = 'Regular';
const fontBold = 'Bold';

export const createTestInvoice = async (assetsFolder: string, pathToSave?: string): Promise<string> => {
  try {
    const name = `./test-invoice-${v4()}.pdf`;
    const invoice = testInvoice(assetsFolder);
    fillInvoice(invoice);
    generateInvoice(invoice, name, assetsFolder, pathToSave || assetsFolder);
    return path.join(pathToSave || assetsFolder, name);
  } catch (error) {
    return null;
  }
};

export const testInvoice = (assetsFolder: string): IInvoiceCore => {
  const invoice: IInvoiceCore = {
    id: v4(),
    issueDate: moment().toDate(),
    dueDate: moment().add(30, 'days').toDate(),
    orderNumber: '000102002020',
    paymentType: InvoicePaymentType.BANK_TRANSFER,
    currency: 'EUR',
    createdOn: moment().toDate(),
    constantSymbol: '308',
    variableSymbol: '6501032021',
    invoiceNumber: '1324564',
    createdBy: 'Michal Falat',
    note:
      'Faktura podlieha standardnej dobe splatnosti 30 dni. V priapde nedodrzania podmienok si dodavatel uplatnuje pravo na vymahanie dlznej sumy navysenu o uroky 0.05% za kazdy den omeskania platby.',
    logoUrl: `${assetsFolder}/images/default-invoice-logo.png`,
    status: InvoiceStatus.UNPAID,
    discount: {
      amount: 0,
      currency: 'EUR',
    },
    customer: {
      name: 'ZS Rakova',
      businessId: '4674643434',
      registeredVAT: false,
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
        quantity: 1,
        VAT: 20,
      },
      {
        name: 'Balicek 1 - instalacia ',
        description: 'dochadzkovy system',
        measurementUnit: InvoiceMeasurementUnit.HOUR,
        unitPrice: {
          amount: 30,
          currency: 'EUR',
        },
        quantity: 5,
        VAT: 20,
      },
    ],
  };
  return invoice;
};

const fillInvoice = (invoice: IInvoiceCore): void => {
  const currency = invoice.currency;

  invoice?.items.forEach((item) => {
    item.priceWithoutVAT = {
      amount: item?.quantity * item.unitPrice.amount,
      currency,
    };
    item.priceWithVAT = {
      amount: item.priceWithoutVAT.amount + (item.priceWithoutVAT.amount * item.VAT) / 100,
      currency,
    };
  });

  invoice.totalWithoutVAT = {
    amount: invoice.items?.map((m) => m.priceWithoutVAT.amount).reduce((acc, x) => acc + x),
    currency,
  };

  invoice.totalWithVAT = {
    amount: invoice.items?.map((m) => m.priceWithVAT.amount).reduce((acc, x) => acc + x),
    currency,
  };
  invoice.VAT = {
    amount: invoice.totalWithVAT.amount - invoice.totalWithoutVAT.amount,
    currency,
  };
};

const generateInvoice = async (invoice: IInvoiceCore, name: string, assetsFolder: string, pathToSave: string): Promise<any> => {
  const doc = new PDFDocument({ margin: 40 });
  doc.pipe(fs.createWriteStream(path.join(pathToSave, name)));
  doc.registerFont(fontRegular, path.join(assetsFolder, 'fonts/Roboto-Regular.ttf')).registerFont(fontBold, path.join(assetsFolder, 'fonts/Roboto-Bold.ttf'));
  doc.font(fontRegular);

  generateHeader(doc, invoice);
  generateSupplierInformation(doc, invoice);
  generateCustomerInformation(doc, invoice);
  generateInvoiceData(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc, invoice);

  doc.end();
};

//HEADER
const generateHeader = (doc: PDFKit.PDFDocument, invoice: IInvoiceCore): void => {
  doc
    .image(invoice.logoUrl, 40, 25, { width: 45 })
    .font(fontBold)
    .text(`FAKTÚRA č. ${invoice.invoiceNumber}`, 400, 25, { align: 'right' })
    .font(fontRegular)
    .fontSize(fontRegularSize)
    .moveDown()
    .text(`Objednávka č. ${invoice.orderNumber}`, 400, null, { align: 'right' })
    .moveDown();
};

// SUPPLIER
const generateSupplierInformation = (doc: PDFKit.PDFDocument, invoice: IInvoiceCore) => {
  const xPos = 40;
  const yPos = 90;
  const { country, postalCode, city, street, streetNumber } = invoice.supplier.address;

  doc
    .font(fontBold)
    .text('Dodávateľ', xPos, yPos, { underline: true })
    .fontSize(fontLargeSize)
    .font(fontRegular)
    .text(invoice.supplier.name)
    .fontSize(fontRegularSize)
    .text(`${street} ${streetNumber}`)
    .text(`${postalCode} ${city}`)
    .text(`${country}`)
    .moveDown();

  const { x, y } = doc;
  doc.text(`IČO:`).text(`DIČ:`).text(`Platca DPH:`).moveDown().text(`IBAN:`).text(`SWIFT:`).text(`Banka:`);
  doc
    .font(fontBold)
    .text(invoice.supplier.businessId, x + 60, y)
    .text(invoice.supplier.registrationNumberVAT || '-')
    .text(`${invoice.supplier.registeredVAT ? 'áno' : 'nie'}`)
    .moveDown()

    .font(fontRegular)
    .text(`${invoice.supplier.IBAN || '-'}`)
    .text(`${invoice.supplier.SWIFT || '-'}`)
    .text(`${invoice.supplier.bankName || '-'}`);
};

// CUSTOMER
const generateCustomerInformation = (doc: PDFKit.PDFDocument, invoice: IInvoiceCore) => {
  const xPos = 350;
  const yPos = 90;
  const { country, postalCode, city, street, streetNumber } = invoice.customer.address;

  doc
    .font(fontBold)
    .text('Odberateľ', xPos, yPos, { underline: true })
    .fontSize(fontLargeSize)
    .font(fontRegular)
    .text(invoice.customer.name)
    .fontSize(fontRegularSize)
    .text(`${street} ${streetNumber}`)
    .text(`${postalCode} ${city}`)
    .text(`${country}`)
    .moveDown();

  const { x, y } = doc;
  doc.text(`IČO:`).text(`DIČ:`).text(`Platca DPH:`);
  doc
    .font(fontBold)
    .text(invoice.customer.businessId, x + 60, y)
    .text(invoice.customer.registrationNumberVAT || '-')
    .text(`${invoice.customer.registeredVAT ? 'áno' : 'nie'}`)
    .font(fontRegular)
    .moveDown();
};

// INVOCIE DATA
const generateInvoiceData = (doc: PDFKit.PDFDocument, invoice: IInvoiceCore) => {
  const xPos = 350;
  const yPos = 230;

  doc
    .text(`Stav faktúry:`, xPos, yPos)
    .text(`Dátum vystavenia faktúry:`)
    .font(fontBold)
    .text(`Dátum splatnosti faktúry:`)
    .font(fontRegular)
    .text(`Forma úhrady:`)
    .text(`Variabilný symbol:`)
    .text(`Konštantný symbol:`);

  doc
    .text(`${getInvoiceStatusTranslation(invoice.status)}`, xPos + 130, yPos)
    .text(`${moment(invoice.issueDate).format('DD. MM. YYYY')}`)
    .font(fontBold)
    .text(`${moment(invoice.dueDate).format('DD. MM. YYYY')}`)
    .font(fontRegular)
    .text(`${getInvoicePayMethodTranslation(invoice.paymentType)}`)
    .text(`${invoice.variableSymbol}`)
    .text(`${invoice.constantSymbol}`);
};

// ITEMS
function generateInvoiceTable(doc: PDFKit.PDFDocument, invoice: IInvoiceCore) {
  const invoiceTableTop = 330;
  generateTableHeader(doc, invoiceTableTop);
  for (let i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 18;
    generateTableRow(doc, item, position);
  }
  generateTableSummary(doc, invoice);
}

const generateTableHeader = (doc: PDFKit.PDFDocument, pos: number) => {
  doc
    .font(fontBold)
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
    .font(fontRegular);
};

const generateTableRow = (doc: PDFKit.PDFDocument, item: IInvoiceItem, pos: number) => {
  doc
    .text(item.name, 40, pos)
    .text(`${item.quantity.toFixed(2)}`, 210, pos)
    .text(`${item.measurementUnit === InvoiceMeasurementUnit.QUANTITY ? 'ks' : 'hod'}`, 270, pos)
    .text(item.unitPrice.amount.toFixed(2), 300, pos)
    .text(`${item.priceWithoutVAT.amount.toFixed(2)}`, doc.page.width - 240, pos)
    .text(`${item.VAT}%`, doc.page.width - 145, pos)
    .text(`${item.priceWithVAT.amount.toFixed(2)}`, doc.page.width - 140, pos, { align: 'right' });
};

const generateTableSummary = (doc: PDFKit.PDFDocument, invoice: IInvoiceCore) => {
  const posY = doc.y + 15;
  doc
    .moveDown()
    .moveTo(40, doc.y)
    .lineTo(doc.page.width - 40, doc.y)
    .stroke('#bdbdbd')
    .fillColor('#444444')
    .font(fontBold)
    .text('Spolu:', 300, posY)
    .text(`${invoice.totalWithoutVAT?.amount.toFixed(2)}`, doc.page.width - 240, posY)
    .text(`${invoice.VAT?.amount.toFixed(2)}`, doc.page.width - 145, posY)
    .text(`${invoice.totalWithVAT?.amount.toFixed(2)}`, doc.page.width - 140, posY, { align: 'right' })
    .font(fontRegular);

  doc
    .text(`Celková fakturovaná suma k úhrade [${invoice.currency}]:`, 300, posY + 50)
    .font(fontBold)
    .fontSize(fontLargeSize)
    .text(`${invoice.totalWithVAT.amount.toFixed(2)}`, 300, posY + 50, { align: 'right' })
    .font(fontRegular)
    .fontSize(fontRegularSize);
};

// FOOTER
const generateFooter = (doc: PDFKit.PDFDocument, invoice: IInvoiceCore): void => {
  doc
    .text(`Vyhotovil: ${invoice.createdBy || ''}`, 40, doc.page.height - 120, { align: 'left' })
    .text(`Prevzal: `, 240, doc.page.height - 120, { align: 'left' })
    .text('Poznamka:', 40, doc.page.height - 85, { align: 'left', width: 500 })
    .fontSize(fontSmallSize)
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

const getInvoicePayMethodTranslation = (type: InvoicePaymentType): string => {
  switch (type) {
    case InvoicePaymentType.BANK_TRANSFER:
      return 'Bankový prevod';
    default:
      break;
  }
};
