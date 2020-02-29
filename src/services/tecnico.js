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
      console.log(error.response);
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
  if (plate[plate.length - 1] === "1") {
    return "SEGUNDA";
  } else if (plate[plate.length - 1] === "2") {
    return "SEGUNDA";
  } else if (plate[plate.length - 1] === "3") {
    return "TERÇA";
  } else if (plate[plate.length - 1] === "4") {
    return "TERÇA";
  } else if (plate[plate.length - 1] === "5") {
    return "QUARTA";
  } else if (plate[plate.length - 1] === "6") {
    return "QUARTA";
  } else if (plate[plate.length - 1] === "7") {
    return "QUINTA";
  } else if (plate[plate.length - 1] === "8") {
    return "QUINTA";
  } else if (plate[plate.length - 1] === "9") {
    return "SEXTA";
  } else if (plate[plate.length - 1] === "0") {
    return "SEXTA";
  }
}

function header(doc, tecnico, data) {
  doc.setLineWidth(1).line(3, 3, 3, 18);
  doc.setFontSize(20);
  if (doc.splitTextToSize(tecnico.name, 100).length > 1) {
    doc.setFontSize(18);
    if (doc.splitTextToSize(tecnico.name, 100).length > 1) {
      doc.setFontSize(16);
      if (doc.splitTextToSize(tecnico.name, 100).length > 1) {
        doc.setFontSize(14);
      }
    }
  }
  doc.text(5, 13, moment(data).format("L")).text(50, 13, tecnico.name);

  doc.setLineWidth(0.1).line(150, 12, 280, 12);
  doc.setFontSize(12).text(150, 17, "Assinatura");

  doc
    .setFontSize(18)
    .text(3, 28, `${tecnico.plate} Rodízio: ${getRodizio(tecnico.plate)}`);

  doc
    .setFontSize(14)
    .text(100, 28, "Horário saída:")
    .text(190, 28, "Horário retorno:");
  doc
    .setLineWidth(0.1)
    .line(132, 28, 182, 28)
    .line(230, 28, 280, 28);

  title(doc);
}

// export const createPDF = (technician, data) => {
//   var doc = new jsPDF({
//     orientation: "l",
//     unit: "mm",
//     format: "a4",
//     hotfixes: [] // an array of hotfix strings to enable
//   });

//   moment.locale("pt");

//   technician.map((tecnico, i) => {
//     header(doc, tecnico, data);

//     doc.setFontSize(10).text(148.5, 205, `Página 1`, "center");

//     let index = 0;
//     let page = 0;

//     tecnico.rows &&
//       tecnico.rows.map(item => {
//         if (R.has("products", item)) {
//           item.products.map(product => {
//             const textEquip = `${product.amount} - ${product.name} ${
//               product.serial
//                 ? `Nº (${product.serialNumbers.map((equip, index) =>
//                     index > 0 ? ` ${equip.serialNumber}` : equip.serialNumber
//                   )})`
//                 : ""
//             }`;

//             const rows = R.max(
//               doc.splitTextToSize(item.razaoSocial, 95).length,
//               doc.splitTextToSize(product.status.toUpperCase(), 35).length,
//               doc.splitTextToSize(textEquip, 100).length
//             );

//             // if ((index + rows) % 22 < 21) {
//             if ((index + rows) % 17 === 16) {
//               doc.addPage();
//               header(doc, tecnico, data);
//               page = page + 1;
//               doc
//                 .setFontSize(10)
//                 .text(148.5, 205, `Página ${page + 1}`, "center");
//             }

//             // if (index + rows < 22) {
//             addWrappedText({
//               text: item.razaoSocial, // Put a really long string here
//               textWidth: 95,
//               doc,
//               fontSize: "12",
//               fontType: "normal",
//               lineSpacing: 5, // Space between lines
//               xPosition: 5, // Text offset from left of document
//               initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
//               pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//               index,
//               rows
//             });

//             addWrappedText({
//               text: product.status.toUpperCase(), // Put a really long string here
//               textWidth: 35,
//               doc,
//               fontSize: "12",
//               fontType: "normal",
//               lineSpacing: 5, // Space between lines
//               xPosition: 100, // Text offset from left of document
//               initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
//               pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//               index,
//               rows
//             });

//             addWrappedText({
//               text: textEquip, // Put a really long string here
//               textWidth: 100,
//               doc,
//               fontSize: "12",
//               fontType: "normal",
//               lineSpacing: 5, // Space between lines
//               xPosition: 135, // Text offset from left of document
//               initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
//               pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//               index,
//               rows
//             });

//             addWrappedText({
//               text: "", // Put a really long string here
//               textWidth: 50,
//               doc,
//               fontSize: "12",
//               fontType: "normal",
//               lineSpacing: 5, // Space between lines
//               xPosition: 235, // Text offset from left of document
//               initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
//               pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//               index,
//               rows
//             });
//             // }

//             index = index + rows;
//             // eslint-disable-next-line array-callback-return
//             return;
//           });
//         } else {
//           const rows = R.max(
//             doc.splitTextToSize(item.razaoSocial, 95).length,
//             doc.splitTextToSize("EMPRÉSTIMO", 35).length,
//             doc.splitTextToSize(`1 - ${item.name} Nº ${item.serialNumber}`, 100)
//               .length
//           );

