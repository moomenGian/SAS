function formatDate(rawData){
    let result = []
    rawData.map(item => {
      // Convert the ViolationDate string to a JavaScript Date object
      const date = new Date(item.ViolationDate);
      
      // Format the date to display only the date part (YYYY-MM-DD)
      const formattedDate = date.toISOString().split('T')[0];
    
      result.push(
        {
          ...item,
          ViolationDate: formattedDate
        }
      );

    });
    
    return result
}

module.exports = {formatDate}