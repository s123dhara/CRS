import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

const MFASecurity = () => {
    const { enable2faAuth, loggedUser, disable2faAuth } = useAuth();

    console.log(`logged user from MFA SECURITY = `, loggedUser);

    let isEmailEnabled = loggedUser.two_fa_methods.includes('EMAIL');
    let isAuthenticatorEnabled = loggedUser.two_fa_methods.includes('TOTP');

    const [emailEnabled, setEmailEnabled] = useState(isEmailEnabled);
    const [authenticatorEnabled, setAuthenticatorEnabled] = useState(isAuthenticatorEnabled);
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState('');
    const [showQRCodeModal, setShowQRCodeModal] = useState(false);
    const [qrData, setQrData] = useState({ qrCode: '', secret: '' });

    const [pendingMfaAction, setPendingMfaAction] = useState(null); // 'enable-email', 'disable-email', 'enable-totp', 'disable-totp'


    const handleSave = () => {
        // setShowModal(true);
        toast.success('All changes are enabaled');
        // setTimeout(() => {        
        //     location.reload();
        // }, 800);
    } 

    const handleConfirm = async () => {
        console.log('Email MFA:', emailEnabled);
        console.log('Authenticator MFA:', authenticatorEnabled);
        console.log('Password:', password);
        setShowModal(false);
        // setPassword('');

        // let multifactorAuth;
        // if (emailEnabled) {
        //     multifactorAuth = 'EMAIL';
        // }

        // if (authenticatorEnabled) {
        //     multifactorAuth = 'TOTP';
        // }

        // const response = await enable2faAuth(multifactorAuth, password);
        // const { status, qrCode, secret, message } = response;
        // console.log({
        //     status, qrCode, secret, message
        // });
        // if (response.status) {
        //     setQrData({ qrCode, secret });
        //     setShowQRCodeModal(true);
        //     setPassword('');
        // }
        let response;
        switch (pendingMfaAction) {
            case 'enable-email':
                response = await enable2faAuth('EMAIL', password);
                if (response?.status) {
                    toast.success('Email OTP verification has been enabled')
                    setEmailEnabled(true);                    
                    // Optionally provide feedback to the user
                    console.log('Email 2FA enabled successfully.');
                } else {
                    setEmailEnabled(false);  
                    console.error('Failed to enable Email 2FA:', response?.message);
                    // Optionally display an error message to the user
                }
                break;
            case 'disable-email':
                response = await disable2faAuth('EMAIL', password);
                if (response?.status) {
                    toast.success('Email OTP verification has been disabled')
                    setEmailEnabled(false);
                    console.log('Email 2FA disabled successfully.');
                } else {
                    console.error('Failed to disable Email 2FA:', response?.message);
                    // Optionally display an error message to the user
                }
                break;
            case 'enable-totp':
                response = await enable2faAuth('TOTP', password);
                if (response?.status) {
                    toast.success('Authenticator App verification has been enabled')
                    setAuthenticatorEnabled(true);
                    setQrData({ qrCode: response.qrCode, secret: response.secret });
                    setShowQRCodeModal(true);
                    console.log('TOTP 2FA setup initialized.');
                } else {
                    console.error('Failed to enable TOTP 2FA:', response?.message);
                    // Optionally display an error message to the user
                }
                break;
            case 'disable-totp':
                response = await disable2faAuth('TOTP', password);
                if (response?.status) {
                    toast.success('Authenticator App verification has been disabled')
                    setAuthenticatorEnabled(false);
                    console.log('TOTP 2FA disabled successfully.');
                } else {
                    console.error('Failed to disable TOTP 2FA:', response?.message);
                    // Optionally display an error message to the user
                }
                break;
            default:
                console.warn('No pending MFA action to confirm.');
                break;
        }

        setShowModal(false);
        setPendingMfaAction(null);
        setPassword('');


    };

    // useEffect(() => {
    //     if(loggedUser.two_fa_method == 'TOTP') {
    //         setAuthenticatorEnabled(true);
    //     }else if(loggedUser.two_fa_method == 'EMAIL') {
    //         setEmailEnabled(true);
    //     }else {
    //         setAuthenticatorEnabled(false);
    //         setEmailEnabled(false);
    //     }
    // });


    // Custom toggle switch component
    const ToggleSwitch = ({ enabled, onChange }) => (
        <div
            className={`relative w-12 h-6 rounded-full transition-colors duration-300  cursor-pointer flex items-center ${enabled ? 'bg-blue-600' : 'bg-gray-300'
                }`}
            onClick={onChange}
        >
            <span
                className={`inline-block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
            />
        </div>
    );

    return (
        <div className="max-w-md mx-auto p-8 bg-white rounded-3xl shadow-xl mt-10 border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Multi-Factor Authentication</h2>

            <div className="space-y-5">
                <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition duration-300">
                    <div className="flex items-center justify-between cursor-pointer">
                        <div>
                            <span className="font-medium text-gray-800">Email Authentication</span>
                            <p className="text-sm text-gray-500 mt-1">Receive a verification code via email</p>
                        </div>
                        <ToggleSwitch
                            enabled={emailEnabled}
                            onChange={
                                () => {

                                    if (!emailEnabled) { // not set means not activate
                                        console.log('for active');
                                        setPendingMfaAction('enable-email')                                        
                                        setShowModal(true);
                                    } else {
                                        // Means active, for setting to deactive.
                                        console.log('for deactive');       
                                        setPendingMfaAction('disable-email')                                 
                                        setShowModal(true);
                                    }
                                }

                            }
                        />
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition duration-300">
                    <div className="flex items-center justify-between cursor-pointer">
                        <div>
                            <span className="font-medium text-gray-800">Authenticator App</span>
                            <p className="text-sm text-gray-500 mt-1">Use an authenticator app like Google Authenticator</p>
                        </div>
                        <ToggleSwitch
                            enabled={authenticatorEnabled}
                            onChange={() => {
                                if (!authenticatorEnabled) { // not set means not activate
                                    console.log('for active');
                                    setPendingMfaAction('enable-totp')
                                    setShowModal(true);
                                    
                                } else {
                                    // Means active, for setting to deactive.
                                    console.log('for deactive');
                                    setPendingMfaAction('disable-totp')
                                    setShowModal(true);
                                    
                                }
                            }
                            }
                        />
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full mt-6 py-3 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    Save Changes
                </button>
            </div>

            {/* Modal with Blurred Background */}
            {showModal && (
                <>
                    <div className="fixed inset-0 bg-transparent backdrop-blur-sm z-40" />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-up border border-gray-100">
                            <div className="border-b px-6 py-4 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-800">Confirm Password</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6">
                                <p className="mb-4 text-gray-600">For security, please enter your password to save changes.</p>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end gap-3 border-t p-6">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    className="px-5 py-2.5 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-xl  transition duration-300 shadow-md"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {showQRCodeModal && (
                <>
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-100">
                            <div className="border-b px-6 py-4 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-gray-800">Scan QR Code</h3>
                                <button
                                    onClick={() => setShowQRCodeModal(false)}
                                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="p-6 text-center space-y-4">
                                <img src={qrData.qrCode} alt="QR Code" className="mx-auto w-40 h-40" />
                                <p className="text-gray-700 break-words">
                                    <strong>Secret:</strong> {qrData.secret}
                                </p>
                                <p className="text-gray-500 text-sm">Scan this QR code with your authenticator app to complete setup.</p>
                            </div>
                            <div className="flex justify-end gap-3 border-t p-6">
                                <button
                                    onClick={() => setShowQRCodeModal(false)}
                                    className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition duration-300 shadow-md"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MFASecurity;