import { useState, useEffect } from 'react';
import { Mail, Smartphone, ArrowLeft, Loader, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TwoFactorAuthFlow() {
    const [step, setStep] = useState('method-select'); // 'method-select', 'loading', 'input-otp', 'success'
    const [authMethod, setAuthMethod] = useState(null);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [maskEmail, setMaskEmail] = useState('');

    const { verify2fa, init2fa, tempUser } = useAuth();
    const navigate = useNavigate();
    let isEmailAuthenticationActive = tempUser.two_fa_methods.includes('EMAIL');
    let isAuthenticatorAppActive = tempUser.two_fa_methods.includes('TOTP');

    // Simulate fetching user data after component mounts
    useEffect(() => {
        // In a real app, this would come from your auth context or API
        setMaskEmail('j***@example.com');
    }, []);

    const initiateVerification = (method) => {
        setAuthMethod(method);
        setStep('loading');
        setError('');

        // Simulate API call to initiate the selected verification method
        setTimeout(async () => {
            // In a real app, you would call your backend API here
            // e.g., await fetch('/api/auth/initiate-2fa', { method: 'POST', body: JSON.stringify({ method }) })
            const result = await init2fa(method);
            if (result.status) {
                // If successful, move to OTP input screen
                setStep('input-otp');
            } else {
                setError('Unable to send verification code. Please try again.');
                setStep('method-select');
            }

            // If there's an error, you would show it
            // setError('Unable to send verification code. Please try again.');
            // setStep('method-select');
        }, 1500);
    };

    const handleOtpChange = (index, value) => {
        // Only allow digits
        if (value && !/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input field
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace - move to previous field
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();

        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            setError('Please enter a complete 6-digit code');
            return;
        }

        setIsSubmitting(true);
        setError('');

        // Simulate API verification call
        setTimeout(async () => {
            // In a real app, you would call your verification API here
            // e.g., await fetch('/api/auth/verify-2fa', { 
            //   method: 'POST', 
            //   body: JSON.stringify({ method: authMethod, code: otpCode }) 
            // })
            const result = await verify2fa(otpCode, authMethod);
            console.log("result from verfiry 2fa ", result);

            // For demo: Accept "123456" as valid OTP
            // if (otpCode === '123456') {
            if (result.status) {
                setStep('success');
                setTimeout(() => {
                    navigate('/admin-dashboard');
                }, 800);

            } else {
                setError('Invalid verification code. Please try again.');
                setIsSubmitting(false);
            }
        }, 1500);
    };

    const resendCode = () => {
        setStep('loading');

        // Simulate API call to resend the code
        setTimeout(() => {
            setStep('input-otp');
            // You might want to show a success message:
            // setSuccessMessage('A new code has been sent');
        }, 1500);
    };

    const goBack = () => {
        setStep('method-select');
        setOtp(['', '', '', '', '', '']);
        setError('');
    };

    // METHOD SELECTION SCREEN
    if (step === 'method-select') {
        return (
            <div className="min-h-screen max-w-full flex items-center justify-center bg-gray-100">
                <div className="w-[500px] mx-auto p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Two-Factor Authentication</h2>
                    <p className="text-gray-600 mb-6 text-center">
                        Choose how you would like to verify your identity
                    </p>

                    <div className="space-y-4">
                        {isEmailAuthenticationActive
                            && (
                                <button
                                    onClick={() => initiateVerification('email')}
                                    className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                                >
                                    <div className="flex items-center">
                                        <div className="flex justify-center items-center w-10 h-10 bg-blue-100 rounded-full mr-4">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Email Verification</h3>
                                            <p className="text-sm text-gray-500">
                                                We'll send a code to {maskEmail}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-gray-400">→</div>
                                </button>
                            )
                        }



                        {isAuthenticatorAppActive && (
                            <button
                                onClick={() => initiateVerification('app')}
                                className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex items-center">
                                    <div className="flex justify-center items-center w-10 h-10 bg-green-100 rounded-full mr-4">
                                        <Smartphone className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Authenticator App</h3>
                                        <p className="text-sm text-gray-500">
                                            Use Google Authenticator, Authy, etc.
                                        </p>
                                    </div>
                                </div>
                                <div className="text-gray-400">→</div>
                            </button>
                        )}

                    </div>
                </div>
            </div>
        );
    }

    // LOADING STATE
    if (step === 'loading') {
        return (
            <div className="min-h-screen max-w-full flex items-center justify-center bg-gray-100">
                <div className="w-[500px] mx-auto p-6 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col items-center justify-center h-64">
                        <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                        <h2 className="text-xl font-medium text-gray-800">
                            {authMethod === 'email' ? 'Sending verification code...' : 'Preparing verification...'}
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    // SUCCESS SCREEN
    if (step === 'success') {
        return (
            <div className="min-h-screen max-w-full flex items-center justify-center bg-gray-100">
                <div className="w-[500px] mx-auto p-6 bg-white rounded-lg shadow-md">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Verification Successful</h2>
                        <p className="mt-2 text-gray-600">You have been successfully authenticated.</p>
                        <p className="mt-6 text-blue-600">Redirecting to your account...</p>
                    </div>
                </div>
            </div>
        );
    }

    // OTP INPUT SCREEN
    return (
        <div className="min-h-screen max-w-full flex items-center justify-center bg-gray-100">
            <div className="w-[500px] mx-auto p-6 bg-white rounded-lg shadow-md">
                <button
                    onClick={goBack}
                    className="flex items-center text-gray-600 mb-6 hover:text-gray-800"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to methods
                </button>

                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Enter Verification Code
                </h2>

                <div className="mb-6">
                    {authMethod === 'email' ? (
                        <div className="text-center mb-4">
                            <div className="flex justify-center mb-3">
                                <Mail className="w-10 h-10 text-blue-600" />
                            </div>
                            <p className="text-gray-700">Enter the 6-digit code sent to your email</p>
                            <p className="text-sm text-gray-500">{maskEmail}</p>
                        </div>
                    ) : (
                        <div className="text-center mb-4">
                            <div className="flex justify-center mb-3">
                                <Smartphone className="w-10 h-10 text-green-600" />
                            </div>
                            <p className="text-gray-700">Enter the 6-digit code from your authenticator app</p>
                        </div>
                    )}
                </div>

                <form onSubmit={verifyOtp}>
                    <div className="mb-6">
                        <div className="flex justify-center space-x-2">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    autoFocus={index === 0}
                                    className="w-12 h-12 text-center text-xl font-bold border rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                />
                            ))}
                        </div>

                        {error && (
                            <div className="mt-3 flex items-center justify-center text-red-600">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col space-y-3">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`py-3 px-4 rounded-lg font-medium text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {isSubmitting ? 'Verifying...' : 'Verify'}
                        </button>

                        {authMethod === 'email' && (
                            <button
                                type="button"
                                onClick={resendCode}
                                className="py-2 px-4 rounded-lg text-blue-600 hover:bg-blue-50"
                            >
                                Resend Code
                            </button>
                        )}
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        {authMethod === 'email'
                            ? "Didn't receive the email? Check your spam folder."
                            : "Having trouble with your authenticator app?"}
                    </p>
                </div>
            </div>
        </div>
    );
}