import axios from "axios";
import { BACKEND_URL } from "./var";
import { store } from "../App";
import jsPDF from "jspdf";
import * as R from "ramda";
import moment from "moment/min/moment-with-locales";

export const getCarro = async () => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/car`, { headers: headers, params: {} })
    .then(resp => {
      response = resp;
    })
    .catch(error => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const getTecnico = async query => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/technician`, {
      headers: headers,
      params: { query }
    })
    .then(resp => {
      response = resp;
    })
    .catch(error => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const getAllTecnico = async query => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username
  };

  let response = {};

  await axios
    .get(`${BACKEND_URL}/api/technician/getAllTechnician`, {
      headers: headers,
      params: { query }
    })
    .then(resp => {
      response = resp;
    })
    .catch(error => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const newTecnico = async values => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/technician`, values, { headers: headers })
    .then(resp => {
      response = resp;
    })
    .catch(error => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const updateTecnico = async values => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username
  };

  let response = {};

  await axios
    .put(`${BACKEND_URL}/api/technician`, values, { headers: headers })
    .then(resp => {
      response = resp;
    })
    .catch(error => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

export const newCarro = async values => {
  const storeObject = store.getState();

  const headers = {
    token: storeObject.auth.token,
    username: storeObject.auth.username
  };

  let response = {};

  await axios
    .post(`${BACKEND_URL}/api/car`, values, { headers: headers })
    .then(resp => {
      response = resp;
    })
    .catch(error => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });
  return response;
};

function title(doc) {
  addWrappedText({
    text: "Empresa", // Put a really long string here
    textWidth: 95,
    doc,
    fontSize: "12",
    fontType: "normal",
    lineSpacing: 5, // Space between lines
    xPosition: 5, // Text offset from left of document
    YPosition: 35,
    initialYPosition: 40, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10 // Initial offset from top of document when page-wrapping
  });

  addWrappedText({
    text: "Vendas/ Outros", // Put a really long string here
    textWidth: 35,
    doc,
    fontSize: "12",
    fontType: "normal",
    lineSpacing: 5, // Space between lines
    xPosition: 100, // Text offset from left of document
    YPosition: 35,
    initialYPosition: 40, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10 // Initial offset from top of document when page-wrapping
  });

  addWrappedText({
    text: "Equipamentos/ Peças", // Put a really long string here
    textWidth: 100,
    doc,
    fontSize: "12",
    fontType: "normal",
    lineSpacing: 5, // Space between lines
    xPosition: 135, // Text offset from left of document
    YPosition: 35,
    initialYPosition: 40, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10 // Initial offset from top of document when page-wrapping
  });

  addWrappedText({
    text: "Devolução", // Put a really long string here
    textWidth: 50,
    doc,
    fontSize: "12",
    fontType: "normal",
    lineSpacing: 5, // Space between lines
    xPosition: 235, // Text offset from left of document
    YPosition: 35,
    initialYPosition: 40, // Initial offset from top of document; set based on prior objects in document
    pageWrapInitialYPosition: 10 // Initial offset from top of document when page-wrapping
  });
}

function addWrappedText({
  text,
  textWidth,
  doc,
  fontSize = 10,
  fontType = "normal",
  lineSpacing = 7,
  xPosition = 10,
  YPosition = 42,
  initialYPosition = 10,
  pageWrapInitialYPosition = 10,
  index = 0,
  rows = 1
}) {
  if (text) {
    var textLines = doc.splitTextToSize(text, textWidth); // Split the text into lines
    var pageHeight = doc.internal.pageSize.height; // Get page height, well use this for auto-paging
    doc.setFontType(fontType);
    doc.setFontSize(fontSize);
    var cursorY = initialYPosition + 7 * index;

    textLines.forEach(lineText => {
      if (cursorY > pageHeight) {
        // Auto-paging
        doc.addPage();
        cursorY = pageWrapInitialYPosition;
      }
      doc
        .text(
          xPosition + textWidth / 2,
          cursorY +
          (rows - 1) +
          2.5 * (rows - doc.splitTextToSize(text, textWidth).length),
          lineText,
          "center"
        )
        .rect(xPosition, YPosition + 7 * index, textWidth, 7 + 7 * (rows - 1));
      cursorY += lineSpacing;
    });
  } else {
    doc.rect(xPosition, YPosition + 7 * index, textWidth, 7 + 7 * (rows - 1));
  }
}

function getRodizio(plate) {
  if (plate[plate.length - 1] === '1') {
    return 'SEGUNDA'
  } else if (plate[plate.length - 1] === '2') {
    return 'SEGUNDA'
  } else if (plate[plate.length - 1] === '3') {
    return 'TERÇA'
  } else if (plate[plate.length - 1] === '4') {
    return 'TERÇA'
  } else if (plate[plate.length - 1] === '5') {
    return 'QUARTA'
  } else if (plate[plate.length - 1] === '6') {
    return 'QUARTA'
  } else if (plate[plate.length - 1] === '7') {
    return 'QUINTA'
  } else if (plate[plate.length - 1] === '8') {
    return 'QUINTA'
  } else if (plate[plate.length - 1] === '9') {
    return 'SEXTA'
  }
  else if (plate[plate.length - 1] === '0') {
    return 'SEXTA'
  }
}

export const createPDF = technician => {
  var doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    hotfixes: [] // an array of hotfix strings to enable
  });

  moment.locale('pt')

  technician.map((tecnico, i) => {
    doc.setLineWidth(1).line(3, 3, 3, 18);
    doc
      .setFontSize(20)
      .text(5, 13, moment().format('L'))
      .text(50, 13, tecnico.name);

    doc.setLineWidth(0.1).line(150, 12, 280, 12);
    doc.setFontSize(12).text(150, 17, "Assinatura");

    doc.setFontSize(18).text(3, 28, `${tecnico.plate} Rodízio: ${getRodizio(tecnico.plate)}`);

    doc
      .setFontSize(14)
      .text(100, 28, "Horário saída:")
      .text(190, 28, "Horário retorno:");
    doc
      .setLineWidth(0.1)
      .line(132, 28, 182, 28)
      .line(230, 28, 280, 28);

    let index = 0;

    title(doc);

    tecnico.rows &&
      tecnico.rows.map(item => {
        item.products.map(product => {
          console.log("test");
          console.log(item);
          console.log(product);
          const rows = R.max(
            doc.splitTextToSize(item.razaoSocial, 95).length,
            doc.splitTextToSize("item.venda", 35).length,
            doc.splitTextToSize(product.name, 100).length
          );

          if (index + rows < 22) {
            addWrappedText({
              text: item.razaoSocial, // Put a really long string here
              textWidth: 95,
              doc,
              fontSize: "12",
              fontType: "normal",
              lineSpacing: 5, // Space between lines
              xPosition: 5, // Text offset from left of document
              initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
              pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
              index,
              rows
            });

            addWrappedText({
              text: "item.venda", // Put a really long string here
              textWidth: 35,
              doc,
              fontSize: "12",
              fontType: "normal",
              lineSpacing: 5, // Space between lines
              xPosition: 100, // Text offset from left of document
              initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
              pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
              index,
              rows
            });

            addWrappedText({
              text: product.name, // Put a really long string here
              textWidth: 100,
              doc,
              fontSize: "12",
              fontType: "normal",
              lineSpacing: 5, // Space between lines
              xPosition: 135, // Text offset from left of document
              initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
              pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
              index,
              rows
            });

            addWrappedText({
              text: "", // Put a really long string here
              textWidth: 50,
              doc,
              fontSize: "12",
              fontType: "normal",
              lineSpacing: 5, // Space between lines
              xPosition: 235, // Text offset from left of document
              initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
              pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
              index,
              rows
            });
          }

          index = index + rows;
          // eslint-disable-next-line array-callback-return
          return;
        });
        // eslint-disable-next-line array-callback-return
        return;
      });

    i < technician.length - 1 && doc.addPage();
    // eslint-disable-next-line array-callback-return
    return;
  });

  console.log(doc);
  doc.autoPrint();
  // window.print();

  doc.save(`${moment().format("L")}.pdf`);
};