//           if (index + rows < 22) {
//             addWrappedText({
//               text: item.razaoSocial, // Put a really long string here
//               textWidth: 95,
//               doc,
//               fontSize: "12",
//               fontType: "normal",
//               lineSpacing: 5, // Space between lines
//               xPosition: 5, // Text offset from left of document
//               initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
//               pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//               index,
//               rows
//             });

//             addWrappedText({
//               text: "EMPRESTIMO", // Put a really long string here
//               textWidth: 35,
//               doc,
//               fontSize: "12",
//               fontType: "normal",
//               lineSpacing: 5, // Space between lines
//               xPosition: 100, // Text offset from left of document
//               initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
//               pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//               index,
//               rows
//             });

//             addWrappedText({
//               text: `1 - ${item.name}  Nº ${item.serialNumber}`, // Put a really long string here
//               textWidth: 100,
//               doc,
//               fontSize: "12",
//               fontType: "normal",
//               lineSpacing: 5, // Space between lines
//               xPosition: 135, // Text offset from left of document
//               initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
//               pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//               index,
//               rows
//             });

//             addWrappedText({
//               text: "", // Put a really long string here
//               textWidth: 50,
//               doc,
//               fontSize: "12",
//               fontType: "normal",
//               lineSpacing: 5, // Space between lines
//               xPosition: 235, // Text offset from left of document
//               initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
//               pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
//               index,
//               rows
//             });
//           }

//           index = index + rows;
//         }
//         // eslint-disable-next-line array-callback-return
//         return;
//       });

//     i < technician.length - 1 && doc.addPage();
//     // eslint-disable-next-line array-callback-return
//     return;
//   });

//   doc.autoPrint();
//   // window.print();

//   doc.save(`${moment(data).format("L")}.pdf`);
// };

export const createPDF = (technician, data) => {
  var doc = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    hotfixes: [] // an array of hotfix strings to enable
  });

  moment.locale("pt");

  technician.map((tecnico, i) => {
    header(doc, tecnico, data);

    doc.setFontSize(10).text(148.5, 205, `Página 1`, "center");

    let index = 0;
    let page = false;

    tecnico.rows &&
      tecnico.rows.map(item => {
        if (R.has("products", item)) {
          item.products.map(product => {
            const textEquip = `${product.amount} - ${product.name} ${
              product.serial
                ? `Nº (${product.serialNumbers.map((equip, index) =>
                    index > 0 ? ` ${equip.serialNumber}` : equip.serialNumber
                  )})`
                : ""
            }`;

            const rows = R.max(
              doc.splitTextToSize(item.razaoSocial, 95).length,
              doc.splitTextToSize(product.status.toUpperCase(), 35).length,
              doc.splitTextToSize(textEquip, 100).length
            );

            // if ((index + rows) % 22 < 21) {
            // if ((index + rows) % 17 === 16) {
            //   doc.addPage();
            //   header(doc, tecnico, data);
            //   page = page + 1;
            //   doc
            //     .setFontSize(10)
            //     .text(148.5, 205, `Página ${page + 1}`, "center");
            // }

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
                text: product.status.toUpperCase(), // Put a really long string here
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
                text: textEquip, // Put a really long string here
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
            } else {
              if (!page) {
                doc.addPage();
                // header(doc, tecnico, data);
              }

              page = true;
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
                index: index - 22,
                rows
              });

              addWrappedText({
                text: product.status.toUpperCase(), // Put a really long string here
                textWidth: 35,
                doc,
                fontSize: "12",
                fontType: "normal",
                lineSpacing: 5, // Space between lines
                xPosition: 100, // Text offset from left of document
                initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
                pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
                index: index - 22,
                rows
              });

              addWrappedText({
                text: textEquip, // Put a really long string here
                textWidth: 100,
                doc,
                fontSize: "12",
                fontType: "normal",
                lineSpacing: 5, // Space between lines
                xPosition: 135, // Text offset from left of document
                initialYPosition: 47, // Initial offset from top of document; set based on prior objects in document
                pageWrapInitialYPosition: 10, // Initial offset from top of document when page-wrapping
                index: index - 22,
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
                index: index - 22,
                rows
              });
            }

            index = index + rows;
            // eslint-disable-next-line array-callback-return
            return;
          });
        } else {
          const rows = R.max(
            doc.splitTextToSize(item.razaoSocial, 95).length,
            doc.splitTextToSize("EMPRÉSTIMO", 35).length,
            doc.splitTextToSize(`1 - ${item.name} Nº ${item.serialNumber}`, 100)
              .length
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
              text: "EMPRESTIMO", // Put a really long string here
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
              text: `1 - ${item.name}  Nº ${item.serialNumber}`, // Put a really long string here
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
        }
        // eslint-disable-next-line array-callback-return
        return;
      });

    i < technician.length - 1 && doc.addPage();
    // eslint-disable-next-line array-callback-return
    return;
  });

  doc.autoPrint();
  // window.print();

  doc.save(`${moment(data).format("L")}.pdf`);
};
