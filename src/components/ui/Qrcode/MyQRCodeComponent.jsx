import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const MyQRCodeComponent = () => {
    const valueToEncode = "https://example.com";

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2>Scan this QR Code</h2>
            <QRCodeCanvas value={valueToEncode} size={256} />
        </div>
    );
};

export default MyQRCodeComponent;
