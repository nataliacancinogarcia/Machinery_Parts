async function generatePDF(name, email, company, location) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    if (selectedItems.length === 0) {
        alert('No hay artículos en la lista de selección.');
        return;
    }

    
    const logo = await loadImage('./images/Logo.png');

    // load elements to pdf
    doc.addImage(logo, 'PNG', 10, 10, 50, 20);
    doc.setFontSize(18);
    doc.text('Cotización', 105, 40, { align: 'center' });

    doc.setFontSize(14);
    doc.text(`Nombre: ${name}`, 10, 60);
    doc.text(`Correo: ${email}`, 10, 70);
    doc.text(`Cliente: ${company}`, 10, 80);
    doc.text(`Planta: ${location}`, 10, 90);
    
    // Generate date
    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}_${String(now.getMonth() + 1).padStart(2, '0')}_${now.getFullYear()}`;
    doc.text(`Fecha: ${formattedDate}`, 10, 100);

    // add items before eliminate
    const tableData = selectedItems.map(item => [
        item.item || "N/A",
        item.articleNumber || "N/A",
        item.designation || "N/A",
        item.quantity || "N/A"
    ]);

    doc.autoTable({
        head: [['ITEM', 'ARTICLE NUMBER', 'DESIGNATION', 'CANTIDAD']],
        body: tableData,
        startY: 110
    });

    // **Tabla de Contactos de Ventas**
    const salesContacts = [
        ["XXXXXXX", "+52 xxxxxxxxx", "x.x@xxxxxxx.com"],
        [" XXXXXXX", "+52 xxxxxxxxx", "xxxxxxxxx"],
        [" XXXXXXX", "+52 XXXXXXX", "xxxxxxxxx"]
    ];

    doc.autoTable({
        head: [['Sales Contact', 'Phone', 'Email']],
        body: salesContacts,
        startY: doc.autoTable.previous.finalY + 10 
    });

// mesage 
const message = "Gracias por realizar su solicitud de cotización. En un máximo de 3 días, le enviaremos un correo con la cotización.";
const pageWidth = doc.internal.pageSize.width - 20; 
const textX = 10; 
const textY = doc.autoTable.previous.finalY + 20; 

doc.setFontSize(12);
doc.text(message, textX, textY, { maxWidth: pageWidth, align: "justify" });

    // files name
    const fileName = `${name.replace(/\s+/g, '_')}_${formattedDate}.pdf`;

    
    doc.save(fileName);

    // upload to server
    await uploadPDF(doc, fileName);

    // clean table
    localStorage.removeItem('selectedItems');
    document.getElementById('table-body').innerHTML = '<tr><td colspan="5" style="text-align:center; color:red;">No hay productos en la lista de selección.</td></tr>';
}


function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
    });
}


async function uploadPDF(doc, fileName) {
    const pdfBlob = doc.output('blob');
    const formData = new FormData();
    const pdfFile = new File([pdfBlob], fileName, { type: 'application/pdf' });

    formData.append("pdf", pdfFile, fileName);

    try {
        const response = await fetch("http://localhost:5002/upload", {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            console.log("PDF guardado en el servidor.");
        } else {
            console.error("Error al guardar el PDF en el servidor.");
        }
    } catch (error) {
        console.error(" Error en la subida del PDF:", error);
    }
}