export default function checkOnUpdateEmailErrors(errorType: string | undefined) {

    // Change the default details based on the error code and type
    switch (errorType) {
        case 'user_invalid_credentials':
            return "The password you entered is incorrect. Please re-enter your password to proceed.";
            break;
            
        case 'user_target_already_exists':
            return "A user with this email already exists. Please try a different email.";
            break;

        default:
            return false
            break;
    }
}