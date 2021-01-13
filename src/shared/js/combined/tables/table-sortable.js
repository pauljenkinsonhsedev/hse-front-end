export function tableSortable(elem){

    var table = document.querySelectorAll(`table.${elem.className}`);

    table.forEach(() => {
        
    });

    var rows, i, x, y, count = 0;
    var switching = true;

    // Order is set as ascending
    var direction = "ascending";

    // Run loop until no switching is needed
    while (switching) {
        switching = false;
        var rows = table.rows;

        //Loop to go through all rows
        for (i = 1; i < (rows.length - 1); i++) {
            var Switch = false;

            // Fetch 2 elements that need to be compared
            x = rows[i].getElementsByTagName("TD")[0];
            y = rows[i + 1].getElementsByTagName("TD")[0];

            // Check the direction of order
            if (direction == "ascending") {

                // Check if 2 rows need to be switched
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase())
                    {
                    // If yes, mark Switch as needed and break loop
                    Switch = true;
                    break;
                }
            } else if (direction == "descending") {

                // Check direction
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase())
                    {
                    // If yes, mark Switch as needed and break loop
                    Switch = true;
                    break;
                }
            }
        }
        if (Switch) {
            // Function to switch rows and mark switch as completed
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;

            // Increase count for each switch
            count++;
        } else {
            // Run while loop again for descending order
            if (count == 0 && direction == "ascending") {
                direction = "descending";
                switching = true;
            }
        }
    }
}
