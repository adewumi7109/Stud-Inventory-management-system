export async function generateReport(data) {
  try {
    const jsReportOnlineUrl = 'https://adewumi.jsreportonline.net';
    const templateId = 'WMzbmEOjO';
    const username = 'ogunsanyaadewumi01@gmail.com';
    const password = 'omoogunsanya';

    const credentials = btoa(`${username}:${password}`);

    const templateContent = `<!DOCTYPE html>
    <html>
    <head>
        <title>Laptop Report</title>
        <style>
        {{asset "invoice.css"}}
    </style>
    </head>
    
    <body>
        
        <nav>
          <img class="logo" src="https://www.vnicomhub.com/images//logo.png">
      
    
        </nav>
        <div class="line">
    
        </div>
       <header>
           <table class="ht">
               <thead>
                   <tr>
                       <th></th>
                       <th></th>
                   </tr>
               </thead>
               <tbody>
               <tr>
                   <td>
                       <h3>Bill to:	</h3>
               <p>Buyer&rsquo;s name: {{Invoice.Name}} </p>
               <p>Address: {{Invoice.Address}}   </p>
               <p>Phone Number: {{Invoice.Phone}}</p>
               <p>Email Address: {{Invoice.Email}}</p>
    
                   </td>
                   <td>
                       <p>Invoice Number: {{Invoice.InvoiceNumber}}  </p>
               <p> Invoice Date: {{Invoice.Date}}</p>
               <p>Payment Due: {{Invoice.Date}}</p>
                   </td>
               </tr>
               </tbody>
           </table>
          
        
       </header>
       <table class="tb">
           <thead>
               <tr>
                   <th>
                       Item
                   </th>
                   <th>
                       Description
                   </th>
                   <th>
                       Amount
                   </th>
               </tr>
           </thead>
           <tbody>
               <tr>
                   <td>Laptop Purchase </td>
                   <td>{{Invoice.Laptop.Brand}} {{Invoice.Laptop.Model}} Laptop <br>
    Processor: {{Invoice.Laptop.Processor}} CPU@ {{Invoice.Laptop.Processor_speed}}<br>
    <br>
    Installed Ram: {{Invoice.Laptop.Ram}}<br>
    Installed ROM: {{Invoice.Laptop.Storage}} {{Invoice.Laptop.StoragType}}<br>
     Serial No: {{Invoice.Laptop.SerialNumber}}
    </td>
    <td style="text-align: right">
        {{Invoice.Price}}
    </td>
               </tr>
               <tr>
                   <td>
                       Total
                   </td>
                   <td></td>
                   <td style="text-align: right">{{Invoice.Price}}</td>
               </tr>
           </tbody>
       </table>
        <div class="boxes">
            <div class="box">
    
            </div>
               <div class="box grey">
    
            </div>
        </div>
       <footer>
           <div class="footer-line">
    
           </div>
         
           <div class="address">
               <h6>3 Dekunle Atoyebi Str., Off Gasline Road, Magboro, Ogun State, Nigeria.</br> Tell: (+234) 915 780 0332, (+234) 916 568 0082, (+234) 9014954421 </br> Website: www.vnicom.com</h6>
               
           </div>
       </footer>
    </body>
    </html>
    
    `;

    const response = await fetch(`${jsReportOnlineUrl}/api/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + credentials,
      },
      body: JSON.stringify({
        template: { content: templateContent, engine: "handlebars", recipe: "chrome-pdf" },
        data: data,
      }),
    });

    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/pdf')) {
        // Handle PDF content, e.g., download or display
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
      } else {
        // Handle non-PDF content
        const reportData = await response.json();
        console.log('Generated report data:', reportData);
      }
    } else {
      console.error('Failed to generate report');
    }
  } catch (error) {
    console.error('Error generating report:', error);
  }
}
