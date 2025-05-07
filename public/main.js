$(document).ready(function () {
    $.getJSON("data.json", function (topSpots) {
        const categories = new Set(topSpots.map(spot => spot.category));
        categories.forEach(category => {
            $('#categoryFilter').append(`<option value="${category}">${category}</option>`);
        });

        function renderTable(data) {
            $('#top-spots-body').empty();
            const grouped = {};

            data.forEach(spot => {
                if (!grouped[spot.category]) grouped[spot.category] = [];
                grouped[spot.category].push(spot);
            });

            for (const category in grouped) {
                const categoryRow = `<tr><th colspan="3" style="background:#ddd;">${category}</th></tr>`;
                $('#top-spots-body').append(categoryRow);

                grouped[category].forEach(spot => {
                    const [lat, long] = spot.location;
                    const mapLink = `https://www.google.com/maps?q=${lat},${long}`;
                    const row = `
                        <tr data-category="${spot.category}">
                            <td>${spot.name}</td>
                            <td>${spot.description}</td>
                            <td><a href="${mapLink}" target="_blank">View on Map</a></td>
                        </tr>
                    `;
                    $('#top-spots-body').append(row);
                });
            }
        }

        renderTable(topSpots);

        const categoryBackgrounds = {
            "Arts & Culture": "art.webp",
            "Food & Drink": "food.webp",
            "Entertainment": "entertainment.jpg",
            "Outdoors / Nature": "outdoor.webp",
            "Shopping": "shopping.jpg",
            "Water Activities": "water.jpg"
        };

        function updateBackground(category) {
            const fileName = categoryBackgrounds[category];
            const imageUrl = fileName ? `images/${fileName}` : '';
            $('body').css('background-image', imageUrl ? `url(${imageUrl})` : '');
        }
        $('#categoryFilter').on('change', function () {
            const selected = $(this).val();
            updateBackground(selected);
            const filtered = selected === 'all' ? topSpots : topSpots.filter(s => s.category === selected);
            renderTable(filtered);
        });
    });
});
