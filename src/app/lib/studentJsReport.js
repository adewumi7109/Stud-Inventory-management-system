export async function generateStudentReport(data) {
    try {
      const jsReportOnlineUrl = 'https://adewumi.jsreportonline.net';
      const templateId = 'fsmmswAsd';
      const username = 'ogunsanyaadewumi01@gmail.com';
      const password = 'omoogunsanya';
  
      const credentials = btoa(`${username}:${password}`);
  
      const templateContent = `
      <!DOCTYPE html>
<html>
<head>
    <title>Student receipt</title>
    <style>
    {{asset "styles.css"}}
</style>
</head>

<body>
    
    <nav>
      <img class="logo" src="https://www.vnicomhub.com/images//logo.png">
  

    </nav>
    <div class="line">

    </div>
   <header>
       <div class="profile">
        <div>
            <span>Reciept Number: </span>
            <span> 123445</span>
        </div>
        <div>
            <span>Student Name: </span>
            <span> {{studentName}}</span>
        </div>
        <div>
            <span>Phone: </span>
            <span> {{studentPhone}}</span>
        </div>
           <div>
            <span>Email: </span>
            <span> {{studentEmail}}</span>
        </div>
    </div>
    
   </header>
    
 <table>
      <thead>
        <tr>
          <th>Course</th>
          <th>Price</th>
        
          
        </tr>
      </thead>
      <tbody>
          {{#each courses}}
            <tr>
          <td>{{this.title}}</td>
          <td class="money">{{this.price}}</td>

        </tr>
            {{/each}}
     
       
      </tbody>
    </table>
    <p class="total" style="text-align: right">Total Bills:  
      {{#each totalbills}}
             <span class="money">{{amount}}</span> 
               {{/each}} 
      </p>
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
  