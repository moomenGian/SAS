


export async function sendRecord(datas, button) {

    //validate input
    const {sectionName, adviser, violator, violation, violationDescription, witness, date } = datas
    // console.log(datas);
    if(!sectionName || !adviser || !violation || !violator || !violation || !violationDescription || !witness || !date){
        console.log('invalid input');
      return
    }
    console.log('sending record');
    button.disabled = true
    try {
      const response = await fetch('http://localhost:3000/insertRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datas),
      });
  
      if (!response.ok) {
        throw new Error('Error inserting record');
      }
  
      window.location.reload()
      
    } catch (error) {
      console.error('Error inserting record', error);
    }
  
  }