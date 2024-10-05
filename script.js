$(document).ready(function () {
    $('#wifi-form').submit(function (e) {
        e.preventDefault();
        
        const ssid = $('#ssid').val();
        const password = $('#password').val();
        
        // Format for WiFi QR code
        const wifiString = `WIFI:S:${ssid};T:WPA;P:${password};;`;
        
        // Generate QR code
        $('#qr-container').show(); // Show the QR container
        $('#download-button').hide(); // Hide the download button initially
        
        const qrCodeSize = Math.min(300, window.innerWidth - 40); // Responsive size, max 300px

        QRCode.toCanvas(document.getElementById('qr-code'), wifiString, {
            width: qrCodeSize,
            height: qrCodeSize
        }, function (error) {
            if (error) console.error(error);
            console.log('QR code generated!');
            $('#download-button').show(); // Show the download button after QR code is generated
        });
        
        // Download QR Code functionality
        $('#download-button').off('click').on('click', function() {
            const canvas = document.getElementById('qr-code');
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'wifi-qrcode.png';
            link.click();
        });
    });
});