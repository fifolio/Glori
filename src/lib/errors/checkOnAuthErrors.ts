export default function checkOnAuthErrors(errorType: string | undefined) {

    // Set the default error details
    const errorDetails = {
        errortitle: 'Oops!',
        errordescription: "There's something wrong, please try again later",
    };

    // Change the default details based on the error code and type
    switch (errorType) {
        case 'general_argument_invalid':
            errorDetails.errortitle = 'Invalid "email"';
            errorDetails.errordescription = 'Invalid `email` address. Please check the entered a valid email address';
            break;
        case 'user_password_mismatch':
            errorDetails.errortitle = 'Password Mismatch';
            errorDetails.errordescription = 'Passwords do not match. Please check the password and confirm password.';
            break;
        case 'password_recently_used':
            errorDetails.errortitle = 'Password Recently Used';
            errorDetails.errordescription = 'The password you are trying to use is similar to your previous password. For your security, please choose a different password and try again.';
            break;
        case 'password_personal_data':
            errorDetails.errortitle = 'Password Contains Personal Data';
            errorDetails.errordescription = 'The password you are trying to use contains references to your name, email, phone, or userID. For your security, please choose a different password and try again.';
            break;
        case 'user_phone_not_found':
            errorDetails.errortitle = 'User Phone Not Found';
            errorDetails.errordescription = 'The current user does not have a phone number associated with their account.';
            break;
        case 'user_missing_id':
            errorDetails.errortitle = 'User Missing ID from OAuth2 Provider';
            errorDetails.errordescription = 'Missing ID from OAuth2 provider.';
            break;
        case 'user_oauth2_bad_request':
            errorDetails.errortitle = 'User OAuth2 Bad Request';
            errorDetails.errordescription = 'OAuth2 provider rejected the bad request.';
            break;
        case 'user_jwt_invalid':
            errorDetails.errortitle = 'JWT Token Invalid';
            errorDetails.errordescription = 'The JWT token is invalid. Please check the value of the X-Appwrite-JWT header to ensure the correct token is being used.';
            break;
        case 'user_blocked':
            errorDetails.errortitle = 'User Blocked';
            errorDetails.errordescription = 'The current user has been blocked. You can unblock the user by making a request to the User API\'s "Update User Status" endpoint or in the Appwrite Console\'s Auth section.';
            break;
        case 'user_invalid_token':
            errorDetails.errortitle = 'User Invalid Token';
            errorDetails.errordescription = 'Invalid token passed in the request.';
            break;
        case 'user_email_not_whitelisted':
            errorDetails.errortitle = 'User Email Not Whitelisted';
            errorDetails.errordescription = 'Console registration is restricted to specific emails. Contact your administrator for more information.';
            break;
        case 'user_invalid_code':
            errorDetails.errortitle = 'User Invalid Code';
            errorDetails.errordescription = 'The specified code is not valid. Contact your administrator for more information.';
            break;
        case 'user_ip_not_whitelisted':
            errorDetails.errortitle = 'User IP Not Whitelisted';
            errorDetails.errordescription = 'Console registration is restricted to specific IPs. Contact your administrator for more information.';
            break;
        case 'user_invalid_credentials':
            errorDetails.errortitle = 'User Invalid Credentials';
            errorDetails.errordescription = 'Invalid credentials. Please check the email and password.';
            break;
        case 'user_anonymous_console_prohibited':
            errorDetails.errortitle = 'User Anonymous Console Prohibited';
            errorDetails.errordescription = 'Anonymous users cannot be created for the console project.';
            break;
        case 'user_session_already_exists':
            errorDetails.errortitle = 'User Session Already Exists';
            errorDetails.errordescription = 'Creation of anonymous users is prohibited when a session is active.';
            break;
        case 'user_unauthorized':
            errorDetails.errortitle = 'User Unauthorized';
            errorDetails.errordescription = 'The current user is not authorized to perform the requested action.';
            break;
        case 'user_oauth2_unauthorized':
            errorDetails.errortitle = 'User OAuth2 Unauthorized';
            errorDetails.errordescription = 'OAuth2 provider rejected the unauthorized request.';
            break;
        case 'team_invalid_secret':
            errorDetails.errortitle = 'Team Invalid Secret';
            errorDetails.errordescription = 'The team invitation secret is invalid. Please request a new invitation and try again.';
            break;
        case 'team_invite_mismatch':
            errorDetails.errortitle = 'Team Invite Mismatch';
            errorDetails.errordescription = 'The invite does not belong to the current user.';
            break;
        case 'team_invite_already_exists':
            errorDetails.errortitle = 'Team Invite Already Exists';
            errorDetails.errordescription = 'User has already been invited or is already a member of this team.';
            break;
        case 'user_not_found':
            errorDetails.errortitle = 'User Not Found';
            errorDetails.errordescription = 'User with the requested ID could not be found.';
            break;
        case 'user_session_not_found':
            errorDetails.errortitle = 'User Session Not Found';
            errorDetails.errordescription = 'The current user session could not be found.';
            break;
        case 'user_identity_not_found':
            errorDetails.errortitle = 'User Identity Not Found';
            errorDetails.errordescription = 'The identity could not be found. Please sign in with OAuth provider to create identity first.';
            break;
        case 'team_not_found':
            errorDetails.errortitle = 'Team Not Found';
            errorDetails.errordescription = 'Team with the requested ID could not be found.';
            break;
        case 'team_invite_not_found':
            errorDetails.errortitle = 'Team Invite Not Found';
            errorDetails.errordescription = 'The requested team invitation could not be found.';
            break;
        case 'team_membership_mismatch':
            errorDetails.errortitle = 'Team Membership Mismatch';
            errorDetails.errordescription = 'The membership ID does not belong to the team ID.';
            break;
        case 'membership_not_found':
            errorDetails.errortitle = 'Membership Not Found';
            errorDetails.errordescription = 'Membership with the requested ID could not be found.';
            break;
        case 'user_already_exists':
            errorDetails.errortitle = 'User Already Exists';
            errorDetails.errordescription = 'A user with the same email already exists.';
            break;
        case 'user_email_already_exists':
            errorDetails.errortitle = 'User Email Already Exists';
            errorDetails.errordescription = 'A user with the same email already exists in the current project.';
            break;
        case 'user_phone_already_exists':
            errorDetails.errortitle = 'User Phone Already Exists';
            errorDetails.errordescription = 'A user with the same phone number already exists in the current project.';
            break;
        // case 'team_invite_already_exists':
        //   errorDetails.errortitle = 'Team Invite Already Exists';
        //   errorDetails.errordescription = 'User has already been invited or is already a member of this team.';
        //   break;
        case 'team_already_exists':
            errorDetails.errortitle = 'Team Already Exists';
            errorDetails.errordescription = 'Team with requested ID already exists. Please choose a different ID and try again.';
            break;
        case 'membership_already_confirmed':
            errorDetails.errortitle = 'Membership Already Confirmed';
            errorDetails.errordescription = 'Membership is already confirmed.';
            break;
        case 'user_password_reset_required':
            errorDetails.errortitle = 'User Password Reset Required';
            errorDetails.errordescription = 'The current user requires a password reset.';
            break;
        case 'user_oauth2_provider_error':
            errorDetails.errortitle = 'User OAuth2 Provider Error';
            errorDetails.errordescription = 'OAuth2 provider returned some error.';
            break;
        case 'user_count_exceeded':
            errorDetails.errortitle = 'User Count Exceeded';
            errorDetails.errordescription = 'The current project has exceeded the maximum number of users. Please check your user limit in the Appwrite console.';
            break;
        case 'user_auth_method_unsupported':
            errorDetails.errortitle = 'User Auth Method Unsupported';
            errorDetails.errordescription = 'The requested authentication method is either disabled or unsupported. Please check the supported authentication methods in the Appwrite console.';
            break;

        default:
            // Handle other cases if needed
            break;
    }

    return errorDetails
}